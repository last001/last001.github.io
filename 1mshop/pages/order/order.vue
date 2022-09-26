<template>
	<view class="order">
		<view class="tabsLists" :style="{top:headerTop + 'px'}">
			<u-sticky bgColor="#fff">
				<u-tabs :list="list2" :current="current" lineWidth="44" lineHeight="6" lineColor="#F8CF39" :activeStyle="{
            color: '#333333',
            fontWeight: 'bold',
            transform: 'scale(1.05)'
        }" :inactiveStyle="{
            color: '#333',
            transform: 'scale(1)'
        }" itemStyle="padding-left: 15px; padding-right: 15px;" @change="switchPage"></u-tabs>
			</u-sticky>
		</view>
		<!-- 没登录状态 -->
		<view class="notLogin" v-if="ceshi.length == 0">
			<u-empty mode="data" text="登录后可查看更多订单详情~" icon="http://cdn.uviewui.com/uview/empty/data.png" textSize="32"
				textColor="#ccc" width="400" height="400">
				<slot>
					<u-button text="点此登录" type="info" shape="circle" plain color="#F8CF39" size="small"></u-button>
				</slot>
			</u-empty>
		</view>
		<!-- 登录状态 -->
		<view class="allOrderList" v-else>
			<!-- 全部 -->
			<view class="order-lists" v-show="current == 0">
				<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="scrollBtm" @refresherrefresh="onRefresh"
					refresher-enabled="true" :refresher-triggered="triggered" :refresher-threshold="60"
					refresher-background="#f2f2f2">
					<view class="list" v-for="(item,index) in ceshi" :key="index">
						<view class="list-name">
							<view class="storeInfo">
								<view class="image">
									<image src="/static/mipmap-mdpi1/storeImage.png" mode=""></image>
								</view>
								<view class="storeName">
									荷叶饭撞江奈
								</view>
								<view class="stroeIcon">
									<u-icon name="arrow-right" size="16" color="#999"></u-icon>
								</view>
							</view>
							<view class="state">
								状态的吉安市里的距
							</view>
						</view>
						<div class="setMeal">
							<view class="setMeal-image">
								<view class="setMeal-info">
									<u-scroll-list :indicator="indicator">
										<view v-for="(its,i) in item.srcList" :key="i" class="setMeal-info-item">
											<image :src="its.src" class="setMeal-info-image"></image>
											<view class="setMeal-info-title">{{its.title}}</view>
										</view>
									</u-scroll-list>
								</view>
								<view class="count" :class="item.srcList.length >=3 ? 'active' : ''">
									共{{item.srcList.length}}件
								</view>
							</view>
						</div>
						<view class="payInfo">
							<view class="payTime">
								下单时间：2022-08-08 16:16
							</view>
							<view class="payMoney">
								<text v-show="item.state == 0">需支付</text>
								<text v-show="item.state == 3">已支付</text>：¥<text class="money">99.99</text>
							</view>
						</view>
						<view class="btns">
							<!-- 支付剩余时间 -->
							<view class="btnsItem" v-show="item.state == 0">
								<u-button type="primary" shape="circle" color="#F24A49" text="立即支付"></u-button>
								<u-button type="info" shape="circle" text="取消订单"></u-button>
							</view>
							<!-- 待收货 -->
							<view class="btnsItem" v-show="item.state == 1">
								<u-button type="primary" shape="circle" color="#05C0BA" text="确认收货"></u-button>
								<u-button type="info" shape="circle" text="再来一单"></u-button>
								<u-button type="info" shape="circle" text="催一下" @click="reminderShow = true"></u-button>
							</view>
							<!-- 已完成 -->
							<view class="btnsItem" v-show="item.state == 2">
								<u-button type="primary" shape="circle" color="#F8CF39" text="评价"></u-button>
								<u-button type="info" shape="circle" text="再来一单"></u-button>
								<u-button type="info" shape="circle" text="退款/售后"></u-button>
							</view>
							<!-- 退款中 -->
							<view class="btnsItem" v-show="item.state == 3">
								<u-button type="primary" shape="circle" color="#FF9C9C" text="撤销退款"></u-button>
								<u-button type="info" shape="circle" text="咨询客服"></u-button>
							</view>
							<!-- 已退款 -->
							<view class="btnsItem" v-show="item.state == 4">
								<u-button type="primary" shape="circle" color="#FE7956" text="再来一单"></u-button>
								<u-button type="info" shape="circle" text="咨询客服"></u-button>
							</view>
							<!-- 已取消 -->
							<view class="btnsItem" v-show="item.state == 5">
								<u-button type="primary" shape="circle" color="#FE7956" text="再来一单"></u-button>
							</view>
						</view>
					</view>
					<u-loadmore iconSize="35" fontSize="35" :status="orderStatus" />
				</scroll-view>
			</view>
			<!-- 待评价 -->
			<view class="notEvaluate" v-show="current == 3">
				<notEvaluate></notEvaluate>
			</view>
		</view>
		<!-- 弹出层 -->
		<u-popup :safeAreaInsetBottom="false" :show="reminderShow" :round="30" mode="center"
			@close="reminderShow = false">
			<!-- @close="close" @open="open" -->
			<view class="raminderBox">
				<h3>已帮您催促商家/骑手</h3>
				<view class="text">正在马不停蹄的加速中，请耐心等候~</view>
				<u-button type="primary" shape="circle" color="#F8CF39" text="知道了" @click="aaa()"></u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import api from '@/common/api.js';
	import notEvaluate from "@/pages/order/notEvaluate/notEvaluate.vue"
	export default {
		data() {
			return {
				headerTop: 0,
				// tabs 切换
				current: 0,
				list2: [{
						name: '全部',
					}, {
						name: '待付款',
					},
					{
						name: '待收货',
					}, {
						name: '待评价',
					},
					{
						name: '退款/售后',
					}
				],
				// 全部0 待收货1 已完成2 退款中3 已退款4 已取消5
				ceshi: [{
						state: 0,
						srcList: [{
								src: "/static/mipmap-mdpi1/timeLImitList1.png",
								title: "升级豪华套餐"
							},
							{
								src: "/static/mipmap-mdpi1/timeLImitList1.png",
								title: "升级豪华套餐"
							},
							{
								src: "/static/mipmap-mdpi1/timeLImitList1.png",
								title: "升级豪华套餐"
							},
							{
								src: "/static/mipmap-mdpi1/timeLImitList1.png",
								title: "升级豪华套餐"
							},
						]
					},
					{
						state: 1,
						srcList: [{
								src: "/static/mipmap-mdpi1/timeLImitList1.png",
								title: "升级豪华套餐"
							},
							{
								src: "/static/mipmap-mdpi1/timeLImitList1.png",
								title: "升级豪华套餐"
							},
							{
								src: "/static/mipmap-mdpi1/timeLImitList1.png",
								title: "升级豪华套餐"
							},
						]
					},
					{
						state: 2,
						srcList: [{
								src: "/static/mipmap-mdpi1/timeLImitList1.png",
								title: "升级豪华套餐"
							},
							{
								src: "/static/mipmap-mdpi1/timeLImitList1.png",
								title: "升级豪华套餐"
							},
							{
								src: "/static/mipmap-mdpi1/timeLImitList1.png",
								title: "升级豪华套餐"
							},
							{
								src: "/static/mipmap-mdpi1/timeLImitList1.png",
								title: "升级豪华套餐"
							},
						]
					},
					{
						state: 3,
						srcList: [{
								src: "/static/mipmap-mdpi1/timeLImitList1.png",
								title: "升级豪华套餐"
							},
							{
								src: "/static/mipmap-mdpi1/timeLImitList1.png",
								title: "升级豪华套餐"
							},
							{
								src: "/static/mipmap-mdpi1/timeLImitList1.png",
								title: "升级豪华套餐"
							},
							{
								src: "/static/mipmap-mdpi1/timeLImitList1.png",
								title: "升级豪华套餐"
							},
						]
					},
					{
						state: 4,
						srcList: [{
								src: "/static/mipmap-mdpi1/timeLImitList1.png",
								title: "升级豪华套餐"
							},
							{
								src: "/static/mipmap-mdpi1/timeLImitList1.png",
								title: "升级豪华套餐"
							},
							{
								src: "/static/mipmap-mdpi1/timeLImitList1.png",
								title: "升级豪华套餐"
							},
							{
								src: "/static/mipmap-mdpi1/timeLImitList1.png",
								title: "升级豪华套餐"
							},
						]
					},
					{
						state: 5,
						srcList: [{
								src: "/static/mipmap-mdpi1/timeLImitList1.png",
								title: "升级豪华套餐"
							},
							{
								src: "/static/mipmap-mdpi1/timeLImitList1.png",
								title: "升级豪华套餐"
							},
							{
								src: "/static/mipmap-mdpi1/timeLImitList1.png",
								title: "升级豪华套餐"
							},
							{
								src: "/static/mipmap-mdpi1/timeLImitList1.png",
								title: "升级豪华套餐"
							},
						]
					},
				],
				ceshi1: [],
				indicator: false,
				isActive: true,
				reminderShow: false,

				// 滑到底部 状态订单
				orderStatus: "loadmore",
				triggered: false
			}
		},
		onReady() {},
		onLoad() {
			// api.bind();
		},
		mounted() {
			this.headerTop = uni.getSystemInfoSync().windowTop;
		},
		components: {
			notEvaluate
		},
		methods: {
			aaa() {
				let data = {
					bind_type: "1",
					username: "tianh",
					password: "z12345678",
					usertype: "M",
					mobile_number: "1",
					openid: "6"
				}

				api.login('123456', data, function(res) {
					console.log(res)
				});
			},
			switchPage(item) {
				// console.log("item ==>",item);
				this.current = item.index;
			},
			// 滑到底部
			scrollBtm(e) {
				console.log("滑到底部la");
				this.orderStatus = 'loading';
				setTimeout(() => {
					this.orderStatus = 'nomore';
				}, 1000)
			},
			// 下拉刷新
			onRefresh(e) {
				console.log(e, "下拉刷新");
				this.triggered = true;
				setTimeout(() =>{
					this.triggered = false;
				},2000)
			}
		}
	}
</script>

<style lang="less">
	@import url("./order.less");
</style>
