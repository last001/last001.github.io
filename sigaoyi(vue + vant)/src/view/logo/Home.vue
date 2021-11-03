<template>
  <div class="home" :style="{ minHeight: H - 60 + 'px' }">
    <!-- <div class="status-bar" :style="'height(statusHeight/75)+'rem'"></div> -->
    <div class="info">
      <div
        class="head"
        :style="{ backgroundImage: 'url(' + infoData.img + ')' }"
        @click="gotoMy"
      ></div>
      <div class="nickName" @click="gotoMy">{{ nickName }}</div>
    </div>
    <div class="deal">
      <div class="today">
        <div class="v-tody">
          <div class="today-text">销售金额（包含邮费）</div>
          <div class="today-money">
            {{ shopListInfo.SalesAmount }}<i>JPY</i>
          </div>
        </div>
        <div class="switch" v-show="switchShow" @click="shopSwitchState = true">
          <span>切换</span><van-icon name="exchange" size="18" />
        </div>
      </div>
      <div class="year">
        <div class="drop-shipping">
          <div class="drop-shipping-text">订购数量</div>
          <div class="drop-shipping-number">
            {{ shopListInfo.OrderQuantity }}
          </div>
        </div>
        <div class="sale">
          <div class="sale-text">新订购</div>
          <div class="sale-number">{{ shopListInfo.NewOrder }}</div>
        </div>
        <div class="price-weight">
          <div class="price-weigth-text">等待发货</div>
          <div class="price-weight-number">
            {{ shopListInfo.WaitForDelivery }}
          </div>
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
    <!-- 店铺切换 -->
    <van-popup
      get-container=".home"
      class="shopPup"
      v-model="shopSwitchState"
      @close="closeMask()"
      round
      closeable
      position="bottom"
      :style="{ height: '71%' }"
    >
      <div class="title">请选择要查看的店铺</div>
      <div class="tips">
        以下是你全部的店铺，支持切换查看，点击设为默认，首次进入则会展示你已选的默认店铺信息。
      </div>
      <div class="img-username">
        <div class="v-img-username">
          <div
            class="img"
            :style="{ backgroundImage: 'url(' + infoData.img + ')' }"
          ></div>
          <div class="username">{{ nickName }}</div>
        </div>
        <div class="time" @click="switchMask = true">
          选择时间段：{{ timeText }}
        </div>
      </div>
      <!-- shopList -->
      <div class="content">
        <div
          class="content-list"
          v-for="(item, index) in shopList"
          :key="index"
        >
          <div class="select">
            <van-radio-group v-model="item.isRadio" checked-color="#409eff">
              <van-radio name="1" @click="changeRadio(item, index)"></van-radio>
            </van-radio-group>
          </div>
          <div class="content-list-lists" @click="changeRadio(item, index)">
            <div class="shop-list">
              <div class="shop-user">
                <div class="shop-user-val">店铺名：{{ item.shopuser }}</div>
                <div class="shop-default" v-show="item.isDefault">默认店铺</div>
              </div>
              <div class="shop-remarks">
                <div class="shop-remarks-val">备注：{{ item.remarks }}</div>
              </div>
            </div>
            <div class="see-shop-btn">
              <van-button disabled type="info" size="mini" v-if="item.isSelect"
                >当前</van-button
              >
              <van-button
                type="info"
                size="mini"
                v-else
                @click.stop="selectDefault(item)"
                >查看</van-button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="btn">
        <van-button size="normal" type="info" round @click="setDefault()"
          >设为默认</van-button
        >
      </div>
    </van-popup>
    <!-- 选择时间 -->
    <van-action-sheet
      get-container=".home"
      v-model="switchMask"
      cancel-text="取消"
      @select="onSelect"
      :actions="timeList"
    />
  </div>
</template>

