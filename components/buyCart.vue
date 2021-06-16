<template>
	<view class="buyCart_container">
    <block>
			<view if class="cart_icon" @click.stop="onreduceCart(food._id)" v-if="foodNum">
        <image style="width: 26px;height: 26px;" src="../static/reduce.png" mode=""></image>
      </view>
			<view class="food_num" v-if="foodNum>0">{{foodNum}}</view>
			<view class="cart_icon" @click.stop="onaddCart(food._id,food.food_name,food.food_price)">        <image  style="width: 24px;height:24px;" src="../static/add.png" mode=""></image></view>
    </block>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		name:"buyCart",
		data() {
			return {
				totalPrice:null,
				cartFoodList:[]
			};
		},
		onLoad(){
		},
		props:['food'],
		computed:{
			...mapState(['cartList','user_id']),
			shopCart: function (){
				return Object.assign({},this.cartList);
			},
			foodNum:function(){
				let food_id = this.food._id;
				console.log('shopCart',this.shopCart)
			  console.log('shopCart[food_id]',this.shopCart[food_id])
				if(this.shopCart && this.shopCart[food_id]){
					let num = 0
					num += this.shopCart[food_id]['food_num']
					return num
				}else{
					return 0
				}
			}
		},
		methods:{
			...mapMutations(['addCart','reduceCart']),
			onaddCart(food_id,food_name,food_price){
        uni.showLoading({
            title: "加载中..."
          })
        let user_id = this.user_id
        if(!user_id){
          console.log('nologin')
          uni.navigateTo({
            url:`/pages/wxlogin/wxlogin`
          })
          return
        }
				console.log('user_id',this.user_id)
				this.addCart({user_id:this.user_id,food_id,food_name,food_price})
        uni.hideLoading()
			},
			onreduceCart(food_id){
        uni.showLoading({
            title: "加载中..."
          })
				if(this.foodNum>0){
				this.reduceCart({user_id:this.user_id,food_id})					
				}
        uni.hideLoading()
			}
		}
	}
</script>

<style>
  .buyCart_container{
    display: flex;
    align-items: center;
  }
  .buyCart_container .food_num{
    min-width: 25px;
    text-align: center;
  }
  .buyCart_container .cart_icon{
    display: flex;
    align-items: center;
  }
  

</style>
