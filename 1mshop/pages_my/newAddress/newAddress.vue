<template>
	<view class="newAddress" :style="{minHeight:H - 10 + 'px'}">
		<u--form labelPosition="left">
			<u-form-item label="联系人" borderBottom>
				<u--input placeholder="名字" border="none"></u--input>
				<text slot="right" class="phone-text">+ 通讯录</text>
			</u-form-item>
			<u-form-item label="手机号码" borderBottom>
				<u--input placeholder="手机号" border="none"></u--input>
				<!-- <text slot="right">+86</text> -->
				<view slot="right" class="phone">
					<text>+86</text>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</u-form-item>
			<u-form-item label="选择地区" borderBottom @click="showAddress = true">
				<!-- <u--input placeholder="省、市、区、街道" border="none"></u--input> -->
				<text class="text">省、市、区、街道</text>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item label="详细地址">
				<u--input placeholder="街道、楼牌号等" border="none"></u--input>
				<view class="map" @click="getLocation()">
					<!-- <image src="/static/mipmap-mdpi/map-h.png" mode=""></image> -->
					<text>定位</text>
				</view>
			</u-form-item>
		</u--form>
		<view class="default">
			<view class="text">
				设为默认地址
			</view>
			<view class="set">
				<u-switch v-model="isDefault" size="41" activeColor="#F8CF39"></u-switch>
			</view>
		</view>
		<view class="btn" v-show="id == 0">
			<u-button text="删除地址" class="deleteBtn" color="#F24849"></u-button>
			<u-button text="保存地址" class="saveBtn" color="#F8CF39"></u-button>
		</view>
		<view class="btn" v-show="id == 1">
			<u-button text="保存地址" class="saveBtn" color="#F8CF39"></u-button>
		</view>
		<!-- 地址 -->
		<u-picker keyName="name" itemHeight="80" :show="showAddress" ref="uPicker" :columns="columns" confirmColor="#f8cf39" @cancel="showAddress = false"
			@confirm="confirm" @change="changeHandler" :defaultIndex="defaultarr"></u-picker>
	</view>
</template>

<script>
	// import mapBox from "@/component/map/map.vue"

	import province from "./js/province.json"
	import city from "./js/city.json"
	import area from "./js/area.json"


	export default {
		// name:"map-box",
		data() {
			return {
				H: "",
				id: "",
				isDefault: false,
				showAddress: false,

				defaultarr: [0, 0, 0],
				columns: [],
				city: city,
				area: area,

				// 000
				amapPlugin: null,
				gaodekey: 'eaa51853a19839af9b9b2339c569f0df',
				address: "", // 已经获取到的位置
			}
		},
		onReady() {
			// #ifdef APP-PLUS || H5
			this.H = uni.getSystemInfoSync().windowHeight;
			// #endif

		},
		onLoad(option) {
			this.columns.push(province);
			this.columns.push(this.city[1]);
			this.columns.push(this.area[72]);
			this.id = option.id;
			console.log(this.id);
			if (this.id == 0) {
				uni.setNavigationBarTitle({
					title: '地址修改'
				})
			} else {
				uni.setNavigationBarTitle({
					title: '新增地址'
				})
			}
			// console.log("this.province ==>", this.columns);
			// console.log("this.city ==>", this.city);
			// console.log("this.area ==>", this.area);

		},
		methods: {
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
			changeHandler(e) {
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					indexs,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e

				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					// picker为选择器this实例，变化第二列对应的选项
					// 注释 获取城市要有下标 
					// 而 一个对象的字符串 例:const aa ="1":[{name:"222"}] 
					// 获取需要 aaa["1"]对应 所以需要下面这样写
					// console.log(this.city[value[0].code][indexs[1]].code)
					// console.log(this.city[value[0].code][indexs[1]].code)
					picker.setColumnValues(1, this.city[value[0].id])
					console.log(this.city[value[0]]);
					picker.setColumnValues(2, this.area[this.city[e.value[0].id][0].id])
				}
				if (columnIndex === 1) {

					console.log("indexs ==>", indexs);
					console.log(this.area[this.city[value[0].id][0].id])

					picker.setColumnValues(2, this.area[this.city[value[0].id][indexs[1]].id])
				}
			},
		},
	}
</script>

<style lang="less">
	@import url("./newAddress.less");
</style>
