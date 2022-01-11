<template>
  <div
    class="navbar clearfix"
    :class="scrollTop >= 20 ? 'borderBottom' : ''"
    ref="titleNavbar"
  >
    <!-- <div class="logoBox fl" @click="goHome()">
      <div class="logo">
        <img :src="logoImg" alt="" />
      </div>
      <div class="logoName">{{ company }}</div>
    </div> -->
    <div class="open_close fl">
      <!-- 开关 -->
      <div class="san">
        <i :class="iconSrc" @click="contrary()"></i>
      </div>
      <!-- home -->
      <div
        class="home"
        :class="$route.name == 'Home' ? 'active' : ''"
        @click="goHome()"
      >
        首页
      </div>
    </div>
    <!-- list -->
    <div class="pagingList fl">
      <div
        v-for="(item, index) in pagingData"
        :key="index"
        :class="item.isActive ? 'active' : ''"
        @click="toLink(item)"
      >
        <span>{{ item.titleB }}</span>
        <i class="el-icon-close" @click.stop="clearData(item, index)"></i>
      </div>
    </div>
    <span class="clear" v-show="pagingData.length != 0" @click="clearAll()"
      >清空</span
    >
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
    <!-- 名字编号 -->
    <div
      class="number fr"
      @mouseover="isLogin && overInformation()"
      @mouseleave="leaveInformation()"
    >
      <div class="numberDis" @click="!isLogin && goLogin()">
        <div class="head">
          <img :src="headerUrl" alt="" />
        </div>
        <div class="loginText active" v-if="!isLogin">请先登陆</div>
        <div class="head-info" v-else>
          <div class="number">编号：{{ number }}</div>
          <div class="number">姓名：{{ Vname }}</div>
          <div class="number">{{ levelText }}</div>
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
    <!-- 帮助 + 客服 -->
    <div class="help_sevice fr">
      <div class="help">
        <span class="text">客服</span>
        <div class="wxCode">
          <img src="../assets/img/kefu.jpg" alt="" />
          <i class="el-icon-caret-top active"></i>
          <i class="el-icon-caret-top"></i>
        </div>
      </div>
      <div class="sevice" @click="openOnlinePage1()">
        <el-badge :value="UnreadCount" :hidden="UnreadCount <= 0">
          <el-tooltip
            class="item"
            effect="dark"
            content="在线客服"
            placement="bottom"
          >
            <i class="el-icon-phone"></i>
          </el-tooltip>
        </el-badge>
      </div>
    </div>
    <!-- 通知 -->
    <div class="release">
      <el-dialog
        :visible.sync="releaseStatus"
        width="56%"
        :modal="false"
        @close="closex"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <span slot="title">
          即时通知<i class="tips">(需等待15s之后点击已阅读则关闭)</i>
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
    <!-- 在线客服 -->
    <el-dialog
      :modal="false"
      custom-class="onlie"
      :visible.sync="onlineServiceState"
      width="40%"
      @close="websocketclose()"
    >
      <div slot="title" class="online_title">
        <div class="online_title_box">
          <div class="onlie_title_header">
            <img
              src="http://www.ec-sigaoyi.com/imagelink/1636623516940.jpg"
              alt=""
            />
          </div>
          <div class="onlie_title_user">{{ onlineTitle }}</div>
        </div>
        <div class="online_title_phone">客服电话：<span>18924279633</span></div>
      </div>
      <div class="content">
        <div class="content_userInfo">
          <!-- 用户 -->
          <!-- <div class="content_userInfo_list"></div> -->
          <!-- 客服 -->
          <div
            class="content_userInfo_list"
            v-for="(item, index) in infoList"
            :key="index"
            @click="selectUser(item, index)"
            :class="item.isActive ? 'active' : ''"
          >
            <div class="content_header">
              <el-badge :value="item.id" v-if="item.id > 0">
                <img :src="item.headerUrl" alt="" />
              </el-badge>
              <img :src="item.headerUrl" alt="" v-else />
            </div>
            <div class="content_userName_info">
              <div class="content_userName">{{ item.senderName }}</div>
              <div class="content_infotioin">{{ item.news }}</div>
            </div>
            <!-- <i class="el-icon-close" @click.stop="deleteInfo(item, index)"></i> -->
          </div>
        </div>
        <div class="content_info" ref="content_info">
          <div
            class="content_info_text"
            v-for="(item, index) in contentInfoList"
            :key="index"
          >
            <div class="content_info_text_time">{{ item.collectionTime }}</div>
            <div class="content_info_text_box">
              <div class="content_info_text_header">
                <img
                  src="http://www.ec-sigaoyi.com/imagelink/1636623516940.jpg"
                  alt=""
                />
              </div>
              <div class="content_info_text_list">
                <i class="el-icon-caret-left"></i>
                <span v-html="item.content"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="online-footer">
        <div class="footer_file">
          <i class="el-icon-picture-outline"></i>
        </div>
        <div class="footer_info">
          <div class="textVal">
            <textarea
              cols="30"
              rows="10"
              placeholder="输入消息..."
              v-model="textVal"
              @keydown.enter="keydownVal($event)"
            ></textarea>
            <!-- 在模板部分 -->
            <!-- <VueEmoji ref="emoji" @input="onInput" /> -->
          </div>
          <div class="btn">
            <span @click="sendVal()">发送</span>
            <span class="btn_su">|</span>
            <span @click="sendOutType()"><i :class="iconSenoutSrc"></i></span>
            <div class="sendTypeMask" v-show="iconSenoutState">
              <div class="sendTypeMask_set">
                <i class="el-icon-check" :class="sendType ? 'active' : ''"></i>
              </div>
              <div class="sendTypeMask_text">
                <div @click="selectType(true)">按Enter健发送消息</div>
                <div @click="selectType(false)">按Ctrl+Enter健发送消息</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import "../assets/less/titleNavbar/titleNavbar.css";
