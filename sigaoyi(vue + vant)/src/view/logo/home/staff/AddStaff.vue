<template>
  <div class="AddStaff">
      <van-nav-bar
      title="添加员工"
      left-text="返回"
      right-text="添加"
      left-arrow
      fixed
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="list" style="margin-top:51px">
      <div class="v-list" v-for="(item, index) in list" :key="index">
        <div class="v-title">{{ item.text }}<i class="must" v-show="item.mustFlag">*</i></div>
        <div class="content1" v-if="item.isActive" @click="updata()">
          <img src="../../../../assets/img/defaultImg.jpg" alt="">
          <input type="file" accept="image/*">
        </div>
        <div class="content" v-else>
          <input type="text" v-model="item.value" :placeholder="`请输入${item.text}`" />
        </div>
        <div class="icon">
          <van-icon name="arrow" size="15px" color="#969799" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../../../../assets/less/staff/staffDetails/staffDetails.css";
export default {
  data() {
    return {
      // 循环数组
      list: [
        {isActive:true,mustFlag:false,text: "头像", value: "" },
        {isActive:false,mustFlag:true,text: "姓名", value: "" },
        {isActive:false,mustFlag:false,text: "昵称", value: "" },
        {isActive:false,mustFlag:true,text: "号码", value: "" },
        {isActive:false,mustFlag:false,text: "职位", value: "" },
        {isActive:false,mustFlag:true,text: "公司", value: "" },
        {isActive:false,mustFlag:true,text: "余额", value: "" },
        {isActive:false,mustFlag:false,text: "邮箱", value: "" },
        {isActive:false,mustFlag:false,text: "地址", value: "" },
        {isActive:false,mustFlag:true,text: "总订单数", value: "" },
        {isActive:false,mustFlag:false,text: "累计充值", value: "" },
        {isActive:false,mustFlag:false,text: "累计消费", value: "" },
        {isActive:false,mustFlag:true,text: "待付费用", value: "" },
        {isActive:false,mustFlag:true,text: "待付运费订单", value: "" },
        {isActive:false,mustFlag:true,text: "当前发货订单数", value: "" },
        {isActive:false,mustFlag:true,text: "账号欠费催收", value: "" },
      ],
    };
  },
  methods: {
       //   返回
    onClickLeft() {
      this.$router.back();
    },
    // 确定修改
    onClickRight() {
      console.log("this.list ==>", this.list);
    },
  },
};
</script>