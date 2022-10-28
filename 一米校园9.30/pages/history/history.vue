<template>
	<view class="global">

		<view class="nav">
			<view class="text">经营情况历史查询</view>
			<image src="../../static/tabBar/ddgls.png" mode="widthFix" class="icon" @click="xxmm"></image>
		</view>
		<view style="margin-top: 50px;" v-for="(item,index) in entityList" :key="index">
			<view class="date">统计日期: {{item.BalanceDate}}</view>
			<view style="background-color: white;">
				<view class="total-revenue">
					<view>营业总收入：</view>
					<view style="color: red;">{{item.TotalAmount}}</view>
				</view>
				<view class="revenue">其中：在线支付收入：{{item.OnLineAmount}}</view>
				<view class="revenue">其中：货到付款收入：{{item.CodAmount}}</view>
				<view class="total-revenue" v-if="item.ValidOrderCount!=null">
					<view>营业总账单数：</view>
					<view style="color: red;">{{(item.ValidOrderCount*100+item.InvalidOrderCount*100)/100}}</view>
				</view>
				<view class="revenue" v-if="item.ValidOrderCount!=null">其中：有效订单数：{{item.ValidOrderCount}}</view>
				<view class="revenue" v-if="item.ValidOrderCount!=null">其中：无效订单数：{{item.InvalidOrderCount}}</view>
				<view class="total-revenue">
					<view>营业总支出：</view>
					<view style="color: red;">{{item.TotalExpense}}</view>
				</view>
				<view class="revenue">其中：在线支付手续费：{{item.OnLineCounterFee}}</view>
				<view class="revenue">其中：在线支付退款：{{item.OnLineRefundAmount}}</view>
				<view class="revenue">其中：平台服务费：{{item.MemberCounterFee}}</view>
				<view class="revenue" v-if="item.DeliveryCounterFee && item.DeliveryCounterFee>0">
					其中：配送服务费：{{item.DeliveryCounterFee}}</view>
				<view class="revenue" v-if="item.DeliveryUserPay && item.DeliveryUserPay>0">
					其中：用户服务费：{{item.DeliveryUserPay}}</view>
				<view class="revenue" v-if="item.AllowanceFee && item.AllowanceFee>0">平台补贴金额：{{item.AllowanceFee}}
				</view>
				<view class="total-revenue">
					<view>营业净利润：</view>
					<view style="color: red;">{{item.TotalProfit}}</view>
				</view>
			</view>
		</view>

		<uni-popup ref="xxmm" type="dialog">
			<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确定" title=" " @confirm="qd" @close="qx">
				<view>
					<view class="clear" @click="clear">
						<view>清除筛选</view>
						<image src="../../static/tabBar/wds.png" mode="widthFix" style="width: 18px;"></image>
					</view>

					<view class="data-chage">
						<view>开始时间</view>
						<view class="data-right">
							<view class="data">
								<picker mode="date" :value="startdate" :start="startDate" :end="endDate"
									@change="bindDateChangea">
									<view style="display: flex;">
										{{startdate}}
										<view style="margin-top: 6px;">
											<image src="../../static/image/rights.png" mode="widthFix"
												style="width: 22px;">
											</image>
										</view>
									</view>
								</picker>
							</view>

						</view>
					</view>

					<view class="data-chage">
						<view>结束时间</view>
						<view class="data-right">
							<view class="data">
								<picker mode="date" :value="enddate" :start="startDate" :end="endDate"
									@change="bindDateChangeb">
									<view style="display: flex;">
										{{enddate}}
										<view style="margin-top: 6px;">
											<image src="../../static/image/rights.png" mode="widthFix"
												style="width: 22px;">
											</image>
										</view>
									</view>
								</picker>
							</view>
						</view>
					</view>

				</view>
			</uni-popup-dialog>
		</uni-popup>

	</view>
</template>

