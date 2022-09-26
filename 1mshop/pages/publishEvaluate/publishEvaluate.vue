<template>
	<view class="publishEvaluate">
		<view class="rate">
			<view class="image">
				<image src="../../static/mipmap-mdpi1/timeLImitList1.png" mode=""></image>
			</view>
			<view class="content">
				<view class="title-btn">
					<view class="title">
						A套餐系列之A2套餐
					</view>
					<view class="btn">
						<u-button text="发布" :disabled="(rate1 && rate2 != 0) ? false : true" shape="circle" color="#FBE79B" size="mini" @click="toSuccess()"></u-button>
					</view>
				</view>
				<view class="productRate">
					<view class="text">
						商品评分
					</view>
					<view class="rate">
						<u-rate v-model="rate1" size="45" gutter="0" inactiveColor="#EAEAEA" activeColor="#FFD739">
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
						<u-rate v-model="rate2" size="45" gutter="0" inactiveColor="#EAEAEA" activeColor="#FFD739">
						</u-rate>
					</view>
					<view class="tip">
						低分
					</view>
				</view>
			</view>
		</view>
		<!-- 输入文字 -->
		<view class="textVal">
			<u-textarea class="first" placeholder="请输入文字..." confirmType="done" v-model="evaluatateVal"></u-textarea>
			<view class="v-textVal" v-for="(item,index) in textValList" :key="index">
				<u-textarea placeholder=" " :style="{textIndent:item.isthree ? '112rpx' : '140rpx'}" confirmType="done" v-model="item.value" :autoHeight="true">
					<text class="text">
						464646
					</text>
				</u-textarea>
			</view>
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
				<text>添加更多</text>
			</view>
		</view>
		<!-- 添加标签 -->
		<view class="addLabel">
			<view class="title">添加标签</view>
			<view class="labeiList" >
				<view class="list" v-for="(item,index) in labeiLists" :key="index" :class="item.isLove ? '' : 'active'" @click="setLable(item,index)">
					{{item.text}}
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data(){
			return {
				textVal:"",
				rate1:0,
				rate2:0,
				evaluatateVal:"",
				// 匿名
				isShowList:{
					isShow: true,
					isShowText:"匿名",
					iconText:"eye-fill",
					iconText1:"arrow-up"
				},
				// 上传图片数组
				ImageList:3,
				// 添加标签：
				labeiLists:[
					{text:"超值套餐",isLove:true,isthree:false},
					{text:"味道不错",isLove:true,isthree:false},
					{text:"赞一个",isLove:true,isthree:true},
					{text:"推荐购买",isLove:true,isthree:false},
					{text:"赞一个",isLove:true,isthree:true},
					{text:"会回购",isLove:true,isthree:true},
					{text:"老板不错",isLove:true,isthree:false},
					{text:"不喜欢",isLove:false,isthree:true},
					{text:"不推荐",isLove:false,isthree:true},
					{text:"不换算",isLove:false,isthree:true},
					{text:"不满意",isLove:false,isthree:true},
					{text:"速度慢",isLove:false,isthree:true},
				],
				textValList:[],
			}
		},
		onLoad(){
			// this.aaa();
		},
		methods:{
			// 发布按钮 去评价成功
			toSuccess(){
				uni.navigateTo({
					url:"/pages/evaluateSuccess/evaluateSuccess"
				})
			},
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
			setLable(item,index){
				if(this.textValList.findIndex(target => target.text == item.text) === -1){
					this.textValList.push(item);
				}else{
					let index = "";
					this.textValList.forEach((e,i) =>{
						if(e.text == item.text){
							index = i;
						}
						e['value'] = "";
					})
					this.textValList.splice(index,1);
				}
			},
			
		}
	}
</script>

<style lang="less">
	@import url("@/pages/publishEvaluate/publishEvaluate.less");
</style>