<script>
import "../../assets/less/home/home.css";
export default {
  data() {
    return {
      // 屏幕高度
      H: "",
      // 切换状态
      switchShow:false,   
      // 店铺列表
      shopSwitchState: false,
      // 销售金额 订购数量 新订购 等待发货  等
      shopListInfo: {
        SalesAmount: 0,
        OrderQuantity: 0,
        NewOrder: 0,
        WaitForDelivery: 0,
      },
      shopList: [],
      // 时间列表
      switchMask: false,
      timeList: [
        { name: "当天", selected: true, value: 1, index: 0 },
        { name: "最近七天", selected: false, value: 7, index: 1 },
        { name: "最近半个月", selected: false, value: 15, index: 2 },
        { name: "最近一个月", selected: false, value: 30, index: 3 },
      ],
      // 选择时间文字
      timeText: "当天",
      // 个人信息
      infoData: {},
      // 名字
      nickName: "登录",
      list: [
        // { name: "数据统计", iconSrc: "bar-chart-o", link: "Statistics" },
        // { name: "产品管理", iconSrc: "bag-o", link: "Product" },
        // { name: "公司管理", iconSrc: "contact" },
        // { name: "系统管理", iconSrc: "setting-o" },
        // { name: "员工管理", iconSrc: "balance-pay", link: "Staff" },
        { name: "店铺管理", iconSrc: "shop-o", link: "StoreShop" },
        { name: "库存管理", iconSrc: "logistics", link: "Stock" },
        // { name: "入库", iconSrc: "exchange", link: "ToStock" },
        { name: "采集商品", iconSrc: "fire-o", link: "Collection" },
        { name: "添加/导入订单", iconSrc: "orders-o", link: "AddOrder" },
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
          title: "观看视频",
          detail: "去观看教学视频",
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
      isNotice: false,
      isCheck: false,
    };
  },
  created() {
    this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
    // console.log(this.infoData);
    if (this.infoData == null || this.infoData == undefined) {
      this.nickName = "登录";
    } else {
      this.nickName = this.infoData.userName;
      if (this.infoData.img == undefined) {
        this.infoData.img =
          "http://www.ec-sigaoyi.com/imagelink/1634893766009.jpg";
      }
      //  获取公告状态
      this.getNoticeState();
      this.autoUpdate();
      // 获取店铺信息
      this.getShopInfo();
    }
    this.$nextTick(() => {
      this.H = document.documentElement.clientHeight;
    });
  },
  computed: {
    isDotMap(value) {
      return this.isNotice || this.isCheck;
    },
  },
  mounted() {},
  methods: {
    //   去我的页面
    gotoMy() {
      if (this.nickName == "登录") {
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner",
          duration: "600",
        });
        setTimeout(() => {
          this.$router.push({ name: "Login" });
        }, 600);
      } else {
        this.$router.push({ name: "PersonalInfo" });
      }
    },
    // 店铺选择 changeRadio
    changeRadio(item, index) {
      console.log("item ==>", item);
      this.shopList.forEach((e) => {
        e.isRadio = "0";
      });
      item.isRadio = "1";
    },
    // 选择时间段
    onSelect(e) {
      this.timeText = e.name;
      this.timeList.forEach((e) => {
        e.selected = false;
      });
      e.selected = true;

      // 请求
      this.$axios({
        url: "/sigaoyi/salesStatistics",
        method: "POST",
        params: {
          shopid: el.id,
          Heaven: e.value,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            this.switchMask = false;
            this.shopListInfo.SalesAmount = result.data.SalesAmount;
            this.shopListInfo.OrderQuantity = result.data.OrderQuantity;
            this.shopListInfo.NewOrder = result.data.NewOrder;
            this.shopListInfo.WaitForDelivery = result.data.WaitForDelivery;
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
        });
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
    // 获取公告状态
    getNoticeState() {
      if (this.infoData == undefined || this.infoData == null) {
        return;
      }
      this.$axios({
        url: "/sigaoyi/NEWGetAnnounceInfo",
        method: "POST",
        params: {
          userName: this.infoData.userName,
          port: "app",
        },
      })
        .then((result) => {
          //   console.log("result ==>", result);
          if (result.data.code == "200") {
            if (result.data.announcementsize > 0) {
              this.isNotice = true;
            } else {
              this.isNotice = false;
            }
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
          //   this.$dialog({ message: "系统服务繁忙,请稍后再试!" });
        });
    },
    // 自动更新
    autoUpdate() {
      if (window.plus) {
        this.plusReady();
      } else {
        document.addEventListener("plusready", this.plusReady, false);
      }
    },
    // 获取版本号
    plusReady() {
      // 获取本地应用资源版本号
      plus.runtime.getProperty(plus.runtime.appid, (inf) => {
        this.checkVersion(inf.version);
      });
    },
    // 检查更新
    checkVersion(nativeVersion) {
      let that = this;
      that
        .$axios({
          url: "/sigaoyi/CheckFoUpdates",
          method: "GET",
          params: {
            versionNumber: nativeVersion,
          },
        })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            this.isCheck = true;
          } else {
            this.isCheck = false;
          }
        })
        .catch((err) => {
          this.isCheck = false;
          that.$dialog({ message: "发生不可预期的错误" });
          console.log("err ==>", err);
        });
    },
    // 获取店铺信息
    getShopInfo() {
      this.shopList = this.$store.state.shopList;
      if(this.shopList.length > 0){
          this.switchShow = true;
      }else{
          this.switchShow = false;
          return;
      }
      var shopDefaultList = JSON.parse(localStorage.getItem("shopDefault"));
      this.shopList.forEach((e) => {
        if (shopDefaultList == null || shopDefaultList == undefined) {
          // 找不到默认值
          this.shopList.forEach((e, i) => {
            e["isDefault"] = false;
            e["isRadio"] = "0";
            e["isSelect"] = false;
            if (i == 0) {
              e["isDefault"] = true;
              e["isRadio"] = "1";
              e["isSelect"] = true;
            }
          });
        } else {
          //存在默认值
          e["isDefault"] = false;
          e["isRadio"] = "0";
          e["isSelect"] = false;
          if (e.id == shopDefaultList.shopId) {
            e["isDefault"] = true;
            e["isRadio"] = "1";
            e["isSelect"] = true;
          }
          // 渲染时间段
          this.timeList.forEach((e) => {
            e.selected = false;
            if (e.value == shopDefaultList.timeVal) {
              e.selected = true;
              this.timeText = e.name;
            }
          });
        }
      });

      let data = {
        shopid: "",
        Heaven: "",
      };
      // 店铺id
      this.shopList.forEach((e) => {
        if (e.isDefault) {
          data.shopid = e.id;
        }
      });
      // 时间value
      this.timeList.forEach((e) => {
        if (e.selected) {
          data.Heaven = e.value;
        }
      });
      console.log("data ==>", data);
      this.$axios({
        url: "/sigaoyi/salesStatistics",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            this.shopListInfo.SalesAmount = result.data.SalesAmount;
            this.shopListInfo.OrderQuantity = result.data.OrderQuantity;
            this.shopListInfo.NewOrder = result.data.NewOrder;
            this.shopListInfo.WaitForDelivery = result.data.WaitForDelivery;
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
        });
    },
    // 选择查看店铺信息
    selectDefault(item) {
      let data = {
        shopid: item.id,
        Heaven: "",
      };
      this.timeList.forEach((e) => {
        if (e.selected) {
          data.Heaven = e.value;
        }
      });
      this.$axios({
        url: "/sigaoyi/salesStatistics",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            this.shopListInfo.SalesAmount = result.data.SalesAmount;
            this.shopListInfo.OrderQuantity = result.data.OrderQuantity;
            this.shopListInfo.NewOrder = result.data.NewOrder;
            this.shopListInfo.WaitForDelivery = result.data.WaitForDelivery;
            this.shopSwitchState = false;
            this.shopList.forEach((e) => {
              e.isSelect = false;
            });
            item.isSelect = true;
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
        });
    },
    // 设为默认值
    setDefault() {
      var shopDefault = {
        shopId: 0,
        timeVal: 99,
      };
      // 店铺id
      this.shopList.forEach((e) => {
        e.isDefault = false;
        if (e.isRadio == "1") {
          e.isDefault = true;
          shopDefault.shopId = e.id;
        }
      });
      // 时间段
      this.timeList.forEach((e) => {
        if (e.selected) {
          shopDefault.timeVal = e.value;
        }
      });
      localStorage.setItem("shopDefault", JSON.stringify(shopDefault));
    },
    // 关闭店铺管理时 触发
    closeMask() {
      this.shopList.forEach((e) => {
        e.isRadio = "0";
        if (e.isDefault) {
          e.isRadio = "1";
        }
      });
    },
  },
  watch: {
    isDotMap(value) {
      if (value) {
        this.$store.state.isDot = true;
      } else {
        this.$store.state.isDot = false;
      }
    },
  },
};
</script>

<style>
</style>