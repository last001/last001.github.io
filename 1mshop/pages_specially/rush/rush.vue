<template>
	<view class="rush">
		<view class="rush-lists" v-for="(item,index) in lists" :key="index">
			<!-- 点赞 -->
			<view class="goods" v-show="index < 2 ? true : false">
				<!-- <u-icon name="thumb-up-fill" color="#FF6161" size="40"></u-icon> -->
				<!-- <image src="/static/mipmap-mdpi/hot.png" mode=""></image> -->
			</view>
			<view class="lists-image">
				<image src="/static/mipmap-mdpi1/timeLImitList1.png" mode=""></image>
				<!-- 抢购文字 -->
				<view class="time">
					抢购
				</view>
			</view>
			<view class="lists-text">
				<view class="title">
					刘记麻辣香锅全家福套餐
				</view>
				<view class="speed">
					<u-line-progress :showText="false" :percentage="50" height="22" inactiveColor="#FCE79C" activeColor="#F8CF39">
					</u-line-progress>
					<text class="u-percentage-text">剩余30%</text>
				</view>
				<view class="money">
					<text> <text class="sign">￥</text> 22</text>
					<text>￥26</text>
				</view>
				<view class="btn">
					<u-button type="primary" size="small" color="#F24849" :disabled="true" text="马上抢"></u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists: 5
			}
		},

	}
</script>


<style lang="less">
	@import url("./rush.less");
</style>
