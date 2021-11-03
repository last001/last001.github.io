<template>
  <div class="checkUpdate">
    <div class="title">
      <van-nav-bar
        left-arrow
        left-text="返回"
        @click-left="onClickLeft"
      ></van-nav-bar>
    </div>
    <div class="details">
      <div class="logo">
        <img src="../../../assets/img/sigaoyi1.png" alt="" />
      </div>
      <div class="edition">版本号:{{version}}</div>
      <div class="btn">
        <van-button round type="info" size="small" @click="autoUpdate()"
          >检查更新</van-button
        >
      </div>
      <div class="time">
        <!-- <div>客服热线</div>
        <div class="active">10086</div> -->
        <div class="work">工作时间</div>
        <div class="active">周一至周六 09:00~18:00</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      version: "1.6",
    };
  },
  created() {
    function plusReady1() {
      // 获取本地应用资源版本号
      plus.runtime.getProperty(plus.runtime.appid, (inf) => {
        this.version = inf.version;
      });
    }
    if (window.plus) {
      plusReady1();
    } else {
      document.addEventListener("plusready",plusReady1,false);
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    // 自动更新
    autoUpdate() {
      console.log("window.plus ==>", window.plus);
      if (window.plus) {
        this.plusReady();
      } else {
        document.addEventListener("plusready", this.plusReady, false);
      }
    },
    // 获取版本号
    plusReady() {
      // 获取本地应用资源版本号
      plus.runtime.getProperty(plus.runtime.appid, (inf) => {
        this.checkVersion(inf.version);
      });
    },
    // 检查更新
    checkVersion(nativeVersion) {
      let that = this;
      that
        .$axios({
          url: "/sigaoyi/CheckFoUpdates",
          method: "GET",
          params: {
            versionNumber: nativeVersion,
          },
        })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            that.$dialog
              .confirm({
                title: "提示",
                message: `检查到更新版本 v${result.data.versionNum}`,
                confirmButtonColor: "#409eff",
                confirmButtonText: "立即更新",
              })
              .then(() => {
                that.downloadWgt(result.data.url);
              })
              .catch(() => {
                // on cancel
              });
          } else {
            that.$dialog({
              message: "已经是最新版本了！",
              confirmButtonColor: "#409eff",
            });
          }
        })
        .catch((err) => {
          that.$dialog({ message: "发生不可预期的错误" });
          console.log("err ==>", err);
        });
    },
    // 下载wgt包
    downloadWgt(wgtUrl) {
      plus.nativeUI.showWaiting("下载更新文件中...");
      plus.downloader
        .createDownload(wgtUrl, { filename: "_doc/update/" }, (d, status) => {
          if (status === 200) {
            this.installWgt(d.filename); // 安装wgt包
          } else {
            plus.nativeUI.alert("下载更新文件失败！");
          }
          plus.nativeUI.closeWaiting();
        })
        .start();
    },
    // 安装wgt包
    installWgt(path) {
      plus.nativeUI.showWaiting("安装更新文件...");
      plus.runtime.install(
        path,
        { force: true },
        function () {
          plus.nativeUI.closeWaiting();
          plus.nativeUI.alert("应用资源更新完成！", function () {
            plus.runtime.restart();
          });
        },
        function (e) {
          plus.nativeUI.closeWaiting();
          plus.nativeUI.alert("安装更新文件失败[" + e.code + "]：" + e.message);
        }
      );
    },
  },
};
</script>

<style lang="less">
.checkUpdate {
  background-color: #fff;
  font-size: 13px;
  .title {
    .van-hairline--bottom::after {
      border-bottom-width: 0;
    }
  }
  .details {
    margin-top: 50px;
    .logo {
      margin: 0 auto;
      width: 150px;
      height: 150px;
      // border: 1px solid #dddddd;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .edition,
    .btn,
    .time {
      width: 100%;
      text-align: center;
      margin-top: 20px;
    }
    .btn {
      button {
        padding: 0 12px;
      }
    }
    .edition {
      margin-top: 10px;
    }
    .time {
      margin-top: 50px;
      color: #444;
      .work {
        margin-top: 20px;
      }
      .active {
        margin-top: 5px;
        color: #999;
      }
    }
  }
}
</style>