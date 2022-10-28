function formatTime() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    const second = new Date().getSeconds();
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n
}


function getDateStr(today, addDayCount) {
    var dd;
    if (today) {
        dd = new Date(today);
    } else {
        dd = new Date();
    }
    dd.setDate(dd.getDate() + addDayCount); //获取AddDayCount天后的日期 
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期 
    var d = dd.getDate();
    if (m < 10) {
        m = '0' + m;
    };
    if (d < 10) {
        d = '0' + d;
    };
    return y + "-" + m + "-" + d;
}

Date.prototype.pattern = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份         
        "d+": this.getDate(), //日         
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
        "H+": this.getHours(), //小时         
        "m+": this.getMinutes(), //分         
        "s+": this.getSeconds(), //秒         
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度         
        "S": this.getMilliseconds() //毫秒         
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

function getMiniTime(time, dateFormat) { //格式:yyyy-MM-dd HH:mm:ss
    if (!time) return time;
    time = time.replace(/-/g, "/");
    if (!dateFormat) dateFormat = "yy-MM-dd HH:mm";
    var d = new Date();
    var h = (d - Date.parse(time)) / 3600 / 1000;
    if (h < 24) {
        if (h >= 1) {
            return Math.floor(h) + "小时前";
        } else {
            return Math.floor(h * 60) > 0 ? (Math.floor(h * 60) + "分钟前") : "刚刚";
        }
    } else {
        return (new Date(time)).pattern(dateFormat);
    }
};

function obj2str(o) {
    var r = [];
    if (typeof o == "string") return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
    if (typeof o == "undefined") return "undefined";
    if (typeof o == "object") {
        if (o === null) return "null";
        else if (!o.sort) {
            for (var i in o)
                r.push("\"" + i + "\"" + ":" + obj2str(o[i]))
            r = "{" + r.join() + "}"
        } else {
            for (var i = 0; i < o.length; i++)
                r.push(obj2str(o[i]))
            r = "[" + r.join() + "]"
        }
        return r;
    }
    return o.toString();
};

function getFileSizeText(b) { //字节
    if (b > 1024) {
        var k = b / 1024;
        if (k > 1024) {
            var m = k / 1024;
            return m.toFixed(2) + "MB";
        }
        return k.toFixed(0) + "KB";
    }
    return b + "B";
}

function extend(source, target) {
    source = source || {};
    if (target && typeof (target) == "object") {
        for (var k in target) {
            source[k] = target[k];
        }
    }
}

function showMessage(msg, title = "提示", callback) {
    uni.showModal({
        title: '提示',
        content: msg,
        showCancel: false,
        success: function (res) {
            if (res.confirm && typeof (callback) == "function") {
                callback();
            }
        }
    });
}
const showLoadingWin = (msg) => {
    uni.showLoading({
        title: msg ? msg : '正在加载中...'
    })
}

const hideLoadingWin = () => {
    uni.hideLoading();
}

function validator() {
    return {
        regExps: {
            phone: new RegExp("^((\\(\\d{2,3}\\))|(\\d{3}\\-))?(\\(0\\d{2,3}\\)|0\\d{2,3}-)?[1-9]\\d{6,7}(\\-\\d{1,4})?$"),
            mobile: new RegExp("^1[3|4|5|7|8]\\d{9}$"),
            postCode: new RegExp("[1-9]\\d{5}(?!\\d)"),
            email: new RegExp("\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*.\\w+([-.]\\w+)*"),
            idCard: new RegExp("(^\\d{15}$)|(^\\d{17}(\\d|X)$)"),
            qq: new RegExp("[1-9]\\d{4,}"),
            ip: new RegExp("((2[0-4]\\d|25[0-5]|[01]?\\d\\d?)\\.){3}(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)"),
            url: new RegExp("((http|ftp|https)://)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(/[a-zA-Z0-9\&%_\./-~-]*)?"),
            html: new RegExp("<(.*)(.*)>.*<\/\\1>|<(.*) \/>"),
            positiveInt: new RegExp("^[1-9]\\d*$|^0$"),
            negativeInt: new RegExp("^\\-[1-9]\\d*$|^0$"),
            int: RegExp("^-?\\d+$"),
            positiveFloat: new RegExp("^[1-9]\\d*(\\.\\d*){0,1}|0\\.\\d*[1-9]\\d*|0?\\.0+|0$"),
            positiveFloat_1: new RegExp("^[1-9]\\d*(\\.\\d{0,1}){0,1}|0\\.\\d*[1-9]\\d{0,1}|0?\\.0{0,1}|0$"),
            positiveFloat_2: new RegExp("^[1-9]\\d*(\\.\\d{0,2}){0,1}|0\\.\\d*[1-9]\\d{0,2}|0?\\.0{0,2}|0$"),
            negativeFloat: new RegExp("^(-([1-9]\\d*(\\.\\d*){0,1}|0\\.\\d*[1-9]\\d*))|0?\\.0+|0$"),
            float: new RegExp("^-?([1-9]\\d*(\\.\\d*){0,1}|0\\.\\d*[1-9]\\d*|0?\\.0+|0)$"),
            number: new RegExp("^[0-9]*$"),
            letter: new RegExp("^[a-zA-Z]+$"),
            chinese: new RegExp("[\u4e00-\u9fa5]"),
            chineseAndChars: new RegExp("[\u3000-\u301e\ufe10-\ufe19\ufe30-\ufe44\ufe50-\ufe6b\uff01-\uffee]"),
            sbc_case: new RegExp("[\uFF00-\uFFEF]"),
            yyyy: new RegExp("^\\d{4}$"),
            yyyy_MM: new RegExp("^\\d{4}-(0[1-9])|(1[0-2])$"),
            yyyy_MM_dd: new RegExp("(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)"),
            dd_MM_yyyy: new RegExp("(((0[1-9]|[12][0-9]|3[01])/((0[13578]|1[02]))|((0[1-9]|[12][0-9]|30)/(0[469]|11))|(0[1-9]|[1][0-9]|2[0-8])/(02))/([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3}))|(29/02/(([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00)))"),
            yyyy_MM_dd_HH_mm: new RegExp("(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29) ([0-1]\\d|2[0-3]):[0-5]\\d"),
            yyyy_MM_dd_HH_mm_ss: new RegExp("(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29) ([0-1]\\d|2[0-3]):[0-5]\\d:[0-5]\\d"),
            HH_mm_ss: new RegExp("^([0-1]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$"),
            HH_mm: new RegExp("^([0-1]\\d|2[0-3]):[0-5]\\d$"),
            password: new RegExp("^(?=.{6,16}$)(?![0-9]+$)(?!.*(.).*\\1)[0-9a-zA-Z_]+$"), //密码(长度6-16位,不能全是数字,不能为同一个字符,只能有数字、字母和下划线)
            illegalChar: new RegExp("[^<>&/|'\]+")
        },
        check: function (checkType, str) {
            if (!this.regExps[checkType]) return false;
            return this.regExps[checkType].test(str);
        }
    };
}

