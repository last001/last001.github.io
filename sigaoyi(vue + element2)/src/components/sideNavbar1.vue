<template>
  <div
    class="left"
    ref="left"
    :class="WstateStatus ? 'active' : ''"
    :style="{ width: W + 'px', height: 100 + '%' }"
  >
    <div class="widthBox">
      <!-- sigoyi -->
      <div class="logoBox">
        <div class="logoName" v-if="WstateStatus">{{ company }}</div>
        <div class="logo" v-else>
          <img :src="logoImg" alt="" />
        </div>
      </div>
      <!-- 左边导航栏 -->
      <div class="B-left">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              :default-openeds="openedsList"
              class="el-menu-vertical-demo"
              background-color="#444"
              text-color="#fff"
              :unique-opened="true"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-submenu
                v-for="(item, index) in sideNavbarList"
                :index="`${index + 1}`"
                :key="index"
                :class="item.isChildA ? '' : 'active'"
                v-show="item.showState"
              >
                <!-- 一级 -->
                <template slot="title">
                  <el-menu-item
                    @click="clickTitleA(item)"
                    style="padding-left: 0; min-width: 0"
                    :class="item.isRoute ? 'active' : ''"
                  >
                    <i :class="item.iconSrc" style="color: #fff"></i>
                    <span>{{ item.titleA }}</span>
                  </el-menu-item>
                </template>
                <!-- 二级 -->
                <el-submenu
                  v-for="(ele, i) in item.titleAList"
                  :key="i"
                  :index="`${index + 1}-${i + 1}`"
                  :class="ele.isChildB ? '' : 'active'"
                  class="titleB"
                  v-show="ele.showState"
                >
                  <template slot="title">
                    <el-menu-item
                      style="padding-left: 0; min-width: 0"
                      :class="ele.isRoute ? 'isroute' : ''"
                      @click="clickTitleB(ele)"
                    >
                      <span>{{ ele.titleB }}</span>
                    </el-menu-item>
                  </template>
                  <!-- 三级 -->
                  <el-menu-item
                    style="padding-left: 32px; min-width: 0"
                    class="titleC"
                    v-show="ele.isChildB"
                    v-for="(e, k) in ele.titleBList"
                    :key="k"
                    :class="e.isRoute ? 'isrouteC' : ''"
                    :index="`${index + 1}-${i + 1}-${k + 1}`"
                    @click="clickTitleC(e)"
                  >
                    {{ e.titleC }}
                  </el-menu-item>
                </el-submenu>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");

