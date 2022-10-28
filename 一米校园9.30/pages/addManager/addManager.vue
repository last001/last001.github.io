<template>
	<view>
		<view class="ds-fx ai-c h-90 pl-20">
			<text>职务：</text>
			<picker @change="picker" :value="pickerNum" :range="duty" range-key="key">{{duty[pickerNum]}}</picker>
		</view>
		<view class="item">
			<text class="tit">登录账号：</text>
			<view class="txt">
				<input name="Account" :value="newUser.Account" @blur="inputBlur" data-field="Account"
					placeholder="请输入账号【提交后不可修改】" />
			</view>
		</view>
		<view class="item">
			<text class="tit">账号名称：</text>
			<view class="txt">
				<input name="FullName" :value="newUser.FullName" @blur="inputBlur" data-field="FullName"
					placeholder="请输入账号名称" />
			</view>
		</view>
		<view class="item">
			<text class="tit">手机号码：</text>
			<view class="txt">
				<input name="MobileNumber" :value="newUser.MobileNumber" @blur="inputBlur" data-field="MobileNumber"
					placeholder="请输入绑定的手机号码" />
			</view>
		</view>
		<view class="item" v-if="openMode =='add'">
			<text class="tit">密码：</text>
			<view class="txt">
				<input name="Password1" :value="newUser.Password1"  password @blur="inputBlur" data-field="Password1"
					placeholder="请输入密码" />
			</view>
		</view>
		<view class="item" v-if="openMode =='add'">
			<text class="tit">确认密码：</text>
			<view class="txt">
				<input name="Password2" :value="newUser.Password2" password @blur="inputBlur" data-field="Password2"
					placeholder="请输入确认密码" />
			</view>
		</view>
		<view class="btn-wrap">
			<view class="btn" @click="submit">提交</view>
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
	import {
		obj2str
	} from '@/utils/utils.js';
	export default {
		data() {
			return {
				ShopId: '',
				openMode: '',
				duty: ['店主', '收银员', '配送员', '出仓员', '第三方配送员', '餐饮公司'],
				pickerNum: '0',
				positionCode: 'owner',
				newUser: {
					Id: '',
					Account: '',
					FullName: '',
					Password: '',
					Password1: '',
					Password2: '',
					MobileNumber: ''
				},
			}
		},
		onLoad(options) {
			var that = this
			var entity = {}
			if (options && options.ShopId) {
				that.ShopId = options.ShopId;
				that.openMode = 'add'
			}
			if(options.entity){
				entity = JSON.parse(decodeURIComponent(options.entity))
				that.newUser = entity
				that.openMode = 'update'
				   if (that.newUser.Code == 'owner') {
				        that.pickerNum = 0;
				      } else if (that.newUser.Code == 'cashier') {
				        that.pickerNum = 1;
				      } else if (that.newUser.Code == 'distributor') {
				        that.pickerNum = 2;
				      } else if (that.newUser.Code == 'warehouseman') {
				        that.pickerNum = 3;
				      } else if (that.newUser.Code == 'distributor3') {
				        that.pickerNum = 4;
				      }else if (that.newUser.Code == 'catering') {
				        that.pickerNum = 5;
				      }
			}
		},
		methods: {

			picker(e) {
				var that = this
				that.pickerNum = e.detail.value
				if (that.pickerNum == 0) {
					that.positionCode = "owner";
				} else if (that.pickerNum == 1) {
					that.positionCode = "cashier";
				} else if (that.pickerNum == 2) {
					that.positionCode = "distributor";
				} else if (that.pickerNum == 3) {
					that.positionCode = "warehouseman";
				} else if (that.pickerNum == 4) {
					that.positionCode = "distributor3";
				} else if (that.pickerNum == 5) {
					that.positionCode = "catering";
				}
			},
			inputBlur(e) {
				var that = this
				var field = e.currentTarget.dataset.field;
				that.newUser[field] = e.detail.value
			},
			checkIsCanUpdate(entity) {
				var that = this
				if (!entity.Account) {
					util.showMessage("账户名不能为空！")
					return false;
				}
				if (!entity.Password1 && that.pickerNum != 4 && that.openMode == 'add') {
					util.showMessage("密码不能为空！")
					return false;
				}
				if (entity.Password1 != entity.Password2 && that.pickerNum != 4 && that.openMode == 'add') {
					util.showMessage("两次输入的密码不一致！")
					return false;
				}
				if (!entity.FullName && that.pickerNum != 4) {
					util.showMessage("姓名不能为空！")
					return false;
				}
				if (!entity.MobileNumber && that.pickerNum != 4) {
					util.showMessage("绑定的手机号码不能为空！")
					return false;
				}
				return true;
			},
			submit() {
				var that = this
				if (that.checkIsCanUpdate(that.newUser)) {
					
					let shopUserEntity = {
						Id: '',
						UserId: '',
						ShopId: '',
						Code: '',
						DistrictJson: ''
					};
					shopUserEntity.ShopId = that.ShopId
					shopUserEntity.Code = that.positionCode;
					if (that.openMode == 'add') {
						that.newUser.Password = that.newUser.Password1;
						that.addShopUserTap(that.newUser, shopUserEntity);
					} else {
                        that.updateShopUserTap(that.newUser, shopUserEntity);
					}
				}
			},
			addShopUserTap(newUser, shopUserEntity) {
				var that = this
				let interface_code = 'addShopUser';
				let interface_parameters = util.obj2str([newUser, shopUserEntity]);
				$post('/oauth2/resources', {
					interface_code,
					interface_parameters
				}).then(data => {
					if (data.RetCode == '000000') {
						if (data.Result) {
							uni.navigateBack()
						}
					} else {
						uni.showModal({
							title: '添加员工失败',
							content: data.Result
						})
					}
				})
			},
			updateShopUserTap(newUser, shopUserEntity){
			var that = this
			let interface_code = 'updateShopUser';
			let interface_parameters = util.obj2str([newUser, shopUserEntity]);
            console.log(interface_parameters)
			$post('/oauth2/resources', {
				interface_code,
				interface_parameters
			}).then(data => {
				debugger
				if (data.RetCode == '000000') {
					if (data.Result) {
						uni.navigateBack()
					}
				} else {
					uni.showModal({
						title: '添加员工失败',
						content: data.Result
					})
				}
			})
			},
		}
	}
</script>

<style>
	@import url('../../ym.css');

	.item {
		height: 90rpx;
		width: 100%;
		padding-left: 20rpx;
		padding-right: 20rpx;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #efeff4;
	}

	.tit {
		flex-shrink: 0;
		padding-right: 10rpx;
	}

	.txt {
		height: 40rpx;
	}

	.sel {
		border-bottom: 2px solid #05c0ab;
	}

	.btn-wrap {
		margin-top: 60rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
	}

	.btn {
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #05c0ab;
		color: white;
	}
</style>
