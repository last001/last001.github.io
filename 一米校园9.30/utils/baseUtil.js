const util = require('@/utils/utils.js');
const app = require('@/utils/app.js');
import {
	$http,
	$get,
	$post
} from '@/utils/api.js';


//底层拼sql查询方法
const getEntityPage4Json = (params, cb) => {
	let interface_code = 'getEntityPage4Json'
	let paramss = util.obj2str(params)
	let interface_parameters = util.obj2str([paramss])
	$post('/oauth2/resources', {
		interface_code,
		interface_parameters
	}).then(data => {
		if (data) {
			typeof cb == "function" && cb({
				Detail: null,
				Result: data,
				RetCode: "000000",
				StackTrace: null
			});
		} else {
			typeof cb == "function" && cb({
				Detail: null,
				Result: null,
				RetCode: "100000",
				StackTrace: null
			});
		}
	})
}

module.exports = {
	getEntityPage4Json,
}
