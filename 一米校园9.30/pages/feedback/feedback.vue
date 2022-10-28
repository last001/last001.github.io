<template>
	<view class="global">
		<view class="input">
			<uni-easyinput type="textarea" :inputBorder="false" autoHeight v-model="valuetext" placeholder="请输入遇到的问题或建议..."></uni-easyinput>
			<view class="add-explain">
				<uni-file-picker :image-styles="imageStyles"></uni-file-picker>
				<view class="add-text">添加图片说明</view>
			</view>
		</view>
		<view class="line">
			<view class="text">联系电话</view>
			<uni-easyinput v-model="valuephone" :inputBorder="false" placeholder="选填,便于我们联系你"></uni-easyinput>
		</view>
		
		<view class="btn">
			<view class="submit" @click="submit">提交</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				valuetext:'',
				valuephone:'',
				
				imgArr: [],
				imageStyles:{
					"height": 60,	// 边框高度
					"width": 60,	// 边框宽度
					// "border":{ // 如果为 Boolean 值，可以控制边框显示与否
					// 	"color":"#eee",		// 边框颜色
					// 	"width":"1px",		// 边框宽度
					// 	"style":"solid", 	// 边框样式
					// 	"radius":"50%" 		// 边框圆角，支持百分比
					// }
				}
			}
		},
		onLoad() {

		},
		methods: {	
			submit(){
				console.log("000");
			}
		},
	}
</script>

<style lang="scss" scoped>
	.input{
		background-color: #fff;
		padding: 0px 5px;
	}
	.line{
		display: flex;
		margin-top: 10px;
	}
	.text{
		background-color: #fff;
		color: #4c4c4c;
		font-size: 26rpx;
		padding: 18rpx 0rpx 17rpx 20rpx;
	}
	.add-explain{
		display: flex;
		padding: 0 5px;
	}
	.add-text{
		font-size: 28rpx;
		color: #999999;
		margin-top: 32rpx;
	}
	.btn{
		width: 83%;
		margin-left: 5%;
		height: 70rpx;
		line-height: 70rpx;
		background-color: #56bdaa;
		text-align: center;
		border-radius: 10px;
		margin-top: 60px;
	}
	.submit{
		color: white;
		font-size: 30rpx;
	}
</style>