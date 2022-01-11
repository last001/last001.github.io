import store from '@/store/index.js';
import API from '@/api/http.js';
// webScoket
let websock = {}; //建立的连接
let lockReconnect = false; //是否真正建立连接
let timeout = 60 * 1000; // 1分钟一次心跳
let timeoutObj = null; //心跳心跳倒计时
let serverTimeoutObj = null; //心跳倒计时
let timeoutnum = null; //断开 重连倒计时

// 一进入就加载
initWebSocket();

// 初始化weosocket
function initWebSocket() {
  let user = localStorage.getItem('user');
  if (user !== '' && user !== undefined) { // 在用户未登录的情况下不进行连接
    // 建立连接
    websock = new WebSocket ('');
    // 连接成功
    websock.onopen = websocketonopen;
    // 连接错误
    websock.onerror = websocketonerror;
    // 连接关闭
    websock.onclose = websocketclose;
    // 接收信息
    websock.onmessage = websocketonmessage;
  } else {
    //清除时间
    clearTimeout(timeoutObj);
    clearTimeout(serverTimeoutObj);
  }
}

// 重新连接
function reconnect() {
  if (lockReconnect) {
    return;
  }
  lockReconnect = true;
  // 没连接上会一直重连，设置延迟避免请求过多
  timeoutnum && clearTimeout(timeoutnum);
  timeoutnum = setTimeout(function() {
    // 新连接
    initWebSocket();
    lockReconnect = false;
  }, 5000);
}

//重置心跳
function reset() {
  //清除时间
  clearTimeout(timeoutObj);
  clearTimeout(serverTimeoutObj);
  //重启心跳
  let user = localStorage.getItem('qrtMallUser');
  if (!meetNull(user)) {
    console.log('退出了登录,不需要重连');
    return;
  }
  start();
}

//开启心跳
function start() {
  timeoutObj && clearTimeout(timeoutObj);
  serverTimeoutObj && clearTimeout(serverTimeoutObj);
  timeoutObj = setTimeout(() => {
    //这里发送一个心跳，后端收到后，返回一个心跳消息，
    if (websock.readyState == 1) {
      //如果连接正常
      websock.send("heartCheck");
    } else {
      //否则重连
      reconnect();
    }
    serverTimeoutObj = setTimeout(() => {
      //超时关闭
      websock.close();
    }, timeout);
  }, timeout);
}

//连接成功事件
function websocketonopen() {
  //开启心跳
  start();
}

//连接失败事件
function websocketonerror(e) {
  //错误
  //重连
  lockReconnect = false;
  reconnect();
}

//连接关闭事件
function websocketclose(e) {
  //关闭
  console.log("connection closed ");
  //提示关闭
  //重连
  reconnect();
}

function websocketsend(msg) {
  //向服务器发送信息
  //数据发送
  if (websock.readyState == 1) {
    websock.send(msg);
  } else {
    websock.close();
    initWebSocket();
  }
}

// 接收服务器返回的数据
function websocketonmessage(e) {
  let resData = JSON.parse(e.data);
  // 获取当前在哪个路由,可以在路由文件存储如:router.beforeEach((to, from, next) => {essionStorage.setItem('url', to.fullPath);});
  let toUrl = sessionStorage.getItem('url');
  if (resData.type == "init") {
    // 请求接口绑定用户到后端(API是我封装的axios请求)
    let para = {client_id: resData.client_id };
    API.post("service/bind", para, 1).then(res => {
      if (res.status == 1) {
        store.commit('changeSocketLocal', websock);
      }
    });
  } else if (resData.type == "msg_add") {
    if ( toUrl == '/chat') {
      // 正在聊天界面
      store.commit('changeServiceInfosLocal', resData); // 把消息保存到Vuex中
    } else { // 不在聊天界面中
   	  eventStorage(); // 用于消息声音提醒
      // 设置未读条数
      let onReadMsgNum = localStorage.getItem("noReadNum"); // 把原有未读的条数一起累加
      ++onReadMsgNum;
      localStorage.setItem("noReadNum", onReadMsgNum);
      store.commit('changeNoMsgReadNumLocal', onReadMsgNum); // 把未读的条数保存到Vuex中,解决有新消息页面未刷新不能及时更新的问题
    }
  }
  // 收到服务器信息，心跳重置
  reset();
}
function eventStorage () {
  // 监听storage的变化, 用于消息声音提醒
  var orignalSetItem = localStorage.setItem;
  localStorage.setItem = function(key,newValue){
   var setItemEvent = new Event("setItemEvent");
    setItemEvent.newValue = newValue;
    window.dispatchEvent(setItemEvent);
    orignalSetItem.apply(this ,arguments);
  }
}

export {
  // 暴露出去,方便调用
  initWebSocket
}
