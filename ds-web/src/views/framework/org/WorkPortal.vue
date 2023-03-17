<template>
  <div class="ds-wrapper org-wrapper">
    <ds-breadcrumb
      class="mb-20"
      :menu-id="router.currentRoute.value.meta.id"
    ></ds-breadcrumb>
    <div class="ds-desc">
      <h4>{{ router.currentRoute.value.meta.title }}</h4>
      <span class="detail">工作台组件描述</span>
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
        <template #batchBarLeft v-if="ids2.length > 0">
          <el-checkbox
            label="全选"
            border
            class="checkAll mr-10"
            @change="handleCheckAll"
            v-model="checkAll"
          >
          </el-checkbox>
        </template>
        <template #toolBar>
          <el-radio-group v-model="radio" style="clear: both">
            <!-- 点击展示图片 -->
            <el-radio-button
              @click="(hidden = false), handler('hide', ishide, $event)"
              label="1"
              class="button1"
            >
              <el-icon>
                <IconMenu />
              </el-icon>
            </el-radio-button>
            <!-- 点击展示列表 -->
            <el-radio-button
              @click="(hidden = true), handler('hide', ishide, $event)"
              label="2"
              class="button2"
            >
              <el-icon>
                <Expand />
              </el-icon>
            </el-radio-button>
          </el-radio-group>
        </template>
      </ds-tablebar>
    </div>
    <!-- 展示图片 -->
    <div class="mt-20 bg-white" v-if="!hidden" style="height: 100%">
      <el-row class="ml-10 mr-10 mt-20" :gutter="14">
        <el-col :span="5" v-for="item in arr" :key="item">
          <el-card
            :body-style="{ height: '180px' }"
            class="mt-20 card"
            shadow="never"
          >
            <!-- <div class="check"> -->
            <el-checkbox-group
              v-model="checkPortletList"
              @change="handleCheck"
              class="check"
            >
              <el-checkbox :label="item">
                <br />
              </el-checkbox>
            </el-checkbox-group>
            <!-- </div> -->
            <div
              class="iconData"
              @click.self="handler('editDetail', item, $event)"
            >
              <el-icon>
                <Expand />
                <!-- <component :is="item.clientIcon"></component> -->
              </el-icon>
            </div>
            <div
              class="protlet"
              @click.self="handler('editDetail', item, $event)"
            >
              组件
            </div>
            <div
              class="describe"
              @click.self="handler('editDetail', item, $event)"
            >
              工作台描述
            </div>
            <div class="bottom">
              <el-button @click.prevent="handler('editDetail', item, $event)"
                >编辑</el-button
              >
              <el-dropdown class="more">
                <el-button
                  >更多<el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      @click.native="handler('design', item, $event)"
                      >设计</el-dropdown-item
                    >
                    <el-dropdown-item
                      @click.native="handler('copy', item, $event)"
                      >复制</el-dropdown-item
                    >
                    <el-dropdown-item
                      @click.native="handler('remove', item, $event)"
                      >删除</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
        class="pagination"
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[13, 30, 50, 100]"
        background
        layout="sizes, total,->,prev,  pager, next, jumper"
        :total="data.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 展示列表 -->
    <div class="mt-20" v-if="hidden">
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
          <el-table-column fixed="right" label="操作" width="220">
            <template #default="scope">
              <el-button
                size="small"
                @click.prevent="handler('editDetail', scope, $event)"
                >编辑
              </el-button>
              <el-button
                size="small"
                @click.prevent="handler('design', scope, $event)"
                >设计
              </el-button>
              <el-dropdown style="padding-left: 10px">
                <el-button size="small" style="position: relative; top: 1px"
                  >更多<el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      @click.native="handler('copy', scope, $event)"
                      >复制</el-dropdown-item
                    >
                    <el-dropdown-item
                      @click.native="handler('remove', scope, $event)"
                      >删除</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
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
            <el-form-item label="工作台名称" prop="name">
              <el-input
                class=""
                v-model="formData.name"
                :disabled="flag"
                placeholder="请请输入工作台名称"
              />
            </el-form-item>
            <el-form-item label="描述" prop="describe">
              <el-input
                type="textarea"
                class=""
                v-model="formData.describe"
                placeholder="请输入组件描述"
              />
            </el-form-item>
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
  name: "WorkPortal",
  path: "/framework/org/workportal",
};
</script>

