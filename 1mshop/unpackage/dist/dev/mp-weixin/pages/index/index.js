(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{139:function(e,t,n){"use strict";(function(e){n(5);i(n(4));var t=i(n(140));function i(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n(1)["createPage"])},140:function(e,t,n){"use strict";n.r(t);var i=n(141),o=n(143);for(var u in o)"default"!==u&&function(e){n.d(t,e,(function(){return o[e]}))}(u);n(145),n(147);var c,s=n(13),r=Object(s["default"])(o["default"],i["render"],i["staticRenderFns"],!1,null,null,null,!1,i["components"],c);r.options.__file="pages/index/index.vue",t["default"]=r.exports},141:function(e,t,n){"use strict";n.r(t);var i=n(142);n.d(t,"render",(function(){return i["render"]})),n.d(t,"staticRenderFns",(function(){return i["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return i["recyclableRender"]})),n.d(t,"components",(function(){return i["components"]}))},142:function(e,t,n){"use strict";var i;n.r(t),n.d(t,"render",(function(){return o})),n.d(t,"staticRenderFns",(function(){return c})),n.d(t,"recyclableRender",(function(){return u})),n.d(t,"components",(function(){return i}));try{i={uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,397))},uSwiper:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-swiper/u-swiper")]).then(n.bind(null,406))},uScrollList:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-scroll-list/u-scroll-list")]).then(n.bind(null,414))},uCountDown:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-count-down/u-count-down")]).then(n.bind(null,424))},uPopup:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-popup/u-popup")]).then(n.bind(null,433))},uCheckboxGroup:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-checkbox-group/u-checkbox-group")]).then(n.bind(null,441))},uCheckbox:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-checkbox/u-checkbox")]).then(n.bind(null,449))}}}catch(s){if(-1===s.message.indexOf("Cannot find module")||-1===s.message.indexOf(".vue"))throw s;console.error(s.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var o=function(){var e=this,t=e.$createElement;e._self._c},u=!1,c=[];o._withStripped=!0},143:function(e,t,n){"use strict";n.r(t);var i=n(144),o=n.n(i);for(var u in i)"default"!==u&&function(e){n.d(t,e,(function(){return i[e]}))}(u);t["default"]=o.a},144:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(){n.e("component/productList/productList").then(function(){return resolve(n(457))}.bind(null,n)).catch(n.oe)},o={name:"index",data:function(){return{titleBarHeight:"",statusBarHeight:"",W:"100%",menuWidth:"",menuRight:"",listSrc:[{name:"外卖配送",src:"/static/mipmap-mdpi1/deliciousFood.png"},{name:"美食",src:"/static/mipmap-mdpi1/deliciousFood.png"},{name:"面食",src:"/static/mipmap-mdpi1/deliciousFood.png"},{name:"蛋糕",src:"/static/mipmap-mdpi1/deliciousFood.png"},{name:"下午茶",src:"/static/mipmap-mdpi1/deliciousFood.png",routerSrc:"/pages/afterTea/afterTea"},{name:"快递代拿",src:"/static/mipmap-mdpi1/deliciousFood.png"},{name:"跑腿",src:"/static/mipmap-mdpi1/deliciousFood.png"},{name:"面食",src:"/static/mipmap-mdpi1/deliciousFood.png"},{name:"蛋糕",src:"/static/mipmap-mdpi1/deliciousFood.png"},{name:"全部",src:"/static/mipmap-mdpi1/deliciousFood.png"}],timeData:{},indicator:!1,timeLimitLists:[{thumb:"/static/mipmap-mdpi1/timeLImitList1.png",title:"刘记麻辣烫想过诞生了你的拉水泥路",price:"20",nowPrice:"50"},{thumb:"/static/mipmap-mdpi1/timeLImitList1.png",title:"刘记麻辣烫想过诞生了你的拉水泥路",price:"20",nowPrice:"50"},{thumb:"/static/mipmap-mdpi1/timeLImitList1.png",title:"刘记麻辣烫想过诞生了你的拉水泥路",price:"20",nowPrice:"50"},{thumb:"/static/mipmap-mdpi1/timeLImitList1.png",title:"刘记麻辣烫想过诞生了你的拉水泥路",price:"20",nowPrice:"50"}],discountLists:[{thumb:"/static/mipmap-mdpi1/timeLImitList1.png",title:"刘记麻辣烫店",price:"20",nowPrice:"50"},{thumb:"/static/mipmap-mdpi1/timeLImitList1.png",title:"刘记麻辣烫想过诞生了你的拉水泥路",price:"20",nowPrice:"50"}],emappShow:!0,receiveShow:!1,getCouponList:[{isRadio:!1,isReceive:!1,isActive:!1},{isRadio:!0,isReceive:!0,isActive:!0}],productList:[{url:"",title:"标题一标题一标题一",rate:9.8,deliveryText:"商家自送"},{url:"",title:"标题二标题二标题二",rate:9.5,deliveryText:"平台配送"}],list3:["https://cdn.uviewui.com/uview/swiper/swiper3.png","https://cdn.uviewui.com/uview/swiper/swiper2.png","https://cdn.uviewui.com/uview/swiper/swiper1.png"]}},onReady:function(){},onLoad:function(){e.hideTabBar()},onPullDownRefresh:function(){setTimeout((function(){e.stopPullDownRefresh()}),1e3)},mounted:function(){var t=this,n=e.getMenuButtonBoundingClientRect();e.getSystemInfo({success:function(i){var o=n.height+2*(n.top-i.statusBarHeight);t.titleBarHeight=o,t.statusBarHeight=i.statusBarHeight,console.log(t.titleBarHeight),console.log(t.statusBarHeight);var u=e.getMenuButtonBoundingClientRect();t.menuWidth=u.width+"px",t.menuRight=i.screenWidth-u.right+"px"},fail:function(e){console.log(e)}})},components:{productList:i},methods:{onChange:function(e){this.timeData=e},getLocation:function(){e.getLocation({type:"gcj02",success:function(t){console.log("res ==>",t);var n=t.latitude,i=t.longitude;e.openLocation({latitude:n,longitude:i,success:function(){console.log("success")}})}})},ToSearchPage:function(){e.navigateTo({url:"/pages_search/search/search"})},toPages:function(t,n){e.navigateTo({url:t.routerSrc})},ToCollage:function(){e.navigateTo({url:"/pages_specially/collage/collage"})},toDiscount:function(){e.navigateTo({url:"/pages_specially/discount/discount"})},toRush:function(){e.navigateTo({url:"/pages_specially/rush/rush"})},toTimesPike:function(t,n){e.navigateTo({url:"/pages/timeSpike/timeSpike"})},closeEmapp:function(){this.emappShow=!1,this.receiveShow=!0},closeReceive:function(){console.log("j78979"),this.receiveShow=!1,e.showTabBar({success:function(e){console.log("res",e)},fail:function(e){console.log("err",e)}})},setCheckbox:function(e){this.getCouponList.forEach((function(e){e.isActive=!1})),e.isActive=!e.isActive}}};t.default=o}).call(this,n(1)["default"])},145:function(e,t,n){"use strict";n.r(t);var i=n(146),o=n.n(i);for(var u in i)"default"!==u&&function(e){n.d(t,e,(function(){return i[e]}))}(u);t["default"]=o.a},146:function(e,t,n){},147:function(e,t,n){"use strict";n.r(t);var i=n(148),o=n.n(i);for(var u in i)"default"!==u&&function(e){n.d(t,e,(function(){return i[e]}))}(u);t["default"]=o.a},148:function(e,t,n){}},[[139,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map