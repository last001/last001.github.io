<template>
  <div class="ds-wrapper org-wrapper">
    <ds-breadcrumb
      class="mb-20"
      :menu-id="router.currentRoute.value.meta.id"
    ></ds-breadcrumb>
    <!--desc-->
    <div class="ds-desc">
      <h4>{{ router.currentRoute.value.meta.title }}</h4>
      <span class="detail">角色管理</span>
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
        :exclude-fields="tableData.excludeFields"
      >
        <template #operationColumn>
          <el-table-column fixed="right" label="操作" width="250">
            <template #default="scope">
              <el-button
                type="default"
                size="small"
                @click.prevent="handler('editDetail', scope, $event)"
                >编辑
              </el-button>
              <el-button
                type="default"
                size="small"
                :icon="Delete"
                @click="handler('roleAuthorization', scope, $event)"
                >角色成员
              </el-button>
              <el-button
                type="default"
                size="small"
                :icon="Delete"
                @click="handler('remove', scope, $event)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </template>
      </ds-table>
    </div>
    <!--新增-->
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
            :rules="formRules"
            label-width="auto"
            label-position="left"
          >
            <el-row>
              <el-col :span="24">
                <el-form-item label="角色名称" prop="name">
                  <el-input
                    v-model="formData.name"
                    placeholder="请输入角色名称（不能重复）"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="角色编码" prop="code">
                  <el-input
                    v-model="formData.code"
                    :disabled="flag"
                    placeholder="请输入角色编码（不能重复）"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="角色描述" prop="description">
                  <el-input
                    type="textarea"
                    v-model="formData.description"
                    placeholder="请输入该角色的描述"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="用户类型" prop="userType">
                  <el-select
                    v-model="userType"
                    :disabled="flag"
                    placeholder="请选择用户类型"
                  >
                    <el-option
                      v-for="item in userTypeData"
                      :key="item.id"
                      :value="item.value"
                      :label="item.label"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-scrollbar>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="options.drawerVisible = false">取消</el-button>
          <el-button type="primary" @click="formSubmit(ruleForm)"
            >确定</el-button
          >
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts">
export default {
  name: "Role",
  path: "/framework/org/role",
};
</script>

<script lang="ts" setup>
import { ref, reactive, nextTick } from "vue";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import dsorg from "@dscloud/api/dsorg";
import { DsTable, DsTablebar, DsBreadcrumb } from "@dscloud/components";
import { Delete } from "@element-plus/icons-vue";
import router from "@dscloud/router";
router.addRoute("home", {
  name: "RoleDetail",
  path: "/framework/org/roledetail",
  meta: { title: "角色管理详情", menuAside: true },
  component: () => import("./RoleDetail.vue"),
});
// 用于新建时表单
const options = reactive({
  drawerVisible: false,
  drawerTitle: "",
  formDetailVisible: false, //表单明细信息显示
});
// 设置table，获取数据
const tableData = {
  queryMetaPageFun: dsorg.getRoleMetaPage,
  queryPageInfoFun: dsorg.getRolePage,
  filters: [],
  excludeFields: [],
};
// 设置tableBar，获ruleForm取数据
const tableBarData = {
  queryMetaPageFun: dsorg.getRoleMetaPage,
  filterBar: [
    /*{name:"状态",type:"dropselect",field:"Status",options:[{name:"全部",value:""},{name:"有效",value:"1"},{name:"无效",value:"0"}]},*/
    {
      name: "请输入角色名称、编码",
      type: "inputsearch",
      field: "inputSearch",
      defaultValue: "",
      filters: [
        { field: "name", expression: "$regex" },
        { field: "code", expression: "$regex" },
      ],
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
    {
      name: "新建角色",
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
let flag = ref(false);
const dsTableRef = ref();
const dsTableBarRef = ref();
// 定义新建表单的属性
let formData: any = reactive({
  name: "",
  code: "",
  description: "",
  // userType: {}
});
const userType = ref();
const userTypeData = [
  {
    id: 1,
    value: "User",
    label: "User",
  },
  {
    id: 2,
    value: "Student",
    label: "Student",
  },
];
// 验证规则
const formRules = reactive({
  code: [
    {
      required: true,
      message: "请输入角色编码",
      trigger: ["blur"],
    },
  ],
  name: [
    {
      required: true,
      message: "请输入角色名称",
      trigger: ["blur"],
    },
  ],
});
// 用于重置
const ruleForm = ref();
// 重置表单
const emptyForm = (ruleForm) => {
  nextTick(() => {
    ruleForm.value.resetFields();
    console.log("ruleForm.resetFields===>", ruleForm.value.resetFields);
  });
};
//region 事件、方法
const handler = (command: any, data: any, event: any) => {
  switch (command) {
    // 新建时触发
    case "create":
      formData.id = "";
      emptyForm(ruleForm);
      nextTick(() => {
        (formData.name = ""),
          (formData.code = ""),
          (formData.description = ""),
          (formData.userType = {}),
          (formData.id = ""),
          (formData.pinyin = "");
      });
      options.drawerVisible = true;
      flag.value = false;
      options.drawerTitle = "新建角色";
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
              dsorg.batchRemoveRole(ids).then((res: any) => {
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
    // 编辑时触发
    case "editDetail":
      emptyForm(ruleForm);
      options.drawerTitle = "编辑角色";
      dsorg.getRoleEntity(data.row.id).then((res) => {
        console.log("res===>", res);
        nextTick(() => {
          Object.assign(formData, res);
        });
      });
      setTimeout(() => {
        options.drawerVisible = true;
        flag.value = true;
      }, 500);
      console.log("formData===>", formData);
      console.log("编辑");
      break;
    // 删除时触发
    case "remove":
      ElMessageBox.confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          dsorg.removeRole(data.row.id).then((res) => {
            if (res && res.deletedCount > 0) {
              dsTableRef.value.reloadData();
              ElMessage.success("删除成功");
              options.drawerVisible = false;
            }
          });
        })
        .catch(() => {
          ElMessage.error("取消删除");
        });
      console.log("删除");
      break;
    // 点击角色成员触发
    case "roleAuthorization":
      router.push({
        name: "RoleDetail",
        params: {
          code: data.row.code,
          id: data.row.id,
          name: data.row.name,
          userType: data.row.userType,
        },
      });
      break;
  }
};
const formSubmit = (formEl: FormInstance | undefined) => {
  console.log("userType===>", userType);
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (formData.id) {
        console.log("当前为编辑");
        dsorg.updateRole(formData).then((res) => {
          console.log("res===>", res);
          console.log("formData===>", formData);
          if (res) {
            ElMessage.success("修改成功");
            options.drawerVisible = false;
            dsTableRef.value.reloadData();
          } else if (res === null) {
            ElMessage.success("修改成功");
            options.drawerVisible = false;
            dsTableRef.value.reloadData();
          } else {
            ElMessage.error("修改失败");
            options.drawerVisible = false;
          }
        });
      } else {
        delete formData.id;
        formData.userType = userType.value;
        console.log("fomData==>", formData);
        dsorg.insertRole(formData).then((res) => {
          console.log("res===>", res);
          console.log("fomData==>", formData);
          if (res && res.id) {
            ElMessage.success("新增成功");
            dsTableRef.value.reloadData();
            options.drawerVisible = false;
          } else if (res === null) {
            console.log("===");
            ElMessage.success("新增成功");
            options.drawerVisible = false;
            dsTableRef.value.reloadData();
          } else {
            ElMessage.error("新增失败");
            options.drawerVisible = false;
          }
        });
      }
    }
  });
};
</script>

<style scoped></style>
