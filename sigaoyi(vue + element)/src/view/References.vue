<template>
  <div class="references" :style="{ height: screenHeight + 'px' }">
    <div class="main" v-title data-title="填写推荐人信息"></div>
    <div class="box" ref="box">
      <div class="title">推荐人信息</div>
      <div class="referencesInfo">
        <el-form
          :model="referencesInfo"
          status-icon
          :rules="rules"
          ref="referencesInfo"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户账号" prop="userName">
            <el-input
              prefix-icon="el-icon-user"
              v-model="referencesInfo.userName"
              placeholder="请输入用户名"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              v-model="referencesInfo.password"
              autocomplete="off"
              show-password
              placeholder="请输入密码"
              oncopy="return false"
            ></el-input>
          </el-form-item>
          <el-form-item label="推荐人姓名" prop="referrer">
            <el-input
              prefix-icon="el-icon-user-solid"
              v-model="referencesInfo.referrer"
              placeholder="请输入姓名"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="推荐人编号" prop="referrerNumber">
            <el-input
              prefix-icon="el-icon-phone"
              v-model="referencesInfo.referrerNumber"
              placeholder="推荐人编号/联系方式"
              clearable
            ></el-input>
          </el-form-item>
          <div class="registeBox">
            <el-form-item>
              <el-button
                type="primary"
                size="medium"
                :icon="iconSrc"
                :class="isLogin ? 'active' : ''"
                @click="apply()"
                >申请</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div class="gohome" @click="goHome"></div>
  </div>
</template>

<script>
import "../assets/less/references/references.less";
export default {
  data() {
    return {
      screenHeight: "",
      //   登陆验证表单
      referencesInfo: {
        userName: "",
        password: "",
        referrer: "",
        referrerNumber: "",
      },
      //   验证规则
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
        referrer: [
          { required: true, message: "请输入推荐人姓名", trigger: "blur" },
        ],
        referrerNumber: [
          { required: true, message: "请输入推荐人编号", trigger: "blur" },
        ],
      },
      //申请按钮
      iconSrc: "",
      isLogin: false,
    };
  },
  created() {
    this.$nextTick(() => {
      this.screenHeight = document.documentElement.clientHeight; //实时屏幕高度
    });
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
    // 屏幕高度
    getclientH() {
      this.timer = null;
      this.timer = setInterval(() => {
        this.screenHeight = document.documentElement.clientHeight;
      }, 400);
    },
    // 申请
    apply() {
      // 提示
      if (this.referencesInfo.userName == "") {
        this.$message({
          message: "用户账号不能为空!",
          type: "warning",
          center: true,
          duration: 800,
        });
        return;
      }
      if (this.referencesInfo.password == "") {
        this.$message({
          message: "用户密码不能为空!",
          type: "warning",
          center: true,
          duration: 800,
        });
        return;
      }
      if (this.referencesInfo.referrer == "") {
        this.$message({
          message: "推荐人不能为空!",
          type: "warning",
          center: true,
          duration: 800,
        });
        return;
      }
      if (this.referencesInfo.referrerNumber == "") {
        this.$message({
          message: "推荐人编号/联系方式不能为空!",
          type: "warning",
          center: true,
          duration: 800,
        });
        return;
      }
      this.iconSrc = "el-icon-loading";
      this.isLogin = true;
      let data = this.referencesInfo;

      this.$axios({
        url: "/sigaoyi/referrerApplication",
        method: "POST",
        params: data,
      })
        .then((result) => {
          setTimeout(() => {
            this.iconSrc = "";
            this.isLogin = false;
          }, 300);
          if (result.data.Code == "200") {
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
            this.$router.push({ name: "Login" });
          } else {
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
          }
        })
        .catch((err) => {
          this.iconSrc = "";
          this.isLogin = false;
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
  },
  watch: {
    screenHeight: "getclientH",
  },
};
</script>

<style>
</style>