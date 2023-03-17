<template>
    <div class="ds-wrapper interface-wrapper">
      <ds-breadcrumb class="mb-20" :menu-id="router.currentRoute.value.meta.id"></ds-breadcrumb>
      <!--desc-->
      <div class="ds-desc">
        <h4>{{router.currentRoute.value.meta.title}}</h4>
        <span class="detail">用于管理系统所有请求接口。</span>
        <el-icon class="icon"><component :is="router.currentRoute.value.meta.iconName"></component></el-icon>
      </div>
      <!--filter-bar-->
      <div class="mt-20">
        <ds-tablebar ref="dsTableBarRef" :ds-table-ref="dsTableRef" :query-meta-page-fun="tableData.queryMetaPageFun" 
        :filter-bar="tableBarData.filterBar" :batch-bar="tableBarData.batchBar" :tool-bar="tableBarData.toolBar" 
        :on-button-click="tableBarData.onButtonClick " :adFilterEnable="false">
        </ds-tablebar>
      </div>
      <!-- table panel -->
      <div class="mt-20">
        <ds-table ref="dsTableRef" :ds-table-bar-ref="dsTableBarRef" 
        :query-meta-page-fun="tableData.queryMetaPageFun" :query-page-info-fun="tableData.queryPageInfoFun" 
        :filters="tableData.filters" :orders="tableData.orders" :exclude-fields="tableData.excludeFields">
          <template #operationColumn>
            <el-table-column fixed="right" label="操作" width="140">
              <template #default="scope">
                <el-button type="default" size="small" @click.prevent="handler('edit',scope,$event)">详情</el-button>
                <el-button type="danger" size="small" @click.prevent="handler('remove',scope,$event)">删除</el-button>
              </template>
            </el-table-column>
          </template>
        </ds-table>
      </div>
      <!--drawer-->
      <el-drawer custom-class="ds-drawer" v-model="options.drawerVisible" size="30%" :modal="false">
        <template #header>
          <h4>{{ options.drawerTitle }}</h4>
        </template>
        <template #default>
          <el-scrollbar>
            <el-form ref="formRef" :model="formData" :rules="formRules" label-width="auto" label-position="left">
              <el-row :gutter="20">
                <el-col >
                  <el-form-item label="微服务名" prop="serviceName" required>
                    <el-input class="" v-model="formData.serviceName"/>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-col >
                  <el-form-item label="接口地址" prop="url" required>
                    <el-input class="" onkeyup="value=value.replace(/[^\w\/]/ig,'')" v-model="formData.url" placeholder="接口地址以 / 开头"/>
                  </el-form-item>
                </el-col>
  
               <el-row :gutter="20">
                <el-col >
                  <el-form-item label="接口名称" prop="name">
                    <el-input class=""  maxlength="30" show-word-limit v-model="formData.name"/>
                  </el-form-item>
                </el-col>
            
              </el-row>

              <el-col >
                  <el-form-item label="接口描述" prop="description" required>
                    <el-input class="" maxlength="30" show-word-limit v-model="formData.description"/>
                  </el-form-item>
                </el-col>
  
           
  
              <el-row :gutter="20">
                <el-col >
                    <el-form-item label="校验级别" prop="checkLevel" required>
                      <el-select v-model="formData.checkLevel" placeholder="校验级别">
                          <el-option label="不校验" value="None" />
                          <el-option label="客户端校验" value="Client" />
                          <el-option label="用户/终端校验" value="Principal" />
                      </el-select>
                    </el-form-item>
                </el-col>
                <el-col >
                  <el-form-item label="请求方法" prop="requestMethodText" required>
                      <el-select v-model="formData.requestMethodText" placeholder="请求方法">
                          <el-option label="POST" value="POST" />
                          <el-option label="GET" value="GET" />
                      </el-select>
                    </el-form-item>
                </el-col>
                <el-col >
                    <el-form-item label="匿名访问" prop="anonymousEnable" required>
                      <el-select v-model="formData.anonymousEnable" placeholder="是否匿名">
                          <el-option label="是" value="Y" />
                          <el-option label="否" value="N" />
                      </el-select>
                    </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                
              </el-row>
            </el-form>
          </el-scrollbar>
        </template>
        <template #footer>
          <div class="ds-fx">
            <div class="fx-size-1 ta-l">
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
    name:"interface",
    path: "/framework/platform/interface"
  }
  </script>
  
  <script lang="ts" setup>
  import {ref, reactive, nextTick,onMounted} from 'vue';
  import {ElMessage, ElMessageBox, FormInstance, FormRules} from 'element-plus'
  import dsmain from '@dscloud/api/dsmain';
  import { DsTable,DsTablebar,DsSelect, DsBreadcrumb} from '@dscloud/components';
  import router from '@dscloud/router';
  
  const options = reactive({
    drawerVisible:false,
    drawerTitle: ""
  });
  const dsTableRef = ref();
  const dsTableBarRef = ref();
  const adFilterFormRef = ref<FormInstance>()
  const tableData = {
    queryMetaPageFun:dsmain.getInterfaceMetaPage,
    queryPageInfoFun:dsmain.getInterfacePage,
    filters:[],
    orders:[{"field":"eventTime","direction":"desc"}],
    excludeFields:["detail"],
    checkLevel:'',
    requestMethodText:'',
    anonymousEnable:'',
  
  }
  const tableBarData = {
    queryMetaPageFun:dsmain.getInterfaceMetaPage,
    filterBar:[
      {name:"微服务名",type:"dropselect",width:'200px',field:"inputSearch",defaultValue:"",
      remote:true,dataSource: 'Model', dataSourceKey: 'ds_microservice',valueField:'id',textField:'name'},
      {name:"接口地址",type:"inputsearch",field:"inputSearch2",defaultValue:"",filters:[
          {field:"url",expression:"$regex"},
        ]},
      {name:"接口名称",type:"inputsearch",field:"inputSearch3",defaultValue:"",filters:[
          {field:"name",expression:"$regex"},
        ]}
    ],
    batchBar:[
      {name:"批量删除",type:"button",icon:"Delete",buttonCss:"danger",command:"batchDelete"}
    ],
    toolBar:[
      {name:"",tooltip:"自定义显示列",type:"button",icon:"View",buttonCss:"",command:"_cuscol"},
      {name:"导出",type:"btngroup",icon:"ArrowDown",buttonCss:"",command:"_export",buttons:[{name:"导出当前结果",type:"button",icon:"",command:"_expall"},{name:"导出/导入设置",type:"button",icon:"",command:"_cusimpexp"}]},
      {name:"新建接口",type:"button",icon:"plus",buttonCss:"success",command:"create"}
    ],
    onButtonClick:function(command:any,data:any,event:any){
      handler(command,data,event);
    }
  }
  
  const formRef = ref<FormInstance>();
  const formData:any = reactive({
    serviceName:'',
    url:'',
    name:'',
    description:"",
    checkLevel:'',
    requestMethodText:'',
    requestMethodList:'',
    anonymousEnable:'',
  });
  const formRules = reactive<FormRules>({
    
    serviceName: [
      {
        required: true,
        message: '请输入微服务名',
        trigger: ['blur', 'change'],
      },
    ],
    url: [
      {
        required: true,
        message: '请输入接口地址',
        trigger: ['blur', 'change'],
      },
    ],
    name: [
      {
        required: true,
        message: '请输入接口名称',
        trigger: ['blur', 'change'],
      },
    ],
    description: [
      {
        required: true,
        message: '请输入接口描述',
        trigger: ['blur', 'change'],
      },
    ],
    requestMethodText: [
      {
        required: true,
        message: '请选择请求方法',
        trigger: 'change',
      },
    ],
    anonymousEnable: [
      {
        required: true,
        message: '请选择是否匿名访问',
        trigger: 'change',
      },
    ],
   
  });
  //region 事件、方法
  const handler = (command:any,data:any,event:any)=>{
    switch (command) {
      case "create":
        options.drawerVisible = true;
        options.drawerTitle = "新建接口";
        formRef.value?.resetFields();
        break;
      case "edit":
        options.drawerTitle = "编辑接口("+data.row.name+")";
        dsmain.getInterfaceEntity(data.row.id).then((res: any) => {
          if (res) {
            console.log(res);
            if(res.anonymousEnable=='0'){
              res.anonymousEnable='N'
            }else if(res.anonymousEnable=='1'){
              res.anonymousEnable='Y'
            }
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
          callback: (action:string) => {
            if(action=="confirm"){
              dsmain.removeInterface(data.row.id).then((res:any) => {
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
                dsmain.batchRemoveInterface(ids).then((res:any) => {
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
        // let adFilters = [];
        // if(adFilterBarData.org){
        //   adFilters.push({key: "org.name", data: {$regex:adFilterBarData.org}});
        // }
        // if(adFilterBarData.eventTime&&adFilterBarData.eventTime.length>0){
        //   let filter:any = {key:"$and",items:[]};
        //   filter.items.push({key: "eventTime", data: {$gte:adFilterBarData.eventTime[0]}});
        //   filter.items.push({key: "eventTime", data: {$lte:adFilterBarData.eventTime[1]}});
        //   adFilters.push(filter);
        // }
        // dsTableBarRef&&(dsTableBarRef.value.reloadTable(adFilters));
        // break;
      case "queryReset":
        if(!data)return;
        data.resetFields();
        dsTableBarRef&&(dsTableBarRef.value.reloadTable([]));
        break;
    }
  }
  const formSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        if (formData.id) {
          console.log('更新');
          dsmain.updateInterface(formData).then((res: any) => {
            if (res && res.modifiedCount > 0) {
              ElMessage.success("提交成功");
              options.drawerVisible = false;
              dsTableRef.value.reloadData();
            } else {
              ElMessage.error("提交失败");
            }
          });
        } else {
          console.log('新建');
          formData.requestMethodList=[formData.requestMethodText]
          // console.log(formData.url.split('/'));
          formData.contextPath='/'+formData.url.split('/')[1]
          formData.apiRootPath='/'+formData.url.split('/')[2]
          
          console.log(formData);
  
          dsmain.insertInterface(formData).then((res: any) => {
            console.log(res);
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