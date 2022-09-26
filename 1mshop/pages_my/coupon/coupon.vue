<template>
	<view class="coupon">
		<view class="bg">
			<!-- 返回 -->
			<view class="back" :style="{top:Top + 'px'}" @click="back()">
				<u-icon name="arrow-left" color="#FFF" size="36"></u-icon>
			</view>
			<view class="text">
				<view>券包中心</view>
				<view>领券购买，更划算！</view>
			</view>
			<view class="myCoupon" @click="tomyCoupon()">
				<view class="name">我的券包</view>
				<u-icon name="arrow-right" color="#FFF" size="24"></u-icon>
			</view>
		</view>
		<!-- 领券 列表 -->
		<view class="receiveCoupon">
			<view class="v-receiveCoupon" v-for="(item,index) in couponList" :key="index">
				<view class="price-border">
					<!-- 圆 -->
					<view class="left-round"></view>
					<view class="right-round"></view>
					<view class="price">
						<view class="v-price">
							<view class="num">
								¥<text>20</text>
							</view>
							<view class="full">满35元可用</view>
						</view>
						<view class="v-coupon">
							<view class="text">
								<h4 @click="toCouponDetails(item)">会员优惠券</h4>
								<view class="date">2022.06.06-2022.06.26</view>
								<view class="details" @click="isShowDetails(item,index)">
									展开详情 <u-icon name="arrow-down" color="#999" size="24"></u-icon>
								</view>
							</view>
							<view class="btn">
								<u-button :text="item.text" shape="circle" :color="item.color" :disabled="item.disabled"
									size="mini" @click="redPackCouponShow1 = true">
								</u-button>
							</view>
						</view>
					</view>
				</view>
				<view class="introduce" v-show="item.isShow">
					<view class="">
						1.限指定手机尾号韦6999使用
					</view>
					<view class="">
						2.限商品现价+包装费等满25元使用
					</view>
					<view class="">
						3.限2022.06.03-2022.06.09期间使用
					</view>
				</view>
			</view>
		</view>

		<!-- 弹窗 -->
		<!-- 未打开 -->
		<view class="notOpen">
			<u-popup mode="center" round="30" :show="redPackCouponShow1" @close="redPackCouponShow1 =false">
				<view class="content">
					<image src="/static/mipmap-mdpi1/redPackCoupon1.png" mode=""></image>
					<h3>您有一个红包可领取</h3>
					<view class="text">
						最高可得100元优惠券
					</view>
					<view class="openText" :class="isOpen ? 'active' : ''" @click="openPack()">开</view>
					<view class="close" @click="redPackCouponShow1 =false">×</view>
				</view>
			</u-popup>
		</view>
		<!-- 已打开 -->
		<view class="alreadyOpen">
			<u-popup mode="center" round="30" :show="redPackCouponShow2" @close="redPackCouponShow2 =false">
				<view class="content">
					<image src="/static/mipmap-mdpi1/redPackCoupon2.png" mode=""></image>
					<view class="v-content">
						<h3>恭喜，获得5元平台券</h3>
						<view class="text">满25元可用</view>
						<view class="surplus">还剩2个券包</view>
						<view class="list">
							<view class="v-list" v-show="index < 3" v-for="(item,index) in redPackList" :key="index">
								<view class="image">
									<!-- <image src="" mode=""></image> -->
								</view>
								<view class="title-time">
									<view class="v-title-time">
										<h5>{{item.title}}</h5>
										<view class="time">
											2022.09.09 18:00
										</view>
									</view>
									<view class="price">
										<text class="v-price">5.00</text>
										<view class="price-image" v-show="item.isCrown">
											<image src="/static/mipmap-mdpi1/crown.png" mode=""></image>
											<text>手气最佳</text>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="more">
							查看全部领取名单
						</view>
					</view>
					<view class="close" @click="redPackCouponShow2 =false">×</view>
				</view>
			</u-popup>
		</view>
		<!-- 未使用 -->
		<view class="notUsed">
			<u-popup mode="center" round="30" :show="redPackCouponShow4" @close="redPackCouponShow4 =false">
				<view class="content">
						<image src="/static/mipmap-mdpi1/redPackCoupon4.png" mode=""></image>
						<h3>未抢到</h3>
						<view class="text">
							很抱歉，您满了一步，红包已经被抢光啦~
						</view>
						<view class="other">
							点击<text>券包中心</text>，领其他优好券
						</view>
						<view class="close" @click="redPackCouponShow4 =false">×</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Top: "",
				couponList: [{
						isShow: true,
						text: "领取",
						color: "#F24849",
						disabled: false
					},
					{
						isShow: false,
						text: "已领取",
						color: "#F24849",
						disabled: true
					},
					{
						isShow: false,
						text: "已抢光",
						color: "#CCCCCC",
						disabled: true
					}
				],
				redPackCouponShow1: false,
				isOpen: false,
				redPackCouponShow2: false,
				redPackList: [{
						title: "CHENXIE",
						isCrown: true
					},
					{
						title: "CHENXIE1",
						isCrown: false
					},
					{
						title: "CHENXIE2",
						isCrown: false
					}
				],
				redPackCouponShow4:true,
			}
		},
		onReady() {

			// #ifdef MP-WEIXIN
			const custom = wx.getMenuButtonBoundingClientRect();
			this.Top = custom.top + (custom.height - 18) / 2;
			// #endif

		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1,
				})
			},
			tomyCoupon() {
				uni.navigateTo({
					url: "/pages_my/myCoupon/myCoupon"
				})
			},
			toCouponDetails() {
				uni.navigateTo({
					url: "/pages_my/couponDetails/couponDetails?id=1"
				})
			},
			// 展开
			isShowDetails(item, index) {
				item.isShow = !item.isShow;
			},
			openPack() {
				this.isOpen = true;
				let timer = null;
				timer = setTimeout(() => {
					this.isOpen = false;
					timer = null;
					clearTimeout(timer);
					this.redPackCouponShow1 = false;
					this.redPackCouponShow2 = true;
				}, 3000)
			}
		}
	}
</script>

<style lang="less">
	@import url("./coupon.less");
</style>
