<template>
  <div
    class="my"
    :style="{
      background: 'url(' + defaulBgSrc + ')',
      paddingTop: statusH + 'px',
    }"
  >
    <div class="v-my" :style="{ height: H + 'px' }">
      <!-- 头像 + 个签 -->
      <div class="bg">
        <div class="header" @click="gotoPersonalInfo()">
          <img src="../../assets/img/head.jpg" alt="" />
        </div>
        <div class="detection" v-if="showInfo">
          <div class="userName">{{ infoData.actualName }}</div>
          <div class="remask">
            <span>这家伙很懒，什么也没有写！</span
            ><van-icon name="edit" @click="gotoPersonalInfo()" />
          </div>
          <div class="text">
            <input
              type="file"
              accept="image/*"
              ref="bgImgInput"
              @change="cutbgImage($event)"
            />
            更换背景
          </div>
        </div>
        <div class="gotoLogin" v-else>
          <van-button round type="info" @click="gotoLogin">去登录</van-button>
        </div>
      </div>
      <!-- 订单状态... -->
      <div class="allOrder clearfix">
        <div class="fl">
          <van-icon name="label" size="20px" color="#409eff" />
          <span>全部订单</span>
        </div>
        <div class="fr">查看所有订单<van-icon name="arrow" /></div>
      </div>
      <div class="await">
        <div class="await-list" v-for="(item, index) in awaitList" :key="index">
          <van-icon :name="item.iconSrc" size="26" color="#999" />
          <div>{{ item.name }}</div>
        </div>
      </div>
      <!-- 功能列表 -->
      <div class="accountLit">
        <div
          class="v-accountList"
          v-for="(item, index) in accountList"
          :key="index"
          @click="linkPage(item)"
        >
          <van-icon :name="item.iconSrc" size="22" :color="item.color" />
          <div>
            <span
              >{{ item.name }}<span class="dot" v-show="item.dotStatus"></span
            ></span>
          </div>
          <van-icon name="arrow" color="#999" class="fr arrow" />
        </div>
      </div>
      <!-- 更多 -->
      <div class="more">
        <van-icon name="setting" size="22" color="#439eff" />
        <div>更多</div>
        <van-icon name="arrow" color="#999" class="fr arrow" />
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/less/my/my.css";
import uploadFiles from "../../assets/js/uploadFile";
export default {
  data() {
    return {
      // 屏幕高度
      H: "",
      // 个人信息
      infoData: {},
      // 是否登录状态
      showInfo: true,
      // 默认背景图片
      defaulBgSrc: require("../../assets/img/th.jpg"),
      // 代付款 代发货 待收货
      awaitList: [
        { name: "代付款", iconSrc: "pending-payment" },
        { name: "代发货", iconSrc: "debit-pay" },
        { name: "待收货", iconSrc: "paid" },
      ],
      // 功能列表
      accountList: [
        {
          name: "账户余额",
          iconSrc: "balance-o",
          color: "#e06a6b",
          linkText: "Balance",
          dotStatus: false,
        },
        {
          name: "充值提现",
          iconSrc: "balance-list-o",
          color: "#cd70fb",
          linkText: "RechargeWithdraw",
          dotStatus: false,
        },
        {
          name: "个人资料",
          iconSrc: "user-circle-o",
          color: "#e06a6b",
          linkText: "PersonalInfo",
          dotStatus: false,
        },
        {
          name: "账户安全",
          iconSrc: "warning-o",
          color: "#cd70fb",
          linkText: "Account",
          dotStatus: false,
        },
        {
          name: "收货地址",
          iconSrc: "logistics",
          color: "#e06a6b",
          linkText: "Adress",
          dotStatus: false,
        },
        {
          name: "检查更新",
          iconSrc: "down",
          color: "#cd70fb",
          linkText: "CheckUpdate",
          dotStatus: false,
        },
        {
          name: "用户反馈",
          iconSrc: "chat-o",
          color: "#e06a6b",
          linkText: "Feedback",
          dotStatus: false,
        },
        {
          name: "公告",
          iconSrc: "volume-o",
          color: "#cd70fb",
          linkText: "Notice",
          dotStatus: false,
        },
      ],
      //
      statusH: "",
    };
  },
  created() {
    if (window.plus) {
      this.plusReady();
    } else {
      document.addEventListener("plusready", this.plusReady, false);
    }

    this.$nextTick(() => {
      this.H = document.documentElement.clientHeight - 70;
      this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
      if (this.infoData == null || this.infoData == undefined) {
        this.showInfo = false;
      } else {
        this.showInfo = true;
      }
      //  获取公告状态
      this.getNoticeState();
    });
  },
  methods: {
    plusReady() {
      //   设置沉浸式状态栏
      if (plus.navigator.isImmersedStatusbar()) {
        this.statusH = plus.navigator.getStatusbarHeight();
      }
    },
    // 去登陆页面
    gotoLogin() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "600",
      });
      setTimeout(() => {
        this.$router.push({ name: "Login" });
      }, 600);
    },
    //   点击跳转链接
    linkPage(item) {
      console.log("this.infoData ==>", this.infoData);
      if (this.infoData == null || this.infoData == undefined) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "您还未登陆，请先去登陆！",
          })
          .then(() => {
            this.$toast.loading({
              message: "加载中...",
              forbidClick: true,
              loadingType: "spinner",
              duration: "600",
            });
            setTimeout(() => {
              this.$router.push({ name: "Login" });
            }, 600);
          })
          .catch(() => {
            //   取消
          });
        return;
      }
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "600",
      });
      setTimeout(() => {
        this.$router.push({ name: item.linkText });
      }, 600);
    },
    // 去个人信息
    gotoPersonalInfo() {
      this.$router.push({ name: "PersonalInfo" });
    },
    // 更换背景图片
    cutbgImage(e) {
      console.log(
        "this.$refs.bgImgInput.value ==>",
        this.$refs.bgImgInput.value
      );
      let files = e.target.files[0];
      console.log("files ==>", files);
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", files);
      // 发起请求
      const loading = this.$toast.loading({
        message: "上传中...",
        forbidClick: true,
        loadingType: "spinner",
      });

      this.$axios(uploadFiles.uploadFile(formData))
        .then((result) => {
          console.log("result ==>", result);
          this.$toast.clear();
          if (result.data.Code == 200) {
            this.$refs.bgImgInput.value = null;
            this.defaulBgSrc = result.data.imgsURL;
          } else {
            this.$notify({
              message: "上传失败!",
              color: "#fff",
              background: "#faab0c",
            });
            this.$refs.bgImgInput.value = null;
          }
        })
        .catch((err) => {
          this.$toast.clear();
          this.$refs.bgImgInput.value = null;
          this.$notify({
            message: "上传失败!",
            color: "#fff",
            background: "#faab0c",
          });
          console.log("err ==>", err);
        });
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
              this.accountList.forEach((e) => {
                if (e.name == "公告") {
                  e.dotStatus = true;
                }
              });
            } else {
              this.accountList.forEach((e) => {
                if (e.name == "公告") {
                  e.dotStatus = false;
                }
              });
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

<style lang="less" scope>
</style>