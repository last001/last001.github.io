<template>
	<view class="evaluateSuccess">
		<view class="successTip">
			<view class="image-tip">
				<!-- <image src="/static/mipmap-mdpi/evaluateSuccess.png" mode=""></image> -->
				<text>评价成功</text>
			</view>
			<view class="text">
				已成功评价，感谢您的支持！
			</view>
			<view class="btn">
				<u-button text="查看我的评价" shape="circle" color="#f8cf39" size="small" @click="toEvaluete()"></u-button>
			</view>
		</view>

		<!-- 111 -->
		<view class="lists">
			<view class="list" v-for="(item,index) in lists" :key="index">
				<view class="time">
					<text class="timeText">2022/05/06</text>
					<view class="isShow" v-if="item.isEvaluate">
						<u-icon :name="item.isShowList.iconText"></u-icon>
						<text class="text">{{item.isShowList.isShowText}}</text>
						<u-icon :name="item.isShowList.iconText1" color="#999" size="22"></u-icon>
					</view>
				</view>
				<view class="tip">
					{{item.tip}}
				</view>
				<!-- 1232 -->
				<view class="image-title">
					<view class="image">
						<image src="/static/mipmap-mdpi1/timeLImitList1.png" mode=""></image>
					</view>
					<view class="title">
						<text>麻辣烫全家福套餐</text>
						<u-rate :value="item.value" size="45" gutter="0" inactiveColor="#fff" activeColor="#FFD739">
						</u-rate>
					</view>
				</view>
				<view class="btn" v-if="item.isEvaluate">
					<u-button text="追加评价" shape="circle" color="#f8cf39" size="small" :plain="true" @click="toFollowUp()"></u-button>
				</view>
				<view class="btn" v-else>
					<u-button text="评价" shape="circle" color="#f8cf39" size="small" @click="toPulish()"></u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists: [{
						tip: "您还未进行评价，可对此进行评价",
						isEvaluate: false,
						value:0
					},
					{
						tip: "由于您未及时填写评价内容，系统已自动默认评价~",
						isEvaluate: true, // 匿名
						value:3,
						isShowList: {
							isShow: false,
							isShowText: "公开",
							iconText: "eye-off",
							iconText1: "arrow-down"
						},
					},
					{
						tip: "由于您未及时填写评价内容，系统已自动默认评价~",
						isEvaluate: true,
						value:3,
						isShowList: {
							isShow: true,
							isShowText: "匿名",
							iconText: "eye-fill",
							iconText1: "arrow-up"
						},
					},
				],

			}
		},
		methods: {
			// to发布平价
			toPulish() {
				uni.navigateTo({
					url: "/pages/publishEvaluate/publishEvaluate"
				})
			},
			// to追评
			toFollowUp() {
				uni.navigateTo({
					url: "/pages/followUpEvaluate/followUpEvaluate"
				})
			},
			// to 我的评价
			toEvaluete(){
				uni.navigateTo({
					url: "/pages/myEvaluate/myEvaluate"
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("@/pages/evaluateSuccess/evaluateSuccess.less");
</style>
