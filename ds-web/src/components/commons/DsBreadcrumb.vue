<template>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item>
      <template #default>
        <el-dropdown>
          <span class="bold" style="cursor: pointer">
            {{breadData.firstModule?.name}}
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="module in breadData.siblingModuleList">
                <router-link style="color:var(--el-color-info-dark)" :to="{ path: module.url?.indexOf(':id')!=-1?module.url?.replace(':id',module.id):module.url }">{{module.name}}</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: breadData.secondModule?.url?.indexOf(':id')!=-1?breadData.secondModule?.url?.replace(':id',breadData.secondModule?.id):breadData.secondModule?.url }">
      {{breadData.secondModule?.name}}
    </el-breadcrumb-item>
    <slot></slot>
    <el-breadcrumb-item>{{options.title||breadData.menu?.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";
import dsmain from '@dscloud/api/dsmain';
export default defineComponent({
  name:'DsBreadcrumb',
  props: {
    menuId:String,
    title:String
  },
  setup(props:any,context) {
    const options: any = reactive({
      title:props.title
    });
    const breadData = reactive({
      menu:null,
      secondModule:null,
      firstModule:null,
      siblingModuleList:null//有权限的模块列表
    });
    //加载导航层级数据
    dsmain.getBreadcrumbByMenuId(props.menuId).then((res)=>{
      if(res){
        breadData.menu = res.menu;
        breadData.secondModule = res.secondModule;
        breadData.firstModule = res.firstModule;
        //加载有权限的模块列表
        dsmain.getUserModuleMenu(breadData.secondModule.id).then((res)=> {
          if (res) {
            breadData.siblingModuleList = res.siblingModuleList;
          }
        });
      }
    });
    //region 数据监听、事件处理
    const handler = (command:string,data:any,event:any) => {
    }
    //endregion
    return {options,breadData,handler}
  }
});
</script>

<style scoped>

</style>