<template>
  <div class="left" ref="left" :class="WstateStatus ? 'active' : ''" :style="{ width: W + 'px', height: 100 + '%' }">
    <div class="widthBox">
      <div class="on-off">
        <i :class="iconSrc" @click="clickW"></i>
      </div>
      <!-- 左边导航栏 -->
      <div class="B-left">
        <div
          v-for="(item, index) in catalogueList"
          :key="index"
          class="leftTitle"
          :class="item.isActive ? 'active' : ''"
          :style="{ borderRight: item.isActive ? borderR : '' }"
          @click="linkTo && gotoRouter(item, index)"
          @mouseover="overNavbar(item, index)"
        >
          <el-popover
            placement="right-start"
            trigger="hover"
            :disabled="popoverDis"
            popper-class="sideNavbarPopover"
            @show="getPopoverList()"
          >
            <div
              v-if="tipsList.children == undefined"
              class="tips"
              @click="gotoRouter(tipsList, titleIndex)"
            >
              <span class="iconfont" :class="tipsList.iconSrc"></span>
              {{ tipsList.name }}
            </div>
            <div
              v-else
              class="tipsList"
              v-for="(ele, i) in tipsList.children"
              :key="i"
              @click="gotoChildren(item, ele, i)"
              :class="ele.isActive ? 'hoverActive' : ''"
              :style="{
                padding: ele.statu ? '0px' : '',
                fontSize: ele.statu ? '0px' : '',
              }"
            >
              <span :style="{ fontSize: ele.statu ? '0px' : '' }">{{
                ele.name
              }}</span>
            </div>
            <div class="list" slot="reference">
              <span
                class="iconfont"
                :class="item.iconSrc"
                :style="{ color: item.isChildrenColor ? changeColor : '' }"
              ></span>
              <i
                v-show="leftArow"
                :style="{ color: item.isChildrenColor ? changeColor : '' }"
                >{{ item.name }}</i
              >
              <i
                v-show="item.rightStatus"
                class="el-icon-arrow-right"
                :class="item.arrow ? 'active' : ''"
              ></i>
            </div>
          </el-popover>
          <div
            class="children"
            v-show="item.isChildren"
            v-for="(ele, i) in item.children"
            :key="i"
            :class="ele.isActive ? 'active' : ''"
            :style="{
              borderRight: ele.isActive ? borderR : '',
              fontSize: ele.statu ? '0px' : '',
              padding: ele.statu ? '0px' : '',
            }"
            @click.stop="gotoChildren(item, ele, i)"
          >
            {{ ele.name }}
          </div>
        </div>
      </div>
    </div>
    <!-- 通知 -->
    <div class="release">
      <el-dialog
        :visible.sync="releaseStatus"
        width="36%"
        :modal="false"
        center
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
  </div>
</template>

<script>
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");

