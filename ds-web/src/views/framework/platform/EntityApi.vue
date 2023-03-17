<template>
  <div class="ds-wrapper modeldatagrant-wrapper">
    <el-breadcrumb separator-icon="ArrowRight" class="mb-20">
      <el-breadcrumb-item :to="{ path: '/' }">系统服务</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>异常管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--desc-->
    <div class="ds-desc">
      <h4>{{router.currentRoute.value.meta.title}}</h4>
      <span class="detail">用于将系统模型中部分的数据授权给公共方法查询。例如组件dsselect、dsradio、dscheckbox等获取模型数据。</span>
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
    <el-drawer custom-class="ds-drawer" v-model="options.drawerVisible" size="50%" :modal="false">
      <template #header>
        <h4>{{ options.drawerTitle }}</h4>
      </template>
      <template #default>
        <el-scrollbar>
          <el-form ref="formRef" :model="formData" :rules="formRules" label-width="auto" label-position="left">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="模型编码" prop="code" required>
                  <el-input class="" v-model="formData.code"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="模型名称" prop="description" required>
                  <el-input class="" v-model="formData.description"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="模型类名" prop="className">
              <el-input class="" v-model="formData.className"/>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="所属服务" prop="orgId" required>
                  <ds-select class="" v-model="formData.orgId" placeholder="请选择机构" data-source="Model" data-source-key="ds_microservice" text-field="description" value-field="id"></ds-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="启用状态" prop="className">
                  <el-radio-group v-model="formData.enableFlag">
                    <el-radio-button label="1" checked>
                      启用
                    </el-radio-button>
                    <el-radio-button label="0">
                      禁用
                    </el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="授权字段" prop="fieldListStr">
              <el-input v-model="formData.fieldListStr" :rows="5" type="textarea" placeholder="请输入输出字段，如：field1,field2,field3..."/>
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
  name:"EntityApi",
  path: "/framework/platform/entityapi"
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
  queryMetaPageFun:dsmain.getEntityApiMetaPage,
  queryPageInfoFun:dsmain.getEntityApiPage,
  filters:[],
  orders:[],
  excludeFields:[]
}
const tableBarData = {
  queryMetaPageFun:dsmain.getEntityApiMetaPage,
  filterBar:[
    {name:"状态",type:"dropselect",field:"enableFlag",options:[{name:"启用",value:"1"},{name:"禁用",value:"0"}]},
    {name:"模型编码、模型名称",type:"inputsearch",field:"inputSearch",defaultValue:"",filters:[
        {field:"code",expression:"$regex"},
        {field:"description",expression:"$regex"},
      ]},{
      name: "标签",
      type: "tag",
      field: "tagIdList",
      dataRange: "public",
      tagType: "ds_entity_interface:tagIdList",
    },
  ],
  batchBar:[
    {name:"批量删除",type:"button",icon:"Delete",buttonCss:"danger",command:"batchDelete"}
  ],
  toolBar:[
    {name:"",tooltip:"自定义显示列",type:"button",icon:"View",buttonCss:"",command:"_cuscol"},
    {name:"导出",type:"btngroup",icon:"ArrowDown",buttonCss:"",command:"_export",buttons:[{name:"导出当前结果",type:"button",icon:"",command:"_expall"},{name:"导出/导入设置",type:"button",icon:"",command:"_cusimpexp"}]},
    {name:"新建模型授权",type:"button",icon:"plus",buttonCss:"success",command:"create"}
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
  id:"",
  code:"",
  className: "",
  description:"",
  fieldListStr:"",
  fieldList: [],
  enableFlag: "1",
});
const formRules = reactive<FormRules>({
  code: [
    {
      required: true,
      message: '请输入模型编码',
      trigger: ['blur', 'change'],
    },
  ],
  className: [
    {
      required: true,
      message: '请输入模型类名',
      trigger: ['blur', 'change'],
    },
  ],
  description: [
    {
      required: true,
      message: '请输入模型名称',
      trigger: ['blur', 'change'],
    },
  ],
  fieldListStr: [
    {
      required: true,
      message: '请输入输出字段，如：field1,field2,field3...',
      trigger: ['blur', 'change'],
    },
  ]
});
//region 事件、方法
const handler = (command:any,data:any,event:any)=>{
  switch (command) {
    case "create":
      formData.id = "";
      options.drawerVisible = true;
      options.drawerTitle = "新建模型授权";
      formRef.value?.resetFields();
      break;
    case "edit":
      options.drawerTitle = "编辑模型授权("+data.row.code+")";
      dsmain.getEntityApiEntity(data.row.id).then((res: any) => {
        if (res) {
          options.drawerVisible = true;
          nextTick(()=>{
            formData.fieldListStr = "";
            res.fieldList.forEach((item,idx,arr)=>{
              formData.fieldListStr += item+",";
            });
            formData.fieldListStr.trimEnd(",");
            Object.assign(formData, res);
          });
        }
      });
      break;
    case "remove":
      ElMessageBox.alert('确认删除？', '提示', {
        confirmButtonText: 'OK',
        callback: (action: string) => {
          if (action == "confirm") {
            dsmain.removeEntityApi(data.row.id).then((res: any) => {
              if (res && res.deletedCount > 0) {
                dsTableRef.value.reloadData();
              }
            });
          }
        },
      })
      break;
    case "batchDelete":
      let rows = dsTableRef.value.getSelectionRows();
      let ids: any = [];
      rows.forEach((row: any, idx: number, arr: []) => {
        ids.push(row.id);
      });
      if (ids.length > 0) {
        ElMessageBox.alert('确认将选中数据批量删除？', '提示', {
          confirmButtonText: 'OK',
          callback: (action: any) => {
            if (action == "confirm") {
              dsmain.batchRemoveEntityApi(ids).then((res: any) => {
                if (res && res.deletedCount > 0) {
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
      if (adFilterBarData.org) {
        adFilters.push({key: "org.name", data: {$regex: adFilterBarData.org}});
      }
      if (adFilterBarData.eventTime && adFilterBarData.eventTime.length > 0) {
        let filter: any = {key: "$and", items: []};
        filter.items.push({key: "eventTime", data: {$gte: adFilterBarData.eventTime[0]}});
        filter.items.push({key: "eventTime", data: {$lte: adFilterBarData.eventTime[1]}});
        adFilters.push(filter);
      }
      dsTableBarRef && (dsTableBarRef.value.reloadTable(adFilters));
      break;
    case "queryReset":
      if (!data) return;
      data.resetFields();
      dsTableBarRef && (dsTableBarRef.value.reloadTable([]));
      break;
  }
}
const formSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      formData.fieldList = formData.fieldListStr.split(',');
      if (formData.id) {
        dsmain.updateEntityApi(formData).then((res: any) => {
          if (res && res.modifiedCount > 0) {
            ElMessage.success("提交成功");
            options.drawerVisible = false;
            dsTableRef.value.reloadData();
          } else {
            ElMessage.error("提交失败");
          }
        });
      } else {
        dsmain.insertEntityApi(formData).then((res: any) => {
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