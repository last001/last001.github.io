<template>
  <div class="system" :style="{ minHeight: minheight + 'px' }">
    <titleNavbar ref="titlePage"></titleNavbar>
    <div class="content-bottom">
      <sideNavbar ref="abcd" @Wstate="getWstate"></sideNavbar>
      <router-view
        :wastate="flag"
        :style="{ width: W, marginLeft: leftName + 'px' }"
      />
    </div>
    <footerDiv :style="{ width: W, marginLeft: leftName + 'px' }"></footerDiv>
  </div>
</template>
<script>
// navbar 导航栏
import footerDiv from "@/components/footer.vue";
import titleNavbar from "@/components/titleNavbar.vue";
import sideNavbar from "@/components/sideNavbar.vue";

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
      W: "calc(100% - 220px)",
      flag: "",
      // minheight
      minheight: document.documentElement.clientHeight,
    };
  },
  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.minheight = document.documentElement.clientHeight;
        that.minheight = window.minheight;
      })();
    };
  },
  components: {
    titleNavbar,
    sideNavbar,
    footerDiv,
  },
  computed: {
    ...homeState(["WstateStatus", "InfoData"]),
  },
  methods: {
    // 子组件像父组件 传过来的状态值
    getWstate(v) {
      this.chilrenVal = v;
    },
    // 监听 侧边栏的状态
    Wchange() {
      this.flag = this.chilrenVal;

      if (this.chilrenVal) {
        this.leftName = 220;
        this.W = "calc(100% - 220px)";
      } else {
        this.leftName = 50;
        this.W = "calc(100% - 50px)";
      }
    },
    ...homeActions(["setWstateStatus"]),
  },
  watch: {
    chilrenVal: "Wchange",
    minheight(val) {
      if (!this.timer) {
        this.minheight = val;
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
.system {
  position: relative;
  width: 100%;
  overflow-x: hidden;
  background-color: #f0f2f5;
}
</style>