<template>
	<view class="submitOrder">
		<view class="modeTitle" v-if="state == 0">
			<view class="takeOut" @click="state = 0">
				外卖配送
				<view class="triangle"></view>
			</view>
			<view class="takeYouerself" @click="state = 1">
				到店自取
				<view class="triangle"></view>
			</view>
		</view>
		<!-- 000000000 -->
		<view class="modeTitle1" v-else>
			<view class="takeOut" @click="state = 0">
				外卖配送
				<view class="triangle"></view>
			</view>
			<view class="takeYouerself" @click="state = 1">
				到店自取
				<view class="triangle"></view>
			</view>
		</view>
		<!-- 地址 + 名字 -->
		<!-- 切换地址 000 111 -->
		<view class="takeOut" v-show="state == 0">
			<view class="address-phone">
				<view class="address">
					广州市天河区光明街道光明小区2栋2209号
					<u-icon size="32" name="arrow-right" color="#999"></u-icon>
				</view>
				<view class="phone">
					<text>刘限时先生</text>
					<text>139-2237-3899</text>
				</view>
			</view>
			<view class="time">
				<view class="v-time">配送时间</view>
				<view class="delivery">
					<text class="text">立即送出</text>
					<u-icon name="arrow-right" color="#999" size="26"></u-icon>
				</view>
			</view>
		</view>
		<view class="takeIt" v-show="state == 1">
			<view class="address-gap">
				<view class="address">
					广州市天河区光明街道光明小区2栋2209号
					<u-icon size="32" name="arrow-right" color="#999"></u-icon>
				</view>
				<view class="gap">
					<text>距您2.9km</text>
					<text @click="getLocation()">查看地图</text>
				</view>
			</view>
			<view class="time-info">
				<view class="time">
					<view class="v-time">自取时间</view>
					<view class="v-icon">
						<text>16:16</text>
						<u-icon name="arrow-right" color="#999" size="24"></u-icon>
					</view>
				</view>
				<view class="info">
					<view class="v-info">预留信息</view>
					<view class="v-icon">
						<text>刘经典&nbsp;&nbsp;15678902154</text>
						<u-icon name="arrow-right" color="#999" size="24"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<!-- 套餐 -->
		<view class="orderContent">
			<view class="orderTitle">
				荷叶饭撞江奈
			</view>
			<view class="orderList">
				<view class="v-orderList" v-for="(item,index) in orderList" :key="index">
					<view class="image">
						<image src="/static/mipmap-mdpi1/timeLImitList1.png" mode=""></image>
					</view>
					<view class="price-count">
						<view class="price">
							<h5>升级版全家福套餐</h5>
							<text class="v-price">
								￥99.99
							</text>
						</view>
						<view class="count">
							x1
						</view>
					</view>
				</view>
			</view>
			<view class="packPrice cost">
				<view>包装费</view>
				<view>¥2</view>
			</view>
			<view class="delivery cost">
				<view>配送费</view>
				<view>¥2</view>
			</view>
			<view class="discount coupon">
				<view class="image-text">
					<view class="image">
						<!-- <image src="/static/mipmap-mdpi/redBag.png" mode=""></image> -->
					</view>
					<view class="text">
						平台优惠券
					</view>
				</view>
				<view class="pop-icon" @click="discountState = true">
					<text class="pop">暂无可用</text>
					<u-icon name="arrow-right" color="#999" size="24"></u-icon>
				</view>
			</view>
			<view class="cash coupon" @click="couponState = true">
				<view class="image-text">
					<view class="image">
						<!-- <image src="/static/mipmap-mdpi/cost.png" mode=""></image> -->
					</view>
					<view class="text">
						商家代金券
					</view>
				</view>
				<view class="pop-icon">
					<text class="pop">暂无可用</text>
					<u-icon name="arrow-right" color="#999" size="24"></u-icon>
				</view>
			</view>
			<view class="total">
				<view class="prefer">
					<text>已优惠</text>
					<text>¥9.9</text>
				</view>
				<view class="v-total">
					<text>小计¥</text>
					<text>19.99</text>
				</view>
			</view>
		</view>
		<!-- 会员层 -->
		<view class="memberFace">
			<view class="v-memberFace">
				<view class="setMember">
					<view class="text">
						<text>9.9开通会员</text>
						<u-icon name="info-circle" size="32" color="#666"></u-icon>
					</view>
					<u-checkbox-group >
						<u-checkbox :checked="memberSet" size="40" shape="circle" activeColor="#F8CF39">
						</u-checkbox>
					</u-checkbox-group>
				</view>
				<view class="text">
					选择开通会员，预计可为您节省<text>169</text>元
				</view>
				<view class="imageList">
					<view class="image" v-for="(item,index) in imageLists" :key="index">
						<!-- <image src="/static/mipmap-mdpi/noodle.png" mode=""></image> -->
					</view>
					<view class="total">
						共<text>9</text>张
					</view>
				</view>
				<view class="tips">
					现在开通会员，可享受更多商家及红包优惠！
				</view>
			</view>
		</view>

		<!-- 支付方式 + 备注 -->
		<view class="payMode">
			<view class="wx">
				<view class="title">
					支付方式
				</view>
				<view class="text-icon">
					<text class="text">微信支付</text>
					<u-icon name="arrow-right" color="#999" size="26"></u-icon>
				</view>
			</view>
			<view class="remask">
				<view>备注</view>
				<view class="inp-icon">
					<input type="text" placeholder="口味偏好等要求">
					<u-icon name="arrow-right" color="#999" size="26"></u-icon>
				</view>
			</view>
		</view>

		<!-- 支付按钮 -->
		<view class="payBtn">
			<view class="price-discount">
				<view class="price">
					¥19.99
				</view>
				<view class="discount">
					已优惠¥9.9
				</view>
			</view>
			<view class="otherPay">
				找人付
			</view>
			<view class="pay" @click="toPay()">
				去支付
			</view>
		</view>

		<!-- 优惠券层 -->
		<view class="discountFace">
			<u-popup mode="bottom" :round="30" :show="discountState" @close="discountState = false">
				<view class="content">
					<h3>优惠券选择</h3>
					<!-- 平台优惠 -->
					<view class="discount">
						<view class="v-discount">
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
											<h4>平台优惠券</h4>
											<view class="date">2022.06.06-2022.06.26</view>
											<view class="details">
												展开详情 <u-icon name="arrow-down" color="#999" size="24"></u-icon>
											</view>
										</view>
										<view class="btn">
											<u-button text="使用" shape="circle" :plain="true" color="#f8cf39"
												size="mini"></u-button>
										</view>
									</view>
								</view>
							</view>
							<view class="introduce">
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
					<!-- 会员优惠券-->
					<view class="member">
						<view class="price-border">
							<!-- 圆 -->
							<view class="left-round"></view>
							<view class="right-round"></view>
							<view class="price">
								<view class="v-price">
									<view class="num">
										¥<text>20</text>
									</view>
									<view class="full">无门槛</view>
								</view>
								<view class="coupon">
									<view class="text">
										<h4>会员优惠券</h4>
										<view class="date">2022.06.06-2022.06.26</view>
										<view class="details">
											展开详情 <u-icon name="arrow-down" color="#999" size="24"></u-icon>
										</view>
									</view>
									<view class="btn">
										<u-button text="使用" shape="circle" :plain="true" color="#f8cf39" size="mini">
										</u-button>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 平台优惠券 -->
					<view class="Platform">
						<view class="price-border">
							<!-- 圆 -->
							<view class="left-round"></view>
							<view class="right-round"></view>
							<view class="price">
								<view class="v-price">
									<view class="num">
										¥<text>15</text>
									</view>
									<view class="full">满60元可用</view>
								</view>
								<view class="coupon">
									<view class="text">
										<h4>平台优惠券</h4>
										<view class="date">2022.06.06-2022.06.26</view>
										<view class="details">
											展开详情 <u-icon name="arrow-down" color="#999" size="24"></u-icon>
										</view>
									</view>
									<view class="btn">
										<u-button text="使用" shape="circle" :plain="true" color="#f8cf39" size="mini">
										</u-button>
									</view>
								</view>
								<!-- 右上角标签 -->
								<view class="tag">
									不可用
								</view>
							</view>
						</view>
					</view>
					<!-- 不可用说明 -->
					<view class="cannot">
						<text>不可用说明：商品现价+包装费+配送费未满60元</text>
					</view>
					<!-- btn -->
					<view class="btn">
						<u-button text="不使用优惠券" color="#face39" shape="circle"></u-button>
					</view>
				</view>
			</u-popup>
		</view>

		<!-- 代金券层 -->
		<view class="couponFace">
			<u-popup mode="bottom" :round="30" :show="couponState" @close="couponState = false">
				<view class="content">
					<h3>代金券选择</h3>
					<!-- 平台优惠 -->
					<view class="discount">
						<view class="v-discount">
							<view class="price-border">
								<!-- 圆 -->
								<view class="left-round"></view>
								<view class="right-round"></view>
								<view class="price">
									<view class="v-price">
										<view class="num">
											¥<text>1</text>
										</view>
										<view class="full">满25元可用</view>
									</view>
									<view class="coupon">
										<view class="text">
											<h4>商家代金券</h4>
											<view class="date">2022.06.06-2022.06.26</view>
											<view class="details">
												展开详情 <u-icon name="arrow-down" color="#999" size="24"></u-icon>
											</view>
										</view>
										<view class="btn">
											<u-button text="使用" shape="circle" :plain="true" color="#f8cf39"
												size="mini"></u-button>
										</view>
									</view>
								</view>
							</view>
							<view class="introduce">
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
					<!-- 会员优惠券-->
					<view class="member">
						<view class="price-border">
							<!-- 圆 -->
							<view class="left-round"></view>
							<view class="right-round"></view>
							<view class="price">
								<view class="v-price">
									<view class="num">
										¥<text>2</text>
									</view>
									<view class="full">无门槛</view>
								</view>
								<view class="coupon">
									<view class="text">
										<h4>商家代金券</h4>
										<view class="date">2022.06.06-2022.06.26</view>
										<view class="details">
											展开详情 <u-icon name="arrow-down" color="#999" size="24"></u-icon>
										</view>
									</view>
									<view class="btn">
										<u-button text="使用" shape="circle" :plain="true" color="#f8cf39" size="mini">
										</u-button>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 平台优惠券 -->
					<view class="Platform">
						<view class="price-border">
							<!-- 圆 -->
							<view class="left-round"></view>
							<view class="right-round"></view>
							<view class="price">
								<view class="v-price">
									<view class="num">
										¥<text>10</text>
									</view>
									<view class="full">满60元可用</view>
								</view>
								<view class="coupon">
									<view class="text">
										<h4>商家代金券</h4>
										<view class="date">2022.06.06-2022.06.26</view>
										<view class="details">
											展开详情 <u-icon name="arrow-down" color="#999" size="24"></u-icon>
										</view>
									</view>
									<view class="btn">
										<u-button text="使用" shape="circle" :plain="true" color="#f8cf39" size="mini">
										</u-button>
									</view>
								</view>
								<!-- 右上角标签 -->
								<view class="tag">
									不可用
								</view>
							</view>
						</view>
					</view>
					<!-- 不可用说明 -->
					<view class="cannot">
						<text>不可用说明：商品现价+包装费+配送费未满60元</text>
					</view>
					<!-- btn -->
					<view class="btn">
						<u-button text="不使用代金券" color="#face39" shape="circle"></u-button>
					</view>
				</view>
			</u-popup>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				state: 0,
				orderList: 2,
				// 会员选项
				memberSet: true,
				imageLists: 4,
				// 优惠券层
				discountState: false,
				// 代金券层
				couponState: false,
			}
		},
		methods:{
			toPay(){
				uni.navigateTo({
					url:"/pages_product/wxPay/wxPay"
				})
			},
			getLocation(){
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success: function(res) {
						console.log("res ==>", res);
						const latitude = res.latitude;
						const longitude = res.longitude;
						uni.openLocation({
							latitude: latitude,
							longitude: longitude,
							success: function() {
								console.log('success');
							}
						});
					}
				});
			}
		}
	}
</script>

<style lang="less">
	@import url("./submitOrder.less");
</style>
