<template>
	<div class="ingre_container">
    <view class="ingre_content" @click="iscartList = false">
		<view class="ingre_left">
      <view class="left_ul">
        <view class="left_item" :class="currentSort == item ? 'left_item_active':''" v-for="(item,index) in sortlist" @click="getSort(item)" :key="index"  title="" note="">
      <image style="width: 40px;height: 40px;" v-if="currentSort == item" src="../../static/ingre_nav1.png" mode=""></image>  
       <view class="">
          {{item}}
       </view>
        </view>
      </view>
		</view>
    <scroll-view scroll-y="true" :class="totalPrice>0 ? '':'ingre_right_kong'" class="ingre_right">
      <view class="ingre_detail" v-for="(item,index) in foods" :key="index">
        <image @click="goingreDetail(item_id)" :src="item.imgUrl" mode=""></image>
        <view>
           <view class="ingre_guige">
             <view class="ingre_name">
               {{item.food_name}}
             </view>
             <view class="ingre_description">
               {{item.food_price}}
             </view>
           </view>
           <view class="ingre_button">
          <buy-cart :food="item" :user_id="user_id"></buy-cart>       
           </view>
        </view>
      </view>      
    </scroll-view>          
    </view>
    <view v-if="totalPrice>0" class="cart_container">
      <view class="cart_left">
        <image @click="iscartList = !iscartList" style="width: 30px;height: 30px;" src="../../static/cart_active.png" mode=""></image>
        <view class="totalPrice">
          ￥{{totalPrice}}
        </view>        
      </view>
    <view class="goBuy" @click="goBuy" >选好了</view>
    </view>
    
    <van-transition show="iscartList" name="fade-up" custom-class="block">  
    
     <scroll-view :class="iscartList ? '.addCart_avtive':''" class="addCart_container" scroll-y="true"> 
          <view class="cartList_item" v-for="(item,index) in cartFoodList" :key="index">
           <view class="food_name">
              {{item.food_name}}
           </view>
          <view class="food_infor">
            <text>x{{item.food_num}}</text> 
            <text>￥{{item.food_price}}</text>
          </view>      
          </view>          
      </scroll-view> 
    </van-transition>
	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import buyCart from '../../components/buyCart'
	export default {
		data(){
			return {
				sortlist:['食物类别','酱油类别','奶制品','厨具类别'],
				currentSort:'食物类别',
				foods:{},
				user_id:null,
				showLoading:true,
				cartFoodList:[],
				totalPrice:null,
        cartNum:null,
        iscartList:false
			}
		},
		created(){
			this.initCart()
			console.log('created')
		},
		components:{
			buyCart
		},
		onLoad(){
			let currentSort = this.currentSort
			this.getSort(currentSort)

		},
    onShow(){
      console.log('我触发了')
			this.user_id = uni.getStorageSync('user_id')      
      this.initCart()
    },
		computed:{
			 ...mapState(['cartList']),
			shopCart: function (){
				return {...this.cartList};
			},
		},
		methods:{
			...mapMutations(['initCart']),
			initCartList(){
        var that = this
				console.log('我执行了')
				let newArr = []
				let cartFoodNum = 0
				let num = 0
				this.totalPrice = 0
        this.cartNum = 0
				this.cartFoodList = [];
				console.log('shopCart1',this.shopCart)
				let user_id = this.user_id
				let shopCart = this.shopCart
				uniCloud.callFunction({
					name: 'getCart',
					data:{
						user_id:user_id,
					}
				}).then(hasCart => {
					console.log('hasCart',hasCart)
          console.log('this.shopCart',this.shopCart)
					if(hasCart.result.data.length){
            that.shopCart = hasCart.result.data[0].cart_infor   
               console.log(' this.shopCart',that.shopCart)
            console.log('长度存在')
					uniCloud.callFunction({
					name: 'updateCart',
					data:{
						user_id:user_id,
						cart_infor:shopCart
					}
				}).then(res => {
					console.log(res.result.data)
					this.sourceList = res.result.data
				})
					}else{
						uniCloud.callFunction({
							name: 'addCart',
							data:{
								user_id:user_id,
								cart_infor:shopCart
							}
						}).then(res => {
							console.log(res.result.data)
							this.sourceList = res.result.data
						})
					}
				})

				Object.keys(this.shopCart).forEach((item,index)=>{
					console.log('item',item)
					if(this.shopCart && this.shopCart[item]){
					let foodItem = this.shopCart[item]
					num += foodItem.food_num
          
					this.totalPrice += foodItem.food_price * foodItem.food_num
          console.log('totalPrice',this.totalPrice)
          this.cartNum += foodItem.food_num
					console.log('totalPrice',this.totalPrice)
					if(foodItem.food_num>0){
						this.cartFoodList[cartFoodNum] = {};
						this.cartFoodList[cartFoodNum]._id = foodItem._id
						this.cartFoodList[cartFoodNum].food_name = foodItem.food_name
						this.cartFoodList[cartFoodNum].food_price = foodItem.food_price
						this.cartFoodList[cartFoodNum].food_num = foodItem.food_num
						cartFoodNum++
					}
					console.log('cartFoodList',this.cartFoodList)
					newArr[index] = num
					}else{
						newArr[index] = 0
					}
				})
			},
			getSort(item){
        uni.showLoading({
          title: "加载中...",
          mask:false
        })
				this.currentSort = item
				let footSort = this.currentSort
				uniCloud.callFunction({
					name: 'getFoods',
					data:{
						food_sort:footSort
					}
				}).then(res => {
					console.log('this.foods',res.result.data)
					this.foods = res.result.data 
          uni.hideLoading()
				})
				console.log('渲染完成')
				this.showLoading = false
       
			},
      goBuy(){
        uni.navigateTo({
          url:`/pages/buylist/buylist`
        })
      },
      goingreDetail(ingreId){
        uni.navigateTo({
          url:`/pages/ingreDetail/ingreDetail?id=${ingreId}`
        })
      }
			
		},
		watch:{
			shopCart: function (value){
					this.initCartList();
			},
		}
	}
