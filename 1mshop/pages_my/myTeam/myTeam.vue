<template>
	<view class="myTeam" :style="{background:teamListIndex == 0 ? '#f2f2f2' : '#fff'}">
		<headerBox :info='info'></headerBox>
		<view class="captain">
			<view class="v-captain">
				<image src="/static/mipmap-mdpi1/wxPay.png" mode=""></image>
				<text>队长</text>
			</view>
			<view class="arrow-right-image">
				<image src="/static/mipmap-mdpi1/arrow-right.png" mode=""></image>
			</view>
			<view class="teamMember">
				<image src="/static/mipmap-mdpi1/wxPay.png" mode=""></image>
				<text>队员</text>
			</view>
			<view class="arrow-right-image">
				<image src="/static/mipmap-mdpi1/arrow-right.png" mode=""></image>
			</view>
			<view class="couponBox">
				<image src="/static/mipmap-mdpi1/coupon.png" mode=""></image>
			</view>
			<!-- 组队规则 -->
			<view class="rule">
				<u-icon name="question-circle" size="28" color="#333"></u-icon>
				<text>组队规则</text>
			</view>
		</view>
		<!-- 组队 -->
		<view class="teamList">
			<view class="v-teamList" v-for="(item,index) in teamLists" :key="index" :class="item.isActive ? 'active' : ''" @click="switchList(item,index)">
				{{item.name}}
			</view>
		</view>
		<!-- 去组队 -->
		<view class="toTeam" v-show="teamListIndex == 0">
			<!-- 邀好友 -->
			<view class="invite">
				去邀好友组队，共领优惠券~
			</view>
			<view class="queue">
				<view class="v-queue">
					<view class="list">
						<view class="lists" v-for="(item,index) in queueList" :key="index" @click="toDetails(item)">
							<view class="headerImg" v-if="item.imageUrl != ''">
								<image  :src="item.imageUrl" mode=""></image>
							</view>
							<view class="headerImg" v-else>
								<view class="noHeader">
									?
								</view>
							</view>
							<view class="name">{{item.name}}</view>
							<view class="nick">
								{{item.nick}}
							</view>
							<view class="couponWall">
								<!-- <image src="/static/mipmap-mdpi/couponWall.png" mode=""></image> -->
								<view class="posiText">
									<view class="questionMark">
										??
									</view>
									<view class="couponText">
										优惠券
									</view>
									<view class="wait">
										待领取
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="couponTip">
						组队成功可获得优惠券
					</view>
					<view class="btn">
						<u-button text="去邀请" color="#FF5D20" size="56" shape="circle"></u-button>
					</view>
				</view>
			</view>
			<!-- 累计 -->
			<view class="total">
				<view class="v-total">
					<view class="total-coupon">
						<view class="text">
							累计获得优惠券
						</view>
						<view class="num">
							6张
						</view>
					</view>
					<view class="total-count">
						<view class="text">
							累计组队次数
						</view>
						<view class="num">
							6次
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 我发起的组队 -->
		<view class="myTeams" v-show="teamListIndex == 1">
			<view class="v-myTeams" :class="myTeamState == 1 ? 'success' : ''">
				<view class="myTeamList" v-for="(item,index) in myTeamList" :key="index" @click="toDetails(item)">
					<view class="headerImg" :class="item.imageUrl == '' ? 'active' : '' ">
						<image :src="item.imageUrl" mode=""></image>
					</view>
					<view class="name">{{item.name}}</view>
					<view class="nick">
						{{item.nick}}
					</view>
				</view>
				<view class="myTeam-btn">
					<u-button color="#FF5D20" shape="circle">
						<view class="btn-text">{{btnTextList[myTeamState].text}}</view>
						<view class="btn-num">{{btnTextList[myTeamState].num}}</view>
					</u-button>
				</view>
			</view>
		</view>
		<!-- 我参与的组队 -->
		<view class="handTeam" v-show="teamListIndex == 2">
			<view class="v-handTeam" :class="handTeamState == 1 ? 'success' : ''">
				<view class="handTeamList" v-for="(item,index) in handTeamList" :key="index" @click="toDetails(item)">
					<view class="headerImg" :class="item.imageUrl == '' ? 'active' : '' ">
						<image :src="item.imageUrl" mode=""></image>
					</view>
					<view class="name">{{item.name}}</view>
					<view class="nick">
						{{item.nick}}
					</view>
				</view>
				<view class="myTeam-btn">
					<u-button color="#FF5D20" shape="circle">
						<view class="btn-text">{{btnTextList[handTeamState].text}}</view>
						<view class="btn-num">{{btnTextList[handTeamState].num}}</view>
					</u-button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import headerBox from "@/component/headerBox/headerBox.vue";
	export default {
		name:"header-box",
		data(){
			return {
				info:{
					title:"我的组队",
					bgColor:"linear-gradient(to left, #FFD95E 0%, #FF6465 100%)",
					color:"#FFF"
				},
				// 组队 list
				teamLists:[
					{name:"去组队",isActive:true},
					{name:"我发起的组队",isActive:false},
					{name:"我参与的组队",isActive:false}
				],
				teamListIndex:"",
				// 去组队
				queueList:[
					{
						imageUrl:"/static/mipmap-mdpi1/wxPay.png",
						name:"牛牛忙",
						nick:"队长"
					},
					{
						imageUrl:"",
						name:"队员1",
						nick:"队员"
					},
					{
						imageUrl:"",
						name:"队员1",
						nick:"队员"
					},
					{
						imageUrl:"",
						name:"队员1",
						nick:"队员"
					},
				],
				// 我发起的组队
				// 状态 0组队中 1成功 2失败
				myTeamState:2,
				myTeamList:[
					{
						imageUrl:"/static/mipmap-mdpi1/wxPay.png",
						name:"牛牛忙",
						nick:"队长",
					},
					{
						imageUrl:"/static/mipmap-mdpi1/wxPay.png",
						name:"细胞学",
						nick:"队员"
					},
					{
						imageUrl:"",
						name:"队员3",
						nick:"队员"
					},
					{
						imageUrl:"",
						name:"队员4",
						nick:"队员"
					},
					{
						imageUrl:"",
						name:"队员5",
						nick:"队员"
					},
					{
						imageUrl:"",
						name:"队员6",
						nick:"队员"
					}
				],
				// 我参与的组队
				handTeamState:1,
				handTeamList:[
					{
						imageUrl:"/static/mipmap-mdpi1/wxPay.png",
						name:"牛牛忙",
						nick:"队长",
					},
					{
						imageUrl:"/static/mipmap-mdpi1/wxPay.png",
						name:"细胞学",
						nick:"队员"
					},
					{
						imageUrl:"",
						name:"队员3",
						nick:"队员"
					},
					{
						imageUrl:"",
						name:"队员4",
						nick:"队员"
					},
					{
						imageUrl:"",
						name:"队员5",
						nick:"队员"
					},
					{
						imageUrl:"",
						name:"队员6",
						nick:"队员"
					}
				],
				btnTextList:[
					{text:"继续邀请好友",num:"还差2位"},
					{text:"组队成功",num:"(奖励已发放至券包)"},
					{text:"组队失败",num:"(队员召唤失败)"},
				],
			}
		},
		methods:{
			switchList(item,index){
				this.teamListIndex = index;
				this.teamLists.forEach(e =>{
					e.isActive = false;
				})
				item.isActive = true;
			},
			toDetails(item){
				uni.navigateTo({
					url:"/pages_my/team/team"
				})
			}
		},
		components:{
			headerBox
		}
	}
</script>

<style lang="less">
	@import url("./myTeam.less");
</style>