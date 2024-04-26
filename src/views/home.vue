<template>
    <div class="home">
        <el-container>
            <Aside></Aside>
            <el-container :class="isCollapse ? 'collapse' : 'expand'">
                <el-header>
                    <Header1 :setOptionEcharts="setOptionEcharts"></Header1>
                </el-header>
                <el-main style="background-color: var(--el-bg-color-page);">
                    <div class="bg-white br-2 ph-15">
                        <div class="ds-fx ai-c pt-10">
                            <div class="mr-15 bold pv-10 fs-20">数据统计</div>
                            <el-date-picker v-model="options.date" type="date" placeholder="Pick a day" />
                        </div>
                        <div class="ds-fx ai-c pb-15">
                            <div class="fx-size-1 fx-d-cloumn jc-sb pr-10" :class="index > 0 ? 'pl-15' : ''"
                                :style="{ borderRight: index == (options.list.length - 1) ? '' : '1px solid var(--el-border-color-light)' }"
                                v-for="(item, index) in options.list" :key="index">
                                <div class="pv-5 c-666 ds-fx jc-sb ai-s">
                                    <div>{{ item.name }}</div>
                                    <el-tooltip class="box-item" effect="dark" content="Bottom prompts info"
                                        placement="bottom">
                                        <el-icon class="pointer">
                                            <QuestionFilled />
                                        </el-icon>
                                    </el-tooltip>
                                </div>
                                <div class="ds-fx ai-e">
                                    <span class="bold fs-26 mr-10" style="margin-bottom: -8px;">{{ item.num }}</span>
                                    <div class="ds-fx ai-c">
                                        <span class="c-999">日评比</span>
                                        <el-icon color="red" v-if="item.direction == 'up'">
                                            <Top />
                                        </el-icon>
                                        <el-icon color="green" v-else>
                                            <Bottom />
                                        </el-icon>
                                        <span :style="{ color: item.direction == 'up' ? 'red' : 'green' }">{{
                item.floatNum }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white mt-15 p-15 br-2">
                        <div class="ds-fx ai-c b-b-info box-sizing">
                            <div class="mr-40 pb-15 pointer"
                                :class="item.isActive ? 'c-primary b-b-2-primary bold' : ''"
                                v-for="(item, index) in options.setionTitleData" :key="index"
                                @click="handler('switchTitle', item)">{{ item.name }}</div>
                        </div>
                        <div class="ds-fx w-full mt-10">
                            <div class="fx-d-cloumn fx-size-1 h-280">
                                <div class="ds-fx bg-page p-5 br-1 w-120 ps-r">
                                    <div class="weekMonth transition-3 fx-size-1 text-center pointer bold br-1 zi-9"
                                        :class="item.isActive ? 'c-primary' : ''"
                                        v-for="(item, index) in options.weekMonthData" :key="index"
                                        @click="handler('switchWeekMonth', item)">
                                        {{ item.name }}
                                    </div>
                                    <div class="active"
                                        :style="options.weekMonthVal == 'week' ? 'left:5px' : 'left:50%'"></div>
                                </div>
                                <div class="h-full EcharRef_line" ref="EcharRef_line"></div>
                            </div>
                            <div class="w-500">
                                <div class="bold fs-15">排行榜</div>
                                <div class="w-200 mt-5">
                                    <WOswitch :modelData="options.rangkingTitleData" :initialIndex="0"
                                        v-model="options.rangkingValue"></WOswitch>
                                </div>
                                <div class="mt-15">
                                    <div class="ds-fx ai-c jc-sb mt-8" v-for="(item, index) in options.rangkingData"
                                        :key="index">
                                        <div class="ds-fx ai-c">
                                            <div class="mr-35 wh-25 text-center br-circle"
                                                :class="index < 3 ? 'c-primary bg-primary-8' : 'bg-fill'">{{ index + 1
                                                }}</div>
                                            <div class="rankingName pointer">{{ item.name }}</div>
                                        </div>
                                        <div>{{ item.value }}单</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ds-fx br-2 mt-15">
                        <div class="bg-white p-15 fx-size-1">
                            <div class="ds-fx ai-c jc-sb">
                                <div class="bold fs-15">安装时段分布</div>
                                <el-date-picker v-model="options.date1" format="YYYY-MM" type="date"
                                    placeholder="Pick a day" />
                            </div>
                            <div class="w-full h-250 EcharRef_bar" ref="EcharRef_bar"></div>
                        </div>
                        <div class="w-450 bg-white ml-15">
                            <div class="p-15">
                                <div class="ds-fx ai-c jc-sb">
                                    <div class="bold fs-15">改约情况</div>
                                    <el-date-picker v-model="options.date2" size="" type="date"
                                        placeholder="Pick a day" />
                                </div>
                                <div class="ds-fx ai-c w-full mt-8">
                                    <div class="fx-d-cloumn ai-c fx-size-1"
                                        :style="{ borderRight: index == (options.reschedulingTitleData.length - 1) ? '' : '1px solid var(--el-border-color-light)' }"
                                        v-for="(item, index) in options.reschedulingTitleData" :key="index">
                                        <div class="bold ds-fx ai-c" :style="{ color: item.isDown ? 'green' : '' }">
                                            <el-icon color="green" v-show="item.isDown">
                                                <Bottom />
                                            </el-icon>
                                            <div>{{ item.value }}</div>
                                        </div>
                                        <div class="mt-5 c-999">{{ item.name }}</div>
                                    </div>
                                </div>
                                <div class="w-full ps-r">
                                    <div class="h-200" ref="EcharRef_pie"></div>
                                    <div class="ds-fx ai-c ps-a fs-12 bold" style="left:calc(50% + 3em);top:15px;">
                                        <div>类型</div>
                                        <div style="margin:0 20px 0 55px ">数量</div>
                                        <div>占比</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup lang="ts">
import { nextTick, reactive, ref, computed, watch } from "vue";
import utils from "@/utils/utils";
import { useStore } from "vuex";
import * as echarts from "echarts";
import WOswitch from "@/components/WOswitch.vue";

const isCollapse = computed(() => {
    return store.state.isCollapse;
})

const store = useStore();
const EcharRef_line = ref(null);
const EcharRef_bar = ref(null);
const EcharRef_pie = ref(null);

const options = reactive({
    date: utils.getAroundDate(),
    date1: utils.getAroundDate(),
    date2: utils.getAroundDate(),
    list: [
        { name: "数据总量", num: "716", direction: "up", floatNum: "61" },
        { name: "进行中数量", num: "289", direction: "down", floatNum: "23" },
        { name: "已完成数量", num: "347", direction: "up", floatNum: "3" },
        { name: "已取消数量", num: "25", direction: "up", floatNum: "7" },
        { name: "逃单记录", num: "49", direction: "down", floatNum: "25" },
        { name: "改约记录", num: "8", direction: "up", floatNum: "46" },
    ],
    setionTitleData: [
        { name: "安装完成", isActive: true },
        { name: "退回数量", isActive: false },
        { name: "取消数量", isActive: false },
    ],
    weekMonthVal: "week",
    weekMonthData: [
        { name: '周', value: "week", isActive: true },
        { name: '月', value: "month", isActive: false },
    ],
    rangkingValue: "team",
    rangkingTitleData: [
        { name: '团队', value: "team", isActive: true },
        { name: '个人', value: "person", isActive: false },
    ],
    rangkingData: [
        { name: '浙江省杭州市-周宏杰团队', value: "547", isActive: true },
        { name: '上海市-刘房军团队', value: "534", isActive: false },
        { name: '陕西省一张建华团队', value: "468", isActive: false },
        { name: '浙江省宁波市-王家兴团队', value: "429", isActive: false },
        { name: '江苏省南京市天城区-孙国伟团认', value: "312", isActive: false },
        { name: '江苏省南通市-张华团队', value: "307", isActive: false },
    ],
    reschedulingTitleData: [
        { name: "今日改约数", value: 428, isDown: false },
        { name: "昨日改约数", value: 441, isDown: false },
        { name: "日环比", value: 13, isDown: true },
    ],
    reschedulingData: [
        { name: "日环比", value: 1302, percent: "45%" },
        { name: "日环比", value: 356, percent: "25%" },
        { name: "日环比", value: 256, percent: "13%" },
        { name: "日环比", value: 201, percent: "10%" },
        { name: "日环比", value: 56, percent: "7%" },
    ],
    echartsLineData: <any>{
        grid: {
            left: "3.5%",
            right: "3%",
            top: '10%',
            bottom: "10%"
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
        },
        yAxis: {
            type: 'value'
        },
        tooltip: {
            show: true,
            trigger: "axis",
            formatter: function (pt: any) {
                return `<b>${utils.getAroundDate().slice(0, 5)}${pt[0].name}</b><br>
               <div class="box"><div id="dot"></div><div style="margin-right:30px;">工单完成量</div> ${pt[0].data}单</div>
               `;
            },
        },
        series: [
            {
                data: [100, 150, 201, 196, 350, 400, 350, 300, 420, 450, 500, 600, 580, 760, 800, 750, 700, 650, 500, 600, 750, 800, 850, 900, 950, 850, 800, 750, 769],
                type: 'line',
                showSymbol: false,
                itemStyle: {
                    color: store.state.themes.textColor,
                },
                areaStyle: {
                    // color: store.state.themes.textColor,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: store.state.themes.textColor
                    }, {
                        offset: 1,
                        color: utils.lightenDarkenColor(store.state.themes.textColor, 90)
                    }])
                },
                smooth: true,
            }
        ]
    },
    echartsBarData: <any>{
        grid: {
            left: "3.5%",
            right: "0%",
            top: '10%',
            bottom: "8%"
        },
        xAxis: {
            type: 'category',
            // boundaryGap: false,
            data: [],
        },
        yAxis: {
            type: 'value'
        },
        tooltip: {
            show: true,
            trigger: "axis",
            axisPointer: {
                type: 'shadow',
                // shadowStyle:{
                //     color:
                // }
            },
            formatter: function (pt: any) {
                return `<b>${options.date1}</b><br>
                <div class="ds-fx ai-c"><div id="dot"></div>安装时间：<b>${pt[0].name}</b></div>
                <div class="ds-fx ai-c"><div id="dot"></div>安装单数：<b>${pt[0].value}</b></div>`
            }
        },
        series: [
            {
                data: [100, 150, 201, 196, 350, 400, 350, 300, 420, 450, 700, 650, 400, 500, 600, 750, 800, 850, 900, 950, 850, 800, 750, 769],
                type: 'bar',
                itemStyle: {
                    color: store.state.themes.textColor,
                },
                barWidth: "50%"
            }
        ]
    },
    echartsPieData: {
        legend: {
            show: true,
            orient: "vertical",
            left: "50%",
            top: "20%",
            data: [
                { value: 1548, name: '搜索引擎', colorIdx: 0, itemStyle: { color: store.state.themes.textColor } },
                { value: 335, name: '直达', colorIdx: 3, itemStyle: { color: store.state.themes.textColor_3 } },
                { value: 310, name: '邮件营销', colorIdx: 5, itemStyle: { color: store.state.themes.textColor_5 } },
                { value: 234, name: '联盟广告', colorIdx: 7, itemStyle: { color: store.state.themes.textColor_7 } },
                { value: 135, name: '视频广告', colorIdx: 9, itemStyle: { color: store.state.themes.textColor_8 } },
            ],
            formatter: (name: any) => {
                let total = 0
                let target: any;
                let dataList = [
                    { value: 135, name: '视频广告' },
                    { value: 234, name: '联盟广告' },
                    { value: 310, name: '邮件营销' },
                    { value: 335, name: '直达' },
                    { value: 1548, name: '搜索引擎' },
                ]
                const value = dataList.filter(x => x.name == name)[0].value
                for (let i = 0, l = dataList.length; i < l; i++) {
                    total += dataList[i].value
                    if (dataList[i].name == name) {
                        target = dataList[i].value
                    }
                }
                const arr = [
                    '{name|' + name +
                    '}{value|' + value +
                    '}{percentage|' + ((target / total) * 100).toFixed(2) + '%}'
                ]
                return arr.join('\n')
            },
            textStyle: {
                rich: {
                    name: {
                        align: 'left',
                        width: 100,
                        color: "#666",
                    },
                    value: {
                        align: 'right',
                        padding: [0, 20, 0, -20],
                        color: "#666",
                    },
                    percentage: {
                        align: 'right',
                        color: "#666",
                    }
                }
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function (pt: any) {
                return `${options.date2}\n 
                <div class="ds-fx ai-c"><div id="dot"></div>改约数量：<b>${pt.value}</b></div>
                <div class="ds-fx ai-c"><div id="dot"></div>改约占比：<b>${pt.percent}%</b></div>`
            }
        },
        series: [
            {
                name: "2024-01-02",
                type: 'pie',
                radius: ['65%', '80%'],
                center: ['25%', '50%'],
                labelLine: {
                    show: false
                },
                label: {
                    show: true,
                    position: 'center',
                    color: '#4c4a4a',
                    formatter: '{active|改约总数}' + '\n\r\r\n' + '{total|' + 1567 + '}',
                    rich: {
                        total: {
                            fontSize: 35,
                            fontFamily: "微软雅黑",
                            color: '#454c5c',
                            fontWeight: "bold",
                            marginTop: "15px"
                        },
                        active: {
                            fontFamily: "微软雅黑",
                            fontSize: 16,
                            lineHeight: 30,
                        },
                    }
                },
                emphasis: {
                    scaleSize: 12
                },
                data: [
                    { value: 135, name: '视频广告', colorIdx: 8, itemStyle: { color: store.state.themes.textColor_8 } },
                    { value: 234, name: '联盟广告', colorIdx: 7, itemStyle: { color: store.state.themes.textColor_7 } },
                    { value: 310, name: '邮件营销', colorIdx: 5, itemStyle: { color: store.state.themes.textColor_5 } },
                    { value: 335, name: '直达', colorIdx: 3, itemStyle: { color: store.state.themes.textColor_3 } },
                    { value: 1548, name: '搜索引擎', colorIdx: 0, itemStyle: { color: store.state.themes.textColor } },
                ]
            }
        ]
    }
})

