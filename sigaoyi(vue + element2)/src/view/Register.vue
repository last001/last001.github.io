<template>
  <div class="login" :style="{ height: screenHeight + 'px' }">
    <div class="main" v-title data-title="用户登陆"></div>
    <div class="box active" ref="box">
      <div class="selector">
        <div
          class="log"
          v-for="(item, index) in setText"
          :key="index"
          @click="setTargger(item)"
          :class="{ active: item.isActive }"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="showFace" v-if="setShow">
        <el-form
          :model="loginRuleForm"
          status-icon
          :rules="rules"
          ref="loginRuleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="userName">
            <el-input
              prefix-icon="el-icon-user"
              v-model="loginRuleForm.userName"
              placeholder="请输入用户名"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              v-model="loginRuleForm.password"
              autocomplete="off"
              show-password
              placeholder="请输入密码"
              oncopy="return false"
              @keyup.enter.native="enterLogin && enterInput()"
            ></el-input>
          </el-form-item>
          <div class="rightNow" @click="toRegister">立即注册！</div>
          <div class="registeBox">
            <el-form-item>
              <el-button
                type="primary"
                @click="clickLogin && submitFormLogin('loginRuleForm')"
                :icon="iconSrc"
                :class="isLogin ? 'active' : ''"
                >登陆</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="showFace" v-else>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input
              type="text"
              v-model.number="ruleForm.userName"
              placeholder="请输入用户名"
              clearable
              @blur="getRepeatName()"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
              show-password
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
              show-password
              placeholder="请再次输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="公司名" prop="companyName" v-show="radioShow">
            <el-input
              type="text"
              v-model.number="ruleForm.companyName"
              placeholder="请输入公司名"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input
              v-model="ruleForm.email"
              placeholder="请输入邮箱"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input
              type="text"
              v-model.number="ruleForm.phone"
              maxlength="11"
              placeholder="请输入手机号码"
              clearable
            ></el-input>
          </el-form-item>
          <div class="valcode">
            <el-form-item label="验证码" prop="valCode">
              <el-input
                type="age"
                v-model.number="ruleForm.valCode"
                maxlength="6"
                autocomplete="off"
                clearable
                placeholder="请输入验证码"
              ></el-input>
            </el-form-item>
            <el-row>
              <el-button @click="sendCodeStatus && sendCode()">{{
                sendCodeText
              }}</el-button>
            </el-row>
          </div>
          <el-form-item label="公司名" prop="recommend">
            <el-input
              type="text"
              v-model.number="ruleForm.recommend"
              placeholder="选填项"
              clearable
            ></el-input>
          </el-form-item>
          <div class="toLogin" :class="agreementIsActive ? 'active' : ''">
            <el-checkbox v-model="agreementChecked"></el-checkbox>
            <font @click="agreementChecked = !agreementChecked"
              >我已阅读并同意</font
            >
            <i @click="toAgreement">《ERP用户服务协议》</i>
          </div>
          <div class="toLogin1" :class="agreementIsActive1 ? 'active' : ''">
            <el-checkbox v-model="agreementChecked1"></el-checkbox>
            <font @click="agreementChecked1 = !agreementChecked1"
              >我愿意通过邮件、短信等方式接受最新的资讯</font
            >
          </div>
          <div class="registeBox">
            <el-form-item>
              <el-button
                type="primary"
                :class="clickRegister ? '' : 'active'"
                :icon="iconSrc"
                @click="clickRegister && submitForm('ruleForm')"
                >注册</el-button
              >
            </el-form-item>
            <span class="already"
              >已有账号？<i @click="toLogin">去登陆</i></span
            >
          </div>
        </el-form>
      </div>
    </div>
    <!-- <div class="gohome"></div> -->
    <!-- 使用帮助 -->
    <div class="toLinkVideo">
      <el-button type="primary" @click="toLink()">使用帮助</el-button>
    </div>
  </div>
