<template>
	<view>
		<view class="global">
			<uni-list-item title="账号" :rightText="curUser.FullName" />
			<!-- <uni-list-item title="当前店铺:" :rightText="my1.ShopName" /> -->
			<view style="background-color: white;margin-top: 15rpx;">
				<u-cell-group>
					<u-cell title="解除账户绑定" isLink @click="jcbd"></u-cell>
					<!-- <u-cell title="修改绑定手机" isLink @click="xgsj"></u-cell>
					<u-cell title="修改密码" isLink @click="xxmm" :value="value"></u-cell> -->
					<view class="nar" @click="call">
						<view class="nars">
							<view>呼叫客服</view>
							<view class="phone">150-0767-1304☎</view>
						</view>
					</view>
					<u-cell title="投诉反馈" isLink @click="tsfk"></u-cell>
					<u-cell title="关于我们" isLink @click="us"></u-cell>
				</u-cell-group>
			</view>

			<!-- 解除绑定 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog :type="msgType" cancelText="关闭" confirmText="同意" title="解除账户绑定确认" content="是否解除绑定？"
					@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
			</uni-popup>

			<!-- 修改手机号 -->
			<uni-popup ref="popup" type="dialog">
				<uni-popup-dialog mode="input" placeholder="输入绑定手机号码" title="修改绑定手机" @close="close" @confirm="confirm">
				</uni-popup-dialog>
			</uni-popup>

			<!-- 修改密码 -->
			<uni-popup ref="xxmm" type="dialog">
				<uni-popup-dialog :type="msgType" cancelText="关闭" confirmText="同意" title="是否修改密码" @confirm="qd"
					@close="qx">
					<view>
						<uni-easyinput placeholder="请输入新密码" v-model="valuea"></uni-easyinput>
						<uni-easyinput placeholder="请确认新密码" v-model="valueb"></uni-easyinput>
					</view>
				</uni-popup-dialog>

			</uni-popup>

		</view>
	</view>
</template>

