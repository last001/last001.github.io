
/**
 * 验证器
 */
let validator:{regExps:any,idCardValid:Function,check:Function};
validator = {
    regExps:{
        phone: new RegExp("^((\\(\\d{2,3}\\))|(\\d{3}\\-))?(\\(0\\d{2,3}\\)|0\\d{2,3}-)?[1-9]\\d{6,7}(\\-\\d{1,4})?$"),
        mobile: new RegExp("^1[3|4|5|6|7|8|9]\\d{9}$"),
        postCode: new RegExp("[1-9]\\d{5}(?!\\d)"),
        email: new RegExp("\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*.\\w+([-.]\\w+)*"),
        idCard: new RegExp("(^\\d{15}$)|(^\\d{17}(\\d|X)$)"),
        qq: new RegExp("[1-9]\\d{4,}"),
        weixin: new RegExp("^[a-zA-Z\\d_]{5,}$"),
        ip: new RegExp("((2[0-4]\\d|25[0-5]|[01]?\\d\\d?)\\.){3}(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)"),
        url: new RegExp("((http|ftp|https)://)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(/[a-zA-Z0-9\&%_\./-~-]*)?"),
        html: new RegExp("<(.*)(.*)>.*<\/\\1>|<(.*) \/>"),
        positiveInt: new RegExp("^[1-9]\\d*$|^0$"),
        negativeInt: new RegExp("^\\-[1-9]\\d*$|^0$"),
        int: RegExp("^-?\\d+$"),
        positiveFloat: new RegExp("^\\d+(\\.\\d+)?$"),
        positiveFloat_1: new RegExp("^\\d+(\\.\\d{1})?$"),
        positiveFloat_2: new RegExp("^\\d+(\\.\\d{1,2})?$"),
        negativeFloat: new RegExp("^((-\\d+(\\.\\d+)?)|(0+(\\.0+)?))$"),
        negativeFloat_1: new RegExp("^((-\\d+(\\.\\d{1})?)|(0+(\\.0+)?))$"),
        negativeFloat_2: new RegExp("^((-\\d+(\\.\\d{1,2})?)|(0+(\\.0+)?))$"),
        float: new RegExp("^(-?\\d+)(\\.\\d+)?$"),
        float_1: new RegExp("^(-?\\d+)(\\.\\d{1})?$"),
        float_2: new RegExp("^(-?\\d+)(\\.\\d{1,2})?$"),
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
        password: new RegExp("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_\\W]{8,20}$"),//字母、数字或者英文符号，8-20位，不能全为字母或数字
        illegalChar: new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
    },
    idCardValid:function(code:any) {
        //身份证号合法性验证
        //支持15位和18位身份证号
        //支持地址编码、出生日期、校验位验证
        const city:any = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外 "
        };
        let row = {
            'pass': true,
            'msg': '验证成功'
        };
        if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(code)) {
            row = {
                'pass': false,
                'msg': '身份证号格式错误'
            };
        } else if (!city[code.substr(0, 2)]) {
            row = {
                'pass': false,
                'msg': '身份证号地址编码错误'
            };
        } else {
            //18位身份证需要验证最后一位校验位
            if (code.length == 18) {
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                let sum = 0;
                let ai = 0;
                let wi = 0;
                for (let i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                if (parity[sum % 11] != code[17].toUpperCase()) {
                    row = {
                        'pass': false,
                        'msg': '身份证号校验位错误'
                    };
                }
            }
        }
        return row;
    },
    check: function(checkType:any, str:any){
        if (!this.regExps[checkType]) return false;
        let result = this.regExps[checkType].test(str);
        if(result && checkType == "idCard") {
            result = this.idCardValid(str).pass;
        }
        return result;
    }
}
/**
 * 浏览器属性
 */
