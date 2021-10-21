<template>
  <div class="logo">
    <!--  background: rgba(255,255,255,.8); -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <div class="footer" :style="{ background: bgColor }">
      <div
        class="iconList"
        v-for="(item, index) in iconList"
        :key="index"
        :class="item.isActive ? 'active' : ''"
        @click="gotoPage(item)"
      >
        <van-icon
          :name="item.iconHollow"
          size="30"
          :class="item.isDot ? 'active' : ''"
        />
        <div class="iconText">
          {{ item.iconName }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 背景色
      bgColor: "",
      iconList: [
        {
          gotoName: "Home",
          text: "home",
          isActive: true,
          iconHollow: "wap-home-o",
          iconSolid: "wap-home",
          iconName: "首页",
          isDot: false,
        },
        {
          gotoName: "Commodity",
          text: "commodity",
          isActive: false,
          iconHollow: "shopping-cart-o",
          iconSolid: "shopping-cart",
          iconName: "产品",
          isDot: false,
        },
        {
          gotoName: "Order",
          text: "order",
          isActive: false,
          iconHollow: "label-o",
          iconSolid: "label",
          iconName: "订单",
          isDot: false,
        },
        {
          gotoName: "My",
          text: "my",
          isActive: false,
          iconHollow: "user-o",
          iconSolid: "user",
          iconName: "我的",
          isDot: this.$store.state.isDot,
        },
      ],
    };
  },
  created() {
    //    刷新路由初始化
    for (let i = 0; i < this.iconList.length; i++) {
      this.iconList[i].isActive = false;
      if (this.$route.path.toLowerCase().indexOf(this.iconList[i].text) > -1) {
        this.iconList[i].isActive = true;
      }
      if (this.iconList[i].isActive && this.iconList[i].text == "my") {
        this.bgColor = "rgba(255,255,255,.8)";
      } else {
        this.bgColor = "rgb(255,255,255)";
      }
    }
    this.$store.state.isDot = false;
  },
  mounted() {},
  computed: {
    isDotMap() {
      return this.$store.state.isDot;
    },
  },
  methods: {
    //   跳转路由
    gotoPage(item) {
      if (item.isActive) {
        return;
      }
      for (let i = 0; i < this.iconList.length; i++) {
        this.iconList[i].isActive = false;
      }
      item.isActive = true;
      this.$router.push({ name: item.gotoName });
    },
  },
  watch: {
    $route(to, from) {
      //   检测路由变化
      // console.log("this.$route ==>", this.$route.path);
      for (let i = 0; i < this.iconList.length; i++) {
        this.iconList[i].isActive = false;
        if (
          this.$route.path.toLowerCase().indexOf(this.iconList[i].text) > -1
        ) {
          this.iconList[i].isActive = true;
        }
        if (this.$route.path == "/logo/my") {
          this.bgColor = "rgba(255,255,255,.8)";
        } else {
          this.bgColor = "rgb(255,255,255)";
        }
      }
    },
    isDotMap(flag){
        console.log('flag ==>',flag);
        if(flag){
            this.iconList.forEach(e => {
                if(e.text == "my"){
                    e.isDot = true;
                }
            });
        }
    }
  },
};
</script>
<style lang="less" scope>
.logo {
  position: relative;
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    // height: 60px;
    width: 100%;
    // border-top: 1px solid #ddd;
    box-sizing: border-box;
    display: flex;
    z-index: 100;
    .iconList {
      width: 25%;
      text-align: center;
      padding: 5px 0;
      height: 50px;
      &.active {
        color: #409eff;
      }
      .iconText {
        width: 100%;
        text-align: center;
        font-weight: 600;
      }
      .van-icon {
        &.active {
          position: relative;
          &::after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            width: 8px;
            height: 8px;
            border-radius: 100%;
            background-color: red;
          }
        }
      }
    }
  }
}
</style>