</template>
<script>
import "../assets/less/login/login.css";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
// import { queryStr } from "../assets/js/qureyStr";
import qs from "qs";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  data() {
    return {
      // box 的高度
      boxH: "",
      DocHeight: "",
      screenHeight: "",
      // set内容
      setText: [
        // { title: "登陆", isActive: false, num: 1 },
        { title: "注册", isActive: true, num: 2 },
      ],
      // 显示面板状态
      setShow: false,
      //   登陆验证表单
      loginRuleForm: {
        userName: "",
        password: "",
      },
      rulesLogin: {
        userName: [{ validator: "", trigger: "blur" }],
        password: [{ validator: "", trigger: "blur" }],
      },
      // 登录按钮iconSrc
      iconSrc: "",
      //  点击登录按钮事件拦截状态值
      clickLogin: true,
      // enterLogin拦截状态值
      enterLogin: true,
      // 点击注册按钮事件拦截状态值
      clickRegister: true,
      //   点击登录按钮
      isLogin: false,
      //  个人 公司 radio
      radio: 1,
      //  radio状态
      radioShow: false,
      // 注册验证数组
      ruleForm: {
        userName: "",
        pass: "",
        checkPass: "",
        companyName: "",
        email: "",
        phone: "",
        valCode: "",
        recommend: "",
      },
      rules: {
        userName: [{ validator: "", trigger: "blur" }],
        pass: [{ validator: "", trigger: "blur" }],
        checkPass: [{ validator: "", trigger: "blur" }],
        companyName: [{ validator: "", trigger: "blur" }],
        email: [{ validator: "", trigger: "blur" }],
        phone: [{ validator: "", trigger: "blur" }],
        valCode: [{ validator: "", trigger: "blur" }],
        recommend: [{ validator: "", trigger: "blur" }],
      },
      sendCodeText: "获取验证码",
      sendCodeStatus: true,
      //   ONE
      agreementChecked: false,
      agreementIsActive: false,
      // TWO
      agreementChecked1: false,
      agreementIsActive1: false,
      // 屏幕高度
      timer: null,
      //  弹出层状态值
      tpisStatus: false,

      // 验证用户名 是否重复
      isRest: false,
      // 验证用户名 错误提示
      isRestmessage: "",
      // 验证 验证码
      valCodeTips: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    next();
  },
  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.codeResult();
    //   获取box的高度
    this.$nextTick(() => {
      this.boxH = this.$refs.box.offsetHeight / 2;

      document.title = "用户登陆";
      this.DocHeight = document.documentElement.clientHeight; //实时屏幕高度
      this.screenHeight = document.documentElement.clientHeight; //实时屏幕高度
    });
  },
  computed: {
    ...homeState(["InfoData", "companyData", "shopData", "CAPTCHA"]),
  },
  mounted() {},
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    //   goHome
    goHome() {
      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
        this.$router.push({ name: "Home" });
      }, 500);
    },
    //  点击切换 登陆 注册
    setTargger(item) {
      if (item.isActive) {
        return;
      }
      for (let i = 0; i < this.setText.length; i++) {
        this.setText[i].isActive = false;
      }
      item.isActive = true;

      if (item.num == 1) {
        this.setShow = true;
      } else {
        this.setShow = false;
      }
    },
    // 注册表单验证
    codeResult() {
      // 用户名
      this.rules.userName[0].validator = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入用户名"));
        } else if (this.isRest) {
          callback(new Error(this.isRestmessage));
        } else {
          callback();
        }
      };
      //   密码
      this.rules.pass[0].validator = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          if (this.ruleForm.checkPass !== "") {
            this.$refs.ruleForm.validateField("checkPass");
          }
          callback();
        }
      };
      //   确认密码
      this.rules.checkPass[0].validator = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      // 公司名
      this.rules.companyName[0].validator = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入公司名字"));
        } else {
          callback();
        }
      };
      // 邮箱
      let emailReg = new RegExp(
        "^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"
      );
      this.rules.email[0].validator = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入邮箱"));
        } else if (!emailReg.test(value)) {
          callback(new Error("邮箱格式不正确"));
        }
        callback();
      };
      //   手机号码
      let phoneReg = new RegExp("^1[3456789][0-9]{9}$");

      this.rules.phone[0].validator = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入手机号码"));
        } else if (!phoneReg.test(value)) {
          callback(new Error("手机号码格式不正确"));
        }
        callback();
      };
      //  验证码
      let valCodeReg = /^\d{6}$/;
      this.rules.valCode[0].validator = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入验证码"));
        } else if (!valCodeReg.test(value)) {
          callback(new Error("验证码格式不正确"));
        } else if (this.valCodeTips) {
          callback(new Error("验证码不正确"));
        } else {
          callback();
        }
      };
      //   // 推荐人
      //   this.rules.recommend[0].validator = (rule, value, callback) => {
      //     if (value === "") {
      //       callback(new Error("请输入推荐码"));
      //     } else {
      //       callback();
      //     }
      //   };
    },
    // 登陆表单验证
    codeLogin() {
      // 用户名
      this.rulesLogin.userName[0].validator = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入用户名"));
        } else {
          callback();
        }
      };
      //   密码
      this.rulesLogin.password[0].validator = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          callback();
        }
      };
    },
    // 点击发送验证码
    sendCode() {
      // 手机号码是否有填写
      let phoneReg = new RegExp("^1[3456789][0-9]{9}$");
      if (this.ruleForm.phone == "" || !phoneReg.test(this.ruleForm.phone)) {
        this.$refs.ruleForm.validateField("phone");
      } else {
        // 获取验证码
        this.sendCodeStatus = false;
        this.getApi();
      }
    },
    // 获取验证码 api=""
    getApi() {
      this.$axios({
        url: "/sigaoyi/Messages",
        method: "POST",
        params: {
          pholo: this.ruleForm.phone,
        },
      })
        .then((result) => {
          if (result.data.code == "200") {
            this.$notify({
              title: "请求成功",
              message: `我们已经向${this.ruleForm.phone}发送验证码,请注意查收!`,
              type: "success",
              offset: 50,
              duration: 8000,
            });
            this.setCAPTCHA(result.data.CAPTCHA);

            // 获取验证码
            this.sendCodeStatus = false;
            let Num = 60;
            let timer = null;
            timer = setInterval(() => {
              Num--;
              this.sendCodeText = Num + "s重新发送";
              if (Num <= 0) {
                clearInterval(timer);
                timer = null;
                //   "发送验证码";
                this.sendCodeText = "获取验证码";
                this.sendCodeStatus = true;
              }
            }, 1000);
          } else {
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 50,
            });
            this.sendCodeStatus = true;
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
          this.$notify({
            title: "请求错误",
            message: "系统繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
          this.sendCodeStatus = true;
        });
    },
    // 查询用户名 重复
    getRepeatName() {
      if (this.ruleForm.userName == "") {
        return;
      }
      this.$axios({
        url: "/sigaoyi/RepeatName",
        method: "POST",
        params: {
          userName: this.ruleForm.userName,
        },
      })
        .then((result) => {
          if (result.data.Code == "200") {
            this.isRest = false;
            this.isRestmessage = result.data.message;
          } else {
            this.isRest = true;
            this.isRestmessage = result.data.message;
          }
          this.$refs.ruleForm.validateField("userName");
        })
        .catch((err) => {
          console.log("err ==>", err);
        });
    },
    // 点击注册按钮
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          // 同意协议
          if (!this.agreementChecked) {
            this.agreementIsActive = true;
            setTimeout(() => {
              this.agreementIsActive = false;
            }, 1000);
            return;
          }
          if (!this.agreementChecked1) {
            this.agreementIsActive1 = true;
            setTimeout(() => {
              this.agreementIsActive1 = false;
            }, 1000);
            return;
          }

          this.addUser();
        }
      });
    },
    // 注册
    addUser() {
      if (this.ruleForm.valCode == this.CAPTCHA) {
        //  注册按钮 拦截
        this.clickRegister = false;
        this.iconSrc = "el-icon-loading";
        // 验证码 提示
        this.valCodeTips = false;
        let data = {
          password: this.ruleForm.pass,
          userName: this.ruleForm.userName,
          phone: this.ruleForm.phone,
          mail: this.ruleForm.email,
          company: this.ruleForm.recommend,
        };
        this.$axios({
          url: "/sigaoyi/addUser",
          method: "POST",
          params: data,
        })
          .then((result) => {
            this.clickRegister = true;
            this.iconSrc = "";
            if (result.data.Code == "200") {
              this.$notify({
                title: "请求成功",
                message: result.data.msg,
                type: "success",
                offset: 50,
              });
              setTimeout(() => {
                this.$router.push({ name: "Login" });
              }, 300);
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
            this.clickRegister = true;
            this.iconSrc = "";
            console.log("err ==>", err);
            this.$notify({
              title: "请求失败",
              message: "系统业务繁忙,请稍后再试",
              type: "error",
              offset: 50,
            });
          });
      } else {
        this.valCodeTips = true;
        this.$refs.ruleForm.validateField("valCode");
      }
    },
    // 点击登陆按钮
    submitFormLogin(formName) {
      if (this.loginRuleForm.userName == "") {
        this.$message({
          message: "账号不能为空",
          type: "warning",
          center: true,
          duration: 800,
        });
        return;
      }
      if (this.loginRuleForm.password == "") {
        this.$message({
          message: "密码不能为空!",
          type: "warning",
          center: true,
          duration: 800,
        });
        return;
      }
      this.clickLogin = false;

      this.iconSrc = "el-icon-loading";
      this.isLogin = true;
      // 获取IP地址
      let ip = localStorage.getItem("Ip");
      let cityname = localStorage.getItem("cityname");
      //   http://www.ec-sigaoyi.com/sugoiERP/UserLogin

      this.$axios({
        method: "POST",
        url: "/sigaoyi/NEWlogin1",
        params: {
          userName: this.loginRuleForm.userName,
          password: this.loginRuleForm.password,
          city: cityname,
          ip: ip,
        },
      })
        .then((result) => {
          setTimeout(() => {
            this.clickLogin = true;
            this.iconSrc = "";
            this.isLogin = false;
          }, 300);

          if (result.data.Code == "200") {
            setTimeout(() => {
              this.$notify({
                title: "请求成功",
                message: result.data.msg,
                type: "success",
                offset: 50,
              });
            }, 400);
            sessionStorage.setItem("token", true);
            let user = result.data.userinfo;
            user.avatar = "./static/img/defaultAcatar.0c4749e.jpg";
            user.balance = user.balance.toFixed(2);
            // 公司信息
            if (result.data.company != undefined) {
              this.setCompanData(result.data.company);
            } else {
              this.setCompanData({});
            }
            // 店铺信息
            if (result.data.qoo10shops != undefined) {
              this.setShopData(result.data.qoo10shops);
            } else {
              this.setShopData([]);
            }
            // 账号名字
            sessionStorage.setItem("userNumber", result.data.userinfo.userName);
            // 个人信息
            this.setInfoData(user);

            setTimeout(() => {
              this.$router.push({ name: "Home" });
            }, 200);
          } else if (result.data.Code == "300" || result.data.Code == "302") {
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 50,
            });
            setTimeout(() => {
              this.$router.push({ name: "References" });
            }, 300);
          } else {
            setTimeout(() => {
              this.$notify({
                title: "请求失败",
                message: result.data.msg,
                type: "warning",
                offset: 50,
              });
            }, 400);
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
          this.clickLogin = true;
          this.iconSrc = "";
          this.isLogin = false;

          this.$notify({
            title: "请求错误",
            message: "系统服务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // inputCenter
    enterInput() {
      if (this.loginRuleForm.userName == "") {
        this.$message({
          message: "账号不能为空!",
          type: "warning",
          center: true,
          duration: 800,
        });
        return;
      }
      if (this.loginRuleForm.password == "") {
        this.$message({
          message: "密码不能为空!",
          type: "warning",
          center: true,
          duration: 800,
        });
        return;
      }
      this.enterLogin = false;
      this.iconSrc = "el-icon-loading";
      this.isLogin = true;

      // 获取IP地址
      let ip = localStorage.getItem("Ip");
      let cityname = localStorage.getItem("cityname");

      this.$axios({
        method: "POST",
        url: "/sigaoyi/NEWlogin1",
        params: {
          userName: this.loginRuleForm.userName,
          password: this.loginRuleForm.password,
          city: cityname,
          ip: ip,
        },
      })
        .then((result) => {
          setTimeout(() => {
            this.enterLogin = true;
            this.iconSrc = "";
            this.isLogin = false;
          }, 300);
          if (result.data.Code == "200") {
            setTimeout(() => {
              this.$notify({
                title: "请求成功",
                message: result.data.msg,
                type: "success",
                offset: 50,
              });
            }, 400);
            sessionStorage.setItem("token", true);
            let user = result.data.userinfo;
            user.avatar = "./static/img/defaultAcatar.0c4749e.jpg";
            user.balance = user.balance.toFixed(2);
            // 公司信息
            if (result.data.company != undefined) {
              this.setCompanData(result.data.company);
            } else {
              this.setCompanData({});
            }
            // 店铺信息
            if (result.data.qoo10shops != undefined) {
              this.setShopData(result.data.qoo10shops);
            } else {
              this.setShopData([]);
            }
            // 账号名字
            sessionStorage.setItem("userNumber", result.data.userinfo.userName);
            // 个人信息
            this.setInfoData(user);
            setTimeout(() => {
              this.$router.push({ name: "Home" });
            }, 200);
          } else if (result.data.Code == "300" || result.data.Code == "302") {
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 50,
            });
            setTimeout(() => {
              this.$router.push({ name: "References" });
            }, 300);
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
          console.log("err ==>", err);
          this.enterLogin = true;
          this.iconSrc = "";
          this.isLogin = false;
          this.$notify({
            title: "请求错误",
            message: "系统服务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 去注册
    toRegister() {
      this.$router.push({ name: "Register" });
    },
    // 去登陆
    toLogin() {
      this.$router.push({ name: "Login" });
    },
    // 去 协议
    toAgreement() {
      let routeData = this.$router.resolve({
        path: "/agreement",
        query: {},
      });
      window.open(routeData.href, "_blank");
    },
    // 使用帮助
    toLink() {
      window.location.href = "http://www.ec-sigaoyi.com/";
    },
    // 屏幕高度
    getclientH() {
      this.timer = null;
      this.timer = setInterval(() => {
        this.screenHeight = document.documentElement.clientHeight;
      }, 400);
    },
    ...homeActions([
      "setInfoData",
      "setCompanData",
      "setShopData",
      "setCAPTCHA",
    ]),
  },
  watch: {
    screenHeight: "getclientH",
  },
};
</script>