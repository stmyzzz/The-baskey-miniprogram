import Vue from 'vue'
import vuex from 'vuex'
import cart from './module/cart.js'
Vue.use(vuex)

const store = new vuex.Store({
	state:{
		userInfo:uni.getStorageSync('userInfo') ||  {},  /* 用户信息 */
		user_id:uni.getStorageSync('user_id') ||  '', /* 用户id*/
		// isBasket:uni.getStorageSync('isBasket') || false
	},
	getters:{
			
	},
	mutations:{
    /* 微信授权登录*/
		login(state,infor){
			state.userInfo = infor;
			uni.setStorage({
				key:'userInfo',
				data:infor
			})
		},
    /* 得到用户open_id*/
		get_userId(state,openid){
			state.user_id = openid;
			uni.setStorage({
				key:'user_id',
				data:openid,
			})
		},
		logout(state){
      /* 用户退出登录*/
			state.userInfo = {};
			state.user_id = null;
			uni.removeStorage({
        key:'user_id'
			})
      uni.removeStorage({
				key:'userInfo'
      })
		},
		setBasket(state,status){
			uni.setStorageSync('isBasket',status)
		}
	},
	modules:{
		cart
	}
})

export default store
