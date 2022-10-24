<template>
	<view class="discount">
		<saleList ref="child" :list="list" :singleList="singleList" @sendIsAll="getIsAll" @sendCheck="getCheck" @sendShow="getShow"></saleList>
		<view class="footerBtn flex-l-r">
			<view class="isCheck">
				<u-checkbox-group>
					<u-checkbox v-model="isChecked" shape="circle" active-color="#f8cf39" size="36" label-size="28" @change="isShowsingle">
						仅显示折扣商品</u-checkbox>
				</u-checkbox-group>
			</view>
			<view class="btn flex-center-cs-r">
				<u-button size="medium" hover-class="none" @click="cancelAllShow = !cancelAllShow">取消打折</u-button>
				<u-button size="medium" hover-class="none" @click="openAllShow = !openAllShow">全场打折</u-button>
			</view>
		</view>
		<!-- 弹窗 -->
		<!-- 取消全场打折 -->
		<u-modal v-model="cancelAllShow" cancel-color="#333" confirm-color="#f8cf39" :show-cancel-button="true"
			title="取消全场打折确认" :title-style="{fontWeight: 'bold',fontSize: '18px'}" content="确定取消全场的打折活动？"
			:content-style="{color:'#666'}"></u-modal>
		<!-- 开启全场打折确认 -->
		<view class="openDiscount">
			<u-modal v-model="openAllShow" cancel-color="#333" confirm-color="#f8cf39" :show-cancel-button="true"
				title="开启全场打折确认" :title-style="{fontWeight: 'bold',fontSize: '18px'}">
				<view class="slot-content">
					<u-field v-model="discountVal" label-width="0" placeholder="请输入0-1范围的值（折扣数值）" placeholder-style="color:#EAEAEA"  :border-bottom="false">
					</u-field>
				</view>
			</u-modal>
		</view>
		<!-- 单个打折 -->
		<!-- <singleShow :singleList="singleList"></singleShow> -->
	</view>
	</view>
</template>

<script>
	import saleList from "@/component/saleList/saleList.vue"
	import singleShow from "@/component/singleShow/singleShow.vue"
	export default {
		name: "discount",
		data() {
			return {
				isChecked: false,
				list: [{
						name: "全部",
						inputVal: "",
						isChecked: false,
						foods: [{
								icon: require("../../static/image/product.png"),
								name: "全家福麻辣烫",
								price: 266,
								isChecked: true,
								isShow:true,
							},
							{
								icon: require("../../static/image/product.png"),
								name: "全家福麻辣烫",
								price: 266,
								isChecked: false,
								isShow:true,
							},
						]
					},
					{
						name: "实惠套餐1",
						inputVal: "",
						isChecked: false,
						foods: [{
							icon: require("../../static/image/product.png"),
							name: "全家福麻辣烫",
							price: 26600,
							isChecked: false,
							isShow:true,
						}],
					},
					{
						name: "实惠套餐1",
						inputVal: "",
						isChecked: false,
						foods: [{
							icon: require("../../static/image/product.png"),
							name: "全家福麻辣烫",
							price: 26600,
							isChecked: false,
							isShow:true,
						}],
					}
				],
				cancelAllShow: false,
				openAllShow: false,
				discountVal: "",
				
				// 单个弹窗
				singleList:{
					isShow:false,
					isChecked:true,
					title:"开启全场打折确认",
					inpVal1:"",
					placeholder1:"请输入抢购价格",
					label1:"抢购价",
					inpVal2:"",
					label2:"抢购份数",
					placeholder2:"请输入数值",
				},
			}
		},
		components: {
			saleList,
			singleShow
		},
		methods: {
			isShowsingle(e){
				if(e.value){
					this.list.forEach(el => {
						el.foods.forEach(item => {
							if(!item.isChecked){
								item.isShow = false;
							}
						})
					})
				}else{
					this.list.forEach(el => {
						el.foods.forEach(item => {
							item.isShow = true;
						})
					})
				}
				// this.$nextTick(()=>{
				//	 console.log(this.$refs.child.tabbar,213);
				// })
			},
			// 全选
			getIsAll(flag) {
				if (flag) {
					this.list.forEach(el => {
						el.foods.forEach(item => {
							item.isChecked = true;
						})
					})
				} else {
					this.list.forEach(el => {
						el.foods.forEach(item => {
							item.isChecked = false;
						})
					})
				}

				// console.log("this.list ==>", this.list);
			},
			// 单个打折
			getCheck(flag,index,isShow){
				// console.log(index);
				// 是否全部 打折
				if (flag) {
					if (this.list[index].foods.findIndex(target => target.isChecked == false) == -1) {
						this.list[index].foods.isChecked = true;
					} else {
						this.list[index].foods.isChecked = false;
					}
					// 弹窗
					this.singleList.isShow = isShow;
					
				}else{
					// 单个打折
					this.list[index].foods.isChecked = false;
				}
			},
			// 取消弹窗
			getShow(flag){
				console.log(flag);
				this.singleList.isShow = flag;
			}
		}
	}
</script>

<style lang="less">
	@import url("./discount.less");
</style>
