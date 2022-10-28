<template>
	<view class="global">
		<!-- <view class="top">
			<view class="location">
				<view class="locations">
					<view class="text">当前商圈：</view>
					<picker @change="hqsq" :value="tradeAreaIndex" range-key="Name" :range="manageTradeAreaList">
						<view style="color: white;">{{curTradeAreaName}}</view>
					</picker>
				</view>
				<view>
					<image src="../../static/image/right.png" class="icon" mode="widthFix"></image>
				</view>
			</view>
		</view> -->

		<view class="heart-box">
			<view class="heart">
				<view class="search">
					<view>
						<view class="picture">
							<image :src="curShop.Picture" mode="widthFix" class="pictures"></image>
						</view>
					</view>
					<view class="search-box">
						<view style="display: flex;">
							<picker @change="showList" :value="pickerNum" range-key="Name" :range="manageShopList">
								<view class="chut-up-shop">{{curShop.Name}}</view>

							</picker>
							<image src="../../static/image/rights.png" mode="widthFix" style="width: 40rpx;"></image>
						</view>
						<view>
							<uni-search-bar :radius="100" placeholder="店铺名称" @confirm="search" :focus="false"
								v-model="searchValue" @input="input" @clear="clears">
							</uni-search-bar>
						</view>
					</view>
				</view>
				<view class="equipment">
					<view class="equipment-box">
						<image src="../../static/tabBar/yys.png" style="width: 30px;" mode="widthFix"></image>
						<view :class="[curShop.BusinessProps['PrinterStatus']=='1'?'cc connected':'nocc']">
							{{curShop.BusinessProps['PrinterStatus']=='1'
						? '已连接':'未连接'}}
						</view>
					</view>
					<view class="equipment-box">
						<image src="../../static/tabBar/yys.png" style="width: 30px;" mode="widthFix"></image>
						<picker @change="bs" :value="index" :range="status">
							<view :class="[index == '1'?'cc chut-up-shop':'nocc']">{{status[index]}}</view>
						</picker>
					</view>
				</view>
			</view>
		</view>

		<view class="statistics-box">
			<view class="turnover">
				<view class="today">今日营业额</view>
				<view class="number">{{curShop.BusinessProps['TodayStat'] ?
      curShop.BusinessProps['TodayStat']['Amount']:'0'}}</view>
				<view class="yesterday">昨天: {{curShop.BusinessProps['YesterdayStat'] ?
      curShop.BusinessProps['YesterdayStat']['Amount']:'0'}}</view>
			</view>
			<view class="turnover">
				<view class="today">今日订单</view>
				<view class="number">{{curShop.BusinessProps['TodayStat'] ?
      curShop.BusinessProps['TodayStat']['ValidOrderCount']:'0'}}</view>
				<view class="yesterday">昨天:{{curShop.BusinessProps['YesterdayStat'] ?
      curShop.BusinessProps['YesterdayStat']['ValidOrderCount']:'0'}}</view>
			</view>
			<view class="turnover">
				<view>
					<uni-badge class="uni-badge-left-margin"
						:text="shopMessagePage['RowCount'] ? shopMessagePage['RowCount']:'0'" absolute="rightTop"
						size="small">
						<image src="../../static/tabBar/ddgls.png" style="width: 30px;" mode="widthFix"></image>
					</uni-badge>
				</view>
				<view class="today">新消息</view>
			</view>
		</view>



		<view class="statistics-box">
			<view class="turnover" @click="management">
				<view>
					<image src="../../static/tabBar/ddgls.png" style="width: 30px;" mode="widthFix"></image>
				</view>
				<view class="today">商品管理</view>
			</view>
			<view class="turnover">
				<view>
					<image src="../../static/tabBar/ddgls.png" style="width: 30px;" mode="widthFix"></image>
				</view>
				<view class="today" @click="yytj">营业统计</view>
			</view>
			<view class="turnover">
				<view>
					<image src="../../static/tabBar/ddgls.png" style="width: 30px;" mode="widthFix"></image>
				</view>
				<view class="today" @click="printset">打印机设置</view>
			</view>
		
		</view>
		
		
		<view class="turnover">
					<view>
						<image src="../../static/tabBar/ddgls.png" style="width: 30px;" mode="widthFix"></image>
					</view>
					<view class="today" @click="dygl">店员管理</view>
				</view>
		<view class="turnover">
					<view>
						<image src="../../static/tabBar/ddgls.png" style="width: 30px;" mode="widthFix"></image>
					</view>
					<view class="today" @click="yybf">语音播放</view>
				</view>

	</view>
	</view>
</template>

