<template>
  <div class="home">
    <div class="main" v-title data-title="首页"></div>
    <titleNavbar @childByValue="childByValue"></titleNavbar>
    <div class="content">
      <!-- 中心内容 -->
      <div class="right listDiv">
        <div class="v-bottom">
          <div class="freight">
            <div class="freight-left">
              <div class="system-notice">
                <div class="v-system-notice">
                  <div class="title">
                    系统公告<img src="../assets/img/gonggao.png" alt="" />
                  </div>
                  <div class="list">
                    <el-collapse v-model="activeNames" accordion>
                      <el-collapse-item
                        title="重要通知！重要通知！重要通知！"
                        name="5"
                      >
                        <div>
                          请需要物流中转的用户第一时间修改收件人名字和代码
                        </div>
                        <div>例：</div>
                        <div>地址：广州市白云区齐富路金福大厦701室</div>
                        <div>收件人：思高易(用户编号)</div>
                        <div>
                          另：请大家及时添加国内运单号，便于我司快速处理发货。无国内运单号不予处理。
                        </div>
                        <div>
                          关于异常订单：工作日上午11:00点。下午3：00点我们司物流部们同意处理跟进异常订单。处理后请及时跟进！
                        </div>
                      </el-collapse-item>
                      <el-collapse-item
                        title="2021-11-01：Home展示店铺数据"
                        name="2"
                      >
                        <div>
                          <div>1.添加Home页面的店铺数据</div>
                          <div>2.修改订单同步订单</div>
                        </div>
                      </el-collapse-item>
                      <el-collapse-item
                        title="2021-10-28：添加订单编号，消费页点单编号搜索框，佐川加急"
                        name="4"
                      >
                        <div>1.添加订单编号,点击复制订单编号</div>
                        <div>2.添加消费页面搜索点单编号的搜索框。</div>
                        <div>3.添加佐川加急渠道。</div>
                      </el-collapse-item>
                      <el-collapse-item
                        title="2021-10-27：修改公司管理"
                        name="3"
                      >
                        <div>1.修改公司管理/公司管理</div>
                        <div>2.修改公司管理/员工管理</div>
                        <div>3.修复订单页面点击"转运订单"获取订单详情</div>
                      </el-collapse-item>
                      <el-collapse-item
                        title="2021-10-15：修改产品库获取产品方式"
                        name="1"
                      >
                        <div>1.产品库获取产品方式(下滑)</div>
                        <div>2.优化产品库获取产品</div>
                      </el-collapse-item>
                      <el-collapse-item
                        title="2021-10-13：订单页面添加查询物流(点击国内单号)"
                        name="6"
                      >
                        <div>1.订单页面添加查询物流(点击国内单号)</div>
                        <div>2.添加编辑订单页面佐川普货免抛(下单,打印)</div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </div>
              </div>
              <div class="shop-time">
                <div class="shop">
                  <span>选择店铺：</span>
                  <select
                    @change="changeST(shopList, shopListIndex)"
                    v-model="shopListIndex"
                  >
                    <option
                      v-for="(item, index) in shopList"
                      :key="index"
                      :value="index"
                      :disabled="item.disabled"
                    >
                      {{ item.shopuser }}
                    </option>
                  </select>
                </div>
                <div class="time">
                  <span>选择时间：</span>
                  <select
                    @change="changeST(timeList, timeListIndex)"
                    v-model="timeListIndex"
                  >
                    <option
                      v-for="(item, index) in timeList"
                      :key="index"
                      :value="index"
                      :disabled="item.disabled"
                    >
                      {{ item.name }}
                    </option>
                  </select>
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
                    <router-link :to="{ name: 'ProductOrderDefault' }"
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
                  <span>运输方式：</span>
                  <select
                    v-model="transtionIndex"
                    @change="changeSet(transitionList, transtionIndex)"
                  >
                    <option
                      v-for="(item, index) in transitionList"
                      :key="index"
                      :value="index"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div>
                <div class="countType">
                  <span>计费方式：</span>
                  <select
                    v-model="countIndex"
                    @change="changeSet(countList, countIndex)"
                  >
                    <option
                      v-for="(item, index) in countList"
                      :key="index"
                      :value="index"
                    >
                      {{ item.name }}
                    </option>
                  </select>
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
                <div v-for="(item, index) in checkboxList" :key="index">
                  <input
                    @click="selectProduct(item, index)"
                    type="radio"
                    :checked="item.checked"
                  />
                  <span @click="selectProduct(item, index)">{{
                    item.name
                  }}</span>
                </div>
              </div>
              <div class="remote">
                <input
                  @click="clcikAddress()"
                  type="checkbox"
                  :checked="addressFlag"
                />
                <span @click="clcikAddress()">偏远地区(冲绳,离岛)</span>
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
          <div class="home-notice">
            <el-dialog
              title="通知（因为香港航班价格调整，我司针对广州分部的香港带电特殊航线报价作出以下调整）"
              :visible.sync="noticeStatus"
              width="70%"
              center
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
                    <el-table-column prop="Continuation" label="续重（0.5kg）">
                    </el-table-column>
                    <el-table-column prop="serviceFreight" label="服务费">
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
        <div class="v-footer">
          ©{{
            years
          }}&nbsp;&nbsp;&nbsp;广州思高易网络科技有限公司&nbsp;&nbsp;&nbsp;粤ICP备19040870号
        </div>
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

// Echarts 图表
import Echarts1 from "@/components/Echarts1.vue";
import Echarts2 from "@/components/Echarts2.vue";

