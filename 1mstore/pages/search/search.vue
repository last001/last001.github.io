<template>
	<view class="search">
		<view class="inp">
			<u-field v-model="inputVal" label="搜索商品" placeholder="搜索商品名称" placeholderStyle="color:#EAEAEA" right-icon="search" :field-style="{color:'#999'}" icon-color="#f8cf39" :focus="true" :border-bottom="false"></u-field>
		</view>
		<view class="lately">
			<view class="title">最近搜索</view>
			<view class="lists" >
				<view class="list" v-for="(item,index) in latelyList" :key="index" :class="item.isActive ? 'active' : '' ">
					{{item.text}}{{index+1}}
				</view>
			</view>
			<!-- delete -->
			<view class="icon">
				<u-icon name="trash" color="#999" size="36"></u-icon>
			</view>
		</view>
		<view class="hotSearch">
			<view class="title">最近搜索</view>
			<view class="lists">
				<view class="list" v-for="(item,index) in hotList" :key="index" :class="item.isActive ? 'active' : '' ">
					{{item.text}}{{index+1}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputVal:"",
				latelyList:[
					{text:"超值套餐",isActive:true},
					{text:"超值套餐",isActive:true},
					{text:"超值套餐",isActive:true}
				],
				hotList:[
					{text:"超值套餐",isActive:true},
					{text:"超值套餐",isActive:true},
					{text:"超值套餐",isActive:false},
					{text:"超值套餐",isActive:false},
					{text:"超值套餐",isActive:false}
				]
			}
		},
		onLoad(){
			uni.setNavigationBarTitle({
				title: '新的标题'
			});
		},
		methods:{
			
		}
	}
</script>

<style lang="less">
	@import url("./search.less");
</style>
