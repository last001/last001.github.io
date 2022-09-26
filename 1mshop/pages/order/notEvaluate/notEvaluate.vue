<template>
	<view class="notEvaluate-lists">
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
						<u-scroll-list :indicator="false">
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
					<text v-if="item.state == 0">需支付</text><text v-else>已支付</text>：¥<text class="money">99.99</text>
				</view>
			</view>
			<view class="btns">
				<view class="btnsItem">
					<u-button class="fr" size="small" shape="circle" color="#F8CF39" text="评价"></u-button>
					<u-button  shape="circle" text="再来一单"></u-button>
					<u-button  shape="circle" text="退款/售后"></u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
						]
					},
				],
			}
		}
	}
</script>

<style lang="less">
	@import url("./notEvaluate.less");
</style>
