<template>
  <div class="rechargeWithdraw" :style="{ height: H + 'px' }">
    <van-nav-bar left-arrow @click-left="onClickLeft" />
    <div class="setText">
      <div
        v-for="(item, index) in setText"
        :key="index"
        @click="clickSetText(item, index)"
      >
        {{ item.text }}
      </div>
    </div>
    <!-- 充值 -->
    <div class="arightRecharge" v-if="setTextStatus">
      <div class="v-recharge">
        <div class="triangle"></div>
        <div class="num">
          <div>
            <span>{{ infoData.balance }}</span>
            <span>元</span>
          </div>
          <div @click="gotoRecharge()">立即充值</div>
        </div>
      </div>
      <!-- 筛选 -->
      <div class="rechargeStatus">
        <div
          v-for="(item, index) in statusList"
          :key="index"
          :class="item.isActive ? 'active' : ''"
          @click="clickStatus(item, index)"
        >
          <span>{{ item.text }}</span>
        </div>
      </div>
      <!-- 日期 + 查询按钮 + 统计 -->
      <div class="time">
        <div class="text">
          <font class="date">
            <i @click="clickTime()">{{ timeVal }}</i>
            <van-icon name="arrow-down" @click="clickTime()" />
          </font>
          <span
            v-for="(item, index) in textList"
            :key="index"
            :class="item.isActive ? 'active' : ''"
            @click="clickTextSet(item, index)"
            >{{ item.text }}</span
          >
          <van-button
            class="fr"
            size="mini"
            icon="search"
            type="info"
            @click="refer()"
            >查询</van-button
          >
        </div>
        <div class="statistics">
          <span>充值￥{{ rechargeMoney }}</span>
          <span class="fr" @click="gotoStati()">统计＞</span>
        </div>
        <van-action-sheet v-model="timeShow">
          <div class="content">
            <van-datetime-picker
              v-model="currentDate"
              type="date"
              :min-date="minDate"
              :max-date="maxDate"
              title="选择申请日期"
              :formatter="formatter"
              @cancel="cancelTime()"
              @confirm="confirmTime(currentDate)"
            />
          </div>
        </van-action-sheet>
      </div>
      <!-- 数据 -->
      <div
        class="scroll-list"
        v-show="!applyStatus"
        v-if="rechargeList.length > 0"
        :style="{ height: H - 340 + 'px' }"
      >
        <div class="itemList">
          <van-list
            v-model="listStatus"
            :finished="finished"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
          >
            <div
              class="list clearfix"
              v-for="(item, index) in rechargeList"
              :key="index"
              @click="gotoLink(item, index)"
            >
              <div class="fl">
                <img :src="item.img" alt="" />
              </div>
              <div class="fl">
                <span>编号：{{ item.numbering }}</span>
                <span>{{ item.applicationDate }}</span>
              </div>
              <div class="cutPayment fr" v-if="item.costStatus != '2'">
                <!-- 通过 驳回 审核中 -->
                <div class="fr" v-if="item.auditStatus == 1">
                  +{{ item.amount }}
                </div>
                <div class="fr active" v-else-if="item.auditStatus == 2">
                  {{ item.amount }}
                </div>
                <div class="fr review" v-else>审核中</div>
              </div>
              <!-- 扣款 -->
              <div class="cutPayment1 fr" v-else>
                <div class="fr">-{{ item.amount }}</div>
              </div>
            </div>
          </van-list>
        </div>
      </div>
      <!-- 查询不到数据 -->
      <div class="emptyDraw" v-show="!applyStatus" v-else>
        <van-empty>
          <div>
            所选月份无相关内容,查看更多请<span @click="clickTime()"
              >选择时间</span
            >
          </div>
        </van-empty>
      </div>
      <!-- 骨架屏 -->
      <div
        class="skeletonDraw"
        v-show="applyStatus"
        :style="{ height: H - 340 + 'px' }"
      >
        <div
          class="v-skeletonDraw"
          v-for="(item, index) in skeletonList"
          :key="index"
        >
          <van-skeleton
            avatar-size="45px"
            avatar-shape="square"
            avatar
            :row-width="rowWidth"
            :row="2"
          />
          <van-skeleton avatar-shape="square" avatar />
        </div>
      </div>
    </div>
    <!-- 提现 -->
    <div class="wothdraw" v-else>
      <div class="v-recharge">
        <div class="triangle active"></div>
        <div class="num active">
          <div>
            <span>最高提现金额：</span>
            <span>{{ infoData.balance }}</span>
            <span>元</span>
          </div>
          <div @click="gotoWithdraw()">立即提现</div>
        </div>
      </div>
      <!-- 筛选 -->
      <div class="rechargeStatus">
        <div
          v-for="(item, index) in statusList"
          :key="index"
          :class="item.isActive ? 'active' : ''"
          @click="clickStatus(item, index)"
        >
          <span>{{ item.text }}</span>
        </div>
      </div>
      <!-- 时间 + 查询按钮 + 统计 -->
      <div class="time">
        <div class="text">
          <font class="date">
            <i class="date" @click="clickTime()">{{ timeVal }}</i>
            <van-icon name="arrow-down" @click="clickTime()" />
          </font>
          <span
            v-for="(item, index) in textList"
            :key="index"
            :class="item.isActive ? 'active' : ''"
            @click="clickTextSet(item, index)"
            >{{ item.text }}</span
          >
          <van-button
            class="fr"
            size="mini"
            icon="search"
            type="info"
            @click="refer()"
            >查询</van-button
          >
        </div>
        <div class="statistics">
          <span>提现￥{{ withdrawMoney }}</span>
          <span class="fr" @click="gotoStati()">统计＞</span>
        </div>
        <van-action-sheet v-model="timeShow">
          <div class="content">
            <van-datetime-picker
              v-model="currentDate"
              type="date"
              :min-date="minDate"
              :max-date="maxDate"
              title="选择申请日期"
              :formatter="formatter"
              @cancel="cancelTime()"
              @confirm="confirmTime(currentDate)"
            />
          </div>
        </van-action-sheet>
      </div>
      <!-- 渲染数据 -->
      <div
        class="scroll-list"
        v-show="!applyStatus"
        v-if="rechargeList.length > 0"
        :style="{ height: H - 340 + 'px' }"
      >
        <div class="itemList">
          <van-list
            v-model="listStatus"
            :finished="finished"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
          >
            <div
              class="list clearfix"
              v-for="(item, index) in rechargeList"
              :key="index"
              @click="gotoLink(item, index)"
            >
              <div class="fl">
                <img :src="item.img" alt="" />
              </div>
              <div class="fl">
                <span>编号：{{ item.numbering }}</span>
                <span>{{ item.applicationDate }}</span>
              </div>
              <!-- 扣款判断 -->
              <div class="cutPayment fr" v-if="item.costStatus != '2'">
                <!-- 通过 驳回 审核中 -->
                <div class="fr" v-if="item.auditStatus == 1">
                  +{{ item.amount }}
                </div>
                <div class="fr active" v-else-if="item.auditStatus == 2">
                  {{ item.amount }}
                </div>
                <div class="fr review" v-else>审核中</div>
              </div>
              <div class="cutPayment1 fr" v-else>
                <div>-{{ item.amount }}</div>
              </div>
            </div>
          </van-list>
        </div>
      </div>
      <!-- 查询不到数据 -->
      <div class="emptyDraw" v-show="!applyStatus" v-else>
        <van-empty>
          <div>
            所选月份无相关内容,查看更多请<span @click="clickTime()"
              >选择时间</span
            >
          </div>
        </van-empty>
      </div>
      <!-- 骨架屏 -->
      <div class="skeletonDraw" v-show="applyStatus">
        <div
          class="v-skeletonDraw"
          v-for="(item, index) in skeletonList"
          :key="index"
        >
          <van-skeleton
            avatar-size="45px"
            avatar-shape="square"
            avatar
            :row-width="rowWidth"
            :row="2"
          />
          <van-skeleton avatar-shape="square" avatar />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../../../assets/less/my/rechargeWithdraw/rechargeWithdraw.css";
