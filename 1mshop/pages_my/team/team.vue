<template>
	<view class="team">
		<!-- <view>发现</view> -->
		<view class="titlea">邀请{{amount}}位好友入队，即可领取优惠券</view>
		<!-- <view class="titlea">好友均已成功入队，可领取优惠券</view> -->
		<!-- <view class="titlea">有好友未能及时入队，本次组队失败</view> -->
		
		<view class="content-box">
			<view class="friend-box">
				<view class="friend-boxs" v-for="(item,index) in friendList" :key="index">
					<image :src="item.image" class="head-portrait" mode="widthFix"></image>
					<view class="name">{{item.title}}</view>
					<view class="position">{{item.lable}}</view>
				</view>
				<view class="friend-boxs" style="display: flex;flex-direction: column;align-items: center;">
					<view class="circle" mode="widthFix">
						<!-- <image src="/static/mipmap-mdpi/add.png" class="add" mode="widthFix"></image> -->
					</view>
					<view class="name">邀请更多</view>
					<view class="position"></view>
				</view>
			</view>
			<view class="titleb">再成功邀请{{subtrahend}}位好友即可组队成功!</view>
			<!-- <view class="titleb">组队成功，优惠券将自动发放至券包</view> -->
			<!-- <view class="titleb">未能召唤到足够的队友，组队失败！</view> -->
			<view class="team-box">
				<view class="teaming">组队中</view>
				<view class="count-down">( 倒计时：22:00:26 )</view>
			</view>
			<!-- 成功 -->
			<!-- <view>
				<view class="team-state">组队成功</view>
				<view class="next">再来一次</view>
			</view> -->
			<!-- 失败 -->
			<!-- <view>
				<view class="team-state">组队失败</view>
				<view class="next">重新组队</view>
			</view> -->
		</view>
		
		<view class="accumulated">
			<view class="accumulated-box">
				<view>
					<view class="discount-coupon">累计获得优惠券</view>
					<view class="number">6 张</view>
				</view>
				<view>
					<view class="discount-coupon">累计组队次数</view>
					<view class="number">6 次</view>
				</view>
			</view>
		</view>
		
		<view class="rule">
			<view style="font-size: 32rpx;">组队规则</view>
			<view class="text">1、亲友超时未领取则自动退回原账户</view>
			<view class="text">2、限商品现价+包装费+配送费等满25元使用</view>
			<view class="text">3、限2022.06.06-2022.06.29期间使用</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				amount: '6',
				subtrahend: '2',
				
				friendList: [
					{
						'image': require('@/static/mipmap-mdpi1/wxPay.png'),
						'title':'牛牛忙',
						'lable': '队长'
					},
					{
						'image': require('@/static/mipmap-mdpi1/wxPay.png'),
						'title':'牛牛忙',
						'lable': '队员'
					},
					{
						'image': require('@/static/mipmap-mdpi1/wxPay.png'),
						'title':'牛牛是忙',
						'lable': '队员'
					},
					{
						'image': require('@/static/mipmap-mdpi1/wxPay.png'),
						'title':'牛牛啊忙',
						'lable': '队员'
					},
					{
						'image': require('@/static/mipmap-mdpi1/wxPay.png'),
						'title':'牛牛',
						'lable': '队员'
					},
					
				]
			}
		},
		components:{
			
		},
		onShow() {
			console.log('Index page show',111);
		},
		onLoad() {
			console.log(getCurrentPages());
		},
		onPullDownRefresh() {
			console.log('页面下拉刷新了');
		},
		methods: {
		}
	}
</script>

<style lang="less" scoped>
	.team{
		height: 100vh;
		background-image: linear-gradient(#FF6465, #FFD95E);
	}
	//顶部标题
	.titlea{
		color: white;
		font-size: 36rpx;
		text-align: center;
		padding: 15px 0;
		// font-weight: bold;
	}
	//好友位
	.content-box{
		padding: 20px 0;
		width: 90%;
		margin-left: 5%;
		background-color: white;
		border-radius: 15px;
	}
	.titleb{
		color: #F24849;
		font-size: 28rpx;
		text-align: center;
	}
	.friend-box{
		display: flex;
		text-align: center;
		flex-wrap: wrap;
	}
	.friend-boxs{
		width: 25%;
		padding-bottom: 10px;
	}
	.head-portrait{
		width: 100rpx;
		height: 100rpx;
		border-radius: 100rpx;
	}
	.name{
		font-size: 28rpx;
		color: #666;
	}
	.position{
		font-size: 22rpx;
		color: #F8CF39;
	}
	//圆
	.circle{
		width: 100rpx;
		height: 100rpx;
		border: dashed 1px #ccc;
		border-radius: 100rpx;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.add{
		width: 20px;
	}
	//组队
	.team-box{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 44%;
		margin-left: 28%;
		border-radius: 30px;
		padding: 10rpx 5rpx;
		margin-top: 20px;
		background-color: #FF5D20;
	}
	.teaming{
		color: white;
		font-size: 36rpx;
	}
	.count-down{
		color: #f99e33;
		font-size: 22rpx;
		font-weight: bold;
	}
	.team-state{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 40%;
		margin-left: 30%;
		border-radius: 30px;
		padding: 26rpx 0;
		color: white;
		margin-top: 20px;
		background-color: #F24849;
	}
	.next{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 40%;
		margin-left: 30%;
		border-radius: 30px;
		padding: 26rpx 0;
		color: white;
		margin-top: 20px;
		background-color: #F8CF39;
	}
	//累计
	.accumulated{
		width: 90%;
		margin-left: 5%;
		background-color: white;
		border-radius: 12px;
		margin-top: 20px;
	}
	.accumulated-box{
		display: flex;
		justify-content: space-around;
		text-align: center;
		padding: 20px 0;
		font-size: 28rpx;
	}
	.discount-coupon{
		color: #333333;
	}
	.number{
		color: #FF5314;
		margin-top: 20px;
	}
	//规则
	.rule{
		margin-left: 5%;
		margin-top: 20px;
		color: white;
	}
	.text{
		margin-top: 10px;
		font-size: 28rpx;
	}
</style>