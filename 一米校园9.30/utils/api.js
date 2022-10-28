import {
	userAppId
} from "@/utils/app.js";
import code from "../uni_modules/uview-ui/libs/config/props/code";
const app = require('@/utils/app.js')

// const get_token =() =>{
// 	const token = uni.getStorageSync('access_token');
// 	return
// }
//


// export const myRequest = (option) => {
// 	// const header_tmp = {
// 	// 	"Authorization": "Bearer" + "" + uni.getStorageSync("access_token") || ''
// 	// };
// 	return new Promise((resolve, reject) => {
// 		uni.request({
// 			url: BASE_URL + option.url,
// 			method: option.method || 'GET',
// 			header: {
// 				'content-type': 'application/json'
// 			},
// 			// header: header_tmp,
// 			// header: {token: uni.getStorageSync('access_token') ? uni.getStorageSync('access_token').token:''},
// 			data: Option.data || {},
// 			success: (res) => {
// 				console.log("res ==>", res);
// 				// if (res.data && res.data["error_code"]) {
// 				// 	if (res.data.error_code == "210001") { //无效或者过期
// 				// 		uni.navigateTo({
// 				// 			url:'/pages/index/index'
// 				// 		})
// 				// 	}
// 				// 	console.error("code-" + res.data["error_code"] + ":" + res.data["error"] +
// 				// 		",info:{code:" + code + ",paras:" + paras + "}");
// 				// 	fail && (typeof fail == "function") && fail(res.data);
// 				// 	return;
// 				// }else{
// 				// 	if (res.statusCode !== 200 && res.statusCode !== 201) {
// 				// 		return uni.showToast({
// 				// 			title: "请求失败"
// 				// 		})
// 				// 	};
// 				// }

// 				resolve(res)
// 			},
// 			fail: (res) => {
// 				return uni.showToast({
// 					title: "请求接口失败"
// 				})
// 				reject(err)
// 			},
// 		})
// 	})
// }

// export default myRequest;



// const BASE_URL = 'http://172.17.36.23:8085/cloudyee_saas_war_exploded/oauth2'

// export const request =(Option) => {
// 	return new Promise((resolve, reject) =>{
// 		uni.request({
// 			url:BASE_URL + Option.url,
// 			method:Option.method || 'GET',
// 			header: {'content-type': 'application/json'},
// 			data:Option.data || {},
// 			success: (res) => {
// 				const data = res.data
// 				if (data.statusCode === '401') {   //401为无权限
// 					uni.navigateTo({
// 						url:'/pages/index/index'
// 					})
// 					return
// 				} else if(data.statusCode !== '200') {
// 					uni.showToast({
// 						icon: 'error',
// 						title: '操作错误'
// 					})
// 				}
// 				resolve(data)
// 			},
// 			fail: (error) => {
// 				uni.showToast({
// 					icon: 'error',
// 					title: '系统错误'
// 				})
// 				reject(error)
// 			}
// 		})
// 	})
// }

function getToken(userid, cb) {
	if (userid) {
		typeof cb == 'function' && cb(userid)
	} else {
		var uuid = null
		// #ifdef APP-PLUS
		plus.device.getInfo({
			success: function(e) {
				uuid = e.uuid
			},
			fail: function(e) {
				console.log(e);
			}
		});
		// #endif
		// #ifdef H5
		uuid = '73c27a13e8ce063d'
		// #endif
		if (uuid) {
			uni.request({
				url: app.url + '/oauth2/getmanagerinfoforapp',
				method: "POST",
				data: {
					clientId: '1mshop',
					openId: uuid,
					code: uuid
				},
				success(res) {
					if (res.data.userid) {
						uni.setStorageSync('userDate', res.data);
						typeof cb == 'function' && cb(res.data.userid)
					} else {
						uni.reLaunch({
							url: '/pages/index/index'
						})
					}
				},
				fail(err) {
					console.log(err);
					uni.reLaunch({
						url: '/pages/index/index'
					})
					return
				}
			})
		}
	}
}
// const baseUrl = 'https://1mapp.cloudyee.com/oauth2'
// const baseUrl = 'http://172.16.0.146:8085/cloudyee_saas_war_exploded/oauth2'
// 向外导出一个http方法，接收用户传递过来的 请求地址、方式、header头部信息、data请求体信息
export const $http = (url, method = 'POST', data = {}) => {
	// 返回一个 Promise的实例对象
	return new Promise((resolve, reject) => {
		// debugger
		var access_token = uni.getStorageSync('access_token') || null
		uni.request({
			url: app.url + url, //统一域名+用户传递进来的url
			method: method, //用户传递进来的请求方式
			header: {}, // 头部信息
			data: {
				...data,
				'access_token': access_token,
			}, //请求体信息

			// 请求成功,通过resolve将请求成功的结果返回去给用户
			success: (res) => {
				if (app.count > 5) return;
				if (res.data.error_code == "210015" || res.data.error_code == "210016" || res
					.data.error_code == '210001') {
					app.cache_invoke.push({
						url: url,
						data: data
					})
					app.count++

					var userid = uni.getStorageSync('userDate').userid || null
					getToken(userid, function(data) {
						if (data) {
							uni.request({
								url: app.url + '/oauth2/emauthorize', //获取token
								// url: 'http://172.16.0.146:8085/cloudyee_saas_war_exploded/oauth2/emauthorize',
								method: "POST",
								data: {
									"app_id": "1mshop",
									"app_secret": "f55737ea50afe698a55a8e9980b22669",
									"scope": "app",
									"ds-oauth2-uid": data,
									"response_type": "token",
									"state": "oauth2",
									"redirect_uri": "doshare"
								},
								success: (res) => {
									console.log("res ==>", res);
									uni.setStorageSync('access_token', res
										.data.access_token)
									for (var i = app.cache_invoke.length -
											1; i >= 0; i--) {
										var item = app.cache_invoke[i];
										try {
											$post(item.url, item.data);
										} catch (e) {
											console.error("错误")
										}
										app.cache_invoke.splice(i, 1);
									}
								},
								fail: (err) => {
									console.log("err ==>", err);
								}
							})
						}
					})
				} else {
					resolve(res.data)
				}

			},
			// 请求失败，通过reject将失败的结果返回去给用户
			fail: (err) => {
				debugger
				reject(err)
				// uni.startPullDownRefresh({
				// 	success() {
				// 		console.log("刷新成功");
				// 	}
				// })
			}
		})
	})
}

// 封装一个 GET 类型的请求接口,因为默认为 GET 请求，所以不用传递,只需要传递 请求地址、请求头信息、请求体信息
export const $get = (url, data = {}) => {
	return $http(url, 'GET', data)
}

// 封装一个 POST 类型的请求接口,默认为 POST 请求，所以不用传递,只需要传递 请求地址、请求头信息、请求体信息
export const $post = (url, data = {}) => {
	return $http(url, 'POST', data)
}
