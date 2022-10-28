<!-- <template>
	<view>
		<view>
			<u-cell-group>
				<u-cell icon="share" title="营业统计中心" :isLink="true" arrow-direction="right"></u-cell>
				<u-cell icon="share" title="活动补贴中心" :isLink="true" arrow-direction="right"></u-cell>
				<u-cell icon="share" title="收入统计" :isLink="true" arrow-direction="right"></u-cell>
				<u-cell icon="share" title="应用订单分布统计" :isLink="true" arrow-direction="right"></u-cell>
				<u-cell icon="share" title="自动分账记录" :isLink="true" arrow-direction="right"></u-cell>
				<u-cell icon="share" title="月统计收入" :isLink="true" arrow-direction="right"></u-cell>
			</u-cell-group>
		</view>

	</view>
</template>

<script>
</script>

<style>
</style>
 -->
<template>
	<view>
		<view class="line" @click="yytjzx">
			<view class="linebox">
				<view class="linebox-right">
					<image src="../../static/tabBar/ddgls.png" mode="widthFix" style="width: 40rpx;"></image>
					<view class="text">营业统计中心</view>
				</view>
				<image src="../../static/image/rights.png" mode="widthFix" style="width: 46rpx;"></image>
			</view>
		</view>
		<view class="line">
			<view class="linebox">
				<view class="linebox-right">
					<image src="../../static/tabBar/ddgls.png" mode="widthFix" style="width: 40rpx;"></image>
					<view class="text">活动补贴中心</view>
				</view>
				<image src="../../static/image/rights.png" mode="widthFix" style="width: 46rpx;"></image>
			</view>
		</view>
		<view class="line">
			<view class="linebox">
				<view class="linebox-right">
					<image src="../../static/tabBar/ddgls.png" mode="widthFix" style="width: 40rpx;"></image>
					<view class="text">收入统计</view>
				</view>
				<image src="../../static/image/rights.png" mode="widthFix" style="width: 46rpx;"></image>
			</view>
		</view>
		<view class="line">
			<view class="linebox">
				<view class="linebox-right">
					<image src="../../static/tabBar/ddgls.png" mode="widthFix" style="width: 40rpx;"></image>
					<view class="text">应用订单发布统计</view>
				</view>
				<image src="../../static/image/rights.png" mode="widthFix" style="width: 46rpx;"></image>
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

			}
		},
		onLoad() {},
		computed: {

		},
		methods: {
			yytjzx() {
				uni.navigateTo({
					url: '/pages/yytjzx/yytjzx?_mid=' + app.curShop.Id
				})
			}
		}

	}
</script>


<style lang="less" scoped>
	.line {
		// background-color: aqua;
		border-bottom: 1px solid #e3e3e3;
		padding: 26rpx;
	}

	.linebox {
		display: flex;
		justify-content: space-between;
		margin: 0 3%;
	}

	.linebox-right {
		display: flex;
	}

	.text {
		font-size: 30rpx;
		margin-left: 20rpx;
	}
</style>
