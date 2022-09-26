<template>
	<view class="PayOnBehalf">
		<view class="payMoney">
			<view class="text">
				需帮好友付金额
			</view>
			<view class="money">
				￥26.99
			</view>
			<view class="time">
				<text>剩余支付时间</text>
				<u-count-down :time="30  * 60 * 1000" format="mm:ss"></u-count-down>
			</view>
		</view>
		<!-- 微信支付 -->
		<view class="wechatPay">
			<view class="v-wechatPay">
				<view class="image-text">
					<view class="image">
						<image src="/static/mipmap-mdpi1/wxPay.png" mode=""></image>
					</view>
					<view class="text">
						微信支付
					</view>
				</view>
				<view class="icon">
					<u-checkbox-group>
						<u-checkbox shape="circle" size="36" activeColor="#f8cf39" :checked="checked">
						</u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
		</view>
		<!-- btn -->
		<view class="btn">
			<u-button text="拒绝" color="#F24849"></u-button>
			<u-button text="帮他付" color="#f8cf39"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				checked:true,
			}
		}
	}
</script>

<style lang="less">
	@import url("./PayOnBehalf.less");
</style>