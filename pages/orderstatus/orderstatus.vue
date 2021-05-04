<template>
	<view class="status_container">
    <view class="img_fin">
      <image src="../../static/orderfinish.png" mode=""></image>
    </view>
    <view class="fin_content">
      <view @click="goIngre()" class="return_ingre">
        继续逛逛
      </view>
      <view @click="goOrder()" class="return_order">
        查看订单
      </view>      
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        id:null
			}
		},
    onLoad(options){
      let id = options.id;
      console.log(options);
      this.id = id;
      console.log(this.id)
    },
		methods: {
			goOrder(){
        let id = this.id
       uni.redirectTo({
         url:`/pages/orderDetail/orderDetail?id=${id}`
       })
      },
      goIngre(){
        uni.switchTab({
          url:`/pages/ingre/ingre`
        })
      }
		}
	}
</script>

<style>
  .status_container{
    display: flex;
    flex-direction: column;    
    align-items: center;
  }
  .img_fin{
    margin-top: 100px;
  }
  .img_fin image{
    width: 100px;
    height: 100px;
  }
  .fin_content{
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  .return_ingre{
    border: 1px solid #FDAB61;
    color: #FDAB61;
    font-size: 14px;
    padding: 5px 8px;
    border-radius: 5px;
    margin-right: 5px;
  }
  .return_order{
    border: 1px solid #FDAB61;
    color: #FDAB61;
    font-size: 14px;
    padding: 5px 8px;
    border-radius: 5px;
    margin-left: 5px;
  }

</style>
