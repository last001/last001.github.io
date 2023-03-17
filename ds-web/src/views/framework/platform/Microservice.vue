<template>
  <div class="ds-wrapper microservice-wrapper">
    <el-breadcrumb separator-icon="ArrowRight" class="mb-20">
      <el-breadcrumb-item :to="{ path: '/' }">系统服务</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>异常管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--desc-->
    <div class="ds-desc">
      <h4>{{router.currentRoute.value.meta.title}}</h4>
      <span class="detail">用于管理和监控系统微服务的运行状态。</span>
      <el-icon class="icon"><component :is="router.currentRoute.value.meta.iconName"></component></el-icon>
    </div>
    <!--filter-bar-->
    <div class="mt-20">
      <ds-tablebar ref="dsTableBarRef" :ds-table-ref="dsTableRef" :query-meta-page-fun="tableData.queryMetaPageFun" :filter-bar="tableBarData.filterBar" :batch-bar="tableBarData.batchBar" :tool-bar="tableBarData.toolBar" :on-button-click="tableBarData.onButtonClick">
        <template #adFilterBar>
          <el-form ref="adFilterFormRef" :model="adFilterBarData" :inline="true" label-width="100px" label-position="left">
            <el-form-item label="机构" prop="org">
              <el-input placeholder="机构" v-model="adFilterBarData.org"/>
            </el-form-item>
            <el-form-item label="发生时间" prop="eventTime">
              <el-date-picker
                  v-model="adFilterBarData.eventTime"
                  type="datetimerange"
                  unlink-panels
                  range-separator="To"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="YYYY-MM-DD HH:mm:ss"
              />
            </el-form-item>
            <el-form-item label=" ">
              <el-button type="primary" @click="handler('querySubmit','',$event)">查询</el-button>
              <el-button type="" @click="handler('queryReset',adFilterFormRef,$event)">重置</el-button>
            </el-form-item>
          </el-form>
        </template>
      </ds-tablebar>
    </div>
    <!-- table panel -->
    <div class="mt-20">
      <ds-table ref="dsTableRef" :ds-table-bar-ref="dsTableBarRef" :query-meta-page-fun="tableData.queryMetaPageFun" :query-page-info-fun="tableData.queryPageInfoFun" :filters="tableData.filters" :orders="tableData.orders" :exclude-fields="tableData.excludeFields">
        <template #operationColumn>
          <el-table-column fixed="right" label="操作" width="140">
            <template #default="scope">
              <el-button type="default" size="small" @click.prevent="handler('edit',scope,$event)">编辑</el-button>
              <el-button type="danger" size="small" @click.prevent="handler('remove',scope,$event)">删除</el-button>
            </template>
          </el-table-column>
        </template>
      </ds-table>
    </div>
    <!--drawer-->
    <el-drawer custom-class="ds-drawer" v-model="options.drawerVisible" size="35%" :modal="false">
      <template #header>
        <h4>{{ options.drawerTitle }}</h4>
      </template>
      <template #default>
        <el-scrollbar>
          <el-form ref="formRef" :model="formData" :rules="formRules" label-width="auto" label-position="left">
            <el-form-item label="服务名称" prop="name" required>
              <el-input class="" v-model="formData.name"/>
            </el-form-item>
            <el-form-item label="服务描述" prop="description" required>
              <el-input v-model="formData.description" type="text"/>
            </el-form-item>
            <el-form-item label="服务端口" prop="port" required>
              <el-input-number class="" v-model="formData.port"/>
            </el-form-item>
            <el-form-item label="序号" prop="serialNo" required>
              <el-input-number class="" v-model="formData.serialNo"/>
            </el-form-item>

          </el-form>
        </el-scrollbar>
      </template>
      <template #footer>
        <div class="ds-fx">
          <div class="fx-size-1 ta-l">
          </div>
          <div style="flex: auto">
            <el-button @click="options.drawerVisible=false;">取消</el-button>
            <el-button type="primary" @click="formSubmit(formRef)">确定</el-button>
          </div>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts">
export default {
  name:"Microservice",
  path: "/framework/platform/microservice"
}
</script>

<script lang="ts" setup>
import {ref, reactive, nextTick} from 'vue';
import {ElMessage, ElMessageBox, FormInstance, FormRules} from 'element-plus'
import dsmain from '@dscloud/api/dsmain';
import { DsTable,DsTablebar,DsSelect } from '@dscloud/components';
import router from '@dscloud/router';