<script>
	import {
		$http,
		$get,
		$post
	} from '@/utils/api.js';
	const util = require('@/utils/utils.js')
	const app = require('@/utils/app.js')

	export default {
		data() {
			return {
				//筛选搜索
				searchValue: '',

				manageTradeAreaList: [],
				tradeAreaIndex: 0,
				curTradeAreaName: '',
				status: ["休息中", "营业中", "关店", "暂不接单"],
				index: 0,
				curShop: {
					BusinessProps: {
						TodayStat: null
					},
					Picture: ''
				},
				curUser: [],
				searchKey: '',
				shopModuleList: [],
				shopMessagePage: [],
				manageShopList: [{
					Name: ''
				}],

				// 店铺切换
				pickerNum: 0,
				showBtn: false,
				isTrue: false,

				pageIndex: 1,
				pageSize: 10,
				pageCount: 1,
				rowCount: 0,

				Name: '',
				title: 'picker',
				array: ['休息中', '营业中', '关店', '暂不接单'],
				arraylist: [],
				// arraylist: ['a', 'b', 'c'],
			}
		},
		onLoad() {
			this.getUserInfo();
		},
		onShow() {
			let that = this;
			if (!app.loadingShop) {
				app.loadingShop = true;
				// that.getTradeAreaList();
			};
		},
		computed: {

		},
		methods: {
			//商品管理
			management() {
				uni.navigateTo({
					url: '/pages/commodity-management/commodity-management'
				})
			},
			//营业统计
			yytj() {
				uni.navigateTo({
					url: '/pages/business-statistics/business-statistics'
				})
			},
			dygl(){
				uni.navigateTo({
					url: '/pages/employeeManage/employeeManage?ShopId=' + this.curShop.Id
				})
			},
			yybf(){
				uni.navigateTo({
					url: '/pages/yybf/yybf'
				})
			},
			printset() {
				uni.navigateTo({
					url: '/pages/print-set/print-set?ShopId=' + this.curShop.Id
				})
			},
			bs(e) {
				this.index = e.detail.value;
				console.log(e, this.index);
				let that = this;
				let entity = {
					Id: that.curShop.Id,
					Status: e.detail.value
				};
				let updateFields = ['Status'];
				that.updateShop(entity, updateFields);
			},

			updateShop(entity, updateFields) {
				// debugger
				var that = this;
				let interface_code = 'updateShop';
				let interface_parameters = util.obj2str([entity, updateFields]);
				$post('/oauth2/resources', {
					interface_code,
					interface_parameters
				}).then(res => {
					if (res.RetCode == '000000') {
						that.curShop.Status = entity.Status;
						that.index = entity.Status
					}
				})
			},

			getUserInfo() {
				var that = this;
				let interface_code = 'getCurrentUser';
				let interface_parameters = "[]";
				$post('/oauth2/resources', {
					interface_code,
					interface_parameters
				}).then(res => {
					if (res.RetCode == '000000') {
						that.curUser = res.Result;
						console.log(that.curUser);
						that.getManageShopList(res.Result.TradeAreaId)
					}
				})
			},

			//获取商圈列表
			getTradeAreaList() {
				let that = this;
				let interface_code = 'getTradeAreaList';
				let interface_parameters = "[]";
				$post('/oauth2/resources', {
					interface_code,
					interface_parameters
				}).then(res => {
					console.log(res);
					if (res.Result.length > 0) {
						that.arraylist = res.Result;
						that.manageTradeAreaList = res.Result;
						that.tradeAreaIndex = 0;
						that.curTradeAreaName = (res.Result && res.Result.length > 0) ? res.Result[0]
							.Name :
							'没有授权管理的商圈';
						var tradeAreaCur = '';
						if (app.shopStatTradeAreaId && app.shopStatShopId) {
							for (var i in res.Result) {
								if (app.shopStatTradeAreaId == res.Result[i].Id) {
									tradeAreaCur = res.Result[i];
									that.curTradeAreaName = tradeAreaCur.Name
								}
							}
						} else {
							tradeAreaCur = res.Result[0]
						}
						that.getManageShopList(tradeAreaCur.Id);
						app.curTradeArea = tradeAreaCur;
					} else {
						that.getManageShopList("");
					}

				})
			},

			//切换商圈
			tradeAreaChange: function(e) {
				let that = this;
				that.tradeAreaIndex = e.detail.value,
					that.curTradeAreaName = that.manageTradeAreaList[e.detail.value].Name
				app.curTradeArea = that.manageTradeAreaList[e.detail.value];
				that.getManageShopList(that.manageTradeAreaList[e.detail.value].Id);
			},

			//获取当前用户所管理的商户列表

			getManageShopList(tradeAreaId) {
				let that = this;
				that.shopModuleList = [];
				that.manageShopList = [];
				let searchKey = that.searchKey;
				let interface_parameters = util.obj2str([tradeAreaId, searchKey]);
				let interface_code = "getUserShopListBySearch";

				$post('/oauth2/resources', {
					interface_code,
					interface_parameters
				}).then(data => {
					console.log(data);
					if (data.RetCode == "000000") {
						if (data.Result) {
							if (app.shopStatTradeAreaId && app.shopStatShopId) {
								for (var z in data.Result) {
									if (app.shopStatShopId == data.Result[z].Id) {
										app.curShop = data.Result[z];
										that.curShop = data.Result[z];
										app.shopStatTradeAreaId = '';
										app.shopStatShopId = '';

										that.index = parseInt(data.Result[z].Status)
										break;
									}
								}
							} else {
								app.curShop = data.Result[0];
								that.curShop = data.Result[0];
								that.index = parseInt(data.Result[0].Status)
							}
							if (data.Result.length <= 170) {
								// 处理图片 获得店名列表
								for (let i = 0; i < data.Result.length; i++) {
									if (data.Result[i].Picture) {
										data.Result[i].Picture = app.resource_endpoint +
											"?interface_code=getImage&access_token=" + app.access_token +
											"&imgurl=" + data.Result[i].Picture + "&w=150&h=150";
									} else {
										data.Result[i].Picture = app.resource_endpoint +
											"?interface_code=getImage&access_token=" + app.access_token +
											"&imgurl=//files/productfiles/all/default.jpg&w=150&h=150";
									}
									that.manageShopList.push(data.Result[i])
								}
							} else {
								for (let i = 0; i < 170; i++) {
									if (data.Result[i].Picture) {
										data.Result[i].Picture = app.resource_endpoint +
											"?interface_code=getImage&access_token=" + app.access_token +
											"&imgurl=" + data.Result[i].Picture + "&w=150&h=150";
									} else {
										data.Result[i].Picture = app.resource_endpoint +
											"?interface_code=getImage&access_token=" + app.access_token +
											"&imgurl=//files/productfiles/all/default.jpg&w=150&h=150";
									}
									that.manageShopList.push(data.Result[i])
								}
							}
						}
					}
				})
			},

			hqsq(e) {

				// that.curTradeAreaName = that.arraylist[e.detail.value].Name
				// console.log(that.index, that.curTradeAreaName, "333333333333333");
				let that = this;
				that.tradeAreaIndex = e.detail.value,
					that.curTradeAreaName = that.manageTradeAreaList[e.detail.value].Name
				app.curTradeArea = that.manageTradeAreaList[e.detail.value];
				that.getManageShopList(that.manageTradeAreaList[e.detail.value].Id);
			},

			//切换店铺
			showList(e) {
				let that = this;
				let n = e.detail.value;
				console.log(n);
				let manageShopList = that.manageShopList;
				console.log(manageShopList);
				let selShop = manageShopList[n];
				app.curShop = selShop;
				that.curShop = selShop;
				let shopModuleList = [];
				that.curShop = selShop;
				that.index = selShop.Status;
				this.getShopMessagePageInfo();
			},

			//分页获取商户未读消息
			getShopMessagePageInfo: function() {
				let that = this;
				that.shopMessageList = [];
				var filters = [{
					tableAlias: "tab0",
					fieldName: "ShopId",
					expression: "=",
					value: that.curShop["Id"] ? that.curShop["Id"] : ''
				}, {
					tableAlias: "tab0",
					fieldName: "IsRead",
					expression: "=",
					value: "0"
				}];
				var orderBys = [{
					tableAlias: "tab0",
					fieldName: "IsRead",
					orderType: "asc"
				}, {
					tableAlias: "tab0",
					fieldName: "SendDate",
					orderType: "desc"
				}];
				var params = {
					entityClassName: "com.doshare.shop.model.DsShopMessage",
					pageIndex: that.pageIndex,
					pageSize: that.pageSize,
					includeExtField: true,
					excludeFields: null,
					filters: filters,
					orderBys: orderBys,
					extParas: null
				}

				let parameters = util.obj2str(params);
				console.log(params);
				let interface_parameters = util.obj2str([parameters]);
				let interface_code = 'getShopMessagePageInfo';

				$post('/oauth2/resources', {
					interface_code,
					interface_parameters
				}).then(res => {
					if (res.RetCode == '000000') {
						that.shopMessagePage = res.Result;
					}
				})
			},

			//筛选搜索
			search(e) {
				let that = this;
				let searchKey = e.value;
				that.searchKey = searchKey;
				let curTradeAreaId = '';
				console.log(that.manageTradeAreaList[that.tradeAreaIndex], "000000000000000000000000000000000000");
				if (that.manageTradeAreaList && that.manageTradeAreaList.length > 0) {
					curTradeAreaId = that.manageTradeAreaList[that.tradeAreaIndex].Id;
				}
				that.getManageShopList(curTradeAreaId);
			},
			input(res) {
				console.log('监听搜索值的变化:', res)
			},
			clears(res) {
				console.log("清除搜索值：" + res.value);
			},
			blur(res) {
				console.log("失去焦点");
			},
			focus(e) {
				console.log("获得焦点准备搜索");
			},
		},
		onBackPress() {
			// #ifdef APP-PLUS
			plus.key.hideSoftKeybord();
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	@import url('@/pages/store/store.css');
</style>
