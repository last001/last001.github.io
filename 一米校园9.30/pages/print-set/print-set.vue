<template>
	<view>
		<view class="tab">
			<view class="tab-item" :class="[tabIndex=='0'?'act':'']" @click="tabSel" data-index="0">
				<text class="tab-tit">4G/WiFi云打印机</text>
			</view>
			<view class="tab-item" :class="[tabIndex=='1'?'act':'']" @click="tabSel" data-index="1">
				<text class="tab-tit">蓝牙打印机(仅手动打印)</text>
			</view>
		</view>

		<view v-show="tabIndex == 0" class="content">
			<view class="line">
				<view style="margin-left: 20px;padding: 16px 0;">打印机列表</view>
			</view>
			<view class="add" @click="addPrint">
				<image src="../../static/tabBar/wds.png" style="width: 32rpx;height: 32rpx;"></image>
				<view style="font-size: 32rpx;margin-left: 20rpx;">新增打印机</view>
			</view>
			
	<view class="main">
		<view class="item" v-for="(item,index) in printList" :key="index">
			<view class="printCon" @click="updatePrint" :data-entity="item">
				<text style="margin-left:15rpx">{{item.Name}}</text>
				<view class="pintStatus" v-if="item.PrintStatus == '离线'" style="color: red;">[{{item.PrintStatus}}]</view>
				<view class="pintStatus" v-else style="color: green;">[{{item.PrintStatus}}]</view>
				
			</view>
		</view>
	</view>
			
		</view>

		<view v-show="tabIndex == 1" class="content">
			<view class="line">
				<view class="sreart">
					<view>附近的蓝牙设备</view>
					<view @click="startBluetoothDevicesDiscovery">搜索</view>
				</view>
			</view>

			<!-- <view class="btn" @click="playt">
				<view class="qd">播放</view>
			</view> -->
			<view class="bluetooth-list">
				<view class="bluetooth-list-item" v-for="(item, index) in devicesList" :key="index"
					:class="item.isConnect ? 'activeList' : ''">
					<text>{{item.name}}</text>
					<text>{{item.deviceId}}</text>
					<text :style="{color: !item.isConnect ? 'red' : 'green'}" class=""
						@tap="!item.isConnect ? connect(item, index) : unConnect(item, index)">{{!item.isConnect ? '点击连接' : '断开连接'}}</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	const app = require('@/utils/app.js')
	const printerutil = require('@/utils/printerutil.js')
	const PrinterJobs = require('@/utils/printerjobs.js')
	const bluetooth = require('@/utils/bluetooth.js')
	import {
		v4
	} from 'uuid';
	import {
		MQTT_IP,
		MQTT_OPTIONS
	} from '@/utils/mqtt.js';
