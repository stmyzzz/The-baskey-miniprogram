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
		</scroll-view>
		<view class="ingre_cart" v-if="cartTotal>0">
			<view class="cart_left" @click="cartBagShow = true" >
				<image src="../../static/cart.png" mode="" />
				<view class="cart_total" v-if="cartTotal>0">
					{{cartNum}}
				</view>
			</view>
			<view class="cart_right">
				<view class="cart_total">
					￥{{cartTotal}}
				</view>
				<view class="cart_btn" @click="goBuy(cartTotal)">
					结算
				</view>
			</view>
		</view>
			<view class="cart_modal" :class="cartBagShow ? 'cart_modal_active':''">
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
		  <view class="mark" @click="cartBagShow = false" v-if="cartBagShow">
	  	</view>
	  </view>
</template>

<script>
	import cartItem from '../../components/cart-item/cart-item.vue'
	import {mapState,mapMutations,mapGetters} from 'vuex'
	import cartActionBtn from '../../components/cart-action-btn/cart-action-btn.vue'
	export default {
		data(){
			return {
				sortlist:['烘焙用粉','烘焙乳品','烘焙用糖','装饰调色','烘焙工具'],
				currentSort:'烘焙用粉',
				foods:[],
				cartBagShow:false,
			}
		},
		components:{
			cartItem,
			cartActionBtn
		},
		onLoad(){
			this.getSort(this.currentSort)
		},
    onShow(){
    },
		computed:{
			...mapGetters(['cartTotal','cartNum']),
      ...mapState({
				cartList:state=> state.cart.cartList,
				userId:state => state.user.userId
			})
		},
		methods:{
			clearCart(){
				this.removeCartList()
				this.cartBagShow = false
			},
			...mapMutations(['saveCartList','removeCartList']),
			getSort(item){
        uni.showLoading({
          title: "加载中...",
          mask:false
        })
				this.currentSort = item
				this.$api.commonCloud('getFoods',{
          food_sort:this.currentSort
        }).then(res => {
					const {data = []} = res
					this.foods = data 
          uni.hideLoading()
				})
			},
			goBuy(cartTotal){
				if(this.userId){
					 uni.navigateTo({
          url:`/pages/buylist/buylist?cartTotal=${cartTotal}&cartNum=${this.cartNum}`
        })
				}else{
					uni.navigateTo({
					  url:`/pages/wxlogin/wxlogin`
					})
				}
				
			}
		},
		watch:{
			cartList: function (val){
				if(val.length === 0){
					this.cartBagShow = false
				}
			},
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
</style>
