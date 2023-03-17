<template>
  <div class="header-body">
    <div class="logo">
      <img class="h-full"  src="../../assets/images/logo.png" />
    </div>
    <div class="ds-nav selected"><router-link to="/">工作台</router-link></div>
    <!--服务大厅-->
    <div class="ds-nav selected" @click="options.serviceDrawer = !options.serviceDrawer;options.serviceIconRotate = !options.serviceIconRotate;"><span>服务大厅</span><el-icon class="ml-8 rotate" :class="{ 'rotate-180':options.serviceIconRotate }"><arrow-down-bold /></el-icon></div>
    <el-drawer v-model="options.serviceDrawer" @open="handler('serviceDrawerOpened',null,$event)" with-header="false" direction="ltr" size="70%" z-index="2001" custom-class="header-service-drawer" modal-class="header-service-drawer-mask" @close="options.serviceIconRotate = false;">
      <div class="ds-fx">
        <div class="header-collect w-220 bwr-1 b-f1">
          <div class="ds-fx ai-c" style="padding:18px">
            <span class="fs-20 bold">我的收藏</span>
          </div>
          <el-scrollbar height="calc(100vh - 112px) !important">
            <ul class="el-dropdown-menu header-dropdown-menu nopd">
              <li class="el-dropdown-menu__item" style="padding: 10px 16px;padding-right:5px">
                <div class="ds-fx ai-c w-full">
                  <el-icon :size="18"><tickets /></el-icon><div class="ml-5 fx-size-1">未完成事项</div>
                  <el-link icon="close" :underline="false" class="hover-btn pl-3 pr-3" title="取消收藏"></el-link>
                  <el-link icon="grid" :underline="false" class="hover-btn pl-3 pr-3" style="cursor: move" title="拖动以调整顺序"></el-link>
                </div>
              </li>
              <li class="el-dropdown-menu__item" style="padding: 10px 16px;padding-right:5px">
                <div class="ds-fx ai-c w-full">
                  <el-icon :size="18"><tickets /></el-icon><div class="ml-5 fx-size-1">未完成事项</div>
                  <el-link icon="close" :underline="false" class="hover-btn pl-3 pr-3" title="取消收藏"></el-link>
                  <el-link icon="grid" :underline="false" class="hover-btn pl-3 pr-3" style="cursor: move" title="拖动以调整顺序"></el-link>
                </div>
              </li>
              <li class="el-dropdown-menu__item" style="padding: 10px 16px;padding-right:5px">
                <div class="ds-fx ai-c w-full">
                  <el-icon :size="18"><tickets /></el-icon><div class="ml-5 fx-size-1">未完成事项</div>
                  <el-link icon="close" :underline="false" class="hover-btn pl-3 pr-3" title="取消收藏"></el-link>
                  <el-link icon="grid" :underline="false" class="hover-btn pl-3 pr-3" style="cursor: move" title="拖动以调整顺序"></el-link>
                </div>
              </li>
              <li class="el-dropdown-menu__item" style="padding: 10px 16px;padding-right:5px">
                <div class="ds-fx ai-c w-full">
                  <el-icon :size="18"><tickets /></el-icon><div class="ml-5 fx-size-1">未完成事项</div>
                  <el-link icon="close" :underline="false" class="hover-btn pl-3 pr-3" title="取消收藏"></el-link>
                  <el-link icon="grid" :underline="false" class="hover-btn pl-3 pr-3" style="cursor: move" title="拖动以调整顺序"></el-link>
                </div>
              </li>
            </ul>
          </el-scrollbar>
        </div>
        <div class="fx-size-1 ds-fx" style="padding: 32px 0px 0px 32px">
          <div class="fx-size-1 ds-fx fd-c">
            <el-input v-model="options.input" class="w-full search" placeholder="搜索服务" prefix-icon="Search" clearable/>
            <el-scrollbar height="calc(100vh - 118px) !important">
              <div style="padding-top:16px;padding-bottom:16px;">
                <div class="" style="padding:10px 10px">
                  <span class="bold fs-15">最近访问</span>
                </div>
                <ul class="el-dropdown-menu header-dropdown-menu" style="columns: 220px 4;column-gap: 20px;">
                  <li class="el-dropdown-menu__item" style="padding: 6px 10px;break-inside:avoid">
                    <div class="ds-fx ai-c w-full"><span class="fx-size-1">未完成事项</span><el-icon :size="18" title="加入收藏" class="nomg hover-btn" color="var(&#45;&#45;el-color-info)"><star-filled /></el-icon></div>
                  </li>
                  <li class="el-dropdown-menu__item" style="padding: 6px 10px;break-inside:avoid">
                    <div class="ds-fx ai-c w-full"><span class="fx-size-1">未完成事项</span><el-icon :size="18" title="取消收藏" class="nomg" color="var(&#45;&#45;el-color-primary)"><star-filled /></el-icon></div>
                  </li>
                  <li class="el-dropdown-menu__item" style="padding: 6px 10px;break-inside:avoid">
                    <div class="ds-fx ai-c"><span class="">未完成事项</span></div>
                  </li>
                  <li class="el-dropdown-menu__item" style="padding: 6px 10px;break-inside:avoid">
                    <div class="ds-fx ai-c"><span class="">未完成事项</span></div>
                  </li>
                  <li class="el-dropdown-menu__item" style="padding: 6px 10px;break-inside:avoid">
                    <div class="ds-fx ai-c"><span class="">未完成事项</span></div>
                  </li>
                  <li class="el-dropdown-menu__item" style="padding: 6px 10px;break-inside:avoid">
                    <div class="ds-fx ai-c"><span class="">未完成事项</span></div>
                  </li>
                </ul>
                <div class="h-22"></div>
                <div style="columns: 220px 4;column-gap: 20px;">
                  <ul v-for="pmodule in serviceData.userModules" class="el-dropdown-menu header-dropdown-menu" style="break-inside:avoid">
                    <li style="padding:15px 10px"><span class="bold fs-15">{{pmodule.name}}</span></li>
                    <li v-for="module in pmodule.children" class="el-dropdown-menu__item" style="padding: 6px 10px;">
                        <router-link class="ds-fx w-full ai-c" @click="options.serviceDrawer=false" :to="module.url?.indexOf(':id')!=-1?module.url?.replace(':id',module.id):module.url">
                          <span class="fx-size-1">{{module.name}}</span><el-icon :size="18" title="加入收藏" class="nomg hover-btn" color="var(&#45;&#45;el-color-info)"><star-filled /></el-icon>
                        </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </el-scrollbar>
          </div>
          <div style="width: 160px">
            <el-link :underline="false" style="right:20px;position: absolute;top:15px;" @click="options.serviceDrawer=false">
              <el-icon :size="25"><close /></el-icon>
            </el-link>
            <el-tabs tab-position="right" style="height: calc(100vh - 88px)" class="">
              <el-tab-pane v-for="pmodule in serviceData.userModules" :label="pmodule.name"></el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </el-drawer>
    <div class="fx-size-1 ds-fx ai-c jc-c"></div>
    <!--搜索-->
    <el-popover :show-arrow="false" trigger="focus" placement="bottom-start" width="430px" :offset="-5" popper-class="header-popover" transition="el-fade-in-move-up">
      <template #reference>
        <div class="ds-fx ai-c mr-10 ml-10">
          <el-input
              v-model="input"
              class="w-200 ds-search"
              placeholder="搜索服务"
              prefix-icon="Search" clearable
          />
        </div>
      </template>
      <template #default>

      </template>
    </el-popover>
    <!--收藏-->
    <el-popover :show-arrow="false" placement="bottom-end" width="430px" :offset="-5" :teleported="false" popper-class="header-popover" transition="el-fade-in-move-up">
      <template #reference>
        <div class="ds-nav">
          <span>收藏</span>
        </div>
      </template>
      <template #default>
        <ul class="el-dropdown-menu header-dropdown-menu">
          <li class="ds-fx ai-c jc-sb" style="padding:5px 16px;">
            <span class="bold">我的收藏</span><el-link :underline="false" icon="Setting" type="primary">管理</el-link>
          </li>
          <li class="el-dropdown-menu__item--divided"></li>
        </ul>
        <el-scrollbar max-height="235px">
          <ul class="el-dropdown-menu header-dropdown-menu ds-fx fw-w pl-15 pr-15">
            <li class="el-dropdown-menu__item w-50pc nopd" >
              <div class="ds-fx ai-c" style="padding:8px 8px;"><el-icon :size="22"><tickets /></el-icon><span class="ml-5">未完成事项</span></div>
            </li>
            <li class="el-dropdown-menu__item w-50pc nopd">
              <div class="ds-fx ai-c" style="padding:8px 8px;"><el-icon :size="22"><tickets /></el-icon><span class="ml-5">未完成事项</span></div>
            </li>
            <li class="el-dropdown-menu__item w-50pc nopd" >
              <div class="ds-fx ai-c" style="padding:8px 8px;"><el-icon :size="22"><tickets /></el-icon><span class="ml-5">未完成事项</span></div>
            </li>
            <li class="el-dropdown-menu__item w-50pc nopd">
              <div class="ds-fx ai-c" style="padding:8px 8px;"><el-icon :size="22"><tickets /></el-icon><span class="ml-5">未完成事项</span></div>
            </li>
            <li class="el-dropdown-menu__item w-50pc nopd" >
              <div class="ds-fx ai-c" style="padding:8px 8px;"><el-icon :size="22"><tickets /></el-icon><span class="ml-5">未完成事项</span></div>
            </li>
            <li class="el-dropdown-menu__item w-50pc nopd">
              <div class="ds-fx ai-c" style="padding:8px 8px;"><el-icon :size="22"><tickets /></el-icon><span class="ml-5">未完成事项</span></div>
            </li>
            <li class="el-dropdown-menu__item w-50pc nopd" >
              <div class="ds-fx ai-c" style="padding:8px 8px;"><el-icon :size="22"><tickets /></el-icon><span class="ml-5">未完成事项</span></div>
            </li>
            <li class="el-dropdown-menu__item w-50pc nopd">
              <div class="ds-fx ai-c" style="padding:8px 8px;"><el-icon :size="22"><tickets /></el-icon><span class="ml-5">未完成事项</span></div>
            </li>
            <li class="el-dropdown-menu__item w-50pc nopd" >
              <div class="ds-fx ai-c" style="padding:8px 8px;"><el-icon :size="22"><tickets /></el-icon><span class="ml-5">未完成事项</span></div>
            </li>
            <li class="el-dropdown-menu__item w-50pc nopd">
              <div class="ds-fx ai-c" style="padding:8px 8px;"><el-icon :size="22"><tickets /></el-icon><span class="ml-5">未完成事项</span></div>
            </li>
            <li class="el-dropdown-menu__item w-50pc nopd" >
              <div class="ds-fx ai-c" style="padding:8px 8px;"><el-icon :size="22"><tickets /></el-icon><span class="ml-5">未完成事项</span></div>
            </li>
            <li class="el-dropdown-menu__item w-50pc nopd">
              <div class="ds-fx ai-c" style="padding:8px 8px;"><el-icon :size="22"><tickets /></el-icon><span class="ml-5">未完成事项</span></div>
            </li>
          </ul>
        </el-scrollbar>
        <div style="height:10px"></div>
      </template>
    </el-popover>
    <!--快捷-->
    <el-popover :show-arrow="false" placement="bottom-end" :offset="-5"  width="430px" :teleported="false" popper-class="header-popover" transition="el-fade-in-move-up">
      <template #reference>
        <div class="ds-nav">
          <span>快捷</span>
        </div>
      </template>
      <template #default>
        <ul class="el-dropdown-menu header-dropdown-menu">
          <li class="ds-fx ai-c jc-sb" style="padding:5px 16px;">
            <span class="bold">快捷链接</span><el-link :underline="false" icon="Setting"  type="primary">管理</el-link>
          </li>
          <li class="el-dropdown-menu__item--divided"></li>
        </ul>
        <el-scrollbar max-height="235px">
          <ul class="el-dropdown-menu header-dropdown-menu ds-fx fw-w pl-15 pr-15">
            <li class="el-dropdown-menu__item w-50pc nopd" >
              <div class="ds-fx ai-c" style="padding:8px 8px;"><el-icon :size="22"><tickets /></el-icon><span class="ml-5">未完成事项</span></div>
            </li>
            <li class="el-dropdown-menu__item w-50pc nopd">
              <div class="ds-fx ai-c" style="padding:8px 8px;"><el-icon :size="22"><tickets /></el-icon><span class="ml-5">未完成事项</span></div>
            </li>
            <li class="el-dropdown-menu__item w-50pc nopd" >
              <div class="ds-fx ai-c" style="padding:8px 8px;"><el-icon :size="22"><tickets /></el-icon><span class="ml-5">未完成事项</span></div>
            </li>
            <li class="el-dropdown-menu__item w-50pc nopd">
              <div class="ds-fx ai-c" style="padding:8px 8px;"><el-icon :size="22"><tickets /></el-icon><span class="ml-5">未完成事项</span></div>
            </li>
            <li class="el-dropdown-menu__item w-50pc nopd" >
              <div class="ds-fx ai-c" style="padding:8px 8px;"><el-icon :size="22"><tickets /></el-icon><span class="ml-5">未完成事项</span></div>
            </li>
            <li class="el-dropdown-menu__item w-50pc nopd">
              <div class="ds-fx ai-c" style="padding:8px 8px;"><el-icon :size="22"><tickets /></el-icon><span class="ml-5">未完成事项</span></div>
            </li>
            <li class="el-dropdown-menu__item w-50pc nopd" >
              <div class="ds-fx ai-c" style="padding:8px 8px;"><el-icon :size="22"><tickets /></el-icon><span class="ml-5">未完成事项</span></div>
            </li>
            <li class="el-dropdown-menu__item w-50pc nopd">
              <div class="ds-fx ai-c" style="padding:8px 8px;"><el-icon :size="22"><tickets /></el-icon><span class="ml-5">未完成事项</span></div>
            </li>
            <li class="el-dropdown-menu__item w-50pc nopd" >
              <div class="ds-fx ai-c" style="padding:8px 8px;"><el-icon :size="22"><tickets /></el-icon><span class="ml-5">未完成事项</span></div>
            </li>
            <li class="el-dropdown-menu__item w-50pc nopd">
              <div class="ds-fx ai-c" style="padding:8px 8px;"><el-icon :size="22"><tickets /></el-icon><span class="ml-5">未完成事项</span></div>
            </li>

          </ul>
        </el-scrollbar>
        <div style="height:10px"></div>
      </template>
    </el-popover>
    <!--消息-->
    <el-popover :show-arrow="false" placement="bottom-end" width="330px" :offset="-5" :teleported="false" popper-class="header-popover" transition="el-fade-in-move-up">
      <template #reference>
        <div class="ds-nav">
          <el-badge :value="12" :max="99" class="header-badge">
            <el-icon :size="20">
              <bell-filled />
            </el-icon>
          </el-badge>
        </div>
      </template>
      <template #default>
        <ul class="el-dropdown-menu header-dropdown-menu">
          <li class="ds-fx ai-c jc-sb" style="padding:5px 16px;">
            <span class="bold">未读消息</span><el-link :underline="false" icon="Setting"  type="primary">管理</el-link>
          </li>
          <li class="el-dropdown-menu__item--divided"></li>
          <li class="el-dropdown-menu__item">
            <div class="ds-fx fd-c">
              <label>你好，你有一条新的待办审批，请处理</label>
              <span class="fs-12 mt-3" :style="{color:'var(--el-color-info-light-3)'}">2022-04-23 10:20:40</span>
            </div>
          </li>
          <li class="el-dropdown-menu__item">
            <div class="ds-fx fd-c">
              <label>你好，你有一条新的待办审批，请处理</label>
              <span class="fs-12 mt-3" :style="{color:'var(--el-color-info-light-3)'}">2022-04-23 10:20:40</span>
            </div>
          </li>
          <li class="el-dropdown-menu__item">
            <div class="ds-fx fd-c">
              <label>你好，你有一条新的待办审批，请处理</label>
              <span class="fs-12 mt-3" :style="{color:'var(--el-color-info-light-3)'}">2022-04-23 10:20:40</span>
            </div>
          </li>
          <li class="el-dropdown-menu__item">
            <div class="ds-fx fd-c">
              <label>你好，你有一条新的待办审批，请处理</label>
              <span class="fs-12 mt-3" :style="{color:'var(--el-color-info-light-3)'}">2022-04-23 10:20:40</span>
            </div>
          </li>
          <li class="el-dropdown-menu__item">
            <div class="ds-fx fd-c">
              <label>你好，你有一条新的待办审批，请处理</label>
              <span class="fs-12 mt-3" :style="{color:'var(--el-color-info-light-3)'}">2022-04-23 10:20:40</span>
            </div>
          </li>
          <li class="el-dropdown-menu__item--divided"></li>
          <li class="el-dropdown-menu__item"><span>更多消息</span></li>
        </ul>
      </template>
    </el-popover >
    <!--用户信息-->
    <el-popover :show-arrow="false" width="200px" :offset="-5" :teleported="false" popper-class="header-popover" transition="el-fade-in-move-up" @before-enter="options.userIconRotate=true" @before-leave="options.userIconRotate=false">
      <template #reference>
        <div class="ds-nav">
          <el-avatar :size="32" icon="UserFilled" />
          <div class="ds-fx fd-c ml-8">
            <span class="fs-14">张老师</span>
            <span class="fs-12 mt-3">实训中心主任</span>
          </div>
          <el-icon class="ml-8 rotate" :class="{ 'rotate-180':options.userIconRotate }"><arrow-down-bold /></el-icon>
        </div>
      </template>
      <template #default>
        <ul class="el-dropdown-menu header-dropdown-menu">
          <li class="ds-fx ai-c" style="padding:5px 16px;">
            <el-avatar :size="38" icon="UserFilled" />
            <div class="ds-fx fd-c ml-10">
              <div>
                <span class="fs-14 bold">张老师</span>
                <span class="ml-10 c-999 fs-12">uid001</span>
              </div>
              <span class="fs-12 mt-3">实训中心主任</span>
            </div>
          </li>
          <li class="el-dropdown-menu__item--divided"></li>
          <li class="el-dropdown-menu__item"><el-icon :size="16"><tickets /></el-icon><span class="ml-5">未完成事项</span></li>
          <li class="el-dropdown-menu__item"><el-icon :size="16"><star /></el-icon><span class="ml-5">关注事项</span></li>
          <li class="el-dropdown-menu__item"><el-icon :size="16"><bell /></el-icon><span class="ml-5">消息中心</span></li>
          <li class="el-dropdown-menu__item--divided"></li>
          <li class="el-dropdown-menu__item"><el-icon :size="16"><user /></el-icon><span class="ml-5">个人设置</span></li>
          <li class="el-dropdown-menu__item"><el-icon :size="16"><edit /></el-icon><span class="ml-5">修改密码</span></li>
          <li class="el-dropdown-menu__item"><el-icon :size="16"><house /></el-icon><span class="ml-5">关于系统</span></li>
          <li class="el-dropdown-menu__item--divided"></li>
          <li class="el-dropdown-menu__item ds-fx"><el-icon :size="16"><switch-button /></el-icon><a class="ml-5" href="/login">退出登录</a></li>
        </ul>
      </template>
    </el-popover>
    <!-- -->
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive} from 'vue';
import dsmain from '@dscloud/api/dsmain';

