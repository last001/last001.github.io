<template>
	<view class="printer">
		<view class="title">
			<view class="v-title flex-center-cs-r" v-for="(item,index) in titleList" :key="index"
				:class="item.isActive ? 'active' : ''" @click="switchTitle(titleList,item,index)">
				{{item.name}}
			</view>
		</view>
		
		<!-- WIFI list -->
		<view class="printerList" v-show="current == 0">
			<view class="printerText">
				<view class="v-printerText">打印列表</view>
			</view>
			<view class="" v-for="(item,index) in wifiList">
				{{item}}
			</view>
			<view class="list flex-l-r" v-for="(item,index) in printerList" :key="index">
				<view class="radio-online">
					<view class="radio">
						<u-radio-group v-model="radioVal">
							<u-radio @change="radioChange" label-size="32" active-color="#F8CF39" :name="item.name">
								{{item.name}}
							</u-radio>
						</u-radio-group>
					</view>
					<view class="online" :class="item.isOnline ? 'active' : ''"
						v-text="item.isOnline ? '[在线]' : '[离线]'"></view>
				</view>
				<view class="btns">
					<view class="edit flex-center-cs-r">
						<u-icon name="edit-pen" color="#999" size="28"></u-icon>
						<view class="text">编辑</view>
					</view>
					<view class="delete flex-center-cs-r">
						<u-icon name="trash" color="#999" size="28"></u-icon>
						<view class="text">删除</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 蓝牙打印机 -->
		<view class="bluetooth" v-show="current == 1">
			<view class="switch">
				<view class="v-switch flex-l-r">
					<view class="text">
						附近的蓝牙设备
					</view>
					<view class="openClose flex-center-cs-r">
						<text>开启/关闭蓝牙</text>
						<u-switch v-model="isSwitch" inactive-color="#fdfdfd" active-color="#f8cf39" size="30" @change="openBluetoothAdapter"></u-switch>
					</view>
				</view>
			</view>
			<view class="device" v-show="isSwitch">
				<view class="text">
					可用设备
				</view>
				<view class="deviceList">
					<view class="v-deviceList" v-for="(item,index) in devices" :key="index">
						<view class="image">
							<!-- <image src="../../static/image/business_h.png" mode=""></image> -->
						</view>
						<!-- 名字 -->
						<view class="name">
							{{item.name}}
						</view>
						<!-- 连接状态 -->
						<view class="state" @click="!item.isShowConnect && createBLEConnection(item)" v-text="item.isShowConnect ? '已连接' : '连接设备'"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const LAST_CONNECTED_DEVICE = 'last_connected_device';
	import PrinterJobs from '@/common/printer/printerjobs';
	import printerUtil from '@/common/printer/printerutil';
	
	function inArray(arr, key, val) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i][key] === val) {
				return i;
			}
		}
		return -1;
	}
	
	// ArrayBuffer转16进度字符串示例
	function ab2hex(buffer) {
		const hexArr = Array.prototype.map.call(new Uint8Array(buffer), function(bit) {
			return ('00' + bit.toString(16)).slice(-2);
		});
		return hexArr.join(',');
	}
	
	function str2ab(str) {
		// Convert str to ArrayBuff and write to printer
		let buffer = new ArrayBuffer(str.length);
		let dataView = new DataView(buffer);
		for (let i = 0; i < str.length; i++) {
			dataView.setUint8(i, str.charAt(i).charCodeAt(0));
		}
		return buffer;
	}
	export default {
		data() {
			return {
				current:0,
				titleList: [{
						name: "4G/WIFI云打印机",
						isActive: true
					},
					{
						name: "蓝牙打印机(仅手动打印)",
						isActive: false
					},
				],
				radioVal: "打印机一号",
				printerList: [{
						isActive: true,
						name: "打印机一号",
						isOnline: true
					},
					{
						isActive: false,
						name: "打印机二号",
						isOnline: false
					},
				],
				isSwitch:false,
				deviceList:4,
				
				
				// printer
				devices:[],
				connected: false,
				isConnected: true,
				name: '',
				deviceId: null,
				
			}
		},
		onLoad() {
			var _this = this;
			// #ifdef MP-WEIXIN
			wx.startWifi({
				success(res){
					console.log("res ==>",res);
				},
				fail(err){
					console.log("err ==>",err);
				}
			})
				
			wx.getLocation()
			
			wx.getWifiList({
				success() {
					wx.onGetWifiList(function(res){
						 console.log(res.wifiList)
					})
				}
			})
			// #endif
		},
		methods: {
			switchTitle(arr, item, index) {
				if (item.isActive) {
					return item.isActive = true;
				}
				arr.forEach(e => {
					e.isActive = false;
				})
				item.isActive = true;
				this.current = index;
			},
			radioChange(e) {
				console.log("e ==>", e);
			},

			
			
			// 初始化蓝牙
			openBluetoothAdapter() {
				if(!this.isSwitch){
					this.stopBluetoothDevicesDiscovery();
					// this.devices = [];
					return ;
				}
				console.log('初始化蓝牙模块 openBluetoothAdapter');
				if (!uni.openBluetoothAdapter) {
					console.log('微信版本过低');
					uni.showModal({
						title: '提示',
						content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
					});
					return;
				}
				uni.showLoading({
					title: '开始搜索蓝牙设备'
				});
				// uni.hideLoading();
				uni.openBluetoothAdapter({
					success: res => {
						console.log('初始化成功openBluetoothAdapter success', res);
						uni.hideLoading();
						// 搜寻附近的蓝牙
						this.startBluetoothDevicesDiscovery();
					},
					fail: res => {
						console.log('初始化失败openBluetoothAdapter fail', res);
						// uni.showModal({
						// 	content: res.errMsg,
						// 	showCancel: false
						// });
						uni.hideLoading();
						if (res.errCode === 10001) {
							// 当前蓝牙适配器不可用
							uni.showModal({
								title: '错误',
								content: '未找到蓝牙设备, 请打开蓝牙后重试。',
								showCancel: false
							});
							// 监听蓝牙适配器状态变化事件
							uni.onBluetoothAdapterStateChange(res => {
								console.log('监听蓝牙适配器状态 onBluetoothAdapterStateChange', res);
								// available：蓝牙适配器是否可用
								if (res.available) {
									// 取消监听，否则stopBluetoothDevicesDiscovery后仍会继续触发onBluetoothAdapterStateChange，
									// 导致再次调用startBluetoothDevicesDiscovery
									// uni.onBluetoothAdapterStateChange(() => {});
									// 开始搜寻附近的蓝牙外围设备
									this.startBluetoothDevicesDiscovery();
								}
							});
						}
					}
				});
			},
			// 开始搜寻附近的蓝牙外围设备
			startBluetoothDevicesDiscovery() {
				console.log('开始搜寻附近的蓝牙设备');
				uni.startBluetoothDevicesDiscovery({
					allowDuplicatesKey: false,
					interval: 0,
					success: res => {
						console.log('搜寻附近的蓝牙外围设备 startBluetoothDevicesDiscovery success111', res);
						// 监听寻找到新设备的事件
						this.onBluetoothDeviceFound();
					},
					fail: res => {
						console.log('搜寻附近的蓝牙外围设备 startBluetoothDevicesDiscovery fail', res);
						uni.hideLoading();
					}
				});
			},
			// 监听寻找到新设备的事件
			onBluetoothDeviceFound() {
				console.log('进入查询设备');
				uni.onBluetoothDeviceFound(res => {
					console.log('寻找设备', res.devices);
					res.devices.forEach(device => {
						if (!device.name && !device.localName) {
							return;
						}
						const foundDevices = this.devices;
						// 在数组中查找指定值，并返回它的索引值（如果没有找到，则返回-1）
						const idx = inArray(foundDevices, 'deviceId', device.deviceId);
						const data = {};
						if (idx === -1) {
							this.$set(this.devices, `${foundDevices.length}`, device);
						} else {
							this.$set(this.devices, `${idx}`, device);
						}
						console.log('搜索结果', this.devices);
						uni.hideLoading();
					});
				});
			},
			// this.devices是蓝牙设备列表，渲染到页面显示点击执行蓝牙连接
			// 点击链接蓝牙
			createBLEConnection(e) {
				console.log('点击连接蓝牙', e);
				const deviceId = e.deviceId;
				const name = e.name;
				this._createBLEConnection(deviceId, name);
			},
			
			_createBLEConnection(deviceId, name) {
				// this.$myToast('连接设备中', 'loading');
				// 连接低功耗蓝牙设备
				uni.createBLEConnection({
					deviceId, // 用于区分设备的 id
					success: () => {
						console.log('连接蓝牙接口调用成功 createBLEConnection success', this.devices);
						this.devices.forEach((item, index) => {
							this.$set(this.devices[index], 'isShowConnect', false);
							if (item.deviceId === deviceId) {
								this.$set(this.devices[index], 'isShowConnect', true);
							}
						});
						// this.$myToast('设备连接成功', 'success');
			
						this.connected = true;
						this.isConnected = false;
						this.name = name;
						this.deviceId = deviceId;
						// 获取蓝牙设备所有服务(service)
						this.getBLEDeviceServices(deviceId);
						// 最后连接设备
						uni.setStorage({
							key: LAST_CONNECTED_DEVICE,
							data: name + ':' + deviceId
						});
					},
					complete() {
						uni.hideLoading();
					},
					fail: res => {
						// 连接蓝牙接口调用失败
						console.log('连接蓝牙接口调用失败 createBLEConnection fail', res);
						uni.showModal({
							title: this.$t('wechat.w227'),
							content: '蓝牙连接失败',
							showCancel: false
						});
					}
				});
				// 已经找到需要的蓝牙设备,停止搜寻附近的蓝牙外围设备
				this.stopBluetoothDevicesDiscovery();
			},
			// 获取蓝牙设备所有服务(service)
			getBLEDeviceServices(deviceId) {
				uni.getBLEDeviceServices({
					deviceId,
					success: res => {
						console.log('获取蓝牙设备所有服务 getBLEDeviceServices', res);
						for (let i = 0; i < res.services.length; i++) {
							if (res.services[i].isPrimary) {
								this.getBLEDeviceCharacteristics(deviceId, res.services[i].uuid);
								return;
							}
						}
					}
				});
			},
			stopBluetoothDevicesDiscovery() {
				uni.stopBluetoothDevicesDiscovery({
					complete: () => {
						// console.log('stopBluetoothDevicesDiscovery')
						this._discoveryStarted = false;
					}
				});
			},
			/*
			获取蓝牙设备某个服务中所有特征值(characteristic)
			characteristic:
			uuid:蓝牙设备特征值的 uuid
			properties:该特征值支持的操作类型
			*/
			getBLEDeviceCharacteristics(deviceId, serviceId) {
				uni.getBLEDeviceCharacteristics({
					// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					deviceId,
					// 这里的 serviceId(蓝牙服务 uuid) 需要在 getBLEDeviceServices 接口中获取
					serviceId,
					success: res => {
						console.log('特征值变化 getBLEDeviceCharacteristics success', res.characteristics);
						// 这里会存在特征值是支持write，写入成功但是没有任何反应的情况
						// 只能一个个去试
						// characteristics：设备服务列表
						for (let i = 0; i < res.characteristics.length; i++) {
							const item = res.characteristics[i];
							// if (item.properties.read) {
							// 	uni.readBLECharacteristicValue({
							// 		deviceId,
							// 		serviceId,
							// 		characteristicId: item.uuid
							// 	})
							// }
			
							if (item.properties.write) {
								this.canWrite = true;
								this._deviceId = deviceId;
								this._serviceId = serviceId;
								this._characteristicId = item.uuid;
							}
			
							if (item.properties.notify || item.properties.indicate) {
								uni.notifyBLECharacteristicValueChange({
									deviceId,
									serviceId,
									characteristicId: item.uuid,
									state: true
								});
							}
			
							if (item.properties.write) {
								this.canWrite = true;
								this._deviceId = deviceId;
								this._serviceId = serviceId;
								this._characteristicId = item.uuid;
							}
			
							if (item.properties.notify || item.properties.indicate) {
								uni.notifyBLECharacteristicValueChange({
									deviceId,
									serviceId,
									characteristicId: item.uuid,
									state: true
								});
							}
						}
					},
					fail(res) {
						console.error('特征值变化 getBLEDeviceCharacteristics', res);
					}
				});
			},
		},
	}
</script>

<style lang="less">
	@import url("./printer.less");
</style>
