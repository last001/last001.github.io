<template>
	
	<view class="address" :style="{minHeight:H - 10 + 'px'}">
		<view class="address-list" v-for="(item,index) in lists" :key="index">
			<view class="name-phone">
				<view class="name">
					联系人：{{item.name}}
				</view>
				<view class="phone">
					{{item.phone}}
				</view>
			</view>
			<view class="v-address">
				{{item.address}}
			</view>
			<view class="handle">
				<view class="address-text">
					<u-checkbox-group>
						<u-checkbox :customStyle="{marginRight: '8px'}" :label="item.label" shape="circle" size="30" labelSize="28" :labelColor="item.isActive ? '#F8CF39' : ''" :iconColor="item.isActive ? '#FFF' : ''" :activeColor="item.isActive ? '#F8CF39' : ''" :checked="item.isActive" @change="checkboxChange(item)" />
					</u-checkbox-group>
				</view>
				<view class="edit-delete">
					<view class="edit"  @click="toNewAddress(0)">
						<image src="/static/mipmap-mdpi1/editAddress.png" mode=""></image>
						<text>编辑</text>
					</view>
					<view class="delete">
						<image src="/static/mipmap-mdpi1/delate.png" mode=""></image>
						<text>删除</text>
					</view>
				</view>
			</view>
		</view>
		<view class="btn">
			<u-button text="添加新地址" color="#F8CF39" @click="toNewAddress(1)" ></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				H:"",
				lists:[
					{
						name:"小牛顿",
						phone:"12345678912",
						address:"广东省广州市白云区景泰新街",
						isActive:true,
						label:"默认地址"
					},
					{
						name:"小牛顿",
						phone:"12345678912",
						address:"广东省广州市白云区景泰新街",
						isActive:false,
						label:"设为默认地址"
					}
				]
			}
		},
		onReady() {
			// #ifdef APP-PLUS || H5
			this.H = uni.getSystemInfoSync().windowHeight;
			// #endif
		},
		methods: {
			checkboxChange(item) {
				this.lists.forEach((e) =>{
					e.isActive = false;
					e.label = "设为默认地址";
				})
				item.isActive = true;
				item.label = "默认地址";
			},
			toNewAddress(id){
				uni.navigateTo({url:"/pages_my/newAddress/newAddress?id=" + id})
			}
		}
	}
</script>

<style lang="less">
	@import url("./address.less");
</style>
