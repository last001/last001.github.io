<template>
	<view class="search">
		<view class="searchInt">
			<u-search placeholder="搜索商品名称" :searchIconSize="32" :showAction="false" bgColor="#EAEAEA" height="30px" v-model="searchVal">
			</u-search>
		</view>
		<!-- 最近搜索 -->
		<view class="lately">
			<view class="lately-text">
				<view class="text">
					最近搜索
				</view>
				<view class="">
					<u-icon name="trash" color="#999" size="42"></u-icon>
				</view>
			</view>
			<view class="lately-list">
				<view class="lists" v-for="(item,index) in latelyLists" :key="index" @click="toSearch()">
					{{item}}
				</view>
			</view>
		</view>
		<!-- 热门搜索 -->
		<view class="hot">
			<view class="hot-text">
				热门搜索
			</view>
			<view class="hot-list">
				<view class="hot-lists" v-for="(item,index) in latelyLists" :key="index" @click="toSearch()">
						{{item}}
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
				latelyLists: ["超值套餐", "人气套餐", "煲仔饭全系", "自助", "木桶饭", "螺蛳粉"]
			}
		},
		mounted() {

		},
		methods: {
			toSearch(){
				uni.navigateTo({
					url:"/pages_search/classifySearch/classifySearch"
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("./search.less");
</style>
