<template>
	<view class="productLists">
		<view class="v-lists" v-for="(item,index) in list" :key="index" @click="toShop">
			<view class="image-info">
				<!-- 会员 + 品牌 + 新店 -->
				<view class="classify">
					<!-- <image src="/static/mipmap-mdpi1/member.png" mode=""></image> -->
				</view>
				<view class="lists-image">
					<image src="/static/mipmap-mdpi1/timeLImitList1.png" mode=""></image>
				</view>
				<view class="lists-info">
					<!-- 商家配送 + 平台配送 -->
					<view class="delivery">
						{{item.deliveryText}}
					</view>
					<view class="info-title">
						<view class="title">
							{{item.title}}
						</view>
					</view>
					<view class="score">
						<view class="v-score">
							<text class="score-num">{{item.rate}}分</text>
							<text class="score-text">接受预定/自取</text>
						</view>
						<view class="distance">
							299m
						</view>
					</view>
					<view class="plun">
						<view>好吃实惠</view>
						<view>人气店家</view>
						<view>附近老牌店家</view>
					</view>
					<view class="pay">
						<text>起送￥5</text>
						<text>配送￥6</text>
					</view>
					<view class="prefer">
						<view>门店收单减免1元</view>
						<view>满10减1</view>
						<view>满25减5</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"product-list",
		props:{
			list:{}
		},
		
		methods:{
			// 店家
			toShop(){
				console.log(131313)
				uni.navigateTo({url:'/pages_product/shop/shop'})
			},
		}
	}
</script>

<style lang="less" scoped>
	.productLists{
		padding:0 20rpx;
		.v-lists{
			border-radius: 18rpx;
			background-color: #fff;
			padding: 20rpx;
			margin-top: 20rpx;
			&:first-child{
				margin-top: 0;
			}
			.image-info{
				display: flex;
				width: 100%;
				position: relative;
				.classify{
					position: absolute;
					left: -4rpx;
					top: 10rpx;
					z-index: 99;
					width: 54rpx;
					height: 26rpx;
					image{
						width: 100%;
						height: 100%;
						display: block;
					}
				}
				.lists-image{
					width: 176rpx;
					height: 190rpx;
					image{
						width: 100%;
						height: 100%;
						display: block;
					}
				}
				.lists-info{
					position: relative;
					margin-left: 20rpx;
					width: calc(100% - 196rpx);
					
					.delivery{
						position: absolute;
						right: -20rpx;
						top: 0rpx;
						background-color: #05C0AB ;
						padding:4rpx 6rpx;
						color: #fff;
						border-top-left-radius: 22rpx;
						border-bottom-left-radius: 22rpx;
						font-size: 18rpx;
						/* #ifdef H5 */
						zoom: 0.75;
						/* #endif */
					}
					
					.info-title{
						.title{
							font-weight: bold;
							font-size: 28rpx;
							color: #333;
							width: 220rpx;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
						}
					}
					.score{
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 10rpx 0;
						.v-score{
							display: flex;
							align-items: center;
							.score-num{
								color: #05C0AB;
								font-weight: bold;
								font-size: 22rpx;
							}
							.score-text{
								margin-left: 20rpx;
								color: #333;
								font-size: 18rpx;
							}
						}
						.distance{
							color: #999;
							font-size: 22rpx;
						}
					}
					.plun{
						display: flex;
						view{
							font-size: 20rpx;
							/* #ifdef APP-PLUS || H5 */
							zoom:0.8;
							/* #endif */
							background-color: #F8CF3933;
							color: #F8B239;
							padding: 4rpx 10rpx;
							border-radius: 8rpx;
							margin-right: 15rpx;
						}
					}
					.pay{
						padding: 0rpx 0 10rpx;
						text{
							font-size: 22rpx;
							color: #333;
							&:nth-child(2){
								margin-left: 20rpx;
							}
						}
					}
					.prefer{
						display: flex;
						align-items: center;
						// justify-content: center;
						view{
							border: 2rpx solid #F24849;
							color: #F24849;
							font-size: 18rpx;
							/* #ifdef APP-PLUS || H5 */
							zoom:0.8;
							/* #endif */
							border-radius: 8rpx;
							margin-right: 15rpx;
							padding: 5rpx;
						}
					}
				}
			}
		}
	}
</style>