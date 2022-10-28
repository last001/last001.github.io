<template>
	<view>
		<view class="wrap">
			<!-- 商品列表 -->
			<view class="main">
				<view class="menu-left">
					<scroll-view scroll-y :style="'height:' + clenHeight+'px;'">
						<view :class="active===index?'active':''" v-for="(item,index) in showProductTypeList"
							:key="index" @click="productTypeTap(item, index)">
							{{item.Name}}
						</view>
					</scroll-view>
				</view>
				<view class="menu-right">
					<view>
						<!-- @scrolltolower  是滚动到右边底部触发 -->
						<scroll-view @scrolltolower="onScrollLower" scroll-y :style="'height:' + clenHeight+'px;'">
							<!-- 第一个view -->
							<view class="item">
								<view class="item-tit" id="curType.Id">
									<text>{{curType.Name}}</text>
									<view class="search">
										<view class="input-wrap">
											<icon type="search" size="12"></icon>
											<input class="tit" placeholder="搜索商品名称" @blur="bindSearchInput"
												maxlength="10"></input>
											<!-- @blur 是收起键盘触发 -->
										</view>
									</view>
									<!-- <checkbox-group>
										<label>
											<checkbox value="cb" />全选
										</label>
									</checkbox-group> -->
									<checkbox-group @change="handler" data-command="checkAll">
										<checkbox :checked="entity.isCheckAll" style="zoom: 0.7;">
											<text style="font-size: 30rpx;">全选</text>
										</checkbox>
									</checkbox-group>
								</view>
								<!-- 循环项 -->
								<checkbox-group @change="checkboxChangea">
									<label v-for="item in entityList" :key="item.value"
										style="display: flex;border-bottom: 1px solid #ccc;padding: 30rpx 0rpx;">
										<view @click="detail(item)" style="width: 20%;margin-left: 2%;">
											<image :src="item.Picture" mode="widthFix" style="width: 120rpx;">
											</image>
										</view>

										<view @click="detail(item)"
											style="display: flex;flex-direction: column;justify-content: space-between;width: 33%;margin-left: 3%; ">
											<view style="font-size: 30rpx;">{{item.Name}}</view>
											<view style="font-size: 20rpx;color: #c83c30;">{{item.SalePrice}}</view>
										</view>

										<view style="margin-top: 10rpx;width: 18%;">
											<view style="margin-bottom: 40rpx;"
												:style="{color: item.Status == '1' ? '#42c700':'#ff2e4d'}">
												{{item.Status == '1' ? '上架中':'已下架'}}
											</view>
											<switch :data-entity="item" :checked="item.Status=='1'"
												@change="switchChange"></switch>
										</view>

										<view
											style="display: flex;flex-direction: column;justify-content: space-between;margin-left: 16rpx;width: 7%;">
											<image src="../../static/image/bottom.png" mode="widthFix"
												style="width: 38rpx;"></image>
											<image src="../../static/image/top.png" mode="widthFix"
												style="width: 38rpx;"></image>
										</view>

										<view style="margin-top: 50rpx;margin-left: 10rpx;width: 7%;">
											<checkbox style="transform:scale(0.8)" :value="item.value"
												:checked="item.checked" />
										</view>

									</label>
								</checkbox-group>

							</view>
							<view style="font-size:28rpx;color:#999;text-align:center;padding:20rpx;"
								v-if="showAllText">已显示全部</view>
							<view style="font-size:28rpx;color:#999;text-align:center;padding:20rpx;"
								v-if="!showAllText">下拉加载更多...</view>
						</scroll-view>

					</view>
				</view>
			</view>
		</view>
		<view class="add-product">
			<view v-if="!entity.isbatch" class="func">
				<view class="icon-btn" @click="toAddProduct">
					<image src="../../static/image/adds.png" mode="widthFix" style="width: 30rpx;"></image>
				</view>
				<text>添加商品</text>
			</view>
			<view v-if="!entity.isbatch" class="func">
				<view class="icon-btn" @click="toAddProductSpecGroup">
					<image src="../../static/image/adds.png" mode="widthFix" style="width: 30rpx;"></image>
				</view>
				<text>规格组管理</text>
			</view>
			<view v-if="!entity.isbatch" class="func">
				<view class="icon-btn" @click="toAddProductType">
					<image src="../../static/image/adds.png" mode="widthFix" style="width: 30rpx;"></image>
				</view>
				<text>分类管理</text>
			</view>
			<view v-if="!entity.isbatch" class="func">
				<view class="icon-btn" @click="salesStatistics">
					<image src="../../static/image/adds.png" mode="widthFix" style="width: 30rpx;"></image>
				</view>
				<text>销售数统计</text>
			</view>
			<view v-if="entity.isbatch" bindtap="handler" data-command="ActionSheet" class="plcza">批量操作</view>
		</view>


	</view>
