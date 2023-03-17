<template>
  <el-tabs class="demo-tabs ml-15" label="应用权限">
    <div class="ml-15 mb-15 c-555">
      <div class="common-layout">
        <el-container style="height: 400px">
          <el-aside width="200px" class="left">
            <el-scrollbar>
              <el-menu>
                <template
                  v-for="(item, index) in applyData.entityList"
                  :key="item.id"
                >
                  <el-menu-item @click="onClick(item)" :index="index">
                    <template #title>
                      <el-icon>
                        <component :is="item.clientIcon"></component>
                      </el-icon>
                      <span>{{ item.clientId }}</span>
                    </template>
                    <template #default="scope">
                      <el-checkbox
                        v-model="item.isCheck"
                        @change="change(item)"
                      />
                    </template>
                  </el-menu-item>
                </template>
              </el-menu>
            </el-scrollbar>
          </el-aside>
          <el-main class="main">
            <div class="ds-wrapper org-wrapper">
              <!-- tablebar -->
              <div>
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
                  <template #filterBar
                    ><span
                      style="font-size: 15px; font-weight: 500"
                      class="mr-20"
                      >接口权限</span
                    ></template
                  >
                </ds-tablebar>
              </div>
              <div class="mt-20 applyBody">
                <ds-table
                  ref="dsTableRef"
                  :ds-table-bar-ref="dsTableBarRef"
                  :query-meta-page-fun="tableData.queryMetaPageFun"
                  :query-page-info-fun="tableData.queryPageInfoFun"
                  :filters="tableData.filters"
                  :orders="tableData.orders"
                  :exclude-fields="tableData.excludeFields"
                  :options="tableData.options"
                >
                  <template #operationColumn>
                    <el-table-column fixed="right" label="操作" width="170">
                      <template #default="scope">
                        <el-button
                          type="primary"
                          size="small"
                          plain
                          @click="handler('', scope, $event)"
                          >授权</el-button
                        >
                        <el-button
                          type="primary"
                          size="small"
                          plain
                          @click="handler('', scope, $event)"
                          >取消授权</el-button
                        >
                      </template>
                    </el-table-column>
                  </template>
                </ds-table>
              </div>
            </div>
          </el-main>
        </el-container>
      </div>
    </div>
  </el-tabs>
  <div class="mt-20 ml-20 pb-15 mb-4">
    <el-checkbox
      v-model="selectAll"
      label="全选"
      border
      @change="checkAll()"
      style="margin-right: 10px"
    />
    <el-button type="primary" @click="save(item)" class="save">保存</el-button>
  </div>
</template>

<script lang="ts">
export default {
  name: "RoleDetailApply",
};
</script>

<script lang="ts" setup>
import { ref, onMounted, nextTick, reactive } from "vue";
import dsorg from "@dscloud/api/dsorg";
// import { } from "element-plus";
import * as ElIcons from "@element-plus/icons-vue";
import { Menu as IconMenu } from "@element-plus/icons-vue";
import { DsTable, DsTablebar } from "@dscloud/components";
import router from "@dscloud/router";
const roleId = router.currentRoute?.value.params.id;
const dsTableRef = ref();
const dsTableBarRef = ref();
const flag = ref(true);
const selectAll = ref(false);
const applyData: any = reactive([]);
const clientId = ref("测试1");
const tableData = {
  queryMetaPageFun: dsorg.getRoleapiMetaPage,
  queryPageInfoFun: dsorg.getRoleapiPage,
  options: {
    roleId: roleId,
    clientId: "publiceTest",
  },
  filters: [],
  orders: [{ field: "createTime", direction: "desc" }],
  excludeFields: [],
};
const tableBarData = {
  queryMetaPageFun: dsorg.getRoleapiMetaPage,
  filterBar: [
    /*{name:"状态",type:"dropselect",field:"Status",options:[{name:"全部",value:""},{name:"有效",value:"1"},{name:"无效",value:"0"}]},*/
    {
      name: "接口状态",
      type: "dropselect",
      field: "inputSearch",
      defaultValue: "",
      filters: [{ field: "status", expression: "$regex" }],
    },
    {
      name: "请输入接口名称查询",
      type: "inputsearch",
      field: "inputSearch2",
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
  toolBar: [],
  onButtonClick: function (command: any, data: any, event: any) {
    handler(command, data, event);
  },
};
//region 事件、方法
const handler = (command: any, data: any, event: any) => {
  switch (command) {
  }
};
const checkAll = () => {
  if (flag.value === true) {
    applyData.entityList.forEach((item) => {
      item.isCheck = true;
      flag.value = false;
      selectAll.value = true;
    });
  } else if (flag.value === false) {
    applyData.entityList.forEach((item) => {
      item.isCheck = false;
      flag.value = true;
      selectAll.value = false;
    });
  }
};
// 进行处理
const dataConversion = (data) => {
  data.forEach((item) => {
    console.log("item===>", item);
    item.entityList = item.entityList;
  });
};
const onClick = (event) => {
  // dsTableRef.value.reloadData();
  tableData.options = {
    roleId: roleId,
    clientId: "测试1",
  };
  console.log("event===>", event);
};
const change = (value) => {
  console.log("val===>", value);
};
const save = (event) => {
  console.log("event===>", event);
};
onMounted(() => {
  const params = {
    criteria: null,
    limit: 0,
    pageNo: 1,
    pageSize: 13,
  };
  dsorg.getClientPage(params).then((res) => {
    Object.assign(applyData, res);
    dataConversion(applyData);
  });
  console.log("applyData===>", applyData);
  console.log("应用权限加载");
});
</script>

<style lang="scss" scoped>
$buleColor: #409eff;
$borderColor: #dcdfe6;
$backgroundColor: #f5f7fa;

.left {
  width: 15%;
  border-right: 1px solid #eceef5;
  color: #696969;

  .demo {
    height: 60px;
    padding: 0 20px;
    font-size: 16px;
    cursor: pointer;
  }

  .ds-fx {
    height: 60px;
    padding: 0 20px;
    font-size: 16px;
    cursor: pointer;
  }
}

.main > .applyBody {
  padding: 0;
  background-color: skyblue;
}

.save {
  position: relative;
  bottom: 3px;
  width: 130px;
}
</style>
