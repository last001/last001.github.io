<template>
  <div class="rechargeWidthdraw">
    <div class="main" v-title data-title="充值提现"></div>
    <div class="box">
      <div class="dandruff">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>财务管理</el-breadcrumb-item>
          <el-breadcrumb-item>充值提现</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="rechargeInfo">
        <div class="balance">
          <span>当前账户余额:</span>
          <span @click="GotoConsumption()" v-loading="loading"
            >{{ balanceText }}元</span
          >
        </div>
        <div class="content">
          <div class="titleText">
            <span
              :class="item.isActive ? 'active' : ''"
              @click="clickSpan(item)"
              v-for="(item, index) in spanList"
              :key="index"
              >{{ item.name }}</span
            >
          </div>
          <div class="recharge" v-if="typeStatus">
            <div class="tips">
              <span
                >（充值审核每天早上10点后处理。请不要多次提交，谢谢配合。）</span
              >
            </div>
            <div class="rechrgeMoney">
              <span>充值金额：</span>
              <input
                @keyup.enter="rechargeBtn()"
                value=""
                ref="rechrgeMoney"
                type="number"
                placeholder="必须填"
              />
            </div>
            <div class="rechargeType">
              <div class="Typetext">充值方式：</div>
              <div
                class="inputDiv"
                v-for="(item, index) in rechargeData"
                :key="index"
                @click="clickInput(rechargeData, item)"
              >
                <span>{{ item.text }}</span>
                <input type="radio" :checked="item.checked" />
              </div>
            </div>
            <!-- <div class="QRcode">
                  <span>收款码：</span>
                <img src="../../assets/img/QRimg01.png" alt="" />
              </div> -->
            <div class="additionImg">
              <span>扫码图片：</span>
              <div class="int-img">
                <img src="../../assets/img/QRimg03.png" alt="" />
              </div>
            </div>
            <el-button class="btnRecharge" type="primary" @click="rechargeBtn()"
              >立即充值</el-button
            >
          </div>
          <div class="widthdraw" v-else>
            <div class="widthdrawMoney">
              <span>提现金额：</span>
              <input
                v-model="widthdrawMoney"
                type="number"
                placeholder="必须填"
                value=""
                @keyup.enter="clickWidthdrawMoney()"
              />
            </div>
            <div class="widthdrawType">
              <span class="Typetext">提现方式：</span>
              <div
                class="inputDiv"
                v-for="(item, index) in widthdrawData"
                :key="index"
                @click="clickInput(widthdrawData, item, index)"
              >
                <span>{{ item.text }}</span>
                <input type="radio" :checked="item.checked" />
              </div>
            </div>
            <div class="typeName">
              <span>{{ typeText }}：</span>
              <input
                @keyup.enter="clickWidthdrawMoney()"
                v-model="account"
                value=""
                type="text"
                placeholder="必须填"
              />
            </div>
            <div class="QRcodeImg">
              <span>收款码：</span>
              <div class="int-img">
                <input
                  type="file"
                  multiple="multiple"
                  accept="image/*"
                  title="点击上传收款码"
                  @change="updataRechargeImg($event)"
                />
                <img :src="rechargeImg" alt="" />
              </div>
            </div>
            <el-button
              class="btnWidthdraw"
              type="primary"
              @click="clickWidthdrawMoney()"
              >立即提现</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <!-- <footerDiv></footerDiv> -->
    <el-dialog
      title="确认充值信息"
      :visible.sync="rechargeStatus"
      width="28%"
      custom-class="rechargeMask"
      close-on-click-moda
      center
    >
      <div class="content">
        <div>请仔细核对您的充值信息后再确认提交！</div>
        <div style="color: #409eff; margin-top: 10px">
          提交成功后,请等待管理员审核,请勿重复提交！(可在消费明细查看处理进度)
        </div>
        <div>
          <span>充值用户名：</span>
          <span>{{ infoData.userName }}</span>
        </div>
        <div>
          <span>充值手机号：</span>
          <span>{{ infoData.phoneNumber }}</span>
        </div>
        <div>
          <!-- rechargeList.type -->
          <span>充值类型：</span>
          <span>支付宝(目前只支持支付宝方式)</span>
        </div>
        <div>
          <span>充值金额：</span>
          <span>{{ rechargeList.money }}</span>
        </div>
        <div>
          <span>上传图片：</span>
          <span>
            <input
              type="file"
              multiple="multiple"
              accept="image/*"
              title="点击上传充值的截图图片"
              @change="updataImg($event)"
            />
            <img :src="imgSrc" alt="" />
            <!-- <i class="delete">×</i> -->
          </span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="againConfirm()">确认提交</el-button>
        <el-button @click="rechargeStatus = false">返回充值</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// navbar 导航栏
