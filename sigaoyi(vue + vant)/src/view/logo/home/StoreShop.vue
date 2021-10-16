<template>
  <div class="storeshop" :style="{ height: H - 10 + 'px' }">
    <div class="title">
      <van-nav-bar
        title="店铺"
        left-text="返回"
        right-text="添加"
        left-arrow
        fixed
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <div class="shopList">
      <div class="v-shopList">
        <div class="v-list" v-if="skeletonState">
          <div class="v-list-length" v-if="shopList.length > 0">
            <div class="list" v-for="(item, index) in shopList" :key="index">
              <div class="title_state cleafix">
                <span class="fl"
                  >店铺名/ID：<strong>{{ item.shopuser }}</strong></span
                >
                <span class="fr">{{ item.status }}</span>
              </div>
              <div class="number">编号：{{ item.id }}</div>
              <div class="apikey">
                <span>APIKey：</span>
                <span>{{ item.aPIKey }}</span>
              </div>
              <div class="remarks">{{ item.remarks }}</div>
              <div class="btn">
                <van-button type="info" size="mini" @click="edit(item)"
                  >编辑</van-button
                >
              </div>
            </div>
          </div>
          <!-- 空状态 -->
          <div class="empety" v-else>
            <van-empty description="暂无店铺" />
          </div>
        </div>
        <div
          class="v-skeleton"
          v-else
          v-for="(item, index) in skeletonNum"
          :key="index"
        >
          <div class="skeleton">
            <van-skeleton :row="1" row-width="101%" />
            <van-skeleton :row="1" row-width="30%" />
            <van-skeleton :row="1" row-width="101%" />
            <van-skeleton :row="1" row-width="100%" />
            <van-skeleton :row="1" row-width="20%" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../../assets/less/storeshop/storeshop.css";
export default {
  data() {
    return {
      H: "",
      infoData: "",
      // list
      shopList: [],
      skeletonState: false,
      skeletonNum: 4,
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log("from.path ==>", from.path);
    if (from.path == "/shopInfo") {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }
    next();
  },
  activated() {
    if (!this.$route.meta.isBack) {
      this.H = document.documentElement.clientHeight;
      this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
      this.shopList = [];
      this.skeletonState = false;
      this.getShopList();
    } else {
      this.$route.meta.isBack = false;

      if (this.$route.query.firstRouter) {
        this.getShopList();
      }
    }
  },
  created() {},
  methods: {
    // 返回
    onClickLeft() {
      this.$router.push({ name: "Home" });
    },
    // 获取店铺
    getShopList() {
      var loading = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
      this.$axios({
        url: "/sigaoyi/NEWqoo10Shop",
        method: "POST",
        params: {
          amount: 30,
          pages: 1,
          userId: this.infoData.id,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          loading.clear();
          this.skeletonState = true;
          if (result.data.Code == 200) {
            if (result.data.qoo10shops.length > 0) {
              this.shopList = result.data.qoo10shops;
              console.log("this.shopList ==>", this.shopList);
            } else {
              this.$dialog
                .confirm({
                  message: "您还没有绑定店铺,是否立即去绑定店铺",
                  getContainer: ".storeshop",
                  confirmButtonText: "立即去",
                  confirmButtonColor: "#409eff",
                })
                .then((res) => {
                  this.onClickRight();
                })
                .catch((error) => {});
            }
          } else {
            this.$dialog({ message: result.data.msg });
          }
        })
        .catch((err) => {
          this.skeletonState = true;
          loading.clear();
          this.$dialog({ message: "系统业务繁忙,请稍后再试" });
          console.log("err ==>", err);
        });
    },
    // 添加
    onClickRight() {
      let item = {
        id: 0,
      };
      this.$router.push({
        name: "ShopInfo",
        query: { item: JSON.stringify(item) },
      });
    },
    // 编辑
    edit(item) {
      this.$router.push({
        name: "ShopInfo",
        query: { item: JSON.stringify(item) },
      });
    },
  },
};
</script>

<style>
</style>