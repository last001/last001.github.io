const PrinterJobs = require('@/utils/printerjobs.js');
const printerUtil = require('@/utils/printerutil.js');

import app from '../App.vue';

function bluetoothDevice(entity) {

  uni.setStorageSync('orderInfo', entity);
  var bluetoothDevice = uni.getStorageSync('bluetoothDevice');
  getShopPrinters(function (res) {
    if (bluetoothDevice && bluetoothDevice.Status == '1' && !res) {
      if (bluetoothDevice && bluetoothDevice.Id) {
        getBLEDeviceServices(bluetoothDevice.Id);
      }
    } else {
      uni.showModal({
        title: '打印发送失败',
        content: '打印失败！',
        success: function (res) {}
      })
    }
  })
}

function getShopPrinters(cb) {
  let flag = false;
  app.invoke("getShopPrinters", [app.curShop.Id], function (data) {
    if (data.RetCode == "000000") {
      for (var i in data.Result) {
        if (data.Result[i].PrintStatus != '离线' && data.Result[i].Status == '1') {
          flag = true;
          break;
        }
      };
      typeof cb == "function" && cb(flag)
    } else {
      typeof cb == "function" && cb(flag)
    }
  })
}


//获取蓝牙设备所有服务
function getBLEDeviceServices(deviceId) {
  uni.getBLEDeviceServices({
    deviceId,
    success: (res) => {
      if (res.errCode == 0) {
        for (let i = 0; i < res.services.length; i++) {
          if (res.services[i].isPrimary) {
            getBLEDeviceCharacteristics(deviceId, res.services[i].uuid)
            return
          }
        }
      } else {
        uni.showModal({
          title: '打印发送失败',
          content: '蓝牙连接异常！',
          success: function (res) {}
        })
      }
    },
    fail: (res) => {
      uni.showModal({
        title: '打印发送失败',
        content: '蓝牙连接异常！',
        success: function (res) {}
      })
    }
  })
}
//获取蓝牙设备某个服务中所有特征值
function getBLEDeviceCharacteristics(deviceId, serviceId) {
  var that = this;
  uni.getBLEDeviceCharacteristics({
    deviceId,
    serviceId,
    success: (res) => {
      if (res.errCode == 0) {
        console.log('getBLEDeviceCharacteristics success', res.characteristics)
        for (let i = 0; i < res.characteristics.length; i++) {
          let item = res.characteristics[i]
          if (item.properties.read) {
            //读取低功耗蓝牙设备的特征值的二进制数据值
            uni.readBLECharacteristicValue({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
            })
          }
          if (item.properties.write) {
            uni.setStorageSync('characteristic', {
              deviceId,
              serviceId,
              characteristicId: item.uuid
            });
            printBluetooth();
          }
          if (item.properties.notify || item.properties.indicate) {
            uni.notifyBLECharacteristicValueChange({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
              state: true,
            })
          }
        }
      } else {
        uni.showModal({
          title: '打印发送失败',
          content: '蓝牙连接异常！',
          success: function (res) {}
        })

      }
    },
    fail(res) {
      uni.showModal({
        title: '打印发送失败',
        content: '蓝牙连接异常！',
        success: function (res) {}
      })
      console.error('getBLEDeviceCharacteristics', res)
    }
  })
}
// 向蓝牙设备发送一个0x00的16进制数据
function printBluetooth() {
  var entity = uni.getStorageSync('orderInfo');
  if (!entity) return;
  let printerJobs = new PrinterJobs();
  var title = '';
  if (entity.AppId == '1mapp') {
    title = '一米校园生活';
  } else if (entity.AppId == 'xdd') {
    title = '校点达';
  } else if (entity.AddressDistrictId && entity.AddressDistrictId == '401') {
    title = '食在广轻';
  }
  if (entity.Source && entity.Source == 'inshop') {
    title += '[专店]'
  };
  if (entity.OrderType == '1') {
    var deliveryTypeName = '';
    var senTypeName = '送达';
    if (entity.Status == 'Cancel') {
      deliveryTypeName == '[已取消]'
    } else {
      deliveryTypeName = entity.PayType == 'cod' ? '[未支付]' : '[已支付]';
    };

    deliveryTypeName += '(外卖)'
    if (entity.DeliveryType && entity.DeliveryType == 'instore') {
      deliveryTypeName += '(堂食)'
    };

    if (entity.DeliveryType != null && entity.DeliveryType == 'takeout' && entity.IsSelfFetch && entity.IsSelfFetch == '1') {
      deliveryTypeName = '【顾客到店自取】' + (entity.EatingWay && entity.EatingWay == 'forhere' ? '到店吃' : '打包');
      senTypeName = '自取';
    };
    if (entity.SendType && entity.SendType == 'schedule' && entity.SendTime && entity.SendTime.length >= 16) {
      senTypeName = '预约' + entity.SendTime + senTypeName
    };
    printerJobs
      .println()
      .setAlign('ct')
      .print('*****' + title + '*****')
      .setSize(1, 1)
      .print('')
      .setSize(2, 2)
      .print(entity.ShopName)
      .setSize(1, 1)
      .print('')
      .setSize(2, 2)
      .print(deliveryTypeName)
    if (entity.SendType && entity.SendType == 'schedule' && entity.SendTime && entity.SendTime.length >= 16) {
      printerJobs
        .setSize(1, 1)
        .print('')
        .print(senTypeName)
    }
    printerJobs
      .setAlign('lt')
      .setSize(1, 1)
      .print('')
      .print('下单时间:' + entity.OrderDate)
      .print('订单编号:' + (entity.PrintNo ? entity.PrintNo : '无'))
      .print('顾客名称:' + (entity.LinkMan ? entity.LinkMan : '匿名') + '【下单次数' + entity.OrderTimes + '】')
      .setSize(2, 2)
      .print('电话:' + (entity.Telephone ? entity.Telephone : 'null'))
      .setSize(1, 1)
    if (entity.Remark) {
      printerJobs.print('备注:' + entity.Remark)
    }
    if (entity.IsSelfFetch != '1' || !entity.IsSelfFetch) {
      printerJobs.setSize(2, 2)
        .print('送货地点:' + (entity.Address ? entity.Address : 'null'))
        .setSize(1, 1)
    }
    printerJobs.print(printerUtil.fillLine())
    for (var x in entity.OrderDetailList) {
      printerJobs.print(printerUtil.inline((entity.OrderDetailList[x].ProductAllName + ' * ' + entity.OrderDetailList[x].OrderCount), entity.OrderDetailList[x].OrderAmount.toString()))
    }
    if (entity.OrderBenefitList && entity.OrderBenefitList.length > 0) {
      printerJobs.print(printerUtil.fillLine())
      for (var y in entity.OrderBenefitList) {
        if (entity.OrderBenefitList[y].BenefitType == 'FullCut') {
          printerJobs.print('满减优惠：-' + entity.OrderBenefitList[y].BenefitAmount + '元')
        } else if (entity.OrderBenefitList[y].BenefitType == 'FullSent') {
          printerJobs.print('满送优惠：' + entity.OrderBenefitList[y].BenefitContent)
        } else if (entity.OrderBenefitList[y].BenefitType == 'FirstCut') {
          if (entity.OrderBenefitList[y].BenefitContent && entity.OrderBenefitList[y].BenefitContent.startsWith("门店")) {
            printerJobs.print('门店新用户优惠：-' + entity.OrderBenefitList[y].BenefitAmount)
          } else {
            printerJobs.print('平台新用户优惠：-' + entity.OrderBenefitList[y].BenefitAmount)
          }
        } else if (entity.OrderBenefitList[y].BenefitType == 'Coupon') {
          printerJobs.print('商家优惠劵：-' + entity.OrderBenefitList[y].BenefitAmount)
        } else if (entity.OrderBenefitList[y].BenefitType == 'PtCoupon') {
          printerJobs.print('商家优惠劵：-' + entity.OrderBenefitList[y].BenefitAmount)
        } else if (entity.OrderBenefitList[y].BenefitType == 'vipcoupon') {
          printerJobs.print('会员红包：-' + entity.OrderBenefitList[y].BenefitAmount)
        }
      }
    }
    if ((entity.IncrementRemark && (entity.IncrementFee || entity.IncrementFee >= 0)) || (entity.DeliveryAmount && entity.DeliveryAmount > 0) || entity.LunchBoxPrice && entity.LunchBoxPrice > 0) {

      printerJobs.print(printerUtil.fillLine())
      if (entity.IncrementRemark && (entity.IncrementFee || entity.IncrementFee >= 0)) {
        printerJobs.print('附加费:' + (entity.IncrementRemark + '' + (entity.IncrementFee ? entity.IncrementFee : '0')) + '元')
      }
      if (entity.DeliveryAmount && entity.DeliveryAmount > 0) {
        printerJobs.print('配送费:' + entity.DeliveryAmount + '元')
      }
      if (entity.LunchBoxPrice && entity.LunchBoxPrice > 0) {
        printerJobs.print('餐盒费:' + entity.LunchBoxPrice + '元')
      }
    }
    printerJobs.print(printerUtil.fillLine())

    if (entity.ShopBalanceAmount && entity.ShopBalanceAmount > 0 && entity.getEntrance && entity.getEntrance == 'groupbuy') {
      printerJobs.print('【商户价：' + entity.ShopBalanceAmount + '元】')
    } else {
      printerJobs.print('合计:' + (entity.FactPayAmount ? entity.FactPayAmount : '无'))
    }
    printerJobs
      .print('支付类型:' + (entity.PayType == 'online' ? '在线支付' : '货到付款'))
      .println()
      .println()
      .println();
  } else if (entity.OrderType == '2') {
    //代拿
    printerJobs
      .println()
      .setAlign('ct')
      .print('*****' + title + '*****')
      .setSize(1, 1)
      .print('')
      .setSize(2, 2)
      .print(entity.ShopName + '（代拿）')
      .setAlign('lt')
      .setSize(1, 1)
      .print('')
      .print('下单时间:' + entity.OrderDate)
      .print('订单编号:' + (entity.PrintNo ? entity.PrintNo : '无'))
      .print('顾客名称:' + (entity.LinkMan ? entity.LinkMan : '匿名') + '【下单次数' + entity.OrderTimes + '】')
      .print('联系电话:' + (entity.Telephone ? entity.Telephone : 'null'))
      .print('快递公司:' + (entity.ExpressCorpName ? entity.ExpressCorpName : entity.ExpressCorpId))
      .print('取件信息:' + (entity.FetchMessage ? entity.FetchMessage : 'null'))
      .print('配送时间:' + (entity.DevileryTime ? entity.DevileryTime : 'null'))
    if (entity.IncrementRemark && (entity.IncrementFee || entity.IncrementFee >= 0)) {
      printerJobs
        .print(printerUtil.fillLine())
        .print('服务项目:' + entity.IncrementRemark)
    }
    printerJobs
      .print(printerUtil.fillLine())
      .print('合计:' + (entity.FactPayAmount ? entity.FactPayAmount : '无'))
  } else if (entity.OrderType == '3') {
    //代寄
    printerJobs
      .println()
      .setAlign('ct')
      .print('*****' + title + '*****')
      .setSize(1, 1)
      .print('')
      .setSize(2, 2)
      .print(entity.ShopName + '（代寄）')
      .setAlign('lt')
      .setSize(1, 1)
      .print('')
      .print('下单时间:' + entity.OrderDate)
      .print('订单编号:' + (entity.PrintNo ? entity.PrintNo : '无'))
      .print('顾客名称:' + (entity.LinkMan ? entity.LinkMan : '匿名') + '【下单次数' + entity.OrderTimes + '】')
      .print('联系电话:' + (entity.Telephone ? entity.Telephone : 'null'))
      .print('快递公司:' + (entity.ExpressCorpName ? entity.ExpressCorpName : entity.ExpressCorpId))
      .print('取件信息:' + (entity.LinkMan + ' ' + entity.Telephone + ' ' + entity.Address))
      .print('收件信息:' + (entity.AcceptLinkman + ' ' + entity.AcceptTelephone + ' ' + entity.AcceptAddress))
    if (entity.Remark) {
      printerJobs.print('备注:' + entity.Remark)
    }
    if (entity.IncrementRemark && (entity.IncrementFee || entity.IncrementFee >= 0)) {
      printerJobs
        .print(printerUtil.fillLine())
        .print('服务项目:' + entity.IncrementRemark)
    }
    printerJobs
      .print(printerUtil.fillLine())
      .print('合计:' + (entity.FactPayAmount ? entity.FactPayAmount : '无'))
  }

  let buffer = printerJobs.buffer();
  // 1.并行调用多次会存在写失败的可能性
  // 2.建议每次写入不超过20字节
  // 分包处理，延时调用
  const maxChunk = 20;
  const delay = 20;
  for (let i = 0, j = 0, length = buffer.byteLength; i < length; i += maxChunk, j++) {
    let subPackage = buffer.slice(i, i + maxChunk <= length ? (i + maxChunk) : length);
    setTimeout(writeBLECharacteristicValue, j * delay, subPackage);
  }
}

function writeBLECharacteristicValue(buffer) {
  var characteristic = uni.getStorageSync('characteristic');
  uni.writeBLECharacteristicValue({
    deviceId: characteristic.deviceId,
    serviceId: characteristic.serviceId,
    characteristicId: characteristic.characteristicId,
    value: buffer,
    success(res) {
      console.log('writeBLECharacteristicValue success', res)
    },
    fail(res) {
      console.log('writeBLECharacteristicValue fail', res)
    }
  })
  uni.removeStorageSync('orderInfo');
}
module.exports = {
  bluetoothDevice: bluetoothDevice
};