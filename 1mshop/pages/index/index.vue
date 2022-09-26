<template>
	<view class="index">
		<view class="banner">
			<view class="bg"></view>
			<view class="adress"
				:style="{ top: statusBarHeight + 'px',width:`calc(${W} - ${menuWidth} - ${menuRight})`}">
				<view class="tadress-text">
					<view class="adress-icon">
						<image src="/static/mipmap-mdpi1/homeAdress.png" mode=""></image>
					</view>
					<text class="addText">清远大学城商场 </text>
					<text class="switch" @click="getLocation()">可切换</text>
					<u-icon @click="getLocation()" name="arrow-right" color="#fff" size="20"></u-icon>
				</view>
				<view class="adress-search" @click="ToSearchPage()">
					<u-icon name="search" color="#fff" size="50"></u-icon>
				</view>
			</view>
			<view class="u-block">
				<u-swiper :list="list3" :autoplay="true" indicator indicatorMode="dot" height="100%" circular></u-swiper>
			</view>
		</view>
		<view class="list">
			<view class="lists" v-for="(item,index) in listSrc" :key="index" @click="toPages(item,index)">
				<view class="list-img">
					<image :src="item.src" mode=""></image>
				</view>
				<view class="list-text">
					{{item.name}}
				</view>
			</view>
		</view>
		<!-- 用心甄选，美味至上 -->
		<view class="powder">
			<image class="shopShow" src="../../static/mipmap-mdpi1/shopShow.png" mode=""></image>
			<view class="v-powder">
				<view class="title-shopHeader">
					<image class="shopHeader" src="../../static/mipmap-mdpi1/shopHeader.png" mode=""></image>
					<view class="title">美味餐厅（可送到宿舍）</view>
				</view>
				<h3>用心甄选，美味至上</h3>
				<view class="powderList">
					<u-scroll-list :indicator="false">
						<view v-for="(item, index) in timeLimitLists" :key="index" @click="toTimesPike(item,index)">
							<image :src="item.thumb" class="timeLimit-lists-image"></image>
							<view class="timeLimit-lists-title">
								{{item.title}}
							</view>
							<view class="timeLimit-lists-price">
								<text class="timeLimit-lists-price-text">秒杀价：￥ <text>{{item.price}}</text></text>
								<text class="timeLimit-lists-price-nowPrice">￥{{item.nowPrice}}</text>
							</view>
						</view>
					</u-scroll-list>
				</view>
			</view>
		</view>
		<!-- 限时秒杀 -->
		<view class="timeLimit">
			<view class="v-timeLimit">
				<view class="time-text">
					<view class="text">
						限时秒杀
					</view>
					<view class="times">
						<view class="times-text">
							距离开抢还有
						</view>
						<u-count-down :time="30 * 60 * 60 * 1000" format="HH:mm:ss" autoStart millisecond
							@change="onChange">
							<view class="time">
								<view class="time__custom">
									<text
										class="time__custom__item">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}</text>
								</view>
								<text class="time__doc">:</text>
								<view class="time__custom">
									<text class="time__custom__item">{{ timeData.minutes }}</text>
								</view>
								<text class="time__doc">:</text>
								<view class="time__custom">
									<text class="time__custom__item">{{ timeData.seconds }}</text>
								</view>
							</view>
						</u-count-down>
					</view>
				</view>
				<view class="timeLimit-lists">
					<u-scroll-list :indicator="false">
						<view v-for="(item, index) in timeLimitLists" :key="index" @click="toTimesPike(item,index)">
							<image :src="item.thumb" class="timeLimit-lists-image"></image>
							<view class="timeLimit-lists-title">
								{{item.title}}
							</view>
							<view class="timeLimit-lists-price">
								<text class="timeLimit-lists-price-text">秒杀价：￥ <text>{{item.price}}</text></text>
								<text class="timeLimit-lists-price-nowPrice">￥{{item.nowPrice}}</text>
							</view>
						</view>
					</u-scroll-list>
				</view>
			</view>
		</view>
		<!-- 折扣 + 拼团 -->
		<view class="discount-collage">
			<view class="v-discount-collage">
				<view class="discount">
					<view class="discount-title">
						<view class="title">
							折扣专区
						</view>
						<view class="more" @click="toDiscount()">
							<text>查看更多</text>
							<u-icon name="arrow-right" color="#999" size="14"></u-icon>
						</view>
					</view>
					<view class="discount-image">
						<view class="discount-image-lists" v-for="(item, index) in discountLists" :key="index">
							<image :src="item.thumb" class="discount-lists-image"></image>
							<view class="discount-lists-title">
								{{item.title}}
							</view>
							<view class="discount-lists-price">
								<text class="price">￥<text>{{item.price}}</text></text>
								<text class="nowprice">￥{{item.nowPrice}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="collage">
					<view class="collage-title">
						<view class="title">
							拼团作战
						</view>
						<view class="more" @click="ToCollage()">
							<text>查看更多</text>
							<u-icon name="arrow-right" color="#999" size="28"></u-icon>
						</view>
					</view>
					<view class="collage-image">
						<view class="collage-image-lists" v-for="(item, index) in discountLists" :key="index">
							<image :src="item.thumb" class="collage-lists-image"></image>
							<view class="collage-lists-price">
								<view class="collage-lists-title">
									{{item.title}}
								</view>
								<view class="price">
									<text class="v-price">￥<text>{{item.price}}</text></text>
									<text class="nowprice">￥{{item.nowPrice}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 特惠 + 限量 -->
		<view class="preference-rush">
			<view class="v-preference-rush">
				<view class="preference">
					<view class="preference-title">
						<view class="title">
							特惠专区
						</view>
						<view class="more" @click="ToCollage()">
							<text>查看更多</text>
							<u-icon name="arrow-right" color="#999" size="28"></u-icon>
						</view>
					</view>
					<view class="preference-image">
						<view class="preference-image-lists" v-for="(item, index) in discountLists" :key="index">
							<image :src="item.thumb" class="preference-lists-image"></image>
							<view class="preference-lists-price">
								<view class="preference-lists-title">
									{{item.title}}
								</view>
								<view class="price">
									<text class="v-price">￥<text>{{item.price}}</text></text>
									<text class="nowprice">￥{{item.nowPrice}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="rush">
					<view class="rush-title">
						<view class="title">
							限量抢购
						</view>
						<view class="more" @click="toRush()">
							<text>查看更多</text>
							<u-icon name="arrow-right" color="#999" size="14"></u-icon>
						</view>
					</view>
					<view class="rush-image">
						<view class="rush-image-lists" v-for="(item, index) in discountLists" :key="index">
							<image :src="item.thumb" class="rush-lists-image"></image>
							<view class="rush-lists-title">
								{{item.title}}
							</view>
							<view class="rush-lists-price">
								<text class="price">￥<text>{{item.price}}</text></text>
								<text class="nowprice">￥{{item.nowPrice}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 附近商家 -->
		<text class="business">
			<text class="bg"></text>
			<text class="tit">附近商家</text>
		</text>
		<view class="setList">
			<view class="setSort">
				<view>综合排序</view>
				<u-icon name="arrow-down-fill" size="20" color="#333"></u-icon>
			</view>
			<view>热销榜</view>
			<view>精选版</view>
		</view>
		<!-- 商品 -->
		<productList :list="productList"></productList>
		<!-- 弹窗二 -->
		<view class="receive">
			<u-popup mode="center" :round="10" :safeAreaInsetBottom="false" :show="receiveShow" @close="closeReceive()">
				<view class="receive-content">
					<view class="image">
						<image src="/static/mipmap-mdpi1/indexpop1.png" mode=""></image>
					</view>
					<view class="close" @click="closeReceive()"></view>
					<view class="getCouponList">
						<view class="v-getCouponList" v-for="(item,index) in getCouponList" :key="index">
							<view class="leftBox">
								<view class="money">
									<text>¥</text>10
								</view>
								<view class="full">
									<text>满10元可用</text>
								</view>
								<view class="topRround"></view>
								<view class="btmRround"></view>
							</view>
							<view class="rightBox" @click="setCheckbox(item)">
								<view class="textBox">
									<view class="title">新人专享优惠券</view>
									<view class="duration">
										专享优惠券，有效期7天
									</view>
								</view>
								<view class="set">
									<u-checkbox-group>
										<u-checkbox :customStyle="{marginLeft: '4px'}" shape="circle" size="30"
											labelSize="28" iconColor="#FFF" inactiveColor="#f8cf39"
											activeColor="#F8CF39" :checked="item.isActive"
											@change="setCheckbox(item)" />
									</u-checkbox-group>
								</view>
							</view>
							<!-- 右上角标签 -->
							<view class="tag">已过期</view>
						</view>
					</view>
					<view class="btn"></view>
				</view>
			</u-popup>
		</view>
		<!-- 弹窗一 -->
		<view class="emappShow">
			<u-popup mode="center" :round="10" :safeAreaInsetBottom="false" :show="emappShow" @close="closeEmapp()">
				<view class="emappShow-content">
					<view class="image">
						<!-- <image src="/static/mipmap-mdpi/indexpop2.png" mode=""></image> -->
					</view>
					<view class="close" @click="closeEmapp()">
						<u-icon name="close" color="#fff" size="36"></u-icon>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import productList from "@/component/productList/productList.vue"
	export default {
		name: "index",
		data() {
			return {
				titleBarHeight: "",
				statusBarHeight: "",
				W: '100%',
				menuWidth: "",
				menuRight: "",
				listSrc: [{
						name: "外卖配送",
						src: "/static/mipmap-mdpi1/deliciousFood.png"
					},
					{
						name: "美食",
						src: "/static/mipmap-mdpi1/deliciousFood.png"
					},
					{
						name: "面食",
						src: "/static/mipmap-mdpi1/deliciousFood.png"
					},
					{
						name: "蛋糕",
						src: "/static/mipmap-mdpi1/deliciousFood.png"
					},
					{
						name: "下午茶",
						src: "/static/mipmap-mdpi1/deliciousFood.png",
						routerSrc: "/pages/afterTea/afterTea"
					},
					{
						name: "快递代拿",
						src: "/static/mipmap-mdpi1/deliciousFood.png"
					},
					{
						name: "跑腿",
						src: "/static/mipmap-mdpi1/deliciousFood.png"
					},
					{
						name: "面食",
						src: "/static/mipmap-mdpi1/deliciousFood.png"
					},
					{
						name: "蛋糕",
						src: "/static/mipmap-mdpi1/deliciousFood.png"
					},
					{
						name: "全部",
						src: "/static/mipmap-mdpi1/deliciousFood.png"
					}
				],
				timeData: {},
				indicator: false,
				timeLimitLists: [{
						thumb: "/static/mipmap-mdpi1/timeLImitList1.png",
						title: '刘记麻辣烫想过诞生了你的拉水泥路',
						price: '20',
						nowPrice: '50',
					}, {
						thumb: "/static/mipmap-mdpi1/timeLImitList1.png",
						title: '刘记麻辣烫想过诞生了你的拉水泥路',
						price: '20',
						nowPrice: '50',
					}, {
						thumb: "/static/mipmap-mdpi1/timeLImitList1.png",
						title: '刘记麻辣烫想过诞生了你的拉水泥路',
						price: '20',
						nowPrice: '50',
					},
					{
						thumb: "/static/mipmap-mdpi1/timeLImitList1.png",
						title: '刘记麻辣烫想过诞生了你的拉水泥路',
						price: '20',
						nowPrice: '50',
					}
				],
				discountLists: [{
						thumb: "/static/mipmap-mdpi1/timeLImitList1.png",
						title: '刘记麻辣烫店',
						price: '20',
						nowPrice: '50',
					},
					{
						thumb: "/static/mipmap-mdpi1/timeLImitList1.png",
						title: '刘记麻辣烫想过诞生了你的拉水泥路',
						price: '20',
						nowPrice: '50',
					},
				],
				// 弹窗一
				emappShow: true,
				// 弹窗二
				receiveShow: false,
				getCouponList: [{
						isRadio: false,
						isReceive: false,
						isActive: false
					},
					{
						isRadio: true,
						isReceive: true,
						isActive: true
					}
				],
				productList: [{
						url: "",
						title: "标题一标题一标题一",
						rate: 9.8,
						deliveryText: "商家自送"
					},
					{
						url: "",
						title: "标题二标题二标题二",
						rate: 9.5,
						deliveryText: "平台配送"
					},
				],
				list3: [
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				],
			}
		},
		onReady() {
			// this.H = uni.getSystemInfoSync().windowHeight;
		},
		onLoad() {
			uni.hideTabBar();
		},
		// 下拉刷新
		onPullDownRefresh(){
			setTimeout(function () {
						uni.stopPullDownRefresh();
					}, 1000);
		},
		mounted() {
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			let menuButtonObject = uni.getMenuButtonBoundingClientRect(); //获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。
			uni.getSystemInfo({ //获取系统信息
				success: res => {
					let navHeight = menuButtonObject.height + (menuButtonObject.top - res.statusBarHeight) * 2;
					//导航栏高度=菜单按钮高度+（菜单按钮与顶部距离-状态栏高度）*2
					// 导航栏（胶囊）高度
					this.titleBarHeight = navHeight;
					//  状态栏（顶部）高度
					this.statusBarHeight = res.statusBarHeight
					console.log(this.titleBarHeight);
					console.log(this.statusBarHeight);
					//

					const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
					this.menuWidth = menuButtonInfo.width + 'px'
					this.menuRight = res.screenWidth - menuButtonInfo.right + 'px'

				},
				fail(err) {
					console.log(err);
				}
			})
			// #endif

		},
		components: {
			productList
		},
		methods: {
			onChange(e) {
				this.timeData = e
			},
			// 切换
			getLocation() {

				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success: function(res) {
						console.log("res ==>", res);
						const latitude = res.latitude;
						const longitude = res.longitude;
						uni.openLocation({
							latitude: latitude,
							longitude: longitude,
							success: function() {
								console.log('success');
							}
						});
					}
				});

			},
			ToSearchPage() {
				uni.navigateTo({
					url: '/pages_search/search/search'
				})
			},
			// 下午茶
			toPages(item, index) {
				uni.navigateTo({
					url: item.routerSrc
				})
			},
			// 拼团
			ToCollage() {
				uni.navigateTo({
					url: '/pages_specially/collage/collage'
				})
			},
			//折扣	
			toDiscount() {
				uni.navigateTo({
					url: '/pages_specially/discount/discount'
				})
			},
			// 限量	
			toRush() {
				uni.navigateTo({
					url: '/pages_specially/rush/rush'
				})
			},
			// 限时秒杀
			toTimesPike(item, index) {
				uni.navigateTo({
					url: '/pages/timeSpike/timeSpike'
				})
			},
			// 关闭第一个弹窗
			closeEmapp() {
				this.emappShow = false;
				// uni.showTabBar();
				this.receiveShow = true;
			},
			// 关闭第二个弹窗
			closeReceive() {
				console.log("j78979")
				this.receiveShow = false;
				uni.showTabBar({
					success(res) {
						console.log("res", res)
					},
					fail(err) {
						console.log("err", err)
					}
				});
			},
			setCheckbox(item) {
				this.getCouponList.forEach(e => {
					e.isActive = false;
				})
				item.isActive = !item.isActive;
			}
		},
	}
</script>
<style lang="less">
	@import url("./index.less");
</style>
<style lang="scss">
	.time {
		@include flex;
		align-items: center;

		&__custom {
			// margin-top: 4px;
			width: 22px;
			height: 22px;
			background-color: #fff;
			border-radius: 4px;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			justify-content: center;
			align-items: center;

			&__item {
				color: #333;
				font-size: 12px;
				text-align: center;
				font-weight: 600;
			}
		}

		&__doc {
			color: $u-primary;
			padding: 0px 4px;
		}

		&__item {
			color: #606266;
			font-size: 15px;
			margin-right: 4px;
		}
	}
</style>
