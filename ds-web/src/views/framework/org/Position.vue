<template>
  <div class="ds-wrapper org-wrapper">
    <ds-breadcrumb
      class="mb-20"
      :menu-id="router.currentRoute.value.meta.id"
    ></ds-breadcrumb>
    <!--desc-->
    <div class="ds-desc">
      <h4>{{ router.currentRoute.value.meta.title }}</h4>
      <span class="detail">岗位管理</span>
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
                >编辑
              </el-button>
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
            :model="formData"
            :rules="formRules"
            label-width="auto"
            label-position="left"
          >
            <el-row>
              <el-col :span="24">
                <el-form-item label="岗位编码" prop="code">
                  <el-input
                    class=""
                    v-model="formData.code"
                    :disabled="flag"
                    placeholder="请输入岗位编码"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="岗位名称" prop="name">
                  <el-input
                    class=""
                    v-model="formData.name"
                    placeholder="请输入岗位名称"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="岗位级别" prop="levelNo">
                  <el-input
                    type="number"
                    class=""
                    v-model="formData.levelNo"
                    placeholder="请输入岗位级别，且必须为数字"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="岗位角色" prop="roleIdList">
                  <el-select
                    class="w-300"
                    placeholder="请选择岗位角色"
                    multiple
                    v-model="formData.roleIdList"
                  >
                    <el-option
                      v-for="item in roledData.entityList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
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
  name: "Position",
  path: "/framework/org/position",
};
</script>

<script lang="ts" setup>
import { ref, reactive, nextTick, toRaw, toRefs } from "vue";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import dsorg from "@dscloud/api/dsorg";
import { DsTable, DsTablebar, DsBreadcrumb } from "@dscloud/components";
import { Delete } from "@element-plus/icons-vue";
import router from "@dscloud/router";
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
    console.log("ruleForm.resetFields===>", ruleForm.value.resetFields);
  });
};
const roledData = reactive([]);
const tableData = {
  queryMetaPageFun: dsorg.getPositionMetaPage,
  queryPageInfoFun: dsorg.getPositionPage,
  filters: [],
  orders: [{ field: "createTime", direction: "desc" }],
  excludeFields: [],
};
const tableBarData = {
  queryMetaPageFun: dsorg.getPositionMetaPage,
  filterBar: [
    /*{name:"状态",type:"dropselect",field:"Status",options:[{name:"全部",value:""},{name:"有效",value:"1"},{name:"无效",value:"0"}]},*/
    {
      name: "岗位名称、编码",
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
      name: "新建岗位",
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
// 定义新建表单的属性
let formData: any = reactive({
  code: "",
  name: "",
  levelNo: null,
  roleIdList: [],
});
// 验证规则
const formRules = reactive<FormRules>({
  code: [
    {
      required: true,
      message: "请输入岗位编码",
      trigger: ["blur"],
    },
  ],
  name: [
    {
      required: true,
      message: "请输入岗位名称",
      trigger: ["blur"],
    },
  ],
  levelNo: [
    {
      required: true,
      message: "请输入岗位级别，并且只能输入数字",
      trigger: ["blur"],
    },
  ],
  // roleIdList: [
  //   {
  //     message: "请选择岗位角色",
  //     trigger: ["blur", "change"],
  //   },
  // ],
});
//region 事件、方法
const handler = (command: any, data: any, event: any) => {
  switch (command) {
    // 新建时触发
    case "create":
      // 清空
      emptyForm(ruleForm);
      nextTick(() => {
        (formData.code = ""),
          (formData.name = ""),
          (formData.levelNo = ""),
          (formData.roleIdList = []),
          (formData.id = ""),
          (formData.pinyin = "");
      });
      options.drawerVisible = true;
      flag.value = false;
      options.drawerTitle = "新建岗位";
      console.log("formData===>", formData);
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
    // 编辑时触发
    case "editDetail":
      // 清空
      emptyForm(ruleForm);
      nextTick(() => {
        (formData.code = ""),
          (formData.name = ""),
          (formData.levelNo = ""),
          (formData.roleIdList = []),
          (formData.id = ""),
          (formData.pinyin = "");
      });
      options.drawerTitle = "编辑岗位";
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
    // 删除时触发
    case "remove":
      console.log("data.row.id===>", data.row.id);
      ElMessageBox.confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          dsorg.removePosition(data.row.id).then((res) => {
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
      break;
  }
};
// 新增确定时触发
const formSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  // 暂无岗位角色
  console.log("formData====>", formData);
  formEl.validate((valid) => {
    if (valid) {
      // 级别转为数字型
      formData.levelNo = Number(formData.levelNo);
      console.log("formData===>", formData);
      if (formData.id && formData.code) {
        console.log("编辑=========");
        dsorg.updatePosition(formData).then((res: any) => {
          console.log("res==>", res);
          if (res) {
            console.log("formData===>", formData);
            ElMessage.success("修改成功");
            options.drawerVisible = false;
            dsTableRef.value.reloadData();
          } else if (res === null) {
            ElMessage.success("修改成功");
            options.drawerVisible = false;
          } else {
            ElMessage.error("修改失败");
            options.drawerVisible = false;
          }
        });
      } else {
        console.log("新建=========");
        dsorg.insertPosition(formData).then((res: any) => {
          console.log("res===>", res);
          if (res && res.id) {
            console.log("formData===>", formData);
            ElMessage.success("新增成功");
            options.drawerVisible = false;
            dsTableRef.value.reloadData();
          } else if (res === null) {
            console.log("===");
            ElMessage.success("新增成功");
            options.drawerVisible = false;
          } else {
            ElMessage.error("新增失败");
            options.drawerVisible = false;
          }
        });
      }
    }
  });
};
const params = {
  criteria: null,
  excludeFields: [],
  limit: 0,
  // pageNo: 1,
  // pageSize: 3
};
dsorg.getRolePage(params).then((res) => {
  Object.assign(roledData, res);
  console.log("roledData ===>", roledData);
});
</script>

<style scoped>
.el-link--primary {
  display: none;
}
</style>
