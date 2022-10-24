<template>
	<view class="list">
		<view class="v-list" v-for="(item,index) in list" :key="index">
			<view class="number flex-l-r">
				<view class="count-text">
					<view class="count">#66</view>
					<view class="text">立即送达/平台送达</view>
				</view>
				<view class="state">
					<view class="text" @click="isChecked = !isChecked">出仓</view>
					<u-checkbox-group width="15px">
						<u-checkbox v-model="isChecked" size="28" shape="circle" active-color="#f8cf39"></u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
			<view class="info flex-l-r">
				<view class="name-phone">
					<view class="name">
						<text class="v-name">安先生</text>
						<text class="payNum">下单<text>66</text>次</text>
					</view>
					<view class="phone">
						15678960557
					</view>
				</view>
				<view class="notice">
					<u-icon name="bell-fill" color="#FC9A26" size="28"></u-icon>
					<view class="text">发送通知</view>
				</view>
			</view>
			<view class="address">
				天河区光明街道光明小区2栋2209号
			</view>
			<view class="productList flex-l-r">
				<view class="text-time">
					<view class="text">
						<view class="name">商品明细</view>
						<u-icon name="arrow-right" color="#999" size="30"></u-icon>
					</view>
					<view class="time">
						2022.06.06 16：26: 26
					</view>
				</view>
				<view class="open-close" @click="isShow = !isShow">
					<text>折叠</text>
					<u-icon name="arrow-down" color="#f8cf39" size="22"></u-icon>
				</view>
			</view>
			<!-- show -->
			<view class="isShow" v-show="isShow">
				<view class="setMeal flex-l-r" v-for="(item,index) in setMealList">
					<view class="title">升级版全家福套餐 <text>x2</text> </view>
					<view class="price">
						<view class="old">¥19</view>
						<view class="new">¥15</view>
					</view>
				</view>
				<view class="showList flex-l-r" v-for="(item,index) in showList">
					<view class="text">包装费</view>
					<view class="price"> <text>¥</text> 2</view>
				</view>
				<view class="total">
					<view class="text">合计:</view>
					<view class="beCareful">
						注：顾客使用优惠，本单顾客实付 <text>¥61</text>
					</view>
				</view>
				<view class="income flex-l-r">
					<view class="text">本单预计收入</view>
					<view class="price">¥61</view>
				</view>
				<view class="remarks">
					本单备注：无
				</view>
			</view>
			<view class="s-refund">
				<view class="reason">退款原因：<text>个人原因</text> </view>
				<view class="money">退款金额： <text>全部图款（¥61）</text> </view>
			</view>
			<view class="btns clearFixed">
				<u-button class="fr" shape="circle" size="mini" type="primary">同意le,</u-button>
				<u-button class="fr" shape="circle" size="mini" type="primary">同意退款</u-button>
				<u-button class="fr" shape="circle" size="mini" type="primary">拒绝退款</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {}
		},
		data() {
			return {
				isChecked: true,

				setMealList: 2,
				showList: 7,

				isShow: false,

			}
		},
		onLoad() {
			console.log(this.list);
		}
	}
</script>

<style lang="less">
	@import url("./list.less");
</style>
