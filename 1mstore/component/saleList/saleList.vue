<template>
	<view class="saleList">
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view v-for="(item,index) in list" :key="index" class="u-tab-item"
					:class="[current==index ? 'u-tab-item-active' : '']" :data-current="index"
					@tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.name}}</text>
				</view>
			</scroll-view>
			<block v-for="(item,index) in list" :key="index">
				<scroll-view scroll-y class="right-box" v-if="current==index">
					<view class="page-view">
						<view class="class-item">
							<view class="item-title-box">
								<view class="item-title flex-l-r">
									<view class="item-v-title flex-center-cs-r">
										<view class="title">
											{{item.name}}
										</view>
										<view class="checked">
											<u-checkbox-group>
												<u-checkbox v-model="item.isChecked" active-color="#f8cf39" size="26"
													label-size="22" @change="changeBox(item,$event)">全选</u-checkbox>
											</u-checkbox-group>
										</view>
									</view>
									<view class="search">
										<u-field v-model="item.inputVal" icon="search" placeholder="搜索"
											:border-bottom="false" icon-color="#f8cf39" label-width="0"
											:clearable="false"
											placeholder-style="color:#f8cf39;fontSize:20rpx;fontWeight:400">
										</u-field>
									</view>
								</view>
							</view>
							<view class="item-container">
								<view class="thumb-box flex-l-r" v-for="(item1, index1) in item.foods" :key="index1"
									v-show="item1.isShow">
									<view class="image-name">
										<image class="item-menu-image" :src="item1.icon" mode=""></image>
										<view class="item-menu-name-price">
											<view class="item-menu-name">
												{{item1.name}}
											</view>
											<view class="item-menu-price">
												¥{{item1.price}}
											</view>
										</view>
									</view>
									<view class="handle flex-center-cs-c">
										<view class="switch">
											<u-switch v-model="item1.isChecked" size="32" active-color="#f8cf39"
												inactive-color="#fff" @change="single(item1, item, index)"></u-switch>
										</view>
										<view class="text" v-show="!item1.isChecked">
											未打折
										</view>
										<view class="text" v-show="item1.isChecked">打折中</view>
										<view class="btn" v-show="item1.isChecked">
											<u-button size="mini" hover-class="none">修改</u-button>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</block>
		</view>
		<!-- 单个弹窗 -->
		<u-modal v-model="singleList.isShow" cancel-color="#333" confirm-color="#f8cf39" :show-cancel-button="true"
			:title="singleList.title" :title-style="{fontWeight: 'bold',fontSize: '18px'}" @cancel="cancel()">
			<view class="slot-content">
				<u-field v-model="singleList.inpVal1" :label="singleList.label1" :placeholder="singleList.placeholder1"
					placeholder-style="color:#EAEAEA" :border-bottom="false">
				</u-field>
				<u-field v-model="singleList.inpVal2" :label="singleList.label2" :placeholder="singleList.placeholder2"
					placeholder-style="color:#EAEAEA" :border-bottom="false">
				</u-field>
				<view class="check flex-center-cs-r">
					<u-checkbox-group>
						<u-checkbox v-model="singleList.isChecked" active-color="#f8cf39">与其他活动共享</u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
		</u-modal>
	</view>
</template>
<script>
	export default {
		name: "saleList",
		// props: ["list","singleList"],
		props:{
			list:{},
			singleList:{}
		},
		data() {
			return {
				tabbar:[],
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
			}
		},
		
		onShow() {
			// this.tabbar = this.list;
			console.log(this.tabbar, 222222);
		},
		mounted() {
			// #ifdef H5
			this.tabbar = this.list;
			// console.log(this.tabbar);
			// #endif
		},
		methods: {
			// 点击左边的栏目切换
			async swichMenu(index) {
				if (index == this.current) return;
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			},
			// 全选
			changeBox(item, e) {
				if (e.value) {
					this.tabbar.forEach(el => {
						el.foods.forEach(item => {
							item.isChecked = true;
						})
					})
				} else {
					this.tabbar.forEach(el => {
						el.foods.forEach(item => {
							item.isChecked = false;
						})
					})
				}
				this.$emit("sendIsAll", e.value)
			},
			// 单个
			single(item1, item, index) {
				// console.log("item ==>",item1.isChecked);
				if (item1.isChecked) {
					if (item.foods.findIndex(target => target.isChecked == false) == -1) {
						item.isChecked = true;
					} else {
						item.isChecked = false;
					}
					
					this.singleList.isShow = true;
				} else {
					item.isChecked = false;
				}
				this.$emit("sendCheck", item1.isChecked, index,this.singleList.isShow)
			},
			cancel(){
				// console.log(this.singleList.isShow);
				this.singleList.isShow = false;
				this.$emit("sendShow",this.singleList.isShow);
			}
		},
		options: {
			styleIsolation: 'shared'
		}
	}
</script>

<style lang="less">
	@import url("./saleList.less");
</style>
