//判断屏幕是否为全面屏
export default {
  statusHeight: function () {
    function judgeBigScreen() {
      //这里根据返回值 true 或false ,返回true的话 则为全面屏
      var result = false;
      var rate = window.screen.height / window.screen.width;
      var limit = window.screen.height == window.screen.availHeight ? 1.8 : 1.65; // 临界判断值
      // window.screen.height为屏幕高度
      //  window.screen.availHeight 为浏览器 可用高度
      if (rate > limit) {
        result = true;
      }
      return result;
    }
    let statusBarHeight = navigator.userAgent.split('statusHeight/')[1] ? navigator.userAgent.split('statusHeight/')[1] : 60; //statusHeight自定义高度标识
    //安卓全面屏
    if (navigator.userAgent.match(/android/i)) {
      let judgeFullScreen = judgeBigScreen();
      if (judgeFullScreen) {
        statusBarHeight = navigator.userAgent.split('statusHeight/')[1] ? navigator.userAgent.split('statusHeight/')[1] - 25 : 60
      }
    }
    console.log(statusBarHeight);
    return statusBarHeight;
  }
}
