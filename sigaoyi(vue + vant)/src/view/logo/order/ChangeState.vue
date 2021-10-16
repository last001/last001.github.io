<template>
  <div class="changeState" :style="{ minHeight: minHeight + 'px' }">
    <div class="title">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #right>
          <van-button :disabled="btnDisabled" type="info" size="mini"
            >确定</van-button
          >
        </template>
      </van-nav-bar>
    </div>
    <div class="textVal">
      <textarea
        v-model="remakrs"
        @input="focusTextVal(remakrs)"
        cols="30"
        rows="10"
        placeholder="请输入标记异常原因"
      ></textarea>
    </div>
    <div class="shortcut">
      <div
        class="clearfix"
        v-for="(item, index) in shortcutLit"
        :key="index"
        @click="addRemakrs(item)"
      >
        <span class="fl">{{ item }}</span>
        <span class="fr"
          ><van-icon name="plus" size="14" color="#c5c5c5"
        /></span>
      </div>
    </div>
    <div class="handle">
      <van-dialog
        v-model="show"
        title="订单状态"
        show-cancel-button
        :beforeClose="beforeClose"
      >
        <div class="content">
          <van-radio-group v-model="radio">
            <van-radio name="1">跟进</van-radio>
            <van-radio name="2">已完成处理</van-radio>
          </van-radio-group>
        </div>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import "../../../assets/less/order/changeState/changeState.css";
import timestampToTimes from "../../../assets/js/timestampToTime"
export default {
  data() {
    return {
      minHeight: "",
      infoData:{},
      title: "",
      //  备注
      remakrs: "",
      remakrs1: "",
      // 快捷方式
      shortcutLit: [
        "未到货",
        "物件与图片不符合",
        "多物流单号",
        "PDF存在问题",
        "订单没上传图片",
        "来货不齐全",
      ],
      // 按钮 禁用状态
      btnDisabled: true,
      show: false,
      radio: "1",
    };
  },
  created() {
    //  屏幕最低高度
    this.minHeight = document.documentElement.clientHeight;
    // 个人信息
     this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
    // 标题
    this.title = this.$route.query.title;
    if(this.title == "处理"){
        this.btnDisabled = false;
    }
    // remakrs
    this.remakrs = JSON.parse(this.$route.query.item).note;
    this.remakrs = this.remakrs.replace(/--/g, "\n");
    this.remakrs1 = this.remakrs;
  },
  methods: {
    // 返回
    onClickLeft() {
      if (this.btnDisabled) {
        this.$router.back();
      } else {
        this.$dialog
          .confirm({
            message: "是否保留此次编辑？",
            cancelButtonText: "不保留",
            confirmButtonText: "保留",
          })
          .then(() => {
            this.onClickRight();
          })
          .catch(() => {
            this.$router.back();
          });
      }
    },
    // 添加备注
    addRemakrs(item) {
      console.log("item ==>", item);
      this.remakrs += `--${item}--`;
      this.remakrs = this.remakrs.replace(/--/g, "\n");
      this.btnDisabled = false;
    },
    // 聚焦 事件
    focusTextVal(val) {
      // console.log("val ==>",val);
      // console.log("remakrs1 ==>",this.remakrs1);
      if (this.remakrs1 == val) {
        this.btnDisabled = true;
      } else {
        this.btnDisabled = false;
      }
    },
    //  确定按钮
    onClickRight() {
      // 无标题 提示
      //   console.log("this.title ==>", this.title);
      if (this.title == undefined) {
        this.$dialog({
          message: "出现了不可预期的错误，请重新登陆。",
        }).then(() => {
          this.$router.push({ name: "Login" });
        });
        return;
      }
      // 判断 标题 确定api
      if (
        this.title == "标记" ||
        this.title == "申诉" ||
        this.title == "跟进"
      ) {
        // console.log("this.remakrs ==>",this.remakrs);
        // 修改 备注 
        if(this.title == "标记" || this.title == "申诉"){
            this.remakrs += "\n" + timestampToTimes.timestampToTime(new Date()) + "：" + this.infoData.userName + "标记订单异常" + "\n";
        }else {  
            this.remakrs += "\n" + timestampToTimes.timestampToTime(new Date()) + "：" + this.infoData.userName + "跟进异常订单" + "\n";
        }
        // 备注处理
        this.remakrs = this.remakrs.replace(/\n/g, "--");
        this.$axios({
          url: "/sigaoyi/Markanomaly",
          method: "POST",
          params: {
            abnormalId: JSON.parse(this.$route.query.item).id,
            note: this.remakrs,
          },
        })
          .then((result) => {
            console.log("result ==>", result);
            if (result.data.code == "200") {
              // 赋值 vuex
              this.$store.state.orderState.note = this.remakrs;
              this.$store.state.orderState.id = JSON.parse(
                this.$route.query.item
              ).id;
              this.$store.state.orderState.title = "";
              this.$store.state.orderState.handleIndex = "";
              this.$router.back();
              setTimeout(() => {
                if(this.title == "标记"){
                    this.$toast({ message: "标记成功" });
                }else if(this.title == "申诉"){
                    this.$toast({ message: "申诉成功" });
                }else{
                    this.$toast({ message: "跟进成功" });
                }
              }, 500);
            } else {
              this.$toast({ message: result.data.msg });
            }
          })
          .catch((err) => {
            console.log("err ==>", err);
            this.$toast({ message: "系统业务繁忙,请稍后再试" });
          });
      } else if (this.title == "处理") {
        this.show = true;
      }
    },
    // 处理
    beforeClose(e, done) {
    //   console.log("e ==>", e);
      // 确定
      if (e == "confirm") {
        console.log("this.remakrs ==>", this.remakrs);
        if(this.radio == "1"){
            this.remakrs += "\n" + timestampToTimes.timestampToTime(new Date()) + "：" + this.infoData.userName + "处理异常订单" + "\n";
        }
        this.remakrs = this.remakrs.replace(/\n/g, "--");
        this.$axios({
          url: "/sigaoyi/chuliAnomaly",
          method: "POST",
          params: {
            chuliID: JSON.parse(this.$route.query.item).id,
            chulinote: this.remakrs,
            chulicollectionStatus: Number(this.radio),
            chulifreight: JSON.parse(this.$route.query.item).freight,
          },
        })
          .then((result) => {
            console.log("result ==>", result);
            if (result.data.code == "200") {
              this.$store.state.orderState.id = JSON.parse(this.$route.query.item).id;
              this.$store.state.orderState.note = this.remakrs;
              this.$store.state.orderState.title = "处理";
              this.$store.state.orderState.handleIndex = this.radio;
              setTimeout(() => {
                this.$router.back();
                this.$toast({ message: result.data.msg });
              }, 500);
              return done(false);
            } else {
              this.$toast({ message: result.data.msg });
            }
          })
          .catch((err) => {
            console.log("err ==>", err);
            this.$toast({ message: "系统业务繁忙,请稍后再试" });
          });
      } else {
        return done();
      }
    },
  },
};
</script>

<style>
</style>