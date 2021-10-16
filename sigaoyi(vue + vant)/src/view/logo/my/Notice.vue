<template>
  <div class="notice" :style="{ minHeight: H + 'px' }">
    <div class="title">
      <van-nav-bar
        title="消息中心"
        left-text="返回"
        left-arrow
        fixed
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #right>
          <van-button type="info" size="mini">{{ rightText }}</van-button>
        </template>
      </van-nav-bar>
    </div>
    <div class="header">
      <van-tabs v-model="active">
        <van-tab title="系统消息" :dot="systemDot">
          <div class="systemList" v-if="sysytemState">
            <div class="time">2020-06-30 15:15:59</div>
            <div class="content">
              <div class="v-content-title clearfix">
                <div class="fl big-dot"></div>
                您有个订单没处理
              </div>
              <div class="v-content">
                尊敬的用户，您有个订单异常，请尽快处理！过期不候。
              </div>
            </div>
          </div>
          <div v-else>暂无公告消息</div>
        </van-tab>
        <van-tab title="公告消息" :dot="noticeDot">
          <div class="noticeList" v-if="noticeState">
            <div class="time">{{noticeList.releaseTime}}</div>
            <div class="content">
              <div class="v-content-title clearfix">
                <div class="fl big-dot"></div>
                {{ noticeList.title }}
              </div>
              <div class="greet">尊敬的用户，您好！</div>
              <div class="notice-content">
                {{ noticeList.content }}
              </div>
              <div class="detail" @click="noticeDetail">查看详情>></div>
            </div>
          </div>
          <div v-else>暂无公告消息</div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import "../../../assets/less/notice/notice.css";
export default {
  data() {
    return {
      // 屏幕最低高度
      H: "",
      // 初始显示值
      active: 1,
      //  系统消息 是否显示
      sysytemState: true,
      //  系统 红点状态
      systemDot: false,
      //  公告消息 是否显示
      noticeState: false,
      //  公告 红点状态
      noticeDot: false,
      // 标题右上角 文字
      rightText: "",
      // 个人信息
      infoData: {},
      // 公告 list
      noticeList: {},
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log("from.path ==>", from.path);
    if (from.path == "/noticeDetail") {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }
    next();
  },
  activated() {
    if (!this.$route.meta.isBack) {
      this.H = document.documentElement.clientHeight - 46;
      this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
      if (this.infoData.statu == "0") {
        this.rightText = "发布公告";
      } else {
        this.rightText = "一键全读";
      }
      this.getNoticeState();
    } else {
        console.log("不重新获取数据!!!");
        this.$route.meta.isBack = false;

        // 返回 无红点(返回全部 公告对象   [待做])
    }
  },
  created() {
    // function plusReady() {
    //   var type = plus.os.name;
    //   if (type == "iOS") {
    //     plus.navigator.setStatusBarBackground("#409eff");
    //     plus.navigator.setStatusBarStyle("light");
    //   } else {
    //     plus.navigator.setStatusBarBackground("#409eff");
    //     plus.navigator.setStatusBarStyle("light");
    //   }
    // }
    // console.log("window.plus ==>", window.plus);
    // if (window.plus) {
    //   plusReady();
    // } else {
    //   document.addEventListener("plusready", plusReady, false);
    // }
  },
  mounted() {},
  methods: {
    // 返回
    onClickLeft() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "600",
      });
      setTimeout(() => {
        this.$router.back();
      }, 600);
    },
    // 一键全读(待做) + 发布公告
    onClickRight() {
      if (this.rightText == "一键全读") {
        console.log("一键全读 ==>", "一键全读");
      } else {
        this.$router.push({ name: "PublishNotice" });
      }
    },
    // 查看详情
    noticeDetail() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "600",
      });
      setTimeout(() => {
        this.$router.push({ name: "NoticeDetail",query:{item:JSON.stringify(this.noticeList)} });
      }, 600);
    },
    // 获取公告状态
    getNoticeState() {
      if (this.infoData == undefined || this.infoData == null) {
        return;
      }
      this.$axios({
        url: "/sigaoyi/NEWGetAnnounceInfo",
        method: "POST",
        params: {
          userName: this.infoData.userName,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.code == "200") {
            if (result.data.announcementsize > 0) {
              this.noticeState = true;
              this.noticeDot = true;
              // 渲染
              this.noticeList = result.data.announcement;
            } else {
              this.noticeState = false;
              this.noticeDot = false;
            }
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
          //   this.$dialog({ message: "系统服务繁忙,请稍后再试!" });
        });
    },
  },
};
</script>
<style lang="less">
</style>