<template>
  <div class="statistics">
    <van-nav-bar
      title="交易统计"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <div class="setNum">
      <div
        class="v-setNum"
        v-for="(item, index) in setNumList"
        :key="index"
        :class="item.isActive ? 'active' : ''"
        @click="clickNum(item, index)"
      >
        {{ item.text }}
      </div>
      <div class="decration" :style="{ left: deLeft + '%' }"></div>
    </div>
    <div class="echart">
      <div id="main"></div>
    </div>
    <div class="v-echart">
      <div id="v-main"></div>
    </div>
  </div>
</template>
<script>
import "../../../assets/less/statistics/statistics.css";
import * as echarts from "echarts";
export default {
  data() {
    return {
      H: "",
      // 选择列表
      setNumList: [
        { text: "今天", isActive: true },
        { text: "7天", isActive: false },
        { text: "30天", isActive: false },
      ],
      //   下划线的left
      deLeft: "11",
    };
  },
  created() {
    this.$nextTick(function () {
      this.H = document.documentElement.clientHeight;
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
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        axisTick: {
          alignWithLabel: true,
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
          data: [50, 97, 136, 190, 83, 30],
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
          },
        },
      ],
    });

    var VmyChart = echarts.init(document.getElementById("v-main"));
    VmyChart.setOption({
      tooltip: {
        trigger: "item",
      },
      legend: {
        // orient: "vertical",
        top: "0%",
        left: "center",
      },
      series: [
        {
          name: "销量",
          type: "pie",
          radius: "60%",
          top: "10%",
          data: [
            { value: 50, name: "衬衫" },
            { value: 97, name: "羊毛衫" },
            { value: 136, name: "雪纺衫" },
            { value: 190, name: "裤子" },
            { value: 83, name: "高跟鞋" },
            { value: 30, name: "袜子" },
          ],
          label: {
            show: true,
            formatter: "{b}:{d}%",
          },
          labelLine: { show: true },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
  },
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
        this.$router.go(-1);
      }, 600);
    },
    // 点击日期
    clickNum(item, index) {
      if (item.isActive) {
        return;
      }
      this.setNumList.forEach((e) => {
        e.isActive = false;
      });
      item.isActive = true;
      if (index == 0) {
        this.deLeft = "11";
      } else if (index == 1) {
        this.deLeft = "44";
      } else {
        this.deLeft = "77";
      }
    },
  },
};
</script>