<template>
  <div class="account" :style="{ height: H + 'px' }">
    <div class="title">
      <van-nav-bar
        title="账户安全"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="bg"></div>
    <div class="change-unsubscribe">
      <div
        v-for="(item, index) in itemList"
        :key="index"
        @click="clickList(item)"
        class="clearfix"
      >
        <span class="fl">{{ item.text }}</span>
        <van-icon class="fr" name="arrow" />
      </div>
    </div>
    <div class="btn">
      <van-button type="info" round @click="exitLogin()" >退出登录</van-button>
    </div>
    <van-popup
      v-model="unsubscribeStatus"
      position="bottom"
      closeable
      :style="{ height: '33%' }"
    >
      <h3>修改密码</h3>
      <van-field
        v-model="passwordList.oldVal"
        clearable
        :type="passwordList.oldType"
        label="旧密码"
        :right-icon="passwordList.oldEyes"
        :placeholder="passwordList.oldPlaceholder"
        @click-right-icon="clickRightIcon('old')"
      />
      <van-field
        v-model="passwordList.newVal"
        clearable
        :type="passwordList.newType"
        label="新密码"
        :right-icon="passwordList.newEyes"
        :placeholder="passwordList.newPlaceholder"
        @click-right-icon="clickRightIcon('new')"
      />
      <button class="vant-btn" @click="confirm()">确认修改</button>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 屏幕高度
      H: "",
      itemList: [{ text: "修改密码" }, { text: "注销账号" }],
      //   修改账号状态
      unsubscribeStatus: false,
      //   新旧 密码
      passwordList: {
        oldVal: "",
        oldType: "password",
        oldEyes: "closed-eye",
        oldPlaceholder: "请输入旧密码",
        oldStatus: true,
        newVal: "",
        newType: "password",
        newEyes: "closed-eye",
        newPlaceholder: "请输入新密码",
        newStatus: true,
      },
    };
  },
  created() {
    this.H = document.documentElement.clientHeight;
  },
  methods: {
    //   返回上一级
    onClickLeft() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "600",
      });
      setTimeout(() => {
        this.$router.go(-1);
      }, 600);
    },
    // 注销账号 修改密码
    clickList(item) {
      if (item.text == "修改密码") {
        //   console.log("item.text ==>", item.text);
        this.unsubscribeStatus = true;
      } else {
        this.$dialog
          .confirm({
            title: "注销账号",
            message: "是否确认注销账号,一旦确认无法恢复!",
            confirmButtonColor: "#409eff",
            className: "accountDialog",
          })
          .then(() => {
            // on confirm
            this.$toast.loading({
              message: "正在注销...",
              forbidClick: true,
              loadingType: "spinner",
              duration: "600",
            });
            console.log("注销账号!!!");
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    // 退出登录
    exitLogin() {
      this.$dialog
        .confirm({
          title: "退出登录",
          message: "是否确认退出登录！",
          confirmButtonColor: "#409eff",
          className: "accountDialog",
        })
        .then(() => {
          this.$toast.loading({
            message: "退出中...",
            forbidClick: true,
            loadingType: "spinner",
            duration: "600",
          });
          sessionStorage.removeItem("infoData");
          setTimeout(() => {
            this.$router.push({ name: "Login" });
          }, 600);
        })
        .catch(() => {});
    },
    // 点击旧的密码input:[type]
    clickRightIcon(flag) {
      console.log("flag ==>", flag);
      if (flag == "old") {
        if (this.passwordList.oldStatus) {
          this.passwordList.oldType = "text";
          this.passwordList.oldEyes = "eye";
          this.passwordList.oldStatus = false;
        } else {
          this.passwordList.oldType = "password";
          this.passwordList.oldEyes = "closed-eye";
          this.passwordList.oldStatus = true;
        }
      } else {
        if (this.passwordList.newStatus) {
          this.passwordList.newType = "text";
          this.passwordList.newEyes = "eye";
          this.passwordList.newStatus = false;
        } else {
          this.passwordList.newType = "password";
          this.passwordList.newEyes = "closed-eye";
          this.passwordList.newStatus = true;
        }
      }
    },
    // 确认修改密码
    confirm() {
      console.log("this.passwordList.oldVal ==>", this.passwordList.oldVal);
      console.log("this.passwordList.newVal ==>", this.passwordList.newVal);
    },
  },
};
</script>

<style lang="less" scope>
.account {
  background: #f7f8fa;
  .bg {
    width: 100%;
    height: 120px;
    background: #409eff;
  }
  .change-unsubscribe {
    background: #fff;
    width: 90%;
    margin-left: 5%;
    border-radius: 6px;
    margin-top: -50px;
    div {
      padding: 18px;
      border-bottom: 1px solid #ddd;
      margin-left: 15px;
      margin-right: 15px;
      span {
        margin-left: -15px;
      }
      i {
        margin-right: -15px;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
  .btn {
    width: 90%;
    margin-left: 5%;
    margin-top: 100px;
    button {
     width: 100%;
    }
  }
}
.accountDialog {
  .van-dialog__header {
    font-weight: bold;
  }
}
.van-popup {
  h3 {
    padding-left: 12px;
  }

  .van-cell {
    padding: 10px 20px;
  }

  .van-popup__close-icon--top-right {
    top: 12px;
    right: 12px;
  }

  .vant-btn {
    width: 80%;
    margin-left: 10%;
    background: #409eff;
    color: #fff;
    text-align: center;
    border-radius: 20px;
    font-size: 13px;
    margin-top: 15px;
  }
}
</style>