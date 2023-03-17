<template>
  <div class="ds-wrapper application-wrapper">
    <el-breadcrumb separator-icon="ArrowRight" class="mb-20">
      <el-breadcrumb-item :to="{ path: '/' }">系统服务</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>异常管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--desc-->
    <div class="ds-desc">
      <h4>{{router.currentRoute.value.meta.title}}</h4>
      <span class="detail">用于管理系统应用以及第三方应用，可通过appid、appsecret获取访问令牌。</span>
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
              <el-button type="default" size="small" @click.prevent="handler('detail',scope,$event)">详情</el-button>
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
            <el-form-item label="应用图标" prop="clientIcon">
              <ds-avatar v-model="formData.clientIcon" :size="80" fit="cover" shape="square"></ds-avatar>
            </el-form-item>
            <el-form-item label="应用ID" prop="clientId" required>
              <el-input class="" v-model="formData.clientId"/>
            </el-form-item>
            <el-form-item v-if="options.isEdit" label="应用密钥" prop="clientSecret">

            </el-form-item>
            <el-form-item label="应用描述" prop="remark">
              <el-input v-model="formData.remark" :rows="2" type="textarea" placeholder="请输入应用描述"/>
            </el-form-item>
            <el-form-item label="启用状态" prop="enableFlag">
              <el-radio-group v-model="formData.enableFlag">
                <el-radio-button label="1" checked>
                  启用
                </el-radio-button>
                <el-radio-button label="0">
                  禁用
                </el-radio-button>
              </el-radio-group>
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
  name:"Application",
  path: "/framework/org/application"
}
</script>

<script lang="ts" setup>
import {ref, reactive, nextTick} from 'vue';
import {ElMessage, ElMessageBox, FormInstance, FormRules} from 'element-plus'
import dsmain from '@dscloud/api/dsmain';
import { DsTable,DsTablebar,DsSelect,DsAvatar } from '@dscloud/components';
import router from '@dscloud/router';

const options = reactive({
  drawerVisible:false,
  drawerTitle: "",
  isEdit:false
});
const dsTableRef = ref();
const dsTableBarRef = ref();
const adFilterFormRef = ref<FormInstance>()
const tableData = {
  queryMetaPageFun:dsmain.getApplicationMetaPage,
  queryPageInfoFun:dsmain.getApplicationPage,
  filters:[],
  orders:[{"field":"eventTime","direction":"desc"}],
  excludeFields:["detail"]
}
const tableBarData = {
  queryMetaPageFun:dsmain.getApplicationMetaPage,
  filterBar:[
    /*{name:"状态",type:"dropselect",field:"Status",options:[{name:"全部",value:""},{name:"有效",value:"1"},{name:"无效",value:"0"}]},*/
    {name:"编码",type:"inputsearch",field:"inputSearch",defaultValue:"",filters:[
        {field:"summary",expression:"$regex"},
        {field:"invokeClass",expression:"$regex"},
        {field:"invokeMethod",expression:"$regex"},
      ]}
  ],
  batchBar:[
    {name:"批量删除",type:"button",icon:"Delete",buttonCss:"danger",command:"batchDelete"}
  ],
  toolBar:[
    {name:"",tooltip:"自定义显示列",type:"button",icon:"View",buttonCss:"",command:"_cuscol"},
    {name:"导出",type:"btngroup",icon:"ArrowDown",buttonCss:"",command:"_export",buttons:[{name:"导出当前结果",type:"button",icon:"",command:"_expall"},{name:"导出/导入设置",type:"button",icon:"",command:"_cusimpexp"}]},
    {name:"新建应用",type:"button",icon:"plus",buttonCss:"success",command:"create"}
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
  clientIcon:"",
  clientId: "",
  clientSecret:"",
  remark:"",
  enableFlag: "1",
});
const formRules = reactive<FormRules>({
  /*clientIcon: [
    {
      required: true,
      message: '请选择应用图标',
      trigger: ['blur', 'change'],
    },
  ],*/
  clientId: [
    {
      required: true,
      message: '请输入应用ID',
      trigger: ['blur', 'change'],
    },
  ],
});
//region 事件、方法
const handler = (command:any,data:any,event:any)=>{
  switch (command) {
    case "create":
      options.drawerVisible = true;
      options.drawerTitle = "新建应用";
      formRef.value?.resetFields();
      break;
    case "edit":
      options.drawerTitle = "编辑应用("+data.row.name+")";
      dsmain.getApplicationEntity(data.row.id).then((res: any) => {
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
            dsmain.removeApplication(data.row.id).then((res:any) => {
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
              dsmain.batchRemoveApplication(ids).then((res:any) => {
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
        dsmain.updateApplication(formData).then((res: any) => {
          if (res && res.modifiedCount > 0) {
            ElMessage.success("提交成功");
            options.drawerVisible = false;
            dsTableRef.value.reloadData();
          } else {
            ElMessage.error("提交失败");
          }
        });
      } else {
        dsmain.insertApplication(formData).then((res: any) => {
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
.modeldatagrant-wrapper{
}
</style>