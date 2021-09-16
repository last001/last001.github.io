// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Router from 'vue-router'
import store from './store'
// sideNavbar 的 图标
import "./assets/iconfont/iconfont.css";

Vue.use(Router);

// 阻止生产模式的消息
Vue.config.productionTip = false;

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);

//引入quill-editor编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor, );

//实现quill-editor编辑器拖拽上传图片
import * as Quill from 'quill'
import {
  ImageDrop
} from 'quill-image-drop-module'
Quill.register('modules/imageDrop', ImageDrop)

//实现quill-editor编辑器调整图片尺寸
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageResize', ImageResize)

// 放入全局变量中
Vue.prototype.$axios = axios;

axios.defaults.baseURL = '/api';
// axios.defaults.baseURL = 'http://www.ec-sigaoyi.com';

Vue.prototype.msg = function (msg) {
  return msg.replace("\n",
    "<br>")
}

// console.log("mian文件 ==>mianmianmianmianmianmianmianmianmian");

// POST json格式传值
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// POST formData格式传值
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 防止点击同一个路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//   Loading chunk 23 failed.
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});

// 设置浏览器标题
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
