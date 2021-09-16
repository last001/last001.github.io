<template>
  <div class="shop">
    <titleNavbar></titleNavbar>
    <div class="content-bottom">
        <sideNavbar ref="abcd" @Wstate="getWstate"></sideNavbar>
        <router-view :style="{minHeight:screenHeight + 'px',width:W, marginLeft: leftName + 'px' }" />
    </div>
  </div>
</template>

<script>
// navbar 导航栏
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
      W:"calc(100% - 220px)",
      // sideNavbar 的状态
      chilrenVal: "",
      //   left 值
      leftName: 220,
      //screenHeight
      screenHeight:document.documentElement.clientHeight,   
    };
  },
  created() {
  },
  mounted () {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.documentElement.clientHeight;
        that.screenHeight = window.screenHeight;
      })();
    };  
  },
  computed: {
    ...homeState(["WstateStatus", "InfoData"]),
  },
  components: {
    titleNavbar,
    sideNavbar,
  },
  methods: {
      // 子组件像父组件 传过来的状态值
    getWstate(v) {
      this.chilrenVal = v;
    },
    //
    Wchange() {
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
    ...homeActions(["setWstateStatus", "setInfoData"]),
  },
   watch: {
    chilrenVal: "Wchange",
    screenHeight(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function () {
          console.log("that.screenHeight ==>", that.screenHeight);
          that.timer = false;
        }, 400);
      }
    },
  },
};
</script>

<style>
</style>