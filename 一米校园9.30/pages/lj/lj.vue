<template>
	<view>
		<view class="content">
			<button type="default" @click="startBluetoothDevicesDiscovery">搜索</button>
			<button type="default" @click="printBluetooth">打印</button>
			<view class="bluetooth-list">
				<text>蓝牙列表</text>
				<view class="bluetooth-list-item">
					<text>name</text>
					<text>deviceId</text>
				</view>
				<view class="bluetooth-list-item" v-for="(item, index) in devicesList" :key="index"
					:class="item.isConnect ? 'activeList' : ''">
					<text>{{item.name}}</text>
					<text>{{item.deviceId}}</text>
					<text :style="{color: !item.isConnect ? 'red' : 'green'}" class=""
						@tap="!item.isConnect ? connect(item, index) : unConnect(item, index)">{{!item.isConnect ? '点击连接' : '断开连接'}}</text>
				</view>
			</view>
		</view>
		<!-- <view class="btn" @click="bfa">
			<view class="qd">播放a</view>
		</view> -->
	</view>
</template>
<script>
	const printerutil = require('@/utils/printerutil.js')
	const PrinterJobs = require('@/utils/printerjobs.js')
	const bluetooth = require('@/utils/bluetooth.js')
	// import { v4 } from 'uuid';
	// import { MQTT_IP, MQTT_OPTIONS } from '@/utils/mqtt.js';
	// var mqtt = require('mqtt/dist/mqtt.js')
	// var client

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
				// topic: 'Topic_exchange', //要订阅的主题

				devicesList: [],
				device: null,

				orderlist: [],
				orderlists: {}
			}
		},
		mounted() {
			// this.connect() //连接
		},
		onLoad() {
			// 初始化蓝牙模块
			this.openBluetoothAdapter()
			uni.hideLoading()
			//获取订单
			var aa = uni.getStorageSync('data')
			this.orderlist = aa.Result.OrderDetailList;
			this.orderlists = aa.Result

		},
		methods: {
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
			printBluetooth: function() {
				var printerJobs = new PrinterJobs()
				printerJobs
					.println()
					.setAlign('ct')
					.print('*****' + '一米校园生活' + '*****')
					.setSize(1, 1)
					.print('')
					.setSize(2, 2)
					.print(this.orderlists.ShopName)
					.setSize(1, 1)
					.print('')
					.setSize(2, 2)
					.print('[' + this.orderlists.PayStatusName + ']' + '(' + this.orderlists.DeliveryTypeText + ')')
				printerJobs
					.setSize(1, 1)
					.print('')
				printerJobs
					.setAlign('lt')
					.setSize(1, 1)
					.print('下单时间:' + this.orderlists.OrderDate)
					.print('')
					.print('订单编号:' + (this.orderlists.PrintNo ? this.orderlists.PrintNo : '无'))
					.print('')
					.print('顾客名称:' + (this.orderlists.LinkMan ? this.orderlists.LinkMan : '匿名') + '【下单次数' + this
						.orderlists.OrderTimes + '】')
					.print('')
					.setSize(2, 2)
					.print('联系电话:' + (this.orderlists.Telephone ? this.orderlists.Telephone : 'null'))
					.print('')
					.setSize(1, 1)
				if (this.orderlists.Remark) {
					printerJobs.print('备注:' + this.orderlists.Remark)
				}
				printerJobs
					.print('')
				printerJobs.setSize(2, 2)
					.print('送货地点:' + (this.orderlists.Address ? this.orderlists.Address : 'null'))
					.setSize(1, 1)
				printerJobs.setSize(1, 1)
					.print()
				for (var x in this.orderlist) {
					printerJobs.print((this.orderlist[x].ProductName + ' *' + this.orderlist[x].OrderCount) + '  ' +
						this.orderlist[x].RealOrderAmount)
				}
				if (this.orderlists.OrderBenefitList && this.orderlists.OrderBenefitList.length > 0) {
					printerJobs.print()
					for (var y in this.orderlists.OrderBenefitList) {
						if (this.orderlists.OrderBenefitList[y].BenefitType == 'FullCut') {
							printerJobs.print('满减优惠：-' + this.orderlists.OrderBenefitList[y].BenefitAmount + '元')
						} else if (this.orderlists.OrderBenefitList[y].BenefitType == 'FullSent') {
							printerJobs.print('满送优惠：' + this.orderlists.OrderBenefitList[y].BenefitContent)
						} else if (this.orderlists.OrderBenefitList[y].BenefitType == 'FirstCut') {
							if (this.orderlists.OrderBenefitList[y].BenefitContent && this.orderlists.OrderBenefitList[
									y].BenefitContent.startsWith("门店")) {
								printerJobs.print('门店新用户优惠：-' + this.orderlists.OrderBenefitList[y].BenefitAmount)
							} else {
								printerJobs.print('平台新用户优惠：-' + this.orderlists.OrderBenefitList[y].BenefitAmount)
							}
						} else if (this.orderlists.OrderBenefitList[y].BenefitType == 'Coupon') {
							printerJobs.print('商家优惠劵：-' + this.orderlists.OrderBenefitList[y].BenefitAmount)
						} else if (this.orderlists.OrderBenefitList[y].BenefitType == 'PtCoupon') {
							printerJobs.print('商家优惠劵：-' + this.orderlists.OrderBenefitList[y].BenefitAmount)
						} else if (this.orderlists.OrderBenefitList[y].BenefitType == 'vipcoupon') {
							printerJobs.print('会员红包：-' + this.orderlists.OrderBenefitList[y].BenefitAmount)
						}
					}
				}
				if ((this.orderlists.IncrementRemark && (this.orderlists.IncrementFee || this.orderlists
						.IncrementFee >= 0)) || (this.orderlists.DeliveryAmount && this.orderlists.DeliveryAmount >
						0) || this.orderlists.LunchBoxPrice && this.orderlists.LunchBoxPrice > 0) {

					printerJobs.print()
					if (this.orderlists.IncrementRemark && (this.orderlists.IncrementFee || this.orderlists
							.IncrementFee >= 0)) {
						printerJobs.print('附加费:' + (this.orderlists.IncrementRemark + '' + (this.orderlists
							.IncrementFee ? this.orderlists.IncrementFee : '0')) + '元')
					}
					if (this.orderlists.DeliveryAmount && this.orderlists.DeliveryAmount > 0) {
						printerJobs.print('配送费:' + this.orderlists.DeliveryAmount + '元')
					}
					if (this.orderlists.LunchBoxPrice && this.orderlists.LunchBoxPrice > 0) {
						printerJobs.print('餐盒费:' + this.orderlists.LunchBoxPrice + '元')
					}
				}
				printerJobs.print()

				if (this.orderlists.ShopBalanceAmount && this.orderlists.ShopBalanceAmount > 0 && this.orderlists
					.getEntrance && this.orderlists.getEntrance == 'groupbuy') {
					printerJobs.print('【商户价：' + this.orderlists.ShopBalanceAmount + '元】')
				} else {
					printerJobs.print('合计:' + (this.orderlists.FactPayAmount ? this.orderlists.FactPayAmount : '无'))
				}
				printerJobs.print('')
				printerJobs.setSize(1, 1)
					.print('支付类型:' + (this.orderlists.PayType == 'online' ? '在线支付' : '货到付款'))
					.println()
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
			// connect() {
			// 	console.log("6666");
			// 	MQTT_OPTIONS.clientId = v4()

			// 	var that = this
			// 	// #ifdef H5
			// 	client = mqtt.connect('mqtt://' + MQTT_IP, MQTT_OPTIONS)
			// 	// #endif
			// 	// #ifdef MP-WEIXIN||APP-PLUS
			// 	client = mqtt.connect('wx://' + MQTT_IP, MQTT_OPTIONS)
			// 	// #endif
			// 	console.log(client)
			// 	client.on('connect', function() {
			// 		console.log('连接成功')
			// 		client.subscribe(that.topic, function(err) {
			// 			if (!err) {
			// 				console.log('订阅成功')
			// 				console.log(!err,"00000")
			// 			}
			// 		})

			// 	}).on('reconnect', function(error) {
			// 		console.log('正在重连...', that.topic)
			// 	}).on('error', function(error) {
			// 		console.log('连接失败...', error)
			// 	}).on('end', function() {
			// 		console.log('连接断开')
			// 	}).on('message', function(topic, message) {
			// 		console.log('接收信息：', message)
			// 		console.log('接收推送信息：', message.toString())
			// 		var msg = JSON.parse(message)
			// 		console.log("111",msg.messageType);
			// 		// if (msg.messageType === "1"){
			// 		// 	that.bfa()
			// 		// 	// let devObj = that.devicesList[index]
			// 		// 	// if(devObj.isConnect = true){
			// 		// 	// 	that.printBluetooth()
			// 		// 	// } else{
			// 		// 	// 	console.log("不打印");
			// 		// 	// 	return
			// 		// 	// }
			// 		// }else{
			// 		// 	that.bfb()
			// 		// 	console.log("什么东西");
			// 		// 	return
			// 		// }
			// 		if(msg.messageType == '1'){
			// 			console.log("成功1")
			// 			that.bfa()
			// 		}
			// 		else if(msg.messageType == '2'){
			// 			console.log("成功2");
			// 			that.bfb()
			// 		}
			// 		else{
			// 			console.log("失败");
			// 		}
			// 	})
			// },

			bfa() {
				let innerAudioContext = uni.createInnerAudioContext()
				innerAudioContext.volume = 1
				innerAudioContext.src = '/static/audio/new.mp3'
				innerAudioContext.play()
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
			},
			bfb() {
				let innerAudioContext = uni.createInnerAudioContext()
				innerAudioContext.volume = 1
				innerAudioContext.src = '/static/audio/urge.mp3'
				innerAudioContext.play()
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
			},
		},

	}
</script>

<style>
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
