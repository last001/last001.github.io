<template>
  <div class="echarts">
    <div class="bigBox">
      <el-card>
        <!-- 2、为ECharts准备一个具备大小（宽高）的Dom -->
        <div
          ref="main"
          style="width: 750px; height: 400px; margin-top: 20px"
        ></div>
      </el-card>
      <el-card>
        <div
          id="v-main"
          style="width: 750px; height: 400px; margin-top: 20px"
        ></div>
      </el-card>
    </div>
  </div>
</template>
<script>
// import as echarts from 'echarts'
import * as echarts from "echarts";
import "../assets/less/echarts/echarts.css";
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    // 3、基于准备好的dom，初始化echarts实例
    // var myChart = this.$refs.main
    var myChart = echarts.init(this.$refs.main);
    // 4、准备数据和配置项
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "销量图表",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      xAxis: {
        type: "category",
        // data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        data: [],
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: [
        {
          type: "value",
          min: 0,
          max: 60,
          splitNumber: 10,

          axisLabel: {
            formatter: "{value}",
          },
        },
      ],
      series: [
        {
          name: "销量",
          type: "bar",
          barWidth: 50,
          //   data: [50, 97, 136, 190, 83, 28],
          data: [],
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
    };
    // 5、展示数据
    // 使用刚指定的配置项和数据显示图表。

    myChart.setOption(option);

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
            // { value: 50, name: "衬衫" },
            // { value: 97, name: "羊毛衫" },
            // { value: 136, name: "雪纺衫" },
            // { value: 190, name: "裤子" },
            // { value: 83, name: "高跟鞋" },
            // { value: 30, name: "袜子" },
          ],
          label: {
            show: true,
            formatter: "{b}({c}):{d}%",
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
  methods: {},
};
</script>