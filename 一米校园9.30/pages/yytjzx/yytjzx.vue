<template>
	<view class="global">
		<view style="display: flex;width: 100%;">
			<view class="tab">
				<view class="tab-item" :class="[tabIndex=='0'?'act':'']" @click="tabSel" data-index="0">
					<text class="tab-tit">今日</text>
				</view>
				<view class="tab-item" :class="[tabIndex=='1'?'act':'']" @click="tabSel" data-index="1">
					<text class="tab-tit">昨日</text>
				</view>
				<view class="tab-item" :class="[tabIndex=='2'?'act':'']" @click="history">
					<text class="tab-tit">历史记录</text>
				</view>

			</view>
			<view class="img">
				<view class="imgb" @click="xxmm">
					<image src="../../static/tabBar/wds.png" mode="widthFix" style="width: 20px;"></image>
				</view>
				<view class="imgb" @click="screen">
					<image src="../../static/tabBar/wds.png" mode="widthFix" style="width: 20px;"></image>
				</view>
			</view>
		</view>

		<view v-show="tabIndex == 0" class="content">
			<view class="nav">
				<view class="nav-bgc"></view>
				<view class="nav-text">{{filter.dataStr}}营业数据</view>
			</view>

			<view class="content-block">
				<view class="content-block-right">
					<view>营业统计</view>
					<view class="content-block-text">总收入：￥{{businessStat.OrderAmount}}</view>
					<view class="content-block-text">在线支付金额：￥{{businessStat.OnLineAmount}}</view>
					<view class="content-block-text">货到付款金额：￥{{businessStat.OfflineAmount}}</view>
					<view class="content-block-text">堂食支付金额：￥{{businessStat.InstoreAmount}}</view>
					<view class="content-block-text">会员支付金额：￥{{businessStat.MemberAmount}}</view>
					<view class="content-block-text">商户号结算金额：￥{{businessStat.MpShopBalanceAmount}}</view>
					<view class="content-block-text">银联结算金额：￥{{businessStat.UpShopBalanceAmount}}</view>
					<view class="content-block-text">营业净利润：￥{{businessStat.TotalShoPprofit}}</view>
					<block
						v-if="userData && userData.UserType && userData.UserType=='M' && curTradeArea.Client && curTradeArea.isAliPay && curTradeArea.isAliPay=='1'">
						<view class="content-block-text">
							微信客户端成交额：{{businessStat.WxClientOrderAmount?businessStat.WxClientOrderAmount:0}}</view>
						<view class="content-block-text">
							支付宝客户端成交额：{{businessStat.AliClientOrderAmount?businessStat.AliClientOrderAmount:0}}</view>
					</block>
				</view>
				<view class="content-block-left">
					<view>订单统计</view>
					<view class="content-block-text">有效订单数：￥{{businessStat.ValidOrderCount}}</view>
					<view class="content-block-text">无效订单数：￥{{businessStat.InvalidOrderCount}}</view>
					<view class="content-block-text">在线订单数：￥{{businessStat.OnLineOrderCount}}</view>
					<view class="content-block-text">线下订单数：￥{{businessStat.OfflineOrderCount}}</view>
					<view class="content-block-text">微信订单数：￥{{businessStat.OrderWxCount}}</view>
					<block
						v-if="userData && userData.UserType && userData.UserType=='M'&& curTradeArea.Client && curTradeArea.isAliPay && curTradeArea.isAliPay=='1'">

						<view class="content-block-text">支付宝订单数：￥{{businessStat.OrderAliCount}}</view>
					</block>
					<view class="content-block-text">银联订单数：￥{{businessStat.OrderUpCount}}</view>
					<view class="content-block-text">食堂订单数：￥{{businessStat.InstoreOrderCount}}</view>
					<block v-if="businessStat.DeliveryCount && businessStat.DeliveryCount>0">
						<view class="content-block-text">配送订单数：￥{{businessStat.DeliveryCount}}</view>
					</block>
					<block
						v-if="userData && userData.UserType && userData.UserType=='M' && curTradeArea.Client && curTradeArea.isAliPay && curTradeArea.isAliPay=='1'">
						<view class="content-block-text">
							微信客户端订单数：{{businessStat.WxClientOrderCount?businessStat.WxClientOrderCount:0}}</view>
						<view class="content-block-text">
							支付宝客户端订单数：{{businessStat.AliClientOrderCount?businessStat.AliClientOrderCount:0}}</view>
					</block>
				</view>
			</view>
			<view class="content-block">
				<view class="content-block-right">
					<view>营业支出</view>
					<view class="content-block-text">手续费：￥{{businessStat.OlpCharges}}</view>
					<view class="content-block-text">订单退款：￥{{businessStat.RefundAmount}}</view>
					<view class="content-block-text">平台费：￥{{businessStat.Totalptuseincome}}</view>
					<view class="content-block-text"
						v-if="businessStat.DeliveryDeductPrice && businessStat.DeliveryDeductPrice>0">
						配送服务费:￥{{businessStat.DeliveryDeductPrice}}</view>
					<view class="content-block-text"
						v-if="businessStat.ShopDeliveryPrice && businessStat.ShopDeliveryPrice>0">
						配送提价费:￥{{businessStat.ShopDeliveryPrice}}</view>
					<view class="content-block-text" v-if="businessStat.ShopUnitFee && businessStat.ShopUnitFee>0">
						配送中转费:￥{{businessStat.ShopUnitFee}}</view>
					<view class="content-block-text"
						v-if="businessStat.DeliveryIncrementFee && businessStat.DeliveryIncrementFee>0">
						配送增值费:￥{{businessStat.DeliveryIncrementFee}}</view>
					<view class="content-block-text"
						v-if="businessStat.VipDeliveryPrice && businessStat.VipDeliveryPrice>0">
						配送专送费:￥{{businessStat.VipDeliveryPrice}}</view>
					<view class="content-block-text"
						v-if="businessStat.DeliveryUnitPrice && businessStat.DeliveryUnitPrice>0">
						用户配送费:￥{{businessStat.DeliveryUnitPrice}}</view>
				</view>
				<view class="content-block-left">
					<view>平台补贴</view>
					<block v-if="userData && userData.UserType && userData.UserType=='M'">
						<view class="content-block-text">优惠券补贴金额：￥{{businessStat.CouponAmount}}</view>
						<view class="content-block-text">首减补贴金额：￥{{businessStat.FirstCutAmount}}</view>
						<view class="content-block-text">满减补贴金额：￥{{businessStat.FullCutAmount}}</view>
						<view class="content-block-text">拼单补贴金额：￥{{businessStat.GroupBuyAmount}}</view>
						<view class="content-block-text">秒杀补贴金额：￥{{businessStat.SeckillAmount}}</view>
						<view class="content-block-text">特惠补贴金额：￥{{businessStat.SpecialAmount}}</view>
						<view class="content-block-text">会员补贴金额：￥{{businessStat.VipCouponAmount}}</view>
						<view class="content-block-text">平台补贴金额：￥{{businessStat.ShopSubsidyIncome}}</view>
						<view class="content-block-text">平台补贴单数：￥{{businessStat.ShopSubsidyCount}}</view>
						<view class="see">查看</view>
					</block>
				</view>
			</view>

		</view>

		<view v-show="tabIndex == 1" class="content">
			<view class="nav">
				<view class="nav-bgc"></view>
				<view class="nav-text">{{filter.dataStr}}营业数据</view>
			</view>

			<view class="content-block">
				<view class="content-block-right">
					<view>营业统计</view>
					<view class="content-block-text">总收入：￥{{businessStat.OrderAmount}}</view>
					<view class="content-block-text">在线支付金额：￥{{businessStat.OnLineAmount}}</view>
					<view class="content-block-text">货到付款金额：￥{{businessStat.OfflineAmount}}</view>
					<view class="content-block-text">堂食支付金额：￥{{businessStat.InstoreAmount}}</view>
					<view class="content-block-text">会员支付金额：￥{{businessStat.MemberAmount}}</view>
					<view class="content-block-text">商户号结算金额：￥{{businessStat.MpShopBalanceAmount}}</view>
					<view class="content-block-text">银联结算金额：￥{{businessStat.UpShopBalanceAmount}}</view>
					<view class="content-block-text">营业净利润：￥{{businessStat.TotalShoPprofit}}</view>
					<block
						v-if="userData && userData.UserType && userData.UserType=='M' && curTradeArea.Client && curTradeArea.isAliPay && curTradeArea.isAliPay=='1'">
						<view class="content-block-text">
							微信客户端成交额：{{businessStat.WxClientOrderAmount?businessStat.WxClientOrderAmount:0}}</view>
						<view class="content-block-text">
							支付宝客户端成交额：{{businessStat.AliClientOrderAmount?businessStat.AliClientOrderAmount:0}}</view>
					</block>
				</view>
				<view class="content-block-left">
					<view>订单统计</view>
					<view class="content-block-text">有效订单数：￥{{businessStat.ValidOrderCount}}</view>
					<view class="content-block-text">无效订单数：￥{{businessStat.InvalidOrderCount}}</view>
					<view class="content-block-text">在线订单数：￥{{businessStat.OnLineOrderCount}}</view>
					<view class="content-block-text">线下订单数：￥{{businessStat.OfflineOrderCount}}</view>
					<view class="content-block-text">微信订单数：￥{{businessStat.OrderWxCount}}</view>
					<block
						v-if="userData && userData.UserType && userData.UserType=='M'&& curTradeArea.Client && curTradeArea.isAliPay && curTradeArea.isAliPay=='1'">

						<view class="content-block-text">支付宝订单数：￥{{businessStat.OrderAliCount}}</view>
					</block>
					<view class="content-block-text">银联订单数：￥{{businessStat.OrderUpCount}}</view>
					<view class="content-block-text">食堂订单数：￥{{businessStat.InstoreOrderCount}}</view>
					<block v-if="businessStat.DeliveryCount && businessStat.DeliveryCount>0">
						<view class="content-block-text">配送订单数：￥{{businessStat.DeliveryCount}}</view>
					</block>
					<block
						v-if="userData && userData.UserType && userData.UserType=='M' && curTradeArea.Client && curTradeArea.isAliPay && curTradeArea.isAliPay=='1'">
						<view class="content-block-text">
							微信客户端订单数：{{businessStat.WxClientOrderCount?businessStat.WxClientOrderCount:0}}</view>
						<view class="content-block-text">
							支付宝客户端订单数：{{businessStat.AliClientOrderCount?businessStat.AliClientOrderCount:0}}</view>
					</block>
				</view>
			</view>
			<view class="content-block">
				<view class="content-block-right">
					<view>营业支出</view>
					<view class="content-block-text">手续费：￥{{businessStat.OlpCharges}}</view>
					<view class="content-block-text">订单退款：￥{{businessStat.RefundAmount}}</view>
					<view class="content-block-text">平台费：￥{{businessStat.Totalptuseincome}}</view>
					<view class="content-block-text"
						v-if="businessStat.DeliveryDeductPrice && businessStat.DeliveryDeductPrice>0">
						配送服务费:￥{{businessStat.DeliveryDeductPrice}}</view>
					<view class="content-block-text"
						v-if="businessStat.ShopDeliveryPrice && businessStat.ShopDeliveryPrice>0">
						配送提价费:￥{{businessStat.ShopDeliveryPrice}}</view>
					<view class="content-block-text" v-if="businessStat.ShopUnitFee && businessStat.ShopUnitFee>0">
						配送中转费:￥{{businessStat.ShopUnitFee}}</view>
					<view class="content-block-text"
						v-if="businessStat.DeliveryIncrementFee && businessStat.DeliveryIncrementFee>0">
						配送增值费:￥{{businessStat.DeliveryIncrementFee}}</view>
					<view class="content-block-text"
						v-if="businessStat.VipDeliveryPrice && businessStat.VipDeliveryPrice>0">
						配送专送费:￥{{businessStat.VipDeliveryPrice}}</view>
					<view class="content-block-text"
						v-if="businessStat.DeliveryUnitPrice && businessStat.DeliveryUnitPrice>0">
						用户配送费:￥{{businessStat.DeliveryUnitPrice}}</view>
				</view>
				<view class="content-block-left">
					<view>平台补贴</view>
					<block v-if="userData && userData.UserType && userData.UserType=='M'">
						<view class="content-block-text">优惠券补贴金额：￥{{businessStat.CouponAmount}}</view>
						<view class="content-block-text">首减补贴金额：￥{{businessStat.FirstCutAmount}}</view>
						<view class="content-block-text">满减补贴金额：￥{{businessStat.FullCutAmount}}</view>
						<view class="content-block-text">拼单补贴金额：￥{{businessStat.GroupBuyAmount}}</view>
						<view class="content-block-text">秒杀补贴金额：￥{{businessStat.SeckillAmount}}</view>
						<view class="content-block-text">特惠补贴金额：￥{{businessStat.SpecialAmount}}</view>
						<view class="content-block-text">会员补贴金额：￥{{businessStat.VipCouponAmount}}</view>
						<view class="content-block-text">平台补贴金额：￥{{businessStat.ShopSubsidyIncome}}</view>
						<view class="content-block-text">平台补贴单数：￥{{businessStat.ShopSubsidyCount}}</view>
						<view class="see">查看</view>
					</block>
				</view>
			</view>

		</view>

		<view v-show="tabIndex == 2" class="content">
		</view>

		<uni-popup ref="screen" type="dialog">
			<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确定" title="筛选条件" @confirm="qd" @close="qx">
				<view>
					<view class="data-chage">
						<view>筛选日期</view>
						<view class="data-right">
							<view class="data">
								<picker mode="date" :value="date" :start="startDate" :end="endDate"
									@change="bindDateChange">
									<view class="uni-input">{{date}}</view>
								</picker>
							</view>
							<image src="../../static/image/rights.png" mode="widthFix"
								style="width: 20px;margin-top: 11px;"></image>
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
				tabIndex: "0",
				msgType: 'success',
				title: 'picker',

				index: 0,
				date: currentDate,
				curShop: null,
				businessStat: {
					OrderAmount: null
				},
				shopBusinessObj: {
					WxWaitingBalance: 0,
					AliWaitingBalance: 0,
					MpShopBalanceAmount: 0,
					FinishedBalance: 0,
					UpWaitingBalance: 0,
					IsCanCash: "1",
					BalanceDate: ""
				},
				headList: [{
					Name: "今日",
					Value: "",
				}, {
					Name: "昨日",
					Value: "",
				}, {
					Name: "历史记录",
					Value: ""
				}],
				filter: {
					cover: false,
					curDate: '',
					tempDate: '',
					dataStr: ""
				},
				curTradeArea: '',
				userData: {
					UserType: "S"
				}

			}
		},
		watch: {

		},

		mounted() {
			// setTimeout(() => {
			// 	this.datetimesingle = Date.now() - 2 * 24 * 3600 * 1000
			// 	this.single = '2021-2-12'
			// 	this.datetimerange = ["2021-07-08 0:01:10", "2021-08-08 23:59:59"]
			// }, 3000)
		},
		onLoad(options) {
			var that = this;
			// options._mid = '1E5E86582EC54CD2AFEB854A886F86E6'
			options._mid = app.curShop.Id
			console.log(options._mid);
			that.getShopInfo(options._mid, function(data) {
				if (data) {
					that.curShop = data;
					that.headList[0].Value = util.getDateStr(null, 0);
					that.headList[1].Value = util.getDateStr(null, -1);
					that.filter.tempDate = that.headList[0].Value;
					that.filter.curDate = that.headList[0].Value;
					that.filter.dataStr = "今日实时";
					that.rebind();
				}
			});
			that.getUserInfo();
			if (app.curTradeArea && app.curTradeArea.Client && app.curTradeArea.Client.indexOf("AliPay") >= 0) {
				app.curTradeArea["isAliPay"] = "1";
				that.curTradeArea = app.curTradeArea
			};
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
			history() {
				uni.navigateTo({
					url: '/pages/history/history' + "?shopId=" + this.curShop.Id
				})
			},

			getUserInfo: function() {
				var that = this;
				let interface_code = 'getCurrentUser';
				$post('/oauth2/resources', {
					interface_code
				}).then(data => {
					if (data.RetCode == "000000" && data.Result) {
						that.userData = data.Result
					}
				})
			},
			getShopInfo: function(id, cb) {
				var that = this;
				let interface_code = 'getShopInfo';
				let interface_parameters = util.obj2str([id]);;
				$post('/oauth2/resources', {
					interface_code,
					interface_parameters,
				}).then(res => {
					if (res.RetCode == "000000" && res.Result) {
						typeof cb == "function" && cb(res.Result);
					} else {
						typeof cb == "function" && cb(false);
					}
				})
			},

			rebind() {
				this.getShopStatSubLedgerByDate();
				// this.getShopMerchantBalanceStat();
				// this.getShopUpBalanceStat();
			},

			//获取指定日期的营业数据
			getShopStatSubLedgerByDate: function() {
				var that = this;
				uni.showLoading({
					title: '正在加载中...',
				});
				that.businessStat = {
					AliShopBalanceAmount: 0,
					AliClientOrderAmount: 0,
					AliClientOrderCount: 0,
					CouponAmount: 0,
					DeliveryCount: 0,
					DeliveryDeductPrice: 0,
					DeliveryIncrementFee: 0,
					DeliveryNetProfit: 0,
					DeliveryUnitPrice: 0,
					FirstCutAmount: 0,
					FullCutAmount: 0,
					GroupBuyAmount: 0,
					InstoreAmount: 0,
					InstoreOrderCount: 0,
					InvalidOrderCount: 0,
					MemberAmount: 0,
					MpShopBalanceAmount: 0,
					OfflineAmount: 0,
					OfflineOrderCount: 0,
					OlpCharges: 0,
					OnLineAliAmount: 0,
					OnLineAmount: 0,
					OnLineOrderCount: 0,
					OnLineUpAmount: 0,
					OnLineWXAmount: 0,
					OrderAliCount: 0,
					OrderAmount: 0,
					OrderCount: 0,
					OrderUpCount: 0,
					OrderWxCount: 0,
					PtUseIncome: 0,
					RefundAmount: 0,
					SeckillAmount: 0,
					ShopDeliveryPrice: 0,
					ShopId: that.curShop.Id,
					ShopNetProfit: 0,
					ShopSubsidyCount: 0,
					ShopSubsidyIncome: 0,
					ShopUnitFee: 0,
					SpecialAmount: 0,
					SumDate: that.filter.curDate,
					TotalShoPprofit: 0,
					Totalptuseincome: 0,
					UpShopBalanceAmount: 0,
					ValidOrderCount: 0,
					VipCouponAmount: 0,
					VipDeliveryPrice: 0,
					WxClientOrderAmount: 0,
					WxClientOrderCount: 0,
					WxShopBalanceAmount: 0
				};
				var params = {
					entityClassName: "com.doshare.shop.model.DsSubLedgerStatByShop",
					pageIndex: 1,
					pageSize: 1,
					includeExtField: true,
					excludeFields: null,
					filters: [{
						tableAlias: "tab0",
						fieldName: "ShopId",
						expression: "=",
						value: that.curShop.Id
					}, {
						tableAlias: "tab0",
						fieldName: "SumDate",
						expression: "=",
						value: that.filter.curDate
					}],
					orderBys: [{
						tableAlias: "tab0",
						fieldName: "SumDate",
						orderType: "desc"
					}],
					extParas: null
				};
				console.log(params);
				baseUtil.getEntityPage4Json(params, function(data) {
					if (data && data.RetCode == "000000" && data.Result && data.Result.EntityList && data
						.Result.EntityList.length > 0) {
						that.businessStat = data.Result.EntityList[0]
						console.log(that.businessStat);
					};
					uni.hideLoading();
				})
			},
			//获取商户号结算及待结算数据
			getShopMerchantBalanceStat: function() {
				var that = this;
				var params = {
					entityClassName: "com.doshare.shop.model.DsShopBalance",
					pageIndex: 1,
					pageSize: 1,
					includeExtField: true,
					excludeFields: null,
					filters: [{
						tableAlias: "tab0",
						fieldName: "ShopId",
						expression: "=",
						value: that.curShop.Id
					}, {
						tableAlias: "tab0",
						fieldName: "IsCurrent",
						expression: "=",
						value: "1"
					}],
					orderBys: [{
						tableAlias: "tab0",
						fieldName: "BalanceDate",
						orderType: "desc"
					}],
					extParas: null
				};
				baseUtil.getEntityPage4Json(params, function(data) {
					if (data && data.RetCode == "000000" && data.Result && data.Result.EntityList && data
						.Result.EntityList.length > 0) {
						that.data.shopBusinessObj.FinishedBalance = data.Result.EntityList[0].Balance;
						that.data.shopBusinessObj.IsCanCash = data.Result.EntityList[0].IsCanCash;
						that.data.shopBusinessObj.BalanceDate = data.Result.EntityList[0].BalanceDate;
					} else {
						that.data.shopBusinessObj.IsCanCash = "0";
						that.data.shopBusinessObj.BalanceDate = that.data.headList[1].Value;
					};
					var entity = {
						entityClassName: "com.doshare.shop.model.DsSubLedgerStatByShop",
						pageIndex: 1,
						pageSize: (new Date(that.data.headList[0].Value) - new Date(that.data
							.shopBusinessObj.BalanceDate)) / (1000 * 60 * 60 * 24),
						includeExtField: true,
						excludeFields: null,
						filters: [{
							tableAlias: "tab0",
							fieldName: "ShopId",
							expression: "=",
							value: that.curShop.Id
						}, {
							tableAlias: "tab0",
							fieldName: "SumDate",
							expression: ">",
							value: that.shopBusinessObj.BalanceDate
						}],
						orderBys: [{
							tableAlias: "tab0",
							fieldName: "SumDate",
							orderType: "desc"
						}],
						extParas: null
					};
					that.data.shopBusinessObj.WxWaitingBalance = 0;
					that.data.shopBusinessObj.AliWaitingBalance = 0;
					that.data.shopBusinessObj.MpShopBalanceAmount = 0;
					baseUtil.getEntityPage4Json(entity, function(res) {
						if (res && res.RetCode == "000000" && res.Result && res.Result.EntityList &&
							res.Result.EntityList.length > 0) {
							for (var i in res.Result.EntityList) {
								that.data.shopBusinessObj.WxWaitingBalance += res.Result.EntityList[i]
									.WxShopBalanceAmount;
								that.data.shopBusinessObj.AliWaitingBalance += res.Result.EntityList[i]
									.AliShopBalanceAmount;
								that.data.shopBusinessObj.MpShopBalanceAmount += res.Result.EntityList[
									i].MpShopBalanceAmount;
							};
							that.data.shopBusinessObj.WxWaitingBalance = Math.round(that.data
								.shopBusinessObj.WxWaitingBalance * 100) / 100;
							that.data.shopBusinessObj.AliWaitingBalance = Math.round(that.data
								.shopBusinessObj.AliWaitingBalance * 100) / 100;
							that.data.shopBusinessObj.MpShopBalanceAmount = Math.round(that.data
								.shopBusinessObj.MpShopBalanceAmount * 100) / 100;
						};
						that.shopBusinessObj = that.data.shopBusinessObj
					})
				})
			},


			tabSel(e) {
				var that = this;
				var index = parseInt(e.currentTarget.dataset.index);
				this.tabIndex = e.currentTarget.dataset.index;
				that.filter.curDate = that.headList[index].Value;
				that.filter.tempDate = that.headList[index].Value;
				that.filter.dataStr = index == 0 ? "今日实时" : "昨日";
				that.getShopStatSubLedgerByDate();

			},

			bindDateChange: function(e) {
				this.date = e.detail.value
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

			xxmm() {
				uni.showLoading({
					title: '加载中'
				});
				console.log("刷新");
				this.rebind();
				// setTimeout(function() {
				uni.hideLoading();
				// }, 2000);
			},
			qd() {
				var that = this;
				that.filter.curDate = that.date;
				that.rebind()
				that.filter.dataStr = that.date;
			},
			qx() {
				console.log("取消");
			},

			screen() {
				this.$refs.screen.open()
			}
		}

	}