const handler = (command: string, data?: any) => {
    switch (command) {
        case "switchTitle":
            if (data.isActive) return;
            options.setionTitleData.forEach((v: any) => {
                v.isActive = false;
            })
            data.isActive = true;
            break;
        case "switchWeekMonth":
            if (data.isActive) return;
            options.weekMonthData.forEach((v: any) => {
                v.isActive = false;
            })
            data.isActive = true;
            options.weekMonthVal = data.value;
            break;
        default:
            break;
    }
}

/**
 * @function getDuration 获取当月最后一天
 * @param date {string} 时间
 * @returns {number} 返回当月最后一天日期
 */
const getDuration = (date: string): number => {
    let dt = new Date(date)
    var month = dt.getMonth()
    dt.setMonth(dt.getMonth() + 1)
    dt.setDate(0);
    return dt.getDate()
}

/**
 * @function 获取Echarts x 轴(当月日期)
 */
const getObtainData = () => {
    const lastDay = getDuration(utils.getAroundDate());
    for (let i = 1; i < lastDay; i++) {
        options.echartsLineData.xAxis.data.push(`${utils.getAroundDate().slice(5, 7)}-${i < 10 ? '0' + i : i}`)
    }
}

/**
 * @getTimeData 获取Echarts x 轴(时间段)
 */
