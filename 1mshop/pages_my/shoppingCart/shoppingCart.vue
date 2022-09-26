<template>
	<view class="shoppingCart" :style="{minHeight:H - 20 + 'px'}">
		<view class="shopping-lists" v-for="(item,index) in list" :key="index" @longpress="onLongpress($event)">
			<u-swipe-action>
				<u-swipe-action-item :options="options2">
					<view class="swipe-action">
						<view class="swipe-action__content">
							<view class="check">
								<u-checkbox-group placement="row">
									<u-checkbox :checked="item.checked" size="40" shape="circle" activeColor="#F8CF39"
										@change="isAllSet(item)">
									</u-checkbox>
								</u-checkbox-group>
							</view>
							<view class="image">
								<image src="../../static/mipmap-mdpi1/timeLImitList1.png" mode=""></image>
							</view>
							<view class="content">
								<view class="title">麻辣套餐系列</view>
								<view class="setText">已选：虾仁+生菜+土豆片，微辣</view>
								<view class="money-count">
									<view class="money">
										<text class="new">￥{{item.newPrice}}</text>
										<text class="old">￥28</text>
									</view>
									<view class="count">
										<view class="sub" @click="sub(item)">
											<u-icon :bold="true" name="minus" color="#ccc" size="20"></u-icon>
										</view>
										<view class="num">{{item.num}}</view>
										<view class="add" @click="add(item)">
											<u-icon :bold="true" name="plus" color="#ccc" size="20"></u-icon>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</u-swipe-action-item>
			</u-swipe-action>
		</view>
		<!-- 弹窗 -->
		<view class="showDelete">
			<u-popup :safeAreaInsetBottom="false" :show="showDelete" mode="center" @close="showDelete = false">
				<view class="title">
					确认删除该商品
				</view>
				<view class="btns">
					<u-button text="取消" shape="circle" color="#F24849" @click="showDelete = false"></u-button>
					<u-button text="确定" shape="circle" color="#F8CF39"></u-button>
				</view>
			</u-popup>
		</view>
		<!-- 全选 + 已减-->
		<view class="total-reduce">
			<view class="reduce">
				已减0元
			</view>
			<view class="set-total">
				<view class="check">
					<u-checkbox-group placement="row" @change="allSet()">
						<u-checkbox :checked="allChecked" size="34" labelSize="28" label="全选" shape="circle"
							activeColor="#F8CF39">
						</u-checkbox>
					</u-checkbox-group>
				</view>
				<view class="total-btn">
					<view class="text">
						合计：
					</view>
					<view class="money">
						￥{{total}}
					</view>
					<view class="btn">
						<u-button text="去结算" color="#F8CF39" shape="circle" size="26" @click="toSubmitOrder()">
						</u-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				H: "",
				showDelete: false,
				options2: [{
						text: '移入收藏',
						style: {
							backgroundColor: '#F8CF39'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#F24849'
						}
					},
				],
				// 列表
				list: [{
						num: 1,
						newPrice: 26,
						checked: true
					},
					{
						num: 1,
						newPrice: 26,
						checked: false
					},
					{
						num: 2,
						newPrice: 26,
						checked: false
					}
				],
				// 全选状态值
				allChecked: false,
				total: 0,
			}
		},
		onReady() {
			// #ifdef APP-PLUS || H5
			this.H = uni.getSystemInfoSync().windowHeight;
			// #endif
		},
		onLoad() {
			this.getTotal();
		},
		methods: {
			onLongpress(e) {
				// console.log("e ==>", e);
				this.showDelete = true;
			},
			// 全选
			allSet() {
				if (this.allChecked) {
					this.list.forEach(e => {
						e.checked = false;
					})
					this.allChecked = false;
				} else {
					this.list.forEach(e => {
						e.checked = true;
					})
					this.allChecked = true;
				}

				this.getTotal();
			},
			// 单选
			isAllSet(item) {
				console.log("item ==>", item)
				item.checked = !item.checked;
				if (this.list.findIndex(target => target.checked == false) == -1) {
					this.allChecked = true;
				} else {
					this.allChecked = false;
				}
				this.getTotal();
			},
			// jia
			add(item) {
				item.num++;
				this.getTotal();
			},
			sub(item) {
				if (item.num == 1) {
					return;
				}
				item.num--;
				this.getTotal();
			},
			// 合计计算
			getTotal() {
				this.total = 0;
				this.list.forEach(e => {
					if (e.checked) {
						this.total += e.num * e.newPrice;
					}
				})
			},
			// 结算按钮
			toSubmitOrder() {
				uni.navigateTo({
					url: "/pages/submitOrder/submitOrder"
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("./shoppingCart.less");
</style>
