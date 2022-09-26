<template>
	<view class="classifySearch">
		<view class="searchInt">
			<u-search placeholder="搜索商品名称" :searchIconSize="32" bgColor="#EAEAEA" height="30px" v-model="searchVal">
			</u-search>
		</view>
		<view class="searchType">
			<view class="searchTypeList searchTypeList1">
				<view class="text">综合</view>
				<u-icon name="arrow-down-fill" color="#333" size="20"></u-icon>
			</view>
			<view class="searchTypeList searchTypeList2">
				<view class="text">销量</view>
				<view class="up-down">
					<u-icon name="arrow-up-fill" color="#ccc" size="18"></u-icon>
					<u-icon name="arrow-down-fill" color="#ccc" size="18"></u-icon>
				</view>
			</view>
			<view class="searchTypeList searchTypeList3">
				<view class="text">价格</view>
				<view class="up-down">
					<u-icon name="arrow-up-fill" color="#ccc" size="18"></u-icon>
					<u-icon name="arrow-down-fill" color="#ccc" size="18"></u-icon>
				</view>
			</view>
			<view class="searchTypeList searchTypeList4">
				<view class="text">
					筛选
				</view>
				<view class="shais">
					<!-- <image src="/static/mipmap-mdpi/shaix.png" mode=""></image> -->
				</view>
			</view>
		</view>
		<view class="searchList">
			<view class="searchLists" v-for="(item,index) in a" :class="index">
				<view class="headrImage">
					<image src="../../static/mipmap-mdpi1/storeImage.png" mode=""></image>
					<view class="identification">
						<image src="../../static/mipmap-mdpi1/brand.png" mode=""></image>
					</view>
				</view>
				<view class="info">
					<view class="info-name">
						<view class="title">
							荷叶饭撞江奈
						</view>
						<view class="delivery">
							商家自送
						</view>
					</view>
					<view class="score-distance">
						<view class="score">
							9.8分
						</view>
						<view class="type">
							可预订/自取
						</view>
						<view class="distance">
							266m
						</view>
					</view>
					<view class="target">
						<view>好吃实惠</view>
						<view>人气店家</view>
						<view>附近老牌店家</view>
					</view>
					<view class="payMoney">
						<view>起送￥5</view>
						<view>免配送费</view>
					</view>
					<view class="discount">
						<view>门店收单减1元</view>
						<view>满10减1</view>
						<view>满25减5</view>
					</view>
					<!-- image -->
					<view class="lists-image">
						<view class="v-lists-image" v-for="(item,index) in aa" :key="index">
							<view class="image">
								<!-- <image src="/static/mipmap-mdpi1/storeImage.png" mode=""></image> -->
							</view>
							<view class="title">
								荷叶想焖饭
							</view>
							<view class="price">
								<text class="new">￥9.9起</text>
								<text class="old">￥9.9起</text>
							</view>
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
				searchVal: "",
				a:2,
				aa:3
			}
		},
		onReady() {

		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style lang="less">
	@import url("./classifySearch.less");
</style>
