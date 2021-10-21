<template>
  <div class="withdraw" :style="{ height: H + 'px' }">
    <van-nav-bar
      title="提现"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="bgBox">
      <div class="canWithdrawMoney">
        <div class="text">提现金额</div>
        <div class="money">
          <span>￥</span>
          <input type="text" value="100.00" v-model="withdrawMoney" />
          <span @click="clickAllWithdraw()">全部提现</span>
        </div>
        <div class="allWithdraw">账户余额￥{{ allMoney }}</div>
      </div>
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
    // 确认提现
    confirm() {
     this.$dialog({ message: "提现功能正在维护,维护具体时间请等待,给您带来不便请谅解" });
     return;
      if (this.withdrawMoney == "0") {
        this.$toast("提现金额不能为0");
        return;
      }
      if (this.withdrawMoney > this.allMoney) {
        this.$toast("提现金额不足！");
        return;
      }
    //   let data = {
    //     userName: this.InfoData.userName,
    //     amount: Number(this.withdrawMoney),
    //     remarks: Number(this.account),
    //     img: "",
    //   };
    //   const loading = this.$toast.loading({
    //     message: "提交中...",
    //     forbidClick: true,
    //     loadingType: "spinner",
    //     duration: "0",
    //   });
    //   this.$axios({
    //     url: "/sigaoyi/NEWwithdraw",
    //     method: "POST",
    //     params: data,
    //   })
    //     .then((result) => {
    //       console.log("result ==>", result);
    //       loading.clear();
    //       if (result.data.code == 200) {
    //         this.$toast({
    //           message: result.data.msg,
    //           duration: 600,
    //         });
    //       } else {
    //         this.$dialog({ message: result.data.msg });
    //       }
    //     })
    //     .catch((err) => {
    //       loading.clear();
    //       console.log("err ==>", err);
    //       this.$dialog({ message: "系统服务繁忙,请稍后再试!" });
    //     });
      // 请求...
      this.$router.push({ name: "WithdrawDeailt" });
    },
  },
};
</script>