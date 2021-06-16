import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

const store = new vuex.Store({
	state:{
		userInfo:uni.getStorageSync('userInfo') ||  {},  /* 用户信息 */
		user_id:uni.getStorageSync('user_id') ||  '', /* 用户id*/
		cartList:{}, /* 购物车列表*/
		isBasket:uni.getStorageSync('isBasket') || false
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
		addCart(state,{
      /* 添加到购物车*/
			user_id,
			food_id,
			food_name,
			food_price
		}){
			let cart = state.cartList
			let item = cart = (cart || {})
			if(item[food_id]){
				item[food_id]['food_num']++;
			}else{
				item[food_id] = {
					"food_num":1,
					"food_name":food_name,
					"food_price":food_price
				}
			}
			state.cartList = {...cart};
			uni.setStorage({
				key:"buyCart",
				data:state.cartList
			})
		},
		reduceCart(state,{
			user_id,
			food_id
		}){
			let cart = state.cartList
			let item = cart = (cart || {})
			if(item&&item[food_id]){
				if(item[food_id]['food_num']>0){
					item[food_id]['food_num']--
					state.cartList = {...cart}
					uni.setStorage({
						key:"buyCart",
						data:state.cartList
					})
				}else{
					item[food_id] = null
				}
			}
		},
		initCart(state){
			let initCart = uni.getStorageSync('buyCart')
      let user_id = uni.getStorageSync('user_id')
			if(initCart){
				console.log('initCart',initCart)
				state.cartList = /* JSON.stringify(initCart) */initCart
			}else{
				uniCloud.callFunction({
					name: 'getCart',
					data:{
						user_id:user_id,
					}
				}).then(hasCart => {
          if(hasCart.result.data.length>0){
          let cartData = hasCart.result.data[0].cart_infor
          
          uni.setStorageSync('buyCart',cartData)
          console.log('hasCart123',hasCart)
          state.cartList = cartData            
          }else{
            state.cartList = {}
          }
          })
      }
		},
    clearCart(state){
      uni.removeStorageSync('buyCart')
    },
		setBasket(state,status){
			uni.setStorageSync('isBasket',status)
		}
	}
})

export default store
