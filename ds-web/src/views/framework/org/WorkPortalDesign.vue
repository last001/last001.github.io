<template>
  <div class="common-layout">
    <el-container>
      <el-header style="background-color: white" class="header">
        <div class="header-title">工作台设计({{ id }})</div>
        <div class="header-tips">您可以对卡片进行添加，移动等自定义操作</div>
        <div class="header-right">
          <el-button>清空面板</el-button>
          <el-button type="primary">保存</el-button>
          <el-button @click="back">退出编辑</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" class="aside">
          <div class="aside-left">
            隐藏已添加模板
            <el-switch v-model="value1" class="aside-switch" />
          </div>
          <div class="aside-protal">组件</div>
          <div class="aside-info" v-for="item in 10">
            <el-icon>
              <Expand />
              <!-- <component :is="item.clientIcon"></component> -->
            </el-icon>
            <span>组件名{{ item }}</span>
          </div>
        </el-aside>
        <el-main class="main">
          <div class="main-info">
            <el-icon class="main-info-icon">
              <Expand />
              <!-- <component :is="item.clientIcon"></component> -->
            </el-icon>
            <div style="padding-bottom: 5px" class="main-info-tips1">
              &nbsp &nbsp您还未添加任何模块
            </div>
            <div class="main-info-tips2">请从左侧列表中选择添加</div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
export default {
  name: "WorkPortalDesign",
  path: "/framework/org/workportaldesign",
};
</script>

<script lang="ts" setup>
import { ref } from "vue";
import router from "@dscloud/router";
const id = router.currentRoute?.value.params.id;
console.log("id===>", id);
const value1 = ref(false);
const back = () => {
  router.go(-1);
};
</script>

<style lang="scss" scoped>
.header {
  border-bottom: 2px solid rgb(211, 211, 211);
  &-title {
    display: inline-block;
    margin-top: 20px;
    font-size: 16px;
    background-color: white;
  }
  &-tips {
    display: inline-block;
    position: relative;
    left: 40%;
  }
  &-right {
    display: inline-block;
    float: right;
    position: relative;
    top: 15px;
  }
}
.aside {
  font-size: 14px;
  background-color: white;
  overflow: hidden;
  &-protal {
    padding: 20px 10px;
    font-size: 24px;
    font-weight: 500;
  }
  &-left {
    height: 60px;
    padding: 20px 20px;
    border-bottom: 1px solid rgb(211, 211, 211);
  }
  &-switch {
    position: relative;
    float: right;
    bottom: 9px;
    // padding-left: 10px;
  }
  &-info {
    padding: 10px 10px;
    font-size: 16px;
  }
}
.main {
  background-color: white;
  margin: 10px 10px -0px 10px;
  overflow: hidden;
  position: relative;

  &-info {
    width: 200px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &-icon {
      left: 45%;
    }
    &-tips1 {
      position: relative;
      left: 15%;
    }
    &-tips2 {
      position: relative;
      left: 15%;
    }
  }
}
</style>
