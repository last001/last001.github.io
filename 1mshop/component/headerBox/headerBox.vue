<template>
	<!-- paddingTop不生效可换成marginTop -->
	<view class="tab_title" :style="{ paddingTop: statusBarHeight,background:info.bgColor,color:info.color}">
		<!-- 左上角自定义样式 -->
		<view class="menu_btn flex-betwee box-sizing"
			:style="{ position: 'fixed', top: menuTop, left: menuRight, width: menuWidth, height: menuHeight, borderRadius: menuBorderRadius}">
			<u-icon name="arrow-left" size="46" :color="info.color" @click="backPage()"></u-icon>
			<view class="tit">{{info.title}}</view>
		</view>
	</view>
</template>
<script>
	export default {
		props:{
			info:{
				background:"#f2f2f2",
				color:"#000"
			}
		},
		data() {
			return {
				statusBarHeight: "",
				menuWidth: "",
				menuHeight: "",
				menuBorderRadius: "",
				menuRight: "",
				menuTop: "",
				contentTop: "",
			}
		},
		mounted() {
			// #ifdef MP-WEIXIN
			// console.log(uni.getStorageSync('menuInfo'));
			this.statusBarHeight = uni.getStorageSync('menuInfo').statusBarHeight;
			this.menuWidth = uni.getStorageSync('menuInfo').menuWidth
			this.menuHeight = uni.getStorageSync('menuInfo').menuHeight
			this.menuBorderRadius = uni.getStorageSync('menuInfo').menuBorderRadius
			this.menuRight = uni.getStorageSync('menuInfo').menuRight
			this.menuTop = uni.getStorageSync('menuInfo').menuTop
			this.contentTop = uni.getStorageSync('menuInfo').contentTop
			// #endif
			
			// console.log(this.info);
		},
		methods:{
			backPage(){
				uni.navigateBack({
					data:1
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.a{
		background: linear-gradient(to right , );
	}
	.box-sizing {
		box-sizing: border-box;
	}

	.tab_title {
		width: 100%;
		height: 44px !important; //这个是固定的44px（所有小程序顶部高度都是 = 44px + 手机系统状态栏高度）
		line-height: 44px;
		text-align: center;
		// background-color: #d00;
		// background-color: #f8f8f8 !important;
		position: fixed;
		top: 0;
		left:0;
		z-index: 999;
		color: #000;
		/* #ifdef H5 || APP */
		font-weight: 600;
		/* #endif */

		.menu_btn {
			// background-color: #ffffff; //这个是小程序默认的标题栏背景色
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: space-between;
			/* #ifdef H5 || APP */
			width: calc(100% - 60rpx);
			/* #endif */
			/* #ifdef MP-WEIXIN */
			width: 414rpx !important;
			justify-content: flex-start;
			/* #endif */
			
			// arrow-left
			.u-icon{
				/* #ifdef H5 || APP */
				margin-left: 12rpx;
				/* #endif */
			}
			
			.tit{
				/* #ifdef H5 || APP */
				width: 100%;
				text-align: center;
				/* #endif */
				/* #ifdef MP-WEIXIN */
				margin-left:20rpx;
				/* #endif */
			}

			// position: fixed; //行内式写了固定定位--目的是去掉下划页面一起滚动问题
			.arrowleft {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-160%, -50%) !important;
				-webkit-transform: translate(-160%, -50%) !important;
			}

			.text_box {
				width: 1rpx;
				height: 20px;
				background-color: #ddd;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%) !important;
				-webkit-transform: translate(-50%, -50%) !important;
			}

			.home {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(60%, -50%) !important;
				-webkit-transform: translate(60%, -50%) !important;
			}
		}
	}
</style>
