<template>
  <div class="recharge" :style="{ minHeight: H - 30 + 'px' }">
    <div class="title">
      <van-nav-bar
        title="充值"
        left-text="返回"
        left-arrow
        fixed
        @click-left="onClickLeft"
      >
        <template #right>
          <span>上传图片</span>
          <input @change="updata($event)" type="file" ref="uploadImg" />
        </template>
      </van-nav-bar>
    </div>
    <div class="bgBox">
      <div class="pay">
        <div class="qrCode">
          <img :src="qrCodeSrc" alt="" @click="largeImg()" />
        </div>
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
    </div>
    <!-- 预览图片 -->
    <van-image-preview v-model="largeImgState" :images="images">
      <template v-slot:cover
        ><span @click="saveImage()">保存图片</span></template
      >
    </van-image-preview>
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
      qrCodeSrc: "http://www.ec-sigaoyi.com/imagelink/1634893421649.png",
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
        // {
        //   checked: false,
        //   imgSrc: require("../../../../assets/img/wecharIcon.png"),
        //   text: "微信支付",
        //   remarkText: "",
        // },
        // {
        //   checked: false,
        //   imgSrc: require("../../../../assets/img/xianxia.png"),
        //   text: "线下支付",
        //   remarkText: "",
        // },
      ],
      showFace: false,
      // 图片
      imgSrc: "",
      // 预览图片
      largeImgState: false,
      images: [],
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
    // 预览图片
    largeImg() {
      this.images = [];
      this.largeImgState = true;
      this.images.push(this.qrCodeSrc);
    },
    // 保存图片
    saveImage() {
      let _this = this;
      if (!window.plus) return console.log("不是app!!!");
      plus.gallery.save(
        _this.images[0],
        function () {
          _this.$toast("保存相册成功!"); //_this.user_qrcode 是服务器链接，必须是图片格式
        },
        function () {
          _this.$toast("保存失败，请重试!");
        }
      );
    },
    // 立即提交
    Submit() {
      if (this.payVal == 0) {
        this.$dialog({ message: "充值金额不正确" });
        return;
      }
      let data = {
        amount: this.payVal,
        costStatus: 0,
        userId: this.infoData.id,
        img: this.imgSrc,
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
            // 消息推送
            // plus.push.createMessage("xxx充值了xxx");
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
          this.$dialog({ message: "系统服务繁忙,请稍后再试!" });
        });
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
        url: "/sigaoyi/invoicingupload",
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
            this.imgSrc = result.data.path;
            this.$toast({ message: result.data.msg });
          } else {
            this.$dialog({ message: result.data.msg });
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
  },
};
</script>