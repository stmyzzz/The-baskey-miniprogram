<template>
	<view class="order_container">
		<view class="order_main" v-for="(item,index) in order" :key="index">
        <van-steps :steps="steps" :active="item.order_status" />
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
        
        <view class="total">
          <view class="cancel" v-if="item.order_status == 0" @click="cancel" type="default">取消订单</view>
          <view class="submit" v-if="item.order_status == 1" @click="submit" type="default">确认收货</view>
           <view class="submit" v-if="item.order_status == 2" @click="assess" type="default">评价食材</view>
           <view class="finish" v-if="item.order_status == 3"  type="default">订单已完成</view>
          <view>{{item.order_total}}</view>
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
        order:{},
        steps: [
        {
          text: '下单',
        },
        {
          text: '集市发货',
        },
        {
          text: '签收',
        },
        {
          text:'评价'
        }
    ],
			}
		},
    onLoad(options){
      this.id = options.id
      this.initData()
    },
		methods: {
			initData(){
        this.$api.commonCloud('getOrder',{
          id:this.id
        }).then(res =>{
          console.log(res)
          this.order = res.data
          console.log(res.data[0].order_infor)
        })
      },
      cancel(){
        var that = this
        uni.showModal({
            title: '提示',
            content: '确认要删除订单吗',
            success: function (res) {
                if (res.confirm) {
                    that.$api.commonCloud('removeOrder',{
                      _id:that.id
                    }).then(res=>{
                       uni.navigateBack({
                         delta:1
                       })
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消');
                }
            }
        });
      },
      submit(){
        var that = this
        uni.showModal({
            title: '提示',
            content: '确定要签收吗',
            success: function (res) {
                if (res.confirm) {
                    that.$api.commonCloud('updateState',{
                      id:that.id,
                      state:2
                    }).then(res=>{
                       that.initData()
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消');
                }
            }
        });
      },
      assess(){
        let id = this.id
        uni.navigateTo({
          url:`/pages/assess/assess?id=${id}`
        })
       
      }
		}
	}
</script>

<style>
  page{
    background-color: #f5f5f5;
  }
  .van-steps--horizontal {
    padding: 20px !important;
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
  .total{
    display: flex;
    justify-content:flex-end;
    align-items: center;
    padding: 10px;
  }
  .cancel{
    margin-right: 15px;
    border: 1px solid red;
    color: red;
    padding: 3px;
  }
  .submit{
    margin-right: 15px;
    border: 1px solid #FDAB61;
    color: #FDAB61;
    padding: 3px;
  }
  .finish{
    margin-right: 15px;
    border: 1px solid #666;
    color: #666;
    padding: 3px;
  }
  
  
  

</style>
