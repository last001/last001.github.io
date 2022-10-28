<template>
	<view class="global">
		<!-- 菜单 -->
		<view class="tab">
			<view class="tab-item" :class="[curTab.tabIndex=='0'?'act':'']" @click="tabSel" data-index="0"
				data-ordertype="new">
				<view class="tab-num">{{orderNum.NewNums}}</view>
				<view class="tab-word">新</view>
				<text class="tab-tit">新订单</text>
			</view>
			<view class="tab-item" :class="[curTab.tabIndex=='1'?'act':'']" @click="tabSel" data-index="1"
				data-ordertype="delivery">
				<view class="tab-num">{{orderNum.DeliveryNums}}</view>
				<view class="tab-word">送</view>
				<text class="tab-tit">待配送</text>
			</view>
			<view class="tab-item" :class="[curTab.tabIndex=='2'?'act':'']" @click="tabSel" data-index="2"
				data-ordertype="reminder">
				<view class="tab-num">{{orderNum.ReminderNums}}</view>
				<view class="tab-word">催</view>
				<text class="tab-tit">催单</text>
			</view>
			<view class="tab-item" :class="[curTab.tabIndex=='3'?'act':'']" @click="tabSel" data-index="3"
				data-ordertype="refund">
				<view class="tab-num">{{orderNum.RefundNums}}</view>
				<view class="tab-word">退</view>
				<text class="tab-tit">退款</text>
			</view>
		</view>

		<view v-show="curTab.tabIndex == 0" class="content">
			<view v-for="(item,index) in entityList" :key="index">
				<view class="content-box">
					<view class="line">
						<view>{{item.LinkMan}}</view>
						<view class="messages">
							<view class="message">
								<view>#已下单</view>
								<view style="color: red;">{{item.OrderTimes}}</view>
								<view>次</view>
							</view>
							<view class="number">{{item.PrintNo}}</view>
							<view class="state">{{item.OrderStatusName}}</view>
						</view>
					</view>
					<view class="line">
						<view class="lines">
							<view>{{item.Telephone}}</view>
						</view>
					</view>
					<view class="line">
						<view>{{item.Address}}</view>
					</view>
					<view class="line">
						<view class="time-state">
							<view class="time">{{item.OrderDate}}</view>
							<view class="pay-state">
								<view>{{item.PayStatusName}}</view>
							</view>
							<view class="distribution">
								<view>{{item.DeliveryTypeText}}</view>
							</view>
						</view>
					</view>
					<view class="goods-details">
						<view class="goods-detail" @click="detail(item)">
							<view style="padding-top: 10rpx;">商品明细</view>
							<image src="../../static/image/rights.png" style="width: 30px;" mode="widthFix"></image>
						</view>
					</view>
					<view class="nav-box">
						<view class="nav">
							<view class="print" @click="print(item)">打印订单</view>
							<view class="print">
								<picker :value="index" :range="cancelReasonList" @change="cancelOrderTap(item,$event)">
									取消订单
								</picker>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="fy">
				<uni-pagination @change="change" :total="orderNum.NewNums" :pageSize="pageSize" :current="pageIndex"
					prev-text="上一页" next-text="下一页" />
			</view>
		</view>

		<view v-show="curTab.tabIndex == 1" class="content">
			<view v-for="(item,index) in entityList" :key="index">
				<view class="content-box">
					<view class="line">
						<view>{{item.LinkMan}}</view>
						<view class="messages">
							<view class="message">
								<view>#已下单</view>
								<view style="color: red;">{{item.OrderTimes}}</view>
								<view>次</view>
							</view>
							<view class="number">{{item.PrintNo}}</view>
							<view class="state">{{item.OrderStatusName}}</view>
						</view>
					</view>
					<view class="line">
						<view class="lines">
							<view>{{item.Telephone}}</view>
						</view>
					</view>
					<view class="line">
						<view>{{item.Address}}</view>
					</view>
					<view class="line">
						<view class="time-state">
							<view class="time">{{item.OrderDate}}</view>
							<view class="pay-state">
								<view>{{item.PayStatusName}}</view>
							</view>
							<view class="distribution">
								<view>{{item.DeliveryTypeText}}</view>
							</view>
						</view>
					</view>
					<view class="goods-details">
						<view class="goods-detail" @click="detail(item)">
							<view style="padding-top: 10rpx;">商品明细</view>
							<image src="../../static/image/rights.png" style="width: 30px;" mode="widthFix"></image>
						</view>
					</view>
					<view class="nav-box">
						<view class="nav">
							<view class="print" @click="print(item)">打印订单</view>
							<view class="print">
								<picker :value="index" :range="cancelReasonList" @change="cancelOrderTap(item,$event)">
									取消订单
								</picker>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="fy">
				<uni-pagination @change="change" :total="orderNum.DeliveryNums" :pageSize="pageSize"
					:current="pageIndex" prev-text="上一页" next-text="下一页" />
			</view>
			<!-- <uni-load-more @clickLoadMore="clickLoadMore" color="#007AFF" :status="status"
				:content-text="contentText" /> -->
		</view>

		<view v-show="curTab.tabIndex == 2" class="content">
			<view v-for="(item,index) in entityList" :key="index">
				<view class="content-box">
					<view class="line">
						<view>{{item.LinkMan}}</view>
						<view class="messages">
							<view class="message">
								<view>#已下单</view>
								<view style="color: red;">{{item.OrderTimes}}</view>
								<view>次</view>
							</view>
							<view class="number">{{item.PrintNo}}</view>
							<view class="state">{{item.OrderStatusName}}</view>
						</view>
					</view>
					<view class="line">
						<view class="lines">
							<view>{{item.Telephone}}</view>

						</view>
					</view>
					<view class="line">
						<view>{{item.Address}}</view>
					</view>
					<view class="line">
						<view class="time-state">
							<view class="time">{{item.OrderDate}}</view>
							<view class="pay-state">
								<view>{{item.PayStatusName}}</view>
							</view>
							<view class="distribution">
								<view>{{item.DeliveryTypeText}}</view>
							</view>
						</view>
					</view>
					<view class="goods-details">
						<view class="goods-detail" @click="detail(item)">
							<view style="padding-top: 10rpx;">商品明细</view>
							<image src="../../static/image/rights.png" style="width: 30px;" mode="widthFix"></image>
						</view>
					</view>
					<view class="nav-box">
						<view class="nav">
							<view class="print" @click="print(item)">打印订单</view>
							<view class="print">
								<picker :value="index" :range="cancelReasonList" @change="cancelOrderTap(item,$event)">
									取消订单
								</picker>
							</view>
							<view class="print" @click="read(item)">我知道了</view>
						</view>
					</view>
				</view>
			</view>
			<view class="fy">
				<uni-pagination @change="change" :total="orderNum.ReminderNums" :pageSize="pageSize"
					:current="pageIndex" prev-text="上一页" next-text="下一页" />
			</view>
		</view>

		<view v-show="curTab.tabIndex == 3" class="content">
			<view v-for="(item,index) in entityList" :key="index">
				<view class="content-box">
					<view class="line">
						<view>{{item.LinkMan}}</view>
						<view class="messages">
							<view class="message">
								<view>#已下单</view>
								<view style="color: red;">{{item.OrderTimes}}</view>
								<view>次</view>
							</view>
							<view class="number">{{item.PrintNo}}</view>
							<view class="state">{{item.OrderStatusName}}</view>
						</view>
					</view>
					<view class="line">
						<view class="lines">
							<view>{{item.Telephone}}</view>

						</view>
					</view>
					<view class="line">
						<view>{{item.Address}}</view>
					</view>
					<view class="line">
						<view class="time-state">
							<view class="time">{{item.OrderDate}}</view>
							<view class="pay-state">
								<view>{{item.PayStatusName}}</view>
							</view>
							<view class="distribution">
								<view>{{item.DeliveryTypeText}}</view>
							</view>
						</view>
					</view>
					<view class="goods-details">
						<view class="goods-detail" @click="detail(item)">
							<view style="padding-top: 10rpx;">商品明细</view>
							<image src="../../static/image/rights.png" style="width: 30px;" mode="widthFix"></image>
						</view>
					</view>
					<view class="nav-box">
						<view class="nav">
							<view class="print" @click="agreerefund(item)">同意退款</view>
							<view class="print" @click="refuserefund(item)">拒绝退款</view>

						</view>
					</view>
				</view>
			</view>
			<view class="fy">
				<uni-pagination @change="change" :total="orderNum.RefundNums" :pageSize="pageSize" :current="pageIndex"
					prev-text="上一页" next-text="下一页" />
			</view>
		</view>

		<!-- 同意退款 -->
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="msgType" cancelText="关闭" confirmText="同意" title="同意退款" content="确认要同意顾客的退款要求吗？"
				@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
		<!-- 拒绝退款 -->
		<uni-popup ref="refuse" type="dialog">
			<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确定" title="拒绝退款" content="确认要拒绝顾客的退款要求吗？？"
				@confirm="Confirm" @close="Close"></uni-popup-dialog>
		</uni-popup>

	</view>