const browser = function(){
    const options:any = {
        mozilla:false,
        webkit:false,
        opera:false,
        safari:false,
        chrome:false,
        msie:false,
        android:false,
        blackberry:false,
        ios:false,
        operaMobile:false,
        windowsMobile:false,
        mobile:false,
        ua:null,
        name:null,
        fullVersion:null,
        majorVersion:null,
        version:null
    }

    var nAgt = navigator.userAgent;
    options.ua = nAgt;

    options.name  = navigator.appName;
    options.fullVersion  = ''+parseFloat(navigator.appVersion);
    options.majorVersion = parseInt(navigator.appVersion,10);
    var nameOffset,verOffset,ix;

    // In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
        options.opera = true;
        options.name = "Opera";
        options.fullVersion = nAgt.substring(verOffset+6);
        if ((verOffset=nAgt.indexOf("Version"))!=-1)
            options.fullVersion = nAgt.substring(verOffset+8);
    }

    // In MSIE < 11, the true version is after "MSIE" in userAgent
    else if ( (verOffset=nAgt.indexOf("MSIE"))!=-1) {
        options.msie = true;
        options.name = "Microsoft Internet Explorer";
        options.fullVersion = nAgt.substring(verOffset+5);
    }

    // In TRIDENT (IE11) => 11, the true version is after "rv:" in userAgent
    else if (nAgt.indexOf("Trident")!=-1 ) {
        options.msie = true;
        options.name = "Microsoft Internet Explorer";
        var start = nAgt.indexOf("rv:")+3;
        var end = start+4;
        options.fullVersion = nAgt.substring(start,end);
    }

    // In Chrome, the true version is after "Chrome"
    else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
        options.webkit = true;
        options.chrome = true;
        options.name = "Chrome";
        options.fullVersion = nAgt.substring(verOffset+7);
    }
    // In Safari, the true version is after "Safari" or after "Version"
    else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
        options.webkit = true;
        options.safari = true;
        options.name = "Safari";
        options.fullVersion = nAgt.substring(verOffset+7);
        if ((verOffset=nAgt.indexOf("Version"))!=-1)
            options.fullVersion = nAgt.substring(verOffset+8);
    }
    // In Safari, the true version is after "Safari" or after "Version"
    else if ((verOffset=nAgt.indexOf("AppleWebkit"))!=-1) {
        options.webkit = true;
        options.name = "Safari";
        options.fullVersion = nAgt.substring(verOffset+7);
        if ((verOffset=nAgt.indexOf("Version"))!=-1)
            options.fullVersion = nAgt.substring(verOffset+8);
    }
    // In Firefox, the true version is after "Firefox"
    else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
        options.mozilla = true;
        options.name = "Firefox";
        options.fullVersion = nAgt.substring(verOffset+8);
    }
    // In most other browsers, "name/version" is at the end of userAgent
    else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) ){
        options.name = nAgt.substring(nameOffset,verOffset);
        options.fullVersion = nAgt.substring(verOffset+1);
        if (options.name.toLowerCase()==options.name.toUpperCase()) {
            options.name = navigator.appName;
        }
    }
    /*Check all mobile environments*/
    options.android = (/Android/i).test(nAgt);
    options.blackberry = (/BlackBerry/i).test(nAgt);
    options.ios = (/iPhone|iPad|iPod/i).test(nAgt);
    options.operaMobile = (/Opera Mini/i).test(nAgt);
    options.windowsMobile = (/IEMobile/i).test(nAgt);
    options.mobile = options.android || options.blackberry || options.ios || options.windowsMobile || options.operaMobile;

    // trim the fullVersion string at semicolon/space if present
    if ((ix=options.fullVersion.indexOf(";"))!=-1)
        options.fullVersion=options.fullVersion.substring(0,ix);
    if ((ix=options.fullVersion.indexOf(" "))!=-1)
        options.fullVersion=options.fullVersion.substring(0,ix);

    options.majorVersion = parseInt(''+options.fullVersion,10);
    if (isNaN(options.majorVersion)) {
        options.fullVersion  = ''+parseFloat(navigator.appVersion);
        options.majorVersion = parseInt(navigator.appVersion,10);
    }
    options.version = options.majorVersion;

    return options;
}

/**
 * 深拷贝函数
 * @param value     要拷贝的目标
 * @param maxDeep   拷贝的深度限制，如果拷贝时深度超过了这个限制，将直接抛出错误
 */
const deepClone = function(value: any, maxDeep = 10) {
    if (maxDeep < 0) throw new Error('deepClone Error: deep is exceed maxDeep');
    if (!value) return value;
    switch (typeof value) {
        case "object":
            if (value instanceof Map) {
                const map = new Map();
                for (let [_key, _value] of value) {
                    map.set(_key, deepClone(_value, maxDeep - 1));
                }
                return map as any;
            }
            if (value instanceof Set) {
                const set = new Set();
                for (let valueElement of value) {
                    set.add(deepClone(valueElement, maxDeep - 1));
                }
                return set as any;
            }
            if (value instanceof Array) {
                const array = Array(value.length);
                for (let i = 0; i < value.length; i++) {
                    array[i] = deepClone(value[i], maxDeep - 1);
                }
                return array as any
            }
            // 其它类型均当做普通对象处理
            const object: Record<string, any> = {}
            for (let key of Object.keys(value)) {
                object[key] = deepClone(value[key], maxDeep - 1);
            }
            return object as any
        case "function":
            console.warn('deepClone warn: 不支持 function 类型对象的 deep clone');
            return undefined;
        case "bigint":
            console.warn('deepClone warn: 不支持 bigint 类型的 deep clone');
            return undefined;
        case "symbol":
            console.warn('deepClone warn: 不支持 symbol 类型的 deep clone');
            return undefined;
        default:
            return value;
    }
}

const generateGuid = function(len:number){
    let g = "";
    let i:number = len||32;
    while(i--){
        g += Math.floor(Math.random() * 16.0).toString(16);
    }
    return g;
};


export default {
    validator,
    browser:browser(),
    deepClone,
    generateGuid
}
