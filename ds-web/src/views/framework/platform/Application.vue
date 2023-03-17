<template>
  <div class="ds-wrapper application-wrapper">
    <ds-breadcrumb class="mb-20" :menu-id="router.currentRoute.value.meta.id"></ds-breadcrumb>
    <!--desc-->
    <div class="ds-desc">
      <h4>{{router.currentRoute.value.meta.title}}</h4>
      <span class="detail">用于管理系统应用以及访问权限，可通过appid、appsecret获取访问令牌。</span>
      <el-icon class="icon"><component :is="router.currentRoute.value.meta.iconName"></component></el-icon>
    </div>
    <!--filter-bar-->
    <div class="mt-20">
      <ds-tablebar ref="dsTableBarRef" :ds-table-ref="dsTableRef" :query-meta-page-fun="tableData.queryMetaPageFun" :filter-bar="tableBarData.filterBar" :batch-bar="tableBarData.batchBar" :tool-bar="tableBarData.toolBar" :on-button-click="tableBarData.onButtonClick">
        <template #adFilterBar>
          <el-form ref="adFilterFormRef" :model="adFilterBarData" :inline="true" label-width="100px" label-position="left">
            <el-form-item label="机构" prop="org">
              <el-input placeholder="机构" v-model="adFilterBarData.  org"/>
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
      <ds-table ref="dsTableRef" :ds-table-bar-ref="dsTableBarRef" :query-meta-page-fun="tableData.queryMetaPageFun" :query-page-info-fun="tableData.queryPageInfoFun" :filters="tableData.filters" :orders="tableData.orders" :exclude-fields="tableData.excludeFields">
        <template #operationColumn>
          <el-table-column fixed="right" label="操作" width="200">
            <template #default="scope">
              <el-button type="default" size="small" @click.prevent="handler('applicationDetail',scope,$event)">接口</el-button>
              <el-button type="default" size="small" @click.prevent="handler('edit',scope,$event)">编辑</el-button>
              <el-button type="danger" size="small" @click.prevent="handler('remove',scope,$event)">删除</el-button>
              
            </template>
          </el-table-column>
        </template>
      </ds-table>
    </div>
    <!--drawer-->
    <el-drawer custom-class="ds-drawer" v-model="options.drawerVisible" size="40%" :modal="false">
      <template #header>
        <h4>{{ options.drawerTitle }}</h4>
      </template>
      <template #default>
        <el-scrollbar>
          <el-form ref="formRef" :model="formData" :rules="formRules" label-width="auto" label-position="left">
            <el-form-item label="应用图标" prop="clientIcon">

              <!-- <ds-avatar v-model="formData.clientIcon" :size="80" fit="cover" shape="square"></ds-avatar> -->

              <ds-icon-select v-model="formData.clientIcon"></ds-icon-select>
            </el-form-item>

            <!-- <el-form-item label="模块颜色" prop="iconColor" required>
              <el-color-picker v-model="formData.iconColor"/>
            </el-form-item> -->

            <el-form-item label="应用ID" prop="clientId" required>
              <el-input class="" v-model="formData.clientId"/>
            </el-form-item>
            <el-form-item v-if="options.isEdit" label="应用密钥" prop="clientSecret">

            </el-form-item>
            <el-form-item label="资源限定" prop="resourceIds" required>
              <ds-select class="w-full" :multiple="true" v-model="formData.resourceIds" placeholder="请选择资源服务" data-source="Model" data-source-key="ds_microservice" text-field="description" value-field="name"></ds-select>
            </el-form-item>
            <el-form-item label="授权类型" prop="authorizedGrantTypes" required>
              <ds-select class="w-full" multiple v-model="formData.authorizedGrantTypes" placeholder="请选择授权类型" >
                <!-- <el-option
                  v-for="item in formData.authorizedGrantTypeslist"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                /> -->
                <el-option label="authorization_code" value="authorization_code"></el-option>
                <el-option label="password" value="password"></el-option>
                <el-option label="refresh_token" value="refresh_token"></el-option>
                <el-option label="implicit" value="implicit"></el-option>
                <el-option label="client_credentials" value="client_credentials"></el-option>
              </ds-select>
            </el-form-item>
            <el-form-item label="重定向地址" prop="registeredRedirectUri" required>
              <el-input v-model="formData.registeredRedirectUri" :rows="3" type="textarea" placeholder="请输入重定向地址，多个以换行隔开"/>
            </el-form-item>
            <el-form-item label="令牌有效时间(秒)" prop="accessTokenValiditySeconds" required>
              <el-input-number class="" v-model="formData.accessTokenValiditySeconds"/>
            </el-form-item>
            <el-form-item label="刷新令牌有效时间(秒)" prop="refreshTokenValiditySeconds" required>
              <el-input-number class="" v-model="formData.refreshTokenValiditySeconds"/>
            </el-form-item>
            <el-form-item label="应用描述" prop="remark">
              <el-input v-model="formData.remark" :rows="2" type="textarea" placeholder="请输入应用描述"/>
            </el-form-item>
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
          </el-form>
        </el-scrollbar>
      </template>
      <template #footer>
        <div class="ds-fx">
          <div class="fx-size-1 ta-l">
            <el-button class="mr-10" type="" @click="options.dialogFormVisible = true">IP白名单</el-button>
          </div>
          <div style="flex: auto">
            <el-button @click="options.drawerVisible=false;">取消</el-button>
            <el-button type="primary" @click="formSubmit(formRef)">确定</el-button>
          </div>
        </div>
      </template>
    </el-drawer>
  </div>


  <el-dialog v-model="options.dialogFormVisible" title="ip白名单">
    <el-form  ref="formRef" :model="formData">
      <el-form-item >
        <el-input :rows="5" type="textarea" v-model="formData.ipWhiteList" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="options.dialogFormVisible = false">关闭</el-button>
        <el-button type="primary" @click="">提交</el-button>
      </span>
    </template>
  </el-dialog>


