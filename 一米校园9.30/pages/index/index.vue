<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>

		<view style="margin-top: 30px;">
			<uni-forms ref="form" :modelValue="form" :rules="rules">
				<view style="width: 90%;margin-left: 5%;">
					<uni-forms-item name="username">
						<uni-easyinput v-model="form.username" prefixIcon="person" placeholder="请输入账号"></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item name="password">
						<uni-easyinput type="password" v-model="form.password" prefixIcon="locked" placeholder="请输入密码">
						</uni-easyinput>
					</uni-forms-item>
				</view>

			</uni-forms>
		</view>

		<view class="btn" @click="login">
			<view>登录</view>
		</view>
	</view>
</template>

<script>
	// import {setPermissions} from "@/utils/setPermissions.js"
	const app = require('@/utils/app.js')
	export default {
		data() {
			return {
				form: {
					username: '',
					password: '',
				},
				uuid: null,
				rules: {
					username: {
						rules: [{
							required: true,
							errorMessage: '请输入用户名'
						}],
						validateTrigger: 'submit'
					},
					password: {
						rules: [{
							required: true,
							errorMessage: '请输入密码'
						}],
						validateTrigger: 'submit'
					},
				}
			}
		},
		onLoad() {
			//#// #ifdef APP-PLUS
			// 获取设备信息
			var that = this;
			plus.device.getInfo({
				success: function(e) {
					that.uuid = e.uuid
					// console.log(that.uuid);
				},
				fail: function(e) {
					console.log(e);
				}
			});
			//#endif

			//#// #ifdef H5
			var uuid = "73c27a13e8ce063d"
			console.log(uuid);
			// #endif

		},

		methods: {
			login() {
				this.$refs.form.validate().then(res => {
					uni.request({
						// url: 'https://1mapp.cloudyee.com/oauth2/bind', //绑定
						url: app.url + '/oauth2/bind', //绑定
						method: "POST",
						header: {
							'content-type': 'application/json'
						},
						data: {
							bind_type: "password",
							username: this.form.username,
							password: this.form.password,
							usertype: "'M','S'",
							mobile_number: this.form.username,
							openid: '73c27a13e8ce063d',
						},
						success: (res) => {
							console.log("res ==>", res);
							if (res.data.RetCode == "000000") {
								uni.setStorageSync("userDate", res.data);
								uni.setStorageSync("username", this.form.username);
								uni.setStorageSync("password", this.form.password);
								// uni.setStorageSync("userDate", {
								// 	userid: res.data.userid,
								// 	openid: res.data.openid,
								// 	uid: res.data.uid,
								// 	RetCode: res.data.RetCode,
								// });
								uni.request({
									// url: 'https://1mapp.cloudyee.com/oauth2/emauthorize', //获取token
									url: app.url + '/oauth2/emauthorize',
									method: "POST",
									data: {
										"app_id": "1mshop",
										"app_secret": "f55737ea50afe698a55a8e9980b22669",
										"scope": "app",
										"username": this.form.username,
										"password": this.form.password,
										"ds-oauth2-uid": res.data.userid,
										"response_type": "token",
										"state": "oauth2",
										"redirect_uri": "doshare"
									},
									success: (res) => {
										console.log("res ==>", res);
										uni.setStorageSync("access_token", res.data
											.access_token);
										console.log(res.data.access_token, "888");
										uni.switchTab({
											url: "../pending/pending"
										})
									},
									fail: (err) => {
										console.log("获取失败");
										console.log("err ==>", err);
									}
								})
							} else {
								console.log("错误");
							}

						},
						fail: (err) => {
							console.log("err ==>", err);
							uni.showToast({
								title: '绑定错误',
							})
						}
					})
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; 
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.btn {
		width: 60%;
		text-align: center;
		margin-top: 30px;
		background-color: #56bdaa;
		border-radius: 20px;
		padding: 20rpx 0;
		color: white;
	}
</style>