export default defineComponent({
  name:'DsHeader',
  setup(props:any,context){
    const options:any = reactive({
      input:'',
      menuAside:true,
      menuCollapse:false,
      serviceDrawer:false,
      userIconRotate:false,
      serviceIconRotate:false
    });
    const serviceData:any = reactive({
      latelyModules:false,
      userModules:false,
      collectionModules:false,
    });
    //region 数据监听、事件处理
    const handler = (command:string,data:any,event:any) => {
      switch (command) {
        case "serviceDrawerOpened":
          !serviceData.userModules&&dsmain.getUserModuleList().then((res:any)=>{
            serviceData.userModules = res;
          });
          break;
      }
    }
    return {options,handler,serviceData}
  }
})
</script>

<style lang="scss" scoped>
  .header-body {
    display: flex;height: 55px !important;
    .logo {
      padding: 12px 16px;
    }

    .ds-nav {
      color: rgba(255, 255, 255, 0.8);
      font-size: var(--el-font-size-base);
      display: flex;
      align-items: center;
      padding: 0px 12px;
      height: 100%;
      white-space: nowrap;
      cursor: pointer;

      a {
        color: rgba(255, 255, 255, 0.8);
      }

      &.selected a {
        color: var(--el-color-primary);
      }

      &:hover {
        color: rgba(255, 255, 255, 1);
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    .ds-search {
      ::v-deep .el-input__wrapper {
        color: #fff;
        background-color: rgba(255, 255, 255, 0.1);
        border: 0px;
        box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.1) inset;
        border-radius: var(--el-border-radius-round);

        &:focus {
          outline: none;
          box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset;
        }
      }
    }

    ::v-deep .header-service-drawer {
      .el-drawer__header {
        display: none;
      }

      .el-drawer__body {
        padding: 0px;
        overflow: hidden;
      }

      .search .el-input__wrapper {
        box-shadow: none;
        border-bottom: #f1f1f1 1px solid;
      }

      .el-tabs__header {
        float: left !important;
        margin-left: 0px !important;
        margin-top: 30px !important;
      }

      .el-tabs__content {
        display: none !important;
      }
    }

    ::v-deep .header-service-drawer-mask {
      height: calc(100% - 55px) !important;
      top: 55px !important;
    }

    .header-badge {
      --el-badge-size: 16px !important;
      .el-badge__content {
        border: none;
      }
    }

    ::v-deep .header-popover {
      padding: 0px !important;
      border-radius: 2px !important;
    }

    .header-dropdown-menu {
      color: var(--el-text-color-primary);
      .el-dropdown-menu__item {
        font-size: 13px;

        a{ color:var(--el-text-color-regular); }

        .hover-btn {
          display: none !important;
        }

        &:hover{
          a{color: var(--el-color-black);}
          color: var(--el-color-black);
          background-color: var(--el-fill-color-light);
          .hover-btn {
            display: block !important;
          }
        }
      }
    }
  }
</style>