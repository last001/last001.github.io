<template>
  <div class="ds-wrapper org-wrapper">
    <el-breadcrumb separator-icon="ArrowRight" class="mb-20">
      <el-breadcrumb-item :to="{ path: '' }">系统服务</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/framework/org/TimedTask' }"
        >定时任务</el-breadcrumb-item
      >
      <el-breadcrumb-item>运行日志</el-breadcrumb-item>
      <el-breadcrumb-item>查看日志记录</el-breadcrumb-item>
    </el-breadcrumb>
    <!--desc-->
    <div class="ds-desc">
      <el-page-header
        :title="title"
        @back="handler('goBack', title, $event)"
        class="title"
      />
      <h4>{{ router.currentRoute.value.meta.title }}</h4>
      <span class="detail">查询日志记录</span>
      <el-icon class="icon">
        <component :is="router.currentRoute.value.meta.iconName"></component>
      </el-icon>
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
    <el-drawer
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
            <el-button @click="handler('more', id, $event)"
              >更多<el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </el-button>
          </el-dropdown>
          <el-button @click="options.drawerVisible = false">取消</el-button>
          <el-button type="primary" @click="options.drawerVisible = false"
            >确定</el-button
          >
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts">
export default {
  name: "TimedTaskSubscribe",
  path: "/framework/org/timedtasksubscribe",
};
</script>

<script lang="ts" setup>
import { ref, reactive, nextTick } from "vue";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import dsorg from "@dscloud/api/dsorg";
import { DsTable, DsTablebar, DsBreadcrumb } from "@dscloud/components";
import router from "@dscloud/router";
const title = router.currentRoute.value.params.title;
const code = router.currentRoute.value.params.code;
const id = router.currentRoute.value.params.id;
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
      //   清空;
      emptyForm(ruleForm);
      nextTick(() => {
        (formData.code = ""),
          (formData.name = ""),
          (formData.levelNo = ""),
          (formData.roleIdList = []),
          (formData.id = ""),
          (formData.pinyin = "");
      });
      options.drawerTitle = "查看日志";
      options.drawerVisible = true;
      dsorg.getPositionEntity(data.row.id).then((res: any) => {
        console.log("res===>", res);
        if (res) {
          nextTick(() => {
            Object.assign(formData, res);
          });
        }
        console.log("formData===>", formData);
        flag.value = true;
        options.drawerVisible = true;
      });
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
