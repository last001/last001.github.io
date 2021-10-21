<template>
  <div class="navbar clearfix" ref="titleNavbar">
    <div class="logoBox fl" @click="goHome()">
      <div class="logo">
        <img :src="logoImg" alt="" />
      </div>
      <div class="logoName">{{ company }}</div>
    </div>
    <!-- 类型 -->
    <div
      class="typeList fl"
      @mouseover="mouseStatus && over()"
      @mouseout="mouseStatus && out()"
    >
      <div
        v-for="(item, index) in typeList"
        :key="index"
        :class="item.isActive ? 'active' : ''"
        @click="toggleRouter(item, index)"
        v-show="item.showStatus"
      >
        <i :class="item.iconSrc"></i>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div
      class="number fr"
      @mouseover="isLogin && overInformation()"
      @mouseleave="leaveInformation()"
    >
      <div
        class="numberDis"
        :style="{ paddingLeft: pLeft + 'px' }"
        @click="!isLogin && goLogin()"
      >
        <div class="head">
          <img :src="headerUrl" alt="" />
        </div>
        <div class="loginText active" v-if="!isLogin">请先登陆</div>
        <div class="head-info" v-else>
          <div class="number">编号：{{ number }}</div>
          <div class="number">姓名：{{ Vname }}</div>
        </div>
      </div>
      <div class="InformationDiv" v-show="listStatus">
        <div @click="clickPersonInfo()">
          <span class="iconfont icon-gerenxinxi"></span>个人中心
        </div>
        <div @click="goHome()">
          <span class="iconfont icon-fanhuishouye"></span>返回首页
        </div>
        <div @click="goLogin()">
          <span class="iconfont icon-tuichudenglu"></span>退出登陆
        </div>
      </div>
    </div>
    <!-- 通知 -->
    <div class="release">
      <el-dialog
        :visible.sync="releaseStatus"
        width="56%"
        :modal="false"
        center
        @close="closex"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <span slot="title">
          即时通知<i>(需等待15s之后点击已阅读则关闭)</i>
        </span>
        <div class="release-content">
          <div>
            <span>发布人：</span>
            <input type="text" disabled v-model="noticeLit.releaseUser" />
          </div>
          <div>
            <span>发布时间：</span>
            <input type="text" disabled v-model="noticeLit.releaseTime" />
          </div>
          <div>
            <span>公告标题：</span>
            <input type="text" disabled v-model="noticeLit.title" />
          </div>
          <div>
            <span>公告内容：</span>
            <textarea
              name=""
              id=""
              disabled
              cols="30"
              rows="10"
              v-model="noticeLit.content"
            ></textarea>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="readStatus && read()">{{
            releaseText
          }}</el-button>
        </span>
      </el-dialog>
    </div>
    <div
      class="mask clearfix"
      v-show="maskStatus"
      @mouseover="maskStatus = true"
      @mouseout="maskStatus = false"
    >
      <div class="text fl">
        <div
          v-for="(item, index) in titleList"
          :key="index"
          v-show="item.hidden"
        >
          <span
            v-for="(ele, i) in item.list"
            :key="i"
            :class="ele.active ? 'active' : ''"
            v-show="ele.showStatus"
            @click="GotoRouter(ele)"
            >{{ ele.name }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/titleNavbar/titleNavbar.css";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  props: ["getParent"],
  data() {
    return {
      titleList: [
        //   home
        {
          text: "HOME",
          hidden: true,
          list: [
            { name: "HOME", routeName: "Home", active: true, showStatus: true },
          ],
        },
        // 产品管理
        {
          text: "产品管理",
          hidden: true,
          list: [
            {
              name: "产品采集",
              routeName: "ProductDevelopment",
              active: false,
              showStatus: true,
            },
            {
              name: "产品库",
              routeName: "ProductControl",
              active: false,
              showStatus: true,
            },
          ],
        },
        // 订单管理
        {
          text: "订单管理",
          hidden: true,
          list: [
            {
              name: "产品订单",
              routeName: "ProductOrderDefault",
              active: false,
              showStatus: true,
            },
          ],
        },
        // 库存管理
        {
          text: "库存管理",
          hidden: true,
          list: [
            {
              name: "库存列表",
              routeName: "PurchaseList",
              active: false,
              showStatus: true,
            },
            {
              name: "库存记录",
              routeName: "Record",
              active: false,
              showStatus: true,
            },
            {
              name: "入库",
              routeName: "Godown",
              active: false,
              showStatus: true,
            },
          ],
        },
        // 店铺管理
        {
          text: "店铺管理",
          hidden: true,
          list: [
            {
              name: "店铺授权",
              routeName: "Authorization",
              active: false,
              showStatus: true,
            },
          ],
        },
        // 公司管理
        {
          text: "公司管理",
          hidden: true,
          list: [
            {
              name: "公司管理",
              routeName: "CompanyMange",
              active: false,
              showStatus: true,
            },
            {
              name: "部门管理",
              routeName: "Divisional",
              active: false,
              showStatus: true,
            },
            {
              name: "员工管理",
              routeName: "StaffManagementDefault",
              active: false,
              showStatus: true,
            },
            {
              name: "绩效管理",
              routeName: "PerformanceDefault",
              active: false,
              showStatus: true,
            },
            {
              name: "工作排期",
              routeName: "WorkDeault",
              active: false,
              showStatus: true,
            },
          ],
        },
        // 财务管理
        {
          text: "财务管理",
          hidden: true,
          list: [
            {
              name: "充值提现",
              routeName: "RechargeWidthdraw",
              active: false,
              showStatus: true,
            },
            {
              name: "消费明细",
              routeName: "ConsumptionDetail",
              active: false,
              showStatus: true,
            },
            {
              name: "员工提成",
              routeName: "StaffCommission",
              active: false,
              showStatus: true,
            },
          ],
        },
        // 系统管理
        {
          text: "系统管理",
          hidden: false,
          list: [
            {
              name: "登录记录",
              routeName: "LoginRecord",
              active: false,
              showStatus: true,
            },
            {
              name: "账号管理",
              routeName: "AccountAcceptDefault",
              active: false,
              showStatus: true,
            },
            {
              name: "财务管理",
              routeName: "Financetor",
              active: false,
              showStatus: true,
            },
            {
              name: "客户跟进",
              routeName: "CustomerFollowDefault",
              active: false,
              showStatus: true,
            },
            {
              name: "用户信息",
              routeName: "UserInfo",
              active: false,
              showStatus: true,
            },
            {
              name: "发布通知",
              routeName: "Notice",
              active: false,
              showStatus: true,
            },
          ],
        },
        // 帮助教程
        {
          text: "帮助教程",
          hidden: true,
          list: [
            {
              name: "教程文件",
              routeName: "TutorialDocument",
              active: false,
              showStatus: true,
            },
            {
              name: "视频教学",
              routeName: "VideoCourse",
              active: false,
              showStatus: true,
            },
          ],
        },
        // 其他功能
        {
          text: "其他功能",
          hidden: true,
          list: [
            {
              name: "个人中心",
              routeName: "PersonalInfo",
              active: false,
              showStatus: true,
            },
            {
              name: "运费估算",
              routeName: "FreightComputers",
              active: false,
              showStatus: true,
            },
            {
              name: "URL转换",
              routeName: "ImageOnlineURL",
              active: false,
              showStatus: true,
            },
          ],
        },
      ],
      // 提示文字
      ExitText: "",
      typeList: [
        {
          name: "HOME",
          isActive: true,
          iconSrc: "el-icon-s-home",
          routerName: "Home",
          pathName: "home",
          showStatus: true,
        },
        {
          name: "产品管理",
          isActive: false,
          iconSrc: "el-icon-s-goods",
          routerName: "Products",
          pathName: "products",
          showStatus: true,
        },
        {
          name: "订单管理",
          isActive: false,
          iconSrc: "el-icon-s-order",
          routerName: "ProductOrder",
          pathName: "productOrder",
          showStatus: true,
        },
        {
          name: "库存管理",
          isActive: false,
          iconSrc: "el-icon-s-cooperation",
          routerName: "PurchaSellStock",
          pathName: "purchaSellStock",
          showStatus: true,
        },
        {
          name: "店铺管理",
          isActive: false,
          iconSrc: "el-icon-s-shop",
          routerName: "Shop",
          pathName: "shop",
          showStatus: true,
        },
        {
          name: "公司管理",
          isActive: false,
          iconSrc: "el-icon-s-custom",
          routerName: "CompanyParent",
          pathName: "companyParent",
          showStatus: true,
        },
        {
          name: "财务管理",
          isActive: false,
          iconSrc: "el-icon-money",
          routerName: "FinanceList",
          pathName: "financeList",
          showStatus: true,
        },
        {
          name: "系统管理",
          isActive: false,
          iconSrc: "el-icon-s-tools",
          routerName: "System",
          pathName: "system",
          showStatus: false,
        },
        {
          name: "帮助教程",
          isActive: false,
          iconSrc: "el-icon-s-help",
          routerName: "Help",
          pathName: "help",
          showStatus: true,
        },
        {
          name: "其他功能",
          isActive: false,
          iconSrc: "el-icon-menu",
          routerName: "Other",
          pathName: "other",
          showStatus: true,
        },
      ],
      listStatus: false,
      // 头像padding-left的值
      pLeft: 100,
      number: "",
      Vname: "",
      logoImg: "",
      company: "",
      isLogin: false,
      //  鼠标移上展示面板
      ExitShow: false,
      //   headerUrl
      headerUrl: "",
      //   000
      //通知状态值
      releaseStatus: false,
      // 通知按钮文字
      releaseText: "剩余15s",
      //   通知按钮状态值
      readStatus: false,
      //通知的信息
      noticeLit: {
        releaseUser: "",
        releaseTime: "",
        title: "",
        content: "",
      },
      //   取消id
      noticeId: 0,
      maskStatus: false,
      mouseStatus: false,
    };
  },
  created() {
    // if (this.InfoData.userName == "测试" || this.InfoData.userName == "测试1") {
    //   this.mouseStatus = true;
    // } else {
    //   this.mouseStatus = false;
    // }
    this.detection();
    this.GetNotice();
    this.getInfoData();
  },
  activated() {
    // if (this.InfoData.userName == "测试" || this.InfoData.userName == "测试1") {
    //   this.mouseStatus = true;
    // } else {
    //   this.mouseStatus = false;0
    // }
    this.detection();
    this.GetNotice();
    this.getInfoData();
  },
  computed: {
    ...homeState([
      "InfoData",
      "EscCode",
      "headList",
      "homeTitleStatus",
      "companyData",
    ]),
  },
  methods: {
    // 0000
    over() {
      this.maskStatus = true;
    },
    out() {
      this.maskStatus = false;
    },
    GotoRouter(ele) {
      if (ele.routeName == this.$route.name) {
        return;
      }
      this.titleList.forEach((e) => {
        e.list.forEach((el) => {
          el.active = false;
        });
      });
      ele.active = true;
      this.maskStatus = false;
      this.$router.push({ name: ele.routeName });
    },
    //   切换路由
    toggleRouter(item, index) {
      if (item.isActive) {
        return;
      }
      this.typeList.forEach((e) => {
        e.isActive = false;
      });
      item.isActive = true;

      this.maskStatus = false;
      this.detection();
      this.$router.push({ name: item.routerName });
    },
    // 检测路由
    detection() {
      //   typeList
      this.typeList.forEach((e) => {
        e.isActive = false;
        if (this.$route.name == "ProductDetails") {
          if (e.name == "产品管理") {
            e.isActive = true;
          }
          return;
        }
        if (this.$route.path.indexOf(e.pathName) > -1) {
          e.isActive = true;

          if (e.pathName == "system") {
            if (this.InfoData.statu != "0") {
              alert("您不是管理员");
              this.$router.back();
              return;
            }
          }
        }
      });
      // titleList

      this.titleList.forEach((e) => {
        e.list.forEach((el) => {
          if (this.$route.name == el.routeName) {
            el.active = true;
          } else {
            el.active = false;
          }
        });
      });
    },
    // 获取初始值
    getInfoData() {
      if (sessionStorage.getItem("token") == undefined) {
        return;
      }
      if (this.InfoData.id == undefined) {
        return;
      }

      this.isLogin = true;
      //   this.userName = this.InfoData.mail;
      this.number = 10850 + this.InfoData.id;
      this.Vname = this.InfoData.userName;
      if (this.InfoData.img == "" || this.InfoData.img == undefined) {
        this.headerUrl =
          "http://www.ec-sigaoyi.com/imagelink/1626948164266.jpg";
      } else {
        this.headerUrl = this.InfoData.img;
      }

      //  gongsi
      if (this.companyData.id) {
        if (
          this.companyData.companyName == "" ||
          this.companyData.companyName == undefined
        ) {
          this.company = "思高易网络科技有限公司";
        } else {
          this.company = this.companyData.companyName;
        }

        if (
          this.companyData.companyImg == "" ||
          this.companyData.companyImg == undefined
        ) {
          this.logoImg = require("../assets/img/icon1.png");
        } else {
          this.logoImg = this.companyData.companyImg;
        }
      } else {
        this.company = "思高易网络科技有限公司";
        this.logoImg = require("../assets/img/icon1.png");
      }

      //   company
      this.pLeft = 0;

      for (let i = 0; i < this.typeList.length; i++) {
        if (this.typeList[i].name == "系统管理") {
          if (this.InfoData.statu == "0") {
            this.typeList[i].showStatus = true;
          } else {
            this.typeList[i].showStatus = false;
            // this.typeList.splice(i, 1);
          }
        }
      }
      this.titleList.forEach((e) => {
        // 系统管理
        if (e.text == "系统管理") {
          if (this.InfoData.statu == "0") {
            e.hidden = true;
          } else {
            e.hidden = false;
          }
        }
        // 库存管理  入库
        if (e.text == "库存管理") {
          e.list.forEach((el) => {
            if (el.name == "入库") {
              if (
                this.InfoData.statu == "0" ||
                this.InfoData.userName == "王焕杰" ||
                this.InfoData.userName == "任治琴" ||
                this.InfoData.userName == "李健明" ||
                this.InfoData.userName == "王杰" ||
                this.InfoData.userName == "hzsugoi"
              ) {
                el.showStatus = true;
              } else {
                el.showStatus = false;
              }
            }
          });
        }
      });
    },
    //   goHome
    goHome() {
      if (this.$route.name == "Home") {
        return;
      }
      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 400);
      setTimeout(() => {
        this.$router.push({ name: "Home" });
      }, 500);
    },
    // 鼠标移上头像
    overInformation() {
      this.listStatus = true;
    },
    // 鼠标离开头像
    leaveInformation() {
      this.listStatus = false;
    },
    // 去登陆页面
    goLogin() {
      if (sessionStorage.getItem("token")) {
        sessionStorage.removeItem("token");
      }
      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
        this.$router.push({ name: "Login" });
      }, 500);
    },
    // 去个人信息
    clickPersonInfo() {
      if (this.$route.name == "PersonalInfo") {
        return;
      }
      this.$router.push({ name: "PersonalInfo" });
    },
    // 拿到头像路径
    GetHeadSrc() {
      if (!this.headList.isActive) {
        this.headerUrl = this.headList.src;
        // let list = {
        //     src:this.headList.src,
        //     isActive:true,
        // }
        // this.setHeadList(list);
      }
    },
    // 通知
    GetNotice() {
      if (sessionStorage.getItem("token") == undefined) {
        return;
      }
      if (this.InfoData.id == undefined) {
        return;
      }
      this.$axios({
        url: "/sigaoyi/NEWGetAnnounceInfo",
        method: "POST",
        params: {
          userName: this.InfoData.userName,
        },
      })
        .then((result) => {
          if (result.data.code == "200") {
            if (result.data.announcementsize > 0) {
              // 通知层状态值
              this.releaseStatus = true;
              //   内容 赋值
              this.noticeLit.content = result.data.announcement.content;
              this.noticeLit.title = result.data.announcement.title;
              this.noticeLit.releaseUser = result.data.announcement.releaseUser;
              this.noticeLit.releaseTime = result.data.announcement.releaseTime;
              //   id
              this.noticeId = result.data.announcement.id;
              this.$emit("childByValue", false);
              // 按钮定时器
              var count = 15;
              var timer = null;
              timer = setInterval(() => {
                count--;
                this.releaseText = `剩余${count}s`;
                if (count <= 0) {
                  clearInterval(timer);
                  timer = null;
                  this.releaseText = "已阅读";
                  this.readStatus = true;
                }
              }, 1000);
            } else {
              this.$emit("childByValue", true);
              this.releaseStatus = false;
            }
          }
        })
        .catch((err) => {
          this.$emit("childByValue", true);
        });
    },
    closex() {
      this.$emit("childByValue", true);
    },
    // 已阅读
    read() {
      this.$axios({
        url: "/sigaoyi/NEWhaveread",
        method: "POST",
        params: {
          id: Number(this.noticeId),
          userName: this.InfoData.userName,
        },
      })
        .then((result) => {
          // if(result.data.Code)
          this.releaseStatus = false;
          this.$emit("childByValue", true);
        })
        .catch((err) => {});
    },
    aginInfoData() {
      if (this.getParent) {
        this.getInfoData();
      }
    },
    ...homeActions([
      "setInfoData",
      "getEscCode",
      "setHeadList",
      "setSideList",
      "setHomeTitleStatus",
    ]),
  },
  watch: {
    headList: "GetHeadSrc",
    getParent: "aginInfoData",
  },
};
</script>
<style lang="less" scoped>
</style>