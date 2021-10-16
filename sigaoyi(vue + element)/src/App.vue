<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- <div class="master" @click="toLink">tolink</div> -->
  </div>
</template>

<script>
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  beforeCreate() {},
  data() {
    return {};
  },
  created() {
    window.addEventListener("unload", this.saveState);
    // 刷新重新拿到个人信息

    if (JSON.parse(sessionStorage.getItem("state")) == null) {
      return;
    }
    this.setInfoData(
      JSON.parse(sessionStorage.getItem("state")).homeStore.InfoData
    );
    this.setCompanData(
      JSON.parse(sessionStorage.getItem("state")).homeStore.companyData
    );
    sessionStorage.removeItem("state");
  },
  computed: {
    ...homeState(["InfoData", "companyData", "EscCode", "release"]),
  },
  methods: {
    ...homeActions(["setInfoData", , "setCompanData", "setRelease"]),
    saveState() {
      sessionStorage.setItem("state", JSON.stringify(this.$store.state));
    },
    toLink() {
      let routeData = this.$router.resolve({
        path: "/Imclient",
      });
      window.open(routeData.href, "_blank");
    },
  },
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #444;
  background: #f0f2f5;
  font-size: 16px;
  //   background: linear-gradient(to bottom, #e4e6eb 0%,#f5f5f5 100%);
  //   cursor: wait !important;
}
/* 解决top提示偏移的问题 */
/* body{padding-right:0px!important} */
.el-popup-parent--hidden {
  overflow: initial !important;
  padding: 0 !important;
}
body {
  margin: 0;
  padding: 0;
  background-color: #fff;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix:after {
  display: block;
  content: "";
  clear: both;
}
.el-icon-loading {
  font-size: 40px !important;
}
.el-loading-text {
  font-size: 14px !important;
}

.el-table {
  font-size: 15px !important;
}
input {
  &:focus {
    outline-offset: 0px !important;
    outline: none;
    // outline: #409eff auto 1px !important;
  }
}
.el-message {
  justify-content: center !important;
  .el-message__icon {
    margin-left: -10px !important;
  }
}

.master {
  position: fixed;
  right: 30px;
  bottom: 20px;
  background: #40a0ffa9;
  color: #fff;
  padding: 4px 8px;
  cursor: pointer;
  -webkit-user-select: none;
}

.el-table__empty-text {
  padding: 25px 0 !important;
  color: #d3d3d3ed !important;
  line-height: normal !important;
  .iconfont {
    font-size: 50px;
    margin-left: -1px;
  }
}

.content-bottom {
  display: flex;
}

.dandruff {
  padding: 15px 0;
  .el-breadcrumb {
    font-size: 15px;
  }
}
</style>
