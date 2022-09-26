<template>
	<view class="followUpEvaluate">
		<view class="rate">
			<view class="image">
				<image src="../../static/mipmap-mdpi1/timeLImitList1.png" mode=""></image>
			</view>
			<view class="content">
				<view class="title">
					A套餐系列之A2套餐
				</view>
				<view class="productRate">
					<view class="text">
						商品评分
					</view>
					<view class="rate">
						<u-rate v-model="value" :minCount="0" size="45" gutter="0" inactiveColor="#EAEAEA" activeColor="#FFD739">
						</u-rate>
					</view>
					<view class="tip">
						低分
					</view>
				</view>
				<view class="delivery">
					<view class="text">
						配送服务
					</view>
					<view class="rate">
						<u-rate v-model="value1" :minCount="0" size="45" gutter="0" inactiveColor="#EAEAEA" activeColor="#FFD739">
						</u-rate>
					</view>
					<view class="tip">
						低分
					</view>
				</view>
			</view>
		</view>
		<view class="text-btn">
			<!-- 输入文字 -->
			<view class="textarea">
				<u-textarea confirmType="done" v-model="textVal" placeholder="请输入文字..."  height="300"></u-textarea>
			</view>
			<!-- 匿名 -->
			<view class="isShow">
				<view class="v-isShow" @click="toShowFace()">
					<u-icon :name="isShowList.iconText"></u-icon>
					<text class="text">{{isShowList.isShowText}}</text>
					<u-icon :name="isShowList.iconText1" color="#999" size="22"></u-icon>
				</view>
				<view class="tip">
					公开头像昵称，大家都可以看到我的主页
				</view>
			</view>	
			<!-- 添加图片 -->
			<view class="addImage">
				<view class="image" v-for="(item,index) in ImageList" :key="index">
					<image src="/static/mipmap-mdpi1/timeLImitList1.png" mode=""></image>
				</view>
				<view class="addBtn">
					<!-- <image src="/static/mipmap-mdpi/add.png" mode=""></image> -->
					<text>添加图片</text>
				</view>
			</view>
			<view class="followUpBtn">
				<u-button text="发布评价" :disabled='this.textVal == "" || this.value == "" || this.value1 == ""' shape="circle" color="#f8cf39" @click="pulishEvalute()"></u-button>
			</view>
		</view> 
	</view>
</template>

<script>
	export default {
		data(){
			return {
				textVal:"",
				value:"",
				value1:"",
				// btn 
				disabled:true,
				// 匿名
				isShowList:{
					isShow: true,
					isShowText:"匿名",
					iconText:"eye-fill",
					iconText1:"arrow-up"
				},
				ImageList:[],
			}
		},
		onReady() {
			
		},
		computed:{
			// getFillInState(){
			// 	return this.flag =  (this.textVal != "" && this.value != "" && this.value1 != "")
			// }
		},
		methods:{
			// 隐藏
			toShowFace(){
				if(this.isShowList.isShow){
					this.isShowList.isShow = false;
					this.isShowList.isShowText = "已匿名";
					this.isShowList.iconText = "eye-off";
					this.isShowList.iconText1 = "arrow-down";
				}else{
					this.isShowList.isShow = true;
					this.isShowList.isShowText = "匿名";
					this.isShowList.iconText = "eye-fill";
					this.isShowList.iconText1 = "arrow-up";
				}
			},
			// 发布平价
			pulishEvalute(){
				uni.navigateTo({
					url: "/pages/publishEvaluate/publishEvaluate"
				})
			}
		},
	}
</script>

<style lang="less">
	@import url("@/pages/followUpEvaluate/followUpEvaluate.less");
</style>
