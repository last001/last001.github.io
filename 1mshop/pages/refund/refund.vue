<template>
	<view class="refund">
		<view class="product">
			<h3>退款商品</h3>
			<view class="image-content">
				<view class="image">
					<image src="../../static/mipmap-mdpi1/timeLImitList1.png" mode=""></image>
				</view>
				<view class="content">
					<view class="title">麻辣套餐系列</view>
					<view class="setText">已选：虾仁+生菜+土豆片，微辣</view>
					<view class="money-count">
						<view class="money">
							￥26
						</view>
						<view class="count">
							<text @click="odd()">-</text>
							<text class="num">{{num}}</text>
							<text @click="add()">+</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 退款信息 -->
		<view class="refundInfo">
			<h3>退款信息</h3>
			<view class="refundList" v-for="(item,index) in refundList" :key="index">
				<view class="title">
					{{item}}
				</view>
				<view class="text-icon" @click="openPop(index)">
					<text class="text">请选择</text>
					<u-icon name="arrow-right" color="#999" size="26"></u-icon>
				</view>
			</view>
		</view>
		<!-- 弹窗 -->
		<view class="refundInfoPop">
			<u-popup mode="center" round="30" :safeAreaInsetBottom="false" :show="refundInfoShow" @close="refundInfoShow =false">
				<view class="content">
					<u-radio-group v-model="popList[popIndex].title" :borderBottom="true" size="36" placement="column"  iconPlacement="right">
						<u-radio style="padding-bottom: 20px;" activeColor="#f8cf39" labelSize="30" v-for="(item,index) in popList[popIndex].lists" :key="index" :label="item.name"
							:name="item.name"></u-radio>
					</u-radio-group>
					<view class="custom" v-if="popIndex == 2">
						<view class="text">
							自定义
						</view>
						<view class="inp">
							<u-input placeholder=" " inputAlign="center" fontSize="12px">
								<template slot="suffix">
									<text>元</text>
								</template>
							</u-input>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
		<!-- 退款说明 -->
		<view class="refundExplain">
			<h3>退款说明及凭证</h3>
			<u-textarea confirmType="" value="" height="200" placeholder="补充退款描述及凭证，有助于商家更好更快的解决相关问题..."></u-textarea>
			<view class="voucher">
				<view class="imageList" >
					<!-- <image src="/static/mipmap-mdpi1/timeLImitList1.png" mode=""></image> -->
				</view>
				<view class="imageList addBtn">
					<!-- <image src="/static/mipmap-mdpi/add.png" mode=""></image> -->
					<text>添加凭证</text>
				</view>
			</view>
		</view>
		<!-- btn -->
		<view class="btn" @click="explainPopShow = true">
				<u-button text="提交凭证" color="#f8cf39"></u-button>
		</view>
		<!-- 提交凭证 弹窗 -->
		<view class="explainPop">
			<u-popup mode="center" round="30" :safeAreaInsetBottom="false" :show="explainPopShow" @close="explainPopShow =false">
				<view class="content">
					<h3>确认提交退款申请？</h3>
					<view class="btns">
						<u-button text="取消" shape="circle" size="" color="#F24849" @click="explainPopShow =false"></u-button>
						<u-button text="确定" shape="circle" size="" color="#F8CF39"></u-button>
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
				refundList: ["收货状态", "退款原因", "退款金额"],
				// 弹窗
				refundInfoShow: false,
				popIndex: 0,
				popList: [{
						title: "未收到货",
						lists: [{
								name: '已收到货'
							},
							{
								name: '未收到货'
							}
						]
					},
					{
						title: "送错餐了",
						lists: [{
								name: '送错餐了'
							},
							{
								name: '不想要了'
							},
							{
								name: '一直为送餐'
							}, {
								name: '餐洒了'
							},{
								name: '其他'
							}
							
						]
					},
					{
						title: "全额退款",
						lists: [{
								name: '全额退款'
							},
							{
								name: '退款50%'
							},
							{
								name: '退款20%'
							}
						]
					}
				],
				// 提交凭证 弹窗
				explainPopShow:false,
				num:2
			}
		},
		methods: {
			// 打开弹窗
			openPop(index) {
				this.popIndex = index;
				this.refundInfoShow = true;
			},
			// num + -
			add(){
				this.num++;
			},
			odd(){
				if(this.num == 1){
					return this.num = 1
				}else{
					this.num--;
				}
			}
		}
	}
</script>

<style lang="less">
	@import url("@/pages/refund/refund.less");
</style>
