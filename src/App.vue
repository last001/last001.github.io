<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import utils from "@/utils/utils";
import { useStore } from "vuex";
const store = useStore();
const storeData:any = sessionStorage.getItem("store");
if (storeData) {
  store.replaceState(Object.assign({}, store.state, JSON.parse(storeData)))
}

//在页面刷新时将vuex里的信息保存到sessionStorage里
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("store", JSON.stringify(store.state))
})

// 主题色
utils.setThemes(utils.getThemes());
</script>

<style lang="scss">
#nprogress .bar {
  z-index: 5000 !important;
  /** 进度条颜色 */
  background: var(--el-color-primary) !important;
}

#nprogress .spinner .spinner-icon {
  z-index: 5000 !important;
  /** 右上角转圈颜色 */
  border-top-color: var(--el-color-primary) !important;
  border-left-color: var(--el-color-primary) !important;
}
</style>
