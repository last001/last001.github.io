<template>
	<view class="couponDetails">
		<headerBox :info='info'></headerBox>
		<!-- 好友赠送 -->
		<view class="friendGive" v-if="isfriendGive">
			<view class="title">
				<h3>好友给您发来一张优惠券</h3>
			</view>
			<view class="text">
				送你一张优惠券，记得领取哦~
			</view>
		</view>
		<view class="couponList" :style="{marginTop:isfriendGive ? '' : marginTop}">
			<view class="v-couponList" v-for="(item,index) in couponList" :key="index">
				<view class="price-border">
					<!-- 圆 -->
					<view class="left-round"></view>
					<view class="right-round"></view>
					<view class="price">
						<view class="v-price">
							<view class="num">
								¥<text>20</text>
							</view>
							<view class="full">满25元可用</view>
						</view>
						<view class="coupon">
							<view class="text">
								<h4>新人专享优惠券 <text class="giveCoupon" v-if="item.isGive">亲友赠送</text> </h4>
								<view class="date">2022.06.06-2022.06.26</view>
								<view class="details" @click="isShowDetails(item,index)">
									展开详情 <u-icon name="arrow-down" color="#999" size="24"></u-icon>
								</view>
							</view>
							<!-- <view class="btn">
								<u-button text="使用" shape="circle" :plain="true" color="#f8cf39"
									size="mini"></u-button>
							</view> -->
						</view>
						<!-- 右上角标签 -->
						<!-- <view class="tag" v-if="item.isTag" :style="{backgroundColor:item.tagBgcolor}">
							{{item.tagText}}
						</view> -->
					</view>
				</view>
				<view class="introduce" v-if="item.isShow">
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
		<!-- 赠送规则 -->
		<view class="explain">
			<h3>赠送规则</h3>
			<view>1、亲友超时未领取则自动退回原账户</view>
			<view>2、限商品现价+包装费+配送费等满25元使用</view>
			<view>3、限2022.06.06~2022.06.29期间使用</view>
		</view>

		<!-- btn1 -->
		<view class="btn" v-if="isfriendGive">
			<u-button text="拒绝" shape="circle" :plain="true" color="#F24849" @click="openPop(0)"></u-button>
			<u-button text="领取" shape="circle" :plain="true" color="#F8CF39" @click="openPop(1)"></u-button>
		</view>
		<!-- btn -->
		<view class="btn" v-else>
			<u-button text="去赠送" shape="circle" :plain="true" color="#F24849"></u-button>
			<u-button text="去使用" shape="circle" :plain="true" color="#F8CF39"></u-button>
		</view>
		<!-- 弹窗 -->
		<view class="btnShow">
			<u-popup :show="btnShow" :safeAreaInsetBottom="false" :round="30" mode="center" @close="btnShow = false">
				<view class="content">
					<h3>{{btnShowList.title}}</h3>
					<view class="text">{{btnShowList.text}}</view>
					<view class="btns">
						<u-button :text="btnShowList.btnText1" size="32" :plain="true" color="#333"></u-button>
						<u-button :text="btnShowList.btnText2" size="32" :plain="true" color="#F8CF39"></u-button>
						<!-- <view class="btn1">
						</view>
						<view class="btn2">
						</view> -->
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import headerBox from "@/component/headerBox/headerBox.vue"
	export default {
		name: "header-box",
		data() {
			return {
				marginTop:"",
				// 自定义导航栏 
				info: {
					title: "优惠券详情",
					bgColor: "linear-gradient(to right , #F6CE42 ,#FFE78F)",
					// bgColor:"#fff",
				},
				// friendGive  状态
				isfriendGive: true,
				// 券包 列表
				couponList: [
					// {isShow:false,isGive:false},
					{
						isShow: false,
						isGive: true
					},
				],
				// 弹窗 + 内容
				btnShow: false,
				btnShowList: {}
			}
		},
		onLoad(option) {
			if (option.id == 0) {
				this.isfriendGive = true;
				this.info = {
					title: "优惠券详情",
					bgColor: "linear-gradient(to right , #F6CE42 ,#FFE78F)"
				}
			} else {
				this.isfriendGive = false;
				this.info = {
					title: "优惠券详情",
					bgColor: "#fff"
				}
			}
			
			// 000
			// #ifdef H5
			this.marginTop = 0;
			// #endif
			// #ifdef MP-WEIXIN
			this.marginTop = '80rpx';
			// #endif

		},
		methods: {
			// 展开
			isShowDetails(item, index) {
				item.isShow = !item.isShow;
			},
			// 点击 jujue  或者  领取
			openPop(string) {
				if (string == 1) {
					this.btnShowList = {
						title: "领取成功",
						text: "已成功将优惠券放入券包",
						btnText1: "我的券包",
						btnText2: "去使用",
					}
				} else {
					this.btnShowList = {
						title: "已拒绝领取",
						text: "已成功将商品卡退回",
						btnText1: "返回首页",
						btnText2: "券包中心",
					}
				}
				this.btnShow = true;
			}
		},
		components: {
			headerBox
		}
	}
</script>
<style lang="less">
	@import url("./couponDetails.less");
</style>
