<template>
  <div class="product" :style="{ minHeight: screenHeight + 'px' }">
    <titleNavbar ref="titlePage"></titleNavbar>
    <div class="content-bottom">
      <sideNavbar ref="sidePage" @Wstate="getWstate"></sideNavbar>
      <!-- <ssssss ref="sidePage" @Wstate="getWstate"></ssssss> -->
      <keep-alive>
        <router-view
          v-if="$route.meta.keepAlive"
          :wastate="flag"
          :style="{
            width: W,
            marginLeft: leftName + 'px',
          }"
        />
      </keep-alive>
      <router-view
        v-if="!$route.meta.keepAlive"
        :wastate="flag"
        :style="{
          width: W,
          marginLeft: leftName + 'px',
        }"
      />
      <!-- <footerDiv
        :style="{
          width: W,
          marginLeft: leftName + 'px',
        }"
      ></footerDiv> -->
    </div>
  </div>
</template>
<script>
// navbar 导航栏
import footerDiv from "@/components/footer.vue";
import titleNavbar from "@/components/titleNavbar.vue";
import sideNavbar from "@/components/sideNavbar.vue";
import ssssss from "@/components/Ssssss.vue";

import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  data() {
    return {
      // sideNavbar 的状态
      chilrenVal: "",
      //   left 值
      leftName: 220,
      // 侧边栏的宽度
      W: "calc(100% - 220px)",
      // 传给子元素的状态值
      flag: "",
      //
      H: "",
      screenHeight: document.documentElement.clientHeight,
    };
  },
  activated() {
    this.$nextTick(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      //   this.H = document.documentElement.clientHeight;
    });
  },
  created() {
    this.$nextTick(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      //   this.H = document.documentElement.clientHeight;
    });
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.documentElement.clientHeight;
        that.screenHeight = window.screenHeight;
      })();
    };
  },
  components: {
    titleNavbar,
    sideNavbar,
    footerDiv,
    ssssss,
  },
  computed: {
    ...homeState(["WstateStatus", "InfoData"]),
  },
  methods: {
    // 子组件向父组件 传过来的状态值
    getWstate(v) {
      this.chilrenVal = v;
    },
    // 监听 侧边栏的状态
    Wchange() {
      //   传给子元素的值
      this.flag = this.chilrenVal;
      if (this.chilrenVal) {
        this.leftName = 220;
        this.W = "calc(100% - 220px)";
        this.setWstateStatus(true);
      } else {
        this.leftName = 50;
        this.W = "calc(100% - 50px)";
        this.setWstateStatus(false);
      }
    },
    ...homeActions(["setWstateStatus"]),
  },
  watch: {
    chilrenVal: "Wchange",
    screenHeight(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function () {
          that.timer = false;
        }, 400);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.product {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  .content-bottom {
    height: 100%;
  }
}
</style>