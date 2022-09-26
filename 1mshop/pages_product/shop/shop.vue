<template>
	<view class="shop">
		<view class="introduce">
			<view class="bgImage">
				<image src="/static/mipmap-mdpi1/teaBanner.png" mode=""></image>
			</view>
			<!-- 返回 -->
			<view class="back" :style="{top:Top + 'px'}" @click="back()">
				<u-icon name="arrow-left" color="#FFF" size="36"></u-icon>
			</view>
			<!-- 店铺信息 -->
			<view class="shopInfo">
				<view class="title-star-score">
					<view class="v-title-star-score">
						<view class="title-star">
							<h4>荷叶饭撞江奈（师大店）</h4>
							<u-icon :name="starIcon" size="40" :color="starIcon == 'star' ? '#ccc' : '#f8cf39'" @click="star()"></u-icon>
						</view>
						<view class="score">
							<view class="grade">
								9.8分
							</view>
							<view class="reserve">
								<!-- <image src="/static/mipmap-mdpi/timeShop.png" mode=""></image> -->
								<text>接受预定</text>
							</view>
							<view class="take">
								<!-- <image src="/static/mipmap-mdpi/take.png" mode=""></image> -->
								<text>支持自取</text>
							</view>
						</view>
					</view>
					<view class="header">
						<!-- <image src="../../static/mipmap-mdpi/storeImage.png" mode=""></image> -->
					</view>
				</view>
				<view class="notice">
					公告：欢迎各位同学的光临！本店支持接受提前预定...
				</view>
				<view class="tags">
					<text>门店首单减1元</text>
					<text>满10减1</text>
					<text>满20减5</text>
					<text>满30减5</text>
				</view>
			</view>
			<view class="tabbar">
				<view class="v-tabbar" :class="current == 2 ? 'active' : ''">
					<u-sticky bgColor="#fff">
						<u-tabs :list="tabbarList" :scrollable="false"  :current="current" lineWidth="44" lineHeight="6" lineColor="#F8CF39"
							:activeStyle="{
						color: '#333333',
						fontWeight: 'bold',
						transform: 'scale(1.05)'
					}" :inactiveStyle="{
						color: '#333',
						transform: 'scale(1)'
					}" itemStyle="padding-left: 10px; padding-right: 18px;" @click="clickTab"></u-tabs>
					</u-sticky>        
				</view>
				<view class="search">
					<u-icon name="search" color="#FBE697" size="34"></u-icon>
					<text class="search-text">搜索</text>
				</view>
			</view>
			<!-- 商品 -->
			<view class="list" v-if="current == 0">
				<view class="classTitle">
					<view class="title" v-for="(item,index) in titleLists" :key="index"
						:class="item.isActive ? 'active' : ''" @click="switchTitle(item,index)">
						<view :style="{display:item.isIcon ? 'block' : 'none'}">
							<u-icon name="thumb-up-fill" color="#FF6465" size="50"></u-icon>
						</view>
						{{item.title}}
					</view>
				</view>
				<!-- 000-->
				<scroll-view :scroll-top="scrollTop" :scroll-y="true" class="scrollview-box"
					@scroll="scrollPage($event)">
					<view class="tage" v-for="(item,index) in lists" :key="index" :class="'tage' + index"
						:style="{paddingBottom:index == lists.length-1 ? lastTageTop + 'px' : 0}">
						<!-- 标题 -->
						<view class="tage-title">
							<view class="item0" v-if="index == 0">
								<text>招牌</text>
								<text>老板推荐</text>
							</view>
							<text v-else class="otherTitle" :class="'item'+index">
								{{item.title}}
							</text>
						</view>
						<!-- 内容 -->
						<view class="tage-list" v-for="(k,i) in item.list" :key="i" :class="i == 0 ? 'active' : ''">
							<view class="image">
								<image :src="k.image" mode="" @click="goodsDetailsFromShow = true"></image>
							</view>
							<view class="content">
								<view class="content-title padding">
									荷叶饭套餐
								</view>
								<view class="content-score padding">
									牛肉+生菜+白萝卜+米饭
								</view>
								<view class="content-dis padding">
									2.1折 限购1份
								</view>
								<view class="content-price padding">
									<view class="content-price-num">
										<text class="newPrice">¥24</text>
										<text class="oldPrice">¥26</text>
									</view>
									<view class="btn">
										<u-button text="选规格" size="mini" shape="circle" color="#F8CF39"
											@click="popupGoodsDetails()">
										</u-button>
										<u-badge type="error" value="2"></u-badge>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 评价 -->
			
			<view class="evaluate" v-else-if="current == 1">
				<view class="evaluate-sroce">
					<view class="v-evaluate">
						<view class="num">{{HalfValue * 2}}</view>
						<view class="stars">
							<view class="rate">
								<u-rate :value="HalfValue" size="30" :allowHalf="true" ></u-rate>
							</view>
							<view class="text">
								综合评分
							</view>
						</view>
						<view class="taste">
							<view class="text">
								味道
							</view>
							<view class="rate">
								9.5
							</view>
						</view>
						<view class="packing">
							<view class="text">
								包装
							</view>
							<view class="rate">
								9.5
							</view>
						</view>
					</view>
					<view class="sroce">
						<view class="rate">
							9.9
						</view>
						<view class="text">
							配送服务
						</view>
					</view>
				</view>

				<view class="hot-comment">
					<view class="item" v-show='index < hotListShow' v-for="(item,index) in hotList" :key="index"
						:class="item.isActive ? 'active' : ''" @click="sethotComment(item)">
						<text>{{item.title}}</text>
						<text>{{item.count}}</text>
					</view>
					<!-- 折叠 -->
					<view class="fold" @click="foldList()">
						<text>{{text}}</text>
						<!-- down -->
						<u-icon :name="iconName" color="#F8CF39" size="30"></u-icon>
					</view>
				</view>

				<!-- 000 -->
				<view class="evaluatePeople">
					<view class="v-evaluatePeople" v-for="(item,index) in evaluatePeopleLists" :key="index">
						<view class="people">
							<view class="image">
								<image src="../../static/mipmap-mdpi1/deliciousFood.png" mode=""></image>
							</view>
							<view class="title-rate">
								<view class="v-title-rate">
									<view class="title">
										棉花糖很甜
									</view>
									<view class="rate">
										<u-rate :value="3.8" size="30" gutter="2" :allowHalf="true"
											activeColor="#FFD739" readonly></u-rate>
									</view>
								</view>
								<view class="time">
									2022/06/06
								</view>
							</view>
						</view>
						<view class="text">
							味道不错 值得购买 配送速度很快
						</view>
						<view class="followUp" v-if="item.isFollowUp">
							<view class="v-followUp">
								用户15天后追评：
							</view>
							<view class="followUp-content">
								满意 超值套餐
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 商家 -->
			<view class="evaluate" v-else>
				<view class="">
					商家
					<u-rate v-model="HalfValue" size="30" :allowHalf="true" readonly></u-rate>
				</view>
			</view>	
		</view>
		<!-- 结算按钮 -->
		<view class="foot" v-show="current == 0">
			<view class="subMoney" v-show="!storeCartState">
				已减6.66元
			</view>
			<view class="valuation-pay">
				<view class="image-price">
					<view class="image" @click="storeCartState = !storeCartState">
						<!-- <image src="/static/mipmap-mdpi/shoppingCart.png" mode=""></image> -->
						<view class="badge">
							<u-badge type="error" max="99" value="6"></u-badge>
						</view>
					</view>
					<view class="price">
						<view class="v-price">
							￥29.99
						</view>
						<view class="valuetion">
							预估到手价￥6.66
						</view>
					</view>
				</view>
				<view class="btn">
					<u-button text="去结算" shape="circle" color="#F24849" size="small" @click="toSubmitOrder()">
					</u-button>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="goodsDetails">
			<u-popup mode="bottom" zIndex="10078" :round="10" :closeable="true" closeIconPos="top-right"
				:show="goodsDetailsShow" @close="goodsDetailsShow = false">
				<view class="goodsContent">
					<view class="image-details">
						<view class="image">
							<image src="/static/mipmap-mdpi1/timeLImitList1.png" mode=""></image>
						</view>
						<view class="details">
							<h4>刘记麻辣香锅全家福套餐</h4>
							<view class="set">
								已选：虾仁+生菜+土豆片，微辣
							</view>
							<view class="price">
								<text class="newPrice"> <text class="sign">￥</text> 22</text>
								<text class="oldPrice">￥26</text>
							</view>
						</view>
					</view>
					<view class="count">
						<view>数量</view>
						<view class="v-count">
							<addsubBtns :num="num"></addsubBtns>
						</view>
					</view>
					<view class="set" v-for="(item,index)  in goodList" :key="index">
						<view class="setTitle">
							选择一
						</view>
						<view class="setList">
							<view class="active">牛肉</view>
							<view>羊肉</view>
							<view>虾仁</view>
						</view>
					</view>
					<view class="btn">
						<u-button text="加入购物车" color="#F24849" shape="circle"></u-button>
					</view>
				</view>
			</u-popup>
		</view>
		<!-- 商品详情单 -->
		<view class="goodsDetailsFrom">
			<u-popup mode="center" :safeAreaInsetBottom="false" zIndex="10076" :round="20" :show="goodsDetailsFromShow"
				@close="goodsDetailsFromShow = false" @open="openGoodsDetailsFrom">
				<view class="content">
					<view class="image">
						<image src="/static/mipmap-mdpi1/timeLImitList1.png" mode=""></image>
					</view>
					<view class="score">
						<view class="score-text">
							<text>荷叶饭套餐</text>
							<text>【热销商品】</text>
						</view>
						<view class="v-score">
							畅销评分：66
						</view>
					</view>
					<view class="btn">
						<view class="price">￥26</view>
						<view v-if="addNum">
							<u-button text="加入购物车" color="#F8CF39" size="mini" @click="addNum = false"></u-button>
						</view>
						<view class="addNum" v-else>
							<addsubBtns :num="num1"></addsubBtns>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
		<!-- 店家页面 购物车页面 -->
		<view class="storeCart">
			<u-popup mode="bottom" :round="30" :show="storeCartState" @close="storeCartState = false">
				<view class="content">
					<view class="reduce">
						已减6.60元
					</view>
					<view class="setProduct">
						<view class="check-text">
							<u-checkbox-group>
								<u-checkbox :checked="checkedSet" size="26" shape="circle" activeColor="#f34849">
								</u-checkbox>
							</u-checkbox-group>
							<view class="text" @click="Allset()">
								<text class="strong">已选商品</text>
								<text>(包装费2元)</text>
							</view>
						</view>
						<view class="allDelete">全部删除</view>
					</view>
					<!-- list -->
					<view class="list">
						<view class="lists" v-for="(item,index) in storeCartList" :key="index">
							<view class="name">
								<u-checkbox-group>
									<u-checkbox :customStyle="{marginRight: '8px'}" :label="item.name" shape="circle"
										size="28" labelSize="28" activeColor="#f8cf39" :checked="item.isChecked"
										@change="isAllSet(item)" />
								</u-checkbox-group>
							</view>
							<view class="v-lists" v-for="(k,i) in item.list" :key="i">
								<view class="image">
									<image src="../../static/mipmap-mdpi1/timeLImitList1.png" mode=""></image>
								</view>
								<view class="info">
									<view class="title">麻辣套餐系列</view>
									<view class="setText">已选：虾仁+生菜+土豆片，微辣</view>
									<view class="money-count">
										<view class="money">
											<text class="new">￥26</text>
											<text class="old">￥28</text>
										</view>
										<addsubBtns :num="num2"></addsubBtns>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
		<!--  -->
	</view>
