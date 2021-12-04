<template>
  <div class="purchase" :style="{ minHeight: screenHeight + 'px' }">
    <!-- <div class="main" v-title data-title="产品订单"></div> -->
    <sideNavbar1 ref="sideNavbar1" @Wstate="getWstate"></sideNavbar1>
    <div
      class="box"
      :wastate="flag"
      :style="{
        width: W,
        marginLeft: leftName + 'px',
      }"
    >
      <!-- <sideNavbar ref="sidePage" @Wstate="getWstate"></sideNavbar> -->
      <titleNavbar
        ref="titlePage"
        :wastate="flag"
        :style="{
          width: W,
          marginLeft: leftName + 'px',
        }"
      ></titleNavbar>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
      <footerDiv
        :style="{
          width: W,
          marginLeft: leftName + 'px',
        }"
      ></footerDiv>
    </div>
  </div>
</template>
<script>
// import footerDiv from "@/components/footer.vue";
import titleNavbar from "@/components/titleNavbar.vue";
import sideNavbar from "@/components/sideNavbar.vue";
import sideNavbar1 from "@/components/sideNavbar1.vue";
import footerDiv from "@/components/footer.vue";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  props: ["wastate"],
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
  components: {
    footerDiv,
    titleNavbar,
    sideNavbar,
    sideNavbar1,
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
.purchase {
  width: 100%;
  position: relative;
  overflow-x: hidden;
  // padding-bottom: 51px;
  .box {
    width: 100%;
    .left {
      margin-top: 0;
    }
  }
}
</style>