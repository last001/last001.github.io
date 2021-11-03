<template>
  <div class="withdraw" :style="{ height: H + 'px' }">
    <div class="title">
      <van-nav-bar
        title="提现"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
        <template #right>
          <span>上传图片</span>
          <input @change="updata($event)" type="file" ref="uploadImg" />
        </template>
      </van-nav-bar>
    </div>
    <div class="bgBox">
      <!-- 具体 -->
      <div class="canWithdrawMoney">
        <div class="text">提现金额</div>
        <div class="money">
          <span>￥</span>
          <input type="text" value="100.00" v-model="withdrawMoney" />
          <span @click="clickAllWithdraw()">全部提现</span>
        </div>
        <div class="allWithdraw">账户余额￥{{ allMoney }}</div>
      </div>
      <!-- 选择 -->
      <div class="shortcutMoney">
        <div
          :class="item.isActive ? 'active' : ''"
          v-for="(item, index) in numList"
          :key="index"
          @click="clickNum(item, index)"
        >
          <span>{{ item.text }}元</span>
        </div>
      </div>
      <!-- 账号 -->
      <div class="account">
        <span>账号：</span>
        <span>
          <input type="text" v-model="account" placeholder="请输入提现账号" />
          <van-icon
            v-show="account != ''"
            name="cross"
            size="13"
            @click="account = ''"
          />
        </span>
      </div>
      <!-- 方式 -->
      <div class="withdrawType">
        <div class="text">提现方式</div>
        <div
          class="typeList"
          v-for="(item, index) in typeList"
          :key="index"
          @click="clickTypeList(item, index)"
        >
          <div class="v-typeList">
            <div class="check">
              <van-checkbox v-model="item.checked"></van-checkbox>
            </div>
            <div class="img"><img :src="item.imgSrc" alt="" /></div>
            <div class="list-text">{{ item.text }}</div>
          </div>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="btn">
        <van-button type="info" @click="confirm">确认提现</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import "../../../../assets/less/my/withdraw/withdraw.css";
export default {
  data() {
    return {
      // 屏幕高度
      H: "",
      InfoData: {},
      //   总金额
      allMoney: 0,
      // 提现金额
      withdrawMoney: "0",
      imgSrc: "",
      //账号
      account: "",
      // 快捷的数字
      numList: [
        { text: "10", isActive: true },
        { text: "30", isActive: false },
        { text: "50", isActive: false },
        { text: "100", isActive: false },
        { text: "150", isActive: false },
        { text: "200", isActive: false },
        { text: "300", isActive: false },
        { text: "500", isActive: false },
      ],
      // 提现方式
      typeList: [
        {
          checked: true,
          imgSrc: require("../../../../assets/img/zhifuIcon.png"),
          text: "支付宝提现",
          remarkText: "",
        },
        // {
        //   checked: false,
        //   imgSrc: require("../../../../assets/img/wecharIcon.png"),
        //   text: "微信提现",
        //   remarkText: "",
        // },
        // {
        //   checked: false,
        //   imgSrc: require("../../../../assets/img/xianxia.png"),
        //   text: "银行卡提现",
        //   remarkText: "",
        // },
      ],
    };
  },
  created() {
    this.getInfoData();
    this.$nextTick(() => {
      this.H = document.documentElement.clientHeight;
    });
  },
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
        this.$router.push({ name: "RechargeWithdraw", query: { flag: false } });
      }, 600);
    },
    // 初始赋值
    getInfoData() {
      this.InfoData = JSON.parse(sessionStorage.getItem("infoData"));
      this.allMoney = this.InfoData.balance;
      this.account = this.InfoData.phoneNumber;
    },
    // 点击快捷充值的数字
    clickNum(item, index) {
      if (item.isActive) {
        return;
      }
      this.numList.forEach((e) => {
        e.isActive = false;
      });
      item.isActive = true;
      this.withdrawMoney = Number(item.text).toFixed(2);
    },
    // 点击提现方式
    clickTypeList(item, index) {
      if (item.checked) {
        return;
      }
      this.typeList.forEach((e) => {
        e.checked = false;
      });
      item.checked = true;
    },
    // 全部提现
    clickAllWithdraw() {
      this.numList.forEach((e, i) => {
        e.text = Number(e.text);
        if (this.allMoney == e.text) {
          this.clickNum(e, i);
        }
      });
      this.withdrawMoney = this.allMoney;
    },
    // 上传图片
    updata(e) {
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", e.target.files[0]);

      //   loading
      var loading = this.$toast.loading({
        message: "上传中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "0",
      });

      this.$axios({
        url: "/sigaoyi/ImageOnlineURLUpload",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((result) => {
          loading.clear();
          console.log("result ==>", result);
          setTimeout(() => {
            this.$refs.uploadImg.value = null;
          }, 100);
          if (result.data.Code == 200) {
            this.imgSrc = result.data.imgsURL;
            this.$toast({ message: "上传成功" });
          } else {
            this.$dialog({ message: "上传失败" });
          }
        })
        .catch((err) => {
          setTimeout(() => {
            this.$refs.uploadImg.value = null;
          }, 100);
          loading.clear();
          this.$dialog({ message: "系统服务繁忙,请稍后再试!" });
          console.log("err ==>", err);
        });
    },
    // 确认提现
    confirm() {
      if (this.withdrawMoney == "0" || this.withdrawMoney == "") {
        this.$toast("提现金额格式不正确");
        return;
      }
      if (this.withdrawMoney > this.allMoney) {
        this.$toast("提现金额不足！");
        return;
      }
      let data = {
        userName: this.InfoData.userName, // 用户名字
        amount: Number(this.withdrawMoney), // 钱
        remarks: Number(this.account), // 账号
        img: this.imgSrc, //图片
      };
      const loading = this.$toast.loading({
        message: "提交中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "0",
      });
      this.$axios({
        url: "/sigaoyi/NEWwithdraw",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          loading.clear();
          if (result.data.code == 200) {
            this.$dialog({
              message: result.data.msg,
              confirmButtonColor: "#409eff",
            });
          } else {
            this.$dialog({ message: result.data.msg });
          }
        })
        .catch((err) => {
          loading.clear();
          console.log("err ==>", err);
          this.$dialog({ message: "系统业务繁忙，请稍后再试!" });
        });
    },
  },
};
</script>