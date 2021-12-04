<template>
  <div class="home">
    <div class="main" v-title data-title="首页"></div>
    <sideNavbar1 ref="sideNavbar1" @Wstate="getWstate"></sideNavbar1>
    <div class="content">
      <titleNavbar
        @childByValue="childByValue"
        :wastate="flag"
        :style="{ width: W, marginLeft: leftName + 'px' }"
      ></titleNavbar>
      <!-- 中心内容 -->
      <div
        class="right listDiv"
        :wastate="flag"
        :style="{ width: W, marginLeft: leftName + 'px' }"
      >
        <div class="v-bottom">
          <div class="freight">
            <div class="freight-left">
              <div class="system-notice">
                <div class="v-system-notice">
                  <div class="title">
                    <el-badge
                      :value="noticeBageNum"
                      class="title_bage"
                      v-if="noticeBageNum != 0"
                    >
                      系统公告
                    </el-badge>
                    <span v-else>系统公告</span>
                    <!-- <img src="../assets/img/gonggao.png" alt="" /> -->
                  </div>
                  <div class="list" v-if="collapseList.length > 0">
                    <el-collapse
                      v-model="activeNames"
                      accordion
                      @change="handleChange"
                    >
                      <el-collapse-item
                        v-for="(item, index) in collapseList"
                        :key="index"
                        :name="index + 1"
                      >
                        <template slot="title" v-if="item.bage">
                          <el-badge is-dot class="title_bage">
                            {{ item.releaseTime }}{{ item.title }}
                          </el-badge>
                        </template>
                        <template slot="title" v-else>
                          {{ item.releaseTime }}{{ item.title }}
                        </template>
                        <div v-for="(e, i) in item.content1" :key="i">
                          {{ e }}
                        </div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                  <div class="list1" v-else>
                    <el-empty description="暂无公告"></el-empty>
                  </div>
                </div>
              </div>
              <!-- 店铺数据 -->
              <div class="shop-time">
                <div class="shop">
                  <span>选择店铺：</span>
                  <el-select
                    v-model="shopListIndex"
                    @change="getFourDate()"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in shopList"
                      :key="item.value"
                      :label="item.shopuser"
                      :value="item.id"
                      @clear="shopListIndex = 0"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="time">
                  <span>选择时间：</span>
                  <el-select
                    v-model="timeListIndex"
                    @change="getFourDate()"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in timeList"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="fourBigBox">
                <div
                  class="fourBox"
                  v-for="(item, index) in listData"
                  :key="index"
                >
                  <div class="one">
                    {{ item.title }}
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="item.tooltip"
                      placement="top"
                    >
                      <i class="el-icon-warning-outline"></i>
                    </el-tooltip>
                  </div>
                  <div class="two" :class="item.num > 0 ? 'active' : ''">
                    {{ item.num
                    }}<span v-show="item.titleVal == 'sales'">JPY</span>
                  </div>
                  <div class="Tolink" v-show="item.link && item.num > 0">
                    <router-link :to="{ name: 'LogisticsOrder' }"
                      >订单</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="freight-right">
              <div class="title">运费估算</div>
              <div class="result">
                计算结果：<i>{{ resultText }}</i>
              </div>
              <!-- 运输方式 计费方式 -->
              <div class="type">
                <div class="transtionType">
                  <span class="text">运输方式：</span>
                  <el-select
                    v-model="transtionIndex"
                    @change="changeSet(transtionIndex)"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in transitionList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="countType">
                  <span class="text">计费方式：</span>
                  <el-select
                    v-model="countIndex"
                    @change="changeSet(countIndex)"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in countList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="weight">
                <span>重量(kg)：</span>
                <input
                  type="number"
                  v-model="reckonList.weight"
                  placeholder="重量(kg)"
                />
              </div>
              <div class="volume">
                <span>体积(长*宽*高)：</span>
                <input
                  type="number"
                  v-model="reckonList.long"
                  placeholder="长(单位:cm)"
                  class="first"
                />
                <input
                  type="number"
                  v-model="reckonList.width"
                  placeholder="宽(单位:cm)"
                />
                <input
                  type="number"
                  v-model="reckonList.high"
                  placeholder="高(单位:cm)"
                />
              </div>
              <div class="product-type">
                <el-radio-group v-model="checkboxIndex">
                  <el-radio
                    :label="item.value"
                    v-for="(item, index) in checkboxList"
                    :key="index"
                    >{{ item.name }}</el-radio
                  >
                </el-radio-group>
              </div>
              <div class="remote">
                <el-checkbox v-model="addressFlag"
                  >偏远地区(冲绳,离岛)</el-checkbox
                >
              </div>
              <div class="btn">
                <el-button
                  :icon="iconSrc"
                  type="primary"
                  size="medium"
                  @click="reckon()"
                  >智能匹配渠道估算</el-button
                >
              </div>
            </div>
          </div>
          <div class="v-bottom-content">
            <div class="salesTitle">
              <div
                class="sales"
                :class="item.active"
                v-for="(item, index) in salesData"
                :key="index"
                @click="selectorDraw(index)"
              >
                {{ item.title }}
              </div>
              <div class="date">
                <div
                  class="smallDateBox"
                  :class="{ active: item.isActive }"
                  v-for="(item, index) in dateData"
                  :key="index"
                  @click="clickDate(index)"
                >
                  {{ item.title }}
                </div>
                <div class="selectorDate">
                  <div class="block">
                    <el-date-picker
                      v-model="value1"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions"
                    >
                    </el-date-picker>
                  </div>
                </div>
              </div>
            </div>
            <div class="salesFace" v-if="oneFaceState">
              <Echarts-1></Echarts-1>
            </div>
            <div class="salesFace" v-else><Echarts-2></Echarts-2></div>
          </div>
          <!-- 库存提示 -->
          <div class="purchaseMask">
            <el-dialog
              title="库存提示"
              :visible.sync="purchaseList.state"
              width="55%"
            >
              <div class="tips">
                <el-tag type="warning" v-show="purchaseList.warningTips">
                  入库超过5天，请及时处理。入库超过30天，我司将销毁。
                  <i
                    class="el-icon-close"
                    @click="purchaseList.warningTips = false"
                  ></i>
                </el-tag>
              </div>
              <div class="table">
                <el-table
                  :data="purchaseList.tableList"
                  border
                  max-height="400"
                  style="width: 100%"
                >
                  <el-table-column prop="name" label="编号" width="200px">
                  </el-table-column>
                  <el-table-column label="图片">
                    <template slot-scope="scope">
                      <span v-if="scope.row.img == ''"></span>
                      <img
                        v-else
                        :src="scope.row.img"
                        alt=""
                        style="height: 40px; width: 40px"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column prop="quantity" label="数量">
                  </el-table-column>
                  <el-table-column prop="storageTime1" label="入库时间">
                  </el-table-column>
                </el-table>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="TopurchaseList()"
                  >查看</el-button
                >
                <el-button @click="purchaseList.state = false">取消</el-button>
              </span>
            </el-dialog>
          </div>
          <!-- 弹窗通知 -->
          <div class="home-notice">
            <el-dialog
              title="通知（因为香港航班价格调整，我司针对广州分部的香港带电特殊航线报价作出以下调整）"
              :visible.sync="noticeStatus"
              width="70%"
              center
              @close="getPurchareOverTime"
            >
              <div class="notice-content">
                <div class="speech">
                  致 思高易全体用户：<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2021年08月31日起，我司物流价格体系有所调整。<br />
                  佐川普货：首重45,续重13<br />
                  佐川带电：首重49,续重15<br />
                  为提高工作效率及质量，发货默认由我司选择最优渠道，用户可自行在系统中查看发货渠道。<br />
                </div>
                <div class="notice-table">
                  <div class="notice-title">执行日期2021年08月31日</div>
                  <el-table
                    :data="noticeTableData"
                    :span-method="arraySpanMethod"
                    border
                    style="width: 100%"
                  >
                    <el-table-column prop="channel" label="渠道">
                    </el-table-column>
                    <el-table-column prop="first" label="首重（0.5kg）">
                    </el-table-column>
                    <!-- <el-table-column prop="first" label="首重（0.5kg）">
                    </el-table-column> -->
                    <el-table-column prop="Continuation" label="续重（0.5kg）">
                    </el-table-column>
                    <el-table-column prop="norms" label="规格" width="220">
                    </el-table-column>
                    <el-table-column prop="volume" label="体积计算">
                    </el-table-column>
                    <el-table-column prop="duration" label="参考时效">
                    </el-table-column>
                  </el-table>
                </div>
                <div class="speech-footer">
                  注意事项： <br />
                  1.所有包裹或货件都必须提供货物清单：清单信息要求单货相符，内容一致，品名要特别注明清楚。<br />
                  2.冲绳、离岛、北海道部分地区另收偏远费150元/票！ <br />
                  3.特货渠道：包含化妆品（单票24个以内）、防疫物资、情趣用品、动漫产品可出，另粉末液体单询。<br />
                  4.佐川带电：带磁带电（单票6个以内） <br />
                  5.自出口报关后，需改地址的，需在原日本地址派送不成功后更改，派送成功则无法更改，地址更改费为99RMB/票。
                  <br />
                  6.若遇到收件方客人拒收，佐川退回改派收取2000日币，退回销毁则不产生费用。黑猫退回改派收取29元人民币。<br />
                  7.黑猫渠道破损不赔偿<br />
                </div>
                <div class="zuci">特此通知！<br />祝 商祺！</div>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="noticeStatus = false"
                  >关 闭</el-button
                >
              </span>
            </el-dialog>
          </div>
        </div>
        <!-- 页脚 -->
        <div
          class="v-footer"
          :style="{ width: W, marginLeft: leftName + 'px' }"
        >
          ©{{
            years
          }}&nbsp;&nbsp;&nbsp;广州思高易网络科技有限公司&nbsp;&nbsp;&nbsp;粤ICP备19040870号
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateFormats from "@/assets/js/dateFormat";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");