</script>

<style lang="less" scoped>
	.line {
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
	}

	.tab {
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-bottom: 1px solid #efeff4;
		background-color: white;
		width: 75%;
	}

	.tab-item {
		display: flex;
		align-items: center;

	}

	.tab-tit {
		font-size: 30rpx;
		margin: 15px 0;
	}

	.act .tab-tit {
		color: #05c0ab;
	}


	.nav {
		display: flex;
		border-bottom: 1px solid #eee;
		padding: 5px 0;
		height: 30px;
		line-height: 30px;
		background-color: white;
	}

	.nav-bgc {
		width: 3px;
		height: 16px;
		background-color: coral;
		margin-left: 5%;
		margin-top: 7px;
	}

	.nav-text {
		font-weight: 600;
		font-size: 30rpx;
		margin-left: 10px;
	}

	.content-block {
		display: flex;
		border-bottom: 1px solid #eee;
		justify-content: space-between;
		text-align: center;
		padding: 15px 0;
		background-color: white;
	}

	.content-block-right {
		flex: 1;
		border-right: 1px solid #eee;
	}

	.content-block-left {
		flex: 1;
	}

	.content-block-text {
		font-size: 20rpx;
		color: crimson;
		padding-top: 5px;
	}

	.see {
		width: 28%;
		height: 28px;
		background-color: #00aa7f;
		font-size: 26rpx;
		line-height: 28px;
		border-radius: 5px;
		color: white;
		margin-left: 36%;
		margin-top: 10px;
	}

	.img {
		display: flex;
		text-align: center;
		background-color: white;
		width: 25%;
		padding-top: 15px;
	}

	.imgb {
		margin-left: 10%;
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
	}
</style>
