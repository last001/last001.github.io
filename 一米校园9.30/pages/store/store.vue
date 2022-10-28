<template>
	<view class="global">
		<view class="top">
			<view class="location">
				<view class="locations">
					<view class="text">当前商圈：</view>
					<!-- <picker @change="bindPickerChange" :range="manageTradeAreaList" range-key="Name" :value="tradeAreaIndex">
						<view style="color: white;">{{curTradeAreaName}}</view>
					</picker> -->
					<picker @change="bindPickerChange" range-key="Name" :value="index" :range="arraylist">
						<view style="color: white;">00000000000000000</view>
					</picker>
				</view>
				<view>
					<image src="../../static/image/right.png" class="icon" mode="widthFix"></image>
				</view>
			</view>
		</view>

		<view class="heart-box">
			<view class="heart">
				<view class="search">
					<view>
						<view class="picture">
							<image src="../../static/logo.png" class="pictures" mode="widthFix"></image>
						</view>
					</view>
					<view class="search-box">
						<view>
							福建沙县小吃(佛大)
							<!-- <picker @change="showList" :range="{{manageShopList}}" range-key="Name" value="{{pickerNum}}">
								<view style="color: white;">{{curShop.Name}}</view>
							</picker> -->
						</view>
						<view>
							<uni-search-bar :radius="100" @confirm="bindSearchInput" cancelButton="none">
							</uni-search-bar>
						</view>
					</view>
				</view>
				<view class="equipment">
					<view class="equipment-box">
						<image src="../../static/tabBar/yys.png" style="width: 30px;" mode="widthFix"></image>
						<view class="connected">已连接</view>
					</view>
					<view class="equipment-box">
						<image src="../../static/tabBar/yys.png" style="width: 30px;" mode="widthFix"></image>
						<view class="chut-up-shop">关店</view>
					</view>
				</view>
			</view>
		</view>

		<view class="statistics-box">
			<view class="turnover">
				<view class="today">今日营业额</view>
				<view class="number">0</view>
				<view class="yesterday">昨天: 57.8</view>
			</view>
			<view class="turnover">
				<view class="today">今日订单</view>
				<view class="number">0</view>
				<view class="yesterday">昨天: 5</view>
			</view>
			<view class="turnover">
				<view>
					<uni-badge class="uni-badge-left-margin" :text="8" absolute="rightTop" size="small">
						<image src="../../static/tabBar/ddgls.png" style="width: 30px;" mode="widthFix"></image>
					</uni-badge>
				</view>
				<view class="today">新消息</view>
			</view>
		</view>

		<uni-notice-bar backgroundColor="#ffffff" color="red" scrollable single :text="text">
		</uni-notice-bar>

		<view class="statistics-box">
			<view class="turnover">
				<view>
					<image src="../../static/tabBar/ddgls.png" style="width: 30px;" mode="widthFix"></image>
				</view>
				<view class="today">商品管理</view>
			</view>
			<view class="turnover" @click="business">
				<view>
					<image src="../../static/tabBar/ddgls.png" style="width: 30px;" mode="widthFix"></image>
				</view>
				<view class="today">营业统计</view>
			</view>
			<view class="turnover" @click="printset">
				<view>
					<image src="../../static/tabBar/ddgls.png" style="width: 30px;" mode="widthFix"></image>
				</view>
				<view class="today">打印机设置</view>
			</view>
		</view>
		<!-- <view class="statistics-box">
			<view class="turnover">
				<view>
					<image src="../../static/tabBar/ddgls.png" style="width: 30px;" mode="widthFix"></image>
				</view>
				<view class="today">平台活动</view>
			</view>
			<view class="turnover">
				<view>
					<image src="../../static/tabBar/ddgls.png" style="width: 30px;" mode="widthFix"></image>
				</view>
				<view class="today">营业统计</view>
			</view>
			<view class="turnover">
				<view>
					<image src="../../static/tabBar/ddgls.png" style="width: 30px;" mode="widthFix"></image>
				</view>
				<view class="today">店铺设置</view>
			</view>
		</view> -->
		<!-- <view class="statistics-box">
			<view class="turnover">
				<view>
					<image src="../../static/tabBar/ddgls.png" style="width: 30px;" mode="widthFix"></image>
				</view>
				<view class="today">招聘管理</view>
			</view>
			<view class="turnover">
				<view>
					<image src="../../static/tabBar/ddgls.png" style="width: 30px;" mode="widthFix"></image>
				</view>
				<view class="today">打印机设置</view>
			</view>
			<view class="turnover">
				<view>
					<image src="../../static/tabBar/ddgls.png" style="width: 30px;" mode="widthFix"></image>
				</view>
				<view class="today">
					促销管理
					</view>
					<view class="trangle"></view>
					<view class="xin">新</view>
			</view>
		</view> -->


	</view>
