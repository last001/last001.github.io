<template>
  <div class="videoTeaching">
    <div class="title" v-if="sreachAvtive">
      <van-nav-bar
        title="视频教学"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
        <!-- <template #right>
          <van-icon name="search" size="18" />
        </template> -->
      </van-nav-bar>
    </div>
    <div class="sreach" v-else>
      <form action="/">
        <van-search
          v-model="sreachVal"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
    </div>
    <div class="targe">
      <van-tree-select
        :height="H + 'px'"
        :items="itemList"
        :main-active-index.sync="active"
      >
        <template #content>
          <div
            class="list"
            v-for="(item, index) in itemList[active].children"
            :key="index"
            @click="autoPlay(item, index)"
          >
            <div class="video">
              <video :src="videoSrc"></video>
            </div>
            <div class="text">
              <div class="title">
                {{ item.text }}
              </div>
              <div class="details clearfix">
                <div class="duration fl">{{ item.duration }}</div>
                <div class="timer fr">{{ item.time }}</div>
              </div>
            </div>
          </div>
        </template>
      </van-tree-select>
    </div>
    <div class="autoPlayVideo">
      <van-popup v-model="videoStatus" @close="closeMask()">
        <video src="" preload controls="controls" ref="videoDom"></video>
      </van-popup>
    </div>
  </div>
</template>

<script>
import "../assets/less/videoTeaching/videoTeaching.css";
export default {
  data() {
    return {
      // 搜索内容
      sreachVal: "",
      // sreach的显示或者隐藏
      sreachAvtive: true,
      H: "",
      // 分类默认值
      active: 0,
      //   分类循坏数组
      itemList: [
        {
          text: "趣天教学视频",
          children: [
            {
              text: "变体修改",
              id: "1",
              duration: "",
              time: "",
              src:
                "http://www.ec-sigaoyi.com/wenjian/videotutorial/趣天/变体修改.mp4",
            },
            {
              text: "标题价格详情修改",
              id: "2",
              duration: "",
              time: "",
              src:
                "http://www.ec-sigaoyi.com/wenjian/videotutorial/趣天/标题价格详情修改.mp4",
            },
            {
              text: "订单处理",
              id: "3",
              duration: "",
              time: "",
              src:
                "http://www.ec-sigaoyi.com/wenjian/videotutorial/趣天/订单处理.mp4",
            },
            {
              text: "抓取及上架流程",
              id: "4",
              duration: "",
              time: "",
              src:
                "http://www.ec-sigaoyi.com/wenjian/videotutorial/趣天/抓取及上架流程.mp4",
            },
            {
              text: "趣天变体修改",
              id: "5",
              duration: "",
              time: "",
              src:
                "http://www.ec-sigaoyi.com/wenjian/videotutorial/趣天/趣天变体修改.mp4",
            },
            {
              text: "上架与采集上架",
              id: "6",
              duration: "",
              time: "",
              src:
                "http://www.ec-sigaoyi.com/wenjian/videotutorial/趣天/上架与采集上架.mp4",
            },
            {
              text: "趣天订单处理",
              id: "7",
              duration: "",
              time: "",
              src:
                "http://www.ec-sigaoyi.com/wenjian/videotutorial/趣天/趣天订单处理.mp4",
            },
          ],
        },
        {
          text: "系统操作视频",
          children: [
            {
              text: "系统视频1",
              id: "1",
              duration: "02:15",
              time: "2020-01-18",
              src: "",
            },
          ],
        },
      ],
      //   弹出视频层状态值
      videoStatus: false,
      videoSrc:
        "http://www.ec-sigaoyi.com/wenjian/videotutorial/趣天/变体修改.mp4",
    };
  },
  created() {
    this.$nextTick(() => {
      // 获取 屏幕高度 渲染背景色
      this.H = document.documentElement.clientHeight - 47;
      console.log("this.itemList ==>", this.itemList);
    });
  },
  methods: {
    //   返回
    onClickLeft() {
        this.$router.back();
    },
    // 显示搜索
    onClickRight() {
      this.sreachAvtive = false;
    },
    // 隐藏搜索
    onCancel() {
      this.sreachAvtive = true;
    },
    // 搜索内容
    onSearch() {
      console.log("this.sreachVal ==>", this.sreachVal);
    },
    // 播放视频
    autoPlay(item, index) {
      this.videoStatus = true;
      this.videoSrc = item.src;
      this.$nextTick(() => {
        this.$refs.videoDom.play();
      });
    },
    // 关闭弹出层
    closeMask() {
      this.videoStatus = false;
      this.$nextTick(() => {
        // console.log("this.$refs.videoDom ==>", this.$refs.videoDom);
        this.$refs.videoDom.pause();
      });
    },
  },
};
</script>
<style lang="">