</template>

<script>
	import addsubBtns from "@/component/addsubBtns/addsubBtns.vue"
	export default {
		name:"shop",
		data() {
			return {
				starIcon:"star",
				HalfValue: 3.4,
				statusBarHeight: "",
				Top: "",
				tabbarList: [{
						name: '商品',
					}, {
						name: '评价',
						badge: {
							value: '666+',
						}
					},
					{
						name: '商家',
					}
				],
				current: 0,

				titleLists: [{
						title: "推荐",
						isActive: true,
						isIcon: true,
						lists: 2
					},
					{
						title: "折扣商品",
						isActive: false,
						isIcon: false,

					},
					{
						title: "福利区",
						isActive: false,
						isIcon: false
					},
					{
						title: "特价区",
						isActive: false,
						isIcon: false
					},
					{
						title: "套餐区",
						isActive: false,
						isIcon: false
					},
					{
						title: "糖水",
						isActive: false,
						isIcon: false
					},
					{
						title: "饮料",
						isActive: false,
						isIcon: false
					},
					{
						title: "调料味",
						isActive: false,
						isIcon: false
					}
				],
				lists: [{
						title: "推荐",
						list: [{
								image: "/static/mipmap-mdpi1/storeImage.png",
							},
							{
								image: "/static/mipmap-mdpi1/storeImage.png",
							}
						]
					},
					{
						title: "折扣商品",
						list: [{
								image: "/static/mipmap-mdpi1/storeImage.png",
							},
							{
								image: "/static/mipmap-mdpi1/storeImage.png",
							}
						]
					},
					{
						title: "福利区",
						list: [{
								image: "/static/mipmap-mdpi1/storeImage.png",
							},
							{
								image: "/static/mipmap-mdpi1/storeImage.png",
							}
						]
					},
					{
						title: "特价区",
						list: [{
								image: "/static/mipmap-mdpi1/storeImage.png",
							},
							{
								image: "/static/mipmap-mdpi1/storeImage.png",
							}
						]
					},
					{
						title: "套餐区",
						list: [{
								image: "/static/mipmap-mdpi1/storeImage.png",
							},
							{
								image: "/static/mipmap-mdpi1/storeImage.png",
							}
						]
					},
					{
						title: "糖水",
						list: [{
								image: "/static/mipmap-mdpi1/storeImage.png",
							},
							{
								image: "/static/mipmap-mdpi1/storeImage.png",
							}
						]
					},
					{
						title: "饮料",
						list: [{
								image: "/static/mipmap-mdpi1/storeImage.png",
							},
							{
								image: "/static/mipmap-mdpi1/storeImage.png",
							}
						]
					},
					{
						title: "调味料",
						list: [{
								image: "/static/mipmap-mdpi1/storeImage.png",
							},
							{
								image: "/static/mipmap-mdpi1/storeImage.png",
							}
						]
					}
				],

				// .v-lists
				scrollTop: 0,
				arrTop: [],
				lastTageTop: 0,

				// 商品详情
				goodsDetailsShow: false,
				goodList: 4,
				num: 1,
				num1: 1,
				num2:1,
				// 商品详情单
				goodsDetailsFromShow: false,
				addNum: true,
				// 店家页面 购物车页面
				storeCartState: false,
				storeCartList: [{
						name: "1号菜篮子",
						list: 2,
						isChecked: false,
					},
					{
						name: "2号菜篮子",
						list: 2,
						isChecked: false,
					}
				],
				checkedSet: false,
				// 评价 
				hotList: [{
						title: "全部",
						count: "999+",
						isActive: true,
					},
					{
						title: "最新",
						count: "",
						isActive: false
					},
					{
						title: "好评",
						count: "666",
						isActive: false
					},
					{
						title: "差评",
						count: 6,
						isActive: false
					},
					{
						title: "回头客",
						count: 99,
						isActive: false
					},
					{
						title: "回头购",
						count: 99,
						isActive: false
					},
					{
						title: "老板不错",
						count: 6,
						isActive: false
					},
					{
						title: "速度快",
						count: 99,
						isActive: false
					},
					{
						title: "好评",
						count: 666,
						isActive: false
					},
					{
						title: "差评",
						count: 6,
						isActive: false
					},
					{
						title: "回头客",
						count: 99,
						isActive: false
					},
					{
						title: "回头购",
						count: 99,
						isActive: false
					},
					{
						title: "好评",
						count: 666,
						isActive: false
					},
					{
						title: "差评",
						count: 6,
						isActive: false
					},
					{
						title: "回头客",
						count: 99,
						isActive: false
					},
					{
						title: "回头购",
						count: 99,
						isActive: false
					},
					{
						title: "老板不错",
						count: 6,
						isActive: false
					},
					{
						title: "速度快",
						count: 99,
						isActive: false
					},
					{
						title: "老板不错",
						count: 6,
						isActive: false
					},
					{
						title: "速度快",
						count: 99,
						isActive: false
					},
				],
				iconName: "arrow-up",
				text:"折叠",
				flag: false,
				hotListShow:"100",
				evaluatePeopleLists: [{
						isFollowUp: true
					},
					{
						isFollowUp: false
					},
					{
						isFollowUp: false
					}
				],
			}
		},
		onReady() {
			// 状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight

			// #ifdef MP-WEIXIN
			const custom = wx.getMenuButtonBoundingClientRect();
			this.Top = custom.top + (custom.height - 18) / 2;
			// #endif

		},
		mounted() {
			// 获取tage 到父元素的距离 
			if(this.current == 0){
				this.lastTageGap();
			}
		},
		components:{
			addsubBtns
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1,
				})
			},
			// 收藏
			star(){
				if(this.starIcon == 'star'){
					this.starIcon = "star-fill";
				}else{
					this.starIcon = "star";
				}
			},
			// 判断最后一个tage 高度是否大于 可是窗口
			lastTageGap() {
				console.log("this.scrollTop ==>",this.scrollTop);
				
				this.$nextTick(() =>{
				this.scrollTop = 0;
				this.titleLists.forEach(e =>{
					e.isActive = false;
				})
				this.titleLists[0].isActive = true;
				let indexList = [0, 1, 2, 3, 4, 5, 6, 7]
				this.arrTop = [];
				uni.createSelectorQuery().select(`.scrollview-box`).boundingClientRect(data1 => {
					indexList.forEach((e, index) => {
						uni.createSelectorQuery().select(`.item${index}`).boundingClientRect(data => {
							console.log("data ==>",data);
								this.arrTop.push(Math.ceil(data.top - data1.top));
							// 判断 scrollTop 是否为0
							// if(this.scrollTop == 0){
							// }else{
							// 	this.arrTop.push(this.scrollTop - data.top - data1.top);
							// }
						}).exec()
					})
				}).exec();
				
				uni.createSelectorQuery().select(`.scrollview-box`).boundingClientRect(data1 => {
					uni.createSelectorQuery().select(`.tage${this.lists.length - 1}`).boundingClientRect(data => {
						if (data.height >= data1.height) {
							this.lastTageTop = 0;
						} else {
							this.lastTageTop = data1.height - data.height - 20;
						}
					}).exec()
				}).exec()
				})
			},
			// 点击 滚动
			switchTitle(item, index) {
				this.titleLists.forEach(e => {
					e.isActive = false;
				})
				item.isActive = true;
				if (index == 0) {
					this.scrollTop = 0;
					return;
				}
				this.scrollTop = this.arrTop[index] - 10;
				// console.log(this.scrollTop)
				
				console.log("this.arrTop ==>",this.arrTop);
			},
			// 滚动监听
			scrollPage(e) {
				// console.log("e ==>",e.detail.scrollTop);

				let arrIndex = [];
				let index = "";
				for (let i = 0; i < this.arrTop.length; i++) {
					if (e.detail.scrollTop >= this.arrTop[i] - 20) {
						arrIndex.push(i);
					}
				}

				if (arrIndex.length == 0) {
					return;
				}

				this.titleLists.forEach(e => {
					e.isActive = false;
				})
				index = arrIndex.pop();
				this.titleLists[index].isActive = true;

			},
			// 切换到评价....
			clickTab(item) {
				console.log(item);
				this.current = item.index;
				console.log("this.current ==>",this.current);
				if (this.current == 0) {
					this.lastTageGap();
				} else if (this.current == 1) {

				} else {
					
				}
			},
			// 弹出 商品详情
			popupGoodsDetails() {
				this.goodsDetailsShow = true;
			},
			// 弹出 商品详情单
			openGoodsDetailsFrom() {
				this.num1 = 1;
				this.addNum = true;
			},
			// 购物车 全选
			Allset() {
				this.checkedSet = !this.checkedSet;
				this.storeCartList.forEach(e => {
					if (this.checkedSet) {
						e.isChecked = true;
					} else {
						e.isChecked = false;
					}
				})
			},
			// 购物车 单选 
			isAllSet(item) {
				item.isChecked = !item.isChecked;
				if (this.storeCartList.findIndex(target => target.isChecked == false) == -1) {
					this.checkedSet = true;
				} else {
					this.checkedSet = false;
				}
			},
			// 结算
			toSubmitOrder() {
				uni.navigateTo({
					url: "/pages_product/submitOrder/submitOrder"
				})
			},
			// 评价。。
			sethotComment(item) {
				this.hotList.forEach(e => {
					e.isActive = false;
				})
				item.isActive = true;
			},
			foldList() {
				if (this.flag) {
					this.iconName = "arrow-up";
					this.text = "折叠"
					this.flag = false;
					this.hotListShow = this.hotList.length;
				} else {
					this.iconName = "arrow-down";
					this.text = "收起"
					this.flag = true;
					this.hotListShow = 7;
				}
			},

		},
	}
</script>

<style lang="less">
	@import url("./shop.less");
</style>