const getTimeData = () => {
    for (let i = 0; i < 24; i++) {
        options.echartsBarData.xAxis.data.push(`${i < 10 ? '0' + i : i}:00`)
    }
}

/**
 * @function setOptionsThemesColor 重新设置Ecahrts color
 */
const setOptionsThemesColor = () => {
    options.echartsLineData.series[0].itemStyle.color = store.state.themes.textColor;
    options.echartsLineData.series[0].areaStyle.color.colorStops[0].color = store.state.themes.textColor;
    options.echartsLineData.series[0].areaStyle.color.colorStops[1].color = utils.lightenDarkenColor(store.state.themes.textColor, 90);

    options.echartsBarData.series[0].itemStyle.color = store.state.themes.textColor;

    options.echartsPieData.legend.data.forEach((el: any) => {
        el.itemStyle.color = store.state.themes[`textColor${el.colorIdx > 0 ? '_' + el.colorIdx : ''}`];
    });
    options.echartsPieData.series[0].data.forEach((el: any) => {
        el.itemStyle.color = store.state.themes[`textColor${el.colorIdx > 0 ? '_' + el.colorIdx : ''}`];
    })
}

/**
 * @function setOptionEcharts 重新加载Echarts
 */
const setOptionEcharts = () => {
    nextTick(() => {
        echarts.init(EcharRef_line.value)?.clear();
        echarts.init(EcharRef_bar.value)?.clear();
        echarts.init(EcharRef_pie.value)?.clear();
        setOptionsThemesColor();
        echarts.init(EcharRef_line.value).setOption(options.echartsLineData);
        echarts.init(EcharRef_bar.value).setOption(options.echartsBarData);
        echarts.init(EcharRef_pie.value).setOption(options.echartsPieData);
    })
}