</template>

<script lang="ts">
export default {
  name:"Application",
  path: "/framework/platform/application"
}
</script>

<script lang="ts" setup>
import {ref, reactive, nextTick} from 'vue';
import {ElMessage, ElMessageBox, FormInstance, FormRules} from 'element-plus'
import dsmain from '@dscloud/api/dsmain';
import { DsTable,DsTablebar,DsSelect,DsAvatar,DsBreadcrumb ,DsIconSelect} from '@dscloud/components';
import router from '@dscloud/router';

router.addRoute("home", {
  name: 'ApplicationDetail',
  path: '/framework/platform/application/applicationDetail',
  meta: { title: "应用接口详情", menuAside: true },
  component: () => import('./ApplicationDetail.vue')
});

const options = reactive({
  drawerVisible:false,
  dialogFormVisible:false,
  drawerTitle: "",
  isEdit:false
});
const dsTableRef = ref();
const dsTableBarRef = ref();
const adFilterFormRef = ref<FormInstance>()
const tableData = {
  queryMetaPageFun:dsmain.getApplicationMetaPage,
  queryPageInfoFun:dsmain.getApplicationPage,
  filters:[{ key: "dataRange", data: { $eq: "public" } }],
  orders:[{"field":"eventTime","direction":"desc"}],
  excludeFields:["detail"]
}
const tableBarData = {
  queryMetaPageFun:dsmain.getApplicationMetaPage,
  filterBar:[
    /*{name:"状态",type:"dropselect",field:"Status",options:[{name:"全部",value:""},{name:"有效",value:"1"},{name:"无效",value:"0"}]},*/
    {name:"编码",type:"inputsearch",field:"inputSearch",defaultValue:"",filters:[
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
    {name:"新建应用",type:"button",icon:"plus",buttonCss:"success",command:"create"}
  ],
  onButtonClick:function(command:any,data:any,event:any){
    handler(command,data,event);
  }
}
const adFilterBarData = reactive({
  org:"",
  eventTime:""
});
const formRef = ref<FormInstance>();
const formData:any = reactive({
  dataRange:"public",//代表公共应用，只在平台中管理，系有应用在机构下管理
  clientIcon:"",
  // iconColor:'',
 
  resourceIds:[],//
  authorizedGrantTypes:[],//
  registeredRedirectUri:[],
  registeredRedirectUriText:"",
  accessTokenValiditySeconds:"7200",
  refreshTokenValiditySeconds:"86400",
  remark:"",
  enableFlag: "1",
  ipWhiteList:'',
});

const formRules = reactive<FormRules>({
  /*clientIcon: [
    {
      required: true,
      message: '请选择应用图标',
      trigger: ['blur', 'change'],
    },
  ],*/
  clientId: [
    {
      required: true,
      message: '请输入应用ID',
      trigger: ['blur', 'change'],
    },
  ],
  resourceIds: [
    {
      required: true,
      message: '请选择资源限定',
      trigger: ['blur', 'change'],
    },
  ],
  authorizedGrantTypes: [
    {
      required: true,
      message: '请选择授权类型',
      trigger: ['blur', 'change'],
    },
  ],
  registeredRedirectUriStr: [
    {
      required: true,
      message: '请输入重定向地址',
      trigger: ['blur', 'change'],
    },
  ],
  accessTokenValiditySeconds: [
    {
      required: true,
      message: '请输入令牌有效时间',
      trigger: ['blur', 'change'],
    },
  ],
  refreshTokenValiditySeconds: [
    {
      required: true,
      message: '请输入刷新令牌有效时间',
      trigger: ['blur', 'change'],
    },
  ],
});
//region 事件、方法
const handler = (command:any,data:any,event:any)=>{
  switch (command) {
    case "create":
      options.drawerVisible = true;
      options.drawerTitle = "新建应用";
      formRef.value?.resetFields();
      break;
    case "edit":
      options.drawerTitle = "编辑应用("+data.row.name+")";
      dsmain.getApplicationEntity(data.row.id).then((res: any) => {
        if (res) {
          options.drawerVisible = true;
          nextTick(()=>{
            console.log(formData,res);
            var newUri=res.registeredRedirectUri.join().replace(/,/g,'\n')
            res.registeredRedirectUri=newUri
            Object.assign(formData, res)
      
          });
        }
      });
      break;
    case "remove":
      ElMessageBox.alert('确认删除？', '提示', {
        confirmButtonText: 'OK',
        callback: (action:string) => {
          if(action=="confirm"){
            dsmain.removeApplication(data.row.id).then((res:any) => {
              console.log(res);
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
      let ids:any = [];
      rows.forEach((row:any, idx:number, arr:[])=>{
        ids.push(row.id);
      });
      if(ids.length>0){
        ElMessageBox.alert('确认将选中数据批量删除？', '提示', {
          confirmButtonText: 'OK',
          callback: (action:any) => {
            if(action=="confirm"){
              dsmain.batchRemoveApplication(ids).then((res:any) => {
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
        let filter:any = {key:"$and",items:[]};
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
    case "applicationDetail":
      router.push({
        name: "ApplicationDetail",
        params: {
          clientId: data.row.clientId,
        }
      });
    
    break
    }
}
const formSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (formData.id) {
        var newUri=formData.registeredRedirectUri.split('\n')
        formData.registeredRedirectUri=newUri
        dsmain.updateApplication(formData).then((res: any) => {
          if (res && res.modifiedCount > 0) {
            ElMessage.success("提交成功");
            options.drawerVisible = false;
            dsTableRef.value.reloadData();
          } else {
            ElMessage.error("提交失败");
          }
        });
      } else {
        var newUri=formData.registeredRedirectUri.split('\n')
        formData.registeredRedirectUri=newUri
        console.log(formData);
        
        dsmain.insertApplication(formData).then((res: any) => {
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
//endregion
</script>

<style lang="scss" scoped>

</style>