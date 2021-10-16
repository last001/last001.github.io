<template>
  <div class="balance" :style="{height:H + 'px'}">
    <div class="title">
      <van-nav-bar
        right-text="明细"
        left-arrow
        @click-left="onClickLeft"
        @click-right="Jump"
      />
    </div>
    <div class="content">
        <div>你的余额账户(元)</div>
        <div class="number">{{infoData.balance}}</div>
        <div>元</div>
    </div>
    <div class="btn">
        <van-button type="warning" @click="Jump">充值</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        H:"",
        infoData:{
            balance:'0.00'
        },
    };
  },
  created() {
      this.H = document.documentElement.clientHeight;
      this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
  },
  methods: {
      // 返回   
      onClickLeft(){
          this.$router.back();
      },
      // Jump
      Jump(){
          this.$router.push({name:"RechargeWithdraw"});
      },   
  },
};
</script>

<style lang="less" scoped>
    .balance{
        background: url("../../../assets/img/balance.jpg") no-repeat;
        background-size: cover;
        .title{
            .van-hairline--bottom::after{
                border: none;
            }
           /deep/ .van-nav-bar__right{
                .van-nav-bar__text{
                    color: #409eff;
                    font-size: 15px;
                }
            }
        }
        .content{
            padding:50px 0;
            width: 100%;
            text-align: center;
            font-size: 18px;
            color: #409eff;
            div{
                margin-top: 15px;
            }
            .number{
                font-weight: 600;
                font-size: 30px;
            }
        }
        .btn{
            position: fixed;
            bottom: 20%;
            left: 0;
            width: calc(100% - 50px);
            padding:0 25px;
            button{
                width: 100%;
                border-radius: 25px;
                // background: #e06a6b;
                border: none;
            }
        }
    }
</style>
