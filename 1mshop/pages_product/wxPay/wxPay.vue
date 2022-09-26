<template>
	<view class="wxPay">
		<view class="payMoney">
			<view class="cancel">
				取消支付
			</view>
			<view class="text">
				需付金额
			</view>
			<view class="money">
				￥26.99
			</view>
			<view class="time">
				<text>剩余支付时间</text>
				<u-count-down :time="30 * 60 * 1000" format="mm:ss"></u-count-down>
			</view>
		</view>
		<!-- 微信支付 + 好友代付 -->
		<view class="wechatPay">
			<view class="v-wechatPay" v-for="(item,index) in lists" :key="index" @click="switchPay(item)">
				<view class="image-text">
					<view class="image">
						<image src="/static/mipmap-mdpi1/wxPay.png" mode=""></image>
					</view>
					<view class="text">
						{{item.text}}
					</view>
				</view>
				<view class="icon">
					<u-checkbox-group>
						<u-checkbox shape="circle" size="36" activeColor="#f8cf39" :checked="item.isChecked">
						</u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
		</view>
		<!-- btn -->
		<view class="btn">
				<u-button text="确认" color="#f8cf39" @click="confirm()"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists:[
					{text:"微信支付",isChecked:true},
					{text:"好友支付",isChecked:false},
				]
			}
		},
		onReady() {
			// 状态栏高度
			// #ifdef H5
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			// #endif
		},
		methods: {
			// 选择支付方式
			switchPay(item){
				this.lists.forEach(e =>{
					e.isChecked = false;
				})
				item.isChecked = true;
			},
			// 确认
			confirm(){
				this.lists.forEach((e,index) =>{
					if(e.isChecked){
						if(index == 0){
							console.log("微信支付")
							uni.navigateTo({
								url:"/pages_product/pay/pay"
							})
						}else{
							uni.navigateTo({
								url:"/pages_product/PayOnBehalf/PayOnBehalf"
							})
						}
					}
					return;
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("./wxPay.less");
</style>
