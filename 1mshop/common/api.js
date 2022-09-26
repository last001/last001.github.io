import {request} from "@/common/request.js";
import config from '@/common/config.js';
import globalData from '@/common/globalData.js';
const util = require("@/common/util.js");

export default {
	login(code,data,cb){
		var _this = this;
		for (var i in data) {
		  if (typeof data[i] == "undefined") {
		    util.showMessage("未知参数错误！", null, function () {
		      console.log("code:" + code);
		      console.log("data:" + data);
		    });
		    return;
		  }
		};
		if (!globalData.access_token) {
			console.log(globalData.cache_invoke);
		  globalData.cache_invoke.push({
		    code: code,
		    data: data,
		    cb: cb
		  });
		  _this.getToken();
		  return;
		};
		
		return request({
			url: "/cloudyee_saas_war_exploded/oauth2/bind",
			method: "POST",
			data,
		},function(state){
			console.log("state ==>", state);
			if(state.errMsg == "request:ok"){
				
			}
			typeof cb == "function" && cb(state);
		})
	},
	getToken(){
		var _this = this;
		console.log("45464645646")
	}
}