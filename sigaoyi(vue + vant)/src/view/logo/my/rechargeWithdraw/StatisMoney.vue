<template>
  <div class="statisMoney">
    <div class="title" ref="title">
      <van-nav-bar left-arrow @click-left="onClickLeft" />
    </div>
    <div class="details" ref="details">
      <div class="text">
        <div
          v-for="(item, index) in textLit"
          :key="index"
          @click="cliclTime(item, index)"
        >
          <span :class="item.isActive ? 'active' : ''">{{ item.text }}</span>
        </div>
      </div>
      <div class="time">
        <span>
          <i @click="clickTime()">{{ timeVal }}</i>
          <van-icon name="arrow-down" @click="clickTime()" />
        </span>
        <span
          v-for="(item, index) in setList"
          :key="index"
          :class="item.isActive ? 'active' : ''"
          @click="clickTextSet(item, index)"
          >{{ item.text }}</span
        >
        <van-action-sheet v-model="timeShow">
          <div class="content">
            <van-datetime-picker
              v-model="currentDate"
              type="year-month"
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
      <div class="total">
        <div class="totalText">共支出/50笔，合计</div>
        <div class="money"><i>￥</i>10133.15</div>
      </div>
    </div>
    <div class="compare" :style="{ height: H + 'px' }">
      <div class="compare-title">{{ echartTitle }}对比</div>
      <div class="echart">
        <div id="main"></div>
      </div>
    </div>
  </div>
</template>
<script>
import "../../../../assets/less/my/rechargeWithdraw/statisMoney/statisMoney.css";
import dateFormats from "../../../../assets/js/dateFormat"
import * as echarts from "echarts";
export default {
  data() {
    return {
      // 屏幕高度
      H: "",
      // textList
      textLit: [
        { text: "月消费", isActive: true },
        { text: "年消费", isActive: false },
      ],
      setList: [
        { text: "支出", isActive: true },
        { text: "收入", isActive: false },
      ],
      // 点击时间弹出层状态值
      timeShow: false,
      //   初始时间
      timeVal: "",
      //   选择最小时间
      minDate: new Date("2020/01/01"),
      //   最大时间
      maxDate: new Date(),
      //   进去当前时间
      currentDate: new Date(),
      echartTitle: "支出",
    };
  },
  created() {
    this.$nextTick(() => {
        this.creatDiv();
    });
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    // 绘制图表
    myChart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      xAxis: {
        type: "category",
        data: ["一月", "二月", "三月", "四月", "五月", "六月"],
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: "#409eff",
          },
        },
      },
      yAxis: [
        {
          type: "value",
          axisLabel: {
            formatter: "{value}",
          },
        },
      ],
      series: [
        {
          name: "销量",
          type: "bar",
          barWidth: 30,
          data: ["50", 97, 136, 190, 83, 30],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 1, color: "#1787f5" },
              { offset: 0.5, color: "#5fabf8" },
              { offset: 0, color: "#81bdf8" },
            ]),
          },
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
          label: {
            show: true,
            position: "top",
            formatter: "￥{c}",
            color: "#409eff",
          },
        },
      ],
    });
  },
  methods: {
    //   初始化时间和echart的高度
    creatDiv() {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      this.timeVal = y + "年" + m + "月";
      this.H =
        document.documentElement.clientHeight -
        this.$refs.details.offsetHeight -
        this.$refs.title.offsetHeight;
      console.log("this.H ==>", this.H);
    },
    //   返回
    onClickLeft() {
      this.$router.back();
    },
    // 点击月|年
    cliclTime(item, index) {
      if (item.isActive) {
        return;
      }
      this.textLit.forEach((e) => {
        e.isActive = false;
      });
      item.isActive = true;
    },
    // 显示年月日文字
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
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
    // 选择搜索的日期格式
    clickTextSet(item, index) {
      if (item.isActive) {
        return;
      }
      this.setList.forEach((e) => {
        e.isActive = false;
      });
      item.isActive = true;
      if (item.text == "支出") {
        this.echartTitle = "支出";
      } else {
        this.echartTitle = "收入";
      }
    },
    // 点击时间弹出层 确定
    confirmTime(currentDate){
        this.currentDate = dateFormats.dateFormat(currentDate);
        this.currentDate = this.currentDate.substr(0, this.currentDate.length - 3);
        this.timeVal = this.currentDate;
         this.timeShow = false;
        console.log("this.currentDate ==>",this.currentDate)
    },
  },
};
</script>