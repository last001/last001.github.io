<template>
	<view class="pics">

		<scroll-view class="left" scroll-y style="height:100%;">
			<view @click="leftClickHandle(index)" :class="active===index?'active':''"
				v-for="(item,index) in productTypeList" :key="index">
				{{item.Name}}
			</view>
		</scroll-view>

		<scroll-view class="right" scroll-y style="height: 100%;">
			<view>
				<view>全部商品</view>
				<input />
			</view>
			<checkbox-group @change="checkboxChangea">
				<label v-for="item in items" :key="item.value"
					style="display: flex;border-bottom: 1px solid #ccc;padding: 30rpx 0rpx;">
					<view style="width: 20%;margin-left: 2%;">
						<image src="../../static/tabBar/dps.png" mode="widthFix" style="width: 120rpx;">
						</image>
					</view>

					<view
						style="display: flex;flex-direction: column;justify-content: space-between;width: 33%;margin-left: 3%; ">
						<view style="font-size: 30rpx;">{{item.name}}</view>
						<view style="font-size: 20rpx;color: #c83c30;">{{item.price}}</view>
					</view>

					<view style="margin-top: 10rpx;width: 18%;">
						<view style="font-size: 32rpx;color: #00aa00;margin-bottom: 40rpx;">上架中</view>
						<switch checked @change="switch1Change"></switch>
					</view>

					<view
						style="display: flex;flex-direction: column;justify-content: space-between;margin-left: 16rpx;width: 7%;">
						<image src="../../static/image/bottom.png" mode="widthFix" style="width: 38rpx;"></image>
						<image src="../../static/image/top.png" mode="widthFix" style="width: 38rpx;"></image>
					</view>

					<view style="margin-top: 50rpx;margin-left: 10rpx;width: 7%;">
						<checkbox style="transform:scale(0.8)" :value="item.value" :checked="item.checked" />
					</view>

				</label>
			</checkbox-group>

			<!-- <view class="item" v-for="item in secondData" :key="item.id">
				<image @click="previewImg(item.img_url)" :src="item.img_url"></image>
				<text>{{item.text}}</text>
			</view>
			<text v-if="secondData.length === 0">暂无数据</text> -->
		</scroll-view>
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
	export default {
		data() {
			return {
				showProductTypeList: [],
				productTypeList: [],

				checked: false,

				items: [{
						"value": 'USA',
						"name": '美科',
						"price": '￥ 16'
					},
					{
						"value": 'CHN',
						"name": '中国',
						checked: 'true',
						"price": '￥ 16'
					},
					{
						"value": 'BRA',
						"name": '巴西',
						"price": '￥ 16'
					},
					{
						"value": 'JPN',
						"name": '日本',
						"price": '￥ 16'
					},
					{
						"value": 'ENG',
						"name": '英国'
					},
					{
						"value": 'FRA',
						"name": '法国',
						"price": '￥ 16'
					}
				],

				cates: [
					// {
					// 	"title": "呵呵",
					// 	"id": "0"
					// },
					// {
					// 	"title": "呵呵",
					// 	"id": "1"
					// },
					// {
					// 	"title": "呵呵",
					// 	"id": "2"
					// },
					// {
					// 	"title": "呵呵",
					// 	"id": "3"
					// },
					// {
					// 	"title": "呵呵",
					// 	"id": "4"
					// },
					// {
					// 	"title": "呵呵",
					// 	"id": "5"
					// }
				],
				active: 0,
				secondData: [{
						"img_url": "../../static/logo.png",
						"text": "一些文字描述",
						"id": "6"
					},
					{
						"img_url": "../../static/logo.png",
						"text": "一些文字描述",
						"id": "7"
					},
					{
						"img_url": "../../static/logo.png",
						"text": "一些文字描述",
						"id": "8"
					},
					{
						"img_url": "../../static/logo.png",
						"text": "一些文字描述",
						"id": "9"
					},
					{
						"img_url": "../../static/logo.png",
						"text": "一些文字描述",
						"id": "10"
					}
				]
			}
		},
		methods: {
			//获取商品分类列表
			getProductTypeListByShop: function() {
				let that = this;
				var shopId = uni.getStorageSync('shopId')
				console.log(shopId);

				if (shopId) {
					let interface_code = 'getProductTypeListByShop';
					let interface_parameters = util.obj2str([shopId]);
					$post('/oauth2/resources', {
						interface_code,
						interface_parameters
					}).then(data => {
						console.log(data);
						let showProductTypeList = [];
						var reg = /\&#.*?;/g;
						showProductTypeList.push({
							Id: '',
							Name: '全部商品'
						});
						for (let i = 0; i < data.Result.length; i++) {
							showProductTypeList.push(data.Result[i]);
						}
						for (var j in showProductTypeList) {
							var H, L, Code
							showProductTypeList[j].Name = showProductTypeList[j].Name.replace(reg, function(
								data) {
								if (data.length == 9) {
									Code = parseInt(data.match(/[0-9]+/g));
									H = Math.floor((Code - 0x10000) / 0x400) + 0xD800;
									L = (Code - 0x10000) % 0x400 + 0xDC00;
									return unescape("%u" + H.toString(16) + "%u" + L.toString(16));
								};
							})

						}
						that.productTypeList = data.Result;
						that.showProductTypeList = showProductTypeList;
						console.log(that.showProductTypeList, that.productTypeList);
						if (showProductTypeList && showProductTypeList.length > 0) {
							that.curTypeId = showProductTypeList[0].Id;
							that.curType = showProductTypeList[0];
						};
						// that.rebind();
					})
				}
			},

			checkboxChangea: function(e) {
				var items = this.items,
					values = e.detail.value;
				console.log(items, values);
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.value)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
			},

			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.detail.value)
			},

			checkboxChange(n) {
				console.log('change', n);
			},

			async getPicsCate() {
				const res = await this.$myRuquest({
					url: '/api/getimgcategory'
				})
				this.cates = res.data.message
				this.leftClickHandle(0, this.cates[0].id)
			},
			leftClickHandle(index) {
				this.active = index
				console.log(index);
				// 获取右侧的数据
				// const res = await this.$myRuquest({
				// 	url: '/api/getimages/'+id
				// })
				// this.secondData = res.data.message
			},

			//图片预览
			previewImg(current) {
				const urls = this.secondData.map(item => {
					return item.img_url
				})
				uni.previewImage({
					current,
					urls
				})
			}
		},

		onLoad() {
			this.getProductTypeListByShop();
			// this.getPicsCate()
		}
	}
</script>

<style lang="scss">
	.pics {
		height: 100%;
		display: flex;

		.left {
			width: 20%;
			height: 100%;
			border-right: 1px solid #22ee17;

			view {
				min-height: 80rpx;
				padding: 20rpx 10rpx;
				border-bottom: 1px solid #e0e0e0;
				display: flex;
				justify-content: center;
				align-items: center;
				word-wrap: break-word;
				word-break: normal;
			}

			.active {
				background: #05c0ab;
				color: #fff;
			}
		}

		.right {
			height: 100%;
			width: 80%;
			margin: 10rpx auto;
		}
	}
</style>
