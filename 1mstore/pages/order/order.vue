<template>
	<view class="order">
		<view class="tabs">
			<u-tabs-swiper ref="uTabs" inactive-color="#333" font-size="32" active-color="#f8cf39" :duration="0.1"
				bar-width="60" :list="list" :current="current" @change="tabsChange" :is-scroll="false"
				></u-tabs-swiper>
			<view class="icon flex-center-cs-r">
				<u-icon name="list"></u-icon>
			</view>
		</view>
		<view class="orderList">
			<swiper class="swi" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(item,index) in tabs" :key="index" >
					<scroll-view class="H" scroll-y style="width: 100%;" @scrolltolower="onreachBottom">
						<list :list="item"></list>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import list from "@/component/list/list.vue"
	export default {
		name:"order",
		data() {
			return {
				list: [{
					name: '进行中'
				}, {
					name: '已完成'
				}, {
					name: '已取消'
				}, {
					name: '退款'
				}, {
					name: '预定'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				tabs:[
					[
						{text:1},
						{text:1}
					],
					[
						{text:1}
					],
					[
						{text:1},
						{text:1}
					],
					[
						{text:1}
					],
					[
						{text:1},
					],
				]
			};
		},
		components:{
			list
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {

			}
		}
	};
</script>

<style lang="less">
	@import url("./order.less");
</style>
