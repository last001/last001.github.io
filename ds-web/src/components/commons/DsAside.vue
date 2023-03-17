<template>
  <div class="ds-fx fd-c aside-body" :class="[options.menuCollapse?'collapse':'expand']">
    <el-scrollbar height="calc(100vh - 55px - 42px) !important">
      <div :class="['menu-title',options.menuCollapse?'collapse':'expand']"><span v-if="!options.menuCollapse">{{menuData.module.name}}</span><el-icon v-else :size="20"><component :is="menuData.module.iconCss"></component></el-icon></div>
      <el-menu :default-active="menuData.currentPath" router :collapse="options.menuCollapse" :collapse-transition="false" style="border:0px;">
        <template v-for="menu in menuData.menuList">
          <el-sub-menu :index="menu.code" v-if="menu.subNumber>0">
            <template #title>
              <el-icon><component :is="menu.iconCss"></component></el-icon>
              <span>{{menu.name}}</span>
            </template>
            <template v-for="submenu in menu.children">
              <el-sub-menu v-if="submenu.subNumber>0">
                <template #title>
                  <el-icon><component :is="submenu.iconCss"></component></el-icon>
                  <span>{{submenu.name}}</span>
                </template>
                <el-menu-item v-for="submenu2 in submenu.children" :index="submenu2.pcUrl"><span style="width:8px;"></span>{{submenu2.name}}</el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="submenu.pcUrl"><span style="width:8px;"></span>{{submenu.name}}</el-menu-item>
            </template>
          </el-sub-menu>
          <el-menu-item :index="menu.pcUrl" v-else>
            <el-icon><component :is="menu.iconCss"></component></el-icon>
            <span>{{menu.name}}</span>
          </el-menu-item>
        </template>
        <!--相关服务-->
        <div v-if="menuData.moduleList.length>0" class="fs-12 c-999" style="padding:10px 20px;line-height: 18px;">相关服务</div>
        <el-menu-item v-for="module in menuData.moduleList" :index="module.url.indexOf(':id')!=-1?module.url.replace(':id',module.id):module.url">
          <el-icon><component :is="module.iconCss"></component></el-icon>
          <span>{{module.name}}</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
    <div class="fold-toggle" @click="options.menuCollapse = !options.menuCollapse;"><el-icon v-if="!options.menuCollapse" :size="20" title="收起"><fold /></el-icon><el-icon v-else :size="20" title="展开"><expand /></el-icon></div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive} from 'vue';
import dsmain from "@dscloud/api/dsmain";
import { useRouter } from 'vue-router';
export default defineComponent({
  name:'DsAside',
  setup(props:any,context){
    const options:any = reactive({
      menuCollapse:false,
    });
    const menuData = reactive({
      module: {name:'',iconCss:''},//当前模块
      menuList:[],
      moduleList:[],//相关模块
      currentPath:null,
    });
    let router = useRouter();
    //region 方法
    const loadData=(moduleId:string,currentPath:string)=> {
      dsmain.getUserModuleMenu(moduleId).then((res:any)=>{
        menuData.menuList = res.menuList;
        menuData.module = res.module;
        menuData.moduleList = res.siblingModuleList;
        if(currentPath){
          menuData.currentPath = currentPath||"";
          router.push(currentPath);
        }else{
          const firstUrl = getFirstUrl(res.menuList);
          menuData.currentPath =firstUrl;
          router.push(firstUrl);
        }
      });
    }
    const getFirstUrl = (menus)=> {
      for(let menu of menus) {
        if (menu.pcUrl) return menu.pcUrl;
        else if(menu.children&&menu.children.length>0){
          return getFirstUrl(menu.children);
        }
      }
      return "";
    }
    //endregion
    return {options,loadData,menuData}
  }
})
</script>

<style lang="scss" scoped>
.aside-body {
  .el-scrollbar {
    height: auto;
  }
  &.expand {
    width: 220px;
  }
  &.collapse {
    width: 64px;
  }
  .menu-title {
    padding: 15px 20px;
    color: var(--el-text-color-primary);
    span {
      font-size: 20px;
      font-weight: bold;
    }
    .el-icon {
    }
    &.collapse {
      border-bottom: var(--el-color-primary-light-9) 1px solid;
    }
  }

  .fold-toggle {
    padding: 10px 20px;
    background-color: var(--el-color-primary-light-9);
    cursor: pointer;
    &:hover {
      background-color: var(--el-color-primary-light-8);
    }
    .el-icon {
      color: var(--el-text-color-regular)
    }
  }
}
</style>