const options = reactive({
  drawerVisible:false,
  drawerTitle: ""
});
const dsTableRef = ref();
const dsTableBarRef = ref();
const adFilterFormRef = ref<FormInstance>()
const tableData = {
  queryMetaPageFun:dsmain.getMicroserviceMetaPage,
  queryPageInfoFun:dsmain.getMicroservicePage,
  filters:[],
  orders:[{"field":"serialNo","direction":"asc"}],
  excludeFields:[]
}
const tableBarData = {
  queryMetaPageFun:dsmain.getMicroserviceMetaPage,
  filterBar:[
    {name:"状态",type:"dropselect",field:"openFlag",options:[{name:"运行",value:"1"},{name:"停止",value:"0"}]},
    {name:"服务名称",type:"inputsearch",field:"inputSearch",defaultValue:"",filters:[
        {field:"name",expression:"$regex"},
      ]}
  ],
  batchBar:[
    {name:"批量删除",type:"button",icon:"Delete",buttonCss:"danger",command:"batchDelete"}
  ],
  toolBar:[
    {name:"",tooltip:"自定义显示列",type:"button",icon:"View",buttonCss:"",command:"_cuscol"},
    {name:"导出",type:"btngroup",icon:"ArrowDown",buttonCss:"",command:"_export",buttons:[{name:"导出当前结果",type:"button",icon:"",command:"_expall"},{name:"导出/导入设置",type:"button",icon:"",command:"_cusimpexp"}]},
    {name:"新建服务",type:"button",icon:"plus",buttonCss:"success",command:"create"}
  ],
  onButtonClick:function(command:any,data:any,event:any){
    handler(command,data,event);
  }
}
const adFilterBarData = reactive({
  org:"",
  eventTime:""
});
const formRef = ref<FormInstance>();
const formData:any = reactive({
  name:"",
  port: "8000",
  description:"",
  serialNo:"1",
});
const formRules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: '请输入服务名称',
      trigger: ['blur', 'change'],
    },
  ],
  port: [
    {
      required: true,
      message: '请输入服务端口',
      trigger: ['blur', 'change'],
    },
  ],
  description: [
    {
      required: true,
      message: '请输入服务描述',
      trigger: ['blur', 'change'],
    },
  ],
  serialNo: [
    {
      required: true,
      message: '请输入序号',
      trigger: ['blur', 'change'],
    },
  ],
});
//region 事件、方法
const handler = (command:any,data:any,event:any)=>{
  switch (command) {
    case "create":
      options.drawerVisible = true;
      options.drawerTitle = "新建服务";
      formRef.value?.resetFields();
      break;
    case "edit":
      options.drawerTitle = "编辑服务("+data.row.name+")";
      dsmain.getMicroserviceEntity(data.row.id).then((res: any) => {
        if (res) {
          options.drawerVisible = true;
          nextTick(()=>{
            Object.assign(formData, res);
          });
        }
      });
      break;
    case "remove":
      ElMessageBox.alert('确认删除？', '提示', {
        confirmButtonText: 'OK',
        callback: (action:string) => {
          if(action=="confirm"){
            dsmain.removeMicroservice(data.row.id).then((res:any) => {
              if(res&&res.deletedCount>0){
                dsTableRef.value.reloadData();
              }
            });
          }
        },
      })
      break;
    case "batchDelete":
      let rows = dsTableRef.value.getSelectionRows();
      let ids:any = [];
      rows.forEach((row:any, idx:number, arr:[])=>{
        ids.push(row.id);
      });
      if(ids.length>0){
        ElMessageBox.alert('确认将选中数据批量删除？', '提示', {
          confirmButtonText: 'OK',
          callback: (action:any) => {
            if(action=="confirm"){
              dsmain.batchRemoveMicroservice(ids).then((res:any) => {
                if(res&&res.deletedCount>0){
                  dsTableRef.value.reloadData();
                }
              });
            }
          },
        })
      }
      break;
    case "querySubmit":
      let adFilters = [];
      if(adFilterBarData.org){
        adFilters.push({key: "org.name", data: {$regex:adFilterBarData.org}});
      }
      if(adFilterBarData.eventTime&&adFilterBarData.eventTime.length>0){
        let filter:any = {key:"$and",items:[]};
        filter.items.push({key: "eventTime", data: {$gte:adFilterBarData.eventTime[0]}});
        filter.items.push({key: "eventTime", data: {$lte:adFilterBarData.eventTime[1]}});
        adFilters.push(filter);
      }
      dsTableBarRef&&(dsTableBarRef.value.reloadTable(adFilters));
      break;
    case "queryReset":
      if(!data)return;
      data.resetFields();
      dsTableBarRef&&(dsTableBarRef.value.reloadTable([]));
      break;
  }
}
const formSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (formData.id) {
        dsmain.updateMicroservice(formData).then((res: any) => {
          if (res && res.modifiedCount > 0) {
            ElMessage.success("提交成功");
            options.drawerVisible = false;
            dsTableRef.value.reloadData();
          } else {
            ElMessage.error("提交失败");
          }
        });
      } else {
        dsmain.insertMicroservice(formData).then((res: any) => {
          if (res && res.id) {
            ElMessage.success("提交成功");
            options.drawerVisible = false;
            dsTableRef.value.reloadData();
          } else {
            ElMessage.error("提交失败");
          }
        });
      }
    }
  });
};
//endregion
</script>

<style lang="scss" scoped>
.microservice-wrapper{
}
</style>