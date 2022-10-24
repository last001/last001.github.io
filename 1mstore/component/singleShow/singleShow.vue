<template>
	<view class="singleShow">
		<u-modal v-model="singleList.isShow" cancel-color="#333" confirm-color="#f8cf39" :show-cancel-button="true"
			:title="list.title" :title-style="{fontWeight: 'bold',fontSize: '18px'}">
			<view class="slot-content">
				<u-field v-model="list.inpVal1" :label="list.label1" :placeholder="list.placeholder1"
					placeholder-style="color:#EAEAEA" :border-bottom="false">
				</u-field>
				<u-field v-model="list.inpVal2" :label="list.label2" :placeholder="list.placeholder2"
					placeholder-style="color:#EAEAEA" :border-bottom="false">
				</u-field>
				<view class="check flex-center-cs-r">
					<u-checkbox-group>
						<u-checkbox v-model="list.isChecked" active-color="#f8cf39">与其他活动共享</u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		name: "singleShow",
		props: ["singleList"],
		data() {
			return {
				list: {}
			}
		},
		onReady() {
			// this.list = this.singleList;
			// console.log(this.list);
		},
		mounted() {
			// #ifdef H5
			this.list = this.singleList;
			console.log(this.list);
			// #endif
		},
		options: {
			styleIsolation: 'shared'
		}
	}
</script>

<style lang="less" scoped>
	.singleShow {
		.slot-content {
			padding: 10rpx 40rpx;

			/deep/.u-field {
				border: 1rpx solid #ccc;
				padding: 10rpx 20rpx;
				border-radius: 12rpx;
				margin-bottom: 20rpx;
				margin-top: 20rpx;

				/deep/.u-label-text {
					color: #f8cf39;
				}
			}
			
		}
	}
</style>
