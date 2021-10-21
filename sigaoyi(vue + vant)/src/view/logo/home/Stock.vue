<template>
  <div class="stock" :style="{ height: H + 'px' }">
    <div class="title">
      <van-nav-bar
        v-if="isSearch"
        title="库存列表"
        left-text="返回"
        left-arrow
        fixed
        @click-left="onClickLeft"
        @click-right="isSearch = false"
      >
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
      <van-search
        v-else
        v-model="searchVal"
        show-action
        placeholder="请输入搜索认领人员"
        @search="getStockList('search')"
        @cancel="isSearch = true"
      />
    </div>
    <div class="tabs">
      <van-tabs
        v-model="tabsIndex"
        color="#409eff"
        @click="getStockList('search')"
      >
        <van-tab
          v-for="(item, index) in tabsList"
          :key="index"
          :title="item.name"
        >
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="isLoading"
              :error.sync="error"
              error-text="请求失败，点击重新加载"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :immediate-check="false"
            >
              <div class="allList" v-if="skeletonState">
                <!-- 有数据 -->
                <div class="list" v-if="stockList.length > 0">
                  <van-cell v-for="(item, index) in stockList" :key="index">
                    <div class="stockList">
                      <div class="orderNum">
                        <div>单号：{{ item.name }}</div>
                        <div>{{ item.statusText }}</div>
                      </div>
                      <div class="img_belonger">
                        <div class="image">
                          <img :src="item.imgSrc" alt="" />
                        </div>
                        <div class="belonger">
                          <div class="orderNo">
                            <span>订单编号：{{ item.orderNo }}</span>
                            <span>x{{ item.quantity }}</span>
                          </div>
                          <div class="v-belonger">
                            <span>认领人员：{{ item.belonger }}</span>
                          </div>
                          <div class="time">
                            <span>入库时间：{{ item.storageTimeText }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="btn">
                        <van-button
                          type="danger"
                          size="mini"
                          v-if="
                            infoData.statu == '0' || infoData.sysAdmini == '0'
                          "
                          @click="deleteStockList(item, index)"
                          >删除</van-button
                        >
                        <van-button
                          type="info"
                          size="mini"
                          @click="gotoDetails(item)"
                          >编辑</van-button
                        >
                      </div>
                    </div>
                  </van-cell>
                </div>
                <!-- 无数据 -->
                <div class="emptyList" v-else>
                  <van-empty description="库存空空如也" />
                </div>
              </div>
              <!-- 骨架屏 -->
              <div class="skeleton" v-else>
                <div
                  class="v-skeleton"
                  v-for="(item, index) in skeleton"
                  :key="index"
                >
                  <van-skeleton :row="1" row-width="101%" />
                  <van-skeleton
                    avatar-size="60"
                    avatar-shape="square"
                    row-width="101%"
                    style="margin-top: 10px"
                    avatar
                    :row="2"
                  />
                  <van-skeleton
                    :row="1"
                    row-width="101%"
                    style="margin-top: 10px"
                  />
                  <van-skeleton
                    :row="1"
                    row-width="101%"
                    style="margin-left: 50%; margin-top: 10px"
                  />
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import "@/assets/less/stock/stock.css";
import dateFormats from "@/assets/js/dateFormat";
export default {
  data() {
    return {
      H: "",
      infoData: {},
      // 搜素
      isSearch: true,
      searchVal: "",
      // 状态
      tabsIndex: 0,
      tabsList: [
        { name: "全部", value: 99 },
        { name: "待出库", value: 3 },
        { name: "已出库", value: 4 },
        { name: "已退回", value: 5 },
      ],
      // 下拉刷新
      refreshing: false,
      isLoading: false,
      finished: false,
      error: false,
      // 库存数据
      stockList: [],
      pages: 1,
      amount: 30,
      total: 0,
      // 骨架屏状态
      skeletonState: false,
      skeleton: 4,
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log("from.path ==>", from.path);
    if (from.path == "/changeStock") {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }
    console.log(" to.meta.isBack ==>", to.meta.isBack);
    next();
  },
  activated() {
    this.H = document.documentElement.clientHeight;
    this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
    if (!this.$route.meta.isBack) {
      if (this.infoData == undefined || this.infoData == null) {
      } else {
        this.tabsIndex = 0;
        this.pages = 1;
        this.amount = 30;
        this.total = 0;
        this.skeletonState = false;
        (this.refreshing = false),
          (this.isLoading = false),
          (this.finished = false),
          (this.error = false),
          (this.stockList = []);
        this.getStockList("start");
      }
    } else {
      console.log("不重新获取数据!!!");
      this.$route.meta.isBack = false;

      if (this.$route.query.firtRouter) {
        this.getStockList("refresh");
      }
    }
  },
  created() {},
  methods: {
    getAdminiStrators() {
      if (
        this.infoData.userName == "王焕杰" ||
        this.infoData.userName == "任治琴" ||
        this.infoData.userName == "李健明" ||
        this.infoData.userName == "王杰" ||
        this.infoData.userName == "hzsugoi"
      ) {
        this.infoData["sysAdmini"] = "0";
      }
    },
    //  返回
    onClickLeft() {
      this.$router.push({ name: "Home" });
    },
    // 时间转换
    dateFormat(times) {
      let date = new Date(times);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let time = y + "-" + m + "-" + d;
      return time;
    },
    // 初始获取库存列表
    getStockList(string) {
      //   参数
      let data = {
        userId: this.infoData.id,
        pages: this.pages,
        amount: this.amount,
        status: this.tabsList[this.tabsIndex].value,
        belonger: this.searchVal, // 认领人
        invoicingName: "", // 单号
        storageTime: "", // 入库时间
      };
      if (string == "start" || string == "search") {
        //   loading
        var loading = this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner",
          duration: "0",
        });
      }
      this.$axios({
        url: "/sigaoyi/NEWinStock",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          this.skeletonState = true;
          this.isLoading = false;
          if (string == "start" || string == "search") {
            loading.clear();
          }
          if (result.data.Code == 200) {
            if (string == "refresh") {
              this.refreshing = false;
              this.finished = false;
            }
            // 处理状态
            let obj = {
              3: "待出库",
              4: "已出库",
              5: "已退回",
            };
            result.data.invoicings.forEach((e) => {
              e["storageTimeText"] = this.dateFormat(e.storageTime);
              for (const key in obj) {
                if (e.status == key) {
                  e["statusText"] = obj[key];
                }
              }
              if (e.img == "") {
                e["imgSrc"] =
                  "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg";
              } else {
                e["imgSrc"] = e.img;
              }
            });
            this.stockList = result.data.invoicings;
            this.total = result.data.page.total;
          } else {
            if (string == "refresh") {
              this.refreshing = false;
              this.finished = false;
            }
            this.$dialog({ message: result.data.msg });
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.skeletonState = true;
          if (string == "start" || string == "search") {
            loading.clear();
          } else if (string == "refresh") {
            this.refreshing = false;
            this.finished = false;
            this.error = true;
          }
          console.log("err ==>", err);
          this.$dialog({ message: "系统服务繁忙,请稍后再试!" });
        });
    },
    // 下拉刷新
    onRefresh() {
      console.log("下拉刷新");
      this.searchVal = "";
      this.finished = false;
      this.isLoading = false;
      this.error = false;
      // 重新加载数据
      this.amount = 30;
      this.pages = 1;
      this.onLoadStatus = true;
      this.getStockList("refresh");
    },
    // 异步加载
    onLoad() {
      this.finished = false;
      if (this.stockList.length >= this.total) {
        this.finished = true;
        this.isLoading = true;
        return;
      }
      this.amount += 30;
      this.pages = 1;
      this.getStockList("refresh");
    },
    // 编辑
    gotoDetails(item) {
      this.$router.push({
        name: "ChangeStock",
        query: { item: JSON.stringify(item) },
      });
    },
    // 删除
    deleteStockList(item, index) {
      var loading = this.$toast.loading({
        message: "删除中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "0",
      });
      this.$axios({
        url: "/sigaoyi/delectInvoicing",
        method: "POST",
        params: {
          ids: item.id,
        },
      })
        .then((result) => {
          loading.clear();
          console.log("result ==>", result);
          if (result.data.code == "200") {
            this.stockList.splice(index, 1);
            this.$dialog({ message: result.data.msg ,confirmButtonColor:"#409eff"});
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