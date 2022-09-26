<template>
	<view class="pay">
		<view class="tips">
			<view class="icon-refresh">
				<view class="v-icon-refresh">
					<view class="image">
						<image :src="payStateList[payState].imageUrl" mode=""></image>
					</view>
					<view class="text">
						{{payStateList[payState].text}}
					</view>
				</view>
				<view class="refresh">
					<text>刷新</text>
					<!-- <image src="/static/mipmap-mdpi/refresh.png" mode=""></image> -->
				</view>
			</view>
			<view class="tipText">
				{{payStateList[payState].tips}}
				<!-- 23: 22 -->
			</view>
		</view>
		<!-- 套餐 -->
		<view class="orderContent">
			<view class="v-orderContent">
				<view class="orderTitle">
					<view class="v-orderTitle">
						<view class="title">荷叶饭撞江奈</view>
						<u-icon name="arrow-right" size="22" color="#333"></u-icon>
					</view>
					<view class="phoneImage">
						<!-- <image src="/static/mipmap-mdpi/productPhone.png" mode=""></image> -->
					</view>
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
					<view class="pop-icon">
						<text class="pop">暂无可用</text>
						<u-icon name="arrow-right" color="#999" size="24"></u-icon>
					</view>
				</view>
				<view class="cash coupon">
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
		</view>
		<!-- 配送信息 -->
		<view class="deliveryInfo">
			<view class="v-deliveryInfo">
				<h3>配送信息</h3>
				<view class="addresss">
					<view class="text-image">
						<view class="image">
							<!-- <image src="/static/mipmap-mdpi/map-h.png" mode=""></image> -->
						</view>
						<view>收货地址</view>
					</view>
					<view class="text-icon">
						<view class="text">
							<view>琳琳 13113661132</view>
							<view>南山大学北校区6栋6楼809号</view>
						</view>
						<view class="changText" @click="changeAddShow = true">
							修改
						</view>
						<u-icon name="arrow-right" color="#999" size="26"></u-icon>
					</view>
				</view>
				<view class="serviceTime">
					<view class="text-image">
						<view class="image">
							<!-- <image src="/static/mipmap-mdpi/map-h.png" mode=""></image> -->
						</view>
						<view>送达时间</view>
					</view>
					<view class="text-icon">
						<text class="text">尽快送达</text>
						<u-icon name="arrow-right" color="#999" size="26"></u-icon>
					</view>
				</view>
				<view class="remask">
					<view class="text-image">
						<view class="image">
							<!-- <image src="/static/mipmap-mdpi/map-h.png" mode=""></image> -->
						</view>
						<view>订单备注</view>
					</view>
					<view class="inp-icon">
						<input type="text" placeholder="口味偏好等要求">
						<u-icon name="arrow-right" color="#999" size="26"></u-icon>
					</view>
				</view>
				<view class="delivery-people">
					<view class="text-image">
						<view class="image">
							<!-- <image src="/static/mipmap-mdpi/map-h.png" mode=""></image> -->
						</view>
						<view>配送人员</view>
					</view>
					<view class="text-icon">
						<text class="text">暂无</text>
						<u-icon name="arrow-right" color="#999" size="26"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="orderInfo">
			<view class="v-orderInfo">
				<h3>订单信息</h3>
				<view class="orderNumber">
					<view class="text">
						订单编号
					</view>
					<view class="copy">
						<text>{{orderId}}</text>
						<u-button text="复制" shape="circle" :plain="true" color="#f8cf39" size="mini"
							@click="copyOrderNum(orderId)"></u-button>
					</view>
				</view>
				<view class="creatTime">
					<view class="text">
						订单创建时间
					</view>
					<view class="time">
						<text>2022.06.09</text>
						<text>14:09</text>
					</view>
				</view>
			</view>
		</view>
		<!-- btns -->
		<!-- 已取消 -->
		<view class="btns" v-if="payState == 4">
			<u-button text="退款/售后" shape="circle" :plain="true" size="small" color="#333" @click="toRefund()">
			</u-button>
			<u-button text="在来一单" shape="circle" size="small" color="#F24849"></u-button>
		</view>
		<!-- 已完成 -->
		<view class="btns" v-else-if="payState == 3">
			<u-button text="在来一单" shape="circle" :plain="true" size="small" color="#333"></u-button>
			<u-button text="退款/售后" shape="circle" :plain="true" size="small" color="#333" @click="toRefund()">
			</u-button>
			<u-button text="去评价" shape="circle" size="small" color="#F8CF39"></u-button>
		</view>
		<!-- 待支付 -->
		<view class="btns" v-else-if="payState == 1">
			<u-button text="取消订单" shape="circle" :plain="true" size="small" color="#333"></u-button>
			<u-button text="去支付" shape="circle" size="small" color="#F24849"></u-button>
		</view>
		<!-- 已退款 + 退款失败 -->
		<view class="btns" v-else-if="payState == 6 || payState == 7">
			<u-button text="咨询客服" shape="circle" :plain="true" size="small" color="#333"></u-button>
			<u-button text="在来一单" shape="circle" size="small" color="#FE7956"></u-button>
		</view>
		<!-- 退款中 -->
		<view class="btns" v-else-if="payState == 5">
			<u-button text="咨询客服" shape="circle" :plain="true" size="small" color="#333"></u-button>
			<u-button text="撤销退款" shape="circle" size="small" color="#FF9C9C" @click="cancelEvalutateShow = true">
			</u-button>
		</view>
		<!-- 待收货 + 支付成功 -->
		<view class="btns" v-else>
			<u-button text="取消订单" shape="circle" :plain="true" size="small" color="#333"></u-button>
			<u-button text="确认收货" shape="circle" size="small" color="#05C0AB"></u-button>
		</view>

		<!-- 修改地址弹窗 -->
		<view class="changeAddShow">
			<u-popup :safeAreaInsetBottom="false" :show="changeAddShow" mode="center" :round="30"
				@close="changeAddShow = false">
				<view class="content">
					<h3>确认修改收货地址</h3>
					<view class="tip">
						需注意，收货地址只可修改一次
					</view>
					<view class="add-btns">
						<u-button text="取消" shape="circle" size="" color="#F24849" @click="changeAddShow = false">
						</u-button>
						<u-button text="确定" shape="circle" size="" color="#f8cf39"></u-button>
					</view>
				</view>
			</u-popup>
		</view>

		<!-- cancelEvalutateShow 撤销退款弹窗 -->
		<view class="cancelEvalutate">
			<u-popup :show="cancelEvalutateShow" :safeAreaInsetBottom="false" mode="center" :round="30"
				@close="cancelEvalutateShow = false">
				<view class="content">
					<h3>撤销退款申请？</h3>
					<view class="tip">
						需注意，撤销之后不可再次退款
					</view>
					<view class="add-btns">
						<u-button text="取消" shape="circle" size="" color="#F24849" @click="cancelEvalutateShow = false">
						</u-button>
						<u-button text="确定" shape="circle" size="" color="#f8cf39"></u-button>
					</view>
				</view>
			</u-popup>
		</view>

		<!-- 支付成功弹窗 -->
		<view class="paySuccess">
			<u-popup :show="paySuccessShow" :safeAreaInsetBottom="false" mode="center" :round="30"
				@close="paySuccessShow = false">
				<view class="content">
					<image :src="paySuccessSrc" mode=""></image>
					<view class="close" @click="paySuccessShow = false"></view>
					<view class="ShareFriends"><button open-type="share" /></view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				share: {
					title: "pay分享",
					path: "/pages_product/pay/pay",
					imageUrl: "",
					desc:"",
					content:"123131313"
				},
				orderList: 2,
				// 订单单号
				orderId: "456321987",
				changeAddShow: false,
				// 订单状态
				// 0成功 1待支付 2待收货 3已完成 4取消 5退款中 6已退款 7退款失败
				payState: 0,
				payStateList: [{
						// imageUrl:"/static/mipmap-mdpi/alreadyPay.png",
						text: "已支付",
						tips: "您的订单已支付成功，商家已接单！"
					},
					{
						// imageUrl:"/static/mipmap-mdpi/waitPay.png",
						text: "待支付",
						tips: "您的订单还未支付，距离订单关闭还剩"
					},
					{
						// imageUrl:"/static/mipmap-mdpi/waitDelivery.png",
						text: "待收货",
						tips: "您的外卖正在马不停蹄的飞奔向您，请耐心等候~"
					},
					{
						// imageUrl:"/static/mipmap-mdpi/alreadyFinish.png",
						text: "已完成",
						tips: "您的订单已完成，欢迎再次下单！"
					},
					{
						// imageUrl:"/static/mipmap-mdpi/alreadyCancel.png",
						text: "已取消",
						tips: "您的订单已取消，可选择再次下单！"
					},
					{
						// imageUrl:"/static/mipmap-mdpi/refunding.png",
						text: "退款中",
						tips: "您的订单已申请退款，请耐心等待~"
					},
					{
						// imageUrl:"/static/mipmap-mdpi/alreadyRefund.png",
						text: "已退款",
						tips: "您的订单已完成退款，欢迎再次下单！"
					},
					{
						// imageUrl:"/static/mipmap-mdpi/refundFailed.png",
						text: "退款失败",
						tips: "商家未同意您的退款申请，原因是您未提前备注..."
					}
				],

				cancelEvalutateShow: false,
				paySuccessShow: false,
				paySuccessSrc: "/static/mipmap-mdpi1/paySuccess2.png",
			}
		},
		// 分享
		onShareAppMessage(res){
			console.log("res ==>",res);
			return{
				title:"pay分享",
				path:"/pages_product/pay/pay",
				imageUrl:"/static/mipmap-mdpi1/banner.png"
			}
		},
		onLoad() {
			if (this.payState == 0) {
				this.paySuccessShow = true;
			}
		},
		methods: {
			// 复制单号
			copyOrderNum(id) {
				uni.setClipboardData({
					data: id,
					success: function(res) {
						uni.showToast({
							title: '复制成功',
						});
					}
				});
			},
			// 去申请退款页面
			toRefund() {
				uni.navigateTo({
					url: "/pages/refund/refund"
				})
			},
		}
	}
</script>

<style lang="less">
	@import url("./pay.less");
</style>
