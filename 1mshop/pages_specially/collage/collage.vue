<template>
	<view class="collage">
		<view class="collage-lists" v-for="(item,index) in lists" :key="index">
			<view class="lists-image">
				<image src="/static/mipmap-mdpi1/timeLImitList1.png" mode=""></image>
				<!-- 22:22 -->
				<view class="time">
					22:22 
				</view>
			</view>
			<view class="lists-text">
				<view class="title">
					刘记麻辣香锅全家福套餐【递减拼】
				</view>
				<view class="money">
					<text>拼团价：</text>
					<text> <text class="sign">￥</text> 22</text>
					<text>￥26</text>
				</view>
				<view class="btn">
					<u-button type="primary" size="small" color="#F24849" :disabled="true" text="已抢光"></u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				lists:5
			}
		}
	}
</script>

<style lang="less">
	@import url("./collage.less");
</style>