import "../assets/less/sideNavbar/sideNavbar.css";
export default {
  data() {
    return {
      activeName: "0",
      // 展开初始值
      W: 220,
      screenHeight: document.documentElement.clientHeight,
      // gotoRouter 的状态值
      linkTo: true,
      //  侧边栏的border-right
      borderR: "3px solid #409eff",
      //   点击展开图标样式
      iconSrc: "el-icon-s-fold",
      // 目录需要循环的数组
      catalogueList: [],
      // 检测path 拿到侧边栏的数组
      pathName: [
        // 产品管理
        {
          isActive: false,
          name: "product",
          arrName: [
            {
              iconSrc: "icon-chanpindingdan",
              name: "产品采集",
              isActive: false,
              routerName: "ProductDevelopment",
              routerPathName: "productDevelopment",
              isChildren: false,
              isChildrenColor: false,
              rightStatus: false,
            },
            {
              iconSrc: "icon-chanpinkaifa",
              name: "产品库",
              isActive: true,
              routerName: "ProductControl",
              routerPathName: "productControl",
              isChildren: false,
              isChildrenColor: false,
              rightStatus: false,
            },
            {
              iconSrc: "icon-chanpinku",
              name: "产品订单",
              isActive: false,
              routerName: "ProductOrder",
              routerPathName: "productOrder",
              isChildren: false,
              isChildrenColor: false,
              rightStatus: false,
            },
            {
              iconSrc: "icon-jinxiaocunguanli",
              name: "库存管理",
              isActive: false,
              routerName: "PurchaSellStock",
              routerPathName: "purchaSellStock",
              isChildren: false,
              isChildrenColor: false,
              rightStatus: true,
              arrow: true,
              children: [
                {
                  name: "库存列表",
                  isActive: false,
                  routerName: "PurchaseList",
                  routerPathName: "purchaseList",
                  statu: false,
                },
                {
                  name: "进出库记录",
                  isActive: false,
                  routerName: "Record",
                  routerPathName: "record",
                  statu: false,
                },
                {
                  name: "入库",
                  isActive: false,
                  routerName: "Godown",
                  routerPathName: "godown",
                  statu: true,
                },
              ],
            },
          ],
        },
        // 店铺管理
        {
          isActive: false,
          name: "shop",
          arrName: [
            {
              iconSrc: "icon-shouquan",
              name: "授权",
              isActive: true,
              routerName: "Authorization",
              routerPathName: "authorization",
            },
          ],
        },
        // 公司管理
        {
          isActive: false,
          name: "companyParent",
          arrName: [
            {
              iconSrc: "icon-gongsiguanli",
              name: "公司管理",
              isActive: true,
              routerName: "CompanyMange",
              routerPathName: "companyMange",
              isChildren: false,
            },
            {
              iconSrc: "icon-bumenguanli",
              name: "部门管理",
              isActive: true,
              routerName: "Divisional",
              routerPathName: "divisional",
              isChildren: false,
            },
            {
              iconSrc: "icon-yuangongguanli",
              name: "员工管理",
              isActive: true,
              routerName: "StaffManagement",
              routerPathName: "staffManagement",
              isChildren: false,
            },
            {
              iconSrc: "icon-jixiao",
              name: "绩效管理",
              isActive: true,
              routerName: "Performance",
              routerPathName: "performance",
              isChildren: false,
            },
            {
              iconSrc: "icon-paiqi",
              name: "工作排期",
              isActive: true,
              routerName: "WorkScheduling",
              routerPathName: "workScheduling",
              isChildren: false,
            },
          ],
        },
        // 财务管理
        {
          isActive: false,
          name: "financeList",
          arrName: [
            {
              iconSrc: "icon-chongzhitixian",
              name: "充值提现",
              isActive: true,
              routerName: "RechargeWidthdraw",
              routerPathName: "rechargeWidthdraw",
              isChildren: false,
            },
            {
              iconSrc: "icon-xiaofeimingxi",
              name: "消费明细",
              isActive: true,
              routerName: "ConsumptionDetail",
              routerPathName: "consumptionDetail",
              isChildren: false,
            },
            {
              iconSrc: "icon-ticheng",
              name: "员工提成",
              isActive: true,
              routerName: "StaffCommission",
              routerPathName: "staffCommission",
              isChildren: false,
            },
          ],
        },
        // 帮助教程
        {
          isActive: false,
          name: "help",
          arrName: [
            {
              iconSrc: "icon-kuaisurumen",
              name: "教程文档",
              isActive: true,
              routerName: "TutorialDocument",
              routerPathName: "tutorialDocument",
              isChildren: false,
            },
            {
              iconSrc: "icon-shipinjiaocheng",
              name: "趣天教学视频",
              isActive: false,
              routerName: "VideoCourse",
              routerPathName: "videoCourse",
              isChildren: false,
              isChildrenColor: false,
              rightStatus: true,
              arrow: false,
              children: [
                {
                  name: "变体修改",
                  pantrenName: "qutian",
                  isActive: true,
                  videoSrc:
                    "http://www.ec-sigaoyi.com/wenjian/videotutorial/趣天/变体修改.mp4",
                },
                {
                  name: "标题价格详情修改",
                  pantrenName: "qutian",
                  isActive: false,
                  videoSrc:
                    "http://www.ec-sigaoyi.com/wenjian/videotutorial/趣天/标题价格详情修改.mp4",
                },
                {
                  name: "订单处理",
                  pantrenName: "qutian",
                  isActive: false,
                  videoSrc:
                    "http://www.ec-sigaoyi.com/wenjian/videotutorial/趣天/订单处理.mp4",
                },
                {
                  name: "抓取及上架流程",
                  pantrenName: "qutian",
                  isActive: false,
                  videoSrc:
                    "http://www.ec-sigaoyi.com/wenjian/videotutorial/趣天/抓取及上架流程.mp4",
                },
                {
                  name: "趣天变体修改",
                  pantrenName: "qutian",
                  isActive: false,
                  videoSrc:
                    "http://www.ec-sigaoyi.com/wenjian/videotutorial/趣天/趣天变体修改.mp4",
                },
                {
                  name: "上架与采集上架",
                  pantrenName: "qutian",
                  isActive: false,
                  videoSrc:
                    "http://www.ec-sigaoyi.com/wenjian/videotutorial/趣天/上架与采集上架.mp4",
                },
                {
                  name: "趣天订单处理",
                  pantrenName: "qutian",
                  isActive: false,
                  videoSrc:
                    "http://www.ec-sigaoyi.com/wenjian/videotutorial/趣天/趣天订单处理.mp4",
                },
              ],
            },
            {
              iconSrc: "icon-shipinjiaocheng",
              name: "系统操作教学视频",
              isActive: false,
              routerName: "VideoCourse",
              routerPathName: "videoCourse",
              isChildren: false,
              isChildrenColor: false,
              rightStatus: true,
              arrow: false,
              children: [
                {
                  name: "系统操作教学视频01",
                  pantrenName: "system",
                  isActive: false,
                },
                {
                  name: "系统操作教学视频02",
                  pantrenName: "system",
                  isActive: false,
                },
                {
                  name: "系统操作教学视频03",
                  pantrenName: "system",
                  isActive: false,
                },
              ],
            },
          ],
        },
        // 系统管理
        {
          isActive: false,
          name: "system",
          arrName: [
            {
              iconSrc: "icon-jilu",
              name: "登录记录",
              isActive: true,
              routerName: "LoginRecord",
              routerPathName: "loginRecord",
              isChildren: false,
            },
            {
              iconSrc: "icon-zhanghaoguanli",
              name: "账号管理",
              isActive: true,
              routerName: "AccountAccept",
              routerPathName: "accountAccept",
              isChildren: false,
            },
            {
              iconSrc: "icon-caiwuguanli",
              name: "财务管理",
              isActive: true,
              routerName: "Financetor",
              routerPathName: "financetor",
              isChildren: false,
            },
            {
              iconSrc: "icon-kehugenjin",
              name: "客户跟进",
              isActive: true,
              routerName: "CustomerFollow",
              routerPathName: "customerFollow",
              isChildren: false,
            },
            {
              iconSrc: "el-icon-user",
              name: "用户信息",
              isActive: true,
              routerName: "UserInfo",
              routerPathName: "userInfo",
              isChildren: false,
            },
            {
              iconSrc: "el-icon-position",
              name: "发布通知",
              isActive: true,
              routerName: "Notice",
              routerPathName: "notice",
              isChildren: false,
            },
          ],
        },
        // 其他功能
        {
          isActive: false,
          name: "other",
          arrName: [
            {
              iconSrc: "icon-gerenxinxi",
              name: "个人中心",
              isActive: true,
              routerName: "PersonalInfo",
              routerPathName: "personalInfo",
              isChildren: false,
            },
            {
              iconSrc: "icon-jiagegusuan",
              name: "运费估算",
              isActive: true,
              routerName: "FreightComputers",
              routerPathName: "freightComputers",
              isChildren: false,
            },
            {
              iconSrc: "el-icon-refresh",
              name: "URL转换",
              isActive: true,
              routerName: "ImageOnlineURL",
              routerPathName: "imageOnlineURL",
              isChildren: false,
            },
          ],
        },
      ],
      // 开始所有的listDiv 状态值
      listDivState: false,
      // left 左边箭头小图标
      leftArow: true,
      // 子路由的颜色
      changeColor: "#409eff",
      // popover 是否提示
      popoverDis: true,
      // popover index
      titleIndex: "",
      //  chlidren 的循环数组
      tipsList: {},
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
    };
  },
  beforeRouteEnter(to, from, next) {
    // console.log("from.path ==>",from.path);
    next();
  },
  activated() {
    console.log("进入activeted!!!");
    // this.Width = document.documentElement.clientWidth - 50;
    // 状态值
    // 入库 statu
    if (
      this.InfoData.statu == 0 ||
      this.InfoData.userName == "林天长" ||
      this.InfoData.userName == "任治琴" ||
      this.InfoData.userName == "李健明" ||
      this.InfoData.userName == "王杰" ||
      this.InfoData.userName == "hzgugoi"
    ) {
      this.pathName[0].arrName[
        this.pathName[0].arrName.length - 1
      ].children[2].statu = false;
    } else {
      this.pathName[0].arrName[
        this.pathName[0].arrName.length - 1
      ].children[2].statu = true;
    }
    // 重置tips的状态值
    this.catalogueList = [];
    // 判断侧边栏目录 拿到数组
    this.pathName.forEach((e) => {
      if (this.$route.path.indexOf(e.name) > -1) {
        this.catalogueList = e.arrName;
      }
    });
    
    if (this.$parent.$refs.titlePage != undefined) {
      // 掉用titleNavbar 的 方法
      this.$parent.$refs.titlePage.getInfoData();
    }
    // 检测路由
    this.detection();
    console.log("this.WstateStatus ==>", this.WstateStatus);
    // 解决不缓存跳到缓存的leftNavbar 不展开问题
    if (this.WstateStatus && this.$route.meta.keepAlive) {
      this.setWstateStatus(false);
      this.clickW();
    }
    if (!this.WstateStatus && this.$route.meta.keepAlive) {
      this.setWstateStatus(true);
      this.clickW();
    }
  },
  created() {
    console.log("进入created!!!");
    // 入库 statu
    if (
      this.InfoData.statu == 0 ||
      this.InfoData.userName == "林天长" ||
      this.InfoData.userName == "任治琴" ||
      this.InfoData.userName == "李健明" ||
      this.InfoData.userName == "王杰" ||
      this.InfoData.userName == "hzgugoi"
    ) {
      this.pathName[0].arrName[
        this.pathName[0].arrName.length - 1
      ].children[2].statu = false;
    } else {
      this.pathName[0].arrName[
        this.pathName[0].arrName.length - 1
      ].children[2].statu = true;
    }
    // 重置tips的状态值
    this.catalogueList = [];
    // 判断侧边栏目录 拿到数组
    this.pathName.forEach((e) => {
      if (this.$route.path.indexOf(e.name) > -1) {
        this.catalogueList = e.arrName;
      }
    });
    if (this.$parent.$refs.titlePage != undefined) {
      // 掉用titleNavbar 的 方法
      this.$parent.$refs.titlePage.getInfoData();
    }
    // 检测路由
    this.detection();
    console.log("this.WstateStatus ==>", this.WstateStatus);
    console.log("this.$route.meta.keepAlive ==>", this.$route.meta.keepAlive);
    // 解决缓存跳到不缓存的leftNavbar 展开问题
    if (!this.WstateStatus && !this.$route.meta.keepAlive) {
      this.setWstateStatus(true);
      this.clickW();
    } else if (this.WstateStatus && !this.$route.meta.keepAlive) {
      this.setWstateStatus(false);
      this.clickW();
    }
  },
  computed: {
    ...homeState(["WstateStatus", "num", "InfoData", "sideStatus"]),
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
    // 通知
    GetNotice() {
      console.log("执行了 通知的 方法!!!!!!!!!!!!!");
      if (
        this.InfoData.userName == "undefined" ||
        this.InfoData.userName == null
      ) {
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
          console.log("result ==>", result);
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
              this.releaseStatus = false;
            }
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
        });
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
          console.log("result ==>", result);
          // if(result.data.Code)
          this.releaseStatus = false;
          this.$emit("childByValue", true);
        })
        .catch((err) => {
          console.log("err ==>", err);
        });
    },
    // clickMe宽度
    clickW() {
      console.log("运行了 clickW  事件!!!");
      if (this.WstateStatus) {
        this.popoverDis = false;
        this.linkTo = false;
        //   子路由关闭
        this.catalogueList.forEach((e) => {
          e.isChildren = false;
          e.rightStatus = false;
        });
        this.setIsChildren(false);
        this.setArrow(false);
        this.W = 50;
        this.setWstateStatus(false);
        this.leftArow = false;
        this.iconSrc = "el-icon-s-unfold";
        this.borderR = "none";
        this.catalogueList[this.catalogueList.length - 1].arrow = false;
      } else {
        this.popoverDis = true;
        this.linkTo = true;
        //   检测路由为子路由展开
        if (
          this.$route.name == "PurchaseList" ||
          this.$route.name == "Godown" ||
          this.$route.name == "Record"
        ) {
          this.catalogueList[this.catalogueList.length - 1].isChildren = true;
          this.catalogueList[this.catalogueList.length - 1].arrow = true;
          console.log("this.catalogueList ==>", this.catalogueList);
        }
        if (this.$route.path.indexOf("product") > -1) {
          this.catalogueList[this.catalogueList.length - 1].rightStatus = true;
        }
        if (this.$route.path.indexOf("help") > -1) {
          this.catalogueList[this.catalogueList.length - 1].rightStatus = true;
          this.catalogueList[this.catalogueList.length - 2].rightStatus = true;
          this.catalogueList[this.catalogueList.length - 2].arrow = false;
        }
        if (this.$route.name == "VideoCourse") {
          // 检测  1  还是  2
          this.pathName.forEach((e) => {
            if (e.name == "help") {
              e.arrName.forEach((el, k) => {
                if (k == 0) {
                  return;
                }
                el.isChildren = false;
                el.arrow = false;
                if (el.isChildrenColor) {
                  el.isChildren = true;
                  el.arrow = true;
                }
              });
            }
          });
          //   this.catalogueList[this.catalogueList.length - 2].isChildren = true;
        }
        // this.setIsChildren(true);
        this.W = 220;
        this.setWstateStatus(true);
        this.leftArow = true;
        this.iconSrc = "el-icon-s-fold";
        this.borderR = "3px solid #409eff";
        console.log(
          "运行了 clicKW 之后的 this.WstateStatus ==>",
          this.WstateStatus
        );
      }
      this.$emit("Wstate", this.WstateStatus);
      console.log("this.WstateStatus ==>", this.WstateStatus);
    },
    // 检测路由
    detection() {
      console.log("this.$route.path ==>", this.$route.path);
      console.log("this.$route.name ==>", this.$route.name);

      //   console.log("this.$route.from.path ==>",this.$route.from.path);
      this.catalogueList.forEach((e) => {
        e.isActive = false;
        e.isChildrenColor = false;
        if (e.children != undefined) {
          for (let i = 0; i < e.children.length; i++) {
            e.children[i].isActive = false;
          }
        }
         // this.catalogueList[this.catalogueList.length - 1].isChildren = true;
        if (e.name == "库存管理") {
          e.isChildren = this.sideStatus.isChildren;
          e.arrow = this.sideStatus.arrow;
        }
        if (this.$route.path.indexOf("help") > -1) {
          this.catalogueList[this.catalogueList.length - 1].isChildren = false;
        }
        if (this.$route.path.indexOf("product") > -1) {
          this.catalogueList[this.catalogueList.length - 1].rightStatus = true;
        }
        // 子路由
        if (
          this.$route.name == "PurchaseList" ||
          this.$route.name == "Record" ||
          this.$route.name == "Godown" ||
          this.$route.name == "VideoCourse"
        ) {
          // 展开 icon颜色
          this.catalogueList[this.catalogueList.length - 1].isChildren = true;
          this.catalogueList[this.catalogueList.length - 1].rightStatus = true;
          this.catalogueList[this.catalogueList.length - 1].arrow = true;
          this.catalogueList[this.catalogueList.length - 1].isChildrenColor = true;
          //  上颜色
          if (e.isChildren) {
            // console.log("e.children ===>", e.children);
            if (e.name == "趣天教学视频" || e.name == "系统操作教学视频") {
              //   父颜色
              this.catalogueList[this.catalogueList.length - 2].isChildrenColor = true;
              this.catalogueList[this.catalogueList.length - 2].isChildren = true;
              this.catalogueList[this.catalogueList.length - 2].arrow = true;
              // 最后一个
              this.catalogueList[this.catalogueList.length - 1].isChildren = false;
              this.catalogueList[this.catalogueList.length - 1].arrow = false;
              // this.catalogueList[this.catalogueList.length - 1].rightStatus = false;
              this.catalogueList[
                this.catalogueList.length - 1
              ].isChildrenColor = false;
              //   上子颜色
              this.pathName.forEach((e) => {
                if (e.name == "help") {
                  e.arrName.forEach((el, k) => {
                    if (k == 0) {
                      return;
                    }
                    for (let j = 0; j < el.children.length; j++) {
                      el.children[j].isActive = false;
                      if (k == 1) {
                        el.children[0].isActive = true;
                      }
                    }
                  });
                }
              });
              return;
            }
            for (let i = 0; i < e.children.length; i++) {
              if (this.$route.name == e.children[i].routerName) {
                e.children[i].isActive = true;
              }
            }
          }
          return;
        }
        // 路由为"PurchaseCompileDefault" 时
        if (this.$route.name == "PurchaseCompileDefault") {
          // 展开 icon颜色
          this.catalogueList[this.catalogueList.length - 1].rightStatus = true;
          this.catalogueList[this.catalogueList.length - 1].isChildrenColor = true;
          if (e.isChildren) {
            for (let i = 0; i < e.children.length; i++) {
              if (this.$route.query.title == "record") {
                if (e.children[i].routerPathName == "record") {
                  e.children[i].isActive = true;
                }
              } else {
                if (e.children[i].routerPathName == "purchaseList") {
                  e.children[i].isActive = true;
                }
              }
            }
          }
          return;
        }
        // 其他
        if (this.$route.path.indexOf(e.routerPathName) > -1) {
          e.isActive = true;
          e.isChildrenColor = true;
        }
      });
      console.log("this.catalogueList ==>", this.catalogueList);
    },
    // 侧边栏跳转路由
    gotoRouter(item, index) {
      console.log("父级路由跳转!!!");
      console.log("this.WstateStatus ==>",this.WstateStatus);
      if (
        (item.name == "库存管理" && index == 3) ||
        item.name == "趣天教学视频" ||
        item.name == "系统操作教学视频"
      ) {
        item.arrow = !item.arrow;
        item.isChildren = !item.isChildren;
        this.setIsChildren(item.isChildren);
        this.setArrow(item.arrow);
        return;
      }
      if (item.isActive) {
        return;
      }
      //  隐藏子元素
      if (this.WstateStatus) {
        this.catalogueList[this.catalogueList.length - 1].isChildren = false;
      }
      this.$parent.$refs.titlePage.getInfoData();
      this.catalogueList.forEach((e) => {
        e.isActive = false;
        e.isChildrenColor = false;
        if (e.children != undefined) {
          for (let i = 0; i < e.children.length; i++) {
            e.children[i].isActive = false;
          }
        }
        if (e.name == "库存管理") {
          e.isChildren = this.sideStatus.isChildren;
          e.arrow = this.sideStatus.arrow;
        }
      });
      //   console.log("this.catalogueList ==>", this.catalogueList);
      //   console.log("this.$route.meta.isBack ==>", this.$route.meta.isBck);
      item.isActive = true;
      item.isChildrenColor = true;
      //   检测是否有通知
      this.GetNotice();
      this.$router.push({ name: item.routerName });
    },
    // 点击展开 跳转子路由
    gotoChildren(item, ele, i) {
      console.log("子路由跳转!!!");
      if (item.name == "趣天教学视频" || item.name == "系统操作教学视频") {
        console.log("item ==>", item);
        // 去所有子颜色
        this.pathName.forEach((e) => {
          if (e.name == "help") {
            e.arrName.forEach((el, k) => {
              if (k == 0) {
                return;
              }
              for (let j = 0; j < el.children.length; j++) {
                el.children[j].isActive = false;
              }
            });
          }
        });
        // 去所有父颜色
        this.pathName.forEach((e) => {
          if (e.name == "help") {
            e.arrName.forEach((el, k) => {
              if (k == 0) {
                el.isActive = false;
                el.isChildrenColor = false;
                console.log("el ==>", el);
                return;
              }
              el.isChildrenColor = false;
            });
          }
        });
        ele.isActive = true;
        item.isChildrenColor = true;
        this.$router.push({ name: "VideoCourse" });
        // 给链接
        // console.log("ele.videoSrc ==>",ele.videoSrc);
        this.setVideoSrc(ele.videoSrc);
        return;
      }
      if (item.isActive || ele.isActive) {
        return;
      }
      this.$parent.$refs.titlePage.getInfoData();
      this.catalogueList.forEach((e) => {
        e.isActive = false;
        e.isChildrenColor = false;
      });
      item.children.forEach((e) => {
        e.isActive = false;
      });
      //   item.isActive = true;
      item.isChildrenColor = true;
      ele.isActive = true;

      //   检测是否有通知
      this.GetNotice();
      this.$router.push({ name: ele.routerName });
    },
    // 鼠标移上已经关闭的Navbar
    overNavbar(item, index) {
      this.titleIndex = index;
      //   console.log("item ==>", item);
      //   console.log("index ==>", index);
    },
    // 显示的时候触发
    getPopoverList() {
      if (this.catalogueList[this.titleIndex].children == undefined) {
        this.tipsList = this.catalogueList[this.titleIndex];
      } else {
        this.tipsList = this.catalogueList[this.titleIndex];
      }
      console.log("this.tipsList.children ==>", this.tipsList.children);
    },
    ...homeActions([
      "setWstateStatus",
      "setNum",
      "setIsChildren",
      "setArrow",
      "setVideoSrc",
    ]),
  },
  watch: {
    screenHeight(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function () {
          // console.log("that.screenHeight ==>", that.screenHeight);
          that.timer = false;
        }, 400);
      }
    },
  },
};
</script>
