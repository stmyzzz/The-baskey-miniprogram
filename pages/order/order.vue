<template>
	<view class="order_container">
		<view class="order_item" v-for="(item,index) in orderList" :key="index">
		  <view class="order_header">
		    <view class="header_left">
		      <text>icon</text>
          <text>食材集市</text>
		    </view>
        <view class="header_right">
          <text>{{item.order_status}}</text>
        </view> 
		  </view>
      <view class="order_main">
        <view class="main_item" v-for="(mainitem,mainindex) in item.order_infor" :key="mainindex">
          <view class="main_left">
            <image style="width: 50px;height: 50px;" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf5ae6e8-d0b3-4d9d-a8e1-68de7134fb37/bf4a31f5-40f3-4016-ad80-f739fc9cf28b.png" mode=""></image>
          </view> 
          <view class="main_right">
            <view class="right_1">{{mainitem.food_name}}</view>
            <view class="right_2">
            <view>￥{{mainitem.food_price}}</view>
            <view>x{{mainitem.food_num}}</view>              
            </view>
          </view>
        </view>
      </view>
      <view class="order_footer">
        <view class="footer_total">
          总价 ￥{{item.order_total}}
        </view>
        <view class="footer_btn">
          <view class="submit_btn1" @click="goOrderDetail(item._id)">
            查看详情
          </view>
          <view class="submit_btn2">
            确认收货
          </view>          
        </view>
      </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        user_id:null,
        orderList:{}
				
			}
		},
    onLoad(options){
      let userId = options.id
      this.userId = userId
      this.initData()
    },
		methods: {
			initData(){
        let user_id = this.userId
        console.log(user_id)
        this.$api.commonCloud('getOrder',{
          user_id:user_id
        }).then(res=>{
          console.log(res)
          this.orderList = res.data
          console.log(this.orderList)
     /*     this.$api.commonCloud('getOrder',{
            id:id
          }).then(res=>{
            console.log(res)
            this.orderList.forEach(item=>{
              item['orderImg'] = res.imgUrl
            })
            console.log(orderImg)
          }) */
        })
      },
      goOrderDetail(orderId){
        uni.navigateTo({
          url:`/pages/orderDetail/orderDetail?id=${orderId}`
        })
      }
		}
	}
</script>

<style>
  page{
    background-color: #f5f5f5;
  }
  .order_main{
    padding: 10px 0px;
  }
  .order_item{
    background-color: #fff;
    margin: 15px;
    border-radius: 8px;
    padding: 12px;
  }
  .order_header{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .order_header .header_left{
    font-size: 15px;
    font-weight: 600;
  }
  .order_header .header_right{
    font-size: 14px;
    color: red;
  }
  .main_item{
    display: flex;
    align-items: center;
  }
  .main_left{
    flex: 1;
    text-align: center
  }
  .main_right{
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .right_1{
    flex: 2;
  }
  .right_2{
    flex: 1;
    display: flex;
    justify-content: space-between;
  }
  .order_footer{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .footer_total{
    font-size: 12px;
    font-weight: 600;
  }
  .submit_btn1,.submit_btn2{
    border: 1px solid #F0AD4E;
    color: #F0AD4E;
    font-size: 12px;
    border-radius: 5px;
    padding: 5px 10px;
  }
  .submit_btn1{
    margin-right: 10px;
  }
  .footer_btn{
    display: flex;
    align-items: center;
  }
  
  

</style>
