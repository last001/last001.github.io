<template>
	<view class="timeSpike">
		<view class="timeSpikeState">
			<view class="v-timeSpikeState">
				<view class="time" v-for="(item,index) in timeList" :key="index" :class="item.isActive ? 'active' : ''" @click="switchItem(item,index)">
					<view class="duration">
						{{item.time}}
					</view>
					<view class="text">
						{{item.text}}
					</view>
				</view>
			</view>
			<view class="timeSpikeText">
				限时特惠，超值秒杀
			</view>
		</view>
		<view class="lists">
			<view class="timeSpike-lists" v-for="(item,index) in lists" :key="index">
				<!--  -->
				<view class="goods">
					<!-- <image src="/static/mipmap-mdpi/timeSpike.png" mode=""></image> -->
				</view>
				<view class="lists-image">
					<image src="/static/mipmap-mdpi1/timeLImitList1.png" mode=""></image>
					<!-- 秒杀 -->
					<view class="time">
						<!-- <image src="/static/mipmap-mdpi/spike.png" mode=""></image> -->
					</view>
				</view>
				<view class="lists-text">
					<view class="title">
						刘记麻辣香锅全家福套餐
					</view>
					<view class="speed">
						<u-line-progress :showText="false" :percentage="item.percentage" height="22" inactiveColor="#F8A5A4" activeColor="#F24A49">
						</u-line-progress>
						<text class="u-percentage-text" v-if="item.percentage > 0">剩余{{item.percentage}}%</text>
						<text class="u-percentage-text" v-else>已抢光</text>
					</view>
					<view class="money">
						<text>￥22</text>
						<text>￥26</text>
					</view>
					<view class="btn">
						<u-button type="primary" size="small" color="#F8CF39" text="马上抢" :disabled="item.percentage == 0" @click="toShoppingCart"></u-button>
					</view>
					<!--  -->
					<view class="state-text" :class="current == 2 ? 'active' : ''" v-show="current != 0">
						{{timeList[current].text}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timeList:[
					{count:10,time:"10:30",text:"秒杀中",isActive:true},
					{count:16,time:"16:30",text:"未开始",isActive:false},
					{count:20,time:"20:30",text:"已结束",isActive:false},
				],
				current:0,
				lists:[],
				lists1: [
					{percentage:0,isIcon:true},
					{percentage:20,isIcon:true},
					{percentage:66,isIcon:false},
					{percentage:88,isIcon:false},
					{percentage:98,isIcon:false},
				],
				lists2: [
					{percentage:0,isIcon:true},
					{percentage:0,isIcon:true},
					{percentage:0,isIcon:true},
					{percentage:0,isIcon:true},
					{percentage:0,isIcon:true},
				],
				
			}
		},
		onLoad() {
			const date = new Date();
			// 小时
			const hour = date.getHours();
			// 毫秒
			const time = date.getTime();
			console.log("time ==>",time);
			
			this.lists = this.lists1;
		},
		methods:{
			toShoppingCart(){
				uni.navigateTo({
					url:"/pages/shoppingCart/shoppingCart"
				})
			},
			// 切换
			switchItem(item,index){
				this.timeList.forEach(e =>{
					e.isActive = false;
				})
				item.isActive = true;
				
				this.current = index;
				
				if(index == 0){
					this.lists = this.lists1;
				}else{
					this.lists = this.lists2;
				}
			}
		}
	}
</script>

<style lang="less">
	@import url("@/pages/timeSpike/timeSpike.less");
</style>
