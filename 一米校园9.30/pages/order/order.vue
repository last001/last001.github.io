<template>
	<view class="global">
		<view style="display: flex;position: fixed;top:0px">
			<view class="tab">
				<view class="tab-item" :class="[curTab.tabIndex=='0'?'act':'']" @click="tabSel" data-index="0">
					<text class="tab-tit">进行中</text>
				</view>
				<view class="tab-item" :class="[curTab.tabIndex=='1'?'act':'']" @click="tabSel" data-index="1">
					<text class="tab-tit">已完成</text>
				</view>
				<view class="tab-item" :class="[curTab.tabIndex=='2'?'act':'']" @click="tabSel" data-index="2">
					<text class="tab-tit">已取消</text>
				</view>
				<view class="tab-item" :class="[curTab.tabIndex=='3'?'act':'']" @click="tabSel" data-index="3">
					<text class="tab-tit">异常</text>
				</view>
				<view class="tab-item" :class="[curTab.tabIndex=='4'?'act':'']" @click="tabSel" data-index="4">
					<text class="tab-tit">预定</text>
				</view>
				<view class="tab-item" @click="xxmm">
					<image src="../../static/tabBar/wds.png" mode="widthFix" style="width: 20px;"></image>
				</view>
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
				<uni-pagination @change="change" :total="rowCount" :pageSize="pageSize" :current="pageIndex"
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
				</view>
			</view>
			<view class="fy">
				<uni-pagination @change="change" :total="rowCount" :pageSize="pageSize" :current="pageIndex"
					prev-text="上一页" next-text="下一页" />
			</view>
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
				</view>
			</view>
			<view class="fy">
				<uni-pagination @change="change" :total="rowCount" :pageSize="pageSize" :current="pageIndex"
					prev-text="上一页" next-text="下一页" />
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
				</view>
			</view>
			<view class="fy">
				<uni-pagination @change="change" :total="rowCount" :pageSize="pageSize" :current="pageIndex"
					prev-text="上一页" next-text="下一页" />
			</view>
		</view>

		<view v-show="curTab.tabIndex == 4" class="content">
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
							<view style="font-size: 24rpx;
								background-color: #095df9;
								color: #ffffff;
								border-radius: 10px;
								padding: 3px 7px;
								margin-left: 10px;">
								<view>预定{{item.SendTime}}送达</view>
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
						</view>
					</view>
				</view>
			</view>
			<view class="fy">
				<uni-pagination @change="change" :total="rowCount" :pageSize="pageSize" :current="pageIndex"
					prev-text="上一页" next-text="下一页" />
			</view>
		</view>

		<view v-if="!entityList || entityList.length<=0">您还没有相关的订单</view>

		<uni-popup ref="xxmm" type="dialog">
			<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确定" title=" " @confirm="qd" @close="qx">
				<view>
					<view class="clear" @click="clear">
						<view>清除筛选</view>
						<image src="../../static/tabBar/wds.png" mode="widthFix" style="width: 20px;"></image>
					</view>

					<view class="data-chage">
						<view>选择日期</view>
						<view class="data-right">
							<view class="data">
								<picker mode="date" :value="datea" :start="startDate" :end="endDate"
									@change="bindDateChange">
									<view class="uni-input">{{datea?datea:'请选择日期'}}</view>
								</picker>
							</view>
							<image src="../../static/image/rights.png" mode="widthFix"
								style="width: 20px;margin-top: 11px;"></image>
						</view>

					</view>
					<view class="data-chage">
						<view>开始时间</view>
						<view class="data-right">
							<view class="data">
								<picker mode="time" :value="timea" start="00:00" end="23:59" @change="bindTimeChangea">
									<view class="uni-input">{{timea?timea:'请选择开始时间'}}</view>
								</picker>
							</view>
							<image src="../../static/image/rights.png" mode="widthFix"
								style="width: 20px;margin-top: 11px;"></image>
						</view>

					</view>
					<view class="data-chage">
						<view>结束时间</view>
						<view class="data-right">
							<view class="data">
								<picker mode="time" :value="timeb" start="00:00" end="23:59" @change="bindTimeChangeb">
									<view class="uni-input">{{timeb?timeb:'请选择结束时间'}}</view>
								</picker>
							</view>
							<image src="../../static/image/rights.png" mode="widthFix"
								style="width: 20px;margin-top: 11px;"></image>
						</view>

					</view>
					<view class="data-chage">
						<uni-search-bar placeholder="联系人、手机号或打印编号" @confirm="search" :focus="true" v-model="searchValue"
							@input="input" @clear="clears">
						</uni-search-bar>

					</view>

				</view>
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	// import { v4 } from 'uuid';
	// import { MQTT_IP, MQTT_OPTIONS } from '@/utils/mqtt.js';
	// var mqtt = require('mqtt/dist/mqtt.js')
	// var client

	const util = require('@/utils/utils.js');
	const app = require('@/utils/app.js')
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
			const currentDate = this.getDate({
				format: true
			})
			return {
				//筛选搜索
				searchValue: '',
				//筛选时间
				msgType: 'success',
				date: currentDate,
				datea: null,
				timea: null,
				timeb: null,
				// topic: 'Topic_exchange', //要订阅的主题

				curShop: [],
				curTab: {
					tabIndex: "0",
				},

				filter: {
					curDate: '',
					beginTime: '',
					endTime: '',
					keyWord: ''
				},

				entityList: [],
				orderNum: {
					NewNums: 0,
					DeliveryNums: 0,
					ReminderNums: 0,
					RefundNums: 0
				},
				cancelReasonList: ["暂停营业", "无法配送到指定地址", "商品已断货", "其他原因"],
				index: 0,

				pageIndex: 1, //当前页数
				pageSize: 10, //10条1页
				pageCount: 1, //总页数
				rowCount: 0, //
			}
		},
		onLoad() {
			this.rebind()
		},

		onShow: function(option) {
			var that = this;
			if (app.curShop.Id && that.curShop.Id != app.curShop.Id) {
				that.rebind()
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
		mounted() {},
		methods: {
			// 取消订单
			cancelOrderTap: function(item, e) {
				let that = this;
				let n = e.detail.value;
				let cancelReason = that.cancelReasonList[n];
				console.log(item.Id, e, n);
				let interface_code = 'cancelOrder';
				let interface_parameters = util.obj2str([item.Id, 'shop', '', cancelReason]);
				$post('/oauth2/resources', {
					interface_code,
					interface_parameters,
				}).then(data => {
					console.log(data);
					if (data.RetCode == "000000") {

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

			//筛选搜索
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
				console.log(res.value, "................");
			},
			input(res) {
				console.log('监听搜索值的变化:', res)
			},
			clears(res) {
				console.log("清除搜索值：" + res.value);
			},
			// blur(res) {
			// 	console.log("失去焦点");
			// },
			// focus(e) {
			// 	console.log("获得焦点准备搜索");
			// },

			//清除筛选
			clear() {
				this.datea = '';
				this.timea = '';
				this.timeb = '';
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

			//弹框
			xxmm() {
				this.$refs.xxmm.open()
			},
			qd() {
				uni.showLoading({
					title: '加载中'
				})
				uni.hideLoading()
				this.rebind();
				this.$refs.xxmm.close()
			},
			qx() {
				console.log("取消");
			},
			bindDateChange: function(e) {
				this.datea = e.detail.value
			},
			bindTimeChangea: function(e) {
				this.timea = e.detail.value
			},
			bindTimeChangeb: function(e) {
				this.timeb = e.detail.value
			},

			//获取商圈信息
			getTradeAreaList() {
				var that = this;
				let interface_code = 'getTradeAreaListByApp';

				$post('/oauth2/resources', {
					interface_code,
					interface_parameters: "[\"1mapp\"]",
				}).then(res => {
					if (res.RetCode == "000000") {
						that.getManageShopList(res.Result[0].Id);
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
				let interface_code = 'getUserShopList';
				$post('/oauth2/resources', {
					interface_code
				}).then(res => {
					console.log(res);
					console.log("获取当前用户管理商户列表成功");
					if (res.RetCode == "000000") {
						app.curShop = res.Result[0];
						this.rebind();
						console.log("15465876846876846468746464");
					}
				})
			},

			rebind() {
				this.pageIndex = 1;
				this.entityList = [];
				this.bindData();
			},

			bindData() {
				uni.showLoading({
					title: '加载中'
				})
				var that = this;
				let shopId = app.curShop.Id;
				console.log(shopId);
				// let shopId = '1E5E86582EC54CD2AFEB854A886F86E6'
				let tab = that.curTab.tabIndex;
				if (shopId) {
					var filters = [{
						tableAlias: "tab0",
						fieldName: "ShopId",
						expression: "=",
						value: shopId
					}, {
						tableAlias: "tab0",
						fieldName: "OrderType",
						expression: "!=",
						value: "0"
					}];
					if (tab == '0') {
						filters.push({
							tableAlias: "tab0",
							fieldName: "OrderStatus",
							expression: "in",
							value: "'WaitDelivery','Produced','InDelivery','Fetched'"
						});
					}
					if (tab == '1') {
						filters.push({
							tableAlias: "tab0",
							fieldName: "OrderStatus",
							expression: "in",
							value: "'FinishDelivery','FinishConfirm','Finished'"
						});
					}
					if (tab == '2') {
						filters.push({
							tableAlias: "tab0",
							fieldName: "OrderStatus",
							expression: "=",
							value: "Cancel"
						});
						filters.push({
							tableAlias: "tab0",
							fieldName: "CancelType",
							expression: "=",
							value: "shop"
						});
					}
					if (tab == '3') {
						filters.push({
							tableAlias: "tab0",
							fieldName: "OrderStatus",
							expression: "=",
							value: "Cancel"
						});
						filters.push({
							tableAlias: "tab0",
							fieldName: "CancelType",
							expression: "=",
							value: "system"
						});
					}
					if (tab == '4') {
						filters.push({
							tableAlias: "tab0",
							fieldName: "SendType",
							expression: "=",
							value: "schedule"
						});
					}
				}
				let orderBys = [{
					tableAlias: "tab0",
					fieldName: "OrderDate",
					orderType: "desc"
				}];
				if (that.datea) {
					if (that.timea && that.timeb) {
						filters.push({
							tableAlias: "tab0",
							fieldName: "OrderDate",
							expression: ">=",
							value: that.datea + " " + that.timea,
							dateFormat: "yyyy-MM-dd HH:mm"
						}, {
							tableAlias: "tab0",
							fieldName: "OrderDate",
							expression: "<=",
							value: that.datea + " " + that.timeb,
							dateFormat: "yyyy-MM-dd HH:mm"
						})
					} else {
						filters.push({
							tableAlias: "tab0",
							fieldName: "OrderDate",
							expression: "=",
							value: that.datea,
							dateFormat: "yyyy-mm-dd"
						})
					}
				};
				if (that.searchValue) {
					filters.push("and", "(", {
						tableAlias: "tab0",
						fieldName: "Telephone",
						expression: "like",
						value: that.searchValue
					}, "or", {
						tableAlias: "tab0",
						fieldName: "LinkMan",
						expression: "like",
						value: that.searchValue
					}, "or", {
						tableAlias: "tab0",
						fieldName: "PrintNo",
						expression: "like",
						value: that.searchValue
					}, ")")
				};
				let params = {
					entityClassName: "com.doshare.customer.model.DsOrder",
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
					includeExtField: true,
					excludeFields: null,
					filters: filters,
					orderBys: orderBys,
					extParas: null
				}
				let parameters = util.obj2str(params);
				console.log(params);
				let interface_parameters = util.obj2str([parameters]);
				let interface_code = 'getOrderPageInfo';
				$post('/oauth2/resources', {
					interface_code,
					interface_parameters
				}).then(res => {
					console.log(res);
					if (res.RetCode == "000000") {
						that.entityList = res.Result.EntityList
						if (res.RetCode == "000000") {
							if (res.Result && res.Result.EntityList) {
								that.pageCount = res.Result.PageCount;
								that.rowCount = res.Result.RowCount;
							}
							that.orderNum = res.Result.RowCount;
							that.loadingComplete = false;
							if (res.Result.PageCount == res.Result.PageIndex) {
								res.loadingComplete = true;
							}
						}
					}
					uni.hideLoading()
				})

			},
			tabSel(e) {
				this.curTab.tabIndex = e.currentTarget.dataset.index;
				console.log(this.curTab.tabIndex, "#################################");
				this.curTab = this.curTab;
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

			//订单详情
			detail(item) {
				console.log(item, "999999999999999999999999999");
				uni.setStorageSync('Id', item)
				uni.navigateTo({
					url: "../order/order-detail"
				})
			},

			/* 打印 */
			print(item) {
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

<style lang="scss" scoped>
	@import url('@/pages/order/order.css');

	/deep/ .uni-searchbar__box {
		border: none;
	}
</style>
