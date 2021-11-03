<template>
  <div class="staffDetails" :style="{ height: H + 'px' }">
    <div class="title">
      <div class="return">
        <!-- <van-icon name="arrow-left" color="#fff" size="16px" /> -->
        <van-nav-bar  left-text="返回" title="员工信息" fixed left-arrow @click-left="onClickLeft" />
      </div>
    </div>
    <div class="v-header">
      <div class="header">
        <div class="named">
          <div class="img" @click="changeBeseIfo()">
            <img :src="baseList.imgSrc" alt="" />
            <span>
              <img :src="baseList.genderSrc" alt="" />
            </span>
          </div>
          <div class="post-name">
            <div class="name">{{ baseList.name }}({{ baseList.eName }})</div>
            <div class="post">
              <span>{{ baseList.grade }}</span>
              <span>{{ baseList.company }}</span>
            </div>
          </div>
          <div class="balance">
            <div class="balance-text">余额(元)</div>
            <div class="balance-number">
              <span>{{ blanceList.blance1 }}.</span>
              <span>{{ blanceList.blance2 }}</span>
            </div>
          </div>
          <div class="exit" @click="changeBeseIfo()">
            <van-icon name="edit" size="14px" color="#fff" />
          </div>
        </div>
        <div class="details">
          <div class="nickName-phone">
            <div class="nickName">
              <span><van-icon name="contact" /></span>
              <span>{{ baseList.nickName }}</span>
            </div>
            <div class="phone">
              <span><van-icon name="phone-o" /></span>
              <span>{{ baseList.phoneName }}</span>
            </div>
          </div>
          <div class="e-address">
            <div class="email">
              <span><van-icon name="envelop-o" /></span>
              <span>{{ baseList.email }}</span>
            </div>
            <div class="address">
              <span><van-icon name="location-o" /></span>
              <span>{{ baseList.address }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="v-list" v-for="(item, index) in list" :key="index">
          <div class="v-title">{{ item }}</div>
          <div class="content">
            <input type="text" :name="item" placeholder="必须填" />
          </div>
          <div class="icon">
            <van-icon name="arrow" size="15px" color="#969799" />
          </div>
        </div>
      </div>
      <div class="btn">
        <van-button type="primary">催收</van-button>
        <van-button type="info">保存</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import "../../../../assets/less/staff/staffDetails/staffDetails.css";
export default {
  data() {
    return {
      H: "",
      // title
      title: "",
      // 传过来的item
      item: {},
      // 基本信息
      baseList: {
        imgSrc: "",
        name: "王者",
        eName: "WangZhe",
        grade: "一级厂长",
        company: "广州思高易有限公司",
        phoneName: "15822223333",
        email: "1923658743@qq.com",
        nickName: "24kc",
        address: "- - -",
        blance: "200.56",
        genderSrc: require("../../../../assets/img/women.png"),
      },
      // 余额处理的list
      blanceList: {
        blance1: "",
        blance2: "",
      },
      // 循环列表
      list: [
        "编号",
        "总订单数",
        "累计充值",
        "累计消费",
        "待付费用",
        "未付运费订单",
        "当前未发货订单数",
        "账号欠费催收",
      ],
    };
  },
  created() {
    this.$nextTick(() => {
      this.H = document.documentElement.clientHeight;
      if (this.$route.query.flag) {
        this.item = JSON.parse(this.$route.query.item);
        this.title = "员工信息";
      } else {
        this.item = {};
        this.title = "添加员工";
      }
      console.log(" this.item ==>", this.item);
      // 余额处理
      this.blanceList.blance1 = this.baseList.blance.split(".")[0];
      this.blanceList.blance2 = this.baseList.blance.split(".")[1];
      console.log("blance ==>", this.baseList);
    });
  },
  methods: {
    onClickLeft(){
        this.$router.go(-1);
    },
    // 跳转到修改个人信息
    changeBeseIfo() {
      this.$router.push({
        name: "StaffDetailsInfo",
        query: { item: JSON.stringify(this.baseList) },
      });
    },
  },
};
</script>