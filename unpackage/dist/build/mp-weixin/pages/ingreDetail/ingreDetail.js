(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ingreDetail/ingreDetail"],{"050c":function(t,e,n){},"45b7":function(t,e,n){"use strict";(function(t){n("32e7");r(n("66fd"));var e=r(n("aa27"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"892f":function(t,e,n){"use strict";n.r(e);var r=n("b0a4"),o=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=o.a},"95c5":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return r}));var o=function(){var t=this,e=t.$createElement;t._self._c},i=[]},aa27:function(t,e,n){"use strict";n.r(e);var r=n("95c5"),o=n("892f");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("ff43");var a,c=n("f0c5"),u=Object(c["a"])(o["default"],r["b"],r["c"],!1,null,"64ab7f86",null,!1,r["a"],a);e["default"]=u.exports},b0a4:function(t,e,n){"use strict";(function(t,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n("2f62");function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){c(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var u=function(){n.e("components/buyCart").then(function(){return resolve(n("c712"))}.bind(null,n)).catch(n.oe)},l=function(){n.e("components/Title").then(function(){return resolve(n("a805"))}.bind(null,n)).catch(n.oe)},f={data:function(){return{ingres:null,user_id:null,dapei:[]}},components:{buyCart:u,Title:l},onLoad:function(e){var n=this;console.log(e),wx.setNavigationBarTitle({title:e.name}),t.showLoading({title:"加载中..."});var o=e.id;this.user_id=t.getStorageSync("user_id"),console.log("ingreId",o),r.callFunction({name:"getFoods",data:{food_id:o}}).then((function(e){console.log(e),n.ingres=e.result.data,t.hideLoading()}))},created:function(){var t=this;this.initCart(),this.$api.commonCloud("getCook",{ingre:"水"}).then((function(e){console.log("res",e),t.dapei=e}))},methods:a(a({},(0,o.mapMutations)(["initCart"])),{},{goIngre:function(e,n){t.navigateTo({url:"/pages/sourceDetail/sourceDetail?id=".concat(e,"&name=").concat(n)})}})};e.default=f}).call(this,n("543d")["default"],n("a9ff")["default"])},ff43:function(t,e,n){"use strict";var r=n("050c"),o=n.n(r);o.a}},[["45b7","common/runtime","common/vendor"]]]);