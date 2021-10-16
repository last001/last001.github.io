<template>
  <div class="commodity">
    <!-- 导航栏 -->
    <div class="title">
      <van-nav-bar left-arrow @click-left="onClickLeft">
        <template #title>
          <div class="search">
            <van-search
              show-action
              v-model="SreachVal"
              clearable
              placeholder="请输入搜索关键词"
              @search="searchCommodity('search')"
            >
              <template #action>
                <div @click="searchCommodity('search')">|&nbsp;&nbsp;搜索</div>
              </template>
            </van-search>
          </div>
        </template>
        <template #right>
          <van-dropdown-menu active-color="#409eff">
            <van-dropdown-item
              title="..."
              v-model="menuVal"
              :options="option1"
              @change="gotoFace(menuVal)"
              @open="openMenu()"
            />
          </van-dropdown-menu>
        </template>
      </van-nav-bar>
    </div>
    <!-- 筛选栏 -->
    <div class="screen">
      <div
        @click="clickScreen(item)"
        :class="item.isActive ? 'active' : ''"
        v-for="(item, index) in screenList"
        :key="index"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- 产品栏 -->
    <div class="autoBox" :style="{ minHeight: H + 'px' }" v-if="nextTickStatus">
      <!-- 下拉刷新 -->
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        loosing-text="释放刷新产品列表"
      >
        <!-- 请求成功 -->
        <van-list
          v-model="loading"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          :finished="finished"
          :finished-text="finishedText"
          @load="onLoad"
          :immediate-check="false"
          v-if="empty"
        >
          <!-- 有产品 -->
          <div class="proData" v-if="productList.length > 0">
            <div class="list" v-for="(item, index) in productList" :key="index">
              <div class="list-img">
                <img :src="item.pic_url" alt="" />
              </div>
              <div class="name" @click="clickList(item)">{{ item.title }}</div>
              <div class="price">
                ¥{{ item.price }}
              </div>
              <div class="count">
                <span
                  >运费<font style="color: #409eff">
                    {{ item.express_fee }}</font
                  ></span
                >
                <span
                  :class="item.translationText == '已翻译' ? 'active' : ''"
                  >{{ item.translationText }}</span
                >
              </div>
              <!-- set -->
              <van-checkbox
                v-model="item.checked"
                checked-color="#409eff"
                icon-size="24px"
                shape="square"
              ></van-checkbox>
            </div>
            <!-- btn -->
            <div class="btn">
              <van-button type="danger" size="mini" @click="deleteList()"
                >删除产品</van-button
              >
              <van-button
                type="danger"
                size="mini"
                @click="deleteTranslate()"
                >删除翻译</van-button
              >
              <van-button type="primary" size="mini" @click="translate()"
                >翻译产品</van-button
              >
            </div>
          </div>
          <!-- 无产品 -->
          <div class="emptyOrder" v-else>
            <van-empty description="订单空空如也" />
          </div>
        </van-list>
        <!-- 没有登录 -->
        <div class="empty" v-else>
          <van-empty description="暂无产品">
            <van-button
              round
              type="info"
              class="bottom-button"
              @click="gotoLogin"
              >去登录</van-button
            >
          </van-empty>
        </div>
      </van-pull-refresh>
    </div>
    <!-- 骨架屏 -->
    <div class="commoditySkeleton" v-else>
      <div
        class="skeletonList"
        v-for="(item, index) in skeletonList"
        :key="index"
      >
        <van-skeleton avatar-size="100px" avatar avatar-shape="square" />
        <van-skeleton :row="3" :row-width="rowWidth" />
      </div>
    </div>
    <!-- 分享栏 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="shareList"
      @select="shareContent"
    />
    <!-- 翻译 set 栏 -->
    <van-dialog
      v-model="translateState"
      title="选择翻译语言"
      show-cancel-button
      class="translate"
      confirmButtonColor="#409eff"
      @confirm="confirmTranslate(ids)"
      @cancel="cancelTrabslate"
    >
      <van-radio-group v-model="translateRadio" direction="horizontal">
        <van-radio name="2">日语</van-radio>
        <van-radio name="1">英语</van-radio>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
