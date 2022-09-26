import config from '@/common/config.js';

const globalData = {
	app_name: config.app_name,
	app_short_name: config.app_short_name,
	service_phone: config.service_phone,
	school_code: config.school_code,
	client_service_id: config.client_service_id,
	version: config.client_version,
	copyright: config.client_copyright,
	client_mode: config.client_mode,
	tradeAreaId: config.client_mode == 'Single' ? config.client_tradeAreaId : '',
	loading_status: "loading", //获取token状态
	bind_status: "unbound", //用户绑定状态
	ds_oauth2_uid: null,
	open_id: null,
	union_id: null,
	user_info: null,
	temp_access_token: null,
	access_token: null,
	refresh_token: null,
	client_id: config.client_id,
	client_secret: config.client_secret,
	unauthenticated_access_token_endpoint: config.host_endpoint + "/oauth2/emauthorize",
	token_endpoint: config.host_endpoint + "/oauth2/token",
	resource_endpoint: config.host_endpoint + "/oauth2/resources",
	bindaccount_endpoint: config.host_endpoint + "/oauth2/bind",
	host_endpoin: config.host_endpoint,
	cdn_endpoint: config.cdn_endpoint,
	preview_endpoint: config.cdn_endpoint,
	wxcode_session: config.host_endpoint + "/oauth2/" + config.client_bind,
	authorizeCode: null,
	cache_invoke: [],
	curLocation: null, //用户当前位置
	systeminfo: null, //机型
	updataProductMinute: 60, //更新商品分钟
	updataShopMinute: 1, //更新店铺分钟
	loadImageFlag: true //用户控制本地存储的删除控制
}

export default globalData;