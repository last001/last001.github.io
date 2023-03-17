<template>
  <div class="ds-wrapper log-wrapper">
    <ds-breadcrumb class="mb-20" :menu-id="router.currentRoute.value.meta.id"></ds-breadcrumb>
    <!--desc-->
    <div class="ds-desc">
      <h4>{{router.currentRoute.value.meta.title}}</h4>
      <span class="detail">记录当前机构下所有功能模块的操作日志。</span>
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
      <ds-table :show-selection="false" ref="dsTableRef" :ds-table-bar-ref="dsTableBarRef" :query-meta-page-fun="tableData.queryMetaPageFun" :query-page-info-fun="tableData.queryPageInfoFun" :filters="tableData.filters" :orders="tableData.orders" :exclude-fields="tableData.excludeFields"></ds-table>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name:"Log",
  path: "/framework/org/log"
}
</script>

<script lang="ts" setup>
import { ref,reactive } from 'vue';
import dsmain from '@dscloud/api/dsmain';
import {DsTable,DsTablebar,DsBreadcrumb} from '@dscloud/components';
import {FormInstance} from "element-plus";
import router from '@dscloud/router';
const options = reactive({
  drawerVisible:false,
  adFilterBarShow:false
});
const dsTableRef = ref();
const dsTableBarRef = ref();
const adFilterFormRef = ref<FormInstance>();
const tableData = {
  queryMetaPageFun:dsmain.getLogMetaPage,
  queryPageInfoFun:dsmain.getLogPage,
  filters:[],
  orders:[{"field":"eventTime","direction":"desc"}],
  excludeFields:[]
}
const tableBarData = {
  queryMetaPageFun:dsmain.getLogMetaPage,
  filterBar:[
    /*{name:"状态",type:"dropselect",field:"Status",options:[{name:"全部",value:""},{name:"有效",value:"1"},{name:"无效",value:"0"}]},*/
    {name:"日志内容",type:"inputsearch",field:"inputSearch",defaultValue:"",filters:[
        {field:"detail",expression:"$regex"},
      ]}
  ],
  batchBar:[
  ],
  toolBar:[
    {name:"",tooltip:"自定义显示列",type:"button",icon:"View",buttonCss:"",command:"_cuscol"},
    {name:"导出",type:"btngroup",icon:"ArrowDown",buttonCss:"",command:"_export",buttons:[{name:"导出当前结果",type:"button",icon:"",command:"_expall"},{name:"导出/导入设置",type:"button",icon:"",command:"_cusimpexp"}]},
    /*{name:"新建",type:"button",icon:"plus",buttonCss:"success",command:"create"}*/
  ],
  onButtonClick:function(command,data,event){
    handler(command,data,event);
  }
}
const adFilterBarData = reactive({
  org:"",
  eventTime:""
});
//region 事件、方法
const handler = (command,data,event)=>{
  switch (command) {
    case "querySubmit":
      let adFilters = [];
      if(adFilterBarData.org){
        adFilters.push({key: "org.name", data: {$regex:adFilterBarData.org}});
      }
      if(adFilterBarData.eventTime&&adFilterBarData.eventTime.length>0){
        let filter = {key:"$and",items:[]};
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
//endregion
</script>

<style lang="scss" scoped>
.log-wrapper{
}
</style>
