<template>
	<view class="addsubBtns">
		<view class="odd" @click="sub">
			<u-icon :bold="false" name="minus" color="#9a979b" size="24"></u-icon>
		</view>
		<view class="num">{{nums}}</view>
		<view class="add" @click="add">
			<u-icon :bold="true" name="plus" color="#fff" size="20"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		name:"addsubBtns",
		props:["num"],
		data(){
			return{
				nums:this.num,
			}
		},
		methods:{
			sub(){
				if (this.nums <= 1) {
					this.nums = 1;
				} else {
					this.nums--;
				}
			},
			add(){
				this.nums++;
			}
		}
	}
</script>

<style lang="less" scoped>
	.addsubBtns {
		display: flex;
		align-items: flex-end;

		.odd,
		.add {
			border: 2rpx solid #9a979b;
			border-radius: 50%;
			width: 40rpx;
			height: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.odd {
			background-color: #fff;
		}

		.add {
			background-color: #999;
			border: 2rpx solid #999;
		}

		.num {
			width: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 34rpx;
		}
	}
</style>
