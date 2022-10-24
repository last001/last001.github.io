<template>
	<view class="staff">
		<view class="titleList flex-center-cs-r">
			<view class="title" v-for="(item,index) in titleList" :key="index">
				{{item}}
			</view>
		</view>
		<view class="table">
			<view class="tableList flex-center-cs-r" v-for="(item,index) in tableList" :key="index">
				<view class="user">{{item.user}}{{index + 1}}</view>
				<view class="name">{{item.name}}{{index + 1}}</view>
				<view class="job">{{item.job}}{{index + 1}}</view>
				<view class="edit">
					<view class="">
						<u-icon @click="toStaffEdit" name="edit-pen" color="#02b6bf" size="32"></u-icon>
					</view>
					<view class="">
						<u-icon @click="deleteShow = !deleteShow" name="trash" color="#f8cf39" size="32"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="btn">
			<u-button size="default" hover-class="none">添加新店员</u-button>
		</view>
		<!-- 弹窗 -->
		<u-modal v-model="deleteShow" cancel-color="#333" confirm-color="#FB2626" :show-cancel-button="true" title="删除确认" :title-style="{fontWeight: 'bold',fontSize: '18px'}" content="确定删除当前所选店员吗？" :content-style="{color:'#666'}" confirm-text="删除" ></u-modal>
	</view>
</template>

<script>
	export default {
		name:"staff",
		data() {
			return {
				titleList:['账号',"名字","职务","管理"],
				tableList:[
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
					{user:"hallo",name:"wifh",job:"店长"},
				],
				
				deleteShow:false,
			}
		},
		methods:{
			toStaffEdit(){
				console.log(12312);
				uni.navigateTo({
					url:"/pages_func/staff/staffEdit/staffEdit"
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("./staff.less");
</style>
