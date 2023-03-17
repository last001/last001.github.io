<template>
  <div class="ds-wrapper dic-wrapper">
    <el-breadcrumb separator-icon="ArrowRight" class="mb-20">
      <el-breadcrumb-item :to="{ path: '/' }">系统服务</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>字典管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--desc-->
    <div class="ds-desc">
      <h4>{{router.currentRoute.value.meta.title}}</h4>
      <span class="detail">管理平台下所有机构字典。</span>
      <el-icon class="icon"><component :is="router.currentRoute.value.meta.iconName"></component></el-icon>
    </div>
    <!--filter-bar-->
    <div class="mt-20">
      <ds-tablebar
        ref="dsTableBarRef"
        :ds-table-ref="dsTableRef"
        :query-meta-page-fun="tableData.queryMetaPageFun"
        :filter-bar="tableBarData.filterBar"
        :batch-bar="tableBarData.batchBar"
        :tool-bar="tableBarData.toolBar"
        :on-button-click="tableBarData.onButtonClick"
      >
        <template #adFilterBar>
          <el-form
            ref="adFilterFormRef"
            :model="adFilterBarData"
            :inline="true"
            label-width="100px"
            label-position="left"
          >
            <el-form-item label="机构名称" prop="name">
              <el-input placeholder="机构名称" v-model="adFilterBarData.name" />
            </el-form-item>
            <el-form-item label="创建时间" prop="createTime">
              <el-date-picker
                v-model="adFilterBarData.createTime"
                type="datetimerange"
                unlink-panels
                range-separator="To"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
            </el-form-item>
            <el-form-item label=" ">
              <el-button
                type="primary"
                @click="handler('querySubmit', '', $event)"
                >查询</el-button
              >
              <el-button
                type=""
                @click="handler('queryReset', adFilterFormRef, $event)"
                >重置</el-button
              >
            </el-form-item>
          </el-form>
        </template>
        <!-- 插槽选择框 -->
        <!-- <template #filterBar>
          <ds-tree-select
            :options="sourceData"
            :dsClickNode="false"
            :dsMultiple="true"
            :dsClearable="true"
            :dsFilterable="true"
            :dsShowCheckbox="true"
            :dsCheckStrictly="false"
            style="width: 200px"
            placeholder="选择课室"
          />
        </template> -->
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
        :lazy="tableData.lazy"
        :load="tableData.load"
        :tree-props="tableData.treeProps"
      >
        <template #operationColumn>
          <el-table-column fixed="right" label="操作" width="250">
            <template #default="scope">
              <el-button type="default" size="small" @click.prevent="handler('editDetail', scope, $event)">编辑</el-button>
              <el-button type="danger" size="small" @click.prevent="handler('remove', scope, $event)">删除</el-button>
              <el-button v-if="scope.row.isItem !== true" type="primary" size="small" @click.prevent="handler('createItem', scope, $event)">新建字典项</el-button>
            </template>
          </el-table-column>
        </template>
      </ds-table>
    </div>
    <!--drawer-->
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
            ref="formRef"
            :model="formData"
            :rules="formRules"
            label-width="auto"
            label-position="left"
          >
            <el-form-item label="字典编码" prop="dimCode" required>
              <el-input class="" v-model="formData.dimCode" />
            </el-form-item>
            <el-form-item label="字典名称" prop="dimName" required>
              <el-input class="" v-model="formData.dimName" />
            </el-form-item>
            <el-form-item label="字典类型" prop="dataType" required>
              <el-radio-group v-model="formData.dataType">
                <el-radio-button label="user">用户字典</el-radio-button>
                <el-radio-button label="system">系统字典</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="状态" prop="enableFlag" required>
              <el-radio-group v-model="formData.enableFlag">
                <el-radio-button label="1">启用</el-radio-button>
                <el-radio-button label="0">禁用</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="序号" prop="serialNo" required>
              <el-input-number v-model="formData.serialNo" />
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="options.drawerVisible = false">取消</el-button>
          <el-button type="primary" @click="formSubmit(formRef)"
            >确定</el-button
          >
        </div>
      </template>
    </el-drawer>
    <!--drawer dictionary item -->
    <el-drawer
      custom-class="ds-drawer"
      v-model="options.drawerItemVisible"
      size="30%"
      :modal="false"
    >
      <template #header>
        <h4>{{ options.drawerItemTitle }}</h4>
      </template>
      <template #default>
        <el-scrollbar>
          <el-form
            ref="formItemRef"
            :model="formItemData"
            :rules="formItemRules"
            label-width="auto"
            label-position="left"
          >
            <el-form-item label="字典编码">
              {{ formItemData.dimCode }}
            </el-form-item>
            <el-form-item label="字典名称">
              {{ formItemData.dimName }}
            </el-form-item>
            <el-form-item label="字典键(英文)" prop="itemKey" required>
              <el-input class="" v-model="formItemData.itemKey" />
            </el-form-item>
            <el-form-item label="字典值(中文)" prop="itemText" required>
              <el-input class="" v-model="formItemData.itemText" />
            </el-form-item>
            <el-form-item label="状态" prop="enableFlag" required>
              <el-radio-group v-model="formItemData.enableFlag">
                <el-radio-button label="1">启用</el-radio-button>
                <el-radio-button label="0">禁用</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="序号" prop="serialNo" required>
              <el-input-number v-model="formItemData.serialNo" />
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input
                type="textarea"
                class=""
                v-model="formItemData.remark"
              />
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="options.drawerItemVisible = false">取消</el-button>
          <el-button type="primary" @click="formItemSubmit(formItemRef)"
            >确定</el-button
          >
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts">
export default {
  name: "Dictionary",
  path: "/framework/platform/dictionary",
};
</script>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import dsmain from "@dscloud/api/dsmain";
import {
  DsTable,
  DsTablebar,
  DsRoomSelect,
} from "@dscloud/components";
import router from '@dscloud/router';

