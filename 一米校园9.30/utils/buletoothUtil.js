export default{
	/* 蓝牙通信工具 */
	getError(errorCode){
		if(errorCode == 0) return "OK";
		if(errorCode == 10000) return "未初始化蓝牙适配器";
		if(errorCode == 10001) return "当前蓝牙适配器不可用";
		if(errorCode == 10002) return "没有找到指定设备";
		if(errorCode == 10003) return "连接失败";
		if(errorCode == 10004) return "没有找到指定服务";
		if(errorCode == 10005) return "没有找到指定特征值";
		if(errorCode == 10006) return "当前连接已断开";
		if(errorCode == 10007) return "当前特征值不支持此操作";
		if(errorCode == 10008) return "其余所有系统上报的异常";
		if(errorCode == 10009) return "Android 系统特有，系统版本低于 4.3 不支持 BLE";
		return "未知异常";
	},
	/* 异步执行，延时函数 */
	delayed(ms,res){
		return new Promise((resolve,reject) =>{
			setTimeout(function(){
				resolve(res);
			},ms)
		});
	}
}