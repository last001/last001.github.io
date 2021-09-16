// import HelloWorld from '@/components/HelloWorld'
export const routes = [
  // 登陆
  {
    path: '/login',
    name: 'Login',
    component: () => import('../view/Login.vue')
  },
  // 推荐人
  {
    path: '/references',
    name: 'References',
    component: () => import('../view/References.vue')
  },
  {
    path: '/ceshi',
    name: 'Ceshi',
    component: () => import('../view/Ceshi.vue')
  },
  // 主页
  {
    path: '/home',
    name: 'Home',
    component: () => import('../view/Home.vue'),
  },
  // 商品详情
  {
    path: '/productDetails',
    name: 'ProductDetails',
    component: () => import('../view/ProductDetails.vue')
  },
  // 产品管理 
  {
    path: '/products',
    name: 'Products',
    redirect: "/products/productDevelopment",
    component: () => import('../view/products/Products.vue'),
    meta:{
      keepAlive:false,
      isBack:false,
    },
    children: [
      {
        path: 'productControl',
        name: 'ProductControl',
        component: () => import('../view/products/ProductControl.vue'),
        meta:{
          keepAlive:true,
          isBack:false,
        }
      },
      {
        path: 'productDevelopment',
        name: 'ProductDevelopment',
        component: () => import('../view/products/ProductDevelopment.vue'),
        meta:{
          keepAlive:false,
          isBack:false,
        },
      },
    ]
  },
  // 产品订单
  {
    path: '/productOrder',
    name: 'ProductOrder',
    redirect: "/productOrder/productOrderDefault",
    component: () => import('../view/products/ProductOrder.vue'),
    meta:{
      keepAlive:false,
      isBack:false,
    },
    children: [
      {
        path: 'productOrderDefault',
        name: 'ProductOrderDefault',
        component: () => import('../view/products/productOrder/ProductOrderDefault.vue'),
        meta:{
          keepAlive:true,
          isBack:false,
        },
      },
      {
        path: 'orderDetail',
        name: 'OrderDetail',
        component: () => import('../view/products/productOrder/OrderDetail.vue'),
        meta:{
          keepAlive:false,
          isBack:false,
        },
      },
    ]
  },
  // 库存管理
  {
    path: '/purchaSellStock',
    name: 'PurchaSellStock',
    redirect: "/purchaSellStock/purchaseList",
    component: () => import('../view/products/PurchaSellStock.vue'),
    meta:{
      keepAlive:false,
      isBack:false,
    },
    children: [{
        path: 'purchaseList',
        name: 'PurchaseList',
        component: () => import('../view/products/purchaSellStock/purchaseList/PurchaseList.vue'),
        meta:{
          keepAlive:true,
          isBack:false,
        },
      },
      {
        path: 'record',
        name: 'Record',
        component: () => import('../view/products/purchaSellStock/record/Record.vue'),
      },
      {
        path: 'godown',
        name: 'Godown',
        component: () => import('../view/products/purchaSellStock/godown/Godown.vue'),
      },
      {
        path: 'purchaseCompileDefault',
        name: 'PurchaseCompileDefault',
        component: () => import('../view/products/purchaSellStock/purchaseCompileDefault/PurchaseCompileDefault.vue'),
      },
    ]
  },
  // 店铺管理
  {
    path: '/shop',
    name: 'Shop',
    redirect: '/shop/authorization',
    component: () => import('../view/shop/Shop.vue'),
    meta:{
      keepAlive:false,
      isBack:false,
    },
    children: [{
      path: 'authorization',
      name: 'Authorization',
      component: () => import('../view/shop/Authorization.vue'),
      meta:{
        keepAlive:false,
        isBack:false,
      },
    }, ]
  },
  // 公司管理
  {
    path: '/companyParent',
    name: 'CompanyParent',
    component: () => import('../view/company/CompanyParent.vue'),
    meta:{
      keepAlive:false,
      isBack:false,
    },
    children: [{
        path: 'companyMange',
        name: 'CompanyMange',
        component: () => import('../view/company/CompanyMange.vue')
      },
      {
        path: 'performance',
        name: 'Performance',
        redirect: "performance/performanceDefault",
        component: () => import('../view/company/Performance.vue'),
        children: [{
            path: 'performanceDefault',
            name: 'PerformanceDefault',
            component: () => import('../view/company/Performance/PerformanceDefault.vue')
          },
          {
            path: 'department',
            name: 'Department',
            component: () => import('../view/company/Performance/Department.vue')
          },
          {
            path: 'staffInfo',
            name: 'StaffInfo',
            component: () => import('../view/company/Performance/StaffInfo.vue')
          },
        ]
      },
      {
        path: 'divisional',
        name: 'Divisional',
        component: () => import('../view/company/Divisional.vue'),
      },
      {
        path: 'staffManagement',
        name: 'StaffManagement',
        redirect: "staffManagement/staffManagementDefault",
        component: () => import('../view/company/StaffManagement.vue'),
        children: [{
            path: 'staffManagementDefault',
            name: 'StaffManagementDefault',
            component: () => import('../view/company/staffManagement/StaffManagementDefault.vue'),
          },
          {
            path: 'staffManagementEditor',
            name: 'StaffManagementEditor',
            component: () => import('../view/company/staffManagement/StaffManagementEditor.vue')
          },
        ]
      },
      {
        path: 'workScheduling',
        name: 'WorkScheduling',
        redirect: "workScheduling/workDeault",
        component: () => import('../view/company/WorkScheduling.vue'),
        children: [{
            path: 'workDeault',
            name: 'WorkDeault',
            component: () => import('../view/company/WorkScheduling/WorkDeault.vue')
          },
          {
            path: 'workEdit',
            name: 'WorkEdit',
            component: () => import('../view/company/WorkScheduling/WorkEdit.vue')
          },
        ]
      },
    ]
  },
  // 财务管理
  {
    path: '/financeList',
    name: 'FinanceList',
    redirect: '/financeList/rechargeWidthdraw',
    component: () => import('../view/consumption/FinanceList.vue'),
    children: [{
        path: 'consumptionDetail',
        name: 'ConsumptionDetail',
        component: () => import('../view/consumption/ConsumptionDetail.vue')
      },
      {
        path: 'rechargeWidthdraw',
        name: 'RechargeWidthdraw',
        component: () => import('../view/consumption/RechargeWidthdraw.vue')
      },
      {
        path: 'staffCommission',
        name: 'StaffCommission',
        component: () => import('../view/consumption/StaffCommission.vue')
      },
    ]
  },
  // 帮助教学
  {
    path: '/help',
    name: 'Help',
    redirect: '/help/tutorialDocument',
    component: () => import('../view/heplecourse/Help.vue'),
    children: [{
        path: 'tutorialDocument',
        name: 'TutorialDocument',
        component: () => import('../view/heplecourse/TutorialDocument.vue')
      },
      {
        path: 'videoCourse',
        name: 'VideoCourse',
        component: () => import('../view/heplecourse/VideoCourse.vue')
      },
    ]
  },
  // 系统管理
  {
    path: '/system',
    name: 'System',
    redirect: "/system/userInfo",
    component: () => import('../view/system/System.vue'),
    children: [{
        path: 'financetor',
        name: 'Financetor',
        component: () => import('../view/system/Financetor.vue')
      },
      {
        path: 'accountAccept',
        name: 'AccountAccept',
        redirect: "accountAccept/accountAcceptDefault",
        component: () => import('../view/system/AccountAccept.vue'),
        children: [{
            path: 'accountAcceptDefault',
            name: 'AccountAcceptDefault',
            component: () => import('../view/system/accountAccept/AccountAcceptDefault.vue')
          },
          {
            path: 'personalEditor',
            name: 'PersonalEditor',
            component: () => import('../view/system/accountAccept/PersonalEditor.vue')
          },
        ]
      },
      {
        path: 'loginRecord',
        name: 'LoginRecord',
        component: () => import('../view/system/LoginRecord.vue')
      },
      {
        path: 'customerFollow',
        name: 'CustomerFollow',
        redirect: "customerFollow/customerFollowDefault",
        component: () => import('../view/system/CustomerFollow.vue'),
        children: [{
            path: 'customerFollowDefault',
            name: 'CustomerFollowDefault',
            component: () => import('../view/system/customerFollow/CustomerFollowDefault.vue')
          },
          {
            path: 'scheduleNumber',
            name: 'ScheduleNumber',
            component: () => import('../view/system/customerFollow/ScheduleNumber.vue')
          },
        ]
      },
      {
        path: 'userInfo',
        name: 'UserInfo',
        component: () => import('../view/system/UserInfo.vue')
      },
      {
        path: 'notice',
        name: 'Notice',
        component: () => import('../view/system/Notice.vue')
      },
    ],
  },
  // 其他功能
  {
    path: '/other',
    name: 'Other',
    redirect: "/other/imageOnlineURL",
    component: () => import('../view/other/Other.vue'),
    children: [{
        path: 'personalInfo',
        name: 'PersonalInfo',
        component: () => import('../view/other/PersonalInfo.vue')
      },
      {
        path: 'freightComputers',
        name: 'FreightComputers',
        component: () => import('../view/other/FreightComputers.vue')
      },
      {
        path: 'imageOnlineURL',
        name: 'ImageOnlineURL',
        component: () => import('../view/other/imageOnlineURL.vue')
      },
    ]
  },
  // 快递单号
  {
    path:"/barcode",
    name:"Barcode",
    component: () => import("../view/Barcode.vue")
  },
  // 测试
  {
    path: '/imclient',
    name: 'Imclient',
    component: () => import('../view/Imclient.vue')
  },
  {
    path: '/ssssss',
    name: 'Ssssss',
    component: () => import('../components/Ssssss.vue')
  },
  // 重定向
  {
    path: '*',
    redirect: {
      name: 'Login'
    }
  }
]
