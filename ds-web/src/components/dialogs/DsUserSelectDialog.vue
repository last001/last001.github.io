<template>
  <el-dialog custom-class="ds-user-select-dialog" append-to-body v-model="data.modelValue" title="选择用户" width="50%" @close="handler('dialogClose')">
    <!-- -->
    <div>
      <el-tag class="mr-5 mb-5" closable>张老师</el-tag><el-tag class="mr-5 mb-5" closable>张老师</el-tag>
      <el-tag class="mr-5 mb-5" closable>张老师</el-tag><el-tag class="mr-5 mb-5" closable>张老师</el-tag>
    </div>
    <!--ds-tablebar-->
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
    <!--ds-table-->
    <div class="mt-20">
      <ds-table ref="dsTableRef" :ds-table-bar-ref="dsTableBarRef" :query-meta-page-fun="tableData.queryMetaPageFun" :query-page-info-fun="tableData.queryPageInfoFun" :filters="tableData.filters" :orders="tableData.orders" :exclude-fields="tableData.excludeFields">
      </ds-table>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="data.modelValue = false">取消</el-button>
        <el-button type="primary" @click="data.modelValue = false">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, watch} from "vue";
import dsmain from "@dscloud/api/dsmain";
import {FormInstance} from "element-plus";
import DsTablebar from "./../commons/DsTablebar.vue";
import DsTable from "./../commons/DsTable.vue";
export default defineComponent({
  name: "DsUserSelectDialog",
  components:{DsTablebar,DsTable},
  props: {
    modelValue: Boolean,
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const data = reactive({
      modelValue: props.modelValue
    });
    const dsTableRef = ref();
    const dsTableBarRef = ref();
    const adFilterFormRef = ref<FormInstance>()
    const tableData = {
      queryMetaPageFun:dsmain.getUserMetaPage,
      queryPageInfoFun:dsmain.getUserPage,
      filters:[],
      orders:[{"field":"eventTime","direction":"desc"}],
      excludeFields:["detail"]
    }
    const tableBarData = {
      queryMetaPageFun:dsmain.getUserMetaPage,
      filterBar:[
        /*{name:"状态",type:"dropselect",field:"Status",options:[{name:"全部",value:""},{name:"有效",value:"1"},{name:"无效",value:"0"}]},*/
        {name:"账号、姓名",type:"inputsearch",field:"inputSearch",defaultValue:"",filters:[
            {field:"summary",expression:"$regex"},
            {field:"invokeClass",expression:"$regex"},
            {field:"invokeMethod",expression:"$regex"},
          ]}
      ],
      batchBar:[
      ],
      toolBar:[
      ],
      onButtonClick:function(command:any,data:any,event:any){
        handler(command,data,event);
      }
    }
    const adFilterBarData = reactive({
      org:"",
      eventTime:""
    });
    //#region 事件
    const handler = (command: string, data: any, event: any) => {
      switch (command) {
        case "dialogClose":
          context.emit("update:modelValue", false);
          break;
      }
    }
    //#endregion
    //#region 监听属性变化
    watch(() => props.modelValue, (newValue, value) => {
      if (newValue !== value) {
        data.modelValue = newValue;
        context.emit('update:modelValue', newValue);
        return true;
      }
      return false;
    });
    //#endregion
    return{data,handler,dsTableRef,dsTableBarRef,adFilterFormRef,tableData,tableBarData,adFilterBarData}
  }
});
</script>

<style lang="scss">
.el-dialog.ds-user-select-dialog{
   .el-dialog__body{padding-top:5px;}
}
</style>