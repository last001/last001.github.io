<template>
	<view>
		<view class="head">
			<view :class="[sel == 0?'act':'']" data-index="0" @click="handler" data-command="sel">新建</view>
			<view :class="[sel == 1?'act':'']" data-index="1" @click="handler" data-command="sel">已创建</view>
		</view>
		<view class="create" v-if="sel == 0">
				<view class="item">
					<view class="w-full ds-fx fw-nw ai-c">
						<view class=" ds-fx ai-c jc-c w-50 p-10 c-white mr-20" style="background: #7cd200; border-radius: 15rpx;">减</view>
						<text>满减活动</text>
					</view>
					<navigator url="../actReduce/actReduce">
						<view class="set-btn">设置</view>
					</navigator>
				</view>
				<view class="item">
					<view class="w-full ds-fx fw-nw ai-c">
						<view class=" ds-fx ai-c jc-c w-50 p-10 c-white mr-20" style="background: #ff2e4d; border-radius: 15rpx;">送</view>
						<text>满送活动</text>
					</view>
					<navigator url="../actGive/actGive">
						<view class="set-btn">设置</view>
					</navigator>
				</view>
				<view class="item">
					<view class="w-full ds-fx fw-nw ai-c">
						<view class=" ds-fx ai-c jc-c w-50 p-10 c-white mr-20" style="background: #1d953f; border-radius: 15rpx;">新</view>
						<text>门店新客</text>
					</view>
					<navigator url="../newUser/newUser">
						<view class="set-btn">设置</view>
					</navigator>
				</view>
				<view class="item">
					<view class="w-full ds-fx fw-nw ai-c">
						<view class=" ds-fx ai-c jc-c w-50 p-10 c-white mr-20" style="background: #ffcd46; border-radius: 15rpx;">券</view>
						<text>优惠券</text>
					</view>	
						<view class="set-btn">设置</view>
				</view>
				
		</view>
	</view>
</template>

<script>
	const util = require('@/utils/utils.js');
	const app = require('@/utils/app.js')
	import {
		$http,
		$get,
		$post
	} from '@/utils/api.js';
	import {
		obj2str
	} from '@/utils/utils.js';
	export default {
		data() {
			return {
				sel: 0
			}
		},
		methods: {
			handler(e) {
				var that = this
				var command = e.currentTarget.dataset.command
				switch(command){
					case "sel" :
					that.sel = e.currentTarget.dataset.index
					break;
				}
			}
		}
	}
</script>

