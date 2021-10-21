<template>
  <div class="login" :style="{ height: H + 'px' }">
    <div class="bg">
      <div class="logoImg"></div>
    </div>
    <!-- 登陆 -->
    <div class="register">
      <van-tabs
        v-model="activeName"
        background="#409eff"
        color="#fff"
        title-inactive-color="#fff"
        title-active-color="#fff"
      >
        <van-tab title="账号登录" name="a">
          <van-form>
            <van-field
              v-model="username"
              label="账号"
              placeholder="请输入账号"
              autocomplete="off"
              clearable
              @input="testRules"
            />
            <van-field
              v-model="password"
              :type="passwordType"
              label="密码"
              placeholder="请输入密码"
              autocomplete="off"
              :right-icon="eyes"
              @input="testRules"
              @click-right-icon="clickRightIcon"
              @keyup.native.enter="onSubmit()"
            />
          </van-form>
        </van-tab>
        <van-tab title="手机号登陆" name="b">
          <van-form>
            <van-field
              v-model="phoneName"
              label="手机号"
              placeholder="请输入手机号码"
              autocomplete="off"
              clearable
              @input="testRules1"
            />
            <van-field
              v-model="code"
              label="验证码"
              center
              clearable
              placeholder="请输入验证码"
              @input="testRules1"
              @keyup.native.enter="onSubmit()"
            >
              <template #button>
                <van-button
                  plain
                  size="mini"
                  type="info"
                  @click="sendCodeStatus && sendCode()"
                  >{{ sendCodeText }}</van-button
                >
              </template>
            </van-field>
          </van-form>
        </van-tab>
      </van-tabs>
      <!-- 记住密码 -->
      <div class="remember clearfix">
        <div class="fl" @click="noUserName('c')">没有账号？立即注册！</div>
        <div class="fr" @click="isChecked = !isChecked">
          <van-checkbox
            v-model="isChecked"
            checked-color="#409eff"
            shape="square"
            icon-size="13px"
          ></van-checkbox
          ><span>记住密码</span>
        </div>
      </div>
      <div class="btn">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :class="btnStatus ? 'active' : ''"
          @click="onSubmit()"
          >登陆</van-button
        >
      </div>
    </div>
    <!-- 没有账号提示 -->
    <div class="no-user clearfix">
      <!-- <span class="fl" @click="noUserName('c')">没有账号？立即注册》</span> -->
      <span class="fr" @click="noUserName('d')">忘记密码?</span>
    </div>
    <!-- 同意条约 -->
    <div
      class="check"
      :class="checkedBgClass ? 'active' : ''"
      @click="checked = !checked"
    >
      <van-checkbox
        v-model="checked"
        checked-color="#409eff"
        shape="square"
        icon-size="12px"
      ></van-checkbox>
      <span
        ><font>已阅读并同意遵守</font
        ><span @click.stop="clicksigoyi()"
          >《思高易网络科技有限公司》</span
        ></span
      >
    </div>
    <!-- 注册 -->
    <div class="register1">
      <van-popup
        v-model="showDiv"
        get-container=".register1"
        position="right"
        :style="{ width: '100%', height: '100%' }"
        :close-on-popstate="true"
        :safe-area-inset-bottom="true"
      >
        <!-- #409eff色 背景 -->
        <div class="bg">
          <div class="logoImg" @click="gotoHome()"></div>
        </div>
        <!-- 注册 或者 忘记密码 内容 -->
        <van-tabs
          v-model="activeName1"
          background="#409eff"
          color="#fff"
          title-inactive-color="#fff"
          title-active-color="#fff"
        >
          <!-- 注册 -->
          <van-tab title="注册" name="c">
            <van-form>
              <van-field
                v-model="regitsterList.phoneName"
                label="手机号码"
                placeholder="请输入手机号码"
                autocomplete="off"
                clearable
              />
              <van-field
                v-model="regitsterList.password"
                :type="passwoldList.passwordType"
                clearable
                label="密码"
                placeholder="请输入密码"
                @click-right-icon="registeClickRightIcon(true)"
                autocomplete="off"
                :right-icon="passwoldList.eyes"
              />
              <van-field
                v-model="regitsterList.aginPassword"
                :type="passwoldList.aginPasswordType"
                clearable
                label="确认密码"
                placeholder="请确认密码"
                @click-right-icon="registeClickRightIcon(false)"
                autocomplete="off"
                :right-icon="passwoldList.aginEyes"
              />
              <van-field
                v-model="regitsterList.companyName"
                label="公司"
                placeholder="请输入公司名"
                autocomplete="off"
                clearable
              />
              <van-field
                v-model="regitsterList.references"
                label="推荐人"
                placeholder="请输入推荐人"
                autocomplete="off"
                clearable
              />
              <van-field
                v-model="regitsterList.registerCode"
                label="验证码"
                placeholder="请输入验证码"
                autocomplete="off"
                clearable
              >
                <template #button>
                  <van-button
                    plain
                    size="mini"
                    type="info"
                    @click="sendCodeStatus1 && sendCode1()"
                    >{{ registerSendCodeText }}</van-button
                  >
                </template>
              </van-field>
            </van-form>
          </van-tab>
          <!-- 忘记密码 -->
          <van-tab title="忘记密码" name="d">
            <van-form>
              <van-field
                v-model="forgetPassword.phoneName"
                label="手机号码"
                placeholder="请输入手机号码"
                autocomplete="off"
                clearable
              />
              <van-field
                v-model="forgetPassword.password"
                :type="forgetPasswordList.passwordType"
                clearable
                label="密码"
                placeholder="请输入密码"
                @click-right-icon="forgetClickRightIcon(true)"
                autocomplete="off"
                :right-icon="forgetPasswordList.eyes"
              />
              <van-field
                v-model="forgetPassword.aginPassword"
                :type="forgetPasswordList.aginPasswordType"
                clearable
                label="确认密码"
                placeholder="请确认密码"
                @click-right-icon="forgetClickRightIcon(false)"
                autocomplete="off"
                :right-icon="forgetPasswordList.aginEyes"
              />
              <van-field
                v-model="forgetPassword.forgetCode"
                label="验证码"
                placeholder="请输入验证码"
                autocomplete="off"
                clearable
              >
                <template #button>
                  <van-button
                    plain
                    size="mini"
                    type="info"
                    @click="sendCodeStatus2 && sendCode2()"
                    >{{ forgetSendCodeText }}</van-button
                  >
                </template>
              </van-field>
            </van-form>
          </van-tab>
          <div class="btn">
            <van-button
              round
              block
              type="info"
              native-type="submit"
              @click="confirm()"
              >确定</van-button
            >
          </div>
          <div class="back">
            <button @click="showDiv = false">
              <van-icon color="#fff" name="arrow-left" />
            </button>
          </div>
        </van-tabs>
      </van-popup>
    </div>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
