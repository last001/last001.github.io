require('../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages_my/newAddress/newAddress"],{249:function(e,n,t){"use strict";(function(e){t(5);o(t(4));var n=o(t(250));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t(1)["createPage"])},250:function(e,n,t){"use strict";t.r(n);var o=t(251),u=t(253);for(var i in u)"default"!==i&&function(e){t.d(n,e,(function(){return u[e]}))}(i);t(258);var r,s=t(13),c=Object(s["default"])(u["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],r);c.options.__file="pages_my/newAddress/newAddress.vue",n["default"]=c.exports},251:function(e,n,t){"use strict";t.r(n);var o=t(252);t.d(n,"render",(function(){return o["render"]})),t.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(n,"components",(function(){return o["components"]}))},252:function(e,n,t){"use strict";var o;t.r(n),t.d(n,"render",(function(){return u})),t.d(n,"staticRenderFns",(function(){return r})),t.d(n,"recyclableRender",(function(){return i})),t.d(n,"components",(function(){return o}));try{o={"u-Form":function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u--form/u--form")]).then(t.bind(null,585))},uFormItem:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-form-item/u-form-item")]).then(t.bind(null,591))},"u-Input":function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u--input/u--input")]).then(t.bind(null,599))},uIcon:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(t.bind(null,397))},uSwitch:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-switch/u-switch")]).then(t.bind(null,604))},uButton:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-button/u-button")]).then(t.bind(null,488))},uPicker:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-picker/u-picker")]).then(t.bind(null,612))}}}catch(s){if(-1===s.message.indexOf("Cannot find module")||-1===s.message.indexOf(".vue"))throw s;console.error(s.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var u=function(){var e=this,n=e.$createElement;e._self._c;e._isMounted||(e.e0=function(n){e.showAddress=!0},e.e1=function(n){e.showAddress=!1})},i=!1,r=[];u._withStripped=!0},253:function(e,n,t){"use strict";t.r(n);var o=t(254),u=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);n["default"]=u.a},254:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=r(t(255)),u=r(t(256)),i=r(t(257));function r(e){return e&&e.__esModule?e:{default:e}}var s={data:function(){return{H:"",id:"",isDefault:!1,showAddress:!1,defaultarr:[0,0,0],columns:[],city:u.default,area:i.default,amapPlugin:null,gaodekey:"eaa51853a19839af9b9b2339c569f0df",address:""}},onReady:function(){},onLoad:function(n){this.columns.push(o.default),this.columns.push(this.city[1]),this.columns.push(this.area[72]),this.id=n.id,console.log(this.id),0==this.id?e.setNavigationBarTitle({title:"地址修改"}):e.setNavigationBarTitle({title:"新增地址"})},methods:{getLocation:function(){e.getLocation({type:"gcj02",success:function(n){console.log("res ==>",n);var t=n.latitude,o=n.longitude;e.openLocation({latitude:t,longitude:o,success:function(){console.log("success")}})}})},changeHandler:function(e){var n=e.columnIndex,t=e.value,o=(e.values,e.index,e.indexs),u=e.picker,i=void 0===u?this.$refs.uPicker:u;0===n&&(i.setColumnValues(1,this.city[t[0].id]),console.log(this.city[t[0]]),i.setColumnValues(2,this.area[this.city[e.value[0].id][0].id])),1===n&&(console.log("indexs ==>",o),console.log(this.area[this.city[t[0].id][0].id]),i.setColumnValues(2,this.area[this.city[t[0].id][o[1]].id]))}}};n.default=s}).call(this,t(1)["default"])},258:function(e,n,t){"use strict";t.r(n);var o=t(259),u=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);n["default"]=u.a},259:function(e,n,t){}},[[249,"common/runtime","common/vendor","pages_my/common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages_my/newAddress/newAddress.js.map