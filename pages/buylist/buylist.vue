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
      <view class="cart_main" v-for="(item,index) in cartFoodList" :key="index" v-if="item.food_num>0">
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
        <text>￥{{totalPrice}}</text>
      </view>
		</view>
    <view class="pay_container">
      <text class="pay_total">￥{{totalPrice}}</text>   
      <button type="primary" class="pay" form-type="submit" >立即支付</button>
    </view>
 
     </form>
     
	</view>
</template>

<script>
  import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
        cartFoodList:{},
        cartNum:null,
        totalPrice:null,
        cartNum:null,
        cartId:null
			}
		},
    onLoad(){
      this.user_id = uni.getStorageSync('user_id')
      this.initData()
    },
		methods: {
      ...mapMutations(['clearCart']),
      initData(){
        let user_id = this.user_id
        this.totalPrice = 0
        this.$api.commonCloud('getCart',{
          user_id:user_id
        }).then(res=>{
          this.cartFoodList = res.data[0].cart_infor
          console.log('cartFoodList',res.data[0].cart_infor)
          this.cartId = res.data[0]._id
           Object.keys(this.cartFoodList).forEach(item=>{
            let foodItem = this.cartFoodList[item]
            console.log(foodItem.food_name)
            this.totalPrice += foodItem.food_price * foodItem.food_num
            this.cartNum += foodItem.food_num
          })
        })
         },
      onSubmit(e){
        let order_address = e.target.value.address
        let order_phone = e.target.value.phone
        let order_username = e.target.value.username
        let order_infor = this.cartFoodList
        let order_num = this.cartNum
        let order_total = this.totalPrice
        let user_id = this.user_id
        let cartId = this.cartId
        var that = this
        if(order_address !='' && order_phone !='' && order_username !=''){
          this.$api.commonCloud('getOrder',{
            user_id:user_id,
            order_phone:order_phone,
            order_username:order_username,
            order_address:order_address,
            order_infor:order_infor,
            order_num:order_num,
            order_total:order_total,
          }).then(res=>{
              console.log(res)
              let id = res.id
              this.clearCart()
              this.$api.commonCloud('removeCart',{
                user_id:user_id
              }).then(res=>{
                console.log(res)
              })
              uni.redirectTo({
                url:`/pages/orderstatus/orderstatus?id=${id}`
              })
          })
        }else{
          uni.showToast({
            title:"不能为空!",
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
