<template>
	<view class="global">
		<view style="background-color: white;border-bottom: 1px solid #e6e6e6;">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
				activeColor="#05c0ab"></uni-segmented-control>
		</view>
		<view v-show="current === 0">
			<view class="contents">
				<view class="line">
					<view class="lines">订单明细</view>
				</view>
				<view class="line">
					<view class="lines">{{orderlist.ShopName}}</view>
				</view>

				<view class="line" v-for="(item,index) in orderlists" :key="index">
					<view class="linea">
						<view>{{item.ProductName}}</view>
						<view class="quantity">*{{item.OrderCount}}</view>
						<view class="unit-price">￥{{item.RealOrderAmount}}</view>
					</view>
				</view>

				<view class="line">
					<view class="linea">
						<view>配送费</view>
						<view class="delivery-cost">￥{{orderlist.DeliveryAmount}}</view>
					</view>
				</view>

				<view class="line">
					<view class="linea">
						<view style="display: flex;">
							<view>原价￥{{orderlist.OrderAmount}}</view>
							<view class="discounts">共优惠￥{{orderlist.BenefitAmount}}</view>
						</view>
						<view style="display: flex;">
							<view>实付</view>
							<view class="delivery-cost">￥{{orderlist.FactPayAmount}}</view>
						</view>
					</view>
				</view>

				<view class="ddxx">订单信息</view>
				<view class="line">
					<view style="display: flex;">
						<view class="lines">订单编号：</view>
						<view class="order-number">{{orderlist.SerialNumber}}</view>
					</view>
				</view>
				<view class="line">
					<view style="display: flex;">
						<view class="lines">打印编号：</view>
						<view class="order-numbers">{{orderlist.PrintNo}} 【已下单{{orderlist.OrderTimes}}次】</view>
					</view>
				</view>
				<view class="line">
					<view style="display: flex;">
						<view class="lines">订单时间：</view>
						<view class="order-number">{{orderlist.OrderDate}}</view>
					</view>
				</view>
				<view class="line">
					<view style="display: flex;">
						<view class="lines">支付方式：</view>
						<view class="order-number">{{orderlist.PayTypeText}}</view>
					</view>
				</view>
				<view class="line">
					<view style="display: flex;">
						<view class="lines">配送方式：</view>
						<view class="order-number">{{orderlist.DeliveryTypeText}}</view>
					</view>
				</view>
				<view class="line">
					<view style="display: flex;">
						<view class="lines">配送地址：</view>
						<view class="order-number">{{orderlist.LinkMan}} {{orderlist.Telephone}}
							{{orderlist.Address}}
						</view>
					</view>
				</view>
				<view class="line" @click="call">
					<view style="display: flex;">
						<view class="lines">联系买家：</view>
						<view class="order-number">{{orderlist.Telephone}}</view>
					</view>
				</view>

			</view>
		</view>

		<view v-show="current === 1">
			<view style="height: 100vh;background-color: white;">
				<uni-steps
					:options="[{title:'买家已下单,等待买家付款',desc:'2022-07-11'},{title:'付款成功,商家已接单',desc:'2022-11-12'},{title:'交易完成',desc:'2018-11-14'}]"
					activeColor="green" direction="column" :active="1"></uni-steps>
			</view>
		</view>

		<view class="btn">
			<view class="btns">
				<!-- <view class="bottoma" @click="cancelOrderTop">
					<view class="text">取消订单</view>
				</view> -->
				<view class="bottomb" @click="printBluetooth">
					<view class="text">打印订单</view>
				</view>
			</view>
		</view>

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
		data() {
			return {
				items: ['订单明细', '订单状态'],
				current: 0,

				orderlist: {},
				orderlists: []
			}
		},
		onLoad() {
			var that = this;
			let orderDetail = uni.getStorageSync('Id')
			that.orderlist = orderDetail;
		},
		methods: {
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			/* 打印订单 */
			printBluetooth: function() {
				var printerJobs = new PrinterJobs()
				printerJobs
					.println()
					.setAlign('ct')
					.print('*****' + '一米校园生活' + '*****')
					.setSize(1, 1)
					.print('')
					.setSize(2, 2)
					.print(this.orderlist.ShopName)
					.setSize(1, 1)
					.print('')
					.setSize(2, 2)
					.print('[' + this.orderlist.PayStatusName + ']' + '(' + this.orderlist.DeliveryTypeText +
						')')
				printerJobs
					.setSize(1, 1)
					.print('')
				printerJobs
					.setAlign('lt')
					.setSize(1, 1)
					.print('下单时间:' + this.orderlist.OrderDate)
					.print('')
					.print('订单编号:' + (this.orderlist.PrintNo ? this.orderlist.PrintNo : '无'))
					.print('')
					.print('顾客名称:' + (this.orderlist.LinkMan ? this.orderlist.LinkMan : '匿名') + '【下单次数' + this
						.orderlist.OrderTimes +
						'】')
					.print('')
					.setSize(2, 2)
					.print('联系电话:' + (this.orderlist.Telephone ? this.orderlist.Telephone : 'null'))
					.print('')
					.setSize(1, 1)
				if (this.orderlist.Remark) {
					printerJobs.print('备注:' + this.orderlist.Remark)
				}
				printerJobs
					.print('')
				printerJobs.setSize(2, 2)
					.print('送货地点:' + (this.orderlist.Address ? this.orderlist.Address : 'null'))
					.setSize(1, 1)
				printerJobs.setSize(1, 1)
					.print()
				for (var x in this.orderlists) {
					printerJobs.print((this.orderlists[x].ProductName + ' *' + this.orderlists[x].OrderCount) +
						'  ' +
						this.orderlists[x].RealOrderAmount)
				}
				if (this.orderlists.OrderBenefitList && this.orderlists.OrderBenefitList.length > 0) {
					printerJobs.print()
					for (var y in this.orderlist.OrderBenefitList) {
						if (this.orderlist.OrderBenefitList[y].BenefitType == 'FullCut') {
							printerJobs.print('满减优惠：-' + this.orderlist.OrderBenefitList[y].BenefitAmount +
								'元')
						} else if (this.orderlist.OrderBenefitList[y].BenefitType == 'FullSent') {
							printerJobs.print('满送优惠：' + this.orderlist.OrderBenefitList[y].BenefitContent)
						} else if (this.orderlist.OrderBenefitList[y].BenefitType == 'FirstCut') {
							if (this.orderlist.OrderBenefitList[y].BenefitContent && this.orderlist
								.OrderBenefitList[
									y].BenefitContent.startsWith("门店")) {
								printerJobs.print('门店新用户优惠：-' + this.orderlist.OrderBenefitList[y]
									.BenefitAmount)
							} else {
								printerJobs.print('平台新用户优惠：-' + this.orderlist.OrderBenefitList[y]
									.BenefitAmount)
							}
						} else if (this.orderlist.OrderBenefitList[y].BenefitType == 'Coupon') {
							printerJobs.print('商家优惠劵：-' + this.orderlist.OrderBenefitList[y].BenefitAmount)
						} else if (this.orderlist.OrderBenefitList[y].BenefitType == 'PtCoupon') {
							printerJobs.print('商家优惠劵：-' + this.orderlist.OrderBenefitList[y].BenefitAmount)
						} else if (this.orderlist.OrderBenefitList[y].BenefitType == 'vipcoupon') {
							printerJobs.print('会员红包：-' + this.orderlist.OrderBenefitList[y].BenefitAmount)
						}
					}
				}
				if ((this.orderlist.IncrementRemark && (this.orderlist.IncrementFee || this.orderlist
						.IncrementFee >= 0)) || (this.orderlist.DeliveryAmount && this.orderlist
						.DeliveryAmount >
						0) || this.orderlist.LunchBoxPrice && this.orderlist.LunchBoxPrice > 0) {

					printerJobs.print()
					if (this.orderlist.IncrementRemark && (this.orderlist.IncrementFee || this.orderlist
							.IncrementFee >= 0)) {
						printerJobs.print('附加费:' + (this.orderlist.IncrementRemark + '' + (this.orderlist
							.IncrementFee ? this.orderlist.IncrementFee : '0')) + '元')
					}
					if (this.orderlist.DeliveryAmount && this.orderlist.DeliveryAmount > 0) {
						printerJobs.print('配送费:' + this.orderlist.DeliveryAmount + '元')
					}
					if (this.orderlist.LunchBoxPrice && this.orderlist.LunchBoxPrice > 0) {
						printerJobs.print('餐盒费:' + this.orderlist.LunchBoxPrice + '元')
					}
				}
				printerJobs.print()

				if (this.orderlist.ShopBalanceAmount && this.orderlist.ShopBalanceAmount > 0 && this.orderlist
					.getEntrance && this.orderlist.getEntrance == 'groupbuy') {
					printerJobs.print('【商户价：' + this.orderlist.ShopBalanceAmount + '元】')
				} else {
					printerJobs.print('合计:' + (this.orderlist.FactPayAmount ? this.orderlist.FactPayAmount :
						'无'))
				}
				printerJobs.print('')
				printerJobs.setSize(1, 1)
					.print('支付类型:' + (this.orderlist.PayType == 'online' ? '在线支付' : '货到付款'))
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

			call() {
				let phoneNumber = this.orderlist.Telephone
				console.log(phoneNumber, "**********");
				uni.makePhoneCall({
					phoneNumber: '13878912260'
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import url('@/pages/order/order-detail.css');
</style>