export default {
  data() {
    return {
      // 屏幕高度
      H: "",
      //   账号  密码
      username: "",
      password: "",
      // 手机号码 验证码
      phoneName: "",
      code: "",
      //   点击右边图标的状态值
      rightIconStatus: true,
      //   密码输入框类型
      passwordType: "password",
      // 闭眼icon
      eyes: "closed-eye",
      // 标签栏状态
      activeName: "a",
      // 同意  状态值
      checked: false,
      //checkedBgClass
      checkedBgClass: false,
      // 登陆按钮状态值
      btnStatus: true,
      // 发送验证码的文字
      sendCodeText: "获取验证码",
      // 发送验证码按钮的状态值
      sendCodeStatus: true,
      // 左侧弹出层的状态值
      showDiv: false,
      // 注册 标签栏状态值
      activeName1: "",
      // 注册List
      regitsterList: {
        phoneName: "",
        password: "",
        aginPassword: "",
        companyName: "",
        references: "",
        registerCode: "",
      },
      // 注册密码的类型
      passwoldList: {
        passwordType: "password",
        aginPasswordType: "password",
        eyes: "closed-eye",
        aginEyes: "closed-eye",
        //注册密码框类型 状态值
        registerPassword: true,
        //注册确认密码框类型 状态值
        registerAginPassword: true,
      },
      // 注册 验证码文字
      registerSendCodeText: "获取验证码",
      // 注册 验证码状态值
      sendCodeStatus1: true,
      // 忘记密码 List
      forgetPassword: {
        phoneName: "",
        password: "",
        aginPassword: "",
        forgetCode: "",
      },
      // 忘记密码 密码框type
      forgetPasswordList: {
        passwordType: "password",
        aginPasswordType: "password",
        eyes: "closed-eye",
        aginEyes: "closed-eye",
        // 忘记密码 密码框类型 状态值
        forgetPassword: true,
        // 忘记密码 确认密码框类型 状态值
        forgetAginPassword: true,
      },
      // 忘记密码 验证码文字
      forgetSendCodeText: "获取验证码",
      // 忘记密码 验证码状态值
      sendCodeStatus2: true,
      isChecked: false,
      // 加密账号 + 密码
      cipherText: "",
      cipherpassWorld: "",
    };
  },
  created() {
    //   初始获取屏幕高度 渲染背景色
    this.H = document.documentElement.clientHeight;

    this.getCookie();
  },
  methods: {
    // 切换密码框的类型
    clickRightIcon() {
      if (this.rightIconStatus) {
        this.passwordType = "text";
        this.eyes = "eye-o";
        this.rightIconStatus = false;
      } else {
        this.passwordType = "password";
        this.eyes = "closed-eye";
        this.rightIconStatus = true;
      }
    },
    // 用户名 密码框 输入事件
    testRules() {
      let res = /^\S{6,}$/;
      if (this.username != "" && res.test(this.password)) {
        this.btnStatus = false;
      } else {
        this.btnStatus = true;
      }
    },
    // 手机号码 验证码框 输入事件
    testRules1() {
      let resCode = /\d{6}/;
      let resPhoneName = /^1[3|4|5|7|8][0-9]{9}$/;
      if (resPhoneName.test(this.phoneName) && resCode.test(this.code)) {
        this.btnStatus = false;
      } else {
        this.btnStatus = true;
      }
    },
    // 手机发送验证码
    sendCode() {
      // 提示
      let resPhoneName = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!resPhoneName.test(this.phoneName)) {
        this.$toast("手机号码格式不正确");
        return;
      }
      // 控制发送验证码按钮的状态值和文字
      this.sendCodeStatus = false;
      var count = 60;
      var timer = null;
      var timer = setInterval(() => {
        count--;
        this.sendCodeText = count + "秒后重新发送";
        if (count <= 0) {
          this.sendCodeText = "获取验证码";
          this.sendCodeStatus = true;
          clearInterval(timer);
          timer = null;
        }
      }, 1000);
    },
    // 点击登录按钮
    onSubmit() {
      if (this.activeName == "a") {
        // 账号登陆
        console.log("this.username ==>", this.username);
        console.log("this.password ==>", this.password);
        // 提示
        if (this.btnStatus) {
          this.$toast("账号不能为空并且密码不能少于6位数");
          return;
        }
        if (!this.checked) {
          this.$toast("请先阅读并勾选内容");
          this.checkedBgClass = true;
          setTimeout(() => {
            this.checkedBgClass = false;
          }, 1000);
          return;
        }
        // ip 和 地址
        let ip = localStorage.getItem("Ip");
        let cityname = localStorage.getItem("cityname");
        // loading
        let loading = this.$toast.loading({
          message: "登陆中...",
          forbidClick: true,
          loadingType: "spinner",
          duration: 0,
        });
        this.$axios({
          method: "POST",
          url: "/sigaoyi/NEWlogin1",
          params: {
            userName: this.username,
            password: this.password,
            city: cityname,
            ip: ip,
          },
          // 请求超时 5s 超过请求失败
          timeout: 5 * 1000,
        })
          .then((result) => {
            loading.clear();
            console.log("result ==>", result);
            if (result.data.Code == "200") {
              this.$toast.success({
                message: result.data.msg,
                duration: 800,
              });
              result.data.userinfo.balance = result.data.userinfo.balance.toFixed(
                2
              );
              // 密码   
              let user = result.data.userinfo;
              user.userPassword = "xxxxxxxxxxxx";
              sessionStorage.setItem("infoData", JSON.stringify(user));
              // 销售额 利润 等。   
              sessionStorage.setItem("profitData",JSON.stringify(result.data.profit))
              // cookie 记住密码
              if (this.isChecked) {
                // Encrypt 加密
                this.cipherText = CryptoJS.AES.encrypt(
                  this.username,
                  "userName"
                ).toString();
                this.cipherpassWorld = CryptoJS.AES.encrypt(
                  this.password,
                  "passWord"
                ).toString();
                this.setCookie(this.cipherText, this.cipherpassWorld, 7);
              } else {
                this.clearCookie();
              }
              setTimeout(() => {
                this.$router.push({ name: "Home" });
              }, 500);
            } else {
              this.$dialog.alert({
                title: "登陆失败",
                message: result.data.msg,
                confirmButtonColor: "#646566",
              });
            }
          })
          .catch((err) => {
            loading.clear();
            this.$dialog.alert({
              title: "登陆失败",
              message: "服务器繁忙,请稍后再试！",
              confirmButtonColor: "#646566",
            });
            console.log("err =>", err);
          });
      } else {
        // 手机号码登陆
        console.log("手机号 + 验证码 ==>", this.phoneName, this.code);
        // 提示
        if (this.btnStatus) {
          this.$toast("手机号码或者验证码格式不正确");
          return;
        }
        if (!this.checked) {
          this.$toast("请先阅读并勾选内容");
          this.checkedBgClass = true;
          setTimeout(() => {
            this.checkedBgClass = false;
          }, 1000);
          return;
        }
        // 发起请求 待做
      }
    },
    // 点击思高易 待做
    clicksigoyi() {
      console.log("思高易!!!!!!!!!!!!!");
    },
    // 点击没有账号 或者 忘记密码
    noUserName(status) {
      this.showDiv = true;
      this.activeName1 = status;
    },
    // 注册切换密码框类型
    registeClickRightIcon(flag) {
      if (flag) {
        if (this.passwoldList.registerPassword) {
          this.passwoldList.registerPassword = false;
          this.passwoldList.passwordType = "text";
          this.passwoldList.eyes = "eye-o";
        } else {
          this.passwoldList.registerPassword = true;
          this.passwoldList.passwordType = "password";
          this.passwoldList.eyes = "closed-eye";
        }
      } else {
        if (this.passwoldList.registerAginPassword) {
          this.passwoldList.registerAginPassword = false;
          this.passwoldList.aginPasswordType = "text";
          this.passwoldList.aginEyes = "eye-o";
        } else {
          this.passwoldList.registerAginPassword = true;
          this.passwoldList.aginPasswordType = "password";
          this.passwoldList.aginEyes = "closed-eye";
        }
      }
    },
    // 注册 获取验证码
    sendCode1() {
      // 提示
      let resPhoneName = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!resPhoneName.test(this.regitsterList.phoneName)) {
        this.$toast("手机号码格式不正确");
        return;
      }
      // 控制注册发送验证码按钮的状态值和文字
      this.sendCodeStatus1 = false;
      var count = 60;
      var timer = null;
      var timer = setInterval(() => {
        count--;
        this.registerSendCodeText = count + "秒后重新发送";
        if (count <= 0) {
          this.registerSendCodeText = "获取验证码";
          this.sendCodeStatus1 = true;
          clearInterval(timer);
          timer = null;
        }
      }, 1000);
    },
    // 忘记密码 切换密码框 类型
    forgetClickRightIcon(flag) {
      if (flag) {
        if (this.forgetPasswordList.forgetPassword) {
          this.forgetPasswordList.forgetPassword = false;
          this.forgetPasswordList.passwordType = "text";
          this.forgetPasswordList.eyes = "eye-o";
        } else {
          this.forgetPasswordList.forgetPassword = true;
          this.forgetPasswordList.passwordType = "password";
          this.forgetPasswordList.eyes = "closed-eye";
        }
      } else {
        if (this.forgetPasswordList.forgetAginPassword) {
          this.forgetPasswordList.forgetAginPassword = false;
          this.forgetPasswordList.aginPasswordType = "text";
          this.forgetPasswordList.aginEyes = "eye-o";
        } else {
          this.forgetPasswordList.forgetAginPassword = true;
          this.forgetPasswordList.aginPasswordType = "password";
          this.forgetPasswordList.aginEyes = "closed-eye";
        }
      }
    },
    // 忘记密码 获取验证码
    sendCode2() {
      // 提示
      let resPhoneName = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!resPhoneName.test(this.forgetPassword.phoneName)) {
        this.$toast("手机号码格式不正确");
        return;
      }
      // 控制注册发送验证码按钮的状态值和文字
      this.sendCodeStatus2 = false;
      var count = 60;
      var timer = null;
      var timer = setInterval(() => {
        count--;
        this.forgetSendCodeText = count + "秒后重新发送";
        if (count <= 0) {
          this.forgetSendCodeText = "获取验证码";
          this.sendCodeStatus2 = true;
          clearInterval(timer);
          timer = null;
        }
      }, 1000);
    },
    // 注册 或者 忘记密码 确定按钮
    confirm() {
      if (this.activeName1 == "c") {
        // 提示 对象
        let rules = {
          phoneName: {
            res: /^1[3|4|5|7|8][0-9]{9}$/,
            toast: "手机号格式不正确",
          },
          password: {
            res: /^[0-9A-Za-z]{6,}$/,
            toast: "密码格式不正确",
          },
          aginPassword: {
            res: /^[0-9A-Za-z]{6,}$/,
            toast: "确认密码格式不正确",
          },
          companyName: {
            res: /\S/,
            toast: "公司名不能为空",
          },
          references: {
            res: /\S/,
            toast: "推荐人不能为空",
          },
          registerCode: {
            res: /\d{6}/,
            toast: "验证码格式不正确",
          },
        };
        // 验证 正则 的方法
        for (const key in this.regitsterList) {
          for (const key1 in rules) {
            if (key == key1) {
              if (!rules[key1].res.test(this.regitsterList[key])) {
                this.$toast(rules[key1].toast);
                return;
              }
            }
          }
        }
        // 两次密码不一致 提示
        if (this.regitsterList.password != this.regitsterList.aginPassword) {
          this.$toast("两次密码不一致");
          return;
        }
        // 请求 注册 确定按钮
        console.log("注册!!!!!!!!!!!");
      } else {
        // 提示 对象
        let rules = {
          phoneName: {
            res: /^1[3|4|5|7|8][0-9]{9}$/,
            toast: "手机号格式不正确",
          },
          password: {
            res: /^[0-9A-Za-z]{6,}$/,
            toast: "密码格式不正确",
          },
          aginPassword: {
            res: /^[0-9A-Za-z]{6,}$/,
            toast: "确认密码格式不正确",
          },
          forgetCode: {
            res: /\d{6}/,
            toast: "验证码格式不正确",
          },
        };
        for (const key in this.forgetPassword) {
          for (const key1 in rules) {
            if (key == key1) {
              if (!rules[key1].res.test(this.forgetPassword[key])) {
                this.$toast(rules[key1].toast);
                return;
              }
            }
          }
        }
        // 两次密码不一致 提示
        if (this.forgetPassword.password != this.forgetPassword.aginPassword) {
          this.$toast("两次密码不一致");
          return;
        }
        // 请求 忘记密码 确定按钮
        // console.log("忘记密码 确定 !!!!!!!!!!!!!");
      }
    },
    //设置localStorage
    setCookie(c_name, c_pwd) {
      localStorage.setItem("userName", c_name);
      localStorage.setItem("passWorld", c_pwd);
    },
    //读取localStorage
    getCookie() {
      if (localStorage.getItem("userName") != null) {
        this.isChecked = true;
        this.checked = true;
        // 解密 账号
        var bytesUserName = CryptoJS.AES.decrypt(localStorage.getItem("userName"), "userName");
        var originalUserName = bytesUserName.toString(CryptoJS.enc.Utf8);
        this.username = originalUserName;
        // 解密 密码
        var bytesPassWorld = CryptoJS.AES.decrypt(localStorage.getItem("passWorld"), "passWord");
        var originalpassWorld = bytesPassWorld.toString(CryptoJS.enc.Utf8);
        this.password = originalpassWorld;

        this.testRules();
      }else{
          this.checked = false;
      }
    },
    //清除localStorage
    clearCookie() {
      localStorage.removeItem('userName');
      localStorage.removeItem('passWorld');
    },
  },
};
</script>

