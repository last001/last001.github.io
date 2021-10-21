<template>
  <div class="noticeDetail" :style="{ minHeight: H + 'px' }">
    <div class="title">
      <van-nav-bar
        title="消息详情"
        left-text="返回"
        left-arrow
        fixed
        @click-left="onClickLeft"
      />
    </div>
    <div class="information">
      <div class="greet">尊敬的用户，您好</div>
      <div class="text">
        <textarea
          cols="30"
          rows="30"
          disabled
          v-model="item.content"
        ></textarea>
      </div>
      <!-- <div class="end">特此通知！</div>
        <div class="userName">发布人：{{item.releaseUser}}</div>
        <div class="time">{{item.releaseTime}}</div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infoData:{},
      H: "",
      // 传过来的对象
      item: {},
    };
  },
  created() {
    this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
    this.H = document.documentElement.clientHeight - 46;
    this.item = JSON.parse(this.$route.query.item);
    this.textVal = this.item.content;
    console.log("this.item ==>", this.item);
    this.read();
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    // 已阅读公告
    read() {
      this.$axios({
        url: "/sigaoyi/NEWhaveread",
        method: "POST",
        params: {
          id: this.item.id,
          userName: this.infoData.userName,
        },
      })
        .then((result) => {
          
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="less" scoped>
.noticeDetail {
  font-size: 14px;
  position: relative;
  padding-top: 46px;
  .information {
    padding: 10px 5px;
    .text {
      padding: 10px 10px;
      min-height: 500px;
      textarea {
        width: 100%;
        height: 10%;
        border: none;
        outline: none;
        background: #f9f9f9;
        resize: none;
      }
    }
    // .time{
    //     text-align: right;
    //     margin-top: 5px;
    // }
    // .userName, .end{
    //     text-align: right;
    //     padding-right: 20px;
    // }
  }
}
</style>