<script>
	const util = require('@/utils/utils.js');
	const app = require('@/utils/app.js')
	import {
		$http,
		$get,
		$post
	} from '@/utils/api.js';
	export default {
		data() {
			return {

				//系统管理员
				isSystemAdmin: false,
				//合作方管理员
				isPartnerAdmin: false,
				//外包商管理员
				isOutSourceAdmin: false,
				//渠道管理员
				isChannelAdmin: false,
				curUser: [],

				user: {},
				my1: {},
				msgType: 'info',
				value: '',
				valuea: '',
				valueb: ''
				// my2:{}
			};
		},
		onLoad() {
			this.getUserInfo()
			// this.user = uni.getStorageSync('data')
			// console.log(this.user, "111")
			// var qw = uni.getStorageSync('data')
			// this.my1 = qw.Result;
			// this.my2 = qw.Result.OrderDetailList;
		},
		methods: {

			getUserInfo: function() {
				let that = this;
				let interface_code = 'getCurrentUser';
				let interface_parameters = util.obj2str([]);

				$post('/oauth2/resources', {
					interface_code,
					interface_parameters,
				}).then(data => {
					console.log(data);
					if (data.RetCode == "000000") {
						let curUser = data.Result;
						if (curUser.UserType == 'M' && (curUser.AdminType == '2' || curUser.AdminType ==
								'9')) {
							that.isSystemAdmin = true;
							that.isChannelAdmin = true;
							if (app.curTradeArea && app.curTradeArea.TradeAreaType == 'outsource') {
								that.isOutSourceAdmin = true;
								that.isPartnerAdmin = false;
								that.isChannelAdmin = true;
							} else if (app.curTradeArea && app.curTradeArea.TradeAreaType == 'partner') {
								that.isOutSourceAdmin = false;
								that.isPartnerAdmin = true;
								that.isChannelAdmin = true;
							}
						} else if (curUser.UserType == 'M' && (curUser.AdminType == '0' || curUser.AdminType ==
								'1')) {
							that.isSystemAdmin = false;
							if (app.curTradeArea && app.curTradeArea.TradeAreaType == 'outsource') {
								that.isOutSourceAdmin = true;
								that.isPartnerAdmin = false;
								that.isChannelAdmin = false;
							} else if (app.curTradeArea && app.curTradeArea.TradeAreaType == 'partner') {
								that.isOutSourceAdmin = false;
								that.isPartnerAdmin = true;
								that.isChannelAdmin = false;
							}
						} else if (curUser.UserType == 'S' && curUser.AdminType == '3') {
							//渠道商建立一个虚拟店，只能查看总体数据和结算提现
							that.isSystemAdmin = false;
							that.isOutSourceAdmin = false;
							that.isPartnerAdmin = false;
							that.isChannelAdmin = true;
						}
						that.curUser = curUser;
					} else {
						uni.showModal({
							title: '获取用户信息失败',

						})
					}
				})
			},

			xxmm() {
				this.$refs.xxmm.open()
			},
			qd(valueb) {
				console.log("成功");
				uni.showLoading({
					title: '3秒后会关闭'
				})
				setTimeout(() => {
					uni.hideLoading()
					console.log(valueb, "336")
					this.valueb = valueb

					// 关闭窗口后，恢复默认内容
					this.$refs.xxmm.close()
				}, 3000)
			},
			qx() {
				console.log("取消");
			},
			//解除绑定
			jcbd() {
				this.$refs.alertDialog.open()
				console.log("解除绑定");
			},
			dialogConfirm() {
				console.log('点击确认')
				var that = this;
				let interface_code = 'unbindMobileNumberUser';
				let data = uni.getStorageSync('userDate');
				let interface_parameters = util.obj2str([data.userid]);

				$post('/oauth2/resources', {
					interface_code,
					interface_parameters,
				}).then(res => {
					console.log(res);
					if (res.RetCode == "000000") {
						console.log("解除成功");
						uni.removeStorageSync('userDate');
						uni.removeStorageSync('access_token');
						uni.reLaunch({
							url: '/pages/index/index'
						})
					} else {
						uni.showModal({
							title: '解绑失败',
							content: data.Result
						})
					}
				})
			},
			dialogClose() {
				console.log('点击关闭')
			},
			//修改手机
			xgsj() {
				this.$refs.popup.open()
			},
			close() {
				console.log("取消");
				this.$refs.popup.close()
			},
			confirm(value) {
				console.log("确定")
				this.$refs.popup.close()
			},
			//修改密码
			xgmm() {
				console.log("修改密码")
				this.$refs.inputDialog.open()
			},
			dialogInputConfirm(val) {
				uni.showLoading({
					title: '3秒后会关闭'
				})
				setTimeout(() => {
					uni.hideLoading()
					console.log(val)
					this.value = val
					// 关闭窗口后，恢复默认内容
					this.$refs.inputDialog.close()
				}, 3000)
			},

			call() {
				// uni.makePhoneCall({
				// 	phoneNumber: '13878912260', //仅为示例
				// });
				// 导入Activity、Intent类  
				var Intent = plus.android.importClass("android.content.Intent");
				var Uri = plus.android.importClass("android.net.Uri");
				// 获取主Activity对象的实例  
				var main = plus.android.runtimeMainActivity();
				// 创建Intent  
				var uri = Uri.parse("tel:10086"); // 这里可修改电话号码  
				var call = new Intent("android.intent.action.CALL", uri);
				// 调用startActivity方法拨打电话  
				main.startActivity(call);
			},
			tsfk() {
				uni.navigateTo({
					url: "/pages/feedback/feedback",
				})
			},
			us() {
				uni.navigateTo({
					// url:'/pages/prints/prints'
					// url: '/pages/about-us/about-us'
					// url:'/pages/print/print'
					url: '/pages/audio/audio'
				})
			}

		},
		onBackPress() {
			// #ifdef APP-PLUS
			plus.key.hideSoftKeybord();
			// #endif
		},

	};
</script>

<style lang="scss" scoped>
	@import url('@/pages/my/my.css');
</style>
