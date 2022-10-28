import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

// 导入uview框架
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
//导入vant框架
// import Vant from 'vant';

// Vue.use(Vant)



import apps from 'common/apps.js';
Vue.prototype.apps = apps;


const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
