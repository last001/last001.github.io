<template>
  <div class="recharge" :style="{ height: H + 'px' }">
    <van-nav-bar
      title="充值"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="bgBox">
      <div class="pay">
        <div class="text">充值金额(元)</div>
        <div class="int">
          <input type="number" v-model="payVal" placeholder="请输入充值金额" />
        </div>
        <div class="shortcut">
          <div
            :class="item.isActive ? 'active' : ''"
            v-for="(item, index) in numList"
            :key="index"
            @click="clickNum(item, index)"
          >
            <span>{{ item.text }}元</span>
          </div>
        </div>
      </div>
      <div class="payType">
        <div class="text">支付方式</div>
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
        <van-button type="info" @click="Submit()">充值</van-button>
      </div>
      <!-- 弹出层 -->
      <van-popup
        v-model="showFace"
        position="right"
        :style="{ height: '100%' }"
      >
        <div class="face_title">
          <van-nav-bar
            title="二维码"
            left-text="返回"
            left-arrow
            @click-left="showFace = false"
          />
        </div>
        <div class="image">
          <img src="../../../../assets/img/QRimg03.png" alt="" />
        </div>
        <div class="face_confirm">
          <van-button type="info" @click="SubmitNow">立即提交</van-button>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import "../../../../assets/less/my/recharge/recharge.css";
var firstRouter = false;
export default {
  data() {
    return {
      // 屏幕高度
      H: "",
      infoData: {},
      //   充值金额
      payVal: 10,
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
      // 支付方式
      typeList: [
        {
          checked: true,
          imgSrc: require("../../../../assets/img/zhifuIcon.png"),
          text: "支付宝支付",
          remarkText: "",
        },
        {
          checked: false,
          imgSrc: require("../../../../assets/img/wecharIcon.png"),
          text: "微信支付",
          remarkText: "",
        },
        {
          checked: false,
          imgSrc: require("../../../../assets/img/xianxia.png"),
          text: "线下支付",
          remarkText: "",
        },
      ],
      showFace: false,
    };
  },
  created() {
    this.$nextTick(() => {
      this.H = document.documentElement.clientHeight;
      this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
    });
  },
  methods: {
    // 返回
    onClickLeft() {
      this.$router.push({
        name: "RechargeWithdraw",
        query: {
          isLoad: firstRouter,
        },
      });
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
      this.payVal = Number(item.text);
    },
    // 点击支付方式
    clickTypeList(item, index) {
      if (item.checked) {
        return;
      }
      this.typeList.forEach((e) => {
        e.checked = false;
      });
      item.checked = true;
    },
    // 充值
    Submit() {
      if (this.payVal == 0) {
        this.$dialog({ message: "充值金额不正确" });
        return;
      }
      this.showFace = true;
    },
    // 立即提交
    SubmitNow() {
      let data = {
        amount: this.payVal,
        costStatus: 0,
        userId: this.infoData.id,
        img: "",
      };
      const loading = this.$toast.loading({
        message: "提交中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "0",
      });
      this.$axios({
        url: "/sigaoyi/NEWaddcharge",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          loading.clear();
          if (result.data.code == 200) {
            firstRouter = true;
            this.$toast({
              message: result.data.msg,
              duration: 600,
            });
          } else {
            this.$dialog({ message: result.data.msg });
          }
        })
        .catch((err) => {
          loading.clear();
          console.log("err ==>", err);
          this.$dialog({ message: "系统服务繁忙,请稍后再试!" });
        });
    },
  },
};
</script>