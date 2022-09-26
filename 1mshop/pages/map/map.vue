<template>
	<view class="content">
		<map id="mapId" class="mapId" style="width: 100%; height: 60vh;" :style="{height:mapheight}"
			:show-location='true' :latitude="latitude" :longitude="longitude" :markers="marker" :scale="scale"
			@markertap="markertap" @callouttap='callouttap'>
		</map>
		<!-- dingwei -->
		<view class="location" @click="move()">
			定位
		</view>
		<view class="inp">
			<u-input placeholder="请输入" v-model="textVal"></u-input>
			<button @click="search()">确定</button>
		</view>
		<!-- list -->
		<view class="list">
			<view class="lists" v-for="(item,index) in titleList" :key="index" @click="toItem(item)">
				{{item.title}}
			</view>
		</view>
	</view>
</template>

<script>
	var QQMapWX = require('@/static/js/qqmap-wx-jssdk');
	export default {
		data() {
			return {
				// 113.38424
				// 纬度：22.93772
				latitude: "22.93772", //纬度 
				longitude: "113.38424", //经度
				scale: 13, //缩放级别
				bottomData: false,
				marker: [],

				textVal: "",
				titleList: [{
					title: ""
				}],
				
				
				devices:[],
				currDev:{},
				 connId:"",
				bbb:Boolean,
			}
		},
		onReady() {},
		onShow() {
			// this.getLocation();

		},
		computed: {
			mapheight() {
				let data = ''
				if (this.bottomData) {
					if (this.upTop) {
						data = '50px'
					} else {
						data = '200px'
					}
				} else {
					data = '60vh'
				}
				return data
			},
			coverbottom() {
				let data = ''
				if (this.bottomData) {
					data = '20rpx'
				} else {
					data = '100rpx'
				}
				return data
			}
		},
		methods: {
			pay() {
				uni.getProvider({
					service: "payment",
					success(res) {
						console.log("res ==>", res);
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: String(Date.now()),
							nonceStr: 'A1B2C3D4E5',
							package: 'prepay_id=wx20180101abcdefg',
							signType: 'MD5',
							paySign: '',
							success(res) {
								console.log('success:' + JSON.stringify(res));
							},
							fail(err) {
								console.log('err:' + JSON.stringify(err));
							}
						})
					}
				})
			},
			//地图点击事件
			markertap(e) {
				console.log("===你点击了标记点===", e)
			},
			//地图点击事件
			callouttap(e) {
				console.log('地图点击事件', e);
			},
			// 获取自身 经纬度
			getLocation() {
				uni.getLocation({
					geocode: true,
					type: 'wgs84 ',
					success: function(res) {
						console.log('经度：' + res.longitude);
						console.log('纬度：' + res.latitude);
						this.latitude = res.latitude;
						this.longitude = res.longitude;
					}
				});
				this.reverseGeocoder(this.latitude, this.longitude);
			},
			reverseGeocoder(latitude, longitude) {
				var qqmapsdk;
				// 实例化API核心类
				qqmapsdk = new QQMapWX({
					key: '247BZ-KWSCU-XIGVM-236SM-OZZ52-LWBQZ'
				});
				qqmapsdk.reverseGeocoder({
					location: {
						latitude: latitude,
						longitude: longitude
					},
					success: (res) => {
						console.log('reverseGeocoder', res)
					},
					fail: (err) => {
						console.log('reverseGeocoder', err)
					}
				})
			},
			// 搜索input
			search() {
				var _this = this;
				var qqmapsdk;
				// 实例化API核心类
				qqmapsdk = new QQMapWX({
					key: '247BZ-KWSCU-XIGVM-236SM-OZZ52-LWBQZ'
				});
				qqmapsdk.getSuggestion({
					keyword: _this.textVal, //搜索关键词
					location: '39.980014,116.313972',
					success: function(res) {
						console.log("res ==>", res);
						_this.titleList = res.data;
						console.log("titleList ==>", _this.titleList);
					}
				})
			},
			// 点击lists
			toItem(item) {
				var qqmapsdk;
				// 实例化API核心类
				qqmapsdk = new QQMapWX({
					key: '247BZ-KWSCU-XIGVM-236SM-OZZ52-LWBQZ'
				});
				this.move(item.location.lat, item.location.lng);
			},
			// 移动地图中心
			move(lat, lng) {
				if (lat == undefined) {
					lat = ""
				}
				if (lng == undefined) {
					lng = "";
				}
				let mapObjs = uni.createMapContext('mapId', this);
				mapObjs.moveToLocation({
					latitude: lat,
					longitude: lng,
					complete() {
						console.log("移动完成  ==>");
					}
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.content {
		position: relative;

		.location {
			position: absolute;
			right: 20rpx;
			bottom: 50vh;
			background-color: blueviolet;
			color: white;
			font-size: 24rpx;
		}

		.inp {
			display: flex;
		}
	}
</style>
