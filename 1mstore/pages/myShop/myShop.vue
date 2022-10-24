<template>
	<view class="myShop">
		<view class="businessInfo">
			<view class="img-search flex-l-r">
				<image src="/static/image/more.png" mode=""></image>
				<view class="search">
					<u-field v-model="textVal" :clearable="false" placeholder-style="fontSize:9px;color:#999" label-width="0" right-icon="search" placeholder="搜索店铺"></u-field>
				</view>
			</view>
			<view class="busInfo flex-l-r">
				<view class="header-name">
					<view class="header">
						<!-- <image src="../../static/image/my_shop_h.png" mode=""></image> -->
					</view>
					<view class="name-address">
						<view class="name">
							<text>好吃的川菜馆</text>
							<u-icon name="arrow-right" size="20" color="#999"></u-icon>
						</view>
						<view class="address">
							<u-icon name="map-fill" size="28" color="#999896"></u-icon>
							<text class="text">清远大学城商圈</text>
						</view>
					</view>
				</view>
				<view class="iamge">
					<view class="printer flex-center-cs-c" @click="toPrinter">
						<image src="../../static/image/printer_h.png" mode=""></image>
						<view class="text">已连接</view>
					</view>
					<view class="business_h flex-center-cs-c">
						<image src="../../static/image/business_h.png" mode=""></image>
						<view class="text">营业中</view>
					</view>
				</view>
			</view>
			<view class="busTurnover">
				<view class="turnover flex-center-cs-c">
					<view class="newCount">¥266</view>
					<view class="oldCount">昨日：¥100</view>
					<view class="text">今日营业额</view>
				</view>
				<view class="order flex-center-cs-c">
					<view class="newCount">66</view>
					<view class="oldCount">昨日：6</view>
					<view class="text">今日订单</view>
				</view>
				<view class="visitor flex-center-cs-c">
					<view class="newCount">26</view>
					<view class="oldCount">昨日：100</view>
					<view class="text">今日访客</view>
				</view>
			</view>
		</view>
		<!-- 功能模块 -->
		<view class="func modular">
			<view class="title">
				功能模块
			</view>
			<view class="list">
				<view class="v-list flex-center-cs-c" v-for="(item,index) in modularList" :key="index">
					<view class="item flex-center-cs-c" @click="jumpRouter(item)">
						<image src="../../static/image/business_h.png" mode=""></image>
						<view class="name">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 其他服务 -->
		<view class="other modular">
			<view class="title">
				其他服务
			</view>
			<view class="list">
				<view class="v-list flex-center-cs-c" v-for="(item,index) in otherList" :key="index">
					<view class="item flex-center-cs-c">
						<image src="../../static/image/business_h.png" mode=""></image>
						<view class="name">
							其他模块
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textVal: "",
				modularList:[
					{name:"商品管理",routerSrc:""},
					{name:"店员管理",routerSrc:"/pages_func/staff/staff"},
					{name:"促销管理",routerSrc:"/pages_func/sale/sale"},
					{name:"商品管理",routerSrc:""},
					{name:"商品管理",routerSrc:""},
					{name:"平台活动",routerSrc:"/pages_func/platform/platform"},
					{name:"商品管理",routerSrc:""},
					{name:"商品管理",routerSrc:""},
				],
				otherList:7
			}
		},
		methods:{
			toPrinter(){
				uni.navigateTo({
					url:"/pages/printer/printer"
				})
			},
			jumpRouter(item){
				if(item.routerSrc == ""){
					return;
				}
				uni.navigateTo({
					url:item.routerSrc
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("./myShop.less");
</style>
