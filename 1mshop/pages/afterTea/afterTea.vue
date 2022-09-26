<template>
	<view class="afterTea">
		<view class="banner">
			<image src="/static/mipmap-mdpi1/teaBanner.png" mode=""></image>
		</view>
		<!-- 商品 -->
		<productList :list="productList"></productList>
	</view>
</template>
<script>
	import productList from "@/component/productList/productList.vue"
	export default {
		name:"afterTea",
		data() {
			return {
				lists:2,
				productList:[
					{url:"",title:"标题一标题一标题一",rate:9.8,deliveryText:"商家自送"},
					{url:"",title:"标题二标题二标题二",rate:9.5,deliveryText:"平台配送"},
				]
			}
		},
		components:{
			productList
		},
	}
</script>
<style lang="less">
	@import url("@/pages/afterTea/afterTea.less");
</style>