<template>
    <div class="ds-wrapper exception-wrapper">
        <el-breadcrumb separator-icon="ArrowRight" class="mb-20">
            <el-breadcrumb-item :to="{ path: '/' }">系统服务</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>异常管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!--desc-->
        <div class="ds-desc">
          <h4>{{router.currentRoute.value.meta.title}}</h4>
            <span class="detail">记录系统所有功能模块的异常日志。</span>
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
                            <el-button type="default" size="small" @click.prevent="handler('viewDetail',scope,$event)">详情</el-button>
                            <el-button type="danger" size="small" @click.prevent="handler('remove',scope,$event)">删除</el-button>
                        </template>
                    </el-table-column>
                </template>
            </ds-table>
        </div>
        <!--drawer-->
        <el-drawer custom-class="ds-drawer" v-model="options.drawerVisible" size="65%" :modal="true">
            <template #header>
                <h4>异常详情</h4>
            </template>
            <template #default>
                <span class="lh-22">
                    {{ options.entityData.detail }}
                </span>
            </template>
        </el-drawer>
    </div>
</template>

<script lang="ts">
export default {
  name:"Exception",
  path: "/framework/platform/exception"
}
</script>

<script lang="ts" setup>
    import { ref,reactive } from 'vue';
    import {ElMessageBox, FormInstance} from 'element-plus'
    import dsmain from '@dscloud/api/dsmain';
    import { DsTable,DsTablebar } from '@dscloud/components';
    import router from '@dscloud/router';

    const options = reactive({
        drawerVisible:false,
        entityData:null
    });
    const dsTableRef = ref();
    const dsTableBarRef = ref();
    const adFilterFormRef = ref<FormInstance>()
    const tableData = {
        queryMetaPageFun:dsmain.getExceptionMetaPage,
        queryPageInfoFun:dsmain.getExceptionMasterPage,
        filters:[],
        orders:[{"field":"eventTime","direction":"desc"}],
        excludeFields:["detail"]
    }
    const tableBarData = {
        queryMetaPageFun:dsmain.getExceptionMetaPage,
        filterBar:[
            /*{name:"状态",type:"dropselect",field:"Status",options:[{name:"全部",value:""},{name:"有效",value:"1"},{name:"无效",value:"0"}]},*/
            {name:"摘要、方法名、类名",type:"inputsearch",field:"inputSearch",defaultValue:"",filters:[
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
            /*{name:"新建",type:"button",icon:"plus",buttonCss:"success",command:"create"}*/
        ],
        onButtonClick:function(command:any,data:any,event:any){
            handler(command,data,event);
        }
    }
    const adFilterBarData = reactive({
        org:"",
        eventTime:""
    });
    //region 事件、方法
    const handler = (command:any,data:any,event:any)=>{
        switch (command) {
            case "viewDetail":
                dsmain.getExceptionEntity(data.row.id).then((res:any) => {
                    if(res){
                        options.entityData = res;
                        options.drawerVisible = true;
                    }
                });
                break;
            case "remove":
                ElMessageBox.alert('确认删除？', '提示', {
                    confirmButtonText: 'OK',
                    callback: (action:string) => {
                        if(action=="confirm"){
                            dsmain.removeException(data.row.id).then((res:any) => {
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
                                dsmain.batchRemoveException(ids).then((res:any) => {
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
    //endregion
</script>

<style lang="scss" scoped>
    .exception-wrapper{
    }
</style>
