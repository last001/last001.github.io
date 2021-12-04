<template>
  <div class="videoCourse">
    <div class="main" v-title data-title="视频教程"></div>
    <div class="box">
      <div class="videoCouseInfo">
        <div class="tabs">
          <div class="tabs_title">视频分类：</div>
          <div
            class="tabs_list"
            v-for="(item, index) in videoList"
            :key="index"
            :class="item.isActive ? 'active' : ''"
            @click="selectList(item)"
          >
            <span>{{ item.name }}</span>
          </div>
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
      videoList: [
        { name: "全部", isActive: true },
        { name: "趣天视频", isActive: false },
        { name: "系统视频", isActive: false },
      ],
    };
  },
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    next();
  },
  created() {
    this.$nextTick(() => {
      this.$parent.$refs.sideNavbar1.testRouter();
    });
  },
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
    selectList(item) {
      this.videoList.forEach((e) => {
        e.isActive = false;
      });
      item.isActive = true;
    },
    ...homeActions(["setWstateStatus", "setVideoSrc"]),
  },
  watch: {
    videoSrc: "getSrc",
  },
};
</script>
<style lang="less" scoped>
.videoCourse {
  .box {
    padding: 20px;
    .videoCouseInfo {
      width: calc(100% - 30px);
      border-radius: 4px;
      background: #fff;
      padding: 15px;
      .tabs {
        display: flex;
        width: 100%;
        .tabs_list {
          margin-right: 20px;
          cursor: pointer;
          &.active {
            color: #bb2136;
          }
        }
      }
    }
  }
}
</style>