<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- 放大图片 -->
    <van-image-preview
      @close="Close()"
      v-model="largeImgStatus"
      :images="imgList"
      className="previewImage"
    >
      <template v-slot:cover
        ><span @click="saveImage()">保存图片</span></template
      >
    </van-image-preview>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      largeImgStatus: false,
      imgList: [],
    };
  },
  mounted() {},
  created() {
    window.addEventListener("unload", this.saveState);
    if (JSON.parse(sessionStorage.getItem("state")) == null) {
      return;
    }
    this.$store.commit('setShopList',JSON.parse(sessionStorage.getItem("state")).shopList);
    sessionStorage.removeItem("state");
    if (window.plus) {
      this.plusReady();
    } else {
      document.addEventListener("plusready", this.plusReady, false);
    }
  },
  computed: {
    lisentLager() {
      return this.$store.state.largeImgStatus;
    },
  },
  methods: {
    saveState() {
      sessionStorage.setItem("state", JSON.stringify(this.$store.state));
    },
    Close() {
      this.largeImgStatus = false;
      this.imgList = [];
      this.$store.state.largeImgStatus = false;
      this.$store.state.imgList = [];
    },
    plusReady() {
      //监听系统通知栏消息点击事件
      plus.push.addEventListener(
        "click",
        function (msg) {
          //处理点击消息的业务逻辑代码
          console.log("msg.payload ==>", msg.payload);
        },
        false
      );
      //监听接收透传消息事件
      plus.push.addEventListener(
        "receive",
        function (msg) {
          //处理透传消息的业务逻辑代码
          console.log("receive ==>", JSON.stringify(msg));
        },
        false
      );
    },
    // 保存图片
    saveImage() {
      let _this = this;
      if (!window.plus) return console.log("不是app!!!");
      plus.gallery.save(
        _this.imgList[0],
        function () {
          _this.$toast("保存相册成功!"); //_this.user_qrcode 是服务器链接，必须是图片格式
        },
        function () {
          _this.$toast("保存失败，请重试!");
        }
      );
    },
  },
  watch: {
    lisentLager() {
      if (this.$store.state.largeImgStatus) {
        this.largeImgStatus = this.$store.state.largeImgStatus;
        this.imgList = this.$store.state.imgList;
      }
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #3f3f6d;
  //   margin-top: 20px;
  font-size: 12px;
  background: #f9f9f9;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.previewImage {
  .van-image-preview__cover {
    color: #fff;
    top: 88%;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 14px;
    padding: 8px 16px;
    background-color: #656565;
    border-radius: 20px;
  }
}
</style>
