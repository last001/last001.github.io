<template>
	<view class="collection">
		<view class="titleTab">
			<!-- <text v-for="(item,index) in titleList" :key="index" :class="item.isActive ? 'active' :''"
				@click="switchTitle(item,index)">{{item.title}}</text> -->

			<u-sticky bgColor="#fff">
				<u-tabs :list="titleList" :current="current" lineWidth="44" lineHeight="6" lineColor="#F8CF39"
					:activeStyle="{
			    color: '#333333',
			    fontWeight: 'bold',
			    transform: 'scale(1.05)'
			}" :inactiveStyle="{
			    color: '#333',
			    transform: 'scale(1)'
			}" itemStyle="padding-left: 10px; padding-right: 18px;" @change="switchTitle"></u-tabs>
			</u-sticky>
		</view>
		<!-- 商家 + 商品 -->
		<view class="lists" v-if="current == 0">
			<productList :list="productList"></productList>
		</view>
		<view class="lists1" v-else>
			<view class="v-lists" v-for="(item,index) in lists1" :key="index">
				<u-swipe-action>
					<u-swipe-action-item :options="options2">
						<view class="swipe-action">
							<view class="swipe-action__content">
								<view class="lists-image">
									<image src="/static/mipmap-mdpi1/timeLImitList1.png" mode=""></image>
								</view>
								<view class="lists-info1">
									<view class="info-title">
										<view class="title">
											刘记麻辣香锅全家福套餐【递减拼】
										</view>
										<view class="setText">
											已选：羊肉+牛肉+生菜+虾仁，微辣
										</view>
										<view class="money">
											￥25
										</view>
									</view>
								</view>
							</view>
						</view>
					</u-swipe-action-item>
				</u-swipe-action>
			</view>
		</view>
	</view>
</template>

<script>
	import productList from "@/component/productList/productList.vue"
	export default {
		name: 'collection',
		data() {
			return {
				current: 0,
				titleList: [{
						name: "商家"
					},
					{
						name: "商品"
					}
				],
				lists1: 2,
				options2: [{
					text: '去购买',
					style: {
						backgroundColor: '#F8CF39'
					}
				}, {
					text: '加购',
					style: {
						backgroundColor: '#05C0AB'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#F24849'
					}
				}, ],
				productList: [{
						url: "",
						title: "标题一标题一标题一",
						rate: 9.8,
						deliveryText: "商家自送"
					},
					{
						url: "",
						title: "标题二标题二标题二",
						rate: 9.5,
						deliveryText: "平台配送"
					},
				]
			}
		},
		components: {
			productList
		},
		methods: {
			switchTitle(item) {
				this.current = item.index;
			}
		}
	}
</script>

<style lang="less">
	@import url("./collection.less");
</style>