//根据页面编码获取页面对象
function getPageByCode(code) {
    let pages = getCurrentPages();
    for (let i = 0; i < pages.length; i++) {
        if (pages[i]["code"] && pages[i]["code"] == code) {
            return pages[i];
            break;
        }
    }
}

//播放音频
function playAudio(dataUrl) {
    uni.playBackgroundAudio({
        dataUrl: dataUrl,
        title: '',
        coverImgUrl: '',
        complete: function (res) {
            /* that.setData({
               playing: true
             })*/
        }
    })
}

function getCurrentDateStr() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + date.getHours() + seperator2 + date.getMinutes() +
        seperator2 + date.getSeconds();
    return currentdate;
}
/**
 * 从对象中取出指定的若干属性,组成一个新的对象
 * @param {*} obj 对象
 * @param {*} keys 字段集合
 */
function certainFunction(obj, keys) {
    return keys.reduce((result, key) => {
        if (obj.hasOwnProperty(key)) {
            result[key] = obj[key];
        }
        return result;
    }, {});
}


function handle(param) {
    var strlen = param.length;
    if (strlen < 9) {
        return strlen;
    }
    return param.replace(/^(.{6})(?:\d+)(.{4})$/, "$1******$2");
}

// 去掉字符串中所有空格(包括中间空格,需要设置第2个参数为:g)
const trim = (str, is_global) => {
    var result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global && is_global.toLowerCase() == "g") {
        result = result.replace(/\s/g, "");
    };
    return result;
}

//检验数据是否null
const empty = (myValue, defaultValue) => {
    if (typeof (myValue) == 'undefined' || (!myValue && typeof (myValue) != 'undefined' && myValue != 0) || myValue === '' || myValue === null) {
        return defaultValue;
    } else {
        return myValue;
    }
}

//验证字符串是否是数字
const checkNumber = (str) => {
    var reg = /^[0-9]+.?[0-9]*$/;
    if (reg.test(str)) {
        return true;
    }
    return false;
}

/**
 * 
 * @param {*} data  数字 number
 * @param {*} digit 保留几位小数
 */
const formatFloat = (data, digit) => {
    if (isNaN(data)) {
        return 0;
    };
    var m = Math.pow(10, digit);
    var result = Math.round(parseFloat(data) * m, 10) / m;
    return result;
}

/**
 * 
 * @param {*} date yyyy-mm-dd hh24:mi:ss
 * @param {*} dateFormat  对Date的扩展，将 Date 转化为指定格式的String eg: EE/EEE
 */
const getMiniDate = (date, dateFormat) => {
    if (!date) return date;
    date = date.replace(/-/g, "/");
    var d = new Date();
    var d2 = new Date(date);
    if (d.getFullYear() == d2.getFullYear() && d.getMonth() == d2.getMonth()) {
        if (d.getDate() == d2.getDate()) {
            return "今天";
        }
        if (d.getDate() == d2.getDate() - 1) {
            return "明天";
        }
    }
    return d2.pattern("yyyy-MM-dd") + (dateFormat ? "（" + d2.pattern(dateFormat) + "）" : "");
}

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */

Date.prototype.pattern = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    var week = {
        "0": "日",
        "1": "一",
        "2": "二",
        "3": "三",
        "4": "四",
        "5": "五",
        "6": "六"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}


module.exports = {
    obj2str: obj2str,
    handle: handle,
    getMiniTime: getMiniTime,
    extend: extend,
    getFileSizeText: getFileSizeText,
    showMessage: showMessage,
    getPageByCode: getPageByCode,
    playAudio: playAudio,
    getCurrentDateStr: getCurrentDateStr,
    formatTime: formatTime,
    validator: new validator(),
    certainFunction,
    getDateStr,
    trim,
    showLoadingWin,
    hideLoadingWin,
    empty,
    checkNumber,
    formatFloat,
    getMiniDate
}