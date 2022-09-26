import Vue from 'vue'
import App from './App'

/*引入uview*/
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
//将默认单位改为rpx
uni.$u.config.unit = 'rpx';

import share from '@/common/share.js';
Vue.mixin(share);

export default {
	onload() {
		_this = this;
		_this.abc();
	},

	methods:{
		abc: function(string) {
			console.log("string ==>", string);
		}
	}
}


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