</script>

<style>
  .ingre_container{
    display: flex;
    width: 100%;
    flex-direction: column;
    background-color: #EEE;
    height: 100vh;
  }
  .ingre_content{
    display: flex;
    padding-top: 10px;
  }
  .ingre_content .ingre_left{
    flex: 1;
  }
  .ingre_content .ingre_right{
    flex: 3;
    height: calc(100vh - 65px);
  }
  .ingre_content .ingre_right_kong{
    height: 100vh;
  }
  .ingre_content .ingre_right .ingre_detail{
    display: flex;
    margin: 0px 8px 20px 8px;
    background-color: #fff;
    border-radius: 5px;
    height: 80px;
    align-items: center;
    padding: 5px 13px;
    box-shadow: -2px 0 3px -1px #d8d8d8,
    0 -2px 3px -1px #d8d8d8, 
    0 2px 3px -1px #d8d8d8, 
    2px 0 3px -1px #d8d8d8; 
    
  }
  .ingre_content .ingre_right .ingre_detail image{
    width: 60px;
    height: 65px;
   
  }
  .ingre_content .ingre_right .ingre_detail>view{
    flex: 3;
    display: flex;
    justify-content: space-between;
    margin-left: 5px;
  }
  .ingre_content .ingre_right .ingre_detail .ingre_guige{
    display: flex;
    flex-direction: column;
  }
  .ingre_content .ingre_right .ingre_detail .ingre_guige .ingre_name{
    font-size: 15px;
    font-weight:bold;
  }
  .ingre_content .ingre_right .ingre_detail .ingre_guige .ingre_description{
    font-size: 12px;
    color: #555;
  }
  .ingre_content .ingre_right .ingre_detail .ingre_button{
    display: flex;
    align-items: center;
  }
  .ingre_left{
    width: 100%;
  }
  .left_ul{
    width: 100%;
  }
  .left_item{
    width: 100%;
    padding: 20px 0;
    text-align: center;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
   /* border-bottom-right-radius: 5px;
    border-top-right-radius: 5px; */
  }
/*  .left_item:nth-of-type(1){
    border-bottom-right-radius: 0px;
  } */
  .left_item_active{
    border-left: 3px solid #FDAB61;
    background-color: #EEE;
  }
  .left_item_active + .left_item{
    border-top-right-radius: 5px;
    
  }
  .cart_container{
    display: flex;
    align-items: center;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 5px 20px;
    z-index: 999;
    justify-content: space-between;
  }
  .cart_container .cart_left{
    display: flex;
    align-items: center;
  }
  .cart_container .totalPrice{
    margin-left:10px;
    font-weight: 600;
    font-size: 20px;
  }
  .cart_container .goBuy{
    background-color: #FDAB61;
    color: #fff;
    font-size: 15px;
    padding: 7px 20px;
    border-radius: 10px;
  }
  .addCart_container{
    position: absolute;
    bottom: -500px;
    transition: all .5s;
    background-color: #fff;
    width: 100%;
    max-height: 150px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow: scroll;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-size: 15px;
    
  }
  .addCart_container .cartList_item{
    height: 30px;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .addCart_avtive{
    bottom: 55px;
    transition: all .5s;
  }
  .cartList_item .food_name{
    flex: 4;
  }
  .cartList_item .food_infor{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  
</style>
