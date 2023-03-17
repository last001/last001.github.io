<template>
  <div class="ds-wrapper org-wrapper">
    <el-breadcrumb separator-icon="ArrowRight" class="mb-20">
      <el-breadcrumb-item :to="{ path: '' }">系统服务</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/framework/org/TimedTask' }"
        >定时任务</el-breadcrumb-item
      >
      <el-breadcrumb-item>运行日志</el-breadcrumb-item>
    </el-breadcrumb>
    <!--desc-->
    <div class="ds-desc">
      <el-page-header
        :title="title"
        @back="handler('goBack', title, $event)"
        class="title"
      />
      <h4>{{ router.currentRoute.value.meta.title }}</h4>
      <span class="detail">查询任务运行记录</span>
      <el-icon class="icon">
        <component :is="router.currentRoute.value.meta.iconName"></component>
      </el-icon>
    </div>
    <!--查询-->
    <div class="mt-20">
      <ds-tablebar
        ref="dsTableBarRef"
        :ds-table-ref="dsTableRef"
        :query-meta-page-fun="tableData.queryMetaPageFun"
        :filter-bar="tableBarData.filterBar"
        :batch-bar="tableBarData.batchBar"
        :tool-bar="tableBarData.toolBar"
        :on-button-click="tableBarData.onButtonClick"
        :adFilterEnable="false"
      >
      </ds-tablebar>
    </div>
    <!-- table panel -->
    <div class="mt-20">
      <ds-table
        ref="dsTableRef"
        :ds-table-bar-ref="dsTableBarRef"
        :query-meta-page-fun="tableData.queryMetaPageFun"
        :query-page-info-fun="tableData.queryPageInfoFun"
        :filters="tableData.filters"
        :orders="tableData.orders"
        :exclude-fields="tableData.excludeFields"
      >
        <template #operationColumn>
          <el-table-column fixed="right" label="操作" width="170">
            <template #default="scope">
              <el-button
                type="default"
                size="small"
                @click.prevent="handler('editDetail', scope, $event)"
                >查看日志记录
              </el-button>
            </template>
          </el-table-column>
        </template>
      </ds-table>
    </div>
    <!--查看日志记录-->
    <!-- <el-drawer
      custom-class="ds-drawer"
      v-model="options.drawerVisible"
      size="30%"
      :modal="false"
    >
      <template #header>
        <h4>{{ options.drawerTitle }}</h4>
      </template>
      <template #default>
        <el-scrollbar>
          <el-form
            ref="ruleForm"
            :model="formData"
            label-width="auto"
            label-position="left"
          >
            <el-form-item label="记录时间" prop="time">
              <el-input class="" v-model="formData.time" disabled />
            </el-form-item>
            <el-form-item label="操作内容" prop="operatingContent">
              <el-input class="" v-model="formData.operatingContent" disabled />
            </el-form-item>
            <el-form-item label="错误信息" prop="errorMessage">
              <el-input class="" v-model="formData.errorMessage" disabled />
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-dropdown class="more">
            <el-button @click="handler('more', socpe, $event)"
              >更多<el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </el-button>
          </el-dropdown>
          <el-button @click="options.drawerVisible = false">取消</el-button>
          <el-button type="primary" @click="formSubmit(ruleForm)"
            >确定</el-button
          >
        </div>
      </template>
    </el-drawer> -->
  </div>
</template>

<script lang="ts">
export default {
  name: "TimedTaskRecord",
  path: "/framework/org/timedtaskrecord",
};
</script>

