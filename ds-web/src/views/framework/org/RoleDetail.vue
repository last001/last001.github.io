<template>
  <div class="ds-wrapper org-wrapper">
    <el-breadcrumb separator-icon="ArrowRight" class="mb-20">
      <el-breadcrumb-item :to="{ path: '' }">机构</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/framework/org/role' }"
        >用户/权限</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/framework/org/role' }"
        >角色管理</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '' }">角色管理详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!--desc-->
    <div class="ds-desc">
      <el-page-header
        :title="roleName"
        @back="handler('goBack', socpe, $event)"
        class="title"
      />
      <el-tabs v-model="activeName">
        <el-tab-pane label="成员列表" name="role">
          <div class="p-20 pt-10">成员列表</div>
        </el-tab-pane>
        <el-tab-pane label="菜单权限" name="menu">
          <div class="p-20 pt-10">菜单权限</div>
        </el-tab-pane>
        <el-tab-pane label="工作台权限" name="work">
          <div class="p-20 pt-10">工作台权限</div>
        </el-tab-pane>
        <el-tab-pane label="应用权限" name="apply">
          <div class="p-20 pt-10">应用权限</div>
        </el-tab-pane>
        <el-tab-pane label="通知模板权限" name="notice">
          <div class="p-20 pt-10">通知模板权限</div>
        </el-tab-pane>
        <el-tab-pane label="快速链接权限" name="link">
          <div class="p-20 pt-10">快速链接权限</div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--查询-->
    <div class="mt-20" v-if="activeName === 'role'">
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
    <div class="mt-20" v-if="activeName === 'role'">
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
          <el-table-column fixed="right" label="操作" width="150">
            <template #default="scope">
              <el-button
                type="danger"
                size="small"
                :icon="Delete"
                @click="handler('remove', scope, $event)"
                >删除</el-button
              >
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
            :model="memberData"
            :rules="formRules"
            label-width="auto"
            label-position="left"
          >
            <el-row>
              <el-col :span="24">
                <el-form-item label="成员" prop="member">
                  <el-select
                    v-model="member"
                    filterable
                    multiple
                    clearable
                    placeholder="请选择成员"
                    value-key="id"
                  >
                    <el-option
                      v-for="item in memberData"
                      :key="item.id"
                      :value="item"
                      :label="item.fullName"
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
    <!-- 菜单权限配置 -->
    <div class="mt-25 bg-fa" v-if="activeName === 'menu'">
      <role-detail-menu></role-detail-menu>
    </div>
    <!-- 工作台权限配置 -->
    <div class="mt-25 bg-white" v-if="activeName === 'work'">
      <role-detail-work></role-detail-work>
    </div>
    <!-- 通知模板权限配置 -->
    <div class="mt-25 bg-white" v-if="activeName === 'notice'">
      <role-detail-notice> </role-detail-notice>
    </div>
    <!-- 通知模板权限配置 -->
    <div class="mt-25 bg-white" v-if="activeName === 'apply'">
      <role-detail-apply> </role-detail-apply>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Detail",
  path: "/framework/org/role/detail",
};
</script>

