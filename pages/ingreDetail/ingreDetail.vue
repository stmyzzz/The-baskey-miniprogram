<template>
	<view>
		<view class="ingre_container">
			<view v-for="(item,index) in ingres" :key="index"> 
        <view class="item_top">
          <image :src="item.imgUrl" mode=""></image>
          <view class="ingre_name">
            {{item.food_name}}
          </view>           
        </view>
				<buy-cart class="buy_cart" :food="item" :user_id="user_id"></buy-cart>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import buyCart from '../../components/buyCart'
	export default {
		data() {
			return {
				ingres:null,
				user_id:null
				
			}
		},
		components:{
			buyCart
		},
		onLoad(options){
      console.log(options)
      wx.setNavigationBarTitle({ title:options.name})
      uni.showLoading({
        title: "加载中..."
      })
			let ingreId = options.id
			this.user_id = uni.getStorageSync('user_id')
			console.log('ingreId',ingreId)
			uniCloud.callFunction({
				name:"getFoods",
				data:{
					food_id:ingreId
				}
			}).then(res=>{
				console.log(res)
				this.ingres = res.result.data
        uni.hideLoading()
			})
			
		},
		created(){
			this.initCart()
		},
		methods:{
			...mapMutations(['initCart'])
			
		}
	}
</script>

<style scoped>
  .ingre_container image{
    margin: 0 auto;
  }
  .ingre_container .item_top{
    display: flex;
    flex-direction: column;
    align-items: center;  
  }
  .ingre_container .item_top .ingre_name{
    font-weight: bold;
    font-size: 17px;
  }
  .ingre_container .buy_cart{
    float: right;
    padding: 20px;
  }

</style>
