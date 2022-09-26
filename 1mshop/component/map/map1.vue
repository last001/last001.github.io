<template>
	<view class="content">
		<map style="width: 100%; height: 90vh;" :layer-style='5' :style="{height:mapheight}" :show-location='true'
			:latitude="latitude" :longitude="longitude" :markers="marker" :scale="scale" @markertap="markertap"
			@callouttap='callouttap'>

		</map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude: 23.106574, //纬度
				longitude: 113.324587, //经度
				scale: 13, //缩放级别
				bottomData: false,
				marker: [{
						id: 0,
						latitude: 23.13065, //纬度
						longitude: 113.3274, //经度
						iconPath: '', //显示的图标        
						rotate: 0, // 旋转度数
						width: 20, //宽
						height: 30, //高
						//   title:'我在这里',//标注点名
						alpha: 0.5, //透明度
						callout: { //自定义标记点上方的气泡窗口 点击有效  
							content: '天宝大厦', //文本
							color: '#ffffff', //文字颜色
							fontSize: 14, //文本大小
							borderRadius: 15, //边框圆角
							borderWidth: '10',
							bgColor: '#e51860', //背景颜色
							display: 'ALWAYS', //常显
						},
					},
					{
						id: 1234597,
						latitude: 23.106574, //纬度
						longitude: 113.324587, //经度
						iconPath: '', //显示的图标        
						rotate: 0, // 旋转度数
						width: 20, //宽
						height: 30, //高
						//  title:'我在这里',//标注点名
						alpha: 0.5, //透明度
						//      label:{//为标记点旁边增加标签   //因背景颜色H5不支持
						//   color:'red',//文本颜色
						//      },
						callout: { //自定义标记点上方的气泡窗口 点击有效  
							content: '广州塔', //文本
							color: '#ffffff', //文字颜色
							fontSize: 14, //文本大小
							borderRadius: 15, //边框圆角
							borderWidth: '10',
							bgColor: '#e51860', //背景颜色
							display: 'ALWAYS', //常显
						},
					},
					{
						id: 2,
						latitude: 23.1338, //纬度
						longitude: 113.33052, //经度
						iconPath: '', //显示的图标        
						rotate: 0, // 旋转度数
						width: 20, //宽
						height: 30, //高
						alpha: 0.5, //透明度
						callout: { //自定义标记点上方的气泡窗口 点击有效  
							content: '德隆大厦', //文本
							color: '#ffffff', //文字颜色
							fontSize: 14, //文本大小
							borderRadius: 15, //边框圆角
							borderWidth: '10',
							bgColor: '#e51860', //背景颜色
							display: 'ALWAYS', //常显
						},
					},
					{
						id: 3,
						latitude: 23.136455, //纬度
						longitude: 113.329002, //经度
						iconPath: '', //显示的图标        
						rotate: 0, // 旋转度数
						width: 20, //宽
						height: 30, //高
						alpha: 0.5, //透明度
						callout: { //自定义标记点上方的气泡窗口 点击有效  
							content: '羊城国际商贸中心', //文本
							color: '#ffffff', //文字颜色
							fontSize: 14, //文本大小
							borderRadius: 15, //边框圆角
							borderWidth: '10',
							bgColor: '#e51860', //背景颜色
							display: 'ALWAYS', //常显
						},
					},
					{
						id: 4,
						latitude: 23.224781, //纬度
						longitude: 113.293911, //经度
						iconPath: '', //显示的图标        
						rotate: 0, // 旋转度数
						width: 20, //宽
						height: 30, //高
						alpha: 0.5, //透明度
						callout: { //自定义标记点上方的气泡窗口 点击有效  
							content: '天瑞广场A座', //文本
							color: '#ffffff', //文字颜色
							fontSize: 16, //文本大小
							borderRadius: 15, //边框圆角
							borderWidth: '12',
							bgColor: '#e51860', //背景颜色
							display: 'ALWAYS', //常显
						},
					},
					{
						id: 5,
						latitude: 23.072726, //纬度
						longitude: 113.277921, //经度
						iconPath: '', //显示的图标        
						rotate: 0, // 旋转度数
						width: 20, //宽
						height: 30, //高
						alpha: 0.5, //透明度
						callout: { //自定义标记点上方的气泡窗口 点击有效  
							content: '大米和小米儿童康复(广州盈丰)中心', //文本
							color: '#ffffff', //文字颜色
							fontSize: 14, //文本大小
							borderRadius: 15, //边框圆角
							borderWidth: '8',
							bgColor: '#e51860', //背景颜色
							display: 'ALWAYS', //常显
						},
					},
				],
			}
		},
		onLoad() {

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
					data = '90vh'
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
			//地图点击事件
			markertap(e) {
				console.log("===你点击了标记点===", e)
			},
			//地图点击事件
			callouttap(e) {
				console.log('地图点击事件', e);
			}
		}
	}
</script>
