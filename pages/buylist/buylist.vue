<template>
	<view class="buylist">
    <form class="buylist_container" @submit="onSubmit" >
      <view class="user_infor">
        <view class="user_name">
          <text>联系人</text>
          <input type="text" value="" name="username"  placeholder="请输入联系人" /> 
        </view>     
        <view class="user_address">
          <text>送货地址</text>
          <input name="address" type="text" value="" placeholder="请输入地址"/>          
        </view>
        <view class="user_phone">
          <text>联系电话</text> 
          <input type="number" value="" name="phone"  placeholder="请输入联系电话" /> 
        </view>  
      </view>
		<view class="addCart_container" >
      <view class="cart_title">食材详情</view>
      <view class="cart_main" v-for="(item,index) in cartList" :key="index" v-if="item.food_num>0">
        <view class="main_left">
        <text>{{item.food_name}}</text>          
        </view>
        <view class="main_right">
         <text>x{{item.food_num}}</text>
         <text>{{item.food_price}}</text>          
        </view>
      </view>
      <view class="cart_pay">
        <text>合计</text>
        <text>￥{{cartTotal}}</text>
      </view>
		</view>
    <view class="pay_container">
      <text class="pay_total">￥{{cartTotal}}</text>   
      <button type="primary" class="pay" form-type="submit" >立即支付</button>
    </view>
     </form>
     
	</view>
</template>

<script>
  import {mapMutations,mapState} from 'vuex'
	export default {
		data() {
			return {
        cartFoodList:{},
        cartTotal:null,
        cartId:null,
				cartNum:null
			}
		},
    onLoad(options){
			const {cartTotal,cartNum} = options
			this.cartTotal = cartTotal,
			this.cartNum = cartNum
    },
		computed:{
			...mapState({
				cartList:state=> state.cart.cartList,
				userId:state=> state.user.userId,
			})
		},
		methods: {
      ...mapMutations(['removeCartList']),
      onSubmit(e){
        let order_address = e.target.value.address
        let order_phone = e.target.value.phone
        let order_username = e.target.value.username
        if(order_address !=='' && order_phone !=='' && order_username !==''){
          this.$api.commonCloud('getOrder',{
            user_id:this.userId,
            order_phone:order_phone,
            order_username:order_username,
            order_address:order_address,
            order_infor:this.cartList,
            order_total:this.cartTotal,
						order_num:this.cartNum,
						order_status:0
          }).then(res=>{
							const {id} = res
              this.removeCartList()
              uni.redirectTo({
                url:`/pages/orderstatus/orderstatus?id=${id}`
              })
          })
        }else{
          uni.showToast({
            title:"不能为空",
            icon:'none'
          })
        }
      }
      
			
		}
	}
</script>

<style scoped>
  page{
    background-color: #f5f5f5;
  }
  .buylist_container{
    margin: 15px;
  }
  .user_infor{
    background-color: #fff;
    margin:0px 10px;
    border-radius: 10px;
    padding: 0 10px;
  }
  .user_infor .user_phone,.user_address,.user_name{
    display: flex;
    align-items: center;
    padding: 12px 5px;
    border-bottom: 1px solid #F5F5F5;
  }
  .user_infor input{
    margin-left: 10px;
  }
  .addCart_container{
    background-color: #fff;
    margin: 10px 10px 0px 10px;
    border-radius: 10px;
    padding: 0 10px;
  }
  .cart_title{
    font-size: 14px;
    font-weight: 600;
    padding: 6px 0px;
  }
  .cart_main{
    margin-bottom: 7px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .cart_pay{
    margin-top: 10px;
    float: right;
  }
  .cart_main .main_left{
    flex: 2;
  }
  .cart_main .main_right{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .pay_container{
    margin-top: 10px;
    position: fixed;
    bottom: 0;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 10px;
  }
  .pay_container .pay_total{
    margin-left: 20px;
  }
  .pay_container .pay{
    margin: 0;
    margin-right: 20px;
  }
  .pay_container .pay_total{
    color: red;
    font-weight: 600;
    font-size: 20px;
  }
  
  

</style>
