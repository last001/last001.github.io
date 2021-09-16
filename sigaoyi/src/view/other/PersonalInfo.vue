<template>
  <div class="personalSet">
    <div class="main" v-title data-title="个人信息"></div>
    <div class="box">
      <div class="personalInfo" >
        <div class="dandruff">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>其他功能</el-breadcrumb-item>
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="besaInfo">
          <div class="title">基本信息</div>
          <div class="v-besainfo">
            <div class="header">
              <span>头像：</span>
              <div class="img">
                <img src="../../assets/img/defaultAcatar.jpg" alt="" />
                <div class="loadingWrap" v-show="loadHeadStatus"></div>
              </div>
              <div class="btn">
                <el-button type="primary">上传</el-button>
                <input
                  type="file"
                  accept="image/*"
                  ref="acatarSrc"
                  @change="uploadHead($event)"
                />
              </div>
              <div class="exitLogin" @click="confirm()">
                <el-button>退出登陆</el-button>
              </div>
              <div class="cancel" @click="cancel()">
                <el-button>注销账号</el-button>
              </div>
            </div>
            <div class="nickName">
              <span>昵称：</span>
              <div class="val">{{ infoData.userName }}</div>
            </div>
            <div class="number">
              <span>编号：</span>
              <div class="val">{{ infoData.id + 10850 }}</div>
            </div>
            <div class="userName">
              <span>用户名：</span>
              <div class="val">{{ infoData.userName }}</div>
            </div>
            <div class="name">
              <span>姓名：</span>
              <input type="text" placeholder="请输入您的名字" v-model="name" />
              <el-button type="primary" @click="saveName()">保存</el-button>
            </div>
            <div class="email">
              <span>邮箱：</span>
              <div class="val" v-show="emailStatus">{{ infoData.mail }}</div>
              <input
                class="emailVal"
                type="text"
                v-show="!emailStatus"
                placeholder="请输入邮箱"
              />
              <div class="text" @click="changeEmail()">{{ emailText }}</div>
            </div>
            <div class="phone">
              <span>手机号码：</span>
              <div class="val">{{ infoData.phoneNumber }}</div>
              <div class="text" @click="unbundlingStatus = true">
                更换手机号码
              </div>
            </div>
            <div class="authority">
              <span>权限：</span>
              <div class="val">{{ infoData.levelName }}</div>
            </div>
          </div>
        </div>
        <div class="resetPasswold">
          <div class="title">重置密码</div>
          <div class="v-resetPasswold">
            <div class="oldPasswold">
              <span>旧密码：</span>
              <input
                type="text"
                placeholder="请输入旧密码"
                v-model="pasList.oldPasswold"
                @keyup.enter="savePasswold()"
              />
            </div>
            <div class="newPasswold">
              <span>新密码：</span>
              <input
                type="text"
                placeholder="请输入新密码"
                v-model="pasList.newPasswold"
                @keyup.enter="savePasswold()"
              />
            </div>
            <div class="againNewPasswold">
              <span>确认新密码：</span>
              <input
                type="text"
                placeholder="请再次输入新密码"
                v-model="pasList.againNewPasswold"
                @keyup.enter="savePasswold()"
              />
            </div>
            <div class="resetCode">
              <input
                type="text"
                placeholder="请输入验证码"
                v-model="pasList.sendCode"
              />
              <el-button
                type="primary"
                @click="sendCodeStatus && sendInfoCode()"
                >{{ sendText }}</el-button
              >
            </div>
            <div class="btn">
              <el-button type="primary" @click="savePasswold()">保存</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="blurry" v-show="ExitShow">
      <div class="face">
        <div class="blu-top">确定退出登录吗?</div>
        <div class="blu-bottom clearfix">
          <!-- <button class="fl" @click="noExit">否</button>
          <button class="fr" @click="yesExit">是</button> -->
          <div @click="noExit">取消</div>
          <div @click="yesExit">确认</div>
        </div>
      </div>
    </div>
    <!-- 更换手机face -->
    <el-dialog
      title="解绑手机号码"
      :visible.sync="unbundlingStatus"
      width="22%"
      center
      custom-class="unbundling"
    >
      <div class="content">
        <div class="text">{{ tipsText }}</div>
        <div class="int">
          <input
            type="text"
            placeholder="请输入验证码"
            @keyup.enter="clickReplace()"
            v-model="vcode"
          />
          <button @click="changePhoneStatus && changePhone()">
            {{ valCodeText }}
          </button>
        </div>
        <div class="problem" @click="reasonStatus = true">无法接收验证码?</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clickCacel()">取 消</el-button>
        <el-button type="primary" @click="clickReplace()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 无法接受验证码提示face -->
    <el-dialog
      title="无法接收验证码原因可能有其下"
      :visible.sync="reasonStatus"
      width="30%"
      center
      custom-class="reason"
    >
      <div class="content">
        <div class="tips">
          一·网络延时。<br />
          二·是当地网关的原因，短信网管拥堵或出现异常。<br />
          三·手机内存不足，信息存储已满。<br />
          四·手机欠费或者停机。<br />
          五·手机安全软件设置了短信黑名单。<br />
          六·当天手机发送的信息超过最高短息条数的限制。<br />
          七·手机出现故障。<br />
          八·浏览器隐私设置。<br />
          九·该用户手机号码被运营商屏蔽。<br />
          十·手机业务不支持。
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reasonStatus = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 输入新手机号码face -->
    <el-dialog
      title="绑定新手机"
      :visible.sync="bundlingStatus"
      width="22%"
      center
      custom-class="bundling"
    >
      <div class="content">
        <div class="text" :style="{ marginLeft: leftInt + 'px' }">
          {{ newText }}
        </div>
        <div class="int">
          <input
            type="text"
            placeholder="请输入手机号码"
            @keyup.enter="newChangePhoneStatus && newChangePhone()"
            v-model="phone"
          />
        </div>
        <div class="int2">
          <input
            type="text"
            placeholder="请输入验证码"
            @keyup.enter="newSetPhone()"
            v-model="newVcode"
          />
          <button @click="newChangePhoneStatus && newChangePhone()">
            {{ newValCodeText }}
          </button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newCacel()">取 消</el-button>
        <el-button type="primary" @click="newSetPhone()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <footerDiv></footerDiv> -->
  </div>
