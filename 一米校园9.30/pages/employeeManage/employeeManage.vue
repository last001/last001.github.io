<template>
	<view>
		<view class="w-full ds-fx fw-nw">
		<view class="ds-fx  ai-c p-20 w-70pc jc-sb bold" style="border-bottom: 1px solid #efeff5;font-size: 35rpx;">
			<view class="">账号</view>
			<view class="">名字</view>
			<view class="">职务</view>
		</view>
		<view class="w-25pc ds-fx jc-c ai-c" @click="addManager">新建</view>
		</view>
		<view class="ds-fx  ai-c p-20 w-70pc jc-sb"  v-for="(item,index) in employeeList"  @click="updateManager" :data-entity="item" style="border-bottom: 1px solid #efeff5;font-size: 30rpx;">
			
			<view class="">{{item.Account}}</view>
			<view class="">{{item.FullName}}</view>
			<view class="">{{item.PostName}}</view>
		</view>
	</view>

</template>

<script>
	const util = require('@/utils/utils.js');
	const app = require('@/utils/app.js')
	import {
		$http,
		$get,
		$post
	} from '@/utils/api.js';
	import {
		obj2str
	} from '@/utils/utils.js';
	export default {
		data() {
			return {
				employeeList: [],
				ShopId:''
			}
		},
		onLoad(options) {
			var that = this
			if (options && options.ShopId) {
				that.ShopId = options.ShopId;
				that.getShopUserList(options.ShopId)
			}
		},
		methods: {
			addManager(){
				var that = this
				uni.navigateTo({
					url: "/pages/addManager/addManager?ShopId=" + that.ShopId
				})
			},
			updateManager(e){
				var that = this
				var str = JSON.stringify(e.currentTarget.dataset.entity)
				uni.navigateTo({
					url: "/pages/addManager/addManager?ShopId=" + that.ShopId + "&entity=" + encodeURIComponent(str)
				})
			},
			getShopUserList(ShopId) {
				var that = this
				let interface_code = 'getShopUserList';
				let interface_parameters = obj2str([ShopId]);
				$post('/oauth2/resources', {
					interface_code,
					interface_parameters
				}).then(data => {
					if (data.RetCode == '000000' && data.Result) {
						that.employeeList = data.Result
					} else {
						wx.showModal({
							title: '获取商家的员工列表失败',
							content: data.Result
						})
					}
				})



			}
		}
	}
</script>

<style>
	@import url('../../ym.css');
</style>
