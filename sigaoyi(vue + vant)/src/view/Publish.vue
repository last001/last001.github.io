<template>
  <div class="publish">
    <div class="title">
      <van-nav-bar
        title="刊登产品"
        left-text="返回"
        right-text="清空价格公示"
        left-arrow
        fixed
        @click-left="onClickLeft"
        @click-right="priceCount = ''"
      />
    </div>
    <div class="content">
      <!-- 选择店铺 -->
      <div class="shopList">
        <div class="header">选择店铺</div>
        <van-cell
          is-link
          :title="shopList.title"
          @click="shopList.status = true"
          :class="shopList.title == '请选择' ? '' : 'active'"
        />
        <van-action-sheet v-model="shopList.status">
          <div class="content">
            <van-picker
              @confirm="conFirm($event, shopList, 'shop')"
              @cancel="onCancel(shopList)"
              show-toolbar
              :columns="shopList.list"
            />
          </div>
        </van-action-sheet>
      </div>
      <!-- 分类编号 -->
      <div class="number">
        <span>分类编号</span>
        <span>
          <input type="text" placeholder="请输入" v-model="number" />
        </span>
      </div>
      <!-- 运费编号 -->
      <div class="freightList">
        <div class="header">运费编号</div>
        <van-cell
          is-link
          :title="freightList.title"
          @click="showFace()"
          :class="freightList.title == '请选择' ? '' : 'active'"
        />
        <van-action-sheet v-model="freightList.status">
          <div class="content">
            <van-picker
              @confirm="conFirm($event, freightList, 'freight')"
              @cancel="onCancel(freightList)"
              show-toolbar
              :loading="freightList.loading"
              :columns="freightList.list"
            />
          </div>
        </van-action-sheet>
      </div>
      <!-- 价格公式 -->
      <div class="priceCount">
        <span>价格公式</span>
        <span>
          <input type="text" placeholder="请输入" v-model="priceCount" />
        </span>
      </div>
    </div>
    <div class="btn">
      <van-button round type="info" size="normal" @click="publishConfirm()"
        >确定</van-button
      >
    </div>
  </div>
</template>

<script>
import "@/assets/less/publish/publish.css";
export default {
  data() {
    return {
      AllshopLit: [],
      //   选择店铺
      shopList: {
        title: "请选择",
        status: false,
        value: 0,
        list: [],
      },
      //   运费编号
      freightList: {
        title: "请选择",
        status: false,
        value: "0",
        loading: false,
        list: [{ ShippingName: "请选择", text: "请选择", ShippingNo: "0" }],
      },
      //   分类编号
      number: 0,
      //   价格公式
      priceCount: "(price*2+55)*1.2/0.058",
      //   打开运费编号 CertificationKey
      CertificationKey: "",
    };
  },
  created() {
    this.AllshopLit = JSON.parse(this.$route.query.AllshopLit);
    this.getAllShopList();
    console.log("this.AllshopLit ==>", this.AllshopLit);
  },
  methods: {
    //   返回
    onClickLeft() {
      this.$router.push({name:"ProductDetails",query:{id:this.$route.query.id,language: this.$route.query.language,}});
    },
    // 打开face
    showFace() {
      if (this.shopList.value == "0") {
        this.$toast("请先选择店铺");
        return;
      }
      this.freightList.status = true;
      this.freightList.loading = true;
      this.$axios({
        url: "/sigaoyi/searchShop",
        method: "POST",
        params: {
          id: this.shopList.value,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          this.freightList.loading = false;
          let freightObj = {
            ShippingName: "请选择",
            ShippingNo: "0",
            text: "请选择",
          };
          this.freightList.list = result.data.ShippingList;
          this.freightList.list.forEach((e) => {
            e["text"] = e.ShippingName;
          });
          this.freightList.list.unshift(freightObj);
          this.CertificationKey = result.data.CertificationKey;
        })
        .catch((err) => {
          this.freightList.loading = false;
          console.log("err ==>", err);
        });
    },
    // 取消选择
    onCancel(array) {
      array.status = false;
    },
    // 确定选择
    conFirm(action, array, string) {
      if (string == "shop") {
        array.title = action.text;
        array.value = action.id;
        array.status = false;
      } else {
        array.title = action.text;
        array.value = action.ShippingNo;
        array.status = false;
      }
    },
    // 初始值 渲染
    getAllShopList() {
      let objShop = {
        id: 0,
        shopuser: "请选择",
        text: "请选择",
      };
      this.shopList.list = this.AllshopLit;
      this.shopList.list.forEach((e) => {
        e["text"] = e.shopuser;
      });
      this.shopList.list.unshift(objShop);
      // 分类编号
      this.number = this.$route.query.catalog2Num;
    },
    // 确定 刊登
    publishConfirm() {
      //  提示
      if(this.shopList.value == 0){
          this.$toast('请先选择店铺');
          return;
      }
      if(this.freightList.value == "0"){
          this.$toast('请先选择运费编号');
          return;
      }
      if(this.priceCount == ""){
          this.$toast("请先输入产品价格");
          return;
      }
      // loading
      let loading = this.$toast.loading({
        message: "刊登中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });   
      let data = {
        id: this.$route.query.id,
        language: this.$route.query.language,
        pricefromula: this.priceCount,
        SecondSubCat: this.number,
        shopid: this.shopList.value,
        ShippingNo: this.freightList.value,
        CertificationKey: this.CertificationKey,
      };
      this.$axios({
        url: "/sigaoyi/publishedProducts",
        method: "POST",
        params: data,
      })
        .then((result) => {
            loading.clear();
          console.log("result ==>", result);
          if (result.data.code == "200") {
            this.$dialog({
              message: result.data.msg,
              confirmButtonColor: "#409eff",
            });
          } else {
            this.$dialog({ message: result.data.msg });
          }
        })
        .catch((err) => {
            loading.clear();
          console.log("err ==>", err);
          this.$dialog({ message: "系统服务繁忙,请稍后再试!" });
        });
    },
  },
};
</script>

<style>
</style>