<script lang="ts" setup>
import { ref, reactive, nextTick, toRaw } from "vue";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import dsorg from "@dscloud/api/dsorg";
import { DsTable, DsTablebar } from "@dscloud/components";
import { Delete } from "@element-plus/icons-vue";
import router from "@dscloud/router";
import RoleDetailMenu from "./RoleDetailMenu.vue";
import RoleDetailWork from "./RoleDetailWork.vue";
import RoleDetailNotice from "./RoleDetailNotice.vue";
import RoleDetailApply from "./RoleDetailApply.vue";
// 接收路由传的参数
const roleId = router.currentRoute?.value.params.id;
const userType = router.currentRoute.value.params.userType;
const roleName = router.currentRoute.value.params.name;
// 用于新建时表单
const options = reactive({
  drawerVisible: false,
  drawerTitle: "",
  formDetailVisible: false, //表单明细信息显示
});
const dsTableRef = ref();
const dsTableBarRef = ref();
// 用于重置表单
const ruleForm = ref<FormInstance>();
const clearForm = (ruleForm) => {
  nextTick(() => {
    ruleForm.value.resetFields();
  });
};
let activeName = ref("role");
const tableData = {
  queryMetaPageFun: dsorg.getRole4UserMetaPage,
  queryPageInfoFun: dsorg.getRole4UserPage,
  filters: [
    { key: "roleIdList", data: { $eq: roleId } },
    { key: "userType", data: { $eq: userType } },
  ],
  orders: [{ field: "createTime", direction: "desc" }],
  excludeFields: [],
};
const tableBarData = {
  queryMetaPageFun: dsorg.getRole4UserMetaPage,
  filterBar: [
    /*{name:"状态",type:"dropselect",field:"Status",options:[{name:"全部",value:""},{name:"有效",value:"1"},{name:"无效",value:"0"}]},*/
    {
      name: "请输入成员名字",
      type: "inputsearch",
      field: "inputSearch",
      defaultValue: "",
      filters: [{ field: "fullName", expression: "$regex" }],
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
      name: "新建成员",
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
// 以下两属性用于成员列表
const member = ref();
const memberData = ref();
let memberList = [];
// 用于批量删除
let batchDeleteList: any = [];
let falg = ref(true);
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
      // 清空表单
      clearForm(ruleForm);
      member.value = [];
      falg.value = true;
      options.drawerVisible = true;
      options.drawerTitle = "选择成员";
      // console.log("userType==>", userType.value);
      const params = {
        criteria: {
          items: [
            {
              key: "userType",
              data: {
                $eq: userType,
              },
            },
          ],
          key: "$and",
        },
      };
      dsorg.getUserPage(params).then((res) => {
        console.log("params===>", params);
        console.log("res===>", res);
        memberData.value = res.entityList;
      });
      break;
    // 批量删除时触发
    case "batchDelete":
      let rows = dsTableRef.value.getSelectionRows();
      rows.forEach((item) => {
        batchDeleteList.push(toRaw(item));
        batchDeleteList.forEach((item) => {
          let index = item.roleIdList.indexOf(roleId);
          if (index > -1) {
            item.roleIdList.splice(index, 1);
          }
        });
      });
      ElMessageBox.confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          dsorg.updateMemberOfRoleRole(batchDeleteList).then((res) => {
            if (res === null) {
              dsTableRef.value.reloadData();
              ElMessage.success("删除成功");
              options.drawerVisible = false;
            }
          });
        })
        .catch(() => {
          ElMessage.error("取消删除");
        });
      break;
    // 删除时触发
    case "remove":
      ElMessageBox.confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          let index = data.row.roleIdList.indexOf(roleId);
          if (index > -1) {
            data.row.roleIdList.splice(index, 1);
          }
          // data.row.roleIdList = data.row.roleIdList.filter((item) => { return item != roleId.value })
          console.log("data.row.roleIdList===>", data.row);
          dsorg.updateMemberOfRoleRole(data.row).then((res) => {
            if (res === null) {
              dsTableRef.value.reloadData();
              ElMessage.success("删除成功");
              options.drawerVisible = false;
            }
          });
        })
        .catch(() => {
          ElMessage.error("取消删除");
        });
      break;
    case "goBack":
      router.go(-1);
      break;
  }
};
const formSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // 判断当前添加的成员有无重复
      for (let i = 0; i < member.value.length; i++) {
        if (Array.isArray(member.value[i].roleIdList)) {
          if (member.value[i].roleIdList.indexOf(roleId) !== -1) {
            ElMessage.error("当前" + member.value[i].fullName + "重复");
            // 清空表单
            clearForm(ruleForm);
            member.value = [];
            falg.value = false;
            options.drawerVisible = false;
            return;
          } else if (falg.value === true) {
            member.value[i].roleIdList.push(roleId);
            console.log("member.value===>", member.value);
          }
        }
      }
      dsorg.updateMemberOfRoleRole(member.value).then((res) => {
        console.log("res===>", res);
        if (res === null) {
          options.drawerVisible = false;
          dsTableRef.value.reloadData();
          ElMessage.success("添加角色成员成功");
        }
      });
    }
  });
};
</script>

<style lang="scss">
.el-link--primary {
  display: none;
}

.is-penultimate > .el-tree-node__content {
  color: #626aef;
}

.el-tree-node.is-expanded.is-penultimate > .el-tree-node__children {
  display: flex;
  flex-direction: row;
}

.is-penultimate > .el-tree-node__children > div {
  width: 25%;
}

.image {
  width: 100%;
  display: block;
}
</style>
