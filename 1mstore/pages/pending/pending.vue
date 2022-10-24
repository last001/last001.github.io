<template>
	<view class="pending">
		<view class="titleList">
			<view class="v-list flex-center-cs-c" v-for="(item,index) in titleList" :key="index">
				<u-badge :offset="[-5,20]" :count="item.count" type="error"></u-badge>
				<view class="list" :class="item.isActive ? 'active' : ''" @click="switchTitle(item,index)">
					<image :src="item.isActive ? item.src : item.src1" mode=""></image>
				</view>
				<view class="title">{{item.title}}</view>
			</view>
		</view>
		<!-- 新订单 -->
		<view class="newOrder" v-show="current == 0">
			<list :list="orderList"></list>
		</view>
		<!-- 待配送 -->
		<view class="delivery" v-show="current == 1">
			待配送
		</view>
		<!-- 催单 -->
		<view class="reminder" v-show="current == 2">
			催单
		</view>
		<!-- 退款 -->
		<view class="refund" v-show="current == 3">
			退款
		</view>
		<!-- 扫码配送 -->
		<movable-area class="moveView">
			<movable-view x="300" y="400" direction="all">
				<view class="scan flex-center-cs-c" @click="scanCode()">
					<image src="/static/image/scan.png" mode=""></image>
					<view class="text">
						扫码配送
					</view>
				</view>
			</movable-view>
		</movable-area>
	</view>
</template>

<script>
	import list from "@/component/list/list.vue"
	export default {
		name:"pending",
		data() {
			return {
				titleList: [{
						src: "/static/image/new_order.png",
						src1: "/static/image/new_order_h.png",
						title: "新订单",
						isActive: true,
						count: 1
					},
					{
						src: "/static/image/delivery.png",
						src1: "/static/image/delivery_h.png",
						title: "待配送",
						isActive: false,
						count: 1
					},
					{
						src: "/static/image/reminder.png",
						src1: "/static/image/reminder_h.png",
						title: "催单",
						isActive: false,
						count: 3
					},
					{
						src: "/static/image/refund.png",
						src1: "/static/image/refund_h.png",
						title: "退款",
						isActive: false,
						count: 8
					},
				],
				current: 0,
				
				orderList:[
					{text:123},
					{text:1234},
					{text:1235},
				]
			}
		},
		components:{
			list
		},
		methods: {
			switchTitle(item, index) {
				if (item.isActive) {
					return;
				}
				this.titleList.forEach(e => {
					e.isActive = false;
				})
				item.isActive = true;
				this.current = index;
			},
			scanCode(){
				uni.scanCode({
					scanType:"qrCode",
					success(res){
						console.log("res ==>",res);
					},
					fail(err) {
						console.log("err ==>",err);
					}
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("./pending.less");
</style>