</template>
<script>
// navbar 导航栏
// import footerDiv from "@/components/footer.vue";
import "../../assets/less/personal/personalInfo.less";
import uploadFiles from "../../assets/js/uploadFile";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");

export default {
  data() {
    return {
      infoData: {
          avatar:require("../../assets/img/defaultAcatar.jpg"),
      },
      //   名字
      name: "",
      // 修改邮箱状态值
      emailStatus: true,
      emailText: "修改",
      //   发送验证码按钮内容
      sendText: "发送验证码",
      //   发送验证码按钮状态值
      sendCodeStatus: true,
      // 点击更换手机号弹出层状态值
      vcode: "",
      tipsText: "点击按钮发送验证码",
      unbundlingStatus: false,
      valCodeText: "发送验证码",
      changePhoneStatus: true,
      Num: "60",
      timer: null,
      // 无法接受验证码 弹出层 状态值
      reasonStatus: false,
      // 确认手机号码
      newText: "请输入设置的手机号码及验证码",
      leftInt: -83,
      bundlingStatus: false,
      phone: "",
      newChangePhoneStatus: true,
      newVcode: "",
      newValCodeText: "获取验证码",
      newTiimer: null,
      newNum: 60,
      //   密码的数组
      pasList: {
        oldPasswold: "",
        newPasswold: "",
        againNewPasswold: "",
        sendCode: "",
      },
      //   上传头像loading状态值
      loadHeadStatus: false,
      // 退出登陆状态值
      ExitShow: false,
    };
  },
  created() {
    this.$nextTick(() => {
      this.getInfoData();
    });
  },
  components: {
    // footerDiv,
  },
  computed: {
    ...homeState(["WstateStatus", "num", "headList", "InfoData"]),
  },
  methods: {
    // 获取个人信息
    getInfoData() {
      this.infoData = this.InfoData;
      if (sessionStorage.getItem("token") == undefined) {
        alert("请先登录!");
        this.$router.push({ name: "Login" });
        return;
      }
      if (this.InfoData.id == undefined) {
        alert("登陆时间过期,请重新登陆!");
        sessionStorage.removeItem("token");
        this.$router.push({ name: "Login" });
        return;
      }
      const loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      if (this.InfoData.statu == "0") {
        this.InfoData["levelName"] = "超级管理员";
      } else if (this.InfoData.statu == "1") {
        this.InfoData["levelName"] = "管理员";
      } else {
        this.InfoData["levelName"] = "普通账号";
      }
      setTimeout(() => {
        loading.close();
      }, 500);
    },
    // 点击退出登陆
    confirm() {
      this.ExitShow = true;
    },
    // 取消登陆
    noExit() {
      this.ExitShow = false;
    },
    // 确定退出登陆
    yesExit() {
      let loading = this.$loading({
        lock: false,
        text: "退出登录中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      sessionStorage.removeItem("token");
      this.$notify({
        title: "请求成功",
        message: "退出登录成功",
        type: "success",
        offset: 65,
      });
      setTimeout(() => {
        loading.close();
        this.noExit();
        this.$router.push({ name: "Login" });
        console.log("this.InfoData 退出登陆 ==>", this.InfoData);
      }, 500);
    },
    // 点击注销账号
    cancel() {
      this.ExitShow = true;
    },
    // 点击获取更换手机的验证码
    changePhone() {
      this.changePhoneStatus = false;
      this.tipsText = `我们已经向${this.infoData.phoneNumber}号码发送了验证码，注意查收！`;
      this.Num = 60;
      this.timer = setInterval(() => {
        this.Num--;
        this.valCodeText = this.Num + "s重新发送";
        if (this.Num <= 0) {
          clearInterval(this.timer);
          this.timer = null;
          //   "发送验证码";
          this.valCodeText = "发送验证码";
          this.changePhoneStatus = true;
        }
      }, 1000);
    },
    // 取消更换
    clickCacel() {
      this.unbundlingStatus = false;
      if (this.Num < 0) {
        this.tipsText = "点击按钮发送验证码";
      }
    },
    // 确定更换
    clickReplace() {
      let code = /^\d{6}$/;
      if (!code.test(this.vcode)) {
        this.$message({
          message: "验证码格式不正确",
          center: true,
          type: "error",
          duration: 800,
        });
        return;
      }

      setTimeout(() => {
        this.unbundlingStatus = false;
        clearInterval(this.timer);
        this.timer = null;
        this.tipsText = "点击按钮发送验证码";
        this.valCodeText = "发送验证码";
        this.vcode = "";
        this.changePhoneStatus = true;
      }, 100);
      this.bundlingStatus = true;
    },
    // 设置新的手机号码
    newChangePhone() {
      let res = /^1[3|4|5|7|8]\d{9}$/;
      if (!res.test(this.phone)) {
        this.$message({
          message: "手机号码格式不正确！",
          center: true,
          type: "error",
          duration: 800,
        });
        return;
      }

      this.newText = `我们已经向${this.phone}号码发送了验证码，注意查收！`;
      this.leftInt = 0;
      this.newChangePhoneStatus = false;
      this.newNum = 60;
      this.newTimer = setInterval(() => {
        this.newNum--;
        this.newValCodeText = this.newNum + "s重新获取";
        if (this.newNum <= 0) {
          clearInterval(this.newTimer);
          this.newTimer = null;
          //   "发送验证码";
          this.newText = "请输入设置的手机号码及验证码";
          this.newValCodeText = "获取验证码";
          this.newChangePhoneStatus = true;
        }
      }, 1000);
    },
    // 取消绑定新手机
    newCacel() {
      this.bundlingStatus = false;
      if (this.newNum < 0) {
        this.newValCodeText = "获取验证码";
        this.newText = "请输入设置的手机号码及验证码";
      }
    },
    // 确定绑定新手机
    newSetPhone() {
      let reg = /^\d{6}$/;
      if (!reg.test(this.newVcode)) {
        this.$meesgea({
          message: "邮箱格式不正确！",
          center: true,
          duration: 800,
          type: "error",
        });
        return;
      }
      //  拿值 发起请求
      console.log("确定绑定新手机!!!");
    },
    // 上传头像
    uploadHead(e) {
      let files = e.target.files[0];
      console.log("files ==>", files);
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", files);
      this.loadHeadStatus = true;
      this.$axios(uploadFiles.uploadFile(formData))
        .then((result) => {
          this.$refs.acatarSrc.value = null;
          this.loadHeadStatus = false;
          console.log("result ==>", result);
          if (result.data.Code == "200") {
            this.InfoData.avatar = this.infoData.avatar = result.data.imgsURL;
            let list = {
              src: result.data.imgsURL,
              isActive: false,
            };
            this.setHeadList(list);
            console.log("this.headList ==>", this.headList);
            this.$notify({
              title: "请求成功",
              message: "上传头像成功",
              type: "success",
              offset: 50,
            });
          } else {
            this.$notify({
              title: "请求失败",
              message: "上传头像失败",
              type: "warning",
              offset: 50,
            });
          }
        })
        .catch((err) => {
          this.$refs.acatarSrc.value = null;
          this.loadHeadStatus = false;
          console.log("err ==>", err);
          this.$notify({
            title: "请求错误",
            message: "系统服务繁忙.请稍后再试!",
            type: "error",
            offset: 50,
          });
        });
    },
    //保存名字
    saveName() {
      console.log("this.name ==>", this.name);
    },
    // 修改邮箱
    changeEmail() {
      if (this.emailStatus) {
        this.emailStatus = false;
        this.emailText = "完成";
      } else {
        // 拿值 请求 修改
        this.emailStatus = true;
        this.emailText = "修改";
      }
    },
    // 点击发送验证码
    sendInfoCode() {
      this.sendCodeStatus = false;
      let Num = 60;
      this.$message({
        center: true,
        message: `我们已经向${this.infoData.phoneNumber}发送验证码,请注意查收!`,
        type: "success",
        duration: 1200,
      });
      let timer = null;
      timer = setInterval(() => {
        Num--;
        this.sendText = Num + "s重新发送";
        if (Num <= 0) {
          clearInterval(timer);
          timer = null;
          //   "发送验证码";
          this.sendText = "发送验证码";
          this.sendCodeStatus = true;
        }
      }, 1000);
    },
    // 修改密码保存按钮
    savePasswold() {
      // 只要有一个为空
      for (const key in this.pasList) {
        if (this.pasList[key] == "") {
          if (key == "oldPasswold") {
            this.$message({
              message: "旧密码不能为空",
              center: true,
              type: "warning",
              duration: 800,
            });
            return;
          } else if (key == "newPasswold") {
            this.$message({
              message: "新密码不能为空",
              center: true,
              type: "warning",
              duration: 800,
            });
            return;
          } else if (key == "againNewPasswold") {
            this.$message({
              message: "确认新密码不能为空",
              center: true,
              type: "warning",
              duration: 800,
            });
            return;
          } else {
            this.$message({
              message: "验证码不能为空",
              center: true,
              type: "warning",
              duration: 800,
            });
            return;
          }
        }
      }
      // 新旧密码相同
      if (this.pasList.oldPasswold == this.pasList.newPasswold) {
        this.$message({
          message: "新密码和旧密码不能相同",
          center: true,
          type: "warning",
          duration: 800,
        });
        return;
      }
      //  新密码和确认密码不同
      if (this.pasList.newPasswold != this.pasList.againNewPasswold) {
        this.$message({
          message: "输入的两次密码不一致",
          center: true,
          type: "warning",
          duration: 800,
        });
        return;
      }
      //   验证验证码是否为6位数
      let code = /^\d{6}$/;
      if (!code.test(this.pasList.sendCode)) {
        this.$message({
          message: "验证码格式不正确",
          center: true,
          type: "warning",
          duration: 800,
        });
        return;
      }
      // 发起请求....
      console.log("this.pasList ==>", this.pasList);
    },
    ...homeActions(["setWstateStatus", "setNum", "setHeadList"]),
  },
};
</script>