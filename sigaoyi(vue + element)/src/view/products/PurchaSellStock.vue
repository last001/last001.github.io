<template>
  <div class="purchaSellStock">
    <div class="box">
      <div ref="purchaSellStockInfo" class="purchaSellStockInfo">
        <!-- 子路由 -->
        <div class="moreDiv">
          <div class="content" :style="{ minHeight: screenHeight + 'px' }">
            <titleNavbar ref="titlePage"></titleNavbar>
            <sideNavbar ref="sidePage" @Wstate="getWstate"></sideNavbar>
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
            <footerDiv
              :style="{
                width: W,
                marginLeft: leftName + 'px',
              }"
            ></footerDiv>
          </div>
        </div>
      </div>
      <!-- <footerDiv></footerDiv> -->
    </div>
  </div>
</template>
<script>
import "../../assets/less/purchaSellStock/purchaSellStock.css";
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
      screenHeight: document.documentElement.clientHeight - 48,
    };
  },
  components: {
    titleNavbar,
    sideNavbar,
    footerDiv,
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
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    next();
  },
  created() {
    this.minheight = document.documentElement.clientHeight;
  },
  computed: {
    ...homeState(["WstateStatus", "timerNum"]),
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
    ...homeActions(["setWstateStatus", "getTimerNum"]),
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