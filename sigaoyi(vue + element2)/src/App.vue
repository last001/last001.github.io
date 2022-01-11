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
    this.setShopData(
      JSON.parse(sessionStorage.getItem("state")).homeStore.shopData
    );
    this.copyPagingList(
      JSON.parse(sessionStorage.getItem("state")).homeStore.pagingList
    );
    this.setCAPTCHA(
      JSON.parse(sessionStorage.getItem("state")).homeStore.CAPTCHA
    );
    sessionStorage.removeItem("state");
  },
  computed: {
    ...homeState([
      "InfoData",
      "companyData",
      "shopData",
      "EscCode",
      "release",
      "CAPTCHA",
    ]),
  },
  methods: {
    ...homeActions([
      "setInfoData",
      "setCompanData",
      "setShopData",
      "setRelease",
      "copyPagingList",
      "setCAPTCHA",
    ]),
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

.el-select {
  .el-input.is-focus .el-input__inner {
    border-color: #bb2136 !important;
  }

  .el-input__inner:focus {
    border-color: #bb2136 !important;
  }
}

.el-scrollbar {
  .el-select-dropdown__item.selected {
    color: #bb2136 !important;
  }
}

.el-checkbox {
  .el-checkbox__input {
    .el-checkbox__inner:hover {
      border-color: #9e2536 !important;
    }
  }
  .is-focus {
    .el-checkbox__inner {
      border-color: #9e2536 !important;
    }
  }
  .is-checked {
    .el-checkbox__inner {
      border-color: #9e2536 !important;
      background-color: #9e2536 !important;
    }
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #9e2536 !important;
  }
}

.el-radio-group {
  .el-radio {
    &.is-checked {
      .el-radio__label {
        color: #9e2536;
      }
    }
    .el-radio__input {
      &.is-checked {
        .el-radio__inner {
          border-color: #9e2536;
          background: #9e2536;
        }
      }
      .el-radio__inner {
        &:hover {
          border-color: #9e2536;
        }
      }
    }
  }
}

.el-date-editor {
  input {
    &:focus {
      border: 1px solid #bb2136;
    }
  }
}

.el-picker-panel__body-wrapper {
  .el-picker-panel__body {
    .el-date-picker__header {
      button,
      span {
        &:hover {
          color: #bb2136;
        }
      }
    }
    .el-picker-panel__content {
      tr {
        td {
          &.today {
            div {
              span {
                color: #bb2136;
              }
            }
          }
          &.current {
            div {
              span {
                background: #9e253645;
              }
            }
          }
          &:hover {
            color: #bb2136;
          }
        }
      }
    }
  }
}

.el-date-range-picker {
  .el-picker-panel__sidebar {
    button {
      &:hover {
        color: #bb2136;
      }
    }
  }

  .el-picker-panel__body {
    .el-date-range-picker__header {
      button {
        &:hover {
          color: #bb2136;
        }
      }
    }

    tr {
      td {
        &.in-range {
          div {
            background-color: #d8a1a81a;
          }
        }

        &.start-date,
        &.end-date {
          span {
            color: #bb2136;
            background-color: #bb213640;
          }
        }
      }
    }
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

.el-table__header-wrapper {
  .el-checkbox {
    .el-checkbox__input.is-indeterminate {
      .el-checkbox__inner {
        background-color: #bb2136 !important;
        border-color: #bb2136 !important;
      }
    }
  }
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
