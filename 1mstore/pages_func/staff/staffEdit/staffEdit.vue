<template>
	<view class="staffEdit">
		<view class="job">
			<view class="text">
				当前职务
			</view>
			<view class="jobList">
				<view class="list" v-for="(item,index) in jobList" :key="index" :class="item.isActive ? 'active' : ''"
					@click="switchJob(item,index)">
					{{item.name}}{{index+1}}
				</view>
			</view>
		</view>
		<view class="accountName">
			<u-field v-model="mobile" label="账号名称" placeholder="请填写账号名称" :border-bottom="false" input-align="right">
			</u-field>
		</view>
		<view class="userName">
			<u-field v-model="mobile" label="登陆账号" disabled :border-bottom="false" input-align="right"></u-field>
		</view>
		<view class="phone">
			<u-field v-model="mobile" label="手机号码" placeholder="请填写手机号码" :border-bottom="false" input-align="right">
			</u-field>
		</view>
		<view class="tips flex-l-r">
			<view class="left" @click="openMadul(0)">解除绑定？</view>
			<view class="right" @click="openMadul(1)">重置密码？</view>
		</view>
		<view class="btns">
			<u-button size="default" hover-class="none" @click="back">取消修改</u-button>
			<u-button size="default" hover-class="none">提交绑定</u-button>
		</view>
		<!-- 弹窗 -->
		<u-modal v-model="mudalList.show" cancel-color="#333" confirm-color="#f8cf39" :show-cancel-button="true" :title="mudalList.title" :title-style="{fontWeight: 'bold',fontSize: '18px'}" :content="mudalList.content" :content-style="{color:'#666'}" confirm-text="确定" ></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jobList: [{
						name: "店长",
						isActive: true
					},
					{
						name: "店长",
						isActive: false
					},
					{
						name: "店长",
						isActive: false
					},
					{
						name: "店长",
						isActive: false
					},
					{
						name: "店长",
						isActive: false
					},
					{
						name: "店长",
						isActive: false
					}
				],
				mobile: "店长",
				
				mudalList:{
					show:false,
					title:"",
					content:"",
				}
			}
		},
		methods: {
			switchJob(item, index) {
				if (item.isActive) {
					return;
				}
				this.jobList.forEach(e => {
					e.isActive = false;
				})
				item.isActive = true;
			},
			back(){
				uni.navigateBack();
			},
			openMadul(count){
				const _this = this;
				_this.mudalList.show = true;
				console.log(typeof count);
				if(count == 0){
					_this.mudalList.title = "解除绑定确认";
					_this.mudalList.content = "确定要解除当前选中账户【好吃的车】与微信的绑定关系吗？";
				}else{
					_this.mudalList.title = "重置密码确认";
					_this.mudalList.content = "确定要重置当前选中账户【好吃的车】的密码吗？";
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.staffEdit {
		position: relative;
		padding: 25rpx 0;

		.job {
			.text {
				padding: 25rpx;
				font-size: 32rpx;
				font-weight: bold;
				background-color: #fff;
				box-shadow: 0rpx 3rpx 6rpx 1rpx rgba(0, 0, 0, 0.06);
			}

			.jobList {
				margin-top: 2rpx;
				padding: 25rpx;
				padding-bottom: 0rpx;
				background-color: #fff;
				box-shadow: 0px 3rpx 6rpx 1rpx rgba(0, 0, 0, 0.09);
				display: flex;
				flex-wrap: wrap;

				.list {
					margin-right: 112rpx;
					margin-bottom: 20rpx;

					&.active {
						color: #f8cf39;
					}
				}
			}
		}

		.accountName,
		.userName,
		.phone {
			margin-top: 25rpx;
			background-color: #fff;
			box-shadow: 0rpx 3rpx 6rpx 1rpx rgba(0, 0, 0, 0.06);
		}

		.userName {
			input {
				color: #ccc;
			}
		}

		.accountName,
		.phone {
			/deep/input {
				color: #f8cf39;
			}
		}

		.tips {
			padding: 0 20rpx;
			margin-top: 66rpx;
			font-size: 32rpx;
			font-weight: 400;

			.left {
				color: #FB2626;
			}

			.right {
				color: #FC8C53
			}
		}

		.btns {
			position: fixed;
			bottom: 20rpx;
			left: 5%;
			width: 90%;

			/deep/.u-btn {
				background-color: #F24849;
				color: #fff;
				border: none;
				margin-top: 25rpx;
				&:nth-child(2) {
					background-color: #f8cf39;
				}
			}

			u-button {
				&:nth-child(2) {
					/deep/.u-btn {
						background-color: #f8cf39;
					}
				}
			}
		}
	}
</style>