// Echarts 图表
import Echarts1 from "@/components/Echarts1.vue";
import Echarts2 from "@/components/Echarts2.vue";

// navbar 导航栏
import titleNavbar from "@/components/titleNavbar.vue";
import sideNavbar1 from "@/components/sideNavbar1.vue";
// less
import "../assets/less/home/home.less";

export default {
  data() {
    return {
      value: "",
      // sideNavbar 的状态
      chilrenVal: "",
      //   left 值
      leftName: 220,
      // 侧边栏的宽度
      W: "calc(100% - 220px)",
      // 传给子元素的状态值
      flag: "",
      // 屏幕高度-top
      Height: "",
      //
      BoxshowState: false,
      // 4个盒子Data
      listData: [
        {
          title: "销售金额（包含邮费）",
          titleVal: "sales",
          num: 0,
          link: false,
          tooltip: "总销售金额",
        },
        {
          title: "订购数量",
          titleVal: "OrderQuantity",
          num: 0,
          link: false,
          tooltip: "订购订单数量",
        },
        {
          title: "新订购",
          titleVal: "newOrder",
          num: 0,
          link: true,
          tooltip: "新订购订单",
        },
        {
          title: "等待发货",
          titleVal: "waitOrder",
          num: 0,
          link: false,
          tooltip: "待发货订单",
        },
      ],
      //店铺
      shopListIndex: 0,
      shopList: [
        {
          id: 0,
          shopuser: "全部",
        },
      ],
      shopTime: "",
      //   shijian
      timeListIndex: 0,
      timeList: [
        { name: "当天", selected: true, value: 0 },
        { name: "最近七天", selected: false, value: 7 },
        { name: "最近半个月", selected: false, value: 15 },
        { name: "最近一个月", selected: false, value: 30 },
      ],
      // 运输方式的index
      transtionIndex: 99,
      // 运输方式optionList
      transitionList: [
        { label: "估算后系统匹配", selected: true, value: 99 },
        { label: "佐川普货免抛", selected: false, value: "PK0009" },
        { label: "佐川特货", selected: false, value: "佐川" },
        { label: "佐川普货", selected: false, value: "RB-DS3" },
        { label: "佐川带电", selected: false, value: "JPSADD" },
        { label: "黑猫3cm", selected: false, value: "黑猫" },
        { label: "黑猫带电3cm", selected: false, value: "黑猫带电" },
        { label: "Qxpress", selected: false, value: "Qxpress" },
        { label: "E特快", selected: false, value: "ETK" },
        { label: "EMS", selected: false, value: "EMS" },
      ],
      //   计费方式的index
      countIndex: 0,
      countList: [
        { label: "重量", seleted: true, value: 0 },
        { label: "体积(计抛)", seleted: false, value: 1 },
      ],
      // 货物的分类
      checkboxIndex: 0,
      checkboxList: [
        { name: "普货", checked: true, value: 0 },
        { name: "特货", checked: false, value: 1 },
        { name: "带电带磁", checked: false, value: 2 },
      ],
      // 只能估算按钮
      iconSrc: "el-icon-top",
      // 偏远地区状态值
      addressFlag: false,
      // salesData
      salesData: [
        { title: "销售额", active: "active" },
        { title: "销量", active: "" },
      ],
      // 选项卡状态
      oneFaceState: false,
      // 日期数组
      dateData: [
        { title: "今日", isActive: false },
        { title: "本周", isActive: false },
        { title: "本月", isActive: false },
        { title: "全年", isActive: true },
        // { title: "自定义", isActive: false },
      ],
      // 选择日期快捷键
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      // 日期的值
      value1: [],
      //  长 * 宽 * 高 *重
      reckonList: {
        long: 0,
        width: 0,
        high: 0,
        weight: 0,
      },
      //   结果
      resultText: "",
      //   footer宽度
      footerW: "",
      // 年份
      years: "",
      //  进来弹出层状态
      noticeStatus: false,
      //  进来弹出层表格
      noticeTableData: [
        {
          channel: "佐川加急",
          first: "47",
          Continuation: "14",
          norms: "限5kg以内,三边和不超过100cm",
          volume: "长*宽*高/6000",
          duration: "3-5天",
        },
        {
          channel: "佐川普货",
          first: "45",
          Continuation: "13",
          norms: "限5kg以内,三边和不超过100cm",
          volume: "长*宽*高/6000",
          duration: "3-5天",
        },
        {
          channel: "佐川带电",
          first: "49",
          Continuation: "15",
          norms: "限5kg以内,三边和不超过100cm",
          volume: "长*宽*高/6000",
          duration: "3-5天",
        },
        {
          channel: "佐川特货",
          first: "57",
          Continuation: "16",
          norms: "限5kg以内,三边和不超过100cm",
          volume: "长*宽*高/6000",
          duration: "3-5天",
        },
        //  {
        //   channel: "佐川免抛",
        //   first: "57",
        //   Continuation: "16",
        //   norms: "限5kg以内,三边和不超过100cm",
        //   volume: "长*宽*高/6000",
        //   duration: "3-5天",
        // },
        {
          channel: "黑猫3cm普货",
          first: "35",
          Continuation: "11",
          norms: "限5kg以内,三边和不超过60cm",
          volume: "不计抛",
          duration: "3-5天",
        },
        {
          channel: "黑猫3cm带电",
          first: "37",
          Continuation: "12",
          norms: "限5kg以内,三边和不超过60cm",
          volume: "不计抛",
          duration: "3-5天",
        },
        {
          channel: "Q仓",
          first: "3.5服务费/票",
          Continuation: "不计抛",
          norms: "3-5天",
          volume: "不计抛",
          duration: "3-5天",
        },
      ],
      // 库存提示列表
      purchaseList: {
        state: false,
        warningTips: true,
        tableList: [],
      },
      noticeBageNum: 0,
      // 系统公告List
      collapseList: [],
      // 系统公告展开状态值
      activeNames: "0",
      collapseBageList: [],
    };
  },
  components: {
    Echarts1,
    Echarts2,
    titleNavbar,
    sideNavbar1,
  },
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    next();
  },
  created() {
    let d = new Date();
    this.years = d.getFullYear();
    this.getTime();
    // 初始公告 bage
    this.getNoticeBage();
    // 获取信息
    this.getOnline();
    // 店铺
    if (this.shopData.length > 0) {
      this.getFourDate("create");
    }
    // this.setWstateStatus(false);
  },
  computed: {
    ...homeState(["WstateStatus", "InfoData", "homeTitleStatus", "shopData"]),
  },
  methods: {
    // 子组件向父组件 传过来的状态值
    getWstate(v) {
      this.chilrenVal = v;
    },
    // 监听 侧边栏的状态
    Wchange() {
      //   传给子元素的值
      this.flag = this.chilrenVal;
      if (this.chilrenVal) {
        this.leftName = 220;
        this.W = "calc(100% - 220px)";
        this.setWstateStatus(true);
      } else {
        this.leftName = 50;
        this.W = "calc(100% - 50px)";
        this.setWstateStatus(false);
      }
    },
    // 初始获取公告
    getNoticeBage() {
      this.$axios({
        url: "/sigaoyi/Getannouncement",
        method: "POST",
        params: {},
      })
        .then((result) => {
          console.log("result ==>", result);
          this.collapseList = result.data.announcements;
          this.collapseList.forEach((e) => {
            e["bage"] = true;
            e["content1"] = e.content.split("\n");
            if (e.readUsers.indexOf(this.InfoData.userName) > -1) {
              e.bage = false;
            } else {
              this.noticeBageNum++;
            }
          });
        })
        .catch((err) => {
          console.log("err ==>", err);
        });
    },
    // 已读首页公告
    readNotice(id) {
      this.$axios({
        url: "/sigaoyi/NEWhaveread",
        method: "POST",
        params: {
          userName: this.InfoData.userName,
          id: id,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
        })
        .catch((err) => {
          console.log("err ==>", err);
        });
    },
    // 公告 change
    handleChange(val) {
      if (val != "") {
        this.collapseList.forEach((e, i) => {
          if (e.bage == false) {
            return;
          } else {
            if (i + 1 == val) {
              e.bage = false;
              this.noticeBageNum--;
              this.readNotice(e.id);
            }
          }
        });
      }
    },
    // 获取店铺
    getFourDate(string) {
      let data = {
        shopid: this.shopListIndex,
        userId: this.InfoData.id,
        Heaven: this.timeListIndex,
      };
      let url;
      if (string == "create") {
        url = "/sigaoyi/SynchronizeOrderData";
      } else {
        url = "/sigaoyi/salesStatistics";
      }

      console.log("data ==>", data);
      this.$axios({
        url,
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            this.listData.forEach((e) => {
              if (e.titleVal == "newOrder") {
                e.num = result.data.NewOrder;
              } else if (e.titleVal == "OrderQuantity") {
                e.num = result.data.OrderQuantity;
              } else if (e.titleVal == "sales") {
                e.num = result.data.SalesAmount;
              } else if (e.titleVal == "waitOrder") {
                e.num = result.data.WaitForDelivery;
              }
            });
            if (string == "create") {
              this.shopData.forEach((e) => {
                this.shopList.forEach((el) => {
                  if (e.id == el.id) {
                    return;
                  }
                });
                this.shopList.push(e);
              });
              this.shopIndex = 0;
            }
            console.log("this.shopList==>", this.shopList);
            console.log("this.shopData==>", this.shopData);
          }
        })
        .catch((err) => {
          //   console.log("err ==>", err);
        });
    },
    // set
    changeSet(value) {
      let data = {
        PlanToThrow: 0,
        userName: this.InfoData.userName,
        length: Number(this.reckonList.long),
        width: Number(this.reckonList.width),
        high: Number(this.reckonList.high),
        weight: Number(this.reckonList.weight),
        trade_type1: this.transtionIndex,
        address: "",
      };
      if (this.addressFlag) {
        data.address = "冲绳";
      }
      //  重量 0  体积  1
      if (value == 0) {
        data.PlanToThrow = 0;
      } else {
        data.PlanToThrow = 1;
      }

      this.$axios({
        url: "/sigaoyi/NEWFreightCalculation",
        method: "POST",
        params: data,
      })
        .then((result) => {
          if (result.data.Code == 200) {
            this.resultText = result.data.freight;
          } else {
            this.resultText = "计算失败";
          }
        })
        .catch((err) => {
          this.resultText = "计算错误";
        });
    },
    // 点击智能估算
    reckon() {
      let data = {
        length: Number(this.reckonList.long),
        width: Number(this.reckonList.width),
        high: Number(this.reckonList.high),
        weight: Number(this.reckonList.weight),
        // trade_type: this.transitionList[this.transtionIndex].value,
        RemoteRegions: Number,
        AttributeType: 0,
        userName: this.InfoData.userName,
      };
      // 普货 特货 带电
      data.AttributeType = this.checkboxIndex;
      // 0 边远地区  1 NO
      if (this.addressFlag) {
        data.RemoteRegions = 0;
      } else {
        data.RemoteRegions = 1;
      }

      this.iconSrc = "el-icon-loading";
      this.$axios({
        url: "/sigaoyi/SmartEstimation",
        method: "POST",
        params: data,
      })
        .then((result) => {
          if (result.data.Code == 200) {
            this.transtionIndex = result.data.trade_type;
            this.resultText = result.data.freight;
            setTimeout(() => {
              this.iconSrc = "el-icon-top";
            }, 500);
          } else {
            this.resultText = "计算失败";
            this.iconSrc = "el-icon-top";
          }
        })
        .catch((err) => {
          this.resultText = "计算错误";
          this.iconSrc = "el-icon-top";
        });
    },
    // 销售选项卡
    selectorDraw(index) {
      this.salesData.forEach((e) => {
        e.active = "";
      });
      this.salesData[index].active = "active";

      if (index == 0) {
        this.oneFaceState = false;
      } else {
        this.oneFaceState = true;
      }
    },
    // 日期选项卡 + 点击选择日期
    clickDate(index) {
      if (this.dateData[index].isActive) {
        return;
      }
      this.dateData.forEach((e) => {
        e.isActive = false;
      });
      this.dateData[index].isActive = true;
      // 判断点击的值

      let d = new Date();
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      // 周
      let weekDay = d.getDay();
      let day = d.getDate();
      // 今日
      if (index == 0) {
        let today = `${year}/${month}/${day}`;
        this.value1 = [today, today];
        // 本周
      } else if (index == 1) {
        if (day - weekDay + 1 < 0) {
          var startweek = `${this.getMonthFinalDay(year, month - 1)}`;
          var dateStr = startweek.split("-")[2];
          dateStr = Number(dateStr) + (day - weekDay + 1);
          dateStr =
            startweek.split("-")[0] +
            "/" +
            startweek.split("-")[1] +
            "/" +
            dateStr;
          var endweek = `${year}/${month}/${day - weekDay + 7}`;
          this.value1 = [dateStr, endweek];
        } else {
          var startweek = `${year}/${month}/${day - weekDay + 1}`;
          if (day - weekDay + 1 == 0) {
            var startweek = `${this.getMonthFinalDay(year, month - 1)}`;
          }
          var endweek = `${year}/${month}/${day - weekDay + 7}`;
          var endweekEnd = this.getMonthFinalDay().substr(
            -2,
            endweek.length - 2
          );
          //  周一+7大于本月的最后一天

          if (day - weekDay + 7 > endweekEnd) {
            var endweek = `${year}/${month + 1}/${
              day - weekDay + 7 - endweekEnd
            }`;
          }
          this.value1 = [startweek, endweek];
        }
        // 本月
      } else if (index == 2) {
        let startMonth = `${year}/${month}`;
        let endMonth = `${this.getMonthFinalDay()}`;
        this.value1 = [startMonth, endMonth];

        // 本年
      } else if (index == 3) {
        let startYear = `${year}/01/01`;
        let endYear = `${year}/12/31`;
        this.value1 = [startYear, endYear];
      }
    },
    // 初始日期值
    getTime() {
      let d = new Date();
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      this.value1[0] = `${year}/01/01`;
      this.value1[1] = `${year}/12/31`;
    },
    // 本月最后一天
    getMonthFinalDay(year, month) {
      var day = "";
      if (year == null || year == undefined || year == "") {
        year = new Date().getFullYear();
      }
      if (month == null || month == undefined || month == "") {
        month = new Date().getMonth() + 1;
      }
      day = new Date(new Date(year, month).setDate(0)).getDate();
      return year + "-" + month + "-" + day;
    },
    // home开始弹出层 合并
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 6) {
        if (columnIndex == 1) {
          return [1, 3];
        } else if (columnIndex === 2 || columnIndex === 3) {
          return [0, 0];
        }
      }
    },
    // 初始弹出层
    childByValue(childValue) {
      if (childValue) {
        if (this.InfoData.statu == "5") {
          this.noticeStatus = false;
          return;
        }
        this.noticeStatus = true;
      } else {
        //   有公告
        this.purchaseList.state = false;
        this.noticeStatus = false;
      }
    },
    // 信息
    getOnline() {
      this.$axios({
        url: "/sigaoyi/GetUnreadInformation",
        method: "POST",
        params: {
          userId: this.InfoData.id,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            let list = {
              isUnread: true,
              count: result.data.Unread,
              list: result.data.informations,
            };
            this.setOnlineList(list);
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
        });
    },
    // 获取库存 超时5天
    getPurchareOverTime() {
      this.$axios({
        url: "/sigaoyi/InventoryWarning",
        method: "POST",
        params: {
          userId: this.InfoData.id,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            if (result.data.invoicings.length > 0) {
              this.purchaseList.state = true;
              this.purchaseList.tableList = result.data.invoicings;
              this.purchaseList.tableList.forEach((e) => {
                e["storageTime1"] = dateFormats.dateFormat(e.storageTime);
              });
            } else {
              this.purchaseList.state = false;
            }
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
        });
    },
    // 添加单号
    TopurchaseList() {
      this.$router.push({ name: "PurchaseList", rowStatus: false });
    },
    ...homeActions(["setWstateStatus", "setHomeTitleStatus", "setOnlineList"]),
  },
  watch: {
    chilrenVal: "Wchange",
  },
};
</script>
