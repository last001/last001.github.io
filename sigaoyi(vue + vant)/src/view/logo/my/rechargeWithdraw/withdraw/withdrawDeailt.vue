<template>
  <div class="withdrawDeailt" :style="{ height: H + 'px' }">
    <div class="title">
      <van-nav-bar title="提现流程" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="status">
      <div class="text">
        <van-icon size="22" color="#409eff" name="checked" />
        <span class="v-text">提交成功</span>
      </div>
      <div class="step">
        <van-steps :active="active" active-color="#409eff">
          <van-step>已提交</van-step>
          <van-step>待审核</van-step>
          <van-step>提现到帐</van-step>
        </van-steps>
      </div>
      <div class="content">
        <div class="triangle"></div>
        <div class="v-content">
          <div>
            <span>提现方式</span>
            <span>提下金额</span>
          </div>
          <div>
            <span>提现金额</span>
            <span>1元</span>
            <div>
              <span>预计到账</span>
              <span>提现后24小时到账</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 屏幕高度
      H: "",
      active: 1,
    };
  },
  created() {
    this.H = document.documentElement.clientHeight - 46;
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>
<style lang="less" scoped>
/** /deep/ */
.withdrawDeailt {
  background: #fff;
  .title {
    /deep/ .van-nav-bar {
      .van-nav-bar__content {
        .van-nav-bar__left {
          left: -8px;
          i {
            color: #444;
          }
        }
      }
    }
  }
  .status {
    .text {
      width: 100%;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px 0;
      .v-text {
        font-size: 20px;
        margin-left: 8px;
      }
    }
    .step {
      padding: 0 15px;
    }
    .content {
      padding: 0 12px;
      margin-top: 15px;
      position: relative;

      &::after {
        content: "";
        display: block;
        width: 0px;
        height: 0px;
        border-bottom: 15px solid #fff;
        //   border-top: 15px solid transparent;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        position: absolute;
        left: 50%;
        top: -13px;
        margin-left: -10px;
      }

      &::before {
        content: "";
        display: block;
        width: 0px;
        height: 0px;
        border-bottom: 15px solid #d4d4d466;
        //   border-top: 15px solid transparent;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        position: absolute;
        left: 50%;
        top: -15px;
        margin-left: -10px;
        filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.2));
      }

      .v-content {
        position: relative;
        padding: 10px 13px;
        box-shadow: 0 0 8px #d4d4d4d2;
        // filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.2));
        border-radius: 4px;
        div {
          span {
            color: #999;
            &:nth-child(2) {
              color: #444;
              margin-left: 20px;
            }
          }
        }
      }
    }
  }
}
</style>