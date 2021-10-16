<template>
  <div class="home" :style="{ minHeight: H + 'px' }">
    <!-- <div class="status-bar" :style="'height(statusHeight/75)+'rem'"></div> -->
    <div class="info" @click="gotoMy">
      <div class="head"></div>
      <div class="nickName">{{ nickName }}</div>
    </div>
    <div class="deal">
      <div class="today">
        <div class="today-text">今日交易额(元)</div>
        <div class="today-money">0</div>
      </div>
      <div class="year">
        <div class="drop-shipping">
          <div class="drop-shipping-text">今日代发货</div>
          <div class="drop-shipping-number">0</div>
        </div>
        <div class="sale">
          <div class="sale-text">本年销售额</div>
          <div class="sale-number">0</div>
        </div>
        <div class="price-weight">
          <div class="price-weigth-text">本年单量</div>
          <div class="price-weight-number">0</div>
        </div>
      </div>
    </div>
    <div class="stockUp">
      <div>备货清单222</div>
      <div>待退款37</div>
    </div>
    <div class="administration">
      <div
        class="ad-list"
        v-for="(item, index) in list"
        :key="index"
        @click="goLink(item, index)"
      >
        <van-icon :name="item.iconSrc" size="30" color="#409eff" />
        <div class="ad-list-text">{{ item.name }}</div>
      </div>
    </div>
    <div class="study">
      <h2>充值/学习</h2>
      <div class="study-list" v-for="(item, index) in studyDiv" :key="index">
        <div class="study-list-img"><img :src="item.imgSrc" alt="" /></div>
        <div class="study-list-title">
          <div>{{ item.title }}</div>
          <div>{{ item.detail }}</div>
        </div>
        <div class="fr study-list-btn" @click="goLink(item, index)">
          {{ item.skipText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/less/home/home.css";
export default {
  data() {
    return {
      // 屏幕高度
      H: "",
      // 名字
      nickName: "登录",
      list: [
        { name: "数据统计", iconSrc: "bar-chart-o", link: "Statistics" },
        // { name: "产品管理", iconSrc: "bag-o", link: "Product" },
        // { name: "公司管理", iconSrc: "contact" },
        // { name: "系统管理", iconSrc: "setting-o" },
        { name: "员工管理", iconSrc: "balance-pay", link: "Staff" },
        { name: "店铺管理", iconSrc: "shop-o", link: "StoreShop" },
        { name: "库存管理", iconSrc: "logistics", link: "Stock" },
        { name: "入库", iconSrc: "exchange", link: "ToStock" },
        { name: "采集商品", iconSrc: "fire-o" ,link:"Collection"},
        { name: "添加/导入订单", iconSrc: "orders-o" ,link:"AddOrder"},
      ],
      studyDiv: [
        {
          imgSrc: require("../../assets/img/racharge.png"),
          title: "充值提现",
          detail: "去充值或者提现",
          skipText: "立即去",
          link: "RechargeWithdraw",
        },
        {
          imgSrc: require("../../assets/img/video.png"),
          title: "视频教学",
          detail: "去观看视频教学",
          skipText: "去观看",
          link: "VideoTeaching",
        },
        {
          imgSrc: require("../../assets/img/document.png"),
          title: "教程文档",
          detail: "去浏览教程文档",
          skipText: "去浏览",
          link: "DocumentFile",
        },
      ],
      infoData: {},
      // id 渠道  链接  按钮  
    };
  },
  created() {
    this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
    // console.log(this.infoData);
    if (this.infoData == null || this.infoData == undefined) {
      this.nickName = "登录";
    } else {
      this.nickName = this.infoData.userName;
    }
    this.$nextTick(()=> {
      this.H = document.documentElement.clientHeight - 61;
    });
  },
  methods: {
    //   去我的页面
    gotoMy() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "600",
      });
      if (this.nickName == "登录") {
        setTimeout(() => {
          this.$router.push({ name: "Login" });
        }, 600);
      } else {
        setTimeout(() => {
          this.$router.push({ name: "My" });
        }, 600);
      }
    },
    // list列表跳转 和  点击立即去跳转页面
    goLink(item, index) {
      if (this.infoData == null || this.infoData == undefined) {
        this.$dialog
          .confirm({
            confirmButtonColor: "#409eff",
            title: "提示",
            message: "您还未登陆，请先去登陆！",
          })
          .then(() => {
            this.$toast.loading({
              message: "加载中...",
              forbidClick: true,
              loadingType: "spinner",
              duration: "600",
            });
            setTimeout(() => {
              this.$router.push({ name: "Login" });
            }, 600);
          })
          .catch(() => {
            //   取消
          });
        return;
      }
      this.$router.push({ name: item.link, query: { toLink: false } });
    },
  },
};
</script>

<style>
</style>