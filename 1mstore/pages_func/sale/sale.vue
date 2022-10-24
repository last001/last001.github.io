<template>
	<view class="sale">
		<view class="list flex-l-r" v-for="(item,index) in titleList" :key="index" @click="swtichList(item,index)">
			<view class="icon-title flex-center-cs-r">
				<view class="icon">
					<image :src="item.iconSrc" mode=""></image>
				</view>
				<view class="title">
					{{item.title}}
				</view>
			</view>
			<view class="icon-tips flex-center-cs-r">
				<view class="tips">
					{{item.tips}}
				</view>
				<view class="icon">
					<u-icon name="arrow-right" color="#999" size="28"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"sale",
		data(){
			return {
				titleList:[
					{title:"热销活动",iconSrc:"/static/image/pending_h.png",tips:"设置"},
					{title:"折扣商品",iconSrc:"/static/image/business_h.png",tips:"设置",routerSrc:"/pages_sale/discount/discount"},
					{title:"秒杀活动",iconSrc:"/static/image/pending_h.png",tips:"设置"},
					{title:"限量抢购",iconSrc:"/static/image/business_h.png",tips:"设置"},
					{title:"特惠商品",iconSrc:"/static/image/pending_h.png",tips:"设置"},
					{title:"特展商品",iconSrc:"/static/image/business_h.png",tips:"设置"},
					{title:"商家拼单活动",iconSrc:"/static/image/pending_h.png",tips:"设置"},
					{title:"平台拼单活动",iconSrc:"/static/image/business_h.png",tips:"申请"},
				]
			}
		},
		methods:{
			swtichList(item,index){
				console.log(item.routerSrc);
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
	@import url("./sale.less");
</style>