watch(isCollapse,(newVal) =>{
    setTimeout(() => {
        echarts.init(EcharRef_line.value).resize();
        echarts.init(EcharRef_bar.value).resize();
        echarts.init(EcharRef_pie.value).resize();
    }, 500);
})


const init = () => {
    getObtainData();
    getTimeData();
    setOptionEcharts();
}

init();

</script>
<style lang='scss' scoped>
.el-header {
    --el-header-padding: 0;
}

:deep(.box) {
    display: flex;
    align-items: center;
}

:deep(#dot) {
    width: 10px !important;
    height: 10px !important;
    border-radius: 50%;
    margin-right: 5px;
    background-color: var(--el-color-primary);
}

.mt-8{
    margin-top:8px;
}

.w-120 {
    width: 120px;
}

.wh-25 {
    width: 25px;
    height: 25px;
}

.weekMonth+.active {
    display: block;
    position: absolute;
    top: 5px;
    width: calc(50% - 5px);
    height: calc(100% - 10px);
    background-color: #FFF;
    transition: all .3s;
}

.rankingName:hover {
    color: var(--el-color-primary);
    text-decoration: underline;
}


:deep(.EcharRef_line) {
    div:first-child {
        width: 100% !important;
    }

    canvas {
        width: 100% !important;
    }

    #dot {
        width:10px  !important;
    }
}

:deep(.EcharRef_bar) {
    div:first-child{
        width: 100% !important;
    }
    canvas {
        width: 100% !important;
    }
    
    #dot {
        width:10px  !important;
    }
}
</style>