import dateFormats from "../../../assets/js/dateFormat";
import timestampToTimes from "../../../assets/js/timestampToTime";
export default {
  data() {
    return {
      abc: false,
      // 屏幕高度
      H: "",
      //   个人信息
      infoData: {},
      // 切换的文字list
      setText: [
        { text: "余额", isActive: true, status: 0 },
        { text: "提现", isActive: false, status: 1 },
      ],
      // 显示 隐藏 的状态值
      setTextStatus: true,
      // 选择项
      statusList: [
        { text: "全部", isActive: true, status: "99" },
        { text: "审核中", isActive: false, status: "0" },
        { text: "通过", isActive: false, status: "1" },
        { text: "驳回", isActive: false, status: "2" },
        { text: "扣款", isActive: false, status: "2" },
      ],
      //   input过渡时间
      transiTimeVal: "",
      //   input的时间
      timeVal: "",
      //   选择最小时间
      minDate: new Date("2020/01/01"),
      //   最大时间
      maxDate: new Date(),
      //   进去当前时间
      currentDate: new Date(),
      textList: [
        { text: "年", isActive: true },
        { text: "年月", isActive: false },
        { text: "年月日", isActive: false },
      ],
      //   充值金额
      rechargeMoney: "0.00",
      // 提现金额
      withdrawMoney: "0.00",
      // 初始data
      data: {
        amount: 30,
        pages: 1,
        userId: "",
        costStatus: 0,
        auditStatus: 99,
        applicationDate: "",
      },
      //   总数
      total: "",
      // 订单列表
      rechargeList: [],
      list: [],
      // 点击时间弹出层状态值
      timeShow: false,
      //   骨架屏宽度
      rowWidth: ["100%", "100%"],
      //   骨架屏数量
      skeletonList: 8,
      //   骨架屏状态值
      applyStatus: true,
      //   懒加载状态
      listStatus: false,
      //   懒加载结束状态
      finished: false,
      //   请求失败状态
      error: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log("from.path ==>", from.path);
    if (
      from.path == "/consumptionDetail" ||
      from.path == "/recharge" ||
      from.path == "/withdraw"
    ) {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }
    next();
  },
  activated() {
    if (!this.$route.meta.isBack) {
      this.$nextTick(() => {
        //屏幕高度
        this.H = document.documentElement.clientHeight;
        //   处理时间 / 文字选择
        this.getNewTime();
        this.data = {
          amount: 30,
          pages: 1,
          userId: "",
          costStatus: 0,
          auditStatus: 99,
          applicationDate: "",
        };

        if (sessionStorage.getItem("infoData") != null) {
          this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
          this.data.userId = this.infoData.id;
          this.getReWithdrawList(this.data, true);
        }
        //   获取列表
        if (this.$route.query.flag == undefined) {
          this.setTextStatus = true;
          return;
        }
        if (!this.$route.query.flag) {
          this.setText.forEach((e, index) => {
            e.isActive = false;
            if (index == 1) {
              e.isActive = true;
            }
          });
        }
        this.setTextStatus = this.$route.query.flag;
        console.log("this.setTextStatus ==>", this.setTextStatus);
      });
    } else {
      console.log("不重新获取数据!!!");
      this.$route.meta.isBack = false;

      if (this.$route.query.isLoad) {
        this.getReWithdrawList(this.data, true);
      }
    }
  },
  created() {},
  methods: {
    //   返回
    onClickLeft() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "600",
      });
      setTimeout(() => {
        this.$router.push({ name: "My" });
      }, 600);
    },
    // 点击setText
    clickSetText(item, index) {
      // console.log("item.text ==>",item.text)
      // console.log("item.isActive ==>",item.isActive)
      if (item.isActive) {
        return;
      }
      this.setText.forEach((e) => {
        e.isActive = false;
      });
      item.isActive = true;
      this.statusList.forEach((e) => {
        e.isActive = false;
        if (e.text == "全部") {
          e.isActive = true;
        }
      });
      this.textList.forEach((e) => {
        e.isActive = false;
        if (e.text == "年") {
          e.isActive = true;
        }
      });
      // time
      this.transiTime(this.transiTimeVal);
      if (item.text == "余额") {
        this.setTextStatus = true;
        this.refer();
      } else {
        this.setTextStatus = false;
        this.refer();
      }
      console.log("this.setTextStatus ==>", this.setTextStatus);
    },
    // 点击clickStatus
    clickStatus(item, index) {
      if (item.isActive) {
        return;
      }
      this.rechargeList = [];
      this.applyStatus = true;
      this.statusList.forEach((e) => {
        e.isActive = false;
      });
      item.isActive = true;
      this.data.userId = this.infoData.id;
      this.data.amount = 30;
      //   检测为充值还是 提现 00000
      if (item.text == "扣款") {
        this.data.costStatus = Number(item.status);
        this.data.auditStatus = 99;
        console.log("this.data ==>", this.data);
        this.getReWithdrawList(this.data, true);
      } else {
        this.data.auditStatus = Number(item.status);
        this.setText.forEach((e) => {
          if (e.isActive) {
            this.data.costStatus = e.status;
          }
        });
        console.log("this.data ==>", this.data);
        this.getReWithdrawList(this.data, true);
      }
    },
    // 显示年月日文字
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      }
      return val;
    },
    // 点击时间
    clickTime() {
      this.timeShow = true;
    },
    // 点击取消
    cancelTime() {
      this.timeShow = false;
    },
    // 初始化时间 / 文字选择
    getNewTime() {
      this.transiTimeVal = dateFormats.dateFormat(new Date());
      this.transiTime(this.transiTimeVal);

      this.statusList.forEach((e) => {
        e.isActive = false;
        if (e.text == "全部") {
          e.isActive = true;
        }
      });
    },
    // 时间年月|年月日的转换
    transiTime(transiTimeVal) {
      this.textList.forEach((e) => {
        if (e.isActive) {
          if (e.text == "年") {
            this.timeVal = transiTimeVal.substr(0, transiTimeVal.length - 6);
            console.log("this.timeVal ==>", this.timeVal);
          } else if (e.text == "年月") {
            this.timeVal = transiTimeVal.substr(0, transiTimeVal.length - 3);
          } else {
            this.timeVal = transiTimeVal;
          }
        }
      });
      this.data.applicationDate = this.timeVal
        .replace(/年/, "-")
        .replace(/月/, "-")
        .replace(/日/, "");
    },
    // 点击确定的时间
    confirmTime(value) {
      this.timeShow = false;
      this.transiTimeVal = dateFormats.dateFormat(value);
      this.transiTime(this.transiTimeVal);
    },
    // 选择搜索的日期格式
    clickTextSet(item, index) {
      if (item.isActive) {
        return;
      }
      this.textList.forEach((e) => {
        e.isActive = false;
      });
      item.isActive = true;
      //   console.log("this.transiTimeVal ==>",this.transiTimeVal)
      this.transiTime(this.transiTimeVal);
    },
    // 去充值页面
    gotoRecharge() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "600",
      });
      setTimeout(() => {
        this.$router.push({ name: "Recharge" });
      }, 600);
    },
    // 去提现页面
    gotoWithdraw() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "600",
      });
      setTimeout(() => {
        this.$router.push({ name: "Withdraw" });
      }, 600);
    },
    // 查询
    refer() {
      this.rechargeList = [];
      this.applyStatus = true;
      this.data.userId = this.infoData.id;
       this.data.amount = 30;
      this.statusList.forEach((e) => {
        if (e.isActive) {
          if (e.text == "扣款") {
            this.data.costStatus = Number(e.status);
            this.data.auditStatus = 99;
            console.log("this.data ==>", this.data);
            this.getReWithdrawList(this.data, true);
          } else {
            this.data.auditStatus = Number(e.status);
            this.setText.forEach((el) => {
              if (el.isActive) {
                this.data.costStatus = el.status;
              }
            });
            console.log("this.data ==>", this.data);
            this.getReWithdrawList(this.data, true);
          }
        }
      });
    },
    // 获取列表
    getReWithdrawList(data, flag) {
      console.log("获取列表");
      console.log("data ==>", data);
      if (flag) {
        var loading = this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner",
          duration: 0,
        });
      }

      //   data
      this.$axios({
        url: "/sigaoyi/NEWconsumerdetails",
        method: "POST",
        params: data,
      })
        .then((result) => {
          if (flag) {
            this.finished = false;
            loading.clear();
          }
          this.listStatus = false;
          this.applyStatus = false;
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            this.rechargeMoney = 0;
            this.withdrawMoney = 0;
            if (!flag) {
              this.error = false;
              console.log("!!!!!!!!!!!!");
            }
            result.data.finances.forEach((e) => {
              e.applicationDate = timestampToTimes.timestampToTime(
                e.applicationDate
              );
              e.auditDate = timestampToTimes.timestampToTime(e.auditDate);
              e.amount = Number(e.amount.toFixed(2));
              if (result.data.costStatus == "0") {
                // 充值金额
                if (e.auditStatus == 1) {
                  this.rechargeMoney = Number(this.rechargeMoney);
                  this.rechargeMoney += e.amount;
                  this.rechargeMoney = this.rechargeMoney.toFixed(2);
                }
              } else {
                //   提现金额
                if (e.auditStatus == 1) {
                  this.withdrawMoney = Number(this.withdrawMoney);
                  this.withdrawMoney += e.amount;
                  this.withdrawMoney = this.withdrawMoney.toFixed(2);
                }
              }
              if (e.img == "") {
                e.img =
                  "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg";
              }
            });
            this.rechargeList = result.data.finances;
            // 总数
            this.total = result.data.page.total;
          } else {
            if (!flag) {
              this.error = true;
            }
          }
        })
        .catch((err) => {
          this.applyStatus = false;
          if (!flag) {
            this.listStatus = false;
            this.error = true;
          } else {
            loading.clear();
          }
          console.log("err ==>", err);
        });
    },
    //  去消费明细
    gotoLink(item, index) {
      console.log("item ==>", item);
      setTimeout(() => {
        this.$router.push({
          name: "ConsumptionDetail",
          query: { item: JSON.stringify(item) },
        });
      }, 600);
    },
    // 异步拿数据
    onLoad() {
      setTimeout(() => {
        console.log("进入异步拿数据!!!");
        if (this.rechargeList.length >= this.total || this.total <= 7) {
          this.finished = true;
          this.loading = true;
          return;
        }
        this.data.amount += 30;
        this.getReWithdrawList(this.data, false);
      }, 1000);
    },
    // 去统计收入 支出page
    gotoStati() {
      this.$router.push({ name: "StatisMoney" });
    },
  },
};
</script>