import { $post } from '../../utils/api';
import { obj2str } from '../../utils/utils';
	var mqtt = require('mqtt/dist/mqtt.js')
	var client

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
		name: "test",
		data() {
			return {
				tabIndex: "0",

				// topic: 'Topic_exchange', //要订阅的主题
				topic: 'shopId',

				devicesList: [],
				device: null,
                
				orderlist: [],
				orderlists: {},
				ShopId:'',
				printList:{}

			}
		},
		mounted() {
			this.connects() //连接
		},
		onLoad(options) {
			// 初始化蓝牙模块
			if(options && options.ShopId){
				// this.ShopId = options.ShopId
				this.ShopId = '100001'
				this.getShopPrinters()
			}
			
			uni.hideLoading()

		},
		computed: {

		},
		methods: {
			tabSel(e) {
				var that = this;
				this.tabIndex = e.currentTarget.dataset.index;
				console.log(this.tabIndex, "######################")
			},
			getShopPrinters(){
				var that = this
				let interface_code = 'getShopPrinters';
				let interface_parameters =  obj2str([that.ShopId]);
				$post('/oauth2/resources',{interface_code,interface_parameters}).then(data => {
					  if (data.RetCode == "000000") {
					          that.printList = data.Result
					      }
				})
			},
			updatePrint(e){
				var that = this
				let entity = e.currentTarget.dataset.entity;
				uni.navigateTo({
					url:"/pages/print-setting/print-setting?ShopId=" + 'DB12CB40A14D4A8BAA521058DF958927'+"&PrintId="+entity.Id
				})
			},
			addPrint() {
                uni.navigateTo({
                	// url:"/pages/print-setting/print-setting?ShopId=" + this.ShopId
					url:"/pages/print-setting/print-setting?ShopId=" + 'DB12CB40A14D4A8BAA521058DF958927'
                })
			},
			/* 初始化蓝牙模块 */
			openBluetoothAdapter() {
				uni.openBluetoothAdapter({
					success: res => {
						console.log('blueth is ok', res)
					},
					fail: err => {
						console.log('blueth is err', err)
					},
				});
			},
			/* 搜索蓝牙 */
			startBluetoothDevicesDiscovery() {
				setTimeout(() => {
					uni.startBluetoothDevicesDiscovery({
						allowDuplicatesKey: true, // 启用重复上报方便删除后可快速拿到设备
						success: res => {
							// console.log('startBluetoothDevicesDiscovery ok:', res)
							// 监听寻找蓝牙新设备
							this.onBluetoothDeviceFound()
						},
						fail: err => {
							console.log('startBluetoothDevicesDiscovery err:', err)
						}
					})
				}, 1000)
			},
			/* 监听寻找蓝牙新设备*/
			onBluetoothDeviceFound() {
				uni.onBluetoothDeviceFound(res => {
					// console.log('find dev list:', res)
					if (
						res.devices[0].name &&
						!this.devicesList.some(item => {
							return item.deviceId === res.devices[0].deviceId
						})
					) {
						this.devicesList.push({
							...res.devices[0],
							isConnect: false
						})
					}
				})
			},
			/* 停止搜索蓝牙 */
			stopBluetoothDevicesDiscovery() {
				uni.stopBluetoothDevicesDiscovery({
					success: res => {
						console.log('topBluetoothDevices ok:', res)
					},
					fail: err => {
						console.log('topBluetoothDevices err:', err)
					}
				})
			},
			/* 连接低功耗蓝牙 */
			createBLEConnection(deviceId) {
				return new Promise((resolve, reject) => {
					uni.createBLEConnection({
						deviceId,
						success: async res => {
							resolve(true)
						},
						fail: err => {
							reject(err)
						}
					})
				});
			},
			/*  获取蓝牙设备某个服务中所有特征值(characteristic) */
			getBLEDeviceCharacteristics(deviceId, serviceId, characteristicId) {
				let self = this;
				return new Promise((resolve, reject) => {
					uni.getBLEDeviceCharacteristics({
						deviceId,
						serviceId,
						success: async res => {
							if (!characteristicId) {
								return resolve(res.characteristics)
							}
							let sure = false;
							for (var i = 0; i < res.characteristics.length; i++) {
								if (res.characteristics[i].uuid.toUpperCase().indexOf(
										characteristicId) != -1) {
									sure = true
									break;
								}
							}
							sure ? resolve(true) : reject({
								errMsg: '设备功能不匹配'
							})
						},
						fail: err => {
							reject(false)
						}
					})
				});
			},
			/* 连接设备 */
			async connect(item, index) {
				// 连接低功耗蓝牙
				const name = item.name
				const deviceId = item.deviceId
				console.log("deviceId===", deviceId)
				uni.setStorageSync('deviceId', deviceId)
				try {
					await this.createBLEConnection(deviceId)
					uni.showToast({
						title: '连接成功',
						duration: 2000
					});
					// 更改连接状态
					let devObj = this.devicesList[index]
					devObj.isConnect = true
					uni.setStorageSync('isConnect', devObj.isConnect)

					this.$set(this.devicesList, index, devObj)

					// 获取蓝牙设备所有服务(service)
					const serviceTimer = setTimeout(() => {
						uni.getBLEDeviceServices({
							deviceId,
							success: async res => {
								const services = res.services
								if (services.length > 0) {
									for (var i = 0; i < services.length; i++) {
										if (services[i].isPrimary) {
											// 获取设备特征值
											var characteristicsRes = await this
												.getBLEDeviceCharacteristics(deviceId,
													services[i].uuid)
											if (characteristicsRes.length > 0) {
												for (var s = 0; s < characteristicsRes
													.length; s++) {
													if (characteristicsRes[s].properties.write) {
														let list = Object.assign(item, {
															characteristicId: characteristicsRes[
																s].uuid,
															serviceId: services[i].uuid,

														})
														this.device = list
														console.log(this.device, '00')

														uni.setStorageSync('characteristicId', this
															.device.characteristicId)
														uni.setStorageSync('serviceId', this.device
															.serviceId)
													}
												}
											}
										}
									}
								} else {
									uni.showToast({
										title: '该设备无权限，可能无法使用该功能',
										duration: 2000
									});
									this.unConnect(item, index)
								}
							}
						})
						clearTimeout(serviceTimer)
					}, 1000)
				} catch (err) {
					//TODO handle the exception
					uni.showToast({
						title: '连接失败',
						duration: 2000
					});
					console.log('蓝牙连接失败:', err)
				}
			},
			/* 断开连接 */
			unConnect(item, index) {
				const deviceId = item.deviceId
				const name = item.name
				uni.closeBLEConnection({
					deviceId,
					success: async res => {
						// 更改连接状态
						let devObj = this.devicesList[index]
						devObj.isConnect = false
						this.$set(this.devicesList, index, devObj)
						// this.showToast(`${name}蓝牙已断开`)
						uni.showToast({
							title: '蓝牙已断开',
							duration: 2000
						});
						this.device = []
					},
					fail: err => {
						reject(err);
					}
				})
			},
			/* 打印 */
			printBluetootha: function(msg) {
				var printerJobs = new PrinterJobs()
				printerJobs
					.println()
					.setAlign('ct')
					.print('*****' + '一米校园生活' + '*****')
					.setSize(1, 1)
					.print('')
					.setSize(2, 2)
					.print(msg.order.LinkMan)
					.setSize(1, 1)
					.print('')
					.setSize(2, 2)
					.print('[' + msg.order.PayTypeText + ']' + '(' + msg.order.DeliveryTypeText + ')')
				printerJobs
					.setSize(1, 1)
					.print('')
				printerJobs
					.setAlign('lt')
					.setSize(1, 1)
					.print('下单时间:' + msg.order.OrderDate)
					.print('')
					.print('订单编号:' + msg.order.OrderDetailList.Id)
					.print('')
					.setSize(2, 2)
					.print('联系电话:' + msg.order.Telephone)
					.print('')
					.setSize(1, 1)
				printerJobs.setSize(2, 2)
					.print('送货地点:' + msg.order.Address)
					.setSize(1, 1)
				printerJobs.setSize(1, 1)
					.print()
				printerJobs.print('')
					.println();
				let buffer = printerJobs.buffer();
				const maxChunk = 20;
				const delay = 20;
				for (let i = 0, j = 0, length = buffer.byteLength; i < length; i += maxChunk, j++) {
					let subPackage = buffer.slice(i, i + maxChunk <= length ? (i + maxChunk) : length);
					setTimeout(this.writeBLECharacteristicValue, j * delay, subPackage);
				}
			},
			printBluetoothb: function(msg) {
				var printerJobs = new PrinterJobs()
				printerJobs
					.println()
					.setAlign('ct')
					.print('*****' + '一米校园生活' + '*****')
					.setSize(1, 1)
					.print('')
					.setSize(2, 2)
					.print('*一米校园[客户申请退款]*')
					.setSize(1, 1)
					.print('')
					.setSize(2, 2)
					.print(msg.order.ShopName)
				printerJobs
					.setSize(1, 1)
					.print('')
				printerJobs
					.setAlign('lt')
					.setSize(1, 1)
					.print('编号:' + msg.order.getPrintNo + ',' + msg.order.OrderDate)
					.print('')
					.print('【请及时在“订单处理”中处理退款,如次日凌晨6:00前未处理，系统将默认同意退款!】')
					.print('')
				printerJobs.setSize(1, 1)
					.print()
				let buffer = printerJobs.buffer();
				const maxChunk = 20;
				const delay = 20;
				for (let i = 0, j = 0, length = buffer.byteLength; i < length; i += maxChunk, j++) {
					let subPackage = buffer.slice(i, i + maxChunk <= length ? (i + maxChunk) : length);
					setTimeout(this.writeBLECharacteristicValue, j * delay, subPackage);
				}

			},
			printBluetoothc: function(msg) {
				var printerJobs = new PrinterJobs()
				printerJobs
					.println()
					.setAlign('ct')
					.print('*****' + '一米校园生活' + '*****')
					.setSize(1, 1)
					.print('')
					.setSize(2, 2)
					.print('*一米校园[客户催单]*')
					.setSize(1, 1)
					.print('')
				printerJobs
					.setAlign('lt')
					.setSize(1, 1)
					.print('下单时间:' + msg.order.OrderDate)
					.print('')
				printerJobs.print('')
					.println();
				let buffer = printerJobs.buffer();
				const maxChunk = 20;
				const delay = 20;
				for (let i = 0, j = 0, length = buffer.byteLength; i < length; i += maxChunk, j++) {
					let subPackage = buffer.slice(i, i + maxChunk <= length ? (i + maxChunk) : length);
					setTimeout(this.writeBLECharacteristicValue, j * delay, subPackage);
				}

			},

			// 向蓝牙设备发送一个0x00的16进制数据
			writeBLECharacteristicValue: function(buffer) {
				uni.writeBLECharacteristicValue({
					deviceId: uni.getStorageSync('deviceId'),
					serviceId: uni.getStorageSync('serviceId'),
					characteristicId: uni.getStorageSync('characteristicId'),
					value: buffer,
					success(res) {
						console.log('writeBLECharacteristicValue success', res)
					},
					fail(res) {
						console.log('writeBLECharacteristicValue fail', res)
					}
				})
			},
			//连接mqtt
			connects() {
				MQTT_OPTIONS.clientId = v4()
				let topic = app.curShop.Id;
				console.log(topic);
				var that = this
				// #ifdef H5
				client = mqtt.connect('mqtt://' + MQTT_IP, MQTT_OPTIONS)
				// #endif
				// #ifdef MP-WEIXIN||APP-PLUS
				client = mqtt.connect('wx://' + MQTT_IP, MQTT_OPTIONS)
				// #endif
				console.log(client)
				client.on('connect', function() {
					console.log('连接成功')
					client.subscribe(topic, function(err) {
						if (!err) {
							console.log('订阅成功')
							console.log(topic)
						}
					})

				}).on('reconnect', function(error) {
					console.log('正在重连...', topic)
				}).on('error', function(error) {
					console.log('连接失败...', error)
				}).on('end', function() {
					console.log('连接断开')
				}).on('message', function(topic, message) {
					console.log('接收信息：', message)
					console.log('接收推送信息：', message.toString())
					var msg = JSON.parse(message)
					console.log("111", msg.messageType, msg.order.LinkMan);

					if (msg.messageType == '1') {
						that.playx(msg);

					} else if (msg.messageType == '3') {
						that.playc(msg);

					} else if (msg.messageType == '2') {
						that.playt(msg);
					} else {
						console.log("失败");
					}

				})
			},

			playx(msg) {
				var that = this;
				var isConnect = uni.getStorageSync('isConnect')
				console.log(isConnect, "............");
				if (isConnect == true) {
					console.log(isConnect, "1111111111")
					that.printBluetooth(msg);
				}
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = '/static/audio/new.mp3';
				innerAudioContext.play(() => {
					console.log('开始播放');
				});
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
				});
			},
			playc(msg) {
				var isConnect = uni.getStorageSync('isConnect')
				let innerAudioContext = uni.createInnerAudioContext()
				innerAudioContext.volume = 1
				innerAudioContext.src = '/static/audio/urge.mp3'
				innerAudioContext.play()
				if (isConnect == true) {
					console.log(isConnect, "22222222222222");
					this.printBluetoothc(msg)
				}
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
				});
			},
			playt(msg) {
				var isConnect = uni.getStorageSync('isConnect')
				let innerAudioContext = uni.createInnerAudioContext()
				innerAudioContext.volume = 1
				innerAudioContext.src = '/static/audio/chargback.mp3'
				innerAudioContext.play()
				if (isConnect == true) {
					console.log(isConnect, "3333333333");
					this.printBluetoothb(msg);
				}
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
				});
			},
		}

	}
