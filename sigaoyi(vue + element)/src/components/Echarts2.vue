<template>
  <div class="echarts">
    <div class="bigBox">
      <!--面包屑导航区-->
      <!-- <el-breadcrumb separator="/">
        <el-breadcrumb-item @click="abc">销售额</el-breadcrumb-item>
        <el-breadcrumb-item>销量</el-breadcrumb-item>
      </el-breadcrumb> -->
      <!--卡片视图区域-->
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
    var myChart = echarts.init(this.$refs.main, "light");
    // 4、准备数据和配置项
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "销售额图表",
      },
      tooltip: {},
      legend: {
        data: ["销售额"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子", "衣服", "泳衣"],
        // data: [],
      },
      yAxis: [
        {
          type: "value",
          min: 0,
          max: 60,
          splitNumber: 10,
        },
      ],
      series: [
        {
          name: "销售额",
          type: "bar",
           label: {
                show: true,
                position: 'top',
                color:"444",
            },
          data: [
            {
              value: 38,
              itemStyle: {
                color: "#DA251D",
              },
            },
            {
              value: 58,
              itemStyle: {
                color: "#E67716",
              },
            },
            {
              value: 36,
              itemStyle: {
                color: "#E67566",
              },
            },
            {
              value: 34,
              itemStyle: {
                color: "#32585a",
              },
            },
            {
              value: 30,
              itemStyle: {
                color: "#E65916",
              },
            },
            {
              value: 35,
              itemStyle: {
                color: "#11440f",
              },
            },
            {
              value: 20,
              itemStyle: {
                color: "#00ff77",
              },
            },
            {
              value: 8,
              itemStyle: {
                color: "#666",
              },
            },
          ],
          barWidth: 40,
          barCategoryGap: "80%",
        },
      ],
    };
    // 5、展示数据
    // 使用刚指定的配置项和数据显示图表。
    // console.log(myChart)
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
            { value: 50, name: "衬衫" },
            { value: 97, name: "羊毛衫" },
            { value: 136, name: "雪纺衫" },
            { value: 190, name: "裤子" },
            { value: 83, name: "高跟鞋" },
            { value: 30, name: "袜子" },
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
  methods: {
    abc() {
      console.log(111111111);
    },
  },
};
</script>