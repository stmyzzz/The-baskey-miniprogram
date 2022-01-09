<template>
	<view class="ingre_wrapper">
		<view class="ingre_left">
			<view class="left_item" :class="currentSort == item ? 'left_item_active':''" v-for="(item,index) in sortlist" @click="getSort(item)" :key="index"  title="" note="">
				<image v-if="currentSort == item" src="../../static/ingre_nav1.png" mode=""></image>  
				<view class="">
						{{item}}
				</view>
			</view>
		</view>
		<scroll-view class="ingre_right" scroll-y="true">
			<cart-item v-for="(item,index) in foods" :key="index" :food='item'>
				<view class="item_food_description" slot='cart_description'>
					{{item.food_description.substring(0,item.food_description.indexOf("。"))}}
				</view>		
				<cartActionBtn :item='item' slot='cart_footer'>
				</cartActionBtn>	
			</cart-item>
			<view class="block">
			</view>
		<!-- 	<view class="ingre_item" v-for="(item,index) in foods" :key="index">
					<view class="item_image">
						<image @click="goingreDetail(item._id,item.food_name)" :src="item.imgUrl" mode=""/>
					</view>
					<view class="item_info">
						<view class="item_food_name">
							{{item.food_name}}
						</view>
						<view class="item_food_description">
							{{item.food_description.substring(0,item.food_description.indexOf("。"))}}
						</view>		
						<view class="ingre_footer">
							<view class="ingre_price">
								￥28
							</view>
							<view class="ingre_btn">
								<button @click="goto('/pages/about/about')">购买</button>
							</view>
						</view>
					</view>
			</view> -->
		</scroll-view>
		<view class="ingre_cart" v-if="cart_num>0">
			<view class="cart_left" @click="open()" >
				<image src="../../static/cart.png" mode="" />
				<view class="cart_total" v-if="cart_num>0">
					{{cart_num}}
				</view>
			</view>
			<view class="cart_right">
				<view class="cart_total">
					￥{{cartTotal}}
				</view>
				<view class="cart_btn">
					结算
				</view>
			</view>
		</view>
			<view class="cart_modal" :class="show ? 'cart_modal_active':''">
				<view class="cart_title" >
					<p>购物袋</p>
					<p @click='clearCart'>清空</p>
				</view>
				<scroll-view scroll-y="true" class="cart_list">
					<cart-item v-for="(item,index) in cartList" :key="index" :food='item'>
						<view class="cart_size" slot='cart_size'>
							{{item.food_num}}份
						</view>	
						<cartActionBtn :item='item' slot='cart_footer'>
						</cartActionBtn>	
					</cart-item>
				</scroll-view>
			</view> 	
		<view class="mark" @click="show = false" v-if="show">
			
		</view>
	</view>	
	<!-- <div class="ingre_container">
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
        <image @click="goingreDetail(item._id,item.food_name)" :src="item.imgUrl" mode=""></image>
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
          <buy-cart :food="item"></buy-cart>       
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
	</div> -->
</template>