import "../../assets/less/commodity/commodity.css";
export default {
  data() {
    return {
      // 个人信息
      infoData: {},
      // autoBox 的高度
      H: "",
      // 搜索内容
      SreachVal: "",
      screenList: [
        { name: "源语言", isActive: true, value: 0 },
        { name: "日语", isActive: false, value: 2 },
        { name: "英语", isActive: false, value: 1 },
      ],
      //  是否登录
      empty: false,
      //   价格状态
      priceFlag: true,
      //   产品list
      productList: [],
      amount: 30,
      pages: 1,
      menuVal: "",
      option1: [
        { text: "店铺名片", value: 0, icon: "qr" },
        { text: "分享", value: 1, icon: "share-o" },
        { text: "首页", value: 2, icon: "wap-home-o" },
      ],
      // 分享状态
      showShare: false,
      shareList: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "qq", icon: "qq" },
        { name: "复制链接", icon: "link" },
        { name: "二维码", icon: "qrcode" },
      ],
      // 没有更多的产品信息了
      finishedText: "没有更多的产品信息了",
      // 下拉刷新
      isLoading: false,
      // 异步
      loading: false,
      error: false,
      finished: false,
      //   骨架屏状态
      nextTickStatus: true,
      //   骨架屏数量
      skeletonList: 8,
      //   骨架屏宽度
      rowWidth: ["100%", "45%", "70%"],
      //  ste 选择的 ids + indexList
      ids: "",
      indexList: [],
      // 翻译弹出层 状态 + radio
      translateState: false,
      translateRadio: "1",
      // 异步请求 的 laodding   
      stopGetProduct:true,
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log("from.path ==>", from.path);
    if (from.path == "/productDetails") {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }
    console.log(" to.meta.isBack ==>", to.meta.isBack);
    next();
  },
  activated() {
    console.log("产品 ==>", this.$route.meta.isBack);
    if (!this.$route.meta.isBack) {
       this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
      if (this.infoData == null || this.infoData == undefined) {
        this.nextTickStatus = true;
        this.productList = [];
        //   登录状态
        this.empty = false;
      } else {
        this.H = document.documentElement.clientHeight - 46 - 37 - 60;
        this.productList = [];
        this.empty = true;
        this.nextTickStatus = false;
        this.screenList.forEach(e => {
            e.isActive = false;
            if(e.name == "源语言"){
                e.isActive = true;
            }
        });
        this.getCommodity("start");
      }
    } else {
      console.log("不重新获取数据!!!");
      this.$route.meta.isBack = false;
    }
  },
  created() {
     
  },
  mounted() {},
  methods: {
    //   返回上一级
    onClickLeft() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "600",
      });
      setTimeout(() => {
        this.$router.go(-1);
      }, 600);
    },
    // 打开menu 时
    openMenu() {
      this.menuVal = "";
    },
    // 点击menu 列表事件
    gotoFace(menuVal) {
      console.log("menuVal ==>", menuVal);
      if (menuVal == "2") {
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner",
          duration: "600",
        });
        setTimeout(() => {
          this.$router.push({ name: "Home" });
        }, 600);
      } else {
        //   分享
        this.showShare = true;
      }
    },
    // 分享内容
    shareContent(option) {
      this.showShare = false;
      this.$toast(option.name);
    },
    // 点击筛选列表
    clickScreen(item) {
      if (item.isActive) {
        return;
      }
      for (let i = 0; i < this.screenList.length; i++) {
        this.screenList[i].isActive = false;
      }
      item.isActive = true;
      this.searchCommodity("search");
    },
    // 排序方法 下降
    compare(attr) {
      return function (a, b) {
        var val1 = a[attr];
        var val2 = b[attr];
        return val2 - val1;
      };
    },
    // 排序方法 上升
    compare1(attr) {
      return function (a, b) {
        var val1 = a[attr];
        var val2 = b[attr];
        return val1 - val2;
      };
    },
    // 点击list 产品
    clickList(item) {
      // 语言
      let language = 0;
      this.screenList.forEach((e) => {
        if (e.isActive) {
          language = e.value;
        }
      });

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "600",
      });
      setTimeout(() => {
        this.$router.push({
          name: "ProductDetails",
          query: { id: item.id, language: language },
        });
      }, 600);
    },
    // empty 去登录
    gotoLogin() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "600",
      });
      setTimeout(() => {
        this.$router.push({ name: "Login" });
      }, 600);
    },
    // 上拉刷新
    onRefresh() {
      this.isLoading = false;
      this.getCommodity("refresh");
    },
    // 异步请求数据
    onLoad() {
      console.log("异步拿数据 =======>>>>");
      setTimeout(() => {
        if (this.stopGetProduct) {
          this.loading = true;
          this.finished = true;
          this.finishedText = "没有更多的产品信息了";
          return;
        }
        this.amount += 30;
        this.pages = 1;
        this.searchCommodity("async");
      }, 500);
    },
    // 获取产品详情
    getCommodity(string) {
        let data = {
          userId: this.infoData.id,
          amount: 30,
          pages: 1,
          title: "",
          language: 0,
        }
        this.screenList.forEach(e => {
            if(e.isActive){
                data.language = e.value;
            }
        });
      let loading = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
      this.$axios({
        method: "POST",
        url: "/sigaoyi/NEWproductLibrary",
        params: data
      })
        .then((result) => {
          loading.clear();
          // 请求状态
          this.empty = true;
          //  骨架屏 状态
          this.nextTickStatus = true;
          //  侠岚刷新状态
          this.isLoading = false;
          //  异步请求数据 状态
          this.loading = false;
          this.finished = false;
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            if (result.data.products.length > 0) {
              result.data.products.forEach((e) => {
                e["checked"] = false;
                if (result.data.language == 0) {
                  if (e.translationStatus == 0) {
                    e["translationText"] = "未翻译";
                  } else {
                    e["translationText"] = "已翻译";
                  }
                } else {
                  e["translationText"] = "";
                }
                if (e.pic_url == "") {
                  e.pic_url =
                    "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg";
                }
              });

              //  判断 是否已经获取完成
              if(data.amount > result.data.products.length){
                  this.finishedText = "没有更多的产品信息了";
                  this.stopGetProduct = true;
              }else{
                   this.stopGetProduct = false;
              }
            } else {
              this.$toast("该用户还有没产品");
              this.finished = true;
              this.finishedText = "";
            }
            this.productList = result.data.products;
            if (string == "refresh") {
              this.$toast("刷新成功！");
            }
          } else {
            if (string == "refresh") {
              this.$toast("刷新成功！");
            }
          }
        })
        .catch((err) => {
          loading.clear();
          this.empty = true;
          this.nextTickStatus = true;
          this.isLoading = false;
          this.loading = false;
          this.finished = false;
          if (string == "refresh") {
            this.$toast("刷新失败！");
          }
          console.log("err ==>", err);
        });
    },
    // 搜索 产品
    searchCommodity(string) {
      let data = {
        userId: this.infoData.id,
        amount: this.amount,  
        pages: this.pages,
        platform: 99,
        status: 99,
        language: Number,
        sortid: 99,
        sortid11: 99,
        sortid22: 99,
        translationStatus: 99,
        title: this.SreachVal,
      };
      //   语言
      for (let i = 0; i < this.screenList.length; i++) {
        if (this.screenList[i].isActive) {
          data.language = this.screenList[i].value;
        }
      }
      if (string == "search") {
        this.amount = 30;
        data.amount = 30;
        var loading = this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner",
          duration: 0,
        });
      }
      console.log("data ==>", data);
      this.$axios({
        method: "POST",
        url: "/sigaoyi/NEWproductLibrary",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          this.loading = false;
          this.finished = false;
          if (string == "search") {
            loading.clear();
          }
          if (result.data.Code == 200) {
            if (result.data.products.length > 0) {
              result.data.products.forEach((e) => {
                e["checked"] = false;
                if (result.data.language == 0) {
                  if (e.translationStatus == 0) {
                    e["translationText"] = "未翻译";
                  } else {
                    e["translationText"] = "已翻译";
                  }
                } else {
                  e["translationText"] = "";
                }
                if (e.pic_url == "") {
                  e.pic_url =
                    "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg";
                }
              });
              
              //  判断 是否已经获取完成
              if(data.amount > result.data.products.length){
                  this.stopGetProduct = true;
                  this.finishedText = "没有更多的产品信息了";
              }else{
                   this.stopGetProduct = false;
              }
              this.$toast(result.data.msg);
            } else {
              this.finished = true;
              this.finishedText = "";
              this.$toast("该用户没产品");
            }
            this.productList = result.data.products;
            this.$toast(result.data.msg);
          } else {
            this.$toast(result.data.msg);
          }
        })
        .catch((err) => {
          this.loading = false;
          this.finished = false;
          if (string == "search") {
            loading.clear();
          }
          this.$toast("系统业务繁忙,请稍后再试");
          console.log("err ==>", err);
        });
    },
    // 翻译按钮
    translate() {
      this.ids = "";
      this.indexList = [];
      if (
        this.productList.findIndex((target) => target.checked === true) > -1
      ) {
        for (let i = 0; i < this.productList.length; i++) {
          if (this.productList[i].checked) {
            if (this.productList[i].translationStatus == 0) {
              this.ids += "'" + this.productList[i].id + "',";
              this.indexList.push(i);
            }
          }
        }
      } else {
        this.translateState = false;
        this.$toast("请选择要翻译的产品");
        return;
      }
      // 参数处理
      this.ids = this.ids.substring(0, this.ids.length - 1);
      this.translateState = true;
    },
    // 取消
    cancelTrabslate() {
      this.translateState = false;
    },
    // 确定 翻译
    confirmTranslate(ids) {
      let data = {
        userId: this.infoData.id,
        language: Number(this.translateRadio),
        ids: ids,
      };
      console.log("data ==>", data);
      if (data.ids == "" || data.ids == undefined) {
        this.$toast("请选择未翻译的产品");
        return;
      }
      this.translateState = false;
      //  请求
      let loading = this.$toast.loading({
        message: "翻译中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
      this.$axios({
        method: "POST",
        url: "/sigaoyi/NEWtranslation",
        params: data,
      })
        .then((result) => {
          loading.clear();
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            this.$dialog({ message: result.data.msg });
            for (let i = 0; i < this.indexList.length; i++) {
              this.productList[this.indexList[i]].translationStatus = 1;
              this.productList[this.indexList[i]].translationText = "已翻译";
            }
          } else {
            this.translateState = true;
            this.$dialog({ message: result.data.msg });
          }
        })
        .catch((err) => {
          loading.clear();
          this.translateState = true;
          this.$dialog({ message: "系统业务繁忙,请稍后再试" });
          console.log("err ==>", err);
        });
    },
    // 删除翻译
    deleteTranslate() {
      this.ids = "";
      this.indexList = [];
      if (
        this.productList.findIndex((target) => target.checked === true) > -1
      ) {
        for (let i = 0; i < this.productList.length; i++) {
          if (this.productList[i].checked) {
            if (
              this.productList[i].translationStatus == 1 ||
              this.productList[i].translationStatus == ""
            ) {
              this.ids += "'" + this.productList[i].id + "',";
              this.indexList.push(i);
            }
          }
        }
      } else {
        this.$toast("请选择要翻译的产品");
        return;
      }
      // 参数处理
      this.ids = this.ids.substring(0, this.ids.length - 1);
      let data = {
        userId: this.infoData.id,
        ids: this.ids,
      };
      console.log("data ==>", data);
      //  请求
      let loading = this.$toast.loading({
        message: "删除翻译中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
      this.$axios({
        method: "POST",
        url: "/sigaoyi/deteletranslation",
        params: data,
      })
        .then((result) => {
          loading.clear();
          console.log("result ==>", result);
          if (result.data.code == "200") {
            this.screenList.forEach((e) => {
              if (e.isActive && e.value != 0) {
                for (let i = 0; i < this.indexList.length; i++) {
                  this.productList.splice(this.indexList[i], 1);
                }
              } else {
                for (let i = 0; i < this.indexList.length; i++) {
                  this.productList[this.indexList[i]].translationStatus = 0;
                  this.productList[this.indexList[i]].translationText =
                    "未翻译";
                }
              }
            });
            this.$toast(result.data.msg);
          } else {
            this.$toast(result.data.msg);
          }
        })
        .catch((err) => {
          loading.clear();
          this.$toast("系统业务繁忙,请稍后再试");
          console.log("err ==>", err);
        });
    },
    // 删除产品
    deleteList() {
      this.ids = "";
      this.indexList = [];
      if (
        this.productList.findIndex((target) => target.checked === true) > -1
      ) {
        for (let i = 0; i < this.productList.length; i++) {
          if (this.productList[i].checked) {
            this.ids += "'" + this.productList[i].id + "',";
            this.indexList.push(i);
          }
        }
      } else {
        this.$toast("请选择要翻译的产品");
        return;
      }
      //  请求
      this.ids = this.ids.substring(0, this.ids.length - 1);
      let data = {
        userId: this.infoData.id,
        ids: this.ids,
      };

      console.log("data ==>", data);
      let loading = this.$toast.loading({
        message: "删除产品中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
      this.$axios({
        method: "POST",
        url: "/sigaoyi/deteletproduct",
        params: data,
      })
        .then((result) => {
          loading.clear();
          console.log("result ==>", result);
          if (result.data.code == "200") {
            for (let i = this.indexList.length - 1; i >= 0; i--) {
              this.productList.splice(this.indexList[i], 1);
            }
            this.$toast(result.data.msg);
          } else {
            this.$toast(result.data.msg);
          }
        })
        .catch((err) => {
          loading.clear();
          this.$toast("系统业务繁忙,请稍后再试");
          console.log("err ==>", err);
        });
    },
  },
};
</script>

<style>
</style>