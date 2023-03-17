<template>
  <div class="ds-wrapper org-wrapper">
    <ds-breadcrumb
      class="mb-20"
      :menu-id="router.currentRoute.value.meta.id"
    ></ds-breadcrumb>
    <!--desc-->
    <div class="ds-desc">
      <h4>{{ router.currentRoute.value.meta.title }}</h4>
      <span class="detail">任务管理</span>
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
          <el-table-column fixed="right" label="操作" width="200">
            <template #default="scope">
              <el-button
                type="default"
                size="small"
                @click.prevent="handler('editDetail', scope, $event)"
                >编辑
              </el-button>
              <el-button
                type="primary"
                size="small"
                @click="handler('', scope, $event)"
                >启动
              </el-button>
              <el-dropdown class="more" trigger="click" placement="bottom">
                <el-button size="small"
                  >更多<el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      @click.native="handler('remove', scope, $event)"
                      >删除
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click.native="handler('toDetail', scope, $event)"
                      >运行记录
                    </el-dropdown-item>
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
      size="40%"
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
            <!-- 代码 -->
            <el-form-item label="任务代码" prop="code">
              <el-input
                v-model="formData.code"
                :disabled="flag"
                placeholder="请输入任务代码"
              />
            </el-form-item>
            <!-- 名称 -->
            <el-form-item label="任务名称" prop="name">
              <el-input v-model="formData.name" placeholder="请输入任务名称" />
            </el-form-item>
            <!-- 执行方式 -->
            <el-form-item label="执行方式" prop="implementWay">
              <el-checkbox-group
                v-model="formData.implementWay"
                @change="
                  handler(
                    'hanleImplementWayChange',
                    formData.implementWay,
                    $event
                  )
                "
              >
                <el-checkbox label="repeat">重复执行</el-checkbox>
                <el-checkbox label="once">仅执行一次</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <!-- 周期 -->
            <el-form-item
              label="周期"
              prop="period"
              v-if="formData.implementWay != 'once'"
            >
              <el-select
                placeholder="请选择周期"
                v-model="formData.period"
                clearable
              >
                <el-option
                  v-for="item in periodData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option> </el-select
            ></el-form-item>
            <!-- 日期（周） -->
            <el-form-item
              label="日期"
              prop="checkWeeksList"
              v-if="formData.period === 'weeks'"
            >
              <el-checkbox-group v-model="formData.checkWeeksList">
                <el-checkbox-button label="周一" />
                <el-checkbox-button label="周二" />
                <el-checkbox-button label="周三" />
                <el-checkbox-button label="周四" />
                <el-checkbox-button label="周五" />
                <el-checkbox-button label="周六" />
                <el-checkbox-button label="周日" />
              </el-checkbox-group>
            </el-form-item>
            <!-- 日期（月） -->
            <el-form-item
              label="日期"
              prop="checkMonthList"
              v-if="formData.period === 'month'"
            >
              <el-checkbox-group
                v-model="formData.checkMonthList"
                v-for="item in 31"
              >
                <el-checkbox-button
                  :label="item"
                  style="width: 18px; padding: 10px"
                  >{{ item }}
                </el-checkbox-button>
              </el-checkbox-group>
              <el-checkbox-group
                v-model="formData.checkMonthList"
                style="padding-left: 10px"
              >
                <el-checkbox-button label="月末"></el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
            <!-- 时间 -->
            <el-form-item
              label="时间"
              prop="time"
              v-if="
                formData.period !== '' &&
                formData.period != 'hours' &&
                formData.period != 'minute'
              "
            >
              <el-time-select
                v-model="formData.time"
                start="00:00"
                step="00:30"
                end="24:00"
                placeholder="选择时间"
              />
            </el-form-item>
            <!-- 分钟数 -->
            <el-form-item
              label="分钟数"
              prop="minutes"
              v-if="formData.period === 'minute'"
            >
              <el-input
                v-model="formData.minutes"
                placeholder="每n分钟执行一次，其中<n>取值范围[1-59]"
              />
            </el-form-item>
            <!-- 小时数 -->
            <el-form-item
              label="小时数"
              prop="hoursData"
              v-if="formData.period === 'hours'"
            >
              <el-input
                v-model="formData.hoursData"
                placeholder="每n天执行一次，其中<n>取值范围[1-23]"
              />
            </el-form-item>
            <!-- 分钟 -->
            <el-form-item
              label="分钟"
              prop="minutesData"
              v-if="formData.period === 'hours'"
            >
              <el-input-number
                min="1"
                max="59"
                v-model="formData.minutesData"
              ></el-input-number>
              &nbsp 分钟
            </el-form-item>
            <!-- 天数 -->
            <el-form-item
              label="天数"
              prop="daysData"
              v-if="formData.period === 'days'"
            >
              <el-input
                v-model="formData.daysData"
                placeholder="每n天执行一次，其中<n>取值范围[1-99]"
              />
            </el-form-item>
            <!-- 调用服务 -->
            <el-form-item label="调用服务" prop="service">
              <el-input
                v-model="formData.service"
                placeholder="请输入调用服务"
              />
            </el-form-item>
            <!-- 调用接口 -->
            <el-form-item label="调用接口" prop="interface">
              <el-input
                v-model="formData.interface"
                placeholder="请输入调用接口"
              />
            </el-form-item>
            <!-- 调用参数 -->
            <el-form-item label="调用参数" prop="parameter">
              <el-input
                v-model="formData.parameter"
                placeholder="请输入调用参数"
              />
            </el-form-item>
            <!-- 服务器节点 -->
            <el-form-item label="服务器节点" prop="serve">
              <el-select
                placeholder="请选择服务器节点"
                v-model="formData.serve"
              >
                <el-option
                  v-for="item in periodData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option> </el-select
            ></el-form-item>
            <!-- 序号 -->
            <el-form-item label="序号" prop="serialNumber">
              <el-input
                v-model="formData.serialNumber"
                placeholder="请输入序号"
              />
            </el-form-item>
            <!-- 通知事项 -->
            <el-form-item label="通知事项" prop="notice">
              <el-checkbox-group
                v-model="formData.notice"
                @change="handler('hanleNoticeChange', formData.notice, $event)"
              >
                <el-checkbox label="success">成功</el-checkbox>
                <el-checkbox label="error">失败</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <!-- 通知联系人 -->
            <el-form-item label="通知联系人" prop="contact">
              <el-select placeholder="请选择联系人" v-model="formData.serve">
                <el-option
                  v-for="item in periodData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option> </el-select
            ></el-form-item>
            <!-- 运行记录保留天数 -->
            <el-form-item label="运行记录保留天数" prop="operation">
              <el-input v-model="formData.operation" placeholder="请输入天数" />
            </el-form-item>
            <!-- 活动状态 -->
            <el-form-item label="活动状态" prop="enableFlag">
              <el-radio-group v-model="formData.enableFlag">
                <el-radio-button label="1" checked> 启用 </el-radio-button>
                <el-radio-button label="0"> 禁用 </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <!-- 备注 -->
            <el-form-item label="备注" prop="message">
              <el-input
                v-model="formData.message"
                type="textarea"
                placeholder="请输入对该任务的描述"
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
  name: "TimedTask",
  path: "/framework/org/timedtask",
};
</script>