</script>

<style lang="less" scoped>
	.item{
		height: 120rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		border-bottom: 1px solid #efeff4;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.name{
		display: flex;
		align-items: center;
	}
	.icon{
		display: flex;
		align-items: center;
		width: 18rpx;
		margin-right: 26rpx;
	}
	.printCon {
	  display: flex;
	  flex-direction: column;
	}
	.printCon>.pintStatus {
	  font-size: 24rpx;
	  font-weight: lighter;
	  padding: 6rpx 0 0 20rpx;
	}
	.edit{
		padding: 20rpx;
	}
	.edit i{
		color: #05c0ab;
	}
	.act-red{
		color: red;
	}
	.act-green{
		color: green;
	}
	.line {
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
	}

	.sreart {
		display: flex;
		justify-content: space-around;
		padding: 16px 0;
	}

	.tab {
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-bottom: 1px solid #efeff4;
	}

	.tab-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tab-tit {
		font-size: 30rpx;
		margin: 15px 0;
	}

	.act .tab-tit {
		color: #05c0ab;
	}

	// .add {
	// 	display: flex;
	// 	justify-content: center;
	// 	padding: 20rpx 0;
	// 	position: fixed;
	// 	bottom: 0;
	// 	width: 100%;
	// 	border-top: 1px solid #dedede;
	// }
	.add {
		height: 90rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-top: 1px solid #efeff4;
		position: fixed;
		left: 0;
		bottom: 0;
	}

	.btn {
		background-color: #05c0ab;
		width: 80%;
		margin-left: 10%;
		text-align: center;
		border-radius: 30rpx;
		padding: 30rpx 0;
	}

	.qd {
		color: #ffffff;
		font-size: 30rpx;
	}

	.content {
		display: flex;
		flex-direction: column;
	}

	.bluetooth-list-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20upx 40upx;
		border-bottom: 1px solid #ff0000;
	}

	.bluetooth-list-item:nth-child(1) {
		border-bottom: 1px solid #00ff00 !important;
	}

	.activeList {
		color: #007AFF;
	}
</style>
