<template>
    <div class="ds-wrapper org-wrapper">
        <el-breadcrumb separator-icon="ArrowRight" class="mb-20">
            <el-breadcrumb-item :to="{ path: '/' }">系统服务</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>机构管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!--desc-->
        <div class="ds-desc">
          <h4>{{router.currentRoute.value.meta.title}}</h4>
            <span class="detail">管理平台下所有机构及子机构，以及对机构进行授权。</span>
          <el-icon class="icon"><component :is="router.currentRoute.value.meta.iconName"></component></el-icon>
        </div>
        <!--filter-bar-->
        <div class="mt-20">
            <ds-tablebar ref="dsTableBarRef" :ds-table-ref="dsTableRef" :query-meta-page-fun="tableData.queryMetaPageFun" :filter-bar="tableBarData.filterBar" :batch-bar="tableBarData.batchBar" :tool-bar="tableBarData.toolBar" :on-button-click="tableBarData.onButtonClick">
                <template #adFilterBar>
                    <el-form ref="adFilterFormRef" :model="adFilterBarData" :inline="true" label-width="100px" label-position="left">
                        <el-form-item label="机构名称" prop="name">
                            <el-input placeholder="机构名称" v-model="adFilterBarData.name"/>
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
                            <el-button type="primary" @click="handler('querySubmit','',$event)">查询</el-button>
                            <el-button type="" @click="handler('queryReset',adFilterFormRef,$event)">重置</el-button>
                        </el-form-item>
                    </el-form>
                </template>
            </ds-tablebar>
        </div>
        <!-- table panel -->
        <div class="mt-20">
            <ds-table ref="dsTableRef" :ds-table-bar-ref="dsTableBarRef" :query-meta-page-fun="tableData.queryMetaPageFun" :query-page-info-fun="tableData.queryPageInfoFun"
                      :filters="tableData.filters" :orders="tableData.orders" :exclude-fields="tableData.excludeFields"
                      :lazy="tableData.lazy"
                      :load="tableData.load"
                      :tree-props="tableData.treeProps">
                <template #operationColumn>
                    <el-table-column fixed="right" label="操作" width="170">
                        <template #default="scope">
                            <el-button type="default" size="small" @click.prevent="handler('editDetail',scope,$event)">编辑</el-button>
                            <el-button v-if="scope.row.isItem !== true" type="primary" size="small" @click.prevent="handler('createItem',scope,$event)">创建子机构</el-button>
                        </template>
                    </el-table-column>
                </template>
            </ds-table>
        </div>
        <!--drawer-->
        <el-drawer custom-class="ds-drawer" v-model="options.drawerVisible" size="55%" :modal="false">
            <template #header>
                <h4>{{ options.drawerTitle }}</h4>
            </template>
            <template #default>
                <el-scrollbar>
                    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="auto" label-position="left">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="机构编码" prop="code" required>
                                <el-input class="" v-model="formData.code"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="机构名称" prop="name" required>
                                <el-input class="" v-model="formData.name"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="机构类型" prop="orgTypes" required>
                              <el-cascader class="w-full" v-model="formData.orgTypes" :props="orgTypeProps" placeholder="请选择机构类型" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">

                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="联系人" prop="contact">
                                <el-input class="" v-model="formData.contact"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="性别" prop="sex">
                                <el-radio-group v-model="formData.sex">
                                  <el-radio label="1">男</el-radio>
                                  <el-radio label="0">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="固定电话" prop="phoneNumber">
                                <el-input class="" v-model="formData.phoneNumber"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="手机号" prop="mobileNumber">
                                <el-input class="" v-model="formData.mobileNumber"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="邮箱" prop="email">
                                <el-input class="" v-model="formData.email"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="域名" prop="domain">
                            <el-input v-model="formData.domain"/>
                          </el-form-item>
                        </el-col>
                    </el-row>
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="所在地区" prop="addressArea">
                            <ds-admin-area-select v-model="formData.addressArea" class="w-full" placeholder="省/市/区"></ds-admin-area-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="详细地址" prop="addressDetail">
                            <el-input v-model="formData.addressDetail"/>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="formData.remark" type="textarea"/>
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
                                <el-form-item label="启用状态" prop="enableFlag">
                                    <span>{{formData.enableFlag}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="启用/禁用时间" prop="enableTime">
                                    <span>{{formData.enableTime}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="激活状态" prop="activateFlag">
                                    <span>{{formData.activateFlag}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="激活时间" prop="activateTime">
                                    <span>{{formData.activateTime}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="过期时间" prop="deadline">
                                    <span>{{formData.deadline}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="初始化状态" prop="initFlag">
                                    <span>{{formData.initFlag}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="初始化时间" prop="initTime">
                                    <span>{{formData.initTime}}</span>
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
                  <el-button class="mr-10" type="primary">机构初始化</el-button>
                  <el-dropdown class="mr-10">
                    <el-button type="">
                      启/禁用<el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </el-button>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>启用机构</el-dropdown-item>
                        <el-dropdown-item>禁用机构</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                  <el-dropdown class="mr-10">
                    <el-button type="">更多<el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </el-button>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>删除机构</el-dropdown-item>
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
  name:"Organization",
  path: "/framework/platform/organization"
}
</script>

<script lang="ts" setup>
import {ref, reactive, nextTick} from 'vue';
import {ElMessage, ElMessageBox, FormInstance, FormRules} from 'element-plus';
import dsmain from '@dscloud/api/dsmain';
import {DsTable,DsTablebar,DsAdminAreaSelect} from '@dscloud/components';
import router from '@dscloud/router';
    const options = reactive({
      drawerVisible: false,
      drawerTitle: "",
      formDetailVisible: false,//表单明细信息显示
    });
    const dsTableRef = ref();
    const dsTableBarRef = ref();
    const adFilterFormRef = ref<FormInstance>();
    const getSubOrganizationList = (
          row: any,
          treeNode: unknown,
          resolve: (list) => void
      ) => {
      dsmain.getSubOrganizationList(row.id).then((res: any) => {
        if (res) {
          res.forEach((item, idx, arr) => {
            item["isItem"] = true;
          });
          resolve(res);
        }
      });
    };
    const tableData = {
      lazy: true,
      load: getSubOrganizationList,
      treeProps: {children: "children", hasChildren: "hasItem"},
      queryMetaPageFun: dsmain.getOrganizationMetaPage,
      queryPageInfoFun: dsmain.getOrganizationPage,
      filters: [{key: "hierarchy", data: {$eq: 1},}],
      orders: [{"field": "createTime", "direction": "desc"}],
      excludeFields: []
    }
    const tableBarData = {
        queryMetaPageFun:dsmain.getOrganizationMetaPage,
        filterBar:[
            /*{name:"状态",type:"dropselect",field:"Status",options:[{name:"全部",value:""},{name:"有效",value:"1"},{name:"无效",value:"0"}]},*/
            {name:"机构名称、代码",type:"inputsearch",field:"inputSearch",defaultValue:"",filters:[
                    {field:"name",expression:"$regex"},
                    {field:"code",expression:"$regex"},
                ]}
        ],
        batchBar:[
            {name:"批量删除",type:"button",icon:"Delete",buttonCss:"danger",command:"batchDelete"}
        ],
        toolBar:[
            {name:"",tooltip:"自定义显示列",type:"button",icon:"View",buttonCss:"",command:"_cuscol"},
            {name:"导出",type:"btngroup",icon:"ArrowDown",buttonCss:"",command:"_export",buttons:[{name:"导出当前结果",type:"button",icon:"",command:"_expall"},{name:"导出/导入设置",type:"button",icon:"",command:"_cusimpexp"}]},
            {name:"新建机构",type:"button",icon:"plus",buttonCss:"success",command:"create"}
        ],
        onButtonClick:function(command:any,data:any,event:any){
            handler(command,data,event);
        }
    }
    const adFilterBarData:any = reactive({
        name:"",
        createTime:""
    });
    const formRef = ref<FormInstance>();
    const formData:any = reactive({
      parentId:"0",
      code: "",
      name: "",
      orgTypes: [],
      orgType: "",
      orgSubType: "",
      address: {},
      addressArea:[],
      contact: "",
      sex: "1",
      phoneNumber: "",
      mobileNumber: "",
      email: "",
      domain: "",
      createUser: {},
      createTime: "",
      updateUser: {},
      updateTime: "",
      enableFlag: "",
      enableTime: "",
      activateFlag: "",
      activateTime: "",
      deadline: "",
      initFlag: "",
      initTime: "",
      remark: "",
    });
    const formRules = reactive<FormRules>({
      code: [
        {
          required: true,
          message: '请输入机构编码',
          trigger: ['blur', 'change'],
        },
      ],
      name: [
        {
          required: true,
          message: '请输入机构名称',
          trigger: ['blur', 'change'],
        },
      ],
      orgTypes: [
        {
          required: true,
          message: '请选择机构类型',
          trigger: ['blur', 'change'],
        },
      ]
    });
    const orgTypeProps = {
      lazy: true,
      lazyLoad(node, resolve) {
        const { level } = node;
        if(level===0){
          let param:any = {
            componentKey: "dsselect",
            datasource: "Dictionary",
            key: "ds_org:orgType"
          }
          dsmain.requestComponentData(param).then((res:any) => {
            if(res){
              let nodes = [];
              res.forEach((item,idx,arr)=>{
                nodes.push({value:item.value,label:item.text,leaf:false});
              });
              resolve(nodes);
            }
          });
        }else if(level===1){
          let param = {
            componentKey: "dsselect",
            datasource: "Dictionary",
            key: "ds_org:orgSubType",
            options: {"prefix": node.value+":"}
          }
          dsmain.requestComponentData(param).then((res:any) => {
            if(res){
              let nodes = [];
              res.forEach((item,idx,arr)=>{
                nodes.push({value:item.value,label:item.text,leaf:true});
              });
              resolve(nodes);
            }
          });
        }
      }
    }
    //region 事件、方法
    const handler = (command:any,data:any,event:any)=>{
        switch (command) {
          case "create":
            options.formDetailVisible = false;
            options.drawerVisible = true;
            options.drawerTitle = "新建机构";
            formRef.value.resetFields();
            break;
          case "createItem":
            formData.parentId = data.row.id;
            options.formDetailVisible = false;
            options.drawerVisible = true;
            options.drawerTitle = "新建子机构("+data.row.name+")";
            formRef.value.resetFields();
            break;
          case "editDetail":
            options.drawerTitle = "编辑机构("+data.row.name+")";
            dsmain.getOrganizationEntity(data.row.id).then((res: any) => {
              if (res) {
                options.formDetailVisible = true;
                options.drawerVisible = true;
                nextTick(()=>{
                  Object.assign(formData, res);
                  formData.orgTypes = [];
                  formData.orgTypes.push(res.orgType);
                  formData.orgTypes.push(res.orgSubType);
                });
              }
            });
            break;
          case "remove":
            ElMessageBox.alert('确认删除？', '提示', {
              confirmButtonText: 'OK',
              callback: (action: any) => {
                if (action == "confirm") {
                  dsmain.removeException(data.row.id).then((res: any) => {
                    if (res && res.deletedCount > 0) {
                      dsTableRef.value.reloadData();
                    }
                  });
                }
              },
            })
            break;
          case "batchDelete":
            let rows = dsTableRef.value.getSelectionRows();
            let ids: any = [];
            rows.forEach((row: any, idx: number, arr: []) => {
              ids.push(row.id);
            });
            if (ids.length > 0) {
              ElMessageBox.alert('确认将选中数据批量删除？', '提示', {
                confirmButtonText: 'OK',
                callback: (action: any) => {
                  if (action == "confirm") {
                    dsmain.batchRemoveException(ids).then((res: any) => {
                      if (res && res.deletedCount > 0) {
                        dsTableRef.value.reloadData();
                      }
                    });
                  }
                },
              })
            }
            break;
          case "querySubmit":
            
            let adFilters: any = [];
            if (adFilterBarData.org) {
              adFilters.push({key: "org.name", data: {$regex: adFilterBarData.org}});
            }
            
            if (adFilterBarData.eventTime && adFilterBarData.eventTime.length > 0) {
              let filter: any = {key: "$and", items: []};
              filter.items.push({key: "eventTime", data: {$gte: adFilterBarData.eventTime[0]}});
              filter.items.push({key: "eventTime", data: {$lte: adFilterBarData.eventTime[1]}});
              adFilters.push(filter);
            }
            console.log(111)
            dsTableBarRef && (dsTableBarRef.value.reloadTable(adFilters));
            break;
          case "queryReset":
            if (!data) return;
            data.resetFields();
            dsTableBarRef && (dsTableBarRef.value.reloadTable([]));
            break;
        }
    }
    const formSubmit = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          formData.orgType = formData.orgTypes[0];
          formData.orgSubType = formData.orgTypes[1];
          if (formData.id) {
            dsmain.updateOrganization(formData).then((res: any) => {
              if (res && res.modifiedCount > 0) {
                ElMessage.success("提交成功");
                options.drawerVisible = false;
                dsTableRef.value.reloadData();
              } else {
                ElMessage.error("提交失败");
              }
            });
          } else {
            dsmain.inserOrganization(formData).then((res: any) => {
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
    .org-wrapper{
    }
</style>