import "../assets/less/sideNavbar1/sideNavbar1.less";
export default {
  data() {
    return {
      activeName: "0",
      // 展开初始值
      W: 220,
      screenHeight: document.documentElement.clientHeight,
      // 侧边栏 List  A 一级   B 二级   C 三级
      sideNavbarList: [
        //   Home
        {
          titleA: "Home",
          iconSrc: "el-icon-s-home",
          isChildA: false,
          isRoute: false,
          showState: true,
          routerSrc: "Home",
          titleAList: [],
        },
        //   产品管理
        {
          titleA: "产品管理",
          iconSrc: "el-icon-s-goods",
          isChildA: true,
          showState: true,
          titleAList: [
            {
              titleB: "产品采集",
              isChildB: false,
              routerSrc: "ProductDevelopment",
              routerPath: "products",
              isRoute: false,
              isActive: false,
              showState: true,
            },
            {
              titleB: "产品库",
              isChildB: false,
              routerSrc: "ProductControl",
              routerPath: "products",
              isRoute: false,
              isActive: false,
              showState: true,
            },
          ],
        },
        //   订单管理
        {
          titleA: "订单管理",
          iconSrc: "el-icon-s-order",
          isChildA: true,
          showState: true,
          titleAList: [
            {
              titleB: "趣天店铺订单",
              isChildB: false,
              routerSrc: "QutianOrder",
              routerPath: "productOrder",
              isRoute: false,
              isActive: false,
              showState: true,
            },
          ],
        },
        //   物流管理
        {
          titleA: "物流管理",
          iconSrc: "el-icon-s-promotion",
          isChildA: true,
          showState: true,
          titleAList: [
            {
              titleB: "物流订单",
              isChildB: false,
              routerSrc: "LogisticsOrder",
              routerPath: "logistics",
              isRoute: false,
              isActive: false,
              showState: true,
            },
            {
              titleB: "物流渠道",
              isChildB: false,
              routerSrc: "LogisticsChannel",
              routerPath: "logistics",
              isRoute: false,
              isActive: false,
              showState: true,
            },
          ],
        },
        //   采购管理
        {
          titleA: "采购管理",
          iconSrc: "el-icon-s-open",
          isChildA: true,
          showState: true,
          titleAList: [
            {
              titleB: "采购单",
              isChildB: false,
              routerSrc: "PurchaseOrder",
              routerPath: "purchase",
              isRoute: false,
              isActive: false,
              showState: true,
            },
          ],
        },
        //   库存管理
        {
          titleA: "库存管理",
          iconSrc: "el-icon-s-cooperation",
          isChildA: true,
          showState: true,
          titleAList: [
            {
              titleB: "库存列表",
              isChildB: false,
              routerSrc: "PurchaseList",
              routerPath: "purchaSellStock",
              isRoute: false,
              isActive: false,
              showState: true,
            },
            {
              titleB: "进出库记录",
              isChildB: false,
              routerSrc: "Record",
              routerPath: "purchaSellStock",
              isRoute: false,
              isActive: false,
              showState: true,
            },
            {
              titleB: "入库",
              isChildB: false,
              routerSrc: "Godown",
              routerPath: "purchaSellStock",
              isRoute: false,
              isActive: false,
              showState: true,
            },
          ],
        },
        //   店铺管理
        {
          titleA: "店铺管理",
          iconSrc: "el-icon-s-shop",
          isChildA: true,
          showState: true,
          titleAList: [
            {
              titleB: "授权",
              isChildB: false,
              routerSrc: "Authorization",
              routerPath: "shop",
              isRoute: false,
              isActive: false,
              showState: true,
            },
          ],
        },
        //   公司管理
        {
          titleA: "公司管理",
          iconSrc: "el-icon-s-custom",
          isChildA: true,
          showState: true,
          titleAList: [
            {
              titleB: "公司管理",
              isChildB: false,
              routerSrc: "CompanyMange",
              routerPath: "companyParent",
              isRoute: false,
              isActive: false,
              showState: true,
            },
            {
              titleB: "部门管理",
              isChildB: false,
              routerSrc: "Divisional",
              routerPath: "companyParent",
              isRoute: false,
              isActive: false,
              showState: true,
            },
            {
              titleB: "员工管理",
              isChildB: false,
              routerSrc: "StaffManagementDefault",
              routerPath: "companyParent",
              isRoute: false,
              isActive: false,
              showState: true,
            },
            {
              titleB: "绩效管理",
              isChildB: false,
              routerSrc: "PerformanceDefault",
              routerPath: "companyParent",
              isRoute: false,
              isActive: false,
              showState: true,
            },
            {
              titleB: "工作管理",
              isChildB: false,
              routerSrc: "WorkDeault",
              routerPath: "companyParent",
              isRoute: false,
              isActive: false,
              showState: true,
            },
          ],
        },
        //   财务管理
        {
          titleA: "财务管理",
          iconSrc: "el-icon-money",
          isChildA: true,
          showState: true,
          titleAList: [
            {
              titleB: "充值提现",
              isChildB: false,
              routerSrc: "RechargeWidthdraw",
              routerPath: "financeList",
              isRoute: false,
              isActive: false,
              showState: true,
            },
            {
              titleB: "消费明细",
              isChildB: false,
              routerSrc: "ConsumptionDetail",
              routerPath: "financeList",
              isRoute: false,
              isActive: false,
              showState: true,
            },
            // {
            //   titleB: "收付款操作",
            //   isChildB: true,
            //   routerSrc: "",
            //   routerPath: "financeList",
            //   isRoute: false,
            //   isActive: false,
            //   showState: true,
            //   titleBList: [
            //     {
            //       titleC: "充值提现",
            //       routerSrc: "RechargeWidthdraw",
            //       isActive: false,
            //       isRoute: false,
            //     },
            //     {
            //       titleC: "消费明细",
            //       routerSrc: "ConsumptionDetail",
            //       isActive: false,
            //       isRoute: false,
            //     },
            //   ],
            // },
            {
              titleB: "员工提成",
              isChildB: false,
              routerSrc: "StaffCommission",
              routerPath: "financeList",
              isRoute: false,
              isActive: false,
              showState: true,
            },
            // 0000
            {
              titleB: "利润统计",
              isChildB: false,
              routerSrc: "ProfitCensus",
              routerPath: "financeList",
              isRoute: false,
              isActive: false,
              showState: true,
            },
            {
              titleB: "数据分析",
              isChildB: false,
              routerSrc: "DatAnalysis",
              routerPath: "financeList",
              isRoute: false,
              isActive: false,
              showState: true,
            },
            {
              titleB: "供应商往来款",
              isChildB: false,
              routerSrc: "DatAnalysis",
              routerPath: "financeList",
              isRoute: false,
              isActive: false,
              showState: true,
            },
          ],
        },
        //   系统管理
        {
          titleA: "系统管理",
          iconSrc: "el-icon-s-tools",
          isChildA: true,
          showState: false,
          titleAList: [
            {
              titleB: "登录记录",
              isChildB: false,
              routerSrc: "LoginRecord",
              routerPath: "system",
              isRoute: false,
              isActive: false,
              showState: true,
            },
            {
              titleB: "账号管理",
              isChildB: false,
              routerSrc: "AccountAcceptDefault",
              routerPath: "system",
              isRoute: false,
              isActive: false,
              showState: true,
            },
            {
              titleB: "财务管理",
              isChildB: false,
              routerSrc: "Financetor",
              routerPath: "system",
              isRoute: false,
              isActive: false,
              showState: true,
            },
            {
              titleB: "客户跟进",
              isChildB: false,
              routerSrc: "CustomerFollowDefault",
              routerPath: "system",
              isRoute: false,
              isActive: false,
              showState: true,
            },
            {
              titleB: "用户信息",
              isChildB: false,
              routerSrc: "UserInfo",
              routerPath: "system",
              isRoute: false,
              isActive: false,
              showState: true,
            },
            {
              titleB: "发布通知",
              isChildB: false,
              routerSrc: "Notice",
              routerPath: "system",
              isRoute: false,
              isActive: false,
              showState: true,
            },
          ],
        },
        //   辅助管理
        {
          titleA: "辅助管理",
          iconSrc: "el-icon-s-help",
          isChildA: true,
          showState: true,
          titleAList: [
            {
              titleB: "教学文档",
              isChildB: false,
              routerSrc: "TutorialDocument",
              routerPath: "help",
              isRoute: false,
              isActive: false,
              showState: true,
            },
            {
              titleB: "教学视频",
              isChildB: false,
              routerSrc: "VideoCourse",
              routerPath: "help",
              isRoute: false,
              isActive: false,
              showState: true,
              titleBList: [
                { titleC: "变体修改", routerSrc: "VideoCourse" },
                { titleC: "标题价格详情修改", routerSrc: "VideoCourse" },
                { titleC: "订单处理", routerSrc: "VideoCourse" },
                { titleC: "抓取及上架流程", routerSrc: "VideoCourse" },
                { titleC: "趣天变体修改", routerSrc: "VideoCourse" },
                { titleC: "上架与采集上架", routerSrc: "VideoCourse" },
                { titleC: "趣天订单处理", routerSrc: "VideoCourse" },
              ],
            },
            {
              titleB: "运费估算",
              isChildB: false,
              routerSrc: "FreightComputers",
              routerPath: "help",
              isRoute: false,
              isActive: false,
              showState: true,
            },
            {
              titleB: "URL转换",
              isChildB: false,
              routerSrc: "ImageOnlineURL",
              routerPath: "help",
              isRoute: false,
              isActive: false,
              showState: true,
            },
          ],
        },
        //   个人中心
        // {
        //   titleA: "个人中心",
        //   iconSrc: "el-icon-menu",
        //   isChildA: false,
        //   isRoute: false,
        //   showState: true,
        //   routerSrc: "PersonalInfo",
        //   titleAList: [],
        // },
      ],
      openedsList: [],
      // 默认key(打开 关闭);
      handleIndex: 0,
      logoImg: "",
      company: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  activated() {
    // 解决不缓存跳到缓存的leftNavbar 不展开问题
    // if (this.WstateStatus && this.$route.meta.keepAlive) {
    //   this.setWstateStatus(false);
    //   this.clickW();
    // }
    // if (!this.WstateStatus && this.$route.meta.keepAlive) {
    //   this.setWstateStatus(true);
    //   this.clickW();
    // }

    // 获取公司  + 管理员
    this.getCompanyName();
    // 检测路由
    this.testRouter();
  },
  created() {
    // 解决缓存跳到不缓存的leftNavbar 展开问题
    // if (!this.WstateStatus && !this.$route.meta.keepAlive) {
    //   this.setWstateStatus(true);
    //   this.clickW();
    // } else if (this.WstateStatus && !this.$route.meta.keepAlive) {
    //   this.setWstateStatus(false);
    //   this.clickW();
    // }
    // 获取公司  + 管理员
    this.getCompanyName();
    // 检测路由
    this.testRouter();
  },
  computed: {
    ...homeState([
      "WstateStatus",
      "num",
      "InfoData",
      "sideStatus",
      "companyData",
      "pagingList",
    ]),
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.documentElement.clientHeight;
        that.screenHeight = window.screenHeight;
      })();
    };
  },

  methods: {
    // clickMe宽度
    clickW() {
      if (this.WstateStatus) {
        this.setIsChildren(false);
        this.setArrow(false);
        this.setWstateStatus(false);
        this.leftArow = false;
        this.W = 50;
        // 侧边栏
        this.openedsList = [];
        this.sideNavbarList.forEach((e) => {
          e.isChildA = false;
        });
      } else {
        this.setWstateStatus(true);
        this.leftArow = true;
        this.W = 220;
        // 侧边栏
        this.sideNavbarList.forEach((e) => {
          e.isChildA = true;
          if (e.titleAList.length == 0) {
            e.isChildA = false;
          }
        });
        this.testRouter();
      }
      this.$emit("Wstate", this.WstateStatus);
      console.log("this.iconSrc ==>", this.iconSrc);
    },
    clickTitleA(item) {
      if (!this.WstateStatus) {
        this.clickW();
        return;
      }
      if (item.isChildA) {
        return;
      }
      if (item.titleA == "Home") {
        this.$router.push({ name: item.routerSrc });
        return;
      }
      item.isActive = true;
      item["titleB"] = item.titleA;
      this.setPagingList(item);
      this.$router.push({ name: item.routerSrc });
    },
    clickTitleB(ele) {
      if (ele.isChildB) {
        return;
      }
      ele.isActive = true;
      this.setPagingList(ele);
      this.$router.push({ name: ele.routerSrc });
      //   this.$parent.$refs.titlePage.GetRouterName();
    },
    clickTitleC(e) {
      e.isActive = true;
      e["titleB"] = e.titleC;
      this.setPagingList(e);
      this.$router.push({ name: e.routerSrc });
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    // 获取公司名字 + 管理员
    getCompanyName() {
      //   console.log("this.companyData ==>", this.companyData);
      if (this.companyData.id) {
        if (
          this.companyData.companyName == "" ||
          this.companyData.companyName == undefined
        ) {
          this.company = "思高易网络科技";
        } else {
          this.company = this.companyData.companyName;
        }
        if (
          this.companyData.companyImg == "" ||
          this.companyData.companyImg == undefined
        ) {
          this.logoImg = require("../assets/img/icon.png");
        } else {
          this.logoImg = this.companyData.companyImg;
        }
      } else {
        this.company = "思高易网络科技";
        this.logoImg = require("../assets/img/icon.png");
      }

      // 管理员
      if (this.InfoData.statu == "0") {
        this.sideNavbarList.forEach((e) => {
          e.showState = true;
        });
      } else {
        this.sideNavbarList.forEach((e) => {
          e.showState = true;
          if (e.titleA == "系统管理") {
            e.showState = false;
          }
          // 订单管理员
          if (
            this.InfoData.userName == "任治琴" ||
            this.InfoData.userName == "李健明" ||
            this.InfoData.userName == "王杰" ||
            this.InfoData.userName == "hzsugoi"
          ) {
            e.titleAList.forEach((el) => {
              el.showState = true;
            });
          } else {
            e.titleAList.forEach((el) => {
              el.showState = true;
              if (el.titleB == "入库") {
                el.showState = false;
              }
            });
          }
        });
      }
    },
    // 检测路由
    testRouter() {
      //   console.log("检测路由");
      //   console.log("this.$route.path ==>", this.$route.path);
      this.openedsList = [];
      this.sideNavbarList.forEach((e, i) => {
        e.isRoute = false;
        // 一级
        if (e.routerSrc == this.$route.name) {
          e.isRoute = true;
          return;
        }
        // 二级
        e.titleAList.forEach((el, k) => {
          el.isRoute = false;
          if (this.$route.name == "Home") {
            return;
          }
          if (this.$route.name == "OrderDetail" && el.titleB == "产品订单") {
            el.isRoute = true;
            this.openedsList.push((i + 1).toString());
            this.setPagingList(el);
            return;
          }
          // 三级
          if (el.isChildB) {
            el.titleBList.forEach((ele) => {
              ele.isRoute = false;
              if (this.$route.name == ele.routerSrc) {
                ele.isRoute = true;
                this.openedsList.push(`${i + 1}`);
                this.openedsList.push(`${i + 1}-${k + 1}`);
                console.log(this.openedsList);
                // 初始添加入 pagingList
                // this.setPagingList(ele);
              }
            });
            return;
          }
          if (this.$route.name == el.routerSrc) {
            el.isRoute = true;
            this.openedsList.push((i + 1).toString());
            // 初始添加入 pagingList
            this.setPagingList(el);
          }
        });
      });
    },

    ...homeActions([
      "setWstateStatus",
      "setNum",
      "setIsChildren",
      "setArrow",
      "setVideoSrc",
      "setPagingList",
    ]),
  },
  watch: {
    screenHeight(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function () {
          that.timer = false;
        }, 400);
      }
    },
  },
};
</script>
