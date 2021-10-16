<template>
  <div class="consumptionDetail">
    <div class="title">
      <van-nav-bar
        left-text="返回"
        title="消费详情"
        left-arrow
        @click-left="onClickLeft"
        fixed
      />
    </div>
    <div class="image-money">
      <div class="content">
        <div class="image">
          <img :src="item.img" alt="" @click="largeImg()" />
        </div>
        <div class="type">{{ consType }}</div>
        <div class="money const" v-if="item.costStatus == '2'">
          -{{ item.amount }}
        </div>
        <div
          class="money"
          v-else
          :class="item.auditStatus == '2' ? 'active' : ''"
        >
          +{{ item.amount }}
        </div>
      </div>
      <div class="details">
        <div v-for="(item, index) in creatList" :key="index">
          <span :class="item.className">{{ item.text }}</span>
          <span :class="item.twoDiv">{{ item.value }}</span>
        </div>
      </div>
      <div
        class="btn"
        v-show="infoData.statu == '0' && item.auditStatus == '0'"
      >
        <van-button type="info" @click="rejectPass()">通过</van-button>
        <van-button type="danger" @click="clickReject()">驳回</van-button>
      </div>
    </div>
    <van-image-preview v-model="largeImgStatus" :images="images">
    </van-image-preview>
    <van-popup
      v-model="reasonStatus"
      position="bottom"
      :style="{ height: '38%' }"
      closeable
      get-container=".consumptionDetail"
      :close-on-popstate="true"
    >
      <div class="title">驳回理由</div>
      <textarea
        placeholder="请输入驳回理由"
        v-model="textareaVal"
        cols="30"
        rows="10"
      ></textarea>
      <div class="popup-btn">
        <van-button type="info" @click="rejectconfirm()">确定</van-button>
        <van-button type="danger" @click="exit()">取消</van-button>
      </div>
    </van-popup>
  </div>
</template>
<script>
import "../../../../../assets/less/my/rechargeWithdraw/consumptionDetail/consumptionDetail.css";
import timestampToTimes from "../../../../../assets/js/timestampToTime";

var firstRouter = false;
export default {
  data() {
    return {
      // 屏幕高度
      H: "",
      infoData: {},
      // 传过来的item
      item: {},
      // 创建spanList
      creatList: [
        {
          text: "审核状态",
          name: "auditStatus",
          value: "",
          className: "",
          twoDiv: "twoDiv",
        },
        {
          text: "消费类型",
          name: "costStatus",
          value: "",
          className: "",
          twoDiv: "twoDiv",
        },
        {
          text: "申请人",
          name: "applicationName",
          value: "",
          className: "three",
          twoDiv: "twoDiv",
        },
        {
          text: "申请时间",
          name: "applicationDate",
          value: "",
          className: "",
          twoDiv: "twoDiv",
        },
        {
          text: "审核人",
          name: "auditName",
          value: "",
          className: "three",
          twoDiv: "twoDiv",
        },
        {
          text: "审核时间",
          name: "auditDate",
          value: "",
          className: "",
          twoDiv: "twoDiv",
        },
        {
          text: "编号",
          name: "numbering",
          value: "",
          className: "two",
          twoDiv: "twoDiv",
        },
        {
          text: "简介",
          name: "remarks",
          value: "",
          className: "two",
          twoDiv: "twoDiv",
        },
      ],
      // 消费类型
      consType: "",
      // 金额
      money: "",
      //   放大图片的状态值
      largeImgStatus: false,
      //   放大图片的数组
      images: [],
      //   驳回理由状态值
      reasonStatus: false,
      //   驳回的字
      textareaVal: "",
    };
  },
  created() {
    this.item = JSON.parse(this.$route.query.item);
    console.log("this.item ==>", this.item);
    // 个人信息
    this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
    this.getCreatList();
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
    // 创建的数组初始化
    getCreatList() {
      this.creatList.forEach((e) => {
        for (const key in this.item) {
          if (key == e.name) {
            e.value = this.item[key];
          }
        }
        if (e.name == "auditStatus") {
          if (e.value == "0") {
            e.value = "审核中";
          } else if (e.value == "1") {
            e.value = "审核通过";
          } else {
            e.value = "驳回";
          }
        } else if (e.name == "costStatus") {
          if (e.value == "0") {
            e.value = "充值";
          } else if (e.value == "1") {
            e.value = "提现";
          } else {
            e.value = "扣款";
          }
          this.consType = e.value;
        }
      });
      if (this.item.costStatus == "2") {
        this.creatList.forEach((e) => {
          if (e.text == "审核时间") {
            e.value = "-----";
          }
        });
      }

      if (this.item.auditStatus == "0") {
        this.creatList.forEach((e) => {
          if (e.text == "审核时间") {
            e.value = "-----";
          } else if (e.text == "审核人") {
            e.value = "待处理";
            e.twoDiv = "twoDiv active";
          }
        });
      }
    },
    // 点击图片 放大
    largeImg() {
      this.images = [];
      this.largeImgStatus = true;
      this.images.push(this.item.img);
    },
    // 点击驳回按钮
    clickReject() {
      this.reasonStatus = true;
    },
    // 取消弹出层
    exit() {
      this.reasonStatus = false;
    },
    // 驳回弹出层 确定按钮
    rejectconfirm() {
      if (this.textareaVal == "") {
        this.$dialog({ message: "驳回理由不能为空" });
        return;
      }
      this.$axios({
        url: "/sigaoyi/NEWreject",
        method: "POST",
        params: {
          userId: this.infoData.id,
          id: this.item.id,
          remark: this.textareaVal,
        },
      })
        .then((result) => {
          this.reasonStatus = false;
          console.log("result ==>", result);
          if (result.data.Code == "200") {
            firstRouter = true;

            // 修改值
            this.item.auditStatus = "2";
            this.item.auditName = this.infoData.userName;
            this.item.auditDate = timestampToTimes.timestampToTime(new Date());
            this.item.remarks = this.textareaVal;
            this.getCreatList();

            this.$toast({
              message: result.data.msg,
              duration: 600,
            });
          } else {
            this.$dialog({ message: "驳回失败!" });
          }
        })
        .catch((err) => {
          this.reasonStatus = false;
          console.log("err ==>", err);
          this.$dialog({ message: "系统服务繁忙,请稍后再试!" });
        });
    },
    // 通过
    rejectPass() {
      const loading = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "0",
      });
      this.$axios({
        url: "/sigaoyi/NEWthrough",
        method: "POST",
        params: {
          userId: this.infoData.id,
          id: this.item.id,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          loading.clear();
          if (result.data.code == "200") {
            firstRouter = true;

            // 修改值
            this.item.auditStatus = "1";
            this.item.auditName = this.infoData.userName;
            this.item.auditDate = timestampToTimes.timestampToTime(new Date());
            this.getCreatList();

            this.$toast({
              message: result.data.msg,
              duration: 600,
            });
          } else {
            this.$dialog({ message: "系统服务繁忙,请稍后再试!" });
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