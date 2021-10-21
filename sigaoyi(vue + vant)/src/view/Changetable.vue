<template>
  <div class="changetable">
    <div class="title">
      <van-nav-bar
        title="修改变体"
        left-text="返回"
        right-text="清空"
        left-arrow
        fixed
        @click-left="onClickLeft"
        @click-right="item = {}"
      />
    </div>
    <div class="content">
      <div class="int">
        <span>类型</span>
        <span>
          <input type="text" placeholder="请输入" v-model="item.type" />
        </span>
      </div>
      <div class="int">
        <span>名称</span>
        <span>
          <input type="text" placeholder="请输入" v-model="item.name" />
        </span>
      </div>
      <div class="int">
        <span>英文</span>
        <span>
          <input type="text" placeholder="请输入" v-model="item.name_en" />
        </span>
      </div>
      <div class="int">
        <span>日文</span>
        <span>
          <input type="text" placeholder="请输入" v-model="item.name_jp" />
        </span>
      </div>
      <div class="int">
        <span>库存</span>
        <span>
          <input type="number" placeholder="请输入" v-model="item.stock" />
        </span>
      </div>
      <div class="int">
        <span>加价</span>
        <span>
          <input type="number" placeholder="请输入" v-model="item.markup" />
        </span>
      </div>
    </div>
    <div class="btn">
      <van-button type="info" round @click="saveTable">保存</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {},
    };
  },
  created() {
    this.item = JSON.parse(this.$route.query.item);
    // if(JSON.stringify(this.item) == "{}"){}
    console.log(this.item);
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    saveTable() {
      let data = {
        product_id: this.$route.query.productId,
        id: `${this.item.id}`,
        mark: this.item.mark,
        type: this.item.type,
        name: this.item.name,
        imgurl: this.item.imgurl,
        name_en: this.item.name_en,
        name_jp: this.item.name_jp,
        stock: this.item.stock,
        markup: this.item.markup,
      };

      var loading = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });

      this.$axios({
        url: "/sigaoyi/NEWaddarants",
        method: "POST",
        params: data,
      })
        .then((result) => {
          loading.clear();
          if (result.data.Code == "200") {
            this.$dialog
              .confirm({ title: result.data.msg,getContainer:".changetable",className:"tableMask"})
              .then(() => {
                this.onClickLeft();
              }).catch(err =>{
                  
              })
          } else {
            this.$dialog({ message: result.data.msg });
          }
        })
        .catch((err) => {
          this.$dialog({ message: "系统业务繁忙,请稍后再试" });
          loading.clear();
        });
    },
  },
};
</script>

<style lang="less">
.changetable {
  .title {
    height: 46px;
  }
  .content {
    .int {
      display: flex;
      background: #fff;
      margin-top: 1px;
      padding-right: 16px;

      span {
        &:first-child {
          width: 60px;
          line-height: 46px;
          background: #fff;
          text-align: right;
          font-size: 14px;
        }

        &:nth-child(2) {
          width: 100%;

          input {
            padding: 0;
            text-align: right;
            text-indent: 10px;
            height: 100%;
            width: 100%;
            outline: none;
            border: none;
            font-size: 14px;

            &::placeholder {
              color: #b1b1b1;
            }
          }
        }
      }
    }
  }
  .btn {
    margin-top: 50px;
    padding: 0 10px;
    button {
      width: 100%;
    }
  }
  .tableMask{
      .van-dialog__header{
          padding: 50px 0;
      }
  }
}
</style>