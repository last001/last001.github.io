/**
 * 设置手机通知权限
 */
export function setPermissions {
	let platform = uni.getSystemInfoSync().platform
	if (platform == 'ios') {
		//ios默认会有通知 不需要手动设置
		console.log('我是iOS')
	} else if (platform == 'android') {
		console.log('我是安卓')
		/* 获取当前手机是否有通知权限 */
		// #ifdef APP-PLUS
		let main = plus.android.runtimeMainActivity();
		let pkName = main.getPackageName();
		let NotificationManagerCompat = plus.android.importClass(
			"android.support.v4.app.NotificationManagerCompat");
		let packageNames = NotificationManagerCompat.from(main);
		console.log("是否有通知权限");
		if (!packageNames.areNotificationsEnabled()) { //手机没有开启通知的权限
			console.log("没有通知权限");
			let uid = main.getApplicationInfo().plusGetAttribute("uid");
			let Intent = plus.android.importClass('android.content.Intent');
			let Build = plus.android.importClass("android.os.Build");
			let intent = '';
			//android 8.0引导  
			if (Build.VERSION.SDK_INT >= 26) {
				intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
				intent.putExtra('android.provider.extra.APP_PACKAGE', pkName);
			} else if (Build.VERSION.SDK_INT >= 21) { //android 5.0-7.0  
				intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
				intent.putExtra("app_package", pkName);
				intent.putExtra("app_uid", uid);
			} else { //(<21)其他--跳转到该应用管理的详情页
				let Settings = plus.android.importClass("android.provider.Settings");
				let Uri = plus.android.importClass("android.net.Uri");
				intent = new Intent();
				intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
				let uri = Uri.fromParts("package", main.getPackageName(), null);
				intent.setData(uri);
			}
			// 跳转到该应用的系统通知设置页  
			main.startActivity(intent);
		}

		// #endif 
		/* 获取当前手机是否有通知权限 */
	}
}
