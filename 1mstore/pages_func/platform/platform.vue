<template>
	<view class="platform">
		<view class="title">
			<view class="v-title flex-center-cs-r" v-for="(item,index) in titleList" :key="index" :class="item.isActive ? 'active' : ''" @click="switchTitle(item,index)">
				{{item.name}}
			</view>
		</view>
		<view class="activity">
			<view class="signUp flex-l-r padding" :class="current == 0 ? 'first' : 'full'">
				<view class="icon-text flex-center-cs-r">
					<view class="icon flex-center-cs-r">
						满
					</view>
					<view class="text">满减活动</view>
				</view>
				<view class="btn">
					<u-button v-show="current == 0" type="error" size="mini" @click="firstShow = !firstShow">取消报名</u-button>
					<u-button v-show="current == 1" color="#f8cf39" size="mini" @click="fullShow = !fullShow">参加报名</u-button>
				</view>
			</view>
			<view class="type padding">
				<view class="type-title">
					活动类型：
				</view>
				<view class="text" v-text="current == 0 ? '首减优惠' : '满减优惠'"></view>
			</view>
			<view class="rule padding">
				<view class="rule-title">
					活动规则：
				</view>
				<view class="rule-list">
					<text>门店首单减2元</text>
					<text>满10减1</text>
					<text>满20减5</text>
				</view>
			</view>
			<view class="condition padding">
				<view class="con-title">
					活动条件：
				</view>
				<view class="text">
					仅限外卖和在线支付使用
				</view>
			</view>
		</view>
		<!-- 弹出窗 -->
		<u-modal v-model="firstShow" cancel-color="#333" confirm-color="#f8cf39" :show-cancel-button="true" title="取消报名确认" :title-style="{fontWeight: 'bold',fontSize: '18px'}" :content="firstText" :content-style="{color:'#666'}"></u-modal>
		<u-modal v-model="fullShow" cancel-color="#333" confirm-color="#f8cf39" :show-cancel-button="true" title="参加报名确认" :title-style="{fontWeight: 'bold',fontSize: '18px'}" :content="fullText" :content-style="{color:'#666'}"></u-modal>
	</view>
</template>

<script>
	export default {
		name:"platform",
		data(){
			return{
				titleList:[
					{name:"已参加",isActive:true},
					{name:"可报名",isActive:false}
				],
				current:0,
				
				firstShow:false,
				fullShow:false,
				firstText:"确定取消当前所参加的平台活动？",
				fullText:"确定参加当前所选中的平台活动？",
			}
		},
		methods:{
			switchTitle(item,index){
				if(item.isActive){
					return;
				}
				this.titleList.forEach(e =>{
					e.isActive = false;
				})
				item.isActive = true;
				this.current = index;
			}
		}
	}
</script>

<style lang="less">
	@import url("./platform.less");
</style>