<script>
	const util = require('@/utils/utils.js');
	const app = require('@/utils/app.js');
	const baseUtil = require('@/utils/baseUtil.js')
	import {
		$http,
		$get,
		$post
	} from '@/utils/api.js';

	export default {

		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				msgType: 'success',
				date: currentDate,
				startdate: '',
				enddate: '',
				entityList: [],
				shopId: '',
				pageIndex: 1,
				pageSize: 5,
				pageCount: 1,
				rowCount: 0
			}
		},

		mounted() {},
		onLoad: function(options) {
			let that = this;
			// 页面初始化 options为页面跳转所带来的参数
			if (options && options.shopId) {
				that.shopId = options.shopId;
				that.bindData();
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			bindData: function() {
				// debugger
				var that = this;
				// 显示加载
				if (uni.showLoading) {
					uni.showLoading({
						title: '努力加载中...',
					})
				} else {
					uni.showNavigationBarLoading();
				}

				var filters = [{
						tableAlias: "tab0",
						fieldName: "ShopId",
						expression: "=",
						value: that.shopId
					}

				];
				filters.push({
					tableAlias: "tab0",
					fieldName: "BalanceDate",
					expression: ">=",
					value: '2019-07-09'
				});
				if (that.startdate) {
					filters.push({
						tableAlias: "tab0",
						fieldName: "BalanceDate",
						expression: ">=",
						value: that.startdate
					});
				}
				if (that.enddate) {
					filters.push({
						tableAlias: "tab0",
						fieldName: "BalanceDate",
						expression: "<=",
						value: that.enddate
					});
				}
				var orderBys = [{
					tableAlias: "tab0",
					fieldName: "BalanceDate",
					orderType: "desc"
				}];
				var params = {
					entityClassName: "com.doshare.shop.model.DsShopBalance",
					pageIndex: that.pageIndex,
					pageSize: that.pageSize,
					includeExtField: true,
					excludeFields: null,
					filters: filters,
					orderBys: orderBys,
					extParas: null
				}
				let parameters = util.obj2str(params);
				let interface_parameters = util.obj2str([parameters]);
				let interface_code = 'getBalanceHistoryPageInfo';
				$post('/oauth2/resources', {
					interface_code,
					interface_parameters
				}).then(data => {
					console.log(data);
					if (data.RetCode == "000000") {
						if (data.Result && data.Result.EntityList) {
							that.pageCount = data.Result.PageCount;
							that.rowCount = data.Result.RowCount;
							that.entityList = [];
							that.entityList = that.entityList.concat(data.Result.EntityList);
							for (let i = 0; i < data.Result.EntityList.length; i++) {
								data.Result.EntityList[i]["TotalExpense"] = Math.round((data.Result.EntityList[
										i].DeliveryUserFee + data.Result.EntityList[i]
									.DeliveryCounterFee + data.Result.EntityList[i].DeliveryShopFee +
									data.Result.EntityList[i].MemberCounterFee + data.Result
									.EntityList[i].OnLineCounterFee + data.Result.EntityList[i]
									.OnLineRefundAmount) * 10) / 10;
								data.Result.EntityList[i]["DeliveryUserPay"] = Math.round((data.Result
									.EntityList[i].DeliveryShopFee + data.Result.EntityList[i]
									.DeliveryUserFee) * 10) / 10;
								data.Result.EntityList[i].TotalProfit = Math.round(data.Result.EntityList[i]
									.TotalProfit * 10) / 10;
							}
						}

					}
					//隐藏加载
					if (uni.hideLoading) {
						uni.hideLoading();
					} else {
						uni.hideNavigationBarLoading();
					}
				})

			},

			//时间筛选
			bindDateChangea: function(e) {
				this.startdate = e.detail.value;
			},
			bindDateChangeb: function(e) {
				this.enddate = e.detail.value;
			},

			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			//弹窗
			xxmm() {
				this.$refs.xxmm.open()
			},
			qd() {
				var that = this;
				console.log(that.startdate, that.enddate);
				that.bindData();
			},
			qx() {
				console.log("取消");
			},
			//清除筛选
			clear() {
				this.startdate = '';
				this.enddate = '';
			},
		},
		onReachBottom: function(e) {
			if (this.pageIndex == this.pageCount) return;
			this.pageIndex++;
			this.bindData();
		},

	}
</script>

<style lang="scss" scoped>
	.nav {
		position: fixed;
		width: 100%;
		background-color: #fff;
		top: 0;
		display: flex;
		justify-content: space-between;
		padding: 10px 0;

	}

	.icon {
		width: 30rpx;
		margin-right: 20px;
		margin-top: 3px;
	}

	.text {
		margin-left: 30%;
		font-size: 32rpx;
		color: #45cfcf;
	}

	.date {
		background-color: #45cfcf;
		color: #fff;
		padding: 5px 10px;
		margin-top: 5px;
	}

	.total-revenue {
		display: flex;
		padding: 5px 10px;
	}

	.revenue {
		padding: 5px 20px;
	}

	.clear {
		display: flex;
		float: right;
		margin-bottom: 10px;
	}

	.data-chage {
		display: flex;
		justify-content: space-between;
		border: 1px solid #eee;
		margin-top: 10px;
		padding: 0px 5px;
		width: 500rpx;
		height: 40px;
		line-height: 40px;

	}

	.data-right {
		display: flex;
	}

	.data {
		font-size: 22rpx;
		color: #8a8a8a;
		display: flex;
	}
</style>
