<template>
	<!-- 蓝牙打印页面 -->
	<view class="page">
		<button @click="openBluetoothAdapter">重新查询</button>
		<view class="title">
			可连接的蓝牙设备列表：
			<text style="color: red;font-size:22rpx;">(部分机型需要打开GPS定位服务)</text>
		</view>
		<view class="list">
			<view class="item" v-for="(item, i) in devices" :key="i">
				<!-- 设备名称 -->
				<text>{{ item.name }}</text>
				<!-- 连接状态 -->
				<view class="right">
					<view class="font-color-3" @click="createBLEConnection(item)" v-show="!item.isShowConnect">连接设备</view>
					<view class="font-color-3" v-show="item.isShowConnect">已连接</view>
				</view>
			</view>
			<!-- v-if="devices.length" -->
			<button :class="isDisabled || isConnected ? 'submit disabled' : 'submit'" @click="writeBLECharacteristicValue" :disabled="isDisabled || isConnected">开始打印</button>
			<view class="no-devices" v-if="!devices.length">未搜索到蓝牙设备</view>
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
	name: 'print',
	components: {},
	props: {},
	data() {
		return {
			devices: [],
			connected: false,
			isConnected: true,
			name: '',
			deviceId: null
		};
	},
	onLoad() {},
	onShow() {},
	created() {},
	mounted() {
		this.openBluetoothAdapter();
	},
	methods: {
		// 初始化蓝牙
		openBluetoothAdapter() {
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

		// 蓝牙连接成功后点击打印，打印数据
		// 点击打印：写入数据（根据项目需要打印内容来实现）
		writeBLECharacteristicValue() {
			console.log('写数据');
			let printerJobs = new PrinterJobs();
			// 要打印的信息
			printerJobs
				.setAlign('ct')
				.setSize(2, 2)
				.print('记录报告')
				.setSize(0, 0)
				.print()
				.setAlign('lt');
			// 打印
			printerJobs.print(printerUtil.fillLine());
			// 结尾
			printerJobs
				.println()
				.print('签名')
				.println()
				.println();

			let buffer = printerJobs.buffer();
			// console.log('ArrayBuffer', 'length: ' + buffer.byteLength, ' hex: ' + ab2hex(buffer));
			// 1.并行调用多次会存在写失败的可能性
			// 2.建议每次写入不超过20字节
			// 分包处理，延时调用
			const maxChunk = 20;
			const delay = 40;
			console.log(111111);
			for (let i = 0, j = 0, length = buffer.byteLength; i < length; i += maxChunk, j++) {
				let subPackage = buffer.slice(i, i + maxChunk <= length ? i + maxChunk : length);
				// subPackage：参数
				setTimeout(this._writeBLECharacteristicValue, j * delay, subPackage);
			}

			console.log(22222);
		},
		// 向低功耗蓝牙设备特征值中写入二进制数据。注意：必须设备的特征值支持 write 才可以成功调用。
		_writeBLECharacteristicValue(buffer) {
			console.log('写入数据');
			uni.writeBLECharacteristicValue({
				deviceId: this._deviceId, // 蓝牙设备 id
				serviceId: this._serviceId, // 蓝牙特征值对应服务的 uuid
				characteristicId: this._characteristicId, // 蓝牙特征值的 uuid
				value: buffer, // 蓝牙设备特征值对应的二进制值
				success(res) {
					console.log('writeBLECharacteristicValue success', res);
				},
				fail(res) {
					console.log('writeBLECharacteristicValue fail', res);
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
.page {
	margin: 20rpx;
	color: #323232;
	background-color: #f5f9ff;
	height: 100vh;
}
.title {
	font-weight: 600;
	margin: 20rpx 0rpx;
}
.list {
	.item {
		display: flex;
		justify-content: space-between;
		padding: 10rpx 20rpx;
		height: 60rpx;
		line-height: 60rpx;
		background-color: #ffffff;
		margin-bottom: 4rpx;
	}

	.right {
	}
	.no-devices {
		height: 400rpx;
		font-size: 32rpx;
		line-height: 400rpx;
		text-align: center;
		color: #969696;
	}
}

.font-color-3 {
	color: #1a8cff;
}

.submit {
	background-color: #4d88ff !important;
	color: #f5f9ff !important;
}

.disabled {
	background-color: #66b1ff !important;
}
</style>



