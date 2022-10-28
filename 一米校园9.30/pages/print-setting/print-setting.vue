<template>
	<view>
		<view class="item">
			<text class="tit">打印机名称:</text>
			<view class="txt">
				<input name="Name" :value="entity.Name ? entity.Name:''" placeholder="请输入打印机名称" @blur="handler" data-command="Name" />
			</view>
		</view>
		<view class="item">
			<text class="tit">打印机类型:</text>
			<picker @change="changeList" :value="pickerNum" range-key="Name" :range="printList">
				<view class="tit">{{printList[pickerNum].Name}}</view>
			</picker>
		</view>
		<view class="item">
			<text class="tit">打印机品牌:</text>
			<view class="txt">
				<input name="Brand" :value="entity.Brand ? entity.Brand:''" placeholder="请输入打印机品牌" />
			</view>
		</view>
		<view class="item">
			<text class="tit">打印机型号:</text>
			<view class="txt">
				<input name="Model" :value="entity.Model ? entity.Model:''" placeholder="请输入打印机型号" />
			</view>
		</view>
		<view class="item">
			<text class="tit">打印机地址:</text>
			<view class="txt">
				<input name="ServerIp" :value="entity.ServerIp ? entity.ServerIp:''" placeholder="请输入打印机地址" />
			</view>
		</view>
		<view class="item">
			<text class="tit">打印机SN:</text>
			<view class="txt">
				<input name="PrinterSn" :value="entity.PrinterSn ? entity.PrinterSn:''" placeholder="请输入打印机SN" @blur="handler" data-command="PrinterSn" />
			</view>
		</view>
		<view class="item">
			<text class="tit">云打印机Key:</text>
			<view class="txt">
				<input name="PrinterKey" :value="entity.PrinterKey ? entity.PrinterKey:''" placeholder="云打印机Key" @blur="handler" data-command="PrinterKey" />
			</view>
		</view>
		<view class="item">
			<text class="tit">外卖打印联数:</text>
			<view class="txt">
				<input name="TakeoutPrintTimes" :value="entity.TakeoutPrintTimes ? entity.TakeoutPrintTimes :1"
					placeholder="外卖打印联数" @blur="handler" data-command="TakeoutPrintTimes" />
			</view>
		</view>
		<view class="item">
			<text class="tit">堂食打印联数:</text>
			<view class="txt">
				<input name="InstorePrintTimes" :value="entity.InstorePrintTimes ? entity.InstorePrintTimes :1"
					placeholder="堂食打印联数" @blur="handler" data-command="TakeoutPrintTimes" />
			</view>
		</view>
		<view class="item">
			<text class="tit">是否启用:</text>
			<switch :checked="entity.Status=='1'" @change="changeSwitch"></switch>
		</view>
		<view class="btn-wrap">
			<view class="btn" @click="submit">提交</view>
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
				printList: [{
					Name: ''
				}],
				pickerNum: 0,
				entity: {
					Id: '',
					ShopId: '',
					Name: '',
					PrinterType: '',
					Brand: '',
					Model: '',
					ServerIp: '',
					PrinterSn: '',
					PrinterKey: '',
					TakeoutPrintTimes: '',
					InstorePrintTimes: '',
					Status: '0'
				}
			}
		},
		methods: {
			getPrintBrandInfo(cb) {
				let interface_code = 'getPrintBrandInfos';
				let interface_parameters = [];
				$post('/oauth2/resources', {
					interface_code,
					interface_parameters,
				}).then(data => {
					if (data.RetCode == "000000") {
						typeof cb == "function" && cb(data.Result)
					} else {
						let print = [{
							rand: "飞鹅",
							Editable: true,
							Filter: null,
							Id: "1",
							InterestId: null,
							Model: "FP-58G",
							Name: "飞鹅4G小票打印机",
							PrinterType: "2",
							ReferenceFlag: "0",
							RowState: "Added",
							SerialNo: 1,
							ServerIp: "dzp.feieyun.com",
							ShareId: null
						}, {
							rand: "飞鹅",
							Editable: true,
							Filter: null,
							Id: "3",
							InterestId: null,
							Model: "FP-58W",
							Name: "飞鹅WIFI小票打印机",
							PrinterType: "1",
							ReferenceFlag: "0",
							RowState: "Added",
							SerialNo: 1,
							ServerIp: "dzp.feieyun.com",
							ShareId: null
						}, {
							Brand: "飞鹅",
							Editable: true,
							Filter: null,
							Id: "2",
							InterestId: null,
							Model: "FP-N20W",
							Name: "飞鹅标签打印机",
							PrinterType: "3",
							ReferenceFlag: "0",
							RowState: "Added",
							SerialNo: 2,
							ServerIp: "http://api.feieyun.cn/Api/Open/",
							ShareId: nul
						}, {
							Brand: "芯烨",
							Editable: true,
							Filter: null,
							Id: "4",
							InterestId: null,
							Model: "XP-T58H",
							Name: "芯烨4G小票打印机",
							PrinterType: "4",
							ReferenceFlag: "0",
							RowState: "Added",
							SerialNo: 4,
							ServerIp: "https://open.xpyun.net/api/openapi",
							ShareId: null
						}, {
							Brand: "芯烨",
							Editable: true,
							Filter: null,
							Id: "5",
							InterestId: null,
							Model: "XP-T58H",
							Name: "芯烨WIFI小票打印机",
							PrinterType: "5",
							ReferenceFlag: "0",
							RowState: "Added",
							SerialNo: 5,
							ServerIp: "https://open.xpyun.net/api/openapi",
							ShareId: null
						}]
						typeof cb == "function" && cb(print)
					}


				})
			},
			changeList(e) {
				let that = this
				that.pickerNum = e.detail.value
				that.entity.PrinterType = that.printList[that.pickerNum].PrinterType;
				that.entity.Brand = that.printList[that.pickerNum].Brand;
				that.entity.Model = that.printList[that.pickerNum].Model;
				that.entity.ServerIp = that.printList[that.pickerNum].ServerIp;
			},
			handler(e) {
				let that = this
				that.entity[e.currentTarget.dataset.command] = e.detail.value
			},
			changeSwitch(e) {
				let that = this
				that.entity.Status = e.detail.value ? '1' : '0'
				console.log(that.entity.Status)
			},
			submit() {
				var that = this
				that.entity.Brand = that.printList[that.pickerNum].Brand
				that.entity.Model = that.printList[that.pickerNum].Model
				that.entity.ServerIp = that.printList[that.pickerNum].ServerIp
				that.entity.PrinterType = that.printList[that.pickerNum].PrinterType
				that.entity.TakeoutPrintTimes = that.entity.TakeoutPrintTimes ? that.entity.TakeoutPrintTimes : 1
				that.entity.InstorePrintTimes = that.entity.InstorePrintTimes ? that.entity.InstorePrintTimes : 1
				console.log(that.entity)
				if (that.checkIsCanUpdate(that.entity)) {
					let interface_code = 'updateShopPrinterForWx';
					let interface_parameters = obj2str([that.entity]);
					$post('/oauth2/resources', {
						interface_code,
						interface_parameters,
					}).then(data => {
						if (data.RetCode == "000000") {
							uni.showToast({
								title: "操作成功",
								icon: 'success',
								duration: 1000
							})
							uni.navigateBack()
						} else {
							uni.showModal({
								title: '操作失败',
								content: data.Result
							})
						}
					})
				}
			},
			checkIsCanUpdate(entity) {
				if (!entity.Name) {
					util.showMessage("打印机名称不能为空")
					return false;
				}
				if (!entity.PrinterSn) {
					util.showMessage("打印机SN不能为空")
					return false;
				}
				if (!entity.PrinterKey) {
					util.showMessage("打印机Key不能为空")
					return false;
				}
				return true;
			},
			getPrinterInfo(PrintId) {
                var that = this
				let interface_code = 'getPrinterInfo';
				let interface_parameters = obj2str([PrintId]);
				$post('/oauth2/resources', {
						interface_code,
						interface_parameters,
					}).then(data => {
						if (data.RetCode == "000000") {
							that.entity = data.Result
							for(var i in that.printList){
								if(that.printList[i].Model == data.Result.Model){
									that.pickerNum = i
								}
							}
							console.log(that.entity)
						}
					})
			},
		},
		onLoad(options) {
			var that = this
			if (options && options.ShopId) {
				that.entity.ShopId = options.ShopId
			}
			that.getPrintBrandInfo(function(data) {
				that.printList = data
				if (options.PrintId) {
					that.getPrinterInfo(options.PrintId);
				} else {
					that.pickerNum = 0
					that.entity.PrinterType = that.printList[that.pickerNum].PrinterType;
					that.entity.Brand = that.printList[that.pickerNum].Brand;
					that.entity.Model = that.printList[that.pickerNum].Model;
					that.entity.ServerIp = that.printList[that.pickerNum].ServerIp;
				}
			})
		},

	}
</script>

<style>
	.item {
		height: 90rpx;
		width: 100%;
		padding-left: 20rpx;
		padding-right: 20rpx;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #efeff4;
	}

	.tit {
		flex-shrink: 0;
		padding-right: 10rpx;
	}

	.txt {
		height: 40rpx;
	}

	.sel {
		border-bottom: 2px solid #05c0ab;
	}

	.btn-wrap {
		margin-top: 60rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
	}

	.btn {
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #05c0ab;
		color: white;
	}
</style>
