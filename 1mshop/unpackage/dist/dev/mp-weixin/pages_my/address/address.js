require('../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages_my/address/address"],{241:function(e,n,t){"use strict";(function(e){t(5);o(t(4));var n=o(t(242));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t(1)["createPage"])},242:function(e,n,t){"use strict";t.r(n);var o=t(243),r=t(245);for(var u in r)"default"!==u&&function(e){t.d(n,e,(function(){return r[e]}))}(u);t(247);var c,i=t(13),s=Object(i["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],c);s.options.__file="pages_my/address/address.vue",n["default"]=s.exports},243:function(e,n,t){"use strict";t.r(n);var o=t(244);t.d(n,"render",(function(){return o["render"]})),t.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(n,"components",(function(){return o["components"]}))},244:function(e,n,t){"use strict";var o;t.r(n),t.d(n,"render",(function(){return r})),t.d(n,"staticRenderFns",(function(){return c})),t.d(n,"recyclableRender",(function(){return u})),t.d(n,"components",(function(){return o}));try{o={uCheckboxGroup:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-checkbox-group/u-checkbox-group")]).then(t.bind(null,441))},uCheckbox:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-checkbox/u-checkbox")]).then(t.bind(null,449))},uButton:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-button/u-button")]).then(t.bind(null,488))}}}catch(i){if(-1===i.message.indexOf("Cannot find module")||-1===i.message.indexOf(".vue"))throw i;console.error(i.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,n=e.$createElement;e._self._c},u=!1,c=[];r._withStripped=!0},245:function(e,n,t){"use strict";t.r(n);var o=t(246),r=t.n(o);for(var u in o)"default"!==u&&function(e){t.d(n,e,(function(){return o[e]}))}(u);n["default"]=r.a},246:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={data:function(){return{H:"",lists:[{name:"小牛顿",phone:"12345678912",address:"广东省广州市白云区景泰新街",isActive:!0,label:"默认地址"},{name:"小牛顿",phone:"12345678912",address:"广东省广州市白云区景泰新街",isActive:!1,label:"设为默认地址"}]}},onReady:function(){},methods:{checkboxChange:function(e){this.lists.forEach((function(e){e.isActive=!1,e.label="设为默认地址"})),e.isActive=!0,e.label="默认地址"},toNewAddress:function(n){e.navigateTo({url:"/pages_my/newAddress/newAddress?id="+n})}}};n.default=t}).call(this,t(1)["default"])},247:function(e,n,t){"use strict";t.r(n);var o=t(248),r=t.n(o);for(var u in o)"default"!==u&&function(e){t.d(n,e,(function(){return o[e]}))}(u);n["default"]=r.a},248:function(e,n,t){}},[[241,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages_my/address/address.js.map