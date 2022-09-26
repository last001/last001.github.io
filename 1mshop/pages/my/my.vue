<template>
	<view class="my">
		<view class="personInfo">
			<view class="info">
				<view class="name">
					<button class="login" size="mini" type="text" open-type="getPhoneNumber"@getphonenumber="getPhoneNumber">登录</button>
					<view class="gender">
						<!-- <image src="/static/mipmap-mdpi/man.png" mode=""></image> -->
					</view>
				</view>
				<view class="phone">
					已绑定手机号码：{{phone}}
				</view>
			</view>
			<view class="header">
				<!-- <image src="/static/mipmap-mdpi/defaultHeader.png" mode=""></image> -->
			</view>
		</view>
		<view class="welfare">
			<view class="member">
				<view class="v-member">
					<view class="member-name">
						<view class="text">会员中心</view>
						<view class="text-icon">
							<text>已开通</text>
							<u-icon name="arrow-right" color="#F8CF39" size="20"></u-icon>
						</view>
					</view>
					<view class="menber-image">
						<!-- <image src="/static/mipmap-mdpi/menber.png" mode=""></image> -->
					</view>
				</view>
				<text class="explain">预计已为您节省66.66元</text>
			</view>
			<view class="coupons">
				<view class="v-coupons">
					<view class="coupons-name">
						<view class="text">券包中心</view>
						<view class="text-icon" @click="toCoupon()">
							<text>去领取</text>
							<u-icon name="arrow-right" color="#F8CF39" size="20"></u-icon>
						</view>
					</view>
					<view class="coupons-image">
						<image src="/static/mipmap-mdpi1/coupons.png" mode=""></image>
					</view>
				</view>
				<text class="explain">更多优惠,请点击“去领取”</text>
			</view>
		</view>
		<view class="list">
			<view class="lists">
				<u-list :scrollable="false">
					<u-list-item v-for="(item, index) in indexList" :key="index">
						<u-cell :title="item.name" @click="toPages(item,index)">
							<u-avatar slot="icon" shape="square" size="35" :src="item.url"
								customStyle="margin: -3px 5px -3px 0"></u-avatar>
							<u-icon slot="icon" name="arrow-right" color="#999" size="28"></u-icon>
						</u-cell>
					</u-list-item>
				</u-list>
			</view>
		</view>
	</view>
</template>

<script>
	var app = getApp();
	export default {
		data() {
			return {
				phone:1564789521,
				indexList: [{
						name: "历史位置",
						url: "/static/mipmap-mdpi1/coupons.png",
						routerSrc: "/pages_my/historyLocation/historyLocation"
					},
					{
						name: "地址管理",
						url: "/static/mipmap-mdpi1/coupons.png",
						routerSrc: "/pages_my/address/address"
					},
					{
						name: "我的购物车",
						url: "/static/mipmap-mdpi1/coupons.png",
						routerSrc: "/pages_my/shoppingCart/shoppingCart"
					},
					{
						name: "我的收藏",
						url: "/static/mipmap-mdpi1/coupons.png",
						routerSrc: "/pages_my/collection/collection"
					},
					{
						name: "我的券包",
						url: "/static/mipmap-mdpi1/coupons.png",
						routerSrc: "/pages_my/myCoupon/myCoupon"
					},
					{
						name: "我的组队",
						url: "/static/mipmap-mdpi1/coupons.png",
						routerSrc: "/pages_my/myTeam/myTeam"
					},
					{
						name: "我的评价",
						url: "/static/mipmap-mdpi1/coupons.png",
						routerSrc: "/pages_my/myEvaluate/myEvaluate"
					},
					{
						name: "客服中心",
						url: "/static/mipmap-mdpi1/coupons.png"
					},
					{
						name: "意见反馈",
						url: "/static/mipmap-mdpi1/coupons.png"
					},
					{
						name: "系统设置",
						url: "/static/mipmap-mdpi1/coupons.png"
					},
					{
						name: "关于我们",
						url: "/static/mipmap-mdpi1/coupons.png"
					},
				],
			}
		},
		onLoad() {
		},
		methods: {
			toPages(item, index) {
				// console.log("item ==>",item);
				uni.navigateTo({
					url: item.routerSrc
				})
			},
			toCoupon() {
				uni.navigateTo({
					url: "/pages_my/coupon/coupon"
				})
			},
			getPhoneNumber(e){
				console.log("e ==>",e);
				// app.getinfo(data,function(res){
				// 	res = 
				// });
			}
		}
	}
</script>

<style lang="less">
	@import url("@/pages/my/my.less");
</style>