</template>

<script>
	const util = require('@/utils/utils.js');
	const app = require('@/utils/app.js');
	import {
		$http,
		$get,
		$post
	} from '@/utils/api.js';
	export default {
		data() {
			return {
				checked: false,
				checkeds: true,
				searchValue: '',

				entity: {
					isCheckAll: false,
					isbatch: false,
					tapIndex: 0,
					choseIndex: 0,
					showBatch: false,
					ProductSpecGroupList: [],
					giveOrTake: [{
							text: "上架",
							Status: "1"
						},
						{
							text: "下架",
							Status: "0"
						}
					],
					salesType: [{
						Id: 'all',
						Name: '不限'
					}, {
						Id: 'takeout',
						Name: '限外卖'
					}, {
						Id: 'instore',
						Name: '限堂食'
					}],
				},
				searchKey: '',
				showAllText: false,
				curType: [],
				curTypeId: '', //当前选择的商品分类
				curSubTypeId: '',
				// 选中
				beSel: 0,
				active: 0,
				// view跳到顶部
				toTop: 'i0',
				menus: [],
				showProductTypeList: [],
				productTypeList: [],
				productList: [],
				curEditProduct: [],
				// 选中高亮
				out: null,
				in: 0,
				loading: false, // "上拉加载"的变量，默认false，隐藏  
				loadingComplete: false, //“没有数据”的变量，默认false，隐藏 
				entityList: [], //商品分页列表数据
				showSubMenu: [], //当前二级分类列表
				labeltap: -1, //二级显示标签
				pageIndex: 1,
				pageSize: 100,
				pageCount: 1,
				rowCount: 0,

				clenHeight: 0

			}
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					this.clenHeight = res.windowHeight - this.getClientHeight();
				}
			})
		},
		onLoad: function(options) {
			this.getClientHeight(); //获取高度
			this.getProductTypeListByShop();
			// this.getProductSpecGroupList()
		},
		onShow: function() {
			this.menus = [];
			this.rebind();
		},
		methods: {
			//详情
			detail(item) {
				console.log(item);
				uni.setStorageSync('commodity-detail', item)
				uni.navigateTo({
					url: '/pages/commodity-detail/commodity-detail'
				})
			},
			// 按指定排序查询指定商户、指定商品分类下的商品列表
			getManageProductPageBySearch: function(searchKey, productTypeId, shopId, sortType, pageIndex, pageSize) {
				let that = this;
				var reg = /\&#.*?;/g;
				let curEntityList = that.entityList;
				that.loading = true;
				if (uni.showLoading) {
					uni.showLoading({
						title: '努力加载中...',
					})
				} else {
					uni.showNavigationBarLoading();
				}

				let interface_code = 'getManageProductPageBySearch';
				let interface_parameters = util.obj2str([searchKey, productTypeId, shopId, sortType, pageIndex,
					pageSize
				]);
				$post('/oauth2/resources', {
					interface_code,
					interface_parameters
				}).then(data => {
					console.log(data);
					if (data && data.RetCode == "000000") {
						if (pageIndex == data.Result.PageCount) {
							that.showAllText = true;
						}
						if (data.Result && data.Result.EntityList && data.Result.EntityList.length > 0) {
							that.pageCount = data.Result.PageCount;
							that.rowCount = data.Result.RowCount;
							for (var i = 0; i < data.Result.EntityList.length; i++) {
								data.Result.EntityList[i].checked = false
								if (data.Result.EntityList[i].Picture) {
									data.Result.EntityList[i].Picture = app.resource_endpoint +
										"?interface_code=getImage&access_token=" + app
										.access_token + "&imgurl=" + data.Result.EntityList[i].Picture +
										"&w=150&h=150";
								}
								data.Result.EntityList[i]["DiscountPrice"] = Math.round(data.Result.EntityList[
									i].SalePrice * data.Result.EntityList[i].Discount * 10) / 10;
							}
						}
						that.loadingComplete = false;
						if (data.Result.PageCount == data.Result.PageIndex) {
							that.loadingComplete = true;
							that.loading = false;
						}
						curEntityList = curEntityList.concat(data.Result.EntityList);
						for (var k in curEntityList) {
							var H, L, Code
							curEntityList[k].Name = curEntityList[k].Name.replace(reg, function(data) {
								if (data.length == 9) {
									Code = parseInt(data.match(/[0-9]+/g));
									H = Math.floor((Code - 0x10000) / 0x400) + 0xD800;
									L = (Code - 0x10000) % 0x400 + 0xDC00;
									return unescape("%u" + H.toString(16) + "%u" + L.toString(16));
								};
							})
						}
						that.entityList = curEntityList;
						console.log(that.entityList);
					} else {
						console.error(data.Detail);
					}
					//隐藏加载提示
					if (uni.hideLoading) {
						uni.hideLoading()
					} else {
						uni.hideNavigationBarLoading();
					};
				})
			},
			// 获取可视化高度
			getClientHeight() {
				const res = uni.getSystemInfoSync();
				const system = res.platform;
				if (system === 'ios') {
					return 44 + res.statusBarHeight;
				} else if (system === 'android') {
					return 48 + res.statusBarHeight;
				} else {
					return 0;
				}
			},
			checkboxChangea: function(e) {
				// var items = this.items,
				// 	values = e.detail.value;
				// console.log(items, values);
				// for (var i = 0, lenI = items.length; i < lenI; ++i) {
				// 	const item = items[i]
				// 	if (values.includes(item.value)) {
				// 		this.$set(item, 'checked', true)
				// 	} else {
				// 		this.$set(item, 'checked', false)
				// 	}
				// }
			},

			// 选中类跳到顶部
			productTypeTap: function(item, index) {
				console.log(item, index);
				let that = this;
				that.in = 0,
					that.toTop = 'i0',
					that.curTypeId = item.Id,
					that.curType = item,
					that.labeltap = -1, //二级默认不选中
					that.curSubTypeId = '',
					that.active = index,
					that.rebind();
			},
			// 二级分类
			labelTap: function(e) {
				let tab = e.currentTarget.dataset.labeltap; //下标
				let subMenu = e.currentTarget.dataset.submenu; //二级分类对象
				this.labeltap = tab, //二级选中
					this.curSubTypeId = subMenu.Id //二级分类对象id
				this.rebind();
			},
			bindSearchInput: function(e) {
				let searchKey = e.detail.value;
				this.searchKey = searchKey;
				this.rebind();
			},
			//添加商品分类
			toAddProductType: function(e) {
				// uni.navigateTo({
				// 	url: "../productSort/productSort?openMode=add"
				// })
			},
			salesStatistics: function(e) {
				let myShopPage = util.getPageByCode("myshop");
				let shopObj = myShopPage.curShop;
				if (myShopPage) {
					// uni.navigateTo({
					// 	url: "/pages/shop/productSellNumber/productSellNumber?ShopId=" + shopObj.Id
					// })
				}
			},
			//添加商品规格组
			toAddProductSpecGroup: function(e) {
				uni.navigateTo({
					url: "../productSpecGroupSort/productSpecGroupSort?openMode=add"
				})
			},
			//添加商品
			toAddProduct: function(e) {
				// uni.navigateTo({
				// 	url: "../addProducts/addProducts?openMode=add"
				// })
			},
			//编辑商品
			toEditProduct: function(e) {
				var that = this;
				let index = e.currentTarget.dataset.index;
				that.in = index;
				let entity = e.currentTarget.dataset.entity;
				that.curEditProduct = entity;
				that.curEditProduct.ProductSpecList = that.curEditProduct.ProductSpecList.sort((a, b) => {
					return a.SerialNo - b.SerialNo
				});
				// uni.navigateTo({
				// 	url: "../addProducts/addProducts?openMode=edit&productId=" + entity.Id
				// })
				console.log("可以跳转");
			},

			//快速上下架
			switchChange: function(e) {
				let that = this;
				console.log(e);
				var entity = e.currentTarget.dataset.entity
				entity.Status = e.detail.value ? "1" : "0";
				let updateFields = ['Status'];
				that.updateProduct(entity, updateFields);
				let entityList = that.entityList;
				for (let i = 0; i < entityList.length; i++) {
					if (entityList[i]["Id"] == entity.Id) {
						entityList[i]["Status"] = entity.Status;
					}
				}
				that.entityList = entityList;

			},
			updateProduct: function(entity, updateFields) {
				let that = this;
				let interface_parameters = util.obj2str([entity, updateFields]);
				let interface_code = "updateProduct";

				$post('/oauth2/resources', {
					interface_code,
					interface_parameters
				}).then(data => {
					console.log(data);
					if (data.RetCode == "000000") {
						uni.showToast({
							title: '操作成功',
							icon: 'success',
							duration: 1000
						})
					} else {
						uni.showModal({
							title: '操作失败',
							content: data.Result
						})
					}
				})
			},

			bindData: function() {
				let that = this;
				let tab = that.tab;
				let sortType = "all";
				let productTypeId = that.curTypeId;
				if (that.curSubTypeId && that.curSubTypeId.length > 0) {
					productTypeId = that.curSubTypeId;
				}
				var shopId = uni.getStorageSync('shopId')
				if (shopId) {
					that.getManageProductPageBySearch(that.searchKey, productTypeId, shopId, sortType, that.pageIndex,
						that.pageSize)
				}
			},

			onPullDownRefresh: function(e) {
				this.pageIndex = 1;
				this.entityList = [];
				// this.bindData();
				uni.stopPullDownRefresh();
			},
			onScrollLower: function(e) {
				var that = this;
				if (that.pageIndex == that.pageCount) {
					that.showAllText = true
				}
				that.pageIndex++;
				that.bindData();
			},
			rebind: function() { //返回时回调方法
				var that = this;
				that.pageIndex = 1;
				that.entityList = [];
				that.showAllText = false;
				that.entity.isbatch = false;
				that.bindData();
			},


			//搜索
			search: function(e) {
				let searchKey = e.detail.value;
				console.log(searchKey, "000000000000");
				this.searchKey = searchKey;
				this.rebind();
			},
			input(res) {
				console.log('监听搜索值的变化:', res)
			},
			clears(res) {
				console.log("清除搜索值：" + res.value);
			},

			handler: function(e) {
				var command = e.currentTarget.dataset.command;
				var that = this;
				switch (command) {
					case "confirm":
						var fooName = ""
						var ListId = null;
						var index = that.entity.choseIndex
						ListId = that.entityList.filter(item => {
							return item.checked == true;
						}).map(item => {
							return item.Id
						})
						if (that.entity.tapIndex == 0) {
							app.invoke("batchUpdataProductCategory", [ListId, that.productTypeList[index].Id],
								function(data) {
									console.log(that.productTypeList[index].Id);
									if (data.RetCode == "000000") {
										uni.showModal({
											content: "批量修改分类成功",
											showCancel: false
										})
									}
								})

						} else if (that.entity.tapIndex == 1) {
							//上下架
							fooName = "batchUpdataProductStatus"
							app.invoke(fooName, [ListId, that.entity.giveOrTake[index].Status], function(data) {
								if (data.RetCode == "000000") {
									uni.showModal({
										content: "批量修改上下架成功",
										showCancel: false
									})
								}
							})
						} else if (that.entity.tapIndex == 2) {
							//规格
							fooName = "batchUpdataProductSpecGroup";
							var specificationIdList = that.entity.ProductSpecGroupList.filter(item => {
								return item.checked == true;
							}).map(item => {
								return item.Id
							})
							app.invoke(fooName, [ListId, specificationIdList], function(data) {
								console.log(data);
								if (data.RetCode == "000000") {
									uni.showModal({
										content: "批量修改规格组成功",
										showCancel: false
									})
								} else {
									uni.showModal({
										content: "批量修改规格组失败,请检查规格组是否有规格",
										showCancel: false
									})
								}
							})
						} else if (that.entity.tapIndex == 3) {
							//销售方式
							fooName = "batchUpdataProductSalesType"
							app.invoke(fooName, [ListId, that.entity.salesType[index].Id], function(data) {
								console.log(data);
								if (data.RetCode == "000000") {
									uni.showModal({
										content: "批量修改销售方式成功",
										showCancel: false
									})
								}
							})
						}

						that.rebind()

					case "MultipleChoice":
						that.entity.ProductSpecGroupList.forEach(item => {
							item.checked = false;
							e.detail.value.forEach(value => {
								if (item.Id == value) {
									item.checked = true;
								}
							})
						})

					case "classify":
						that.entity.choseIndex = e.detail.value;

					case "inputText":
						that.entity.choseIndex = e.detail.value;

					case "close":
						that.entity.showBatch = false;
						that.entity.choseIndex = 0

					case "checkAll":
						that.entity.isCheckAll = !that.entity.isCheckAll
						if (that.entity.isCheckAll) {
							that.entityList.forEach(item => {
								item.checked = true
							})
						} else {
							that.entityList.forEach(item => {
								item.checked = false
							})
						}
						var isbatch = that.entityList.some(item => {
							return item.checked == true;
						})
						if (isbatch) {
							that.entity.isbatch = true;
						} else {
							that.entity.isbatch = false;
						}

						case "check":
							that.entityList.forEach(item => {
								item.checked = false;
								e.detail.value.forEach(value => {
									if (item.Id == value) {
										item.checked = true;
									}
								})
							})
							var isbatch = that.entityList.some(item => {
								return item.checked == true;
							})
							if (isbatch) {
								that.entity.isbatch = true;
							} else {
								that.entity.isbatch = false;
							}
							var isTrue = that.entityList.every(item => {
								return item.checked === true
							})
							if (isTrue) {
								that.entity.isCheckAll = 1;
							} else {
								that.entity.isCheckAll = 0
							}

							case "ActionSheet":
								uni.showActionSheet({
									itemList: ['修改分类', '选择上下架', '修改规格', '修改销售方式', '删除商品'],
									success(res) {
										that.entity.showBatch = true;
										that.entity.tapIndex = res.tapIndex
										that.setData({
											entity: that.entity,
										})
										if (res.tapIndex == 4) {
											uni.showModal({
												title: "警告",
												content: "确定要删除选中的商品？",
												success(res) {
													if (res.confirm) {
														ListId = that.entityList.filter(item => {
															return item.checked == true;
														}).map(item => {
															return item.Id
														});
														app.invoke("batchDeleteProduct", [ListId],
															function(
																data) {
																if (data.RetCode == "000000") {
																	util.showMessage("批量删除成功!",
																		null,
																		function() {
																			that.rebind()
																		})
																}
															})
													}
												}
											})
										}
									},
									fail(res) {

									}
								})
				}
			},

			//获取规格组列表
			getProductSpecGroupList: function() {
				let that = this;
				let myShopPage = util.getPageByCode("myshop");
				if (myShopPage) {
					let shopObj = myShopPage.curShop
					let interface_code = 'getProductSpecGroupList';
					let interface_parameters = util.obj2str([shopObj.Id]);
					$post('/oauth2/resources', {
						interface_code,
						interface_parameters
					}).then(data => {
						console.log(data);
						if (data.RetCode = "000000" && data.Result.length > 0) {
							data.Result.forEach(item => {
								item.checked = false;
							})
							that.entity.ProductSpecGroupList = data.Result
						}
					})
				}
			},
			// 排序
			swapItems: function(arr, index1, index2) {
				arr[index1] = arr.splice(index2, 1, arr[index1])[0];
				return arr;
			},
			up: function(e) {
				var that = this;
				//let myout=e.currentTarget.dataset.myout;
				let index = e.currentTarget.dataset.myin;
				let menus = that.entityList; //list[myout].ProductList;
				if (index == 0) {
					return
				}
				that.swapItems(menus, index, index - 1);
				let obj = [];
				for (let i = 0; i < menus.length; i++) {
					let e = {
						Id: "",
						SerialNo: 0
					};
					e.Id = menus[i].Id;
					e.SerialNo = i;
					obj.push(e);
				}
				obj = util.obj2str(obj);
				console.log(obj);

				let interface_code = 'updateProductSortForApp';
				let interface_parameters = obj;
				$post('/resources', {
					interface_code,
					interface_parameters
				}).then(data => {
					console.log(data);
					that.entityList = menus;
					that.in = index - 1
				})

			},
			down: function(e) {
				var that = this;
				let index = e.currentTarget.dataset.myin;
				let menus = that.entityList;
				if (index == menus.length - 1) {
					return
				}
				that.swapItems(menus, index, index + 1);
				let obj = [];
				for (let i = 0; i < menus.length; i++) {
					let e = {
						Id: "",
						SerialNo: 0
					};
					e.Id = menus[i].Id;
					e.SerialNo = i;
					obj.push(e);
				}
				obj = util.obj2str(obj);
				console.log(obj);
				let interface_code = 'updateProductSortForApp';
				let interface_parameters = obj;
				$post('/resources', {
					interface_code,
					interface_parameters
				}).then(data => {
					console.log(data);
					that.entityList = menus,
						that.in = index + 1
				})

			},
			//获取商品分类列表
			getProductTypeListByShop: function() {
				let that = this;
				var shopId = uni.getStorageSync('shopId')
				console.log(shopId);
				if (shopId) {
					let interface_code = 'getProductTypeListByShop';
					let interface_parameters = util.obj2str([shopId]);
					$post('/oauth2/resources', {
						interface_code,
						interface_parameters
					}).then(data => {
						console.log(data);
						let showProductTypeList = [];
						var reg = /\&#.*?;/g;
						showProductTypeList.push({
							Id: '',
							Name: '全部商品'
						});
						for (let i = 0; i < data.Result.length; i++) {
							showProductTypeList.push(data.Result[i]);
						}
						for (var j in showProductTypeList) {
							var H, L, Code
							showProductTypeList[j].Name = showProductTypeList[j].Name.replace(reg, function(
								data) {
								if (data.length == 9) {
									Code = parseInt(data.match(/[0-9]+/g));
									H = Math.floor((Code - 0x10000) / 0x400) + 0xD800;
									L = (Code - 0x10000) % 0x400 + 0xDC00;
									return unescape("%u" + H.toString(16) + "%u" + L.toString(16));
								};
							})

						}
						that.productTypeList = data.Result;
						that.showProductTypeList = showProductTypeList;
						console.log(that.showProductTypeList, that.productTypeList);
						if (showProductTypeList && showProductTypeList.length > 0) {
							that.curTypeId = showProductTypeList[0].Id;
							that.curType = showProductTypeList[0];
						};
						// that.rebind();
					})
				}
			}
		},

	}
</script>


<style lang="less" scoped>
	@import url('@/pages/commodity-management/commodity-management.css');
</style>