<script lang="ts" setup>
import { ref, reactive, nextTick, toRaw } from "vue";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import * as ElIcons from "@element-plus/icons-vue";
import { Menu as IconMenu } from "@element-plus/icons-vue";
import dsorg from "@dscloud/api/dsorg";
import { DsTable, DsTablebar, DsBreadcrumb } from "@dscloud/components";
import router from "@dscloud/router";
router.addRoute("home", {
  name: "WorkPortalDesign",
  path: "/framework/org/workportaldesign",
  meta: { title: "运行记录" },
  component: () => import("./WorkPortalDesign.vue"),
});
// 用于新建时表单
const options = reactive({
  drawerVisible: false,
  drawerTitle: "",
  formDetailVisible: false, //表单明细信息显示
});
const data = reactive([
  {
    id: "1",
  },
  {
    id: "2",
  },
  {
    id: "3",
  },
  {
    id: "4",
  },
]);
// 用于全选
let list = toRaw(data);
let arr = [];
list.forEach((item) => {
  arr.push(item.id);
  // arr = toRaw(arr)
});
const ids2: any = reactive([]);
// 用于切换隐藏批量删除
const ishide: boolean = false;
// 用于切换图标
const radio = ref("1");
const checkAll = ref(false);
const checkPortletList = ref();
const dsTableRef = ref();
const dsTableBarRef = ref();
// 用于置灰编码输入框
const hidden = ref(false);
let flag = ref(false);
const currentPage = ref();
const pageSize = ref(13);
// 用于重置表单
const ruleForm = ref<FormInstance>();
const emptyForm = (ruleForm) => {
  nextTick(() => {
    ruleForm.value.resetFields();
    console.log("ruleForm.resetFields===>", ruleForm.value.resetFields);
  });
};
const tableData = {
  queryMetaPageFun: dsorg.getRoleMetaPage,
  queryPageInfoFun: dsorg.getRolePage,
  filters: [],
  orders: [{ field: "createTime", direction: "desc" }],
  excludeFields: [],
};
const tableBarData = {
  queryMetaPageFun: dsorg.getRoleMetaPage,
  filterBar: [
    /*{name:"状态",type:"dropselect",field:"Status",options:[{name:"全部",value:""},{name:"有效",value:"1"},{name:"无效",value:"0"}]},*/
    {
      name: "组件名称",
      type: "inputsearch",
      field: "inputSearch",
      defaultValue: "",
      filters: [
        { field: "name", expression: "$regex" },
        // { field: "code", expression: "$regex" },
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
      name: "创建模板",
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
let formData: any = reactive({
  name: "",
  describe: "",
});
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
      options.drawerTitle = "创建工作台";
      console.log("formData===>", formData);
      break;
    // 批量删除时触发
    case "batchDelete":
      let idsCopy = toRaw(ids2);
      console.log("ids===>", ids2);
      if ((idsCopy.length = 0)) {
        console.log("===");
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
      } else if (idsCopy.length > 0) {
        console.log("idsCopy===>", idsCopy);
      }
      break;
    // 编辑时触发
    case "editDetail":
      console.log("data===>", data);
      emptyForm(ruleForm);
      options.drawerTitle = "编辑工作台";
      options.drawerVisible = true;
      // dsorg.getPositionEntity(data.row.id).then((res: any) => {
      //   if (res) {
      //     console.log("res===>", res);
      //     nextTick(() => {
      //       Object.assign(formData, res)
      //     })
      //   }
      //   console.log("formData===>", formData);
      //   flag.value = true;
      //   options.drawerVisible = true;
      // });
      break;
    // 删除时触发
    case "remove":
      console.log("data.id===>", data);
      console.log("删除");
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
    case "design":
      let id: string = "";
      if (data) {
        let flag = Object.keys(data);
        id = flag.indexOf("row") !== -1 ? data.row.id : data;
      }
      router.push({
        name: "WorkPortalDesign",
        params: {
          id,
          // code: data.row.code ? data.row.code : data,
          // name: data.row.name ? data.row.name : data,
        },
      });
      break;
    case "copy":
      console.log("复制");
      break;
    case "hide":
      ids2.length = 0;
      checkPortletList.value = [];
      dsTableBarRef.value.showBatchBar(data);
      break;
  }
};
// 新增确定时触发
const formSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  // 暂无岗位角色
  formData.roleIdList = null;
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
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};

const handleCheckAll = (val: boolean) => {
  checkPortletList.value = val ? arr : [];
  ids2.length = val ? 1 : 0;
};
const handleCheck = (value: string[]) => {
  ids2.id = value;
  ids2.length = value.length;
  dsTableBarRef.value.showBatchBar(value.length);
  const checkedCount = value.length;
  checkAll.value = checkedCount === arr.length;
};
</script>

<style lang="scss" scoped>
.el-link--primary {
  display: none;
}
.button1 {
  position: relative;
  top: -3px;
}
.button2 {
  position: relative;
  top: -3px;
}
.card {
  border: 0.5px solid rgba(185, 185, 185, 0.5);
}
.iconData {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.protlet {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.describe {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bottom {
  position: relative;
  top: 20px;
}
.more {
  float: right;
}
.check {
  position: relative;
  left: -10px;
  top: -15px;
}

.checkAll {
  background-color: white;
}

.pagination {
  position: relative;
  padding: 20px 20px;
}
</style>