import timestampToTimes from "../assets/js/timestampToTime";
import VueEmoji from "emoji-vue";
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
      // 屏幕高度
      scrollTop: 0,
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
      number: "",
      Vname: "",
      levelText: "",
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
      iconSrc: "el-icon-s-fold",
      pagingData: [],
      // 头部list active
      royuterIsActive: false,
      // 在线客服
      onlineTitle: "物流客服正在为你解答",
      onlineServiceState: false,
      iconSenoutSrc: "el-icon-caret-bottom",
      iconSenoutState: false,
      textVal: "",
      UnreadCount: "",
      // 选择发送方式
      sendType: false,
      infoList: [],
      contentInfoList: [],

      // 0000000000000000000000000000
      websock: null, //建立的连接
      lockReconnect: false, //是否真正建立连接
      timeout: 30 * 1000, //30秒一次心跳
      timeoutObj: null, //心跳心跳倒计时
      serverTimeoutObj: null, //心跳倒计时
      timeoutnum: null, //断开 重连倒计时
    };
  },
  created() {
    // if (this.InfoData.userName == "测试" || this.InfoData.userName == "测试1") {
    //   this.mouseStatus = true;
    // } else {
    //   this.mouseStatus = false;
    // }
    // 检测
    this.GetRouterName();

    // 处理  相同值 不添加
    this.getInfoData();
    this.detection();
    this.GetNotice();
  },
  activated() {
    // if (this.InfoData.userName == "测试" || this.InfoData.userName == "测试1") {
    //   this.mouseStatus = true;
    // } else {
    //   this.mouseStatus = false;
    // }
    // 检测
    this.GetRouterName();

    this.getInfoData();
    this.detection();
    this.GetNotice();
  },
  mounted() {
    window.addEventListener("scroll", this.lisentScroll);
  },
  destroyed() {
    document.removeEventListener("scroll", this.lisentScroll);
  },
  components: {
    VueEmoji,
  },
  computed: {
    ...homeState([
      "InfoData",
      "EscCode",
      "headList",
      "homeTitleStatus",
      "companyData",
      "pagingList",
      "onlineList",
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
      if (this.InfoData.img == "" || this.InfoData.img == undefined) {
        this.headerUrl =
          "http://www.ec-sigaoyi.com/imagelink/1626948164266.jpg";
      } else {
        this.headerUrl = this.InfoData.img;
      }
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
      // 级别
      let levelList = {
        0: "管理员",
        1: "内部员工",
        2: "普通用户",
      };
      for (const key in levelList) {
        if (key == this.InfoData.level) {
          this.levelText = levelList[key];
        }
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
                this.InfoData.userName == "汪春梅" ||
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
        sessionStorage.removeItem("userNumber");
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
        this.pagingData = [];
        this.detAllPagingList();
      }, 500);
    },
    // 去个人信息
    clickPersonInfo() {
      if (this.$route.name == "PersonalInfo") {
        return;
      }
      this.$router.push({ name: "PersonalInfo" });
      let obj = {
        titleB: `个人信息`,
        isChildB: false,
        routerSrc: "PersonalInfo",
        isRoute: false,
      };

      this.setPagingList(obj);
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
    // 删除头部列表
    clearData(item, index) {
      if (this.pagingData.length == 1) {
        this.detPagingList(item);
        this.$router.push({ name: "Home" });
        return;
      }
      if (index == this.pagingData.length - 1 && item.isActive) {
        this.detPagingList(item);
        this.$router.push({
          name: this.pagingData[index - 1].routerSrc,
        });
      } else if (item.isActive) {
        this.detPagingList(item);
        this.$router.push({
          name: this.pagingData[index].routerSrc,
        });
      } else {
        this.detPagingList(item);
      }
    },
    // 清空未选中头部列表
    clearAll() {
      this.pagingData.forEach((e, i) => {
        if (!e.isActive) {
          this.pagingData.splice(i, 1);
        }
      });
      this.detActivePagingList();
      //   this.$router.push({ name: "Home" });
    },
    // 去首页
    ToHome() {
      this.$router.push({ name: "Home" });
    },
    // sideNavbar 开关
    contrary() {
      this.$parent.$refs.sideNavbar1.clickW();
      //   this.$parent.$refs.sideNavbar1.testRouter();

      if (this.iconSrc == "el-icon-s-fold") {
        this.iconSrc = "el-icon-s-unfold";
      } else {
        this.iconSrc = "el-icon-s-fold";
      }
    },
    // 跳转当前路由
    toLink(item) {
      if (item.query) {
        this.$router.push({ name: item.routerSrc, query: item.query });
      } else {
        this.$router.push({ name: item.routerSrc });
      }
      this.pagingData.forEach((e) => {
        e.isActive = false;
      });
      item.isActive = true;
      this.$parent.$refs.sideNavbar1.testRouter();
    },
    // 初始检测
    GetRouterName() {
      setTimeout(() => {
        this.pagingData = this.pagingList;
        this.pagingData.forEach((e) => {
          e.isActive = false;
          if (e.routerSrc == this.$route.name) {
            e.isActive = true;
            if (e.query != undefined) {
              e.isActive = false;
              if (e.query.id == this.$route.query.id) {
                e.isActive = true;
              }
            }
          }
        });
      }, 100);
    },
    // 删除用户
    deleteInfo(item, index) {
      if (this.infoList[index].isActive) {
        if (index == this.infoList.length - 1) {
          this.infoList.splice(index, 1);
          this.infoList[index - 1].isActive = true;
          return;
        } else if (index == 0) {
          this.infoList.splice(index, 1);
          this.infoList[index].isActive = true;
          return;
        } else {
          this.infoList.splice(index, 1);
          this.infoList[index].isActive = true;
        }
      } else {
        this.infoList.splice(index, 1);
      }
    },
    // 监听屏幕 滚动
    lisentScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    },
    // 打开消息中心
    openOnlinePage() {
      if (sessionStorage.getItem("token") == undefined) {
        alert("请先登录");
        this.$router.push({ name: "Login" });
        return;
      }
      if (this.InfoData.id == undefined) {
        alert("登陆时间过期,请重新登陆!");
        sessionStorage.removeItem("token");
        this.$router.push({ name: "Login" });
        return;
      }
      if (
        this.InfoData.id == 1 ||
        this.InfoData.id == 66 ||
        this.InfoData.id == 6
      ) {
        this.infoList = this.onlineList.list;
        this.infoList.forEach((e, i) => {
          e["isActive"] = false;
          e["headerUrl"] =
            "http://www.ec-sigaoyi.com/imagelink/1626948164266.jpg";
          e["sender1"] = e.sender;
          e["senderName"] = e.sender;
          if (i == 0) {
            e.isActive = true;
            this.selectUser(e, i);
          }
        });
      } else {
        this.infoList = [
          {
            senderId: 1,
            headerUrl: "http://www.ec-sigaoyi.com/imagelink/1626948164266.jpg",
            isActive: true,
            sender: "chenjie",
            senderName: "物流客服",
            sender1: "物流客服正在为你解答",
            news: "",
          },
          {
            senderId: 66,
            headerUrl: "http://www.ec-sigaoyi.com/imagelink/1626948164266.jpg",
            isActive: false,
            sender: "袁爽",
            senderName: "运营客服",
            sender1: "运营客服正在为你解答",
            news: "",
          },
          {
            senderId: 6,
            headerUrl: "http://www.ec-sigaoyi.com/imagelink/1626948164266.jpg",
            isActive: false,
            sender: "sugoi1",
            senderName: "ERP客服",
            sender1: "ERP客服正在为你解答",
            news: "",
          },
        ];

        this.infoList.forEach((e, i) => {
          e.isActive = false;
          if (i == 0) {
            e.isActive = true;
            this.selectUser(e, i);
          }
        });
      }

      //   this.onlineServiceState = true;
      this.UnreadCount = 0;
    },
    openOnlinePage1() {
      if (this.InfoData.id == 6 || this.InfoData.id == 2) {
        let routeData = this.$router.resolve({
          path: "/WebStock",
          query: {
            InfoData: JSON.stringify(this.InfoData),
          },
        });
        window.open(routeData.href, "_blank");
      }
    },
    // 选择用户状态
    selectUser(item, index) {
      this.infoList.forEach((e) => {
        e.isActive = false;
      });
      item.isActive = true;
      this.$axios({
        url: "/sigaoyi/GetUnreadInformationGetId",
        method: "POST",
        params: {
          userId: this.InfoData.id,
          senderId: item.senderId,
        },
      })
        .then((result) => {
          if (result.data.Code == 200) {
            this.contentInfoList = [];
            this.contentInfoList = result.data.informations;
            item.id = 0;
            setTimeout(() => {
              this.scrollBottm();
            }, 0);
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
        });

      this.onlineTitle = item.sender1;
    },
    // 打开选择项
    sendOutType() {
      if (this.iconSenoutState) {
        this.iconSenoutSrc = "el-icon-caret-bottom";
        this.iconSenoutState = false;
      } else {
        this.iconSenoutSrc = "el-icon-caret-top";
        this.iconSenoutState = true;
      }
    },
    // 切换发送信息的方式
    selectType(flag) {
      if (flag) {
        this.sendType = false;
      } else {
        this.sendType = true;
      }
      this.iconSenoutState = false;
    },
    // 监听 键盘按下事件
    keydownVal(e) {
      if (this.sendType) {
        //用户点击了ctrl+enter 发送消息
        if (e.ctrlKey && e.keyCode == 13) {
          e.preventDefault();
          this.sendVal();
        } else {
          //用户点击了enter  换行
          // e.preventDefault();
          // this.textVal += "<br>";
        }
      } else {
        //用户点击了ctrl+enter  换行
        if (e.ctrlKey && e.keyCode == 13) {
          this.textVal += "\n";
        } else {
          //用户点击了enter  发送消息
          e.preventDefault();
          this.sendVal();
        }
      }
    },
    // 滚动条到底部
    scrollBottm() {
      let el = this.$refs["content_info"];
      el.scrollTop = el.scrollHeight;
    },
    // 发送消息
    sendVal() {
      if (this.textVal == "") {
        return;
      }
      //   let textVal = document.querySelector(".emoji-wysiwyg-editor").innerHTML;
      this.textVal = this.textVal.replace(/\n/g, "<br>");

      let data = {
        status: 0,
        userId: this.InfoData.id,
        userName: this.InfoData.userName,
        recipientId: "",
        recipient: "",
        content: this.textVal,
        collectionTime: timestampToTimes.timestampToTime(new Date()),
      };

      this.infoList.forEach((e) => {
        if (e.isActive) {
          data.recipientId = e.senderId;
          data.recipient = e.sender;
        }
      });
      this.contentInfoList.push(data);
      this.clearTextarea();
      setTimeout(() => {
        this.scrollBottm();
      }, 200);

      this.$axios({
        url: "/sigaoyi/sendMessage",
        method: "POST",
        params: data,
      })
        .then((result) => {})
        .catch((err) => {
          console.log("err ==>", err);
        });

      this.websocketsend(data);
    },
    // 表情选择
    onInput(event) {
      //事件。数据包含文本区域的值
      this.textVal += document.querySelector(".emoji-wysiwyg-editor").innerHTML;
      //   let phoneReg = /\n/;
      //   if (phoneReg.test(event.data)) {
      //     this.sendVal();
      //   }
    },
    // 清空 聊天框
    clearTextarea() {
      //   this.$refs.emoji.clear();
      this.textVal = "";
    },
    // Home 的 未读消息
    getOnlineList() {
      this.UnreadCount = this.onlineList.count;
    },

    initWebSocket() {
      //建立连接
      //初始化weosocket
      const wsuri = "ws://192.168.1.179:8080/sigaoyi/websocket/001";
      //建立连接
      this.websock = new WebSocket(wsuri);
      //连接成功
      this.websock.onopen = this.websocketonopen;
      //连接错误
      this.websock.onerror = this.websocketonerror;
      //接收信息
      this.websock.onmessage = this.websocketonmessage;
      //连接关闭
      this.websock.onclose = this.websocketclose;
    },
    reconnect() {
      //重新连接
      var that = this;
      if (that.lockReconnect) {
        return;
      }
      that.lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      that.timeoutnum && clearTimeout(that.timeoutnum);
      that.timeoutnum = setTimeout(function () {
        //新连接
        that.initWebSocket();
        that.lockReconnect = false;
      }, 5000);
    },
    reset() {
      //重置心跳
      var that = this;
      //清除时间
      clearTimeout(that.timeoutObj);
      clearTimeout(that.serverTimeoutObj);
      //重启心跳
      that.start();
    },
    start() {
      console.log("开启心跳");
      //开启心跳
      var self = this;
      self.timeoutObj && clearTimeout(self.timeoutObj);
      self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
      self.timeoutObj = setTimeout(function () {
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        if (self.websock.readyState == 1) {
          //如果连接正常
          //   self.websock.send("ping");
        } else {
          //否则重连
          self.reconnect();
        }
        self.serverTimeoutObj = setTimeout(function () {
          //超时关闭
          self.websock.close();
        }, self.timeout);
      }, self.timeout);
    },
    websocketonopen() {
      //连接成功事件
      //提示成功
      console.log("连接成功", 3);
      //开启心跳
      this.start();
    },
    websocketonerror(e) {
      //连接失败事件
      //错误
      console.log("WebSocket连接发生错误");
      //重连
      this.reconnect();
    },
    websocketclose(e) {
      //连接关闭事件
      console.log("关闭连接");
      //关闭
      console.log("e ==>", e);
      //重连
      this.reconnect();
    },
    websocketonmessage(event) {
      //接收服务器推送的信息
      //打印收到服务器的内容
      console.log("返回消息==>", JSON.parse(event.data));

      let msgList = JSON.parse(event.data);
      if (msgList.recipientId == this.InfoData.id) {
        this.contentInfoList.push(msgList);
        // this.openOnlinePage();
        this.scrollBottm();
      }
      //收到服务器信息，心跳重置
      this.reset();
    },
    websocketsend(data) {
      //向服务器发送信息
      //数据发送
      this.websock.send(JSON.stringify(data));
    },

    ...homeActions([
      "setHomeTitleStatus",
      "detPagingList",
      "detAllPagingList",
      "detActivePagingList",
      "setPagingList",
    ]),
  },
  watch: {
    headList: "GetHeadSrc",
    getParent: "aginInfoData",
    onlineList: "getOnlineList",
    "$route.name": function () {
      this.GetRouterName();
    },
  },
};
</script>
<style lang="less" scoped>
</style>