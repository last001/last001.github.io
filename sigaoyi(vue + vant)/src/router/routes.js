export const routes = [{
    path: '/login',
    name: 'Login',
    component: () => import('../view/Login.vue')
  },
  {
    path: '/logo',
    name: 'Logo',
    redirect: "logo/home",
    component: () => import('../view/Logo.vue'),
    children: [{
        path: 'home',
        name: 'Home',
        component: () => import('../view/logo/Home.vue'),
        meta: {
          keepAlive: false,
          isBack: true,
        }
      },
      {
        path: 'commodity',
        name: 'Commodity',
        component: () => import('../view/logo/Commodity.vue'),
        meta: {
          keepAlive: true,
          isBack: true,
        }
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('../view/logo/Order.vue'),
        meta: {
          keepAlive: true,
          isBack: true,
        }
      },
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('../view/logo/Setting.vue'),
        meta: {
          keepAlive: false,
          isBack: true,
        }
      },
      {
        path: 'my',
        name: 'My',
        component: () => import('../view/logo/My.vue')
      },
    ]
  },
  {
    path: '/productDetails',
    name: 'ProductDetails',
    component: () => import('../view/ProductDetails.vue'),
    meta: {
      keepAlive: true,
      isBack: true,
    }
  },
  {
    path: '/changetable',
    name: 'Changetable',
    component: () => import('../view/Changetable.vue'),
  },
  {
    path: '/publish',
    name: 'Publish',
    component: () => import('../view/Publish.vue'),
  },
  {
    path: '/changeProduct',
    name: 'ChangeProduct',
    component: () => import('../view/logo/ChangeProduct.vue'),
  },
  {
    path: '/videoTeaching',
    name: 'VideoTeaching',
    component: () => import('../view/VideoTeaching.vue')
  },
  {
    path: '/qecode',
    name: 'Qecode',
    component: () => import('../view/Qecode.vue')
  },
  {
    path: '/documentFile',
    name: 'DocumentFile',
    component: () => import('../view/DocumentFile.vue')
  },
  {
    path: '/webSrc',
    name: 'WebSrc',
    component: () => import('../view/WebSrc.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../view/logo/my/Account.vue')
  },
  {
    path: '/personalInfo',
    name: 'PersonalInfo',
    component: () => import('../view/logo/my/PersonalInfo.vue')
  },
  {
    path: '/adress',
    name: 'Adress',
    component: () => import('../view/logo/my/Adress.vue')
  },
  {
    path: '/checkUpdate',
    name: 'CheckUpdate',
    component: () => import('../view/logo/my/CheckUpdate.vue')
  },
  
  {
    path: '/feedback',
    name: 'Feedback',
    component: () => import('../view/logo/my/Feedback.vue')
  },
  {
    path: '/notice',
    name: 'Notice',
    component: () => import('../view/logo/my/Notice.vue'),
    meta: {
      keepAlive: true,
      isBack: true,
    }
  },
  {
    path: '/noticeDetail',
    name: 'NoticeDetail',
    component: () => import('../view/logo/my/notice/NoticeDetail.vue')
  },
  {
    path: '/publishNotice',
    name: 'PublishNotice',
    component: () => import('../view/logo/my/notice/publishNotice.vue')
  },

  {
    path: '/addressEdit',
    name: 'AddressEdit',
    component: () => import('../view/logo/my/adress/AddressEdit.vue')
  },
  {
    path: '/rechargeWithdraw',
    name: 'RechargeWithdraw',
    component: () => import('../view/logo/my/RechargeWithdraw.vue'),
    meta: {
      keepAlive: true,
      isBack: true,
    }
  },
  {
    path: '/balance',
    name: 'Balance',
    component: () => import('../view/logo/my/balance.vue'),
  },
  {
    path: '/statisMoney',
    name: 'StatisMoney',
    component: () => import('../view/logo/my/rechargeWithdraw/StatisMoney.vue')
  },
  {
    path: '/consumptionDetail',
    name: 'ConsumptionDetail',
    component: () => import('../view/logo/my/rechargeWithdraw/consumptionDetail/ConsumptionDetail.vue'),
  },
  {
    path: '/recharge',
    name: 'Recharge',
    component: () => import('../view/logo/my/rechargeWithdraw/Recharge.vue')
  },
  {
    path: '/withdraw',
    name: 'Withdraw',
    component: () => import('../view/logo/my/rechargeWithdraw/Withdraw.vue')
  },
  {
    path: '/withdrawDeailt',
    name: 'WithdrawDeailt',
    component: () => import('../view/logo/my/rechargeWithdraw/withdraw/WithdrawDeailt.vue')
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('../view/logo/home/Product.vue')
  },
  {
    path: '/addOrder',
    name: 'AddOrder',
    component: () => import('../view/logo/home/addOrder.vue')
  },
  {
    path: '/storeShop',
    name: 'StoreShop',
    component: () => import('../view/logo/home/StoreShop.vue'),
    meta: {
      keepAlive: true,
      isBack: true,
    }
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import('../view/logo/home/Statistics.vue')
  },
  {
    path: '/staff',
    name: 'Staff',
    component: () => import('../view/logo/home/Staff.vue')
  },
  {
    path: '/stock',
    name: 'Stock',
    component: () => import('../view/logo/home/stock.vue'),
    meta: {
      keepAlive: true,
      isBack: true,
    }
  },
  {
    path: '/changeStock',
    name: 'ChangeStock',
    component: () => import('../view/logo/home/ChangeStock.vue')
  },
  {
    path: '/toStock',
    name: 'ToStock',
    component: () => import('../view/logo/home/toStock.vue')
  },
  // 采集
  {
    path: '/collection',
    name: 'Collection',
    component: () => import('../view/logo/home/Collection.vue')
  },
  {
    path: '/staffDetails',
    name: 'StaffDetails',
    component: () => import('../view/logo/home/staff/StaffDetails.vue')
  },
  {
    path: '/staffDetailsInfo',
    name: 'StaffDetailsInfo',
    component: () => import('../view/logo/home/staff/StaffDetailsInfo.vue')
  },
  // 添加员工
  {
    path: '/addStaff',
    name: 'AddStaff',
    component: () => import('../view/logo/home/staff/AddStaff.vue')
  },
  {
    path: '/shopInfo',
    name: 'ShopInfo',
    component: () => import('../view/logo/home/storeShop/ShopInfo.vue')
  },
  {
    path: '/putaway',
    name: 'Putaway',
    component: () => import('../view/logo/home/product/Putaway.vue')
  },
  {
    path: '/orderDetails',
    name: 'OrderDetails',
    component: () => import('../view/logo/order/OrderDetails.vue')
  },
  {
    path: '/changeState',
    name: 'ChangeState',
    component: () => import('../view/logo/order/ChangeState.vue')
  },

  // 重定向
  {
    path: '*',
    redirect: {
      name: 'Login'
    }
  }
]
