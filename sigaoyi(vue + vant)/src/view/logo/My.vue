<template>
  <div class="my">
      <!-- :style="{background: 'url(' + defaulBgSrc + ')',}" -->
    <div class="v-my" :style="{ height: H + 'px' }">
      <!-- 头像 + 个签 -->
      <div class="bg">
        <div class="header">
          <img src="../../assets/img/head.jpg" alt="" />
        </div>
        <div class="detection" v-if="showInfo">
          <div class="userName">{{ infoData.userName }}</div>
          <!-- <div class="remask">
            <span>这家伙很懒，什么也没有写！</span>
            <van-icon name="edit" @click="gotoPersonalInfo()" />
          </div> -->
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
      <!-- <div class="more">
        <van-icon name="setting" size="22" color="#439eff" />
        <div>更多</div>
        <van-icon name="arrow" color="#999" class="fr arrow" />
      </div> -->
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
      // 待付款 待发货 待收货
      awaitList: [
        { name: "待付款", iconSrc: "pending-payment" },
        { name: "待发货", iconSrc: "debit-pay" },
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
        // {
        //   name: "收货地址",
        //   iconSrc: "logistics",
        //   color: "#e06a6b",
        //   linkText: "Adress",
        //   dotStatus: false,
        // },
        {
          name: "检查更新",
          iconSrc: "warn-o",
          color: "#cd70fb",
          linkText: "CheckUpdate",
          dotStatus: false,
        },
        // {
        //   name: "用户反馈",
        //   iconSrc: "chat-o",
        //   color: "#e06a6b",
        //   linkText: "Feedback",
        //   dotStatus: false,
        // },
        {
          name: "公告",
          iconSrc: "volume-o",
          color: "#cd70fb",
          linkText: "Notice",
          dotStatus: false,
        },
        //  {
        //   name: "测试",
        //   iconSrc: "volume-o",
        //   color: "#cd70fb",
        //   linkText: "Qecode",
        //   dotStatus: false,
        // },
      ],
      // 是否存在公告
      isNotice: false,
      isCheck: false,
    };
  },
  created() {
    // function plusReady() {
    //   if (plus.navigator.isImmersedStatusbar()) {
    //     this.statusH = plus.navigator.getStatusbarHeight();
    //     console.log("this.statusH ==>", this.statusH);
    //   }
    // }
    // if (window.plus) {
    //   plusReady();
    // } else {
    //   document.addEventListener("plusready", plusReady, false);
    // }

    this.$nextTick(() => {
      this.H = document.documentElement.clientHeight - 60;
      this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
      if (this.infoData == null || this.infoData == undefined) {
        this.showInfo = false;
      } else {
        this.showInfo = true;
        //  获取公告状态
        this.getNoticeState();
        this.autoUpdate();
      }
    });
  },
  computed: {
    isDotMap(value) {
      return this.isNotice || this.isCheck;
    },
  },
  methods: {
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
    // 点击跳转链接
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
      console.log("获取公告!!!");
      this.$axios({
        url: "/sigaoyi/NEWGetAnnounceInfo",
        method: "POST",
        params: {
          userName: this.infoData.userName,
          port: "app",
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
              this.isNotice = true;
            } else {
              this.accountList.forEach((e) => {
                if (e.name == "公告") {
                  e.dotStatus = false;
                }
              });
              this.isNotice = false;
            }
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
          //   this.$dialog({ message: "系统服务繁忙,请稍后再试!" });
        });
    },
    // 自动更新
    autoUpdate() {
    //   console.log("window.plus ==>", window.plus);
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
            this.accountList.forEach((e) => {
              if (e.name == "检查更新") {
                e.dotStatus = true;
              }
            });
            this.isCheck = true;
          } else {
            this.accountList.forEach((e) => {
              if (e.name == "检查更新") {
                e.dotStatus = false;
              }
            });
            this.isCheck = false;
          }
        })
        .catch((err) => {
          that.$dialog({ message: "发生不可预期的错误" });
          console.log("err ==>", err);
        });
    },
  },
  watch: {
    isDotMap(value) {
      if (value) {
        this.$store.state.isDot = true;
      } else {
        this.$store.state.isDot = false;
      }
    },
  },
};
</script>

<style lang="less" scope>
</style>