<script lang="ts" setup>
import { ref, reactive, nextTick } from "vue";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import dsorg from "@dscloud/api/dsorg";
import { DsTable, DsTablebar, DsBreadcrumb } from "@dscloud/components";
import router from "@dscloud/router";
router.addRoute("home", {
  name: "TimedTaskRecord",
  path: "/framework/org/timedtaskrecord",
  meta: { title: "运行记录", menuAside: true },
  component: () => import("./TimedTaskRecord.vue"),
});
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
    {
      name: "状态",
      type: "dropselect",
      field: "Status",
      options: [
        { name: "启动", value: "1" },
        { name: "未启动", value: "0" },
      ],
    },
    {
      name: "执行方式",
      type: "dropselect",
      field: "implementWay",
      options: [
        { name: "重复执行", value: "1" },
        { name: "仅执行一次", value: "0" },
      ],
    },
    {
      name: "服务器节点",
      type: "dropselect",
      field: "serverNode",
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
    {
      name: "创建任务",
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
const periodData = [
  {
    value: "day",
    label: "每天",
  },
  {
    value: "minute",
    label: "每n分钟",
  },
  {
    value: "hours",
    label: "每n小时",
  },
  {
    value: "days",
    label: "每n天",
  },
  {
    value: "weeks",
    label: "每周",
  },
  {
    value: "month",
    label: "每月",
  },
];
// 定义新建表单的属性
let formData: any = reactive({
  code: "",
  name: "",
  implementWay: [],
  period: "",
  checkWeeksList: [],
  checkMonthList: [],
  hoursData: "",
  daysData: "",
  minutes: "",
  time: "",
  roleIdList: [],
  minutesData: "",
  service: "",
  interface: "",
  parameter: "",
  serve: "",
  serialNumber: "",
  notice: [],
  contact: "",
  operation: "",
  enableFlag: "",
  message: "",
});
// 验证规则
const formRules = reactive<FormRules>({
  code: [
    {
      required: true,
      message: "请输入任务编码",
      trigger: ["blur"],
    },
  ],
  name: [
    {
      required: true,
      message: "请输入任务名称",
      trigger: ["blur"],
    },
  ],
  implementWay: [
    {
      required: true,
      message: "请选择执行方式",
      trigger: ["blur"],
    },
  ],
  period: [
    {
      required: true,
      message: "请选择周期",
      trigger: ["blur"],
    },
  ],
  checkWeeksList: [
    {
      required: true,
      message: "请选择周",
      trigger: ["blur"],
    },
  ],
  checkMonthList: [
    {
      required: true,
      message: "请选择月",
      trigger: ["blur"],
    },
  ],
  time: [
    {
      required: true,
      message: "请选择时间",
      trigger: ["blur"],
    },
  ],
  minutes: [
    {
      required: true,
      message: "请输入分钟",
      trigger: ["blur"],
    },
  ],
  hoursData: [
    {
      required: true,
      message: "请输入小时",
      trigger: ["blur"],
    },
  ],
  minutesData: [
    {
      required: true,
      message: "请输入分钟",
      trigger: ["blur"],
    },
  ],
  daysData: [
    {
      required: true,
      message: "请输入天数",
      trigger: ["blur"],
    },
  ],
  service: [
    {
      required: true,
      message: "请输入调用服务",
      trigger: ["blur"],
    },
  ],
  interface: [
    {
      required: true,
      message: "请输入调用接口",
      trigger: ["blur"],
    },
  ],
  parameter: [
    {
      required: true,
      message: "请输入调用参数",
      trigger: ["blur"],
    },
  ],
  serve: [
    {
      required: true,
      message: "请选择服务器节点",
      trigger: ["blur"],
    },
  ],
  serialNumber: [
    {
      required: true,
      message: "请输入序号",
      trigger: ["blur"],
    },
  ],
  notice: [
    {
      required: true,
      message: "请选择通知事项",
      trigger: ["blur"],
    },
  ],
  contact: [
    {
      required: true,
      message: "请选择联系人",
      trigger: ["blur"],
    },
  ],
  operation: [
    {
      required: true,
      message: "请输入天数",
      trigger: ["blur"],
    },
  ],
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
      options.drawerTitle = "新建任务";
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
      options.drawerTitle = "编辑任务";
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
    case "toDetail":
      router.push({
        name: "TimedTaskRecord",
        params: {
          code: data.row.code,
          id: data.row.id,
          name: data.row.name,
        },
      });
      break;
    //  切换执行方式
    case "hanleImplementWayChange":
      if (formData.implementWay.length > 1) {
        formData.implementWay.splice(0, 1);
      }
      break;
    // 切换通知事项
    case "hanleNoticeChange":
      if (formData.notice.length > 1) {
        formData.notice.splice(0, 1);
      }
      break;
  }
};
// 新增确定时触发
const formSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  // 暂无任务角色
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
</script>

<style scoped>
.el-link--primary {
  display: none;
}

.more {
  width: 50px;
  padding-left: 10px;
}
</style>