import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
const options = reactive({
  drawerVisible: false,
  drawerTitle: "",
  drawerItemVisible: false,
  drawerItemTitle: "",
});
const sourceData = reactive([]);
const dsTableRef = ref();
const dsTableBarRef = ref();
const adFilterFormRef = ref<FormInstance>();
const getDictionarItemList = (
  row: any,
  treeNode: unknown,
  resolve: (list) => void
) => {
  dsmain.getDictionaryItemList(row.id).then((res: any) => {
    if (res) {
      let list = [];
      res.forEach((item, idx, arr) => {
        item["dicId"] = row.id;
        item["dataTypeText"] = row.dataTypeText;
        item["dimCode"] = item.itemKey;
        item["dimName"] = item.itemText;
        item["pdimCode"] = row.dimCode;
        item["pdimName"] = row.dimName;
        item["isItem"] = true;
        item["disableAddTag"] = true;
        list.push(item);
      });
      resolve(list);
    }
  });
};
const tableData = {
  lazy: true,
  load: getDictionarItemList,
  treeProps: { children: "children", hasChildren: "hasItem" },
  queryMetaPageFun: dsmain.getDictionaryMetaPage,
  queryPageInfoFun: dsmain.getDictionaryMasterPage,
  filters: [],
  orders: [],
  excludeFields: ["itemList"],
};
const tableBarData = {
  queryMetaPageFun: dsmain.getDictionaryMetaPage,
  filterBar: [
    {
      name: "状态",
      type: "dropselect",
      field: "enableFlag",
      options: [
        { name: "有效", value: "1" },
        { name: "无效", value: "0" },
      ],
    },
    {
      name: "字典名称、编码",
      type: "inputsearch",
      field: "inputSearch",
      defaultValue: "",
      filters: [
        { field: "dimName", expression: "$regex" },
        { field: "dimCode", expression: "$regex" },
      ],
    },
    {
      name: "标签",
      type: "tag",
      field: "tagIdList",
      dataRange: "public",
      tagType: "ds_dictionary:tagIdList",
    },
  ],
  batchBar: [
    {
      name: "批量删除字典",
      type: "button",
      icon: "Delete",
      buttonCss: "danger",
      command: "batchDelete",
    },
  ],
  toolBar: [
    {
      name: "",
      tooltip: "自定义显示列",
      type: "button",
      icon: "View",
      buttonCss: "",
      command: "_cuscol",
    },
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
      name: "新建字典",
      type: "button",
      icon: "plus",
      buttonCss: "success",
      command: "create",
    },
  ],
  onButtonClick: function (command: string, data: any, event: any) {
    handler(command, data, event);
  },
};
const adFilterBarData: any = reactive({
  name: "",
  createTime: "",
});
const formRef = ref<FormInstance>();
const formData: any = reactive({
  id: "",
  dimCode: "",
  dimName: "",
  dataType: "user",
  enableFlag: "1",
  serialNo: "1",
});
const formRules = reactive<FormRules>({
  dimCode: [
    {
      required: true,
      message: "请输入字典编码",
      trigger: ["blur", "change"],
    },
  ],
  dimName: [
    {
      required: true,
      message: "请输入字典名称",
      trigger: ["blur", "change"],
    },
  ],
  enableFlag: [
    {
      required: true,
      message: "请选择状态",
      trigger: ["blur", "change"],
    },
  ],
  serialNo: [
    {
      required: true,
      message: "请输入序号",
      trigger: ["blur", "change"],
    },
  ],
});
const formItemRef = ref<FormInstance>();
const formItemData: any = reactive({
  dicId: "",
  dimCode: "",
  dimName: "",
  itemId: "",
  itemKey: "",
  itemText: "",
  itemTag: "",
  serialNo: "1",
  enableFlag: "1",
  remark: "",
});
const formItemRules = reactive<FormRules>({
  itemKey: [
    {
      required: true,
      message: "请输入字典键",
      trigger: ["blur", "change"],
    },
  ],
  itemText: [
    {
      required: true,
      message: "请输入字典值",
      trigger: ["blur", "change"],
    },
  ],
  serialNo: [
    {
      required: true,
      message: "请输入序号",
      trigger: ["blur", "change"],
    },
  ],
});
//region 事件、方法
const handler = (command: string, data: any, event: any) => {
  switch (command) {
    case "create":
      formData.id = "";
      formData.dimCode = "";
      formData.dimName = "";
      options.drawerTitle = "新建字典";
      options.drawerVisible = true;
      break;
    case "createItem":
      formItemData.dimCode = data.row.dimCode;
      formItemData.dimName = data.row.dimName;
      formItemData.dicId = data.row.id;
      formItemData.itemId = "";
      formItemData.itemKey = "";
      formItemData.itemText = "";
      options.drawerItemTitle = "新建字典项（" + data.row.dimName + "）";
      options.drawerItemVisible = true;
      break;
    case "editDetail":
      if (data.row.isItem === true) {
        dsmain
          .getDictionaryItem(data.row.dicId, data.row.itemId)
          .then((res: any) => {
            if (res) {
              res.dicId = data.row.dicId;
              res.dimCode = data.row.pdimCode;
              res.dimName = data.row.pdimName;
              options.drawerItemTitle = "编辑字典项（" + res.itemText + "）";
              Object.assign(formItemData, res);
              //formItemData.value = res;
              options.drawerItemVisible = true;
            }
          });
      } else {
        dsmain.getDictionaryEntity(data.row.id).then((res: any) => {
          if (res) {
            options.drawerTitle = "编辑字典（" + res.dimName + "）";
            Object.assign(formData, res);
            //formData.value = res;
            options.drawerVisible = true;
          }
        });
      }
      break;
    case "remove":
      if (data.row.isItem === true) {
        ElMessageBox.alert("确认删除字典项？", "提示", {
          confirmButtonText: "OK",
          callback: (action: string) => {
            if (action == "confirm") {
              dsmain.removeDictionaryItem(data.row.dicId,data.row.itemId).then((res) => {
                if (res && res.modifiedCount > 0) {
                  dsTableRef.value.reloadData();
                }
              });
            }
          },
        });
      }else{
        ElMessageBox.alert("确认删除字典？", "提示", {
          confirmButtonText: "OK",
          callback: (action: string) => {
            if (action == "confirm") {
              dsmain.removeDictionary(data.row.id).then((res) => {
                if (res && res.deletedCount > 0) {
                  dsTableRef.value.reloadData();
                }
              });
            }
          },
        });
      }
      break;
    case "batchDelete":
      let rows = dsTableRef.value.getSelectionRows();
      let ids: any = [];
      rows.forEach((row: any, idx: number, arr: []) => {
        if(row.isItem!=true) {
          ids.push(row.id);
        }
      });
      if (ids.length > 0) {
        ElMessageBox.alert("确认将选中字典数据批量删除？", "提示", {
          confirmButtonText: "OK",
          callback: (action: string) => {
            if (action == "confirm") {
              dsmain.batchRemoveDictionary(ids).then((res: any) => {
                
                if (res && res.deletedCount > 0) {
                  dsTableRef.value.reloadData();
                }
              });
            }
          },
        });
      }
      break;
    case "querySubmit":
      let adFilters = [];
      if (adFilterBarData.org) {
        adFilters.push({
          key: "org.name",
          data: { $regex: adFilterBarData.org },
        });
      }
      if (adFilterBarData.eventTime && adFilterBarData.eventTime.length > 0) {
        let filter = { key: "$and", items: [] };
        filter.items.push({
          key: "eventTime",
          data: { $gte: adFilterBarData.eventTime[0] },
        });
        filter.items.push({
          key: "eventTime",
          data: { $lte: adFilterBarData.eventTime[1] },
        });
        adFilters.push(filter);
      }
      dsTableBarRef && dsTableBarRef.value.reloadTable(adFilters);
      break;
    case "queryReset":
      if (!data) return;
      data.resetFields();
      dsTableBarRef && dsTableBarRef.value.reloadTable([]);
      break;
  }
};
const formSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (formData.id) {
        dsmain.updateDictionary(formData).then((res: any) => {
          if (res && res.modifiedCount > 0) {
            ElMessage.success("提交成功");
            options.drawerVisible = false;
            dsTableRef.value.reloadData();
          } else {
            ElMessage.error("提交失败");
          }
        });
      } else {
        dsmain.addDictionary(formData).then((res: any) => {
          if (res && res.id) {
            ElMessage.success("提交成功");
            options.drawerVisible = false;
            dsTableRef.value.reloadData();
          } else {
            ElMessage.error("提交失败");
          }
        });
      }
    }
  });
};
const formItemSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (formItemData.itemId) {
        dsmain.updateDictionaryItem(formItemData).then((res: any) => {
          if (res && res.modifiedCount > 0) {
            dsTableRef.value.tableRef.store.states.treeData.value[
              formItemData.dicId
            ].expanded = false;
            dsTableRef.value.tableRef.store.states.treeData.value[
              formItemData.dicId
            ].loaded = false;
            ElMessage.success("提交成功");
            options.drawerItemVisible = false;
            dsTableRef.value.reloadData();
          } else {
            ElMessage.error("提交失败");
          }
        });
      } else {
        dsmain.addDictionaryItem(formItemData).then((res: any) => {
          if (res && res.matchedCount > 0) {
            dsTableRef.value.tableRef.store.states.treeData.value[
              formItemData.dicId
            ].expanded = false;
            dsTableRef.value.tableRef.store.states.treeData.value[
              formItemData.dicId
            ].loaded = false;
            ElMessage.success("提交成功");
            options.drawerItemVisible = false;
            dsTableRef.value.reloadData();
          } else {
            ElMessage.error("提交失败");
          }
        });
      }
    }
  });
};
//endregion
</script>

<style lang="scss" scoped>
.dic-wrapper {
}
</style>