<script lang="ts" setup>
import { ref, reactive, nextTick, toRaw, toRefs } from "vue";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import dsorg from "@dscloud/api/dsorg";
import { DsTable, DsTablebar, DsBreadcrumb } from "@dscloud/components";
import router from "@dscloud/router";
router.addRoute("home", {
  name: "TimedTaskSubscribe",
  path: "/framework/org/timedtasksubscribe",
  meta: { title: "查看日志记录", menuAside: true },
  component: () => import("./TimedTaskSubscribe.vue"),
});
const title = router.currentRoute.value.params.name;
const code = router.currentRoute.value.params.code;
const id = router.currentRoute.value.params.id;
console.log("id===>", id);
console.log("title===>", title);
console.log("code===>", code);
// 用于新建时表单
const options = reactive({
  drawerVisible: false,
  drawerTitle: "",
  formDetailVisible: false, //表单明细信息显示
});
const dsTableRef = ref();
const dsTableBarRef = ref();
// 用于置灰编码输入框
let flag = ref(false);
// 用于重置表单
const ruleForm = ref<FormInstance>();
const emptyForm = (ruleForm) => {
  nextTick(() => {
    ruleForm.value.resetFields();
  });
};
const tableData = {
  queryMetaPageFun: dsorg.getOrganizationMetaPage,
  queryPageInfoFun: dsorg.getOrganizationPage,
  filters: [],
  orders: [{ field: "createTime", direction: "desc" }],
  excludeFields: [],
};
const tableBarData = {
  queryMetaPageFun: dsorg.getOrganizationMetaPage,
  filterBar: [
    /*{name:"状态",type:"dropselect",field:"Status",options:[{name:"全部",value:""},{name:"有效",value:"1"},{name:"无效",value:"0"}]},*/
    {
      name: "调用方式",
      type: "dropselect",
      field: "callWay",
      defaultValue: "",
      options: [
        { name: "启动器1", value: "0" },
        { name: "启动器2", value: "1" },
      ],
    },
    {
      name: "服务器节点",
      type: "dropselect",
      field: "serverNode",
      defaultValue: "",
      options: [
        { name: "01", value: "1" },
        { name: "02", value: "0" },
      ],
    },
    {
      name: "任务名称",
      type: "inputsearch",
      field: "inputSearch",
      defaultValue: "",
      filters: [{ field: "name", expression: "$regex" }],
    },
  ],
  batchBar: [
    {
      name: "批量删除",
      type: "button",
      icon: "Delete",
      buttonCss: "danger",
      command: "batchDelete",
    },
  ],
  toolBar: [
    {
      name: "导出",
      type: "btngroup",
      icon: "ArrowDown",
      buttonCss: "",
      command: "_export",
      buttons: [
        { name: "导出当前结果", type: "button", icon: "", command: "_expall" },
        {
          name: "导出/导入设置",
          type: "button",
          icon: "",
          command: "_cusimpexp",
        },
      ],
    },
  ],
  onButtonClick: function (command: any, data: any, event: any) {
    handler(command, data, event);
  },
};
// 定义新建表单的属性
let formData: any = reactive({
  time: "",
  operatingContent: "",
  errorMessage: "",
});
//region 事件、方法
const handler = (command: any, data: any, event: any) => {
  switch (command) {
    // 编辑时触发
    case "editDetail":
      router.push({
        name: "TimedTaskSubscribe",
        params: {
          code: code,
          id: id,
          title: title,
        },
      });
      // 清空
      // emptyForm(ruleForm);
      // nextTick(() => {
      //   (formData.code = ""),
      //     (formData.name = ""),
      //     (formData.levelNo = ""),
      //     (formData.roleIdList = []),
      //     (formData.id = ""),
      //     (formData.pinyin = "");
      // });
      // options.drawerTitle = "查看日志";
      // options.drawerVisible = true;
      //   dsorg.getPositionEntity(data.row.id).then((res: any) => {
      //     console.log("res===>", res);
      //     if (res) {
      //       nextTick(() => {
      //         Object.assign(formData, res);
      //       });
      //     }
      //     console.log("formData===>", formData);
      //     flag.value = true;
      //     options.drawerVisible = true;
      //   });
      break;
    case "more":
      console.log("data===>", data);
      break;
    case "goBack":
      router.go(-1);
      break;
  }
};
</script>

<style scoped>
.el-link--primary {
  display: none;
}
.more {
  float: left;
}
</style>
