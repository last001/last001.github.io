<template>
	<view class="myCoupon">
		<!-- tabs -->
		<view class="tabsLists" :style="{top:headerTop + 'px'}">
			<u-sticky bgColor="#fff">
				<u-tabs :list="list2" :current="current" lineWidth="44" lineHeight="6" lineColor="#F8CF39" :activeStyle="{
		    color: '#333333',
		    fontWeight: 'bold',
		    transform: 'scale(1.05)'
		}" :inactiveStyle="{
		    color: '#333',
		    transform: 'scale(1)'
		}" itemStyle="padding-left: 10px; padding-right: 18px;" @change="switchPage"></u-tabs>
			</u-sticky>
		</view>
		<!-- 优惠券 lists-->
		<!-- 未使用 -->
		<view class="couponList" v-show="current == 0">
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
								<h4>平台优惠券 <text class="giveCoupon" v-show="item.isGive">亲友赠送</text> </h4>
								<view class="date">2022.06.06-2022.06.26</view>
								<view class="details" @click="isShowDetails(item,index)">
									展开详情 <u-icon name="arrow-down" color="#999" size="24"></u-icon>
								</view>
							</view>
							<view class="btn">
								<u-button text="使用" shape="circle" :plain="true" color="#f8cf39"
									size="mini" @click="toCouponDetails(item)"></u-button>
							</view>
						</view>
						<!-- 右上角标签 -->
						<view class="tag" v-show="item.isTag" :style="{backgroundColor:item.tagBgcolor}">
							{{item.tagText}}
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
		<!-- 已使用 -->
		<view class="couponList1" v-show="current == 1">
			<view class="v-couponList1" v-for="(item,index) in couponList1" :key="index">
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
								<h4>新人专享优惠券</h4>
								<view class="date">2022.06.06-2022.06.26</view>
								<view class="details">
									展开详情 <u-icon name="arrow-down" color="#999" size="24"></u-icon>
								</view>
							</view>
							<view class="btn">
								<u-button text="已使用" shape="circle" :plain="true" color="#999"
									size="mini"></u-button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 已失效 -->
		<view class="couponList2" v-show="current == 2">
			<view class="v-couponList2" v-for="(item,index) in couponList2" :key="index">
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
								<h4>新人专享优惠券</h4>
								<view class="date">2022.06.06-2022.06.26</view>
								<view class="details">
									展开详情 <u-icon name="arrow-down" color="#999" size="24"></u-icon>
								</view>
							</view>
							<view class="btn">
								<u-button text="已使用" shape="circle" :plain="true" color="#999"
									size="mini"></u-button>
							</view>
						</view>
						<!-- 右上角标签 -->
						<view class="tag">
							已过期
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				headerTop: 0,
				current:0,
				list2: [{
						name: '未使用',
					}, {
						name: '已使用',
					},
					{
						name: '已失效',
					}
				],
				// 未使用
				couponList:[
					{isShow:true,isTag:true,tagText:"新领取",tagBgcolor:"#F24849",isGive:false},
					{isShow:false,isTag:true,tagText:"即将过期",tagBgcolor:"#F8CF39",isGive:false},
					{isShow:false,isTag:false,tagText:"",tagBgcolor:"",isGive:false},
					{isShow:false,isTag:true,tagText:"可转赠",tagBgcolor:"#F24849",isGive:true},
				],
				// 已使用
				couponList1:2,
				// 已过期
				couponList2:2
			}
		},
		onReady() {
			
		},
		mounted() {
			this.headerTop = uni.getSystemInfoSync().windowTop;
		},
		methods:{
			switchPage(item){
				this.current = item.index;
			},
			// 展开
			isShowDetails(item,index){
				item.isShow = !item.isShow;
			},
			//  优惠券详情
			toCouponDetails(item){
				if(item.isGive){
					uni.navigateTo({
						url:"/pages_my/couponDetails/couponDetails?id=" + 0
					})
				}else{
					uni.navigateTo({
						url:"/pages_my/couponDetails/couponDetails?id=" + 1
					})
				}
				
			}
		}
	}
</script>

<style lang="less">
	@import url("./myCoupon.less");
</style>