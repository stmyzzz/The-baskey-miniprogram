<template>
	<view>
		<view class="ingre_wrapper">
			<image :src="ingre[0].imgUrl" mode="aspectFit" />
			<view class="ingre_header">
				<view class="header_action">
					<view class="ingre_name">
						{{ingre[0].food_name}}/50g
					</view>   
					<cartActionBtn :item='ingre'>
					</cartActionBtn>  
				</view>
				<view class="ingre_description">
					{{ingre[0].food_description}}
				</view>
			</view>
      <view class="ingre_cook">
        <view class="cook_title">
        	食材搭配({{cooks.length}})
        </view>
				<view class="ingre_wrapper">
					<view class="ingre_item" v-for="(item,index) in cooks" @click="goIngre(item.id,item.name)" :key="index">
						<view class="img_wrapper">
							<image :src="item.img" mode=""/>
						</view>
						<view class="name_wrapper">
							{{item.name}}
						</view>
					</view>
				</view>
      </view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import buyCart from '../../components/buyCart'
  import Title from '../../components/Title'
	import cartActionBtn from '../../components/cart-action-btn/cart-action-btn.vue'
	export default {
		data() {
			return {
				user_id:null,
				cooks:[],
				ingre:[]
				
			}
		},
		components:{
			buyCart,
      Title,
			cartActionBtn
		},
		onLoad(options){
      wx.setNavigationBarTitle({ title:options.name})
      uni.showLoading({
        title: "加载中..."
      })
			let ingreId = options.id
			this.user_id = uni.getStorageSync('user_id')
			this.$api.commonCloud('getFoods',{
				food_id:ingreId
			}).then(res=>{
				this.ingre = res.data
        uni.hideLoading()
			})
			
		},
		created(){
			this.initCart()
      this.$api.commonCloud('getCook',{
        ingre:'水'
      }).then(res=>{
				console.log('res',res)
				this.cooks = res
      })
		},
		methods:{
			...mapMutations(['initCart']),
			goIngre(id,name){
				uni.navigateTo({
					url:`/pages/sourceDetail/sourceDetail?id=${id}&name=${name}`
				})
			}
			
		}
	}
</script>

<style lang="less" scoped>
	.ingre_wrapper{
		image{
			width: 100%;
		}
		.ingre_header{
			padding: 0 15px 20px 15px;	
			.header_action{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 10px;
				.ingre_name{
					font-size: 18px;
					font-weight: 700;
					text-align: center;
				}	
			}
			.ingre_description{
				margin-top: 20px;
				font-size: 13px;
			}
		}
		.ingre_cook{
			padding: 10px 15px;
			.cook_title{
				font-weight: 700;
				font-size: 18px;
			}
			.ingre_wrapper{
				display: flex;
				flex-wrap: wrap;
				.ingre_item{
					width: 25%;
					margin: 15px 5px 5px 5px;
					.img_wrapper{
					  width: 100%;
					  height: 80px;
						text-align: center;
						image{
							width: 100%;
							height: 100%;
							text-align: center;
						}
					}
					.name_wrapper{
						margin-top: 6px;
						text-align: center;
						font-size: 15px;
					}
				}
			}
		}
	}
</style>
