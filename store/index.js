import Vue from 'vue'
import vuex from 'vuex'
import cart from './module/cart.js'
import user from './module/user.js'
Vue.use(vuex)

const store = new vuex.Store({
	state:{
		// userInfo:uni.getStorageSync('userInfo') ||  {},  /* 用户信息 */
		// user_id:uni.getStorageSync('user_id') ||  '', /* 用户id*/
		// isBasket:uni.getStorageSync('isBasket') || false
	},
	getters:{
			
	},
	mutations:{
	},
	modules:{
		cart,
		user
	}
})

export default store