<script>
	import cartItem from '../../components/cart-item/cart-item.vue'
	import {mapState,mapMutations,mapGetters} from 'vuex'
	import buyCart from '../../components/buyCart'
	import cartActionBtn from '../../components/cart-action-btn/cart-action-btn.vue'
	export default {
		data(){
			return {
				sortlist:['烘焙用粉','烘焙乳品','烘焙用糖','装饰调色','烘焙工具'],
				currentSort:'烘焙用粉',
				foods:{},
				showLoading:true,
				cartFoodList:[],
				totalPrice:0,
        cartNum:0,
        iscartList:false,
				show:false,
			}
		},
		created(){
			// this.initCart()
			console.log('a',this.cartList)
		},
		components:{
			buyCart,
			cartItem,
			cartActionBtn
		},
		onLoad(){
			console.log('store',this.$store)
			this.getSort(this.currentSort)
		},
    onShow(){
      console.log('我触发了')
    },
		computed:{
			...mapGetters(['cartTotal']),
      ...mapState({
				cartList:state=> state.cart.cartList
			}),
			cart_num(){
				if(this.cartList.length !== 0){
					let num = 0
					this.cartList.forEach(item=> num+=item.food_num)
					return num
				}else{
					return 0;
				}
			}
		},
		methods:{
			clearCart(){
				this.removeCartList()
				this.show = false
			},
			handleFoodNum(item,num,type){
				console.log('ok')
				this.saveCartList({...item,food_num:type === 'add'? ++num : --num});
			},
			open(){	
				this.show = true
			},
			close(){
				this.show = false
			},
			...mapMutations(['initCart','saveCartList','removeCartList']),
			initCartList(){
        var that = this
				let newArr = []
				let cartFoodNum = 0
				let num = 0
        this.totalPrice = 0
				let user_id = this.user_id
				let shopCart = this.shopCart
				this.$api.commonCloud('getCart',{
          user_id:user_id
        }).then(hasCart => {
					if(hasCart.data.length){
					this.$api.commonCloud('updateCart',{
            user_id:user_id,
            cart_infor:shopCart
          }).then(res => {
            console.log('更新购物车成功',res);
				})
					}else{
						this.$api.commonCloud('addCart',{
              user_id:user_id,
              cart_infor:shopCart
            }).then(res => {
							console.log(res)
						})
					}
				})

				Object.keys(this.shopCart).forEach((item,index)=>{
          console.log('itemitem',item);
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
				console.log('itemm',item)
        uni.showLoading({
          title: "加载中...",
          mask:false
        })
				this.currentSort = item
				this.$api.commonCloud('getFoods',{
          food_sort:this.currentSort
        }).then(res => {
					console.log('this.foods',res)
					this.foods = res.data 
          uni.hideLoading()
				})
				console.log('渲染完成')
				this.showLoading = false
			},
      goBuy(){
        if(this.user_id){
          uni.navigateTo({
            url:`/pages/buylist/buylist`
          })
        }else{
          uni.navigateTo({
            url:`/pages/wxlogin/wxlogin`
          })
        }
      },
      goingreDetail(ingreId,name){
        uni.navigateTo({
          url:`/pages/ingreDetail/ingreDetail?id=${ingreId}&name=${name}`
        })
      }
			
		},
		watch:{
			// shopCart: function (value){
			// 		this.initCartList();
			// },
		}
	}
</script>

<style lang="less" scoped>
	.ingre_wrapper{
		display: flex;
		width:100%;
		background-color: #fbfcfc;
		height: 100vh;
		.ingre_left{	
			background-color:#F3F3F3;
			width: 85px;
			.left_item{
				font-size: 12px;
			  display: flex;
				align-items: center;
				flex-direction: column;
				padding: 15px 0px;
				color: #AAAAAA;
				border-left: 1px solid #fff;
				image{
					width: 30px;
					height: 30px;
				}
			}
			.left_item_active{
				background-color: #fff;
				border-left: 3px solid #f0ad4e;
			}
		}
		.ingre_right{
			width: 300px;
			margin: 10px 20px 0px 10px;
			.ingre_item{	
				display: flex;
				padding: 15px 0px 15px 15px;
					.item_image{
						width: 60px;
						height: 60px;
						margin-right: 10px;
						image{
							width: 100%;
							height: 100%;
							border-radius: 5px;
						}
					}
					.item_info{
						flex: 1;
						.item_food_name{
							font-weight: 700;
							font-size: 14px;
						}
						.item_food_description{
							margin-top: 3px;
							font-size: 12px;
							color: #A0A0A0;
						}
					}
				.ingre_footer{
					margin-top: 15px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.ingre_price{
						font-size: 18px;
						font-weight: 700;
					}
					.ingre_btn{
						margin-left: 10px;
						button{
							border-top-right-radius: 18px;
							border-top-left-radius: 18px;
							border-bottom-left-radius: 18px;
							border-bottom-right-radius: 18px;
							font-size: 13px;
							background-color:#f0ad4e;
							width: 60px;
							color: #fff;
							font-size: 13px;
							font-weight: 700;
						}
						::after{
						    border:none; //黑色边框去掉了
						}
					}
				}
			}	
			.block{
				height: 60px;
			}
		}
		.mark{
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			top: 0;
			background-color: #000000;
			z-index: 20;
			opacity: .3;
		}
		.cart_modal{
			position: absolute;
			bottom: -600px;
			background-color: #fbfcfc;
			z-index: 30;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			transition: all .5s;
			width: 100%;
			padding: 10px 15px;
			box-sizing: border-box;
			.cart_title{
				font-weight: 700;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 10px;
			}
			.cart_list{
				height: 300px;
				.cart_size{
					margin-top: 3px;
					font-size: 12px;
					color: #A0A0A0;
				}
			}
			
		}
		.cart_modal_active{
			bottom: 50px;
			transition: all .5s;
		}
		.ingre_cart{
			z-index: 32;
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 50px;
			background-color: #F3F3F3;
			.cart_left{
			 	margin-left: 20px;
				width: 40px;
				height: 40px;
				background-color: #fff;
				border-radius: 50%;
				padding: 5px;
				display: flex;
				align-items: center;
				justify-content: center;
				position: fixed;
				bottom: 10px;
				image{
					width: 70%;
					height: 70%;
				}
				.cart_total{
					width: 10px;
					height: 10px;
					font-size: 9px;
					position: absolute;
					top: 0px;
					right: 0px;
					background-color:#f0ad4e;
					border-radius: 50%;
					padding: 3px;
					line-height: 10px;
					text-align: center;
					color: #fff;
				}
			}
			.cart_right{
				margin-left: 80px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 100%;
				.cart_total{
					font-weight: 700;
					font-size: 20px;
				}
				.cart_btn{
					font-weight: 700;
					color: #fff;
					width: 100px;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #f0ad4e;
				}
			}
		}
	}
/*  .ingre_container{
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
	}
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
  } */
  
  
</style>
