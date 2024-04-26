import { computed, nextTick } from "vue";
import { useStore } from 'vuex';
/**
 * @function setThemes 设置注意颜色
 * @param color 主题颜色 
 */
function setThemes(color: string, store?: any) {
    store = store ? store : useStore();
    let domStyle = document.documentElement.style;
    domStyle.setProperty("--el-color-primary", color);
    domStyle.setProperty("--el-color-primary-light-3", lightenDarkenColor(color, 30));
    domStyle.setProperty("--el-color-primary-light-5", lightenDarkenColor(color, 50));
    domStyle.setProperty("--el-color-primary-light-7", lightenDarkenColor(color, 70));
    domStyle.setProperty("--el-color-primary-light-8", lightenDarkenColor(color, 80));
    domStyle.setProperty("--el-color-primary-light-9", lightenDarkenColor(color, 90));
    domStyle.setProperty("--el-color-primary-dark-2", lightenDarkenColor(color, -20));
    store.commit("setTextColor", color);
    store.commit("setTextColor_3", lightenDarkenColor(color, 30));
    store.commit("setTextColor_5", lightenDarkenColor(color, 50));
    store.commit("setTextColor_7", lightenDarkenColor(color, 70));
    store.commit("setTextColor_8", lightenDarkenColor(color, 80));
    store.commit("setTextColor_9", lightenDarkenColor(color, 90));
}

/**
 * @function getThemes 获取主题色
 * @returns 返回主题颜色
 */
function getThemes(store?: any): string {
    store = store ? store : useStore();
    const storeData: any = sessionStorage.getItem("store");
    const textColor = computed(() => {
        return store.state.themes.textColor || (storeData && JSON.parse(storeData).themes.textColor) || "#008000";
    })
    return textColor.value;
}

/**
 * @description: 调整颜色更亮更暗
 * @param {string} color 16进制颜色
 * @param {number} range 正负数决定颜色更改（-100至100） 正：浅 负：暗
 * @return {string} new color
 */
function lightenDarkenColor(color:string, range:number) {
    let num = parseInt(color.slice(1), 16);
    let r = (num >> 16) + range * 2.61;
    let b = ((num >> 8) & 0x00FF) + range * 2.61;
    let g = (num & 0x0000FF) + range * 2.61;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return '#' + (g | (b << 8) | (r << 16)).toString(16);
}

/**
 * @function getAroundDate 获取当前日期 前 后 几天
 * @param {number} count 当前日期前几后几天 
 * @param {any} time 传入时间 
 * @returns {string} 字符串 
 */
const getAroundDate = (count: number = 0, time: any = Date.now()): string => {
	let date: any = "";
	let d: any = new Date(time);
	date = Date.parse(d) + count * 24 * 60 * 60 * 1000;
	let Y = new Date(date).getFullYear();
	let M = (new Date(date).getMonth() + 1 < 10 ? "0" + (new Date(date).getMonth() + 1) : new Date(date).getMonth() + 1);
	let D = (new Date(date).getDate() < 10 ? '0' + new Date(date).getDate() : new Date(date).getDate());
	return `${Y}-${M}-${D}`;
}

export default {
    setThemes,
    getThemes,
    lightenDarkenColor,
    getAroundDate
}