<template>
  <div class="agreement" :style="{ minHeight: H + 'px' }">
    <div class="title">
      <van-nav-bar
        title="使用须知说明书"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <h3>注意事项</h3>
    <div class="content">
      <div>
        1.所有包裹或货件都必须提供货物清单：清单信息要求单货相符，内容一致，品名要特别注明清楚。
      </div>
      <div>2.冲绳、离岛、北海道部分地区另收偏远费150元/票！</div>
      <div>
        3.特货渠道：包含化妆品（单票24个以内）、防疫物资、情趣用品、动漫产品可出，另粉末液体单询。
      </div>
      <div>4.佐川带电：带磁带电（单票6个以内）</div>
      <div>
        5.自出口报关后，需改地址的，需在原日本地址派送不成功后更改，派送成功则无法更改，地址更改费为99RMB/票。
      </div>
      <div>
        6.若遇到收件方客人拒收，佐川退回改派收取2000日币，退回销毁则不产生费用。黑猫退回改派收取29元人民币。
      </div>
      <div>7.黑猫渠道破损不赔偿</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      property: "value",
    };
  },
  created() {
    this.H = document.documentElement.clientHeight;
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less">
.agreement {
    background: #fff;
  h3{
      width: 100%;
      text-align: center;
      margin: 0;
      padding: 15px 0;
      color: #444;
  }
  .content{
      color: #444;
      padding: 10px;
      padding-bottom: 50px;
      div{
          font-size: 15px;
          text-indent: 2em;
          padding: 5px;
      }
  }
}
</style>