</template>

<script>
	const util = require('@/utils/utils.js');
	const app = require('@/utils/app.js')
	// var apps = getApp();
	import {
		$http,
		$get,
		$post
	} from '@/utils/api.js';

	const PrinterJobs = require('@/utils/printerjobs.js');
	const bluetooth = require('@/utils/bluetooth.js');
	const printerutil = require('@/utils/printerutil.js');

	function inArray(arr, key, val) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i][key] === val) {
				return i;
			}
		}
		return -1;
	}

	// ArrayBuffer转16进度字符串示例
	function ab2hex(buffer) {
		const hexArr = Array.prototype.map.call(new Uint8Array(buffer), function(bit) {
			return ('00' + bit.toString(16)).slice(-2);
		});
		return hexArr.join(',');
	}

	function str2ab(str) {
		// Convert str to ArrayBuff and write to printer
		let buffer = new ArrayBuffer(str.length);
		let dataView = new DataView(buffer);
		for (let i = 0; i < str.length; i++) {
			dataView.setUint8(i, str.charAt(i).charCodeAt(0));
		}
		return buffer;
	}


	export default {
		data() {
			return {
				msgType: 'info',
				id: '',
				curShop: [],
				curTab: {
					tabIndex: "1",
					orderType: "delivery"
				},
				entityList: [],
				cancelReasonList: ["暂停营业", "无法配送到指定地址", "商品已断货", "其他原因"],
				index: 0,
				orderNum: {
					NewNums: 0,
					DeliveryNums: 0,
					ReminderNums: 0,
					RefundNums: 0
				},

				pageIndex: 1, //当前页数
				pageSize: 10, //10条1页
				pageCount: 1, //总页数
				rowCount: 0, //

				// status: 'more',
				// statusTypes: [{
				// 	value: 'more',
				// 	text: '加载前',
				// 	checked: true
				// }, {
				// 	value: 'loading',
				// 	text: '加载中',
				// 	checked: false
				// }, {
				// 	value: 'noMore',
				// 	text: '没有更多',
				// 	checked: false
				// }],
				// contentText: {
				// 	contentdown: '查看更多',
				// 	contentrefresh: '加载中',
				// 	contentnomore: '没有更多'
				// }
			}
		},
		onLoad() {
			this.login()
		},
		//每次进入页面时刷新订单列表
		onShow: function(option) {
			var that = this;
			if (app.curShop.Id) {
				that.rebind()
			}
		},
		mounted() {},

		methods: {
			login() {
				var that = this;
				var userid = uni.getStorageSync("userDate").userid;
				if (userid) {
					that.shoplist()
				} else {
					var uuid = null
					//#  //#ifdef APP-PLUS
					plus.device.getInfo({
						success: function(e) {
							uuid = e.uuid
							if (uuid) {
								uni.request({
									url: app.url + '/oauth2/getmanagerinfoforapp',
									method: "POST",
									data: {
										clientId: '1mshop',
										openId: uuid,
										code: uuid
									},
									success(res) {
										// console.log(res);
										if (res.data.userid) {
											uni.setStorageSync('userDate', res.data);
											that.shoplist()
										} else {
											uni.reLaunch({
												url: '/pages/index/index'
											})
										}
									},
									fail(err) {
										console.log(err);
									}
								})
							}
						},
						fail: function(e) {
							console.log(e);
						}
					});
					// #endif

					// #ifdef H5
					uuid = '73c27a13e8ce063d'
					if (uuid) {
						uni.request({
							url: app.url + '/oauth2/getmanagerinfoforapp',
							method: "POST",
							data: {
								clientId: '1mshop',
								openId: uuid,
								code: uuid
							},
							success(res) {
								console.log(res);
								if (res.data.userid) {
									uni.setStorageSync('userDate', res.data);
									that.shoplist()
								} else {
									uni.reLaunch({
										url: '/pages/index/index'
									})
								}
							},
							fail(err) {
								console.log(err);
							}
						})
					}
					// #endif
				}
			},
			//获取商圈信息
			getTradeAreaList() {
				var that = this;
				let interface_code = 'getTradeAreaListByApp';

				$post('/oauth2/resources', {
					interface_code,
					interface_parameters: "[\"1mapp\"]",
				}).then(res => {
					console.log(res);
					console.log("获取商圈信息成功");
					if (res.RetCode == "000000") {
						if (res.Result.length > 0) {
							that.getManageShopList(res.Result[0].Id);
						}
					} else {
						that.shoplist()
					}
				})
			},

			//获取当前用户的管理商户列表
			getManageShopList(tradeAreaId) {
				let that = this;
				let searchKey = '';
				let interface_parameters = util.obj2str([tradeAreaId, searchKey]);
				let interface_code = "getUserShopListBySearch";

				$post('/oauth2/resources', {
					interface_code,
					interface_parameters
				}).then(res => {
					console.log(res);
					console.log("获取当前用户管理商户列表成功");
					if (res.RetCode == "000000") {
						if (res.Result) {
							app.curShop = res.Result[0];
							that.rebind()
						}
					}
				})
			},

			shoplist() {
				uni.showLoading({
					title: '加载中'
				})
				let interface_code = 'getUserShopList';
				$post('/oauth2/resources', {
					interface_code
				}).then(res => {
					uni.hideLoading()
					if (res.RetCode == "000000") {
						app.curShop = res.Result[0];
						console.log(app.curShop);
						this.rebind();
					}
				})
			},

			rebind() {
				this.pageIndex = 1;
				this.entityList = [];
				this.bindData();
			},

			bindData() {
				var that = this;
				let shopId = app.curShop.Id;
				console.log(shopId);
				uni.setStorageSync('shopId', shopId)
				// let shopId = "321D9F961CFE4F8DA5492D75D9D77DB4";
				let orderType = this.curTab.orderType;
				let pageIndex = this.pageIndex;
				let pageSize = this.pageSize;
				let interface_parameters = util.obj2str([shopId, orderType, pageIndex, pageSize]);
				let curShop = app.curShop;
				let interface_code = 'getOrderPageInfoByType';

				$post('/oauth2/resources', {
					interface_code,
					interface_parameters
				}).then(res => {
					if (res.RetCode == "000000") {
						that.entityList = res.Result.Page.EntityList
						if (res.RetCode == "000000") {
							if (res.Result && res.Result.Page.EntityList) {
								that.pageCount = res.Result.Page.PageCount;
								that.rowCount = res.Result.Page.RowCount;
							}
							that.orderNum = res.Result.Ordernum;
							that.loadingComplete = false;
							if (res.Result.Page.PageCount == res.Result.Page.PageIndex) {
								res.loadingComplete = true;
							}
						}
					}
				})

			},

			tabSel(e) {
				var that = this;
				this.curTab.tabIndex = e.currentTarget.dataset.index;
				this.curTab.orderType = e.currentTarget.dataset.ordertype;
				this.rebind();
			},

			//分页加载
			change(e) {
				console.log(e, "点到分页中的第几页", e.current);
				if (e.type == "next") {
					this.pageIndex++; //触底加载可用
				} else {
					this.pageIndex = e.current;
				}
				this.bindData()
			},
			// 取消订单
			cancelOrderTap: function(item, e) {
				console.log(item.Id, e);
				let that = this;
				let n = e.detail.value;
				let cancelReason = that.cancelReasonList[n];

				let interface_code = 'cancelOrder';
				let interface_parameters = util.obj2str([item.Id, 'shop', '', cancelReason]);
				$post('/oauth2/resources', {
					interface_code,
					interface_parameters,
				}).then(data => {
					if (data.RetCode == "000000") {
						console.log("取消成功");
						uni.showToast({
							title: '订单已成功取消',
							icon: 'success',
							duration: 1000
						})
						//取消成功刷新订单信息
						that.rebind();
					} else {
						uni.showModal({
							title: '订单取消失败',
						})
					}
				})
			},
			//我知道了
			read: function(item) {
				console.log(item);
				let interface_code = 'markMessageReadByOrderId';
				let interface_parameters = util.obj2str([item.Id]);
				// let parameters = util.obj2str(item.Id);
				// let interface_parameters = util.obj2str([parameters]);
				$post('/oauth2/resources', {
					interface_code,
					interface_parameters,
				}).then(data => {
					if (data.RetCode == "000000") {
						console.log("已读");
						uni.showToast({
							title: '操作成功',
							icon: 'success',
							duration: 1000
						})
						//同意接单后刷新订单列表
						this.rebind();
					} else {
						uni.showModal({
							title: '操作失败',
						})
					}
				})
			},

			//同意退款
			agreerefund(item) {
				this.$refs.alertDialog.open();
				this.id = item.Id;
			},
			dialogConfirm() {
				var that = this;
				console.log(that.id);
				let interface_code = 'agreeRefund';
				let interface_parameters = util.obj2str([that.id]);
				$post('/oauth2/resources', {
					interface_code,
					interface_parameters,
				}).then(res => {
					console.log(res);
					if (res.RetCode == "000000") {
						uni.showModal({
							title: '退款成功',
						})
						that.rebind();
					} else {
						uni.showModal({
							title: '退款失败',
						})
					}
				})
			},
			dialogClose() {
				console.log('点击关闭')
			},

			//拒绝退款
			refuserefund(item) {
				this.$refs.refuse.open();
				this.id = item.Id;
			},
			Confirm() {
				let interface_code = 'disAgreeRefund';
				console.log(this.id)
				let interface_parameters = util.obj2str([this.id]);
				$post('/oauth2/resources', {
					interface_code,
					interface_parameters,
				}).then(res => {
					console.log(res);
					if (res.RetCode == "000000") {
						uni.showModal({
							title: '已拒绝退款',
						})
						this.rebind();
					} else {
						uni.showModal({
							title: '拒绝退款失败',
						})

					}
				})
			},
			Close() {
				console.log('点击关闭')
			},

			//订单详情
			detail(item) {
				console.log(item, "999999999999999999999999999");
				uni.setStorageSync('Id', item)
				uni.navigateTo({
					url: '/pages/order/order-detail'
				})
			},

			/* 打印 */
			print(item) {
				console.log(item);
				var printerJobs = new PrinterJobs()
				printerJobs
					.println()
					.setAlign('ct')
					.print('*****' + '一米校园生活' + '*****')
					.setSize(1, 1)
					.print('')
					.setSize(2, 2)
					.print(item.ShopName)
					.setSize(1, 1)
					.print('')
					.setSize(2, 2)
					.print('[' + item.PayStatusName + ']' + '(' + item.DeliveryTypeText + ')')
				printerJobs
					.setSize(1, 1)
					.print('')
				printerJobs
					.setAlign('lt')
					.setSize(1, 1)
					.print('下单时间:' + item.OrderDate)
					.print('')
					.print('订单编号:' + (item.PrintNo ? item.PrintNo : '无'))
					.print('')
					// .print('顾客名称:' + (item.LinkMan ? item.LinkMan : '匿名') + '【下单次数' + item.OrderTimes + '】')
					.print('顾客名称:' + (item.LinkMan ? item.LinkMan : '匿名'))
					.print('')
					.setSize(2, 2)
					.print('联系电话:' + (item.Telephone ? item.Telephone : 'null'))
					.print('')
					.setSize(1, 1)
				if (item.Remark) {
					printerJobs.print('备注:' + item.Remark)
				}
				printerJobs
					.print('')
				printerJobs.setSize(2, 2)
					.print('送货地点:' + (item.Address ? item.Address : 'null'))
					.setSize(1, 1)
				printerJobs.setSize(1, 1)
					.print()
				for (var x in this.orderlist) {
					printerJobs.print((this.orderlist[x].ProductName + ' *' + this.orderlist[x].OrderCount) + '  ' +
						this.orderlist[x].RealOrderAmount)
				}
				if (item.OrderBenefitList && item.OrderBenefitList.length > 0) {
					printerJobs.print()
					for (var y in item.OrderBenefitList) {
						if (item.OrderBenefitList[y].BenefitType == 'FullCut') {
							printerJobs.print('满减优惠：-' + item.OrderBenefitList[y].BenefitAmount + '元')
						} else if (item.OrderBenefitList[y].BenefitType == 'FullSent') {
							printerJobs.print('满送优惠：' + item.OrderBenefitList[y].BenefitContent)
						} else if (item.OrderBenefitList[y].BenefitType == 'FirstCut') {
							if (item.OrderBenefitList[y].BenefitContent && item.OrderBenefitList[
									y].BenefitContent.startsWith("门店")) {
								printerJobs.print('门店新用户优惠：-' + item.OrderBenefitList[y].BenefitAmount)
							} else {
								printerJobs.print('平台新用户优惠：-' + item.OrderBenefitList[y].BenefitAmount)
							}
						} else if (item.OrderBenefitList[y].BenefitType == 'Coupon') {
							printerJobs.print('商家优惠劵：-' + item.OrderBenefitList[y].BenefitAmount)
						} else if (item.OrderBenefitList[y].BenefitType == 'PtCoupon') {
							printerJobs.print('商家优惠劵：-' + item.OrderBenefitList[y].BenefitAmount)
						} else if (item.OrderBenefitList[y].BenefitType == 'vipcoupon') {
							printerJobs.print('会员红包：-' + item.OrderBenefitList[y].BenefitAmount)
						}
					}
				}
				if ((item.IncrementRemark && (item.IncrementFee || item
						.IncrementFee >= 0)) || (item.DeliveryAmount && item.DeliveryAmount >
						0) || item.LunchBoxPrice && item.LunchBoxPrice > 0) {

					printerJobs.print()
					if (item.IncrementRemark && (item.IncrementFee || item
							.IncrementFee >= 0)) {
						printerJobs.print('附加费:' + (item.IncrementRemark + '' + (item
							.IncrementFee ? item.IncrementFee : '0')) + '元')
					}
					if (item.DeliveryAmount && item.DeliveryAmount > 0) {
						printerJobs.print('配送费:' + item.DeliveryAmount + '元')
					}
					if (item.LunchBoxPrice && item.LunchBoxPrice > 0) {
						printerJobs.print('餐盒费:' + item.LunchBoxPrice + '元')
					}
				}
				printerJobs.print()

				if (item.ShopBalanceAmount && item.ShopBalanceAmount > 0 && item
					.getEntrance && item.getEntrance == 'groupbuy') {
					printerJobs.print('【商户价：' + item.ShopBalanceAmount + '元】')
				} else {
					printerJobs.print('合计:' + (item.FactPayAmount ? item.FactPayAmount : '无'))
				}
				printerJobs.print('')
				printerJobs.setSize(1, 1)
					.print('支付类型:' + (item.PayType == 'online' ? '在线支付' : '货到付款'))
					.println()
					.println();
				let buffer = printerJobs.buffer();
				const maxChunk = 20;
				const delay = 20;
				for (let i = 0, j = 0, length = buffer.byteLength; i < length; i += maxChunk, j++) {
					let subPackage = buffer.slice(i, i + maxChunk <= length ? (i + maxChunk) : length);
					setTimeout(this.writeBLECharacteristicValue, j * delay, subPackage);
				}

			},
			// 向蓝牙设备发送一个0x00的16进制数据
			writeBLECharacteristicValue: function(buffer) {
				uni.writeBLECharacteristicValue({
					deviceId: uni.getStorageSync('deviceId'),
					serviceId: uni.getStorageSync('serviceId'),
					characteristicId: uni.getStorageSync('characteristicId'),
					value: buffer,
					success(res) {
						console.log('writeBLECharacteristicValue success', res)
					},
					fail(res) {
						console.log('writeBLECharacteristicValue fail', res)
					}
				})
			},
			// //上拉加载更多
			// onChange(e) {
			// 	this.status = e.detail.value
			// },
			// clickLoadMore(e) {
			// 	uni.showToast({
			// 		icon: 'none',
			// 		title: "当前状态：" + e.detail.status
			// 	})
			// }

			//播报
			// connect() {
			// 	console.log("6666");
			// 	MQTT_OPTIONS.clientId = v4()

			// 	var that = this
			// 	// #ifdef H5
			// 	client = mqtt.connect('mqtt://' + MQTT_IP, MQTT_OPTIONS)
			// 	// #endif
			// 	// #ifdef MP-WEIXIN||APP-PLUS
			// 	client = mqtt.connect('wx://' + MQTT_IP, MQTT_OPTIONS)
			// 	// #endif
			// 	console.log(client)
			// 	client.on('connect', function() {
			// 		console.log('连接成功')
			// 		client.subscribe(that.topic, function(err) {
			// 			if (!err) {
			// 				console.log('订阅成功')
			// 				console.log(!err,"00000")
			// 			}
			// 		})

			// 	}).on('reconnect', function(error) {
			// 		console.log('正在重连...', that.topic)
			// 	}).on('error', function(error) {
			// 		console.log('连接失败...', error)
			// 	}).on('end', function() {
			// 		console.log('连接断开')
			// 	}).on('message', function(topic, message) {
			// 		console.log('接收信息：', message)
			// 		console.log('接收推送信息：', message.toString())
			// 		var msg = JSON.parse(message)
			// 		console.log("111",msg.messageType);
			// 		if(msg.messageType == '1'){
			// 			console.log("成功1")
			// 			that.playx()
			// 		}
			// 		else if(msg.messageType == '2'){
			// 			console.log("成功2");
			// 			that.playc()
			// 		}
			// 		else{
			// 			console.log("失败");
			// 		}
			// 	})
			// },

		}
	}
</script>

<style lang="scss">
	@import url('@/pages/pending/pending.css');
</style>
