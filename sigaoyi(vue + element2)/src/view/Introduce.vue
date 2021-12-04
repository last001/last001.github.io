<template>
  <div class="introduce">
    <div class="btn" :class="scrollTop > 110 ? 'active' : ''">
      <div class="btn_img">
        <img src="../assets/img/icon.png" alt="" />
      </div>
      <div class="btn_text">
        <span>思高易跨境电商</span>
        <span>Sigaoyi Network Technology Co.,Ltd</span>
      </div>
      <el-button type="primary" @click="ToLogin">登 陆</el-button>
      <el-button type="default" @click="ToRegister">注 册</el-button>
    </div>
    <div class="btn_create">
      <el-button type="primary" @click="ToLogin">登 陆</el-button>
      <el-button type="default" @click="ToRegister">注 册</el-button>
    </div>
    <!-- top bottom -->
    <div class="clickToTop" :style="{ opacity: opacity }" @click="toTop()">
      <i class="el-icon-caret-top"></i>
    </div>
    <div
      class="clickToButtom clickToTop"
      :style="{ opacity: opacity }"
      @click="toBottom()"
    >
      <i class="el-icon-caret-bottom"></i>
    </div>
    <div class="one">
      <img src="../assets/img/001.png" alt="" />
    </div>
    <div class="two">
      <img src="../assets/img/002.png" alt="" />
    </div>
    <div>
      <img src="../assets/img/003.png" alt="" />
    </div>
    <div>
      <img src="../assets/img/004.png" alt="" />
    </div>
    <div>
      <img src="../assets/img/005.png" alt="" />
    </div>
    <div>
      <img src="../assets/img/006.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollTop: "",
      opacity: 0,
    };
  },
  created() {
    this.H = document.documentElement.clientHeight;
  },
  mounted() {
    window.addEventListener("scroll", this.lisentScroll);
  },
  destroyed() {
    document.removeEventListener("scroll", this.lisentScroll);
  },
  methods: {
    ToLogin() {
      this.$router.push({ name: "Login" });
    },
    ToRegister() {
      this.$router.push({ name: "Register" });
    },
    // 监听屏幕 滚动
    lisentScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      this.scrollTop > 200 ? (this.opacity = 1) : (this.opacity = 0);
    },
    // 点击图标window.scroll = 0
    toTop() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      let timer = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 400;
        if (top <= 0) {
          clearInterval(timer);
        }
      }, 20);
    },
    // 点击图标window.scroll = docuemnt.body.clientHeight
    toBottom() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      let timer = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top += 400;
        if (top >= document.body.clientHeight) {
          clearInterval(timer);
        }
      }, 20);
    },
  },
};
</script>

<style lang="less" scoped>
.introduce {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  .btn_create {
    .el-button--primary {
      padding: 14px 32px;
      position: absolute;
      right: 210px;
      top: 15px;
      background-color: #fff;
      border: 1px solid #ad0303;
      color: #000;
      transition: all 0.3s;

      &:hover {
        background-color: #ad0303;
        border: 1px solid #fff;
        color: #fff;
      }
    }
    .el-button--default {
      position: absolute;
      right: 85px;
      top: 15px;
      padding: 14px 32px;
      border-color: #fff;
      color: #fff;
      transition: all 0.3s;
      background-color: #ad0303;

      &:hover {
        border-color: #fff;
        background-color: #fff;
        color: #000;
      }
    }
  }

  .btn {
    position: fixed;
    left: 0;
    top: -72px;
    height: 72px;
    background: #a22020;
    width: 100%;
    transition: top 0.3s;
    .btn_img {
      position: absolute;
      left: 100px;
      top: 15px;
      img {
        width: 42px;
        height: 42px;
      }
    }
    .btn_text {
      position: absolute;
      left: 152px;
      top: 15px;
      span {
        color: #fff;
        display: block;
        font-size: 17px;
        &:first-child {
          font-size: 22px;
          font-weight: 600;
          line-height: 24px;
        }
      }
    }
    button {
      display: none;
    }
    &.active {
      top: 0;

      .el-button--primary {
        padding: 13px 32px;
        position: absolute;
        display: block;
        right: 210px;
        top: 15px;
        background-color: #fff;
        border: 1px solid #ad0303;
        color: #000;
        transition: all 0.3s;

        &:hover {
          background-color: #ad0303;
          border: 1px solid #fff;
          color: #fff;
        }
      }
      .el-button--default {
        position: absolute;
        display: block;
        right: 85px;
        top: 15px;
        padding: 13px 32px;
        border-color: #fff;
        color: #fff;
        transition: all 0.3s;
        background-color: #ad0303;

        &:hover {
          border-color: #fff;
          background-color: #fff;
          color: #000;
        }
      }
    }
  }

  .clickToTop {
    color: #a22020;
    position: fixed;
    right: 55px;
    bottom: 125px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff;
    text-align: center;
    line-height: 47px;
    box-shadow: 0 0 10px #ccc;
    transition: opacity 0.3s;
    cursor: pointer;

    &:hover {
      background: #f5f5f5;
    }

    i {
      font-size: 25px;
    }
  }

  .clickToButtom {
    right: 55px;
    bottom: 75px;
  }
  div {
    img {
      width: 100%;
      height: 100%;
      vertical-align: bottom;
    }
  }
}
</style>