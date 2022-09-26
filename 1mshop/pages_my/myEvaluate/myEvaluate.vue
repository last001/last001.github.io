<template>
	<view class="myEvaluate">
		<view class="tabsLists" :style="{top:headerTop + 'px'}">
			<u-sticky bgColor="#fff">
				<u-tabs :list="list2" :scrollable="false" :current="current" lineWidth="44" lineHeight="6"
					lineColor="#F8CF39" :activeStyle="{
			    color: '#333333',
			    fontWeight: 'bold',
			    transform: 'scale(1.05)'
			}" :inactiveStyle="{
			    color: '#333',
			    transform: 'scale(1)'
			}" itemStyle="padding-left: 10px; padding-right: 10px;" @change="switchPage"></u-tabs>
			</u-sticky>
		</view>
		<!-- 全部 -->
		<view class="all" v-show="current == 0">
			<view class="v-all" v-for="(item,index) in lists" :key="index">
				<view class="title">
					<view class="title-image">
						<image src="../../static/mipmap-mdpi1/timeLImitList1.png" mode=""></image>
					</view>
					<text class="name">荷叶饭撞江奈</text>
					<u-icon name="arrow-right" color="999" size="26"></u-icon>
				</view>
				<view class="main-image">
					<view class="image">
						<image src="../../static/mipmap-mdpi1/timeLImitList1.png" mode=""></image>
					</view>
					<view class="text">
						升级版全家福套餐
					</view>
					<view class="count">
						共1件
					</view>
				</view>
				<view class="time-pay">
					<view class="time">
						下单时间：2022-06-06 16:09
					</view>
					<view class="pay">
						已支付：¥<text>99.99</text>
					</view>
				</view>
				<view class="btn" v-if="item.notEvaluate">
					<u-button text="评价" color="#f8cf39" size="small" shape="circle" @click="toPulish()"></u-button>
				</view>
				<view class="btn" v-else>
					<u-button text="追加评价" :plain="true" color="#f8cf39" size="small" shape="circle"
						@click="toFollowUp()"></u-button>
				</view>
			</view>
		</view>
		<!-- 待评价 -->
		<view class="wait-evaluate" v-show="current == 1">
			<h3>待评价</h3>
		</view>
		<!-- 已评价/追评 -->
		<view class="already-evaluate" v-show="current == 2">
			<view class="v-already-evaluate" v-for="(item,index) in lists2" :key="index">
				<view class="show-time">
					<view class="time">
						2022/06/06
					</view>
					<view class="isShow" @click="toShowFace(item)">
						<u-icon :name="item.iconText"></u-icon>
						<text class="text">{{item.isShowText}}</text>
						<u-icon :name="item.iconText1" color="#999" size="22"></u-icon>
					</view>
				</view>
				<view class="default">
					由于您未及时填写评价内容，系统已自动默认评价~
				</view>
				<!-- 展示内容 -->
				<view class="image-list" v-if="item.isShow">
					<view class="evaluate-text">
						<text>用户15天后追评：</text>二次回购了，很不错！
					</view>
					<view class="list">
						<image src="../../static/mipmap-mdpi1/timeLImitList1.png" mode=""></image>
						<image src="../../static/mipmap-mdpi1/timeLImitList1.png" mode=""></image>
					</view>
				</view>
				<view class="image-title">
					<view class="image">
						<image src="../../static/mipmap-mdpi1/timeLImitList1.png" mode=""></image>
					</view>
					<view class="title">
						<view class="v-title">
							升级版全家福套餐
						</view>
						<view class="rate">
							<text class="name">评分</text>
							<u-rate :value="5" size="30" gutter="2" :allowHalf="true" activeColor="#FFD739" readonly>
							</u-rate>
						</view>
					</view>
				</view>
				<view class="btn">
					<u-button text="追加评价" shape="circle" :plain="true" color="#f8cf39" size="small" @click="toFollowUp()"></u-button>
					<u-button text="删除评价" shape="circle" :plain="true" color="#333" size="small"></u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				headerTop: 0,
				list2: [{
						name: '全部',
					}, {
						name: '待评价',
					},
					{
						name: '已评价/追评',
					}
				],
				lists: [{
						notEvaluate: true,
						isShow: false,
					},
					{
						notEvaluate: false,
						isShow: true,
					},
				],
				lists2: [{
						isShow: false,
						isShowText: "公开",
						iconText: "eye-fill",
						iconText1: "arrow-down"
					},
					{
						isShow: true,
						isShowText: "隐藏",
						iconText: "eye-off",
						iconText1: "arrow-up"
					},
				]
			}
		},
		onLoad() {

		},
		mounted() {
			this.headerTop = uni.getSystemInfoSync().windowTop;
		},
		methods: {
			switchPage(item) {
				console.log("item ==>", item);
				this.current = item.index;
			},
			// 公开 隐藏
			toShowFace(item) {
				console.log("item ==>", item);
				if (item.isShow) {
					item.iconText = "eye-fill";
					item.isShowText = "公开";
					item.iconText1 = "arrow-down";
				} else {
					item.iconText = "eye-off";
					item.isShowText = "隐藏";
					item.iconText1 = "arrow-up";
				}
				item.isShow = !item.isShow;

			},
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
			}
		}
	}
</script>

<style lang="less">
	@import url("myEvaluate.less");
</style>
