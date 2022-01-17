<template>
	<view class="order_wrapper">
		<view class="order_item" v-for="(item,index) in orderList" :key="index">
		  <view class="order_header">
		    <view class="header_left">
          <text>食材集市</text>
		    </view>
        <view class="header_right">
          <text>{{stateMap[item.order_status]['status']}}</text>
        </view> 
		  </view>
			<view class="header_time">
				{{formDate(item.order_date)}}
			</view>
      <view class="order_main">
        <view class="main_left">
					<image  v-for="(mainitem,mainindex) in item.order_infor.slice(0,2)" :key="mainindex" style="width: 50px;height: 50px;" :src="mainitem.imgUrl" mode="" />
					<view class="more_img">
						<image src="../../static/more.png" mode=""></image>
					</view>	
				</view>	
				<view class="main_right">
					<view class="right_total">
						￥{{item.order_total}}
					</view>
					<view class="right_num">
						共{{item.order_infor.length}}种
					</view>
				</view>
      </view>
        <view class="footer_btn">
          <view class="submit_btn1" @click="goOrderDetail(item._id)">
            查看详情
          </view>
          <!-- <view class="submit_btn2">
            确认收货
          </view>  -->        
        </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        user_id:null,
        orderList:{},
		    stateMap:[
				{status:'待发货',info:''}
				,{status:'待签收',info:''}
				,{status:'待评价',info:''}
				,{status:'已完成',info:''}]
			}
		},
    onLoad(options){
      let userId = options.id
      this.userId = userId
      this.initData()
    },
	computed:{
		
	},
		methods: {
			formDate(time,format = 'yyyy-MM-dd HH:mm:ss'){
				var date = new Date(time);
				        var formatter = function (i) { return (i < 10 ? '0' : '') + i };
				        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
				          switch (a) {
				            case 'yyyy':
				              return formatter(date.getFullYear());
				              break;
				            case 'MM':
				              return formatter(date.getMonth() + 1);
				              break;
				            case 'mm':
				              return formatter(date.getMinutes());
				              break;
				            case 'dd':
				              return formatter(date.getDate());
				              break;
				            case 'HH':
				              return formatter(date.getHours());
				              break;
				            case 'ss':
				              return formatter(date.getSeconds());
				              break;
				          }
				        })
			},
			initData(){
        let user_id = this.userId
        console.log(user_id)
        this.$api.commonCloud('getOrder',{
          user_id:user_id
        }).then(res=>{
					const {data} = res
          this.orderList = data
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

<style lang='less'>
  page{
    background-color: #F2F5F9;
  }
  .order_main{
    padding: 10px 0px;
  }
	.order_wrapper{
		padding-bottom: 50px;
		.order_item{
			margin: 10px 6px;
			background-color: #fff;
			margin: 15px;
			border-radius: 8px;
			padding: 15px;
			.order_header{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 6px;
				.header_left{
					font-size: 14px;
					display: flex;
					flex-direction: column;
				}
				.header_right{
					font-size: 12px;
					color: #A3A3A3;
				}
			}
			.header_time{
				font-size: 13px;	
				margin-bottom: 5px;
				color: #A3A3A3;
			}
			 .order_main{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 6px;
				.main_left{	
					display: flex;
					image{
						padding: 0px 5px;
					}
					.more_img{
						width: 50px;
						height: 50px;
						display: flex;
						align-items: center;
						image{
							width: 30px;
							height: 30px;
						}
					}
				}
				.main_right{
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					justify-content: center;
					.right_total{
						font-size: 17px;
						font-weight: 700;
					}
					.right_num{
						color: #A3A3A3;
						font-size: 11px;
					}
				}
			 }
			 .footer_btn{
				display: flex;
				align-items: center;  
				justify-content: flex-end;
				margin-bottom: 10px;
				.submit_btn1,.submit_btn2{
					background-color: #f0ad4e;
					color: #fff;
					font-size: 14px;
					padding: 7px 10px;
				} 
				/* .submit_btn1{
					margin-right: 10px;
				} */
			}
		}
	}
 
  
</style>
