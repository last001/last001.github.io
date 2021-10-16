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
  created () {

  },
  computed: {
    lisentLager() {
      return this.$store.state.largeImgStatus;
    },
  },
  methods: {
    Close() {
      this.largeImgStatus = false;
      this.imgList = [];
      this.$store.state.largeImgStatus = false;
      this.$store.state.imgList = [];
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
</style>