</template>

<script>
	import {
		$http,
		$get,
		$post
	} from '@/utils/api.js';
	const util = require('@/utils/utils.js');
	const app = require('@/utils/app.js')

	export default {
		data() {
			return {
				Name: '',
				title: 'picker',
				arraylist: [],
				index: 0,
				text: "陈丽催单了,打印编号:220719-1100,加油一下哦",


				curTradeAreaName: '',
				tradeAreaIndex: 0,
				manageTradeAreaList: [],

				manageShopList: [],
				shopMessagePage: [],
				shopModuleList: [],
				pickerNum: 0,
				showBtn: false,
				isTrue: false,
			}
		},
		onLoad() {
			this.getTradeAreaList()
		},
		computed: {

		},
		methods: {
			//获取商圈列表
			getTradeAreaList() {
				let interface_code = 'getTradeAreaList';
				let interface_parameters = "[]";

				$post('/resources', {
					interface_code,
					interface_parameters
				}).then(res => {
					console.log(res);
					this.arraylist = res.Result;
					// this.manageTradeAreaList = res.Result;
					// this.tradeAreaIndex = 0
					this.getManageShopList(res.Result[0].Id)
				})
			},

			//获取当前用户所管理的商户列表
			getManageShopList(tradeAreaId) {
				// debugger
				let that = this;
				let searchKey = that.searchKey;
				let padss = util.obj2str(tradeAreaId, searchKey);
				let interface_parameters = util.obj2str([padss]);
				let interface_code = "getUserShopListBySearch";

				$post('/resources', {
					interface_code,
					interface_parameters
				}).then(res => {
					console.log(res);
					console.log("获取当前用户管理商户列表成功");
					if (res.RetCode == "000000") {
						if (res.Result) {
							if (app.shopStatTradeAreaId && app.shopStatShopId) {
								for (var z in res.Result) {
									if (app.shopStatShopId == data.Result[z].Id) {
										app.curShop = res.Result[z];
										that.res.curShop = res.Result[z];
										app.shopStatTradeAreaId = '';
										app.shopStatShopId = '';
										break;
									}
								}
							} else {
								app.curShop = res.Result[0];
								that.res.curShop = res.Result[0];
							}
						}
					}
				})
			},

			bindPickerChange(e) {
				let that = this;
				console.log('选择值为' + e.detail.value)
				this.index = e.detail.value;
				// this.index = this.arraylist[e.detail.value].Name
				console.log(this.index, "8888888888888888888");
				// that.tradeAreaIndex = e.detail.value;
				// var curTradeAreaName = that.manageTradeAreaList[e.detail.value].Name
				// app.curTradeArea = that.manageTradeAreaList[e.detail.value];
				// that.getManageShopList(that.data.manageTradeAreaList[e.detail.value].Id);
			},

			//切换店铺
			showList(e) {
				console.log(e.detail.value);
				let that = this;
				let n = e.detail.value;
				let manageShopList = this.manageShopList;
				let selShop = manageShopList[n];
				app.curShop = selShop;
				that.index = selShop.Status,
					that.curShop = selShop
				// let shopModuleList = [];
				// this.getShopMessagePageInfo();
			},

			bindSearchInput(e) {
				let that = this;
				let searchKey = e.detail.value;
				that.searchKey = searchKey;
				let curTradeAreaId = '';
				if (that.res.manageTradeAreaList && that.res.manageTradeAreaList.length > 0) {
					curTradeAreaId = that.res.manageTradeAreaList[that.res.tradeAreaIndex].Id;
				}
				that.getManageShopList(curTradeAreaId);
			},

			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
			},
			input(res) {
				console.log('----input:', res)
			},
			clear(res) {
				uni.showToast({
					title: 'clear事件，清除值为：' + res.value,
					icon: 'none'
				})
			},
			blur(res) {
				uni.showToast({
					title: 'blur事件，输入值为：' + res.value,
					icon: 'none'
				})
			},
			focus(e) {
				uni.showToast({
					title: 'focus事件，输出值为：' + e.value,
					icon: 'none'
				})
			},
			cancel(res) {
				uni.showToast({
					title: '点击取消，输入值为：' + res.value,
					icon: 'none'
				})
			},

			business() {
				uni.navigateTo({
					url: '/pages/business-statistics/business-statistics'
				})
			},
			printset() {
				uni.navigateTo({
					url: '/pages/print-set/print-set'
				})
			}

		},
		onBackPress() {
			// #ifdef APP-PLUS
			plus.key.hideSoftKeybord();
			// #endif
		},


	}
</script>

<style lang="scss" scoped>
	@import url('@/pages/store/store.css');
</style>
