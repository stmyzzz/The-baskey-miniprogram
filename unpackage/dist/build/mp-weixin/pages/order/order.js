(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/order"],{"09a8":function(t,n,e){"use strict";e.r(n);var r=e("9f48"),o=e("e320");for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);e("9594");var a,i=e("f0c5"),c=Object(i["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],a);n["default"]=c.exports},"22c8":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{user_id:null,orderList:{},stateMap:["待发货","待签收","待评价","订单已完成"]}},onLoad:function(t){var n=t.id;this.userId=n,this.initData()},computed:{},methods:{initData:function(){var t=this,n=this.userId;console.log(n),this.$api.commonCloud("getOrder",{user_id:n}).then((function(n){console.log(n),t.orderList=n.data,console.log(t.orderList)}))},goOrderDetail:function(n){t.navigateTo({url:"/pages/orderDetail/orderDetail?id=".concat(n)})}}};n.default=e}).call(this,e("543d")["default"])},"341d":function(t,n,e){},9594:function(t,n,e){"use strict";var r=e("341d"),o=e.n(r);o.a},9753:function(t,n,e){"use strict";(function(t){e("32e7");r(e("66fd"));var n=r(e("09a8"));function r(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"9f48":function(t,n,e){"use strict";var r;e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return r}));var o=function(){var t=this,n=t.$createElement;t._self._c},u=[]},e320:function(t,n,e){"use strict";e.r(n);var r=e("22c8"),o=e.n(r);for(var u in r)"default"!==u&&function(t){e.d(n,t,(function(){return r[t]}))}(u);n["default"]=o.a}},[["9753","common/runtime","common/vendor"]]]);