// navbar 导航栏
import titleNavbar from "@/components/titleNavbar.vue";
// less
import "../assets/less/home/home.less";

export default {
  data() {
    return {
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
      shopList: [],
      shopTime: "",
      //   shijian
      timeListIndex: 0,
      timeList: [
        { name: "当天", selected: true, value: 1 },
        { name: "最近七天", selected: false, value: 7 },
        { name: "最近半个月", selected: false, value: 15 },
        { name: "最近一个月", selected: false, value: 30 },
      ],
      // 运输方式的index
      transtionIndex: 0,
      // 运输方式optionList
      transitionList: [
        { name: "估算后系统匹配", selected: true, value: 99 },
        { name: "佐川普货免抛", selected: false, value: "PK0009" },
        { name: "佐川特货", selected: false, value: "佐川" },
        { name: "佐川普货", selected: false, value: "RB-DS3" },
        { name: "佐川带电", selected: false, value: "JPSADD" },
        { name: "黑猫3cm", selected: false, value: "黑猫" },
        { name: "黑猫带电3cm", selected: false, value: "黑猫带电" },
        { name: "Qxpress", selected: false, value: "Qxpress" },
        { name: "E特快", selected: false, value: "ETK" },
        { name: "EMS", selected: false, value: "EMS" },
      ],
      //   计费方式的index
      countIndex: 0,
      countList: [
        { name: "重量", seleted: true, value: 0 },
        { name: "体积(计抛)", seleted: false, value: 1 },
      ],
      // 货物的分类
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
          serviceFreight: "3",
          norms: "限5kg以内,三边和不超过100cm",
          volume: "长*宽*高/6000",
          duration: "3-5天",
        },
        {
          channel: "佐川普货",
          first: "42",
          Continuation: "13",
          serviceFreight: "3",
          norms: "限5kg以内,三边和不超过100cm",
          volume: "长*宽*高/6000",
          duration: "3-5天",
        },
        {
          channel: "佐川带电",
          first: "46",
          Continuation: "15",
          serviceFreight: "3",
          norms: "限5kg以内,三边和不超过100cm",
          volume: "长*宽*高/6000",
          duration: "3-5天",
        },
        {
          channel: "佐川特货",
          first: "54",
          Continuation: "16",
          serviceFreight: "3",
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
          first: "32",
          Continuation: "11",
          serviceFreight: "3",
          norms: "限5kg以内,三边和不超过60cm",
          volume: "不计抛",
          duration: "3-5天",
        },
        {
          channel: "黑猫3cm带电",
          first: "34",
          Continuation: "12",
          serviceFreight: "3",
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
      // 系统公告展开状态值
      activeNames: "0",
    };
  },
  components: {
    Echarts1,
    Echarts2,
    titleNavbar,
  },
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    next();
  },
  created() {
    let d = new Date();
    this.years = d.getFullYear();
    this.getTime();
    // shopList
    this.shopList = this.shopData;
    if (this.shopList.length > 0) {
      this.getFourDate();
    } else {
      let shopObj = {
        id: 0,
        shopuser: "全部",
      };
      this.shopList.push(shopObj);
    }
    // this.setWstateStatus(false);
  },
  computed: {
    ...homeState(["WstateStatus", "InfoData", "homeTitleStatus", "shopData"]),
  },
  mounted() {},
  methods: {
    // 货物的选择
    selectProduct(item, index) {
      if (item.checked) {
        return;
      }
      for (let i = 0; i < this.checkboxList.length; i++) {
        this.checkboxList[i].checked = false;
      }
      item.checked = true;
    },
    // 点击偏远地区
    clcikAddress() {
      this.addressFlag = !this.addressFlag;
    },
    // 获取店铺
    getFourDate() {
      if (this.shopList[this.shopListIndex].id == 0) {
        return;
      }
      let data = {
        shopid: this.shopList[this.shopListIndex].id,
        Heaven: this.timeList[this.timeListIndex].value,
      };
      this.$axios({
        url: "/sigaoyi/salesStatistics",
        method: "POST",
        params: data,
      })
        .then((result) => {
          //   console.log("result ==>", result);
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
          }
        })
        .catch((err) => {
          //   console.log("err ==>", err);
        });
    },
    // shop time
    changeST(array, setIndex) {
      array.forEach((e) => {
        e.selected = false;
      });
      array[setIndex].selected = true;

      this.getFourDate();
    },
    // set
    changeSet(array, index) {
      array.forEach((e) => {
        e.seleted = false;
      });
      array[index].seleted = true;

      let data = {
        PlanToThrow: 0,
        userName: this.InfoData.userName,
        length: Number(this.reckonList.long),
        width: Number(this.reckonList.width),
        high: Number(this.reckonList.high),
        weight: Number(this.reckonList.weight),
        trade_type1: this.transitionList[this.transtionIndex].value,
        address: "",
      };
      if (this.addressFlag) {
        data.address = "冲绳";
      }
      //  重量 0  体积  1
      if (this.countIndex == 0) {
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
      this.checkboxList.forEach((e) => {
        if (e.checked) {
          data.AttributeType = Number(e.value);
        }
      });
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
            this.transitionList.forEach((e, i) => {
              e.selected = false;
              if (result.data.trade_type == e.value) {
                e.selected = true;
                this.transtionIndex = i;
              }
            });
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
        this.noticeStatus = false;
      }
    },

    ...homeActions(["setWstateStatus", "setHomeTitleStatus"]),
  },
};
</script>
