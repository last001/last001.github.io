<template>
  <div
    class="left"
    ref="left"
    :class="WstateStatus ? 'active' : ''"
    :style="{ width: W + 'px', height: 100 + '%' }"
  >
    <div class="widthBox">
      <div class="on-off">
        <i :class="iconSrc" @click="clickW"></i>
      </div>
      <!-- 左边导航栏 -->
      <div class="B-left">
        <div
          v-for="(item, index) in catalogueList"
          v-show="item.hidden"
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
        width="56%"
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
              hidden: true,
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
              hidden: true,
            },
          ],
        },
        // 订单管理
        {
          isActive: false,
          name: "productOrder",
          arrName: [
            {
              iconSrc: "icon-chanpinku",
              name: "产品订单",
              isActive: true,
              routerName: "ProductOrder",
              routerPathName: "productOrder",
              hidden: true,
            },
          ],
        },
        // 库存管理
        {
          isActive: false,
          name: "purchaSellStock",
          arrName: [
            {
              iconSrc: "icon-kucunliebiao",
              name: "库存列表",
              isActive: false,
              routerName: "PurchaseList",
              routerPathName: "purchaseList",
              isChildren: false,
              isChildrenColor: false,
              rightStatus: false,
              hidden: true,
            },
            {
              iconSrc: "icon-jilu2",
              name: "进出库记录",
              isActive: false,
              routerName: "Record",
              routerPathName: "record",
              isChildren: false,
              isChildrenColor: false,
              rightStatus: false,
              hidden: true,
            },
            {
              iconSrc: "icon-iconfontzhizuobiaozhunbduan15",
              name: "入库",
              isActive: false,
              routerName: "Godown",
              routerPathName: "godown",
              isChildren: false,
              isChildrenColor: false,
              rightStatus: false,
              hidden: false,
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
              hidden: true,
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
              hidden: true,
            },
            {
              iconSrc: "icon-bumenguanli",
              name: "部门管理",
              isActive: true,
              routerName: "Divisional",
              routerPathName: "divisional",
              isChildren: false,
              hidden: true,
            },
            {
              iconSrc: "icon-yuangongguanli",
              name: "员工管理",
              isActive: true,
              routerName: "StaffManagement",
              routerPathName: "staffManagement",
              isChildren: false,
              hidden: true,
            },
            {
              iconSrc: "icon-jixiao",
              name: "绩效管理",
              isActive: true,
              routerName: "Performance",
              routerPathName: "performance",
              isChildren: false,
              hidden: true,
            },
            {
              iconSrc: "icon-paiqi",
              name: "工作排期",
              isActive: true,
              routerName: "WorkScheduling",
              routerPathName: "workScheduling",
              isChildren: false,
              hidden: true,
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
              hidden: true,
            },
            {
              iconSrc: "icon-xiaofeimingxi",
              name: "消费明细",
              isActive: true,
              routerName: "ConsumptionDetail",
              routerPathName: "consumptionDetail",
              isChildren: false,
              hidden: true,
            },
            {
              iconSrc: "icon-ticheng",
              name: "员工提成",
              isActive: true,
              routerName: "StaffCommission",
              routerPathName: "staffCommission",
              isChildren: false,
              hidden: true,
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
              hidden: true,
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
              hidden: true,
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
              hidden: true,
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
          hidden: true,
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
              hidden: true,
            },
            {
              iconSrc: "icon-zhanghaoguanli",
              name: "账号管理",
              isActive: true,
              routerName: "AccountAccept",
              routerPathName: "accountAccept",
              isChildren: false,
              hidden: true,
            },
            {
              iconSrc: "icon-caiwuguanli",
              name: "财务管理",
              isActive: true,
              routerName: "Financetor",
              routerPathName: "financetor",
              isChildren: false,
              hidden: true,
            },
            {
              iconSrc: "icon-kehugenjin",
              name: "客户跟进",
              isActive: true,
              routerName: "CustomerFollow",
              routerPathName: "customerFollow",
              isChildren: false,
              hidden: true,
            },
            {
              iconSrc: "el-icon-user",
              name: "用户信息",
              isActive: true,
              routerName: "UserInfo",
              routerPathName: "userInfo",
              isChildren: false,
              hidden: true,
            },
            {
              iconSrc: "el-icon-position",
              name: "发布通知",
              isActive: true,
              routerName: "Notice",
              routerPathName: "notice",
              isChildren: false,
              hidden: true,
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
              hidden: true,
            },
            {
              iconSrc: "icon-jiagegusuan",
              name: "运费估算",
              isActive: true,
              routerName: "FreightComputers",
              routerPathName: "freightComputers",
              isChildren: false,
              hidden: true,
            },
            {
              iconSrc: "el-icon-refresh",
              name: "URL转换",
              isActive: true,
              routerName: "ImageOnlineURL",
              routerPathName: "imageOnlineURL",
              isChildren: false,
              hidden: true,
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
    next();
  },
  activated() {
    // 重置tips的状态值
    this.catalogueList = [];
    // 判断侧边栏目录 拿到数组
    this.pathName.forEach((e) => {
      if (this.$route.path.indexOf(e.name) > -1) {
        this.catalogueList = e.arrName;
      }
    });
    // 入库 statu
    if (
      this.InfoData.statu == "0" ||
      this.InfoData.userName == "王焕杰" ||
      this.InfoData.userName == "任治琴" ||
      this.InfoData.userName == "李健明" ||
      this.InfoData.userName == "王杰" ||
      this.InfoData.userName == "hzsugoi"
    ) {
      this.catalogueList.forEach((e) => {
        if (e.name == "入库") {
          e.hidden = true;
        }
      });
    } else {
      this.catalogueList.forEach((e) => {
        if (e.name == "入库") {
          e.hidden = false;
        }
      });
    }

    if (this.$parent.$refs.titlePage != undefined) {
      // 掉用titleNavbar 的 方法
      this.$parent.$refs.titlePage.getInfoData();
    }
    // 检测路由

    // 解决不缓存跳到缓存的leftNavbar 不展开问题
    if (this.WstateStatus && this.$route.meta.keepAlive) {
      this.setWstateStatus(false);
      this.clickW();
    }
    if (!this.WstateStatus && this.$route.meta.keepAlive) {
      this.setWstateStatus(true);
      this.clickW();
    }
    this.detection();
  },
  created() {
    // 重置tips的状态值
    this.catalogueList = [];
    // 判断侧边栏目录 拿到数组
    this.pathName.forEach((e) => {
      if (this.$route.path.indexOf(e.name) > -1) {
        this.catalogueList = e.arrName;
      }
    });

    // 入库 statu
    if (
      this.InfoData.statu == "0" ||
      this.InfoData.userName == "王焕杰" ||
      this.InfoData.userName == "任治琴" ||
      this.InfoData.userName == "李健明" ||
      this.InfoData.userName == "王杰" ||
      this.InfoData.userName == "hzsugoi"
    ) {
      this.catalogueList.forEach((e) => {
        if (e.name == "入库") {
          e.hidden = true;
        }
      });
    } else {
      this.catalogueList.forEach((e) => {
        if (e.name == "入库") {
          e.hidden = false;
        }
      });
    }

    if (this.$parent.$refs.titlePage != undefined) {
      // 掉用titleNavbar 的 方法
      this.$parent.$refs.titlePage.getInfoData();
    }
    // 检测路由

    // 解决缓存跳到不缓存的leftNavbar 展开问题
    if (!this.WstateStatus && !this.$route.meta.keepAlive) {
      this.setWstateStatus(true);
      this.clickW();
    } else if (this.WstateStatus && !this.$route.meta.keepAlive) {
      this.setWstateStatus(false);
      this.clickW();
    }
    this.detection();
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
        .catch((err) => {});
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
    // clickMe宽度
    clickW() {
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
        this.setWstateStatus(false);
        this.leftArow = false;
        this.iconSrc = "el-icon-s-unfold";
        this.borderR = "none";
        this.catalogueList[this.catalogueList.length - 1].arrow = false;
        this.W = 50;
      } else {
        this.popoverDis = true;
        this.linkTo = true;
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
        }
        // this.setIsChildren(true);
        this.setWstateStatus(true);
        this.leftArow = true;
        this.iconSrc = "el-icon-s-fold";
        this.borderR = "3px solid #409eff";
        this.W = 220;
      }
      this.$emit("Wstate", this.WstateStatus);
    },
    // 检测路由
    detection() {
      this.catalogueList.forEach((e) => {
        e.isActive = false;
        e.isChildrenColor = false;
        if (e.children != undefined) {
          for (let i = 0; i < e.children.length; i++) {
            e.children[i].isActive = false;
          }
        }
        if (this.$route.name == "PurchaseCompileDefault") {
          if (e.name == "库存列表") {
            e.isChildrenColor = true;
            e.isActive = true;
          }
          return;
        }
        if (this.$route.name == "VideoCourse") {
          this.catalogueList[this.catalogueList.length - 1].rightStatus = true;
          this.catalogueList[this.catalogueList.length - 2].rightStatus = true;
          this.catalogueList[this.catalogueList.length - 2].arrow = true;
          this.catalogueList[this.catalogueList.length - 2].isChildren = true;
          this.catalogueList[
            this.catalogueList.length - 2
          ].isChildrenColor = true;
          this.catalogueList[this.catalogueList.length - 2].children.forEach(
            (el) => {
              if (el.name == "变体修改") {
                el.isActive = true;
              }
            }
          );
          return;
        }
        // 其他
        if (this.$route.path.indexOf(e.routerPathName) > -1) {
          e.isActive = true;
          e.isChildrenColor = true;
        }
      });
    },
    // 侧边栏跳转路由
    gotoRouter(item, index) {
      if (item.name == "趣天教学视频" || item.name == "系统操作教学视频") {
        item.arrow = !item.arrow;
        item.isChildren = !item.isChildren;
        this.setIsChildren(item.isChildren);
        this.setArrow(item.arrow);
        // if(item.name == )

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
      });

      item.isActive = true;
      item.isChildrenColor = true;
      //   检测是否有通知
      this.GetNotice();
      this.$router.push({ name: item.routerName });
    },
    // 点击展开 跳转子路由
    gotoChildren(item, ele, i) {
      if (item.name == "趣天教学视频" || item.name == "系统操作教学视频") {
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
    },
    // 显示的时候触发
    getPopoverList() {
      if (this.catalogueList[this.titleIndex].children == undefined) {
        this.tipsList = this.catalogueList[this.titleIndex];
      } else {
        this.tipsList = this.catalogueList[this.titleIndex];
      }
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
          that.timer = false;
        }, 400);
      }
    },
  },
};
</script>
