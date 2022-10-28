<template>
	<view>
		<view class="conter">
			<image src="../../static/logo.png" style="width: 120rpx;" mode="widthFix"></image>
			<view class="version-number">v1.1.0</view>
			<view class="copyright">版权所有：广州市云亿信息科技有限公司</view>
			<view class="phone">
				客服热线：<view @click="call">133-3286-0686</view>
			</view>
		</view>
		<view>
			<view class="introduce" @click="aaaaaaaaa">功能介绍</view>
		</view>
		<view>
			<view class="text">【一米校园】是由广州市云亿信息科技有限公司开发并运营的校园综合服务平台；我们不仅做外卖，店内扫一扫也可以在线点单和买单，还有更多优惠等你来拿...</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {
		},
		methods: {
			call(){
				uni.makePhoneCall({
					phoneNumber: '13332860686'
				});
			},
			aaaaaaaaa(){
				uni.navigateTo({
					url:'/pages/pending/pend'
				})
			}
		},
	};
</script>

<style lang="scss" scoped>
	@import url('@/pages/about-us/about-us.css');
</style>
