// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Router from 'vue-router';
import Vuex from 'vuex'
import axios from 'axios';
import store from './store/store'

// 富文本
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor);

Vue.use(Vuex);
import "amfe-flexible";
// 解决App 返回键 退出的问题
import Mui from 'vue-awesome-mui';
Vue.use(Mui);

mui.init({
  keyEventBind: {
    backbutton: true, //关闭back按键监听
  }
})

// console.log("main.js   文件下的 path ==>", router.options);

router.beforeEach((to, from, next) => {
  // console.log("main.js to ==>", to);
  //首页返回键处理
  // 处理逻辑： 1s内，连续两次按返回键，则退出应用；
  var first = null;
  mui.back = function () {
    // 首次按键， 提示 再按一次退出应用
    if (!first) {
      if (to.name == "My" || to.name == "Order" || to.name == "Commodity") {
        router.push({
          name: "Home"
        });
      } else if (to.name == "Home") {
        //记录第一次按下回退键的时间
        first = new Date().getTime();
        mui.toast("再按一次退出应用");
        setTimeout(function () {
          //1s 后清除
          first = null;
        }, 1000);
      } else {
        history.go(-1);
      }
    } else {
      if (new Date().getTime() - first < 1000) {
        //如果两次按下的时间小于1s
        plus.runtime.quit(); //那么就退出app
      }
    }
  }
  next();
})

// import {statusHeight} from '@/utils/util';
// Vue.prototype.statusHeight = statusHeight();

// vant 注册组件
import {
  Button,
  Icon,
  Form,
  NavBar,
  Field,
  Search,
  DropdownMenu,
  DropdownItem,
  Loading,
  Toast,
  Area,
  Popup,
  Dialog,
  Checkbox,
  CheckboxGroup,
  Rate,
  ActionSheet,
  ShareSheet,
  Cell,
  CellGroup,
  Picker,
  AddressList,
  Empty,
  AddressEdit,
  Step,
  Steps,
  Tab,
  Tabs,
  TreeSelect,
  Image as VanImage,
  Swipe,
  SwipeItem,
  Lazyload,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  List,
  Notify,
  PullRefresh,
  Skeleton,
  DatetimePicker,
  ImagePreview,
  NoticeBar,
  Radio,
  RadioGroup,
  Uploader,
  Popover,
  Divider
} from 'vant';
Vue.use(Button);
Vue.use(Icon);
Vue.use(Form);
Vue.use(NavBar);
Vue.use(Field);
Vue.use(Search);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Loading);
Vue.use(Toast);
Vue.use(Area);
Vue.use(Popup);
Vue.use(Dialog);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Rate);
Vue.use(ActionSheet);
Vue.use(ShareSheet);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Picker);
Vue.use(AddressList);
Vue.use(Empty);
Vue.use(AddressEdit);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(TreeSelect);
Vue.use(VanImage);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(GoodsAction);
Vue.use(GoodsActionIcon);
Vue.use(GoodsActionButton);
Vue.use(List);
Vue.use(Notify);
Vue.use(PullRefresh);
Vue.use(Skeleton);
Vue.use(DatetimePicker);
Vue.use(ImagePreview);
Vue.use(NoticeBar);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Uploader);
Vue.use(Popover);
Vue.use(Divider);

// 储存ip cname ;
var Ip = returnCitySN['cip'];
var cityname = returnCitySN['cname'];
localStorage.setItem('Ip', Ip);
localStorage.setItem('cityname', cityname);

// 防止生产环境错误
Vue.config.productionTip = false;

// 注册axios
Vue.prototype.$axios = axios;

// 基本api
// axios.defaults.baseURL = '/api';
axios.defaults.baseURL = 'http://www.ec-sigaoyi.com';

// 防止点击同一个路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,
  },
  template: '<App/>'
})
