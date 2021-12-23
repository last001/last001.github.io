<template>
	<view class="calculator" :style="{ minHeight: H + 'px' }">
		<view class="result">
			<text class="prescri">{{ prescri }}</text>
			<view class="re_dis">
				<view class="re_price">
					<text>预估运费：</text>
					<text class="number">{{ result1 }}</text>
				</view>
				<view class="re_tariff">
					<text>预估关税：</text>
					<text class="number">{{ result }}</text>
				</view>
			</view>
		</view>
		<view class="cell">
			<view class="shipping box">
				<text>运输方式：</text>
				<view class="shipping_set">
					<picker mode="selector" :value="shippingIndex" :range="shippingList" range-key="name" @change="comfirmShipping">
						<view class="selector_name" :class="shippingIndex == '' ? 'active' : ''">{{ shippingName }}</view>
					</picker>
				</view>
				<text class="iconfont icon-youjiantou1"></text>
			</view>
			<view class="type box">
				<text class="text">品类：</text>
				<view class="type_set">
					<picker mode="selector" :value="typeIndex" :range="typeList" range-key="name" @change="comfirmType">
						<view class="selector_name" :class="typeIndex == '' ? 'active' : ''">{{ typeName }}</view>
					</picker>
				</view>
				<text class="iconfont icon-youjiantou1"></text>
			</view>
			<view class="typeTips">{{ typeTips }}</view>
			<view class="taxRate_freight">
				<view class="freight box">
					<text>运输单价：</text>
					<input type="digit" placeholder="请输入" v-model="freight" />
					<text class="unit">元/kg</text>
				</view>
				<view class="taxRate box">
					<text>税率：</text>
					<input type="digit" disabled placeholder="不可输入" v-model="taxRate" />
					<text class="unit">%</text>
				</view>
			</view>

			<view class="price_count">
				<view class="price box">
					<text>链接售价：</text>
					<input type="digit" placeholder="请输入" v-model="price" />
					<text class="unit">元</text>
				</view>
				<view class="count box">
					<text>数量：</text>
					<input type="digit" placeholder="请输入" v-model="count" />
					<text class="unit">件</text>
				</view>
			</view>
			<view class="case_declarationRate">
				<view class="declarationRate box">
					<text>申报率：</text>
					<input type="digit" placeholder="请输入" v-model="declarationRate" />
					<text class="unit">%</text>
				</view>
				<view class="case box">
					<text>每箱：</text>
					<input type="digit" placeholder="请输入" @input="onInput" v-model="cases" />
					<text class="unit"></text>
				</view>
			</view>
			<view class="weightBox">
				<view class="weight box">
					<text>总重量：</text>
					<input type="digit" placeholder="请输入" v-model="weight" />
					<text class="unit">kg</text>
				</view>
				<view class="weight1 box">
					<text>泡重：</text>
					<input type="digit" disabled placeholder="不可输入" v-model="weight1" />
					<text class="unit">kg</text>
				</view>
			</view>
			<view class="volume">
				<text>长宽高：</text>
				<view class="v-volume">
					<input type="digit" placeholder="长" @input="onInput" v-model="length" />
					<input type="digit" placeholder="宽" @input="onInput" v-model="width" />
					<input type="digit" placeholder="高" @input="onInput" v-model="height" />
				</view>
			</view>
		</view>
		<view class="btn"><button type="warn" @click="getResult()">计算</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			H: '',
			result: '',
			result1: '',
			// 时效
			prescri: '',
			// 运输方式
			shippingList: [
				{ name: '空运', tips: '时效7 ~ 9天', value: '1' },
				{ name: '海运快船', tips: '时效12 ~ 15天', value: '2' },
				{ name: '海运慢船', tips: '时效20 ~ 25天', value: '3' }
			],
			shippingIndex: '',
			shippingName: '请选择',
			// 运价 售价 重量  长 宽 高
			freight: '',
			count: '',
			price: '',
			weight: '',
			weight1: '',
			length: '',
			width: '',
			height: '',
			// 类别
			typeList: [
				{ name: '普件', tipsText: '玻璃制品摆件、书本、本质摆件、键盘、玩具、家具用品等。', taxRate: '15', value: '0' },
				{ name: '电子', tipsText: 'MP3、耳机、手表、相机、等。', taxRate: '12', value: '1' },
				{ name: '纺织', tipsText: '纺织衣物、棉纺类床上用品等。', taxRate: '20', value: '2' },
				{ name: '皮具', tipsText: '皮质钱包、皮质背包等。', taxRate: '21', value: '3' },
				{ name: '铺地用品', tipsText: '棉质地毯、羊毛制地毯、人造纤维等。', taxRate: '18', value: '4' },
				{ name: '家具类', tipsText: '', taxRate: '12', value: '5' },
				{ name: '皮鞋类', tipsText: '', taxRate: '30/285', value: '6' }
			],
			typeIndex: '',
			typeName: '请选择',
			// 类别提示
			typeTips: '',
			// 申报率 税率
			declarationRate: '',
			cases: 1,
			taxRate: ''
		};
	},
	onReady() {
		this.H = uni.getSystemInfoSync().windowHeight;
	},
	onLoad() {
		// this.H = uni.getSystemInfoSync();
		// console.log('this.H ==>',this.H);
	},
	methods: {
		comfirmShipping(e) {
			this.shippingIndex = e.target.value;
			console.log('this.shippingIndex ==>', this.shippingIndex);
			this.shippingName = this.shippingList[this.shippingIndex].name;
		},
		comfirmType(e) {
			this.typeIndex = e.target.value;
			this.typeName = this.typeList[this.typeIndex].name;
			this.taxRate = this.typeList[this.typeIndex].taxRate;
			this.typeTips = this.typeList[this.typeIndex].tipsText;
		},
		onInput() {
			if (this.length == '' || this.width == '' || this.height == '') {
				return;
			}
			this.weight1 = (Number(this.length) * Number(this.width) * Number(this.height) * Number(this.cases)) / 6000;
			this.weight1 = this.weight1.toFixed(2);
		},
		// 计算
		getResult() {
			console.log('this.typeIndex  ==>', this.typeIndex);

			if (this.shippingIndex == ''){
				uni.showToast({
					title: '请选择运输方式',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			if (this.typeIndex == '') {
				uni.showToast({
					title: '请选择品类',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			if (this.freight == '') {
				uni.showToast({
					title: '请输入运费',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			if (this.price == '') {
				uni.showToast({
					title: '请输入链接售价',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			if (this.count == '') {
				uni.showToast({
					title: '请输入数量',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			if (this.weight == '') {
				uni.showToast({
					title: '请输入实重',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			if (this.length == '') {
				uni.showToast({
					title: '请输入长度',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			if (this.width == '') {
				uni.showToast({
					title: '请输入宽度',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			if (this.height == '') {
				uni.showToast({
					title: '请输入高度',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			if (this.declarationRate == '') {
				uni.showToast({
					title: '请输入申报率',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			if (this.cases == '') {
				uni.showToast({
					title: '请输入箱数',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			
			this.result = "";
			this.result1 = "";

			if (this.typeIndex == '6') {
				if (Number(this.weight) > Number(this.weight1)) {
					this.result = (Number(this.price) * Number(this.count) * Number(this.declarationRate) * 0.003) / 285;
					this.result1 = Number(this.freight) * Number(this.weight)
				} else {
					this.result = (Number(this.price) * Number(this.count) * Number(this.declarationRate) * 0.003) / 285;
					this.result1 = Number(this.freight) * Number(this.cases) * Number(this.weight1)
				}
			} else {
				if (Number(this.weight) > Number(this.weight1)) {
					this.result = Number(this.price) * Number(this.count) * Number(this.declarationRate) * Number(this.taxRate) / 10000;
					this.result1 = Number(this.freight) * Number(this.weight)
					// console.log(this.freight, this.weight, this.price, this.count, this.declarationRate, this.taxRate);
				} else {
					this.result = Number(this.price) * Number(this.count) * Number(this.declarationRate) * Number(this.taxRate) / 10000;
					this.result1 = Number(this.freight) * Number(this.cases) * Number(this.weight1)
				}
			}
			this.result = this.result.toFixed(2);
			this.prescri = this.shippingList[this.shippingIndex].tips;
		}
	}
};
</script>

<style lang="less">
@import 'index.less';
</style>
