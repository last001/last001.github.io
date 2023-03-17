<template>
    <div class="ds-wrapper org-wrapper">
        <el-breadcrumb separator-icon="ArrowRight" class="mb-20">
            <el-breadcrumb-item :to="{ path: '' }">平台</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/framework/org/role' }">系统服务</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/framework/org/role' }">应用管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '' }">应用接口详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!--desc-->
        <div class="ds-desc">
           <el-page-header title="返回" @back="goBack" class="title" /> 
        </div>
        <!--查询-->
        <div class="mt-20" v-if="activeName === 'role'">
            <ds-tablebar ref="dsTableBarRef" :ds-table-ref="dsTableRef"
                :query-meta-page-fun="tableData.queryMetaPageFun" :filter-bar="tableBarData.filterBar"
                :batch-bar="tableBarData.batchBar" :tool-bar="tableBarData.toolBar"
                :on-button-click="tableBarData.onButtonClick" :adFilterEnable="false">
            </ds-tablebar>
        </div>
        <!-- table panel -->
        <div class="mt-20" v-if="activeName === 'role'">
            <ds-table ref="dsTableRef" :ds-table-bar-ref="dsTableBarRef"
                :query-meta-page-fun="tableData.queryMetaPageFun" :query-page-info-fun="tableData.queryPageInfoFun"
                :filters="tableData.filters" :orders="tableData.orders" :exclude-fields="tableData.excludeFields">
                <template #operationColumn>
                    <el-table-column fixed="right" label="操作" width="100">
                        <template #default="scope">
                            <el-button type="danger" size="small" 
                                @click="handler('', scope, $event)">取消授权</el-button>
                        </template>
                    </el-table-column>
                </template>
            </ds-table>
        </div>

        <el-dialog v-model="options.drawerVisible" width="1200px" title="接口授权">
            <div style="height: 500px;overflow:hidden auto;">
                <ds-tablebar ref="dsTableBarRef" :ds-table-ref="dsTableRef"
                :query-meta-page-fun="tableData2.queryMetaPageFun" :filter-bar="tableBarData2.filterBar"
                :batch-bar="tableBarData2.batchBar" :tool-bar="tableBarData2.toolBar"
                :on-button-click="tableBarData2.onButtonClick" :adFilterEnable="false">
                </ds-tablebar>
                <ds-table ref="dsTableRef" :ds-table-bar-ref="dsTableBarRef"
                    :query-meta-page-fun="tableData2.queryMetaPageFun" :query-page-info-fun="tableData2.queryPageInfoFun"
                    :filters="tableData2.filters" :orders="tableData2.orders" :exclude-fields="tableData2.excludeFields">
                    <template #operationColumn>
                        <el-table-column fixed="right" label="操作" width="100">
                            <template #default="scope">
                                <el-button type="danger" size="small" 
                                    @click="handler('', scope, $event)">授权</el-button>
                            </template>
                        </el-table-column>
                    </template>
                </ds-table>
            </div>
         

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="options.drawerVisible = false">关闭</el-button>
                    <el-button type="primary" @click="">提交</el-button>
                </span>
            </template>
        </el-dialog>

        
       
     
    </div>
</template>

<script lang="ts">
export default {
    name: "ApplicationDetail",
    path: "/framework/platform/application/applicationDetail"
};
</script>

<script lang="ts" setup>
import { ref, reactive, nextTick, onMounted } from "vue";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import dsorg from "@dscloud/api/dsorg";
import request from "@dscloud/utils/request";
import dsmain from '@dscloud/api/dsmain';
import { DsTable, DsTablebar } from "@dscloud/components";
import { Delete } from "@element-plus/icons-vue";
import router from '@dscloud/router';

// 接收路由传的参数
const applicationclientId =router.currentRoute?.value.params.clientId;


