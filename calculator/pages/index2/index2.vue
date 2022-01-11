<template>
	<view class="calculator" :style="{ minHeight: H - 15 + 'px' }">
		<!-- 运费总和 -->
		<view class="total">
			<view class="re_dis">
				<text>费用合计：</text>
				<text class="number">{{ total }}</text>
			</view>
			<text class="prescri">{{ prescri }}</text>
		</view>
		<!-- 运输方式 -->
		<view class="shipping">
			<text class="text">运输方式：</text>
			<view class="shipping_set">
				<picker mode="selector" :value="shippingIndex" :range="shippingList" range-key="name" @change="comfirmShipping">
					<view class="selector_name">{{ shippingName }}</view>
				</picker>
			</view>
			<text class="iconfont icon-youjiantou1"></text>
		</view>
		<view class="fright">
			<view class="box_weight">
				<view class="weight">
					<text class="text">总重量：</text>
					<view class="int_unit">
						<input type="digit" placeholder="请输入" @input="onInput($event)" v-model="weight" />
						<view class="unit">kg</view>
					</view>
				</view>
				<view class="price">
					<text class="text">运费单价：</text>
					<view class="int_unit">
						<input type="digit" placeholder="请输入" @input="onInput($event)" v-model="price" />
						<view class="unit">元</view>
					</view>
				</view>
			</view>
			<!-- 长*宽*高 -->
			<view class="volume">
				<text class="text">尺寸：</text>
				<view class="list">
					<view class="int">
						<input type="digit" placeholder="长" @input="onInput($event)" v-model="length" />
						<input type="digit" placeholder="宽" @input="onInput($event)" v-model="width" />
						<input type="digit" placeholder="高" @input="onInput($event)" v-model="height" />
						<view class="unit">cm</view>
					</view>
				</view>
			</view>
			
			<!-- 总泡重 -->
			<view class="allBubbleWeight_price">
				<view class="box">
					<text class="text">箱数：</text>
					<!-- <view class="box_number">
						<view class="reduce" :class="boxCount == 1 ? 'active' : ''" @click="reduceBtn()">－</view>
						<view class="number">
							<view class="count">{{ boxCount }}</view>
						</view>
						<view class="add" @click="addBtn()">+</view>
					</view> -->
					<view class="int_unit">
						<input type="digit" placeholder="请输入" @input="onInput($event)" @blur="blurInput($event,'box')" @focus="focueInput($event,'box')" v-model="boxCount" />
						<view class="unit">箱</view>
					</view>
				</view>
				<view class="allBubbleWeight">
					<text class="text">总泡重：</text>
					<text>{{ allBubbleWeight }}</text>
				</view>
				<!-- <view class="price">
					<text class="text">运费单价：</text>
					<view class="int_unit">
						<input type="digit" v-model="price" />
						<view class="unit">元</view>
					</view>
				</view> -->
			</view>
			<!-- 运费总计 -->
			<view class="Allfright">
				<text class="text">运费总计：</text>
				<view class="result">{{ result }}</view>
			</view>
		</view>
		<!-- 0000 -->
		<view class="tariff">
			<view class="type_declaration">
				<view class="type">
					<text class="text">货品种类：</text>
					<view class="type_number">
						<view class="reduce" :class="productCount == '1' ? 'active' : ''" @click="reduceBtn1()">－</view>
						<view class="number">{{ productCount }}</view>
						<view class="add" @click="addBtn1()">+</view>
					</view>
				</view>
				<view class="declaration">
					<text class="text">申报率：</text>
					<view class="int_unit">
						<input type="digit" placeholder="请输入" v-model="declaration" />
						<view class="unit">%</view>
					</view>
				</view>
			</view>
			<!-- 品类 税率 价格 件数 -->
			<view class="lists">
				<view class="list" v-for="(item, index) in tariffList" :key="index">
					<!-- 品类 税率-->
					<view class="category">
						<text class="text">
							<text class="cateId">{{ index + 1 }}.</text>
							品类：
						</text>
						<picker mode="selector" :value="item.typeIndex" :range="item.typeList" range-key="name" @change="comfirmType($event, item)">
							<view class="selector_name">{{ item.typeName }}</view>
						</picker>
						<text class="iconfont icon-youjiantou1"></text>
					</view>
					<!-- 税率 -->
					<view class="taxRate">
						<text class="text">税率：</text>
						<input type="digit" placeholder-class="place-holder" v-model="item.taxRate1" placeholder="不输入则按照上方税率运算" />
						<view class="unit">%</view>
					</view>
					<!-- 价格 件数 -->
					<view class="salePrice_number">
						<view class="salePrice">
							<text class="text">销售价格：</text>
							<input type="digit" placeholder="请输入" v-model="item.salePrice" />
							<view class="unit">元</view>
						</view>
						<view class="number">
							<text class="text">件数：</text>
							<input type="digit" placeholder="请输入" @blur="blurInput($event,'number',item)" @focus="focueInput($event,'number',item)" v-model="item.count" />
							<view class="unit">件</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="Alltariff">
			<text class="text">关税总计：</text>
			<view class="result1">{{ result1 }}</view>
		</view>
		<view class="btn"><button type="warn" @click="getResult()">计算</button></view>

		<!-- 提示 -->
		<view class="tips">
			<text>注意事项</text>
			<view class="contentTip">
				<view class="list">
					<view class="text1">普件：</view>
					<view>玻璃制品摆件、书本、本质摆件、键盘、玩具、家具用品等。</view>
				</view>
				<view class="list">
					<view class="text1">电子：</view>
					<view>MP3、耳机、手表、相机、等。</view>
				</view>
				<view class="list">
					<view class="text1">纺织：</view>
					<view>纺织衣物、棉纺类床上用品等。</view>
				</view>
				<view class="list">
					<view class="text1">皮具：</view>
					<view>皮质钱包、皮质背包等。</view>
				</view>
				<view class="list">
					<view class="text1">铺地用品：</view>
					<view>棉质地毯、羊毛制地毯、人造纤维等。</view>
				</view>
				<view class="list">家具类：</view>
				<view class="list">皮鞋类：</view>
			</view>
		</view>
		<!-- <navigator url="/pages/index/index">跳转index</navigator> -->

		<!-- <button class="share-now" open-type="share">去分享</button> -->
	</view>
