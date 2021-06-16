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
      <view class="rate">
        <Title title="食材搭配" :count="res.length" ></Title>
		<view class="ingre-wrap">
			<li class="dapei-item" v-for="(item,index) in dapei" @click="goIngre(item.id,item.name)" :key="index">
				<view class="img-wrap">
					<image :src="item.img" mode=""></image>
				</view>
				<view class="name-wrap">
					<text>{{item.name}}</text>
				</view>
			</li>
		</view>
      </view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import buyCart from '../../components/buyCart'
  import Title from '../../components/Title'
	export default {
		data() {
			return {
				ingres:null,
				user_id:null,
				dapei:[]
				
			}
		},
		components:{
			buyCart,
      Title
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
			this.$api.commonCloud('getFoods',{
				food_id:ingreId
			}).then(res=>{
				console.log(res)
				this.ingres = res.result.data
        uni.hideLoading()
			})
			
		},
		created(){
			this.initCart()
      this.$api.commonCloud('getCook',{
        ingre:'水'
      }).then(res=>{
				console.log('res',res)
				this.dapei = res
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
  .rate{
    padding: 10px 15px;
    clear: both;
  }
  .ingre-wrap{
    display: flex;
	flex-wrap: wrap;
  }
  .dapei-item{
    width: 25%;  
	margin-top: 10px;
	
  }
  .img-wrap{
	  padding: 5px;
	  box-sizing: border-box;
	  width: 73px;
	  height: 73px;
  }
  .img-wrap image{
	  width: 100%;
	  height: 100%;
  }
  .name-wrap{
	 text-align: center;
	 font-size: 12px;
  }

</style>
