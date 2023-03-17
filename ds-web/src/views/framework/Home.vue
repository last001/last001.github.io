<!--<script src="../../router/index.ts"></script>-->
<template>
    <el-container class="ds-home">
      <el-header class="ds-header"><ds-header></ds-header></el-header>
      <el-container>
          <el-aside :class="[data.menuAside?'':'hide-im']">
            <ds-aside ref="dsAsideRef"></ds-aside>
          </el-aside>
          <el-main class="ds-main">
              <el-scrollbar height="calc(100vh - 55px) !important">
                  <router-view></router-view>
              </el-scrollbar>
          </el-main>
      </el-container>
    </el-container>
</template>

<script lang="ts" setup>
    import { ElMessage } from 'element-plus';
    import { useRouter,onBeforeRouteUpdate } from 'vue-router';
    import {nextTick, reactive, ref} from 'vue';
    import {Menu as IconMenu} from '@element-plus/icons-vue';
    import {DsHeader,DsAside} from '@dscloud/components';
    import * as views from '@dscloud/views';
    import dsmain from "@dscloud/api/dsmain";
    const dsAsideRef = ref();
    const data:any = reactive({
        input:'',
        menuAside:false,
        menuCollapse:false,
        serviceDrawer:false,
        userIconRotate:false,
        serviceIconRotate:false
    });
    //
    let router = useRouter();
    //增加当前用户有权限的路由
    dsmain.getUserServiceMenu("framework").then((res:any)=>{
      if(res&&res.length>0){
        res.forEach((menu,idx,arr)=>{
          for(let name in views){
            if(views[name].path===menu.pcUrl){
              router.addRoute("home", {
                name:menu.code,
                path:menu.pcUrl,
                meta:{title:menu.name,menuAside:true,iconName:menu.iconCss,id:menu.id},
                component:views[name]
                //component:()=>import(comUrl+".vue")
              });
              break;
            }
          }
        });
        //直接访问地址需要跳转路由
        if(router.currentRoute.value.params.redirectPath){
          let menu = res.find(menu=>menu.pcUrl===router.currentRoute.value.params.redirectPath);
          if(menu){
            dsAsideRef.value.loadData(menu.moduleId,router.currentRoute.value.params.redirectPath);
          }
        }
      }
    });
    //直接访问模块地址
    if(router.currentRoute.value.params.moduleId){
      nextTick(()=>{
        dsAsideRef.value.loadData(router.currentRoute.value.params.moduleId);
      });
    }
    data.menuAside = router.currentRoute.value.meta.menuAside!=null?router.currentRoute.value.meta.menuAside:false;
    //监听路由导航完成后
    router.beforeResolve(to => {
      data.menuAside = to.meta.menuAside!=null?to.meta.menuAside:false;
      if(to.params.moduleId){
        if(dsAsideRef!=null&&dsAsideRef.value!=null){
          dsAsideRef.value.loadData(to.params.moduleId);
        }
      }
    })
</script>

<style lang="scss" scoped>
  .el-aside {width:auto;}
</style>