</template>

<script>
// import share from '@/utils/share.js';
export default {
	data() {
		return {
			H: '',
			// 运输方式
			shippingIndex: '',
			shippingName: '请选择',
			shippingList: [
				{ name: '空运', tips: '时效7 ~ 9天', value: '1' },
				{ name: '海运快船', tips: '时效12 ~ 15天', value: '2' },
				{ name: '海运慢船', tips: '时效20 ~ 25天', value: '3' }
			],
			prescri: '',
			// 箱数
			boxCount: 1,
			// 尺寸
			length: '',
			width: '',
			height: '',
			weight: "",
			allBubbleWeight: 0,
			price: "",
			// 种类
			productCount: 1,
			declaration: "",
			// 种类 列表标识
			tariffList: [
				{
					salePrice: "",
					count: 1,
					taxRate1: '',
					total: '',
					taxRate: '',
					typeIndex: '',
					typeName: '请选择',
					typeList: [
						{ name: '普件（15%税率）', tipsText: '玻璃制品摆件、书本、本质摆件、键盘、玩具、家具用品等。', taxRate: '15', value: '0' },
						{ name: '电子（12%税率）', tipsText: 'MP3、耳机、手表、相机、等。', taxRate: '12', value: '1' },
						{ name: '纺织（20%税率）', tipsText: '纺织衣物、棉纺类床上用品等。', taxRate: '20', value: '2' },
						{ name: '皮具（21%税率）', tipsText: '皮质钱包、皮质背包等。', taxRate: '21', value: '3' },
						{ name: '铺地用品（18%税率）', tipsText: '棉质地毯、羊毛制地毯、人造纤维等。', taxRate: '18', value: '4' },
						{ name: '家具类（12%税率）', tipsText: '', taxRate: '12', value: '5' },
						{ name: '皮鞋类（30%/285税率）', tipsText: '', taxRate: '30/285', value: '6' }
					]
				}
			],
			typeName: '请选择',
			result: 0,
			result1: 0,
			total: 0,
			share: {
				title: 'ALAPI',
				path: '/pages/index2/index2',
				imageUrl: '',
				desc: '',
				content: ''
			}
		};
	},
	onReady() {
		this.H = uni.getSystemInfoSync().windowHeight;
		uni.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		});
	},
	methods: {
		onShareAppMessage() {
			return {
				title: this.share.title,
				path: this.share.path,
				imageUrl: this.share.imageUrl,
				desc: this.share.desc,
				content: this.share.content,
				success(res) {
					uni.showToast({
						title: '分享成功'
					});
				},
				fail(res) {
					uni.showToast({
						title: '分享失败',
						icon: 'none'
					});
				}
			};
		},
		// 运输方式
		comfirmShipping(e) {
			this.shippingIndex = e.target.value;
			this.shippingName = this.shippingList[this.shippingIndex].name;
			this.prescri = this.shippingList[this.shippingIndex].tips;
		},
		// 种类
		comfirmType(e, item) {
			console.log('item ==>', item);
			item.typeIndex = e.target.value;
			item.typeName = item.typeList[item.typeIndex].name;
			item.taxRate = item.typeList[item.typeIndex].taxRate;
		},
		// 减少箱数
		// reduceBtn() {
		// 	if (this.boxCount == 1) {
		// 		return;
		// 	}
		// 	this.boxCount--;
		// 	this.allBubbleWeight = ((Number(this.length) * Number(this.width) * Number(this.height) * Number(this.boxCount)) / 6000 ).toFixed(2);
		// },
		
		// 获取焦点
		focueInput(e,string,item){
			if(string == "box"){
				this.boxCount = "";
			}else{
				item.count = "";
			}
		},
		// 失去焦点
		blurInput(e,string,item){
			if(string == "box"){
				if(this.boxCount == "" || this.boxCount == 0){
					this.boxCount = 1;
				}
			}else{
				if(item.count == "" || item.count == 0){
					item.count = 1;
				}
			}
		},
		// 计算泡重
		onInput(e) {
			if (this.length == '' || this.length == '0') {
				return (this.allBubbleWeight = 0);
			}
			if (this.width == '' || this.width == '0') {
				return (this.allBubbleWeight = 0);
			}
			if (this.height == '' || this.height == '0') {
				return (this.allBubbleWeight = 0);
			}
			this.allBubbleWeight = ((Number(this.length) * Number(this.width) * Number(this.height) * Number(this.boxCount)) / 6000 ).toFixed(2);
			
			// 运费总计
			if (this.price == '0' || this.price == '') {
				return;
			}
			if(this.allBubbleWeight == 0){
				return;
			}
			if(this.weight == "" || this.weight == "0"){
				return;
			}
			
			if (Number(this.weight) >= Number(this.allBubbleWeight)) {
				this.result = Number(this.weight) * Number(this.price);
			} else {
				this.result = Number(this.allBubbleWeight) * Number(this.price);
			}
			this.result = this.result.toFixed(2);
		},
		//添加箱数
		// addBtn() {
		// 	this.boxCount++;
		// 	this.allBubbleWeight = ((Number(this.length) * Number(this.width) * Number(this.height) * Number(this.boxCount)) / 6000 ).toFixed(2);
		// },
		// 减少种类数
		reduceBtn1() {
			if (this.productCount == 1) {
				return;
			}
			this.productCount--;
			this.tariffList.pop();
		},
		//添加种类数
		addBtn1() {
			this.productCount++;
			let obj = {
				salePrice: 0,
				count: 1,
				total: '',
				taxRate: '',
				typeIndex: '',
				typeName: '请选择',
				typeList: [
					{ name: '普件（15%）', tipsText: '玻璃制品摆件、书本、本质摆件、键盘、玩具、厨房家具用品等。', taxRate: '15', value: '0' },
					{ name: '电子（12%）', tipsText: 'MP3、耳机、手表、相机、等。', taxRate: '12', value: '1' },
					{ name: '纺织（20%）', tipsText: '纺织衣物、棉纺类床上用品等。', taxRate: '20', value: '2' },
					{ name: '皮具（21%）', tipsText: '皮质钱包、皮质背包等。', taxRate: '21', value: '3' },
					{ name: '铺地用品（18%）', tipsText: '棉质地毯、羊毛制地毯、人造纤维等。', taxRate: '18', value: '4' },
					{ name: '家具类（12%）', tipsText: '', taxRate: '12', value: '5' },
					{ name: '皮鞋类（30%/285）', tipsText: '', taxRate: '30/285', value: '6' }
				]
			};
			this.tariffList.push(obj);
		},
		// 计算
		getResult() {
			if (this.shippingIndex == '') {
				uni.showToast({
					title: '请选择运输方式',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			if (this.allBubbleWeight == '0' || this.allBubbleWeight == '') {
				uni.showToast({
					title: '请输入总重量',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			if (this.length == '0' || this.length == '') {
				uni.showToast({
					title: '请输入长度',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			if (this.width == '0' || this.width == '') {
				uni.showToast({
					title: '请输入宽度',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			if (this.height == '0' || this.height == '') {
				uni.showToast({
					title: '请输入高度',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			if (this.price == '0' || this.price == '') {
				uni.showToast({
					title: '请输入运费单价',
					icon: 'none',
					duration: 2000
				});
				return;
			}

			this.result1 = 0;
			// 运费总计
			if (Number(this.weight) >= Number(this.allBubbleWeight)) {
				this.result = Number(this.weight) * Number(this.price);
			} else {
				this.result = Number(this.allBubbleWeight) * Number(this.price);
			}
			this.result = this.result.toFixed(2);
			// 关税总计
			
			this.tariffList.forEach(e => {
				e.total = 0;
				if (e.taxRate1 == '') {
					e.total = (Number(e.salePrice) * Number(e.count) * Number(this.declaration) * Number(e.taxRate)) / 10000;
				} else {
					e.total = (Number(e.salePrice) * Number(e.count) * Number(this.declaration) * Number(e.taxRate1)) / 10000;
				}
				this.result1 += Number(e.total);
			});
			this.result1 = this.result1.toFixed(2);

			this.total = Number(this.result) + Number(this.result1);
			this.total = this.total.toFixed(2);
		}
	}
};
</script>

<style lang="less">
@import 'index2.less';
</style>
