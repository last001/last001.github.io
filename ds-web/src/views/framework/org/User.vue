<template>
  <div class="ds-wrapper org-wrapper">
    <el-breadcrumb separator-icon="ArrowRight" class="mb-20">
      <el-breadcrumb-item :to="{ path: '/' }">系统服务</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--desc-->
    <div class="ds-desc">
      <h4>{{router.currentRoute.value.meta.title}}</h4>
      <span class="detail">平台用户管理功能，用于管理机构超级管理员以及机构运维人员，创建机构管理员及用户，请到机构下<router-link to="/framework/org/user">用户管理</router-link>功能中管理</span>
      <el-icon class="icon"><component :is="router.currentRoute.value.meta.iconName"></component></el-icon>
    </div>
    <!--filter-bar-->
    <div class="mt-20">
      <ds-tablebar ref="dsTableBarRef" :ds-table-ref="dsTableRef" :query-meta-page-fun="tableData.queryMetaPageFun" :filter-bar="tableBarData.filterBar" :batch-bar="tableBarData.batchBar" :tool-bar="tableBarData.toolBar" :on-button-click="tableBarData.onButtonClick">
        <template #adFilterBar>
          <el-form ref="adFilterFormRef" :model="adFilterBarData" :inline="true" label-width="100px" label-position="left">
            <el-form-item label="机构" prop="org">
              <el-input placeholder="机构" v-model="adFilterBarData.org"/>
            </el-form-item>
            <el-form-item label="发生时间" prop="eventTime">
              <el-date-picker
                  v-model="adFilterBarData.eventTime"
                  type="datetimerange"
                  unlink-panels
                  range-separator="To"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="YYYY-MM-DD HH:mm:ss"
              />
            </el-form-item>
            <el-form-item label=" ">
              <el-button type="primary" @click="handler('querySubmit','',$event)">查询</el-button>
              <el-button type="" @click="handler('queryReset',adFilterFormRef,$event)">重置</el-button>
            </el-form-item>
          </el-form>
        </template>
      </ds-tablebar>
    </div>
    <!-- table panel -->
    <div class="mt-20">
      <ds-table ref="dsTableRef" :ds-table-bar-ref="dsTableBarRef" :query-meta-page-fun="tableData.queryMetaPageFun"
                :query-page-info-fun="tableData.queryPageInfoFun" :filters="tableData.filters"
                :orders="tableData.orders" :exclude-fields="tableData.excludeFields">
        <template #operationColumn>
          <el-table-column fixed="right" label="操作" width="140">
            <template #default="scope">
              <el-button type="default" size="small" @click.prevent="handler('edit',scope,$event)">编辑</el-button>
              <el-button type="danger" size="small" @click.prevent="handler('remove',scope,$event)">删除</el-button>
            </template>
          </el-table-column>
        </template>
      </ds-table>
    </div>
    <!--drawer-->
    <el-drawer custom-class="ds-drawer" v-model="options.drawerVisible" size="50%" :modal="false">
      <template #header>
        <h4>{{ options.drawerTitle }}</h4>
      </template>
      <template #default>
        <el-scrollbar>
          <el-form ref="formRef" :model="formData" :rules="formRules" label-width="auto" label-position="left">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="账号" prop="account" required>
                  <el-input class="" v-model="formData.account"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="姓名" prop="fullName" required>
                  <el-input class="" v-model="formData.fullName"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="性别" prop="sex" required>
                  <el-radio-group v-model="formData.sex">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="0">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用户类型" prop="userType" required>
                  <ds-select class="w-full" v-model="formData.userType" placeholder="请选择用户类型" data-source="Dictionary" data-source-key="ds_user:userType"></ds-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="手机号码" prop="mobileNumber">
                  <el-input class="" v-model="formData.mobileNumber"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮箱" prop="email">
                  <el-input class="" v-model="formData.email"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="短号" prop="shortNumber">
                  <el-input class="" v-model="formData.shortNumber"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="固定电话" prop="phoneNumber">
                  <el-input class="" v-model="formData.phoneNumber"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="用户角色" prop="roleIdList" required>
              <ds-select class="w-full" v-model="formData.roleIdList" :multiple="true" placeholder="请选择用户角色" data-source="Model" data-source-key="ds_role" text-field="name" value-field="id"></ds-select>
            </el-form-item>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="管理员类型" prop="adminType">
                  <el-radio-group v-model="formData.adminType">
                    <el-radio-button label="Normal" checked>
                      普通用户
                    </el-radio-button>
                    <el-radio-button label="Admin">
                      管理员
                    </el-radio-button>
                    <el-radio-button label="Operate">
                      运维人员
                    </el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="启用状态" prop="enableFlag">
                  <el-radio-group v-model="formData.enableFlag">
                    <el-radio-button label="1" checked>
                      启用
                    </el-radio-button>
                    <el-radio-button label="0">
                      禁用
                    </el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formData.remark" type="text"/>
            </el-form-item>
            <!--其他信息-->
            <div v-if="options.formDetailVisible" class="mt-50">
              <el-divider border-style="dashed"></el-divider>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="创建人" prop="createUser">
                    <span>{{formData.createUser?.fullName}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="创建时间" prop="createTime">
                    <span>{{formData.createTime}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="修改人" prop="updateUser">
                    <span>{{formData.updateUser?.fullName}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="修改时间" prop="updateTime">
                    <span>{{formData.updateTime}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="账号过期时间" prop="deadline">
                    <span>{{formData.deadline}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="密码过期时间" prop="pwdDeadline">
                    <span>{{formData.pwdDeadline}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="启用标识" prop="enableFlagText">
                    <span>{{formData.enableFlagText}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="锁定标识" prop="lockFlagText">
                    <span>{{formData.lockFlagText}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="解锁时间" prop="unlockTime">
                    <span>{{formData.unlockTime}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">

                </el-col>
              </el-row>
            </div>
          </el-form>
        </el-scrollbar>
      </template>
      <template #footer>
        <div class="ds-fx">
          <div class="fx-size-1 ta-l">
            <el-button class="mr-10" type="primary">重置密码</el-button>
            <el-dropdown class="mr-10">
              <el-button type="">更多<el-icon class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>删除用户</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div style="flex: auto">
            <el-button @click="options.drawerVisible=false;">取消</el-button>
            <el-button type="primary" @click="formSubmit(formRef)">确定</el-button>
          </div>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts">
export default {
  name:"User",
  path: "/framework/org/user"
}
</script>

<script lang="ts" setup>
import {ref, reactive, nextTick} from 'vue';
import {ElMessage,ElMessageBox, FormInstance, FormRules} from 'element-plus';
import dsmain from '@dscloud/api/dsmain';
import {DsTable,DsTablebar,DsSelect} from '@dscloud/components';
import router from '@dscloud/router';
const options = reactive({
  drawerVisible: false,
  drawerTitle: ""
});

console.log("router ==》",router);

const dsTableRef = ref();
const dsTableBarRef = ref();
const adFilterFormRef = ref<FormInstance>()
const tableData = {
  queryMetaPageFun:dsmain.getUserMetaPage,
  queryPageInfoFun:dsmain.getUserPage,
  filters:[{key: "adminType", data: {$in: ['Normal','Operate','Admin']},}],
  orders:[{"field":"createTime","direction":"desc"}],
  excludeFields:["detail"]
}
const tableBarData = {
  queryMetaPageFun:dsmain.getUserMetaPage,
  filterBar:[
    /*{name:"状态",type:"dropselect",field:"Status",options:[{name:"全部",value:""},{name:"有效",value:"1"},{name:"无效",value:"0"}]},*/
    {name:"用户名、姓名",type:"inputsearch",field:"inputSearch",defaultValue:"",filters:[
        {field:"summary",expression:"$regex"},
        {field:"invokeClass",expression:"$regex"},
        {field:"invokeMethod",expression:"$regex"},
      ]}
  ],
  batchBar:[
    {name:"批量删除",type:"button",icon:"Delete",buttonCss:"danger",command:"batchDelete"}
  ],
  toolBar:[
    {name:"",tooltip:"自定义显示列",type:"button",icon:"View",buttonCss:"",command:"_cuscol"},
    {name:"导出",type:"btngroup",icon:"ArrowDown",buttonCss:"",command:"_export",buttons:[{name:"导出当前结果",type:"button",icon:"",command:"_expall"},{name:"导出/导入设置",type:"button",icon:"",command:"_cusimpexp"}]},
    {name:"新建用户",type:"button",icon:"plus",buttonCss:"success",command:"create"}
  ],
  onButtonClick:function(command,data,event){
    handler(command,data,event);
  }
}
const adFilterBarData = reactive({
  org:"",
  eventTime:""
});
const formRef = ref<FormInstance>();
const formData:any = reactive({
  orgId:"",
  account: "",
  fullName:"",
  sex: "1",
  email: "",
  mobileNumber: "",
  createUser: {},
  createTime: "",
  updateUser: {},
  updateTime: "",
  deadline:"",
  pwdDeadline:"",
  unlockTime:"",
  adminType:"Normal",
  userType:"User",
  enableFlag: "1",
  lockFlag:"",
  remark: "",
  roleIdList:[],
});
const formRules = reactive<FormRules>({
  roleIdList: [
    {
      required: true,
      message: '请选择角色',
      trigger: ['blur', 'change'],
    },
  ],
  account: [
    {
      required: true,
      message: '请输入账号',
      trigger: ['blur', 'change'],
    },
  ],
  fullName: [
    {
      required: true,
      message: '请输入姓名',
      trigger: ['blur', 'change'],
    },
  ],
  sex: [
    {
      required: true,
      message: '请选择性别',
      trigger: ['blur', 'change'],
    },
  ],
  userType: [
    {
      required: true,
      message: '请选择用户类型',
      trigger: ['blur', 'change'],
    },
  ],
});
//region 事件、方法
const handler = (command,data,event)=>{
  switch (command) {
    case "create":
      options.drawerVisible = true;
      options.drawerTitle = "新建用户";
      formRef.value.resetFields();
      break;
    case "edit":
      options.drawerTitle = "编辑用户("+data.row.fullName+")";
      dsmain.getUserEntity(data.row.id).then((res: any) => {
        if (res) {
          options.drawerVisible = true;
          nextTick(()=>{
            Object.assign(formData, res);
          });
        }
      });
      break;
    case "remove":
      ElMessageBox.alert('确认删除？', '提示', {
        confirmButtonText: 'OK',
        callback: (action) => {
          if(action=="confirm"){
            dsmain.removeUser(data.row.id).then((res) => {
              if(res&&res.deletedCount>0){
                dsTableRef.value.reloadData();
              }
            });
          }
        },
      })
      break;
    case "batchDelete":
      let rows = dsTableRef.value.getSelectionRows();
      let ids = [];
      rows.forEach((row, idx, arr)=>{
        ids.push(row.id);
      });
      if(ids.length>0){
        ElMessageBox.alert('确认将选中数据批量删除？', '提示', {
          confirmButtonText: 'OK',
          callback: (action) => {
            if(action=="confirm"){
              dsmain.batchRemoveUser(ids).then((res) => {
                if(res&&res.deletedCount>0){
                  dsTableRef.value.reloadData();
                }
              });
            }
          },
        })
      }
      break;
    case "querySubmit":
      let adFilters = [];
      if(adFilterBarData.org){
        adFilters.push({key: "org.name", data: {$regex:adFilterBarData.org}});
      }
      if(adFilterBarData.eventTime&&adFilterBarData.eventTime.length>0){
        let filter = {key:"$and",items:[]};
        filter.items.push({key: "eventTime", data: {$gte:adFilterBarData.eventTime[0]}});
        filter.items.push({key: "eventTime", data: {$lte:adFilterBarData.eventTime[1]}});
        adFilters.push(filter);
      }
      dsTableBarRef&&(dsTableBarRef.value.reloadTable(adFilters));
      break;
    case "queryReset":
      if(!data)return;
      data.resetFields();
      dsTableBarRef&&(dsTableBarRef.value.reloadTable([]));
      break;
  }
}
//endregion
const formSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (formData.id) {
        dsmain.updateUser(formData).then((res: any) => {
          if (res && res.modifiedCount > 0) {
            ElMessage.success("提交成功");
            options.drawerVisible = false;
            dsTableRef.value.reloadData();
          } else {
            ElMessage.error("提交失败");
          }
        });
      } else {
        dsmain.insertUser(formData).then((res: any) => {
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
</script>

<style lang="scss" scoped>
.user-wrapper{
}
</style>
