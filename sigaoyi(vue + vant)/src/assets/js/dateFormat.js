export default {
    dateFormat:function(times) {
        let date = new Date(times);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        let d = date.getDate();
        d = d < 10 ? "0" + d : d;
        let time = y + "年" + m + "月" + d + "日";
        return time;
    }
}