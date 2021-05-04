<template>
	<view class="order_container">
		<view class="order_main" v-for="(item,index) in order" :key="index">
      <view class="order_status">
        {{item.order_status}}
      </view>
      <view class="order_user">
        <view class="user_icon">
          <image style="width: 50px;height: 50px;" src="../../static/me.png" mode=""></image>
        </view>
        <view class="user_main">
          <view class="main1">
            <text style="font-size: 17px;font-weight: bold;">{{item.order_username}}</text>
            <text style="margin-left: 10px;">{{item.order_phone}}</text>
          </view>
          <view class="main2">
            {{item.order_address}}
          </view>
        </view>
      </view>
      <view class="order_ingre">
        <view class="ingre_item" v-for="(ingreitem,ingreindex) in item.order_infor" :key="ingreindex">
         <view class="item_left">
            <text>{{ingreitem.food_name}}</text>       
         </view>
         <view class="item_right">
            <text>{{ingreitem.food_num}}</text>
            <text>{{ingreitem.food_price}}</text>       
         </view>
        </view>        
      </view>

		</view>
	</view>
</template>

<script>
	export default {
    name:'order',
		data() {
			return {
        id:null,
        order:{}
			}
		},
    onLoad(options){
      this.id = options.id
      this.initData()
    },
		methods: {
			initData(){
        let id = this.id
        this.$api.commonCloud('getOrder',{
          id:id
        }).then(res=>{
          console.log(res)
          this.order = res.data
          console.log(res.data[0].order_infor)
        })
      }
		}
	}
</script>

<style>
  page{
    background-color: #f5f5f5
  }
  .order_user{
    display: flex;
    align-items: center;
    padding: 10px 15px;
    background-color: #fff;
  }
  .order_user .user_main{
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    margin-left: 10px;
  }
  .user_main .main2{
   
  }
  .order_container .order_main .order_status{
    width: 100%;
    height: 70px;
    line-height: 70px;
    background-color: #FDAB61;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
  }
  .order_ingre{
    margin-top: 15px;
    background-color: #fff;
  }
  .ingre_item{
    padding: 10px 15px;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .item_left{
    flex:1;
  }
  .item_right{
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  
  
  

</style>
