
let besaUrl = '';
let token = "";
if (process.env.NODE_ENV === 'development') {
	// #ifdef H5 
	besaUrl = '/api';
	// #endif
	// #ifdef MP-WEIXIN
	besaUrl = 'http://172.17.36.23:8085';
	// #endif
} else {
	besaUrl = '';
}

export function request(options = {},cb) {
	options.url = besaUrl + options.url;

	options.header = {
		'content-type': 'application/json',//默认请求头，可不写
	};

	return new Promise((resolved, rejected) => {
		options.success = (res) => {
			resolved(res);
			typeof cb == "function" && cb(res);
		}
		options.fail = (err) =>{
			rejected(err);
			typeof cb == "function" && cb(err);
		}
		
		uni.request(options,cb);
	})
}