//
const options = reactive({
    drawerVisible: false,
    drawerTitle: "",
});
const dsTableRef = ref();
const dsTableBarRef = ref();
// 用于重置表单
const ruleForm = ref<FormInstance>()
const clearForm = (ruleForm) => {
    nextTick(() => {
        ruleForm.value.resetFields()
    })
}
let activeName = ref('role')
// 该应用已授权的接口表
const tableData = {
    queryMetaPageFun:dsmain.getClientApiMetaPage,
    queryPageInfoFun:dsmain.getClientApiPage,
    filters: [{ key: "clientId", data: { $eq: applicationclientId } }],
    orders: [{ field: "createTime", direction: "desc" }],
    excludeFields: ['detail'],
};
// 该应用已授权的接口表头
const tableBarData = {
    queryMetaPageFun:dsmain.getClientApiMetaPage,
    filterBar: [],
    batchBar: [
        {
            name: "批量取消授权",
            type: "button",
            buttonCss: "danger",
            command: "",
        },
    ],
    toolBar: [
        {
            name: "新增应用接口授权",
            type: "button",
            icon: "plus",
            buttonCss: "success",
            command: "create",
        },
    ],
    onButtonClick: function (command: any, data: any, event: any) {
        handler(command, data, event);
    },
};
//该应用未授权的接口表
const tableData2 = {
    queryMetaPageFun:dsmain.getInterfaceMetaPage,
    queryPageInfoFun:dsmain.getNotAuthorizationPage,
    filters: [{ key: "clientId", data: { $eq: applicationclientId } }],
    orders: [{ field: "createTime", direction: "desc" }],
    excludeFields: ['detail'],
};
//该应用未授权的接口表头
const tableBarData2 = {
    queryMetaPageFun:dsmain.getInterfaceMetaPage,
    filterBar: [  
        {name:"应用接口Id",type:"inputsearch",field:"inputSearch2",defaultValue:"",filters:[
            {field:"url",expression:"$regex"},
        ]},
        {name:"应用接口地址",type:"inputsearch",field:"inputSearch3",defaultValue:"",filters:[
            {field:"name",expression:"$regex"},
        ]}
    ],
    batchBar: [
        {
            name: "批量授权",
            type: "button",
            buttonCss: "success",
            command: "",
        },
    ],
    toolBar: [],
    onButtonClick: function (command: any, data: any, event: any) {
        handler(command, data, event);
    },
};

const searchformData={
    clientId:'',
    apiId:'',
    apiUrl:'',
}
// 验证规则
const formRules = reactive<FormRules>({
    // member: [
    //     {
    //         required: true,
    //         message: "请选择成员",
    //         trigger: ["blur"],
    //     },
    // ],
});
//region 事件、方法
const handler = (command: any, data: any, event: any) => {
    switch (command) {
        // 新建时触发
        case "create":
            options.drawerVisible=true
            // 清空表单
            clearForm(ruleForm)
            
          
            break;
        // 批量删除时触发
        case "batchDelete":
            let rows = dsTableRef.value.getSelectionRows();
            let ids: any = [];
            rows.forEach((row: any, idx: number, arr: []) => {
                if (row.isItem != true) {
                    ids.push(row.id);
                }
            });
            if (ids.length > 0) {
                console.log("ids===>", ids);
                ElMessageBox.alert("确认将选中数据批量删除？", "提示", {
                    confirmButtonText: "OK",
                    callback: (action: string) => {
                        if (action == "confirm") {
                            dsorg.batchRemovePosition(ids).then((res: any) => {
                                console.log("已批量删除");
                                if (res && res.deletedCount > 0) {
                                    dsTableRef.value.reloadData();
                                    ElMessage.success("批量删除成功");
                                }
                            });
                        }
                    },
                });
            }
            break;
        // 删除时触发
        case "remove":
            ElMessageBox.confirm('确认删除？', '提示', {
                confirmButtonText: "确定",
                cancelButtonText: '取消',
            }).then(() => {
               
            }).catch(() => {
                ElMessage.error("取消删除");
            })
            break
    }
};

// 用于页面返回
function goBack() {
    router.go(-1)
}
</script>

<style lang="scss" scoped>
.el-link--primary {
    display: none;
}

.is-penultimate>.el-tree-node__content {
    color: #626aef;
}

.el-tree-node.is-expanded.is-penultimate>.el-tree-node__children {
    display: flex;
    flex-direction: row;
}

.is-penultimate>.el-tree-node__children>div {
    width: 25%;
}

.image {
    width: 100%;
    display: block;
}
.mCS-dark-4.mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar, .mCS-light-4.mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar {width: 5px;}
::-webkit-scrollbar {width: 6px;height: 6px;background: transparent;}
::-webkit-scrollbar-thumb {background: transparent;border-radius: 4px;}
:hover::-webkit-scrollbar-thumb {background: hsla(0, 0%, 53%, 0.4);}
:hover::-webkit-scrollbar-track {background: hsla(0, 0%, 53%, 0.1);}
</style>