<style lang="less">
.login {
  background: #fff;
  .bg {
    background: #409eff;
    width: 100%;
    height: 220px;
    padding-top: 40px;
    .logoImg {
      width: 100px;
      height: 100px;
      background: url("../assets/img/sigaoyi.png");
      background-repeat: no-repeat;
      background-size: cover;
      margin-left: calc(50% - 50px);
    }
  }
  .register {
    margin-top: -100px;
    width: 90%;
    margin-left: 5%;
    .van-tabs__wrap {
      .van-tabs__nav {
        background: transparent;
      }
      .van-tabs__line {
        width: 55px;
      }
    }
    .van-tabs__content {
      margin-top: 15px;
      .van-tab__pane {
        .van-form {
          padding: 15px;
          box-shadow: 0 0 4px rgba(154, 154, 154, 0.68);
          border-radius: 6px;
          background: #fff;
          .van-cell {
            line-height: 30px;
            .van-cell__title {
              width: 40px;
              color: #409eff;
            }
            input {
              color: #409eff;
            }
            input:-webkit-autofill {
              background-color: #409eff;
              -webkit-text-fill-color: #409eff;
              //   background-image: none;
              transition: background-color 50000s ease-in-out 0s;
            }
            .van-field__right-icon {
              color: #409eff;
            }
            .van-icon-clear {
              color: #409eff;
            }
          }
        }
        &:nth-child(2) {
          .van-form {
            .van-cell {
              line-height: 30px;
              .van-cell__title {
                width: 60px;
              }
              .van-field__button {
                margin-top: -10px;
              }
            }
          }
        }
      }
    }
    .remember {
      padding: 15px 0;
      div {
        &:first-child {
          color: #409eff;
        }
        &:nth-child(2) {
          display: flex;
          span {
            font-size: 13px;
            color:#409eff;
            &:nth-child(2) {
              margin-left: 4px;
            }
          }
        }
      }
    }
    .btn {
      margin: 15px;
      button {
        background: #409eff;
        border: 1px solid #409eff;
        margin-top: 40px;
        letter-spacing: 4px;
        font-weight: normal;
        font-size: 14px;
        height: 40px;
        &.active {
          background: #81b7f1;
          border: 1px solid #81b7f1;
        }
      }
    }
  }
  .no-user {
    padding: 0 32px;
    color: #409eff;
  }
  .check {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 80px;
    color: #409eff;
    font {
      color: #999;
      margin-left: 4px;
    }
    .van-icon {
      border: 1px solid #409eff;
    }
    &.active {
      animation: checked 800ms infinite;
    }
    @keyframes checked {
      0% {
        background-color: #e9e9e9;
      }
      25% {
        background-color: #fff;
      }
      50% {
        background-color: #e9e9e9;
      }
      75% {
        background-color: #fff;
      }
      100% {
        background-color: #e9e9e9;
      }
    }
  }
  .register1 {
    position: relative;
    .van-tabs {
      margin-top: -110px;
      .van-tabs__content {
        width: 90%;
        margin-left: 5%;
        margin-top: 15px;
        .van-tab__pane {
          .van-form {
            padding: 15px;
            box-shadow: 0 0 4px rgba(154, 154, 154, 0.68);
            background: #fff;
            border-radius: 6px;
            .van-cell {
              .van-cell__title {
                width: 60px;
                color: #409eff;
                text-align: right;
                margin-right: 30px;
              }
              input {
                color: #409eff;
              }
              input:-webkit-autofill {
                background-color: #409eff;
                -webkit-text-fill-color: #409eff;
                transition: background-color 50000s ease-in-out 0s;
              }
              .van-field__right-icon {
                color: #409eff;
              }
              .van-icon-clear {
                color: #409eff;
              }
              &:last-child {
                line-height: 30px;
                .van-cell__title {
                  width: 60px;
                }
                .van-field__button {
                  margin-top: -10px;
                }
              }
            }
          }
        }
      }
      .btn {
        margin-top: 30px;
        button {
          background: #409eff;
          border: 1px solid #409eff;
          letter-spacing: 4px;
          font-weight: normal;
          font-size: 14px;
          height: 40px;
        }
      }
      .back {
        text-align: center;
        margin-top: 30px;
        button {
          height: 35px;
          width: 35px;
          border-radius: 50%;
          border: none;
          background-color: #409eff;
          i {
            margin-top: 2px;
          }
        }
      }
    }
  }
}
</style>