const config = require('@/utils/config.js')

module.exports = {
	access_token: uni.getStorageSync('access_token'),
	userAppId: "1mapp",
	bind_status: "unbound", //用户绑定状态
	// version: config.version,
	// schoolCode: config.schoolCode,
	loadingShop: false,
	// loginStatus: '0',
	curShop: [],
	curTradeArea: [],
	shopStatShopId: '',
	shopStatTradeAreaId: '',
	resource_endpoint: config.host_endpoint + "/oauth2/resources",
	cache_invoke: [],
	url: 'https://1mapp.cloudyee.com',
	// url:'http://172.16.0.146:8085/cloudyee_saas_war_exploded'
	count: 0
};
