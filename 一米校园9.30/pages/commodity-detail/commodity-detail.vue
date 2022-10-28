<template>
	<view>

		<!-- <view class="nav">
			<view>商品分类:</view>
			<view class="nav-input"><input v-model="classification" class="uni-input" focus placeholder="请输入分类名称" />
			</view>
		</view> -->
		<view class="nav">
			商品分类:
			<picker @change="bindPickerChange" :value="index" :range="array">
				<view class="uni-input">{{array[index]}}</view>
			</picker>
		</view>

		<view class="nav">
			<view>商品名称:</view>
			<view class="nav-input"><input v-model="Tradename" class="uni-input" focus :placeholder="detail.Name" />
			</view>
		</view>
		<view class="nav">
			<view>餐盒费:</view>
			<view class="nav-input"><input v-model="Mealboxfee" class="uni-input" focus placeholder="请输入餐盒费[不超过1元]" />
			</view>
		</view>
		<view class="nav">
			<view>销售价:</view>
			<view class="nav-input"><input v-model="Salesprice" class="uni-input" focus placeholder="请输入销售价" />
			</view>
		</view>
		<view class="nav">
			<view>折扣:</view>
			<view class="nav-input"><input v-model="discount" class="uni-input" focus placeholder="请输入折扣" />
			</view>
		</view>
		<view class="nav">
			<view>销售方式:</view>
			<view class="nav-input"><input v-model="Salesmethod" class="uni-input" focus placeholder="" /></view>
		</view>
		<view class="nav">
			<view>商品成本:</view>
			<view class="nav-input"><input v-model="Costofgoods" class="uni-input" focus placeholder="请输入商品成本" />
			</view>
		</view>
		<view class="nav">
			<view>库存:</view>
			<view class="nav-input"><input v-model="stock" class="uni-input" focus placeholder="请输入库存" />
			</view>
		</view>
		<view class="nav">
			<view>排序号:</view>
			<view class="nav-input"><input v-model="SortNo" class="uni-input" focus placeholder="999" /></view>
		</view>
		<view class="nav">
			<view>商品缩略图:</view>
		</view>
		<view class="nav">
			<view style="display: flex;">
				<uni-file-picker :image-styles="imageStyles"></uni-file-picker>
			</view>
		</view>
		<view class="nav">
			<view>视频轮播图:</view>
		</view>
		<view class="nav">
			<view style="display: flex;">
				<uni-file-picker limit="9" file-mediatype="video" title="最多选择9个视频"></uni-file-picker>
			</view>
		</view>
		<view class="nav">
			<view>商品文字描述:</view>
		</view>
		<view class="nav">
			<uni-easyinput type="textarea" :inputBorder="false" autoHeight v-model="valuetext"
				placeholder="请输入商品文字描述..."></uni-easyinput>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {},

				classification: '',
				Tradename: '',
				Mealboxfee: '',
				Salesprice: '',
				discount: '',
				Salesmethod: '',
				Costofgoods: '',
				stock: '',
				SortNo: '',

				valuetext: '',
				title: 'picker',
				array: ['中国', '美国', '巴西', '日本'],
				index: 0,

				imgArr: [],
				imageStyles: {
					"height": 60, // 边框高度
					"width": 60, // 边框宽度
					// "border":{ // 如果为 Boolean 值，可以控制边框显示与否
					// 	"color":"#eee",		// 边框颜色
					// 	"width":"1px",		// 边框宽度
					// 	"style":"solid", 	// 边框样式
					// 	"radius":"50%" 		// 边框圆角，支持百分比
					// }
				}

			}
		},
		onShow() {
			this.detail = uni.getStorageSync('commodity-detail')
			console.log(this.detail);
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
			},
		}
	}
</script>

<style>
	.nav {
		display: flex;
		/* background-color: aqua; */
		padding: 20rpx 30rpx;
		border-bottom: 1px solid #cecece;
	}

	.nav-input {
		margin-left: 10px;
	}
</style>
