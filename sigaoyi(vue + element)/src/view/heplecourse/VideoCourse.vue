<template>
  <div class="videoCourse">
    <div class="main" v-title data-title="视频教程"></div>
    <div class="box">
      <div class="videoCouseInfo">
        <div class="videoList">
          <video :src="src" controls preload></video>
        </div>
      </div>
    </div>
    <!-- <footerDiv></footerDiv> -->
  </div>
</template>
<script>
// navbar 导航栏
// import footerDiv from "@/components/footer.vue";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");

import "../../assets/less/videoCourse/videoCourse.css";
export default {
  data() {
    return {
      src: "http://www.ec-sigaoyi.com/wenjian/videotutorial/趣天/变体修改.mp4",
    };
  },
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    next();
  },
  created() {},
  components: {
    // footerDiv,
  },
  computed: {
    ...homeState(["WstateStatus", "videoSrc"]),
  },
  methods: {
    getSrc() {
      this.src = this.videoSrc;
    },
    ...homeActions(["setWstateStatus", "setVideoSrc"]),
  },
  watch: {
    videoSrc: "getSrc",
  },
};
</script>