// import footerDiv from "@/components/footer.vue";
import uploadFiles from "../../assets/js/uploadFile";
import "../../assets/less/rechargeWidthdraw/rechargeWidthdraw.css";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");

export default {
  data() {
    return {
      loading: true,
      //   conten层的高度
      H: "",
      //   账户余额
      balanceText: 0.0,
      //   imgSrc
      imgSrc: require("../../assets/img/defaultImg.jpg"),
      //
      spanList: [
        { name: "充值", isActive: true, typeStatus: true },
        { name: "提现", isActive: false, typeStatus: false },
      ],
      typeStatus: true,
      // 充值方式
      rechargeData: [
        { text: "支付宝", checked: true },
        { text: "微信", checked: false },
        { text: "银行卡", checked: false },
      ],
      // 提现金额
      widthdrawMoney: "",
      // 提现账号
      account: "",
      //   提现方式
      widthdrawData: [
        { text: "支付宝", checked: true },
        { text: "微信", checked: false },
        { text: "银行卡", checked: false },
      ],
      // 提现图片
      rechargeImg: require("../../assets/img/defaultImg.jpg"),
      // typeText
      typeText: "支付宝账号",
      //   点击立即充值的状态值
      rechargeStatus: false,
      //   点击立即充值获取个人信息
      infoData: {},
      //
      rechargeList: {
        type: "",
        money: "",
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    next();
  },
  created() {
    if (this.$route.query.id == 0) {
      this.clickSpan(this.spanList[1]);
    } else {
      this.clickSpan(this.spanList[0]);
    }
    this.$nextTick(() => {
      // 调用侧边栏 的检测路由方法
      this.$parent.$refs.sideNavbar.detection();
      this.getInfoData();
    });

    this.H = document.documentElement.clientHeight - 60 - 82 - 20;
  },
  components: {
    // footerDiv,
  },
  computed: {
    ...homeState(["WstateStatus", "num", "InfoData"]),
  },
  methods: {
    // 去消费明细
    GotoConsumption() {
      this.$router.push({ name: "ConsumptionDetail" });
    },
    // 点击span
    clickSpan(item) {
      if (item.isActive) {
        return;
      }
      this.spanList.forEach((e) => {
        e.isActive = false;
      });
      item.isActive = true;
      this.typeStatus = item.typeStatus;
    },
    // 点击input
    clickInput(arr, item, index) {
      if (index == 0) {
        this.typeText = "支付宝账号";
      } else if (index == 1) {
        this.typeText = "微信账号";
      } else if (index == 2) {
        this.typeText = "银行卡账号";
      }
      if (item.checked) {
        return;
      }
      for (let i = 0; i < arr.length; i++) {
        arr[i].checked = false;
      }
      item.checked = true;
    },
    // 获取 getInfoData
    getInfoData() {
      this.balanceText = this.balanceText.toFixed(2);
      if (sessionStorage.getItem("token") == undefined) {
        alert("请先登录");
        this.$router.push({ name: "Login" });
        return;
      }
      if (this.InfoData.id == undefined) {
        alert("登陆时间过期,请重新登陆!");
        sessionStorage.removeItem("token");
        this.$router.push({ name: "Login" });
        return;
      }
      //   请求
      //   let loading = this.$loading({
      //     lock: false,
      //     text: "加载中...",
      //     spinner: "el-icon-loading",
      //     background: "rgba(0, 0, 0, 0.7)",
      //   });
      this.$axios({
        method: "POST",
        url: "/sigaoyi/UnderIdQueryUserTableInfo",
        params: {
          userId: this.InfoData.id,
        },
      })
        .then((result) => {
          setTimeout(() => {
            this.loading = false;
          }, 500);
          if (result.data.Code == 200) {
            this.setInfoData(result.data.userInfo);
            this.balanceText = result.data.userInfo.balance;
            this.balanceText = this.balanceText.toFixed(2);
          } else {
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 70,
            });
          }
        })
        .catch((err) => {
          setTimeout(() => {
            this.loading = false;
          }, 500);

          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试!",
            type: "error",
            offset: 70,
          });
        });
    },
    //  充值上传图片
    updataImg(e) {
      let files = e.target.files[0];
      if (files == undefined || files == null) {
        return;
      }

      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", files);
      //   formData.append("file", this.file2);
      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios(uploadFiles.uploadFile(formData))
        .then((result) => {
          loading.close();

          if (result.data.Code == 200) {
            this.imgSrc = result.data.imgsURL;
            this.$notify({
              title: "请求成功",
              message: "图片上传成功!",
              type: "success",
              offset: 70,
            });
          } else {
            this.$notify({
              title: "请求失败",
              message: "图片上传失败!",
              type: "warning",
              offset: 70,
            });
          }
        })
        .catch((err) => {
          loading.close();

          this.$notify({
            title: "请求错误",
            message: "图片上传错误!",
            type: "error",
            offset: 70,
          });
        });
    },
    // 提现上传图片
    updataRechargeImg(e) {
      let files = e.target.files[0];
      if (files == undefined || files == null) {
        return;
      }

      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", files);
      //   formData.append("file", this.file2);
      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios(uploadFiles.uploadFile(formData))
        .then((result) => {
          loading.close();

          if (result.data.Code == 200) {
            this.rechargeImg = result.data.imgsURL;
            this.$notify({
              title: "请求成功",
              message: "图片上传成功!",
              type: "success",
              offset: 70,
            });
          } else {
            this.$notify({
              title: "请求失败",
              message: "图片上传失败!",
              type: "warning",
              offset: 70,
            });
          }
        })
        .catch((err) => {
          loading.close();

          this.$notify({
            title: "请求错误",
            message: "图片上传错误!",
            type: "error",
            offset: 70,
          });
        });
    },
    // 立即充值 还有图片路径
    rechargeBtn() {
      if (
        this.$refs.rechrgeMoney.value == "" ||
        this.$refs.rechrgeMoney.value == "0"
      ) {
        this.$message({
          message: "输入的充值金额不正确!",
          type: "error",
          center: true,
          duration: "800",
        });
        return;
      }
      this.infoData = this.InfoData;
      this.rechargeData.forEach((e) => {
        if (e.checked) {
          this.rechargeList.type = e.text;
        }
      });
      this.rechargeList.money = Number(this.$refs.rechrgeMoney.value).toFixed(
        2
      );
      this.rechargeStatus = true;
    },
    // 弹出层确认提交
    againConfirm() {
      if (sessionStorage.getItem("token") == undefined) {
        alert("请先登陆!");
        this.$router.push({ name: "Login" });
        return;
      }
      if (this.InfoData.id == undefined) {
        alert("登陆过期，请重新登陆！");
        this.$router.push({ name: "Login" });
        sessionStorage.removeItem("token");
        return;
      }
      let data = {
        amount: "",
        costStatus: 0,
        userId: this.InfoData.id,
        img: this.imgSrc,
      };
      this.rechargeData.forEach((e) => {
        if (e.checked) {
          data.amount = this.$refs.rechrgeMoney.value;
          //   data.rechargeType = e.text;
        }
      });
      this.rechargeStatus = false;
      //   发请求
      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios({
        url: "/sigaoyi/NEWaddcharge",
        method: "POST",
        params: data,
      })
        .then((result) => {
          loading.close();

          if (result.data.code == 200) {
            this.rechargeStatus = false;
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 70,
            });
          } else {
            this.rechargeStatus = true;
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 70,
            });
          }
        })
        .catch((err) => {
          this.rechargeStatus = true;
          loading.close();

          this.$notify({
            title: "请求失败",
            message: "系统业务繁忙,请稍后再试!",
            type: "error",
            offset: 70,
          });
        });
    },
    // 立即提现 还有图片路径
    clickWidthdrawMoney() {
      if (sessionStorage.getItem("token") == undefined) {
        alert("请先登录");
        this.$router.push({ name: "Login" });
        return;
      }
      if (this.InfoData.id == undefined) {
        alert("登陆时间过期,请重新登陆!");
        sessionStorage.removeItem("token");
        this.$router.push({ name: "Login" });
        return;
      }
      if (this.widthdrawMoney == "" || this.widthdrawMoney == "0") {
        this.$message({
          message: "提现金额数字不正确",
          center: true,
          type: "error",
          duration: 800,
        });
        return;
      }
      if (this.account == "" || this.account == "0") {
        this.$message({
          message: "请输入正确的支付宝账号",
          center: true,
          type: "error",
          duration: 800,
        });
        return;
      }
      if (this.rechargeImg == "./static/img/defaultImg.f424882.jpg") {
        this.$message({
          message: "请上传收款码图片",
          center: true,
          type: "error",
          duration: 800,
        });
        return;
      }

      let data = {
        userName: this.InfoData.userName,
        amount: Number(this.widthdrawMoney),
        remarks: Number(this.account),
        img: this.rechargeImg,
      };

      //   laoding
      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      // 发请求 ....
      this.$axios({
        url: "/sigaoyi/NEWwithdraw",
        method: "POST",
        params: data,
      })
        .then((result) => {
          loading.close();
          if (result.data.code == "200") {
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
          } else {
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 50,
            });
          }
        })
        .catch((err) => {
          loading.close();

          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    ...homeActions(["setWstateStatus", "setNum", "setInfoData"]),
  },
};
</script>