<style>
	@import url('../../ym.css');
	.create{
		background: #efeff4;
	}
	.head {
		height: 90rpx;
		background: white;
		border-bottom: 1px solid #efeff4;
		display: flex;
		font-size: 36rpx;
	}

	.head>view {
		display: flex;
		width: 50%;
		height: 100%;
		justify-content: center;
		align-items: center;
	}

	.line {
		border-left: 1px solid #efeff4;
	}

	.item {
		height: 90rpx;

		padding-left: 20rpx;
		padding-right: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: white;
		border-bottom: 1px solid #efeff4;
	}

	.word {
		padding: 8rpx;
		border-radius: 15rpx;
		width: auto;
		height: auto;
		margin-right: 20rpx;
	}

	.set-btn {
		width: 100rpx;
		display: flex;
		flex-wrap: nowrap;
		background: #05c0ab;
		padding: 10rpx;
		align-items: center;
		justify-content: center;
		border-radius: 10rpx;
		color: white;
	}

	/*选中*/
	.act {
		color: #05c0ab;
	}

	.platformSupply {
		display: flex;
		font-size: 24rpx;
		color: #333;
		padding-left: 120rpx;
		padding-bottom: 20rpx;
		background: white;
		width: 100%;
	}

	/*没有活动*/
	.finish {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
	}

	.list-container {
		display: block;
		width: 100%;
	}

	.first-item {
		margin-left: 5rpx;
	}

	.nofirst-item {
		margin-left: 75rpx;
	}

	.fullcut-catalog {
		display: block;
	}

	.fullsent-catalog {
		display: block;
		margin-top: 10rpx;
	}

	.coupon-catalog {
		display: block;
		margin-top: 10rpx;
	}

	.nothing-box {
		margin-top: 300rpx;
		width: 100%;
		height: 260rpx;
		border-radius: 15rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;

		padding-top: 45rpx;
		padding-bottom: 45rpx;
	}

	.fullcut-head-item {
		height: 90rpx;
		width: 100%;
		padding-left: 20rpx;
		padding-right: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 34rpx;
		background: white;

	}

	.border-bottom {
		border-bottom: 1px solid #efeff4;
	}

	.fullcut-word {
		background: #7cd200;
		padding: 8rpx;
		border-radius: 15rpx;
		margin-right: 10rpx;
		width: 40rpx;
		height: 40rpx;
		color: white;
	}

	.fullcut-txt {
		display: flex;
		align-items: center;
	}

	.fullcut-box-a {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.fullcut-full {
		width: 80rpx;
		font-weight: bold;
		margin-bottom: 5rpx;
		border-bottom: 1px solid #05c0ab;
		margin-left: 5rpx;
		margin-right: 5rpx;
	}

	.fullcut-content {
		width: 200rpx;
		font-weight: bold;
		margin-bottom: 5rpx;
		border-bottom: 1px solid #05c0ab;
		margin-left: 5rpx;
		margin-right: 5rpx;
	}

	.fullcut-full>input {
		padding-left: 10rpx;
		color: #ff5e11;
	}

	.fullcut-content>input {
		padding-left: 10rpx;
		color: #ff5e11;
	}

	.coupon-head {
		margin-top: 10rpx;
	}

	.coupon-head-item {
		height: 70rpx;
		width: 100%;
		padding-left: 20rpx;
		padding-right: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 34rpx;
		background: white;
	}

	.coupon-head-item-txt {
		width: 100%;
		height: 40rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		display: flex;
		align-items: center;
		font-size: 34rpx;
		background: white;
		margin-top: 0rpx;
		margin-bottom: 0rpx;
	}

	.coupon-txt {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.det {
		display: flex;
		width: 100%;
		flex-direction: column;
		background: white;
		font-size: 30rpx;
	}

	.det-bott {
		margin-left: 100rpx;
		margin-top: -5rpx;
	}

	.det-box {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px dotted #b3b3b3;
	}

	.det-time {
		color: #b3b3b3;
		height: 40rpx;
		font-size: 25rpx;
	}

	.det-more {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
	}

	.det-btn {
		padding: 0 5px;
		border-radius: 20rpx;
		border: 1px solid #17c3b3;
		color: #17c3b3;
		font-size: 22rpx;
		margin-right: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.used {
		border: 1px solid #ff2726;
		color: #ff2726;
	}

	.noused {
		color: #17c3b3;
	}

	.btn-delele {
		font-size: 40rpx;
	}

	.btn-delele>i {
		color: #888888;
		font-weight: 700;
	}

	.wrapper {
		display: flex;
		position: relative;
		width: 710rpx;
		height: 180rpx;
		margin: auto;
		filter: drop-shadow(4rpx 4rpx 6rpx #f2f2f2);
	}

	.coupon-left {
		background: radial-gradient(circle at top right, transparent 5px, #FA8072 0) top right, radial-gradient(circle at bottom right, transparent 5px, #FA8072 0) bottom right;
		background-size: 100% 60%;
		background-repeat: no-repeat;
		width: 27%;
		border-radius: 10rpx 0 0 10rpx;

	}

	.coupon-right {
		background: #58a;
		background: radial-gradient(circle at top left, transparent 10rpx, #fff 0) top left, radial-gradient(circle at bottom left, transparent 10rpx, #fff 0) bottom left;
		background-size: 100% 60%;
		background-repeat: no-repeat;
		width: 73%;
		border-radius: 0 10rpx 10rpx 0;
	}

	.coupon-right::after {
		content: "";
		position: absolute;
		top: 10rpx;
		height: 160rpx;
	}
</style>
