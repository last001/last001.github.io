export default {
	data() {
		return {
			// 默认的全局分享内容
			share: {
				title: '生活服务',
				path: '/pages/index/index', // 全局分享的路径，比如 首页
				imageUrl: '', // 全局分享的图片(可本地可网络)
				desc:"",
				content:""
			}
		}
	},
	// 定义全局分享
	// 1.发送给朋友
	onShareAppMessage(res) {
		// console.log("res ==>",res);
		let _this = this;
		// let pages = getCurrentPages();
		// let view = pages[pages.lengh - 1]
		// console.log("pages ==>",pages);
		return {
			title: _this.share.title,
			path: _this.share.path,
			imageUrl: _this.share.imageUrl,
			desc:_this.desc,
			content:_this.content,
			success(res) {
				uni.showToast({
					title: '分享成功'
				})
			},
			fail(res) {
				uni.showToast({
					title: '分享失败',
					icon: 'none'
				})
			}
		}
	},
	//2.分享到朋友圈
	onShareTimeline(res) {
		let _this = this;
		return {
			title: _this.share.title,
			path: _this.share.path,
			imageUrl: _this.share.imageUrl,
			desc:_this.desc,
			content:_this.content,
			success(res) {
				uni.showToast({
					title: '分享成功'
				})
			},
			fail(res) {
				uni.showToast({
					title: '分享失败',
					icon: 'none'
				})
			}
		}
	},
}
