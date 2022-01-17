<template>
	<view class="order_wrapper">
		<view class="order_main">
			<template v-if="order.order_status !== 3">
				<van-steps :steps="steps" :active="order.order_status" />
			</template>
			<template v-else>
				<view class="order_header">
					<view>
						订单已完成
					</view>
					<view>
						感谢您选择食材集市，欢迎再次光临
					</view>
				</view>
			</template>
			<view class="info_ingre">
					<view class="info_title">
						订单信息
					</view>
					<view class="info_items">
						<view class="info_item" :key='item' v-for="(item,index) in [order.order_phone,order.order_username,order.order_address]">
							<view class="info_left">
								{{infoMapList[index]}}
							</view>
							<view class="info_right">
								{{item}}								
							</view>
						</view>
					</view>
			</view>
      <view class="order_ingre">
				<view class="ingre_items">
					<view class="ingre_title">
						食材信息
					</view>
					<view class="ingre_item" v-for="(ingreitem,ingreindex) in order.order_infor" :key="ingreindex">
						<view class="item_left">
							<image :src="ingreitem.imgUrl" mode="" />  
						</view>
						<view class="item_center">
							<text>{{ingreitem.food_name}}</text>       
						</view>
						<view class="item_right">  
							<text>{{ingreitem.food_price}}</text>  
							<text>x{{ingreitem.food_num}}</text>
						</view>
					</view>  
				</view>	
				<view class="ingre_price">
					<text>食材总价</text>
					<text>￥{{order.order_total}}</text>
				</view>
				<view class="ingre_footer">
						共{{order.order_num}}份，合计&nbsp;￥<text>{{order.order_total}}</text>
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
				infoMapList:['收货地址','收货电话','收货人'],
        steps: [
        {
          text: '下单',
        },
        {
          text: '发货',
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
			const {id} = options
      this.id = id
      this.initData()
    },
		methods: {
			initData(){
        this.$api.commonCloud('getOrder',{
          id:this.id
        }).then(res =>{
					const {data} = res
          this.order = data[0]
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

<style lang='less'>
  page{
    background-color: #F2F5F9;
  }
  .van-steps--horizontal {
    padding: 20px !important;
  }
  .order_user{
    display: flex;
    align-items: center;
    padding: 25px 15px;
    background-color: #fff;
  }
  .order_user .user_main{
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    margin-left: 10px;
  }
  .order_wrapper{
		.order_main{
			margin: 10px 13px;
			.order_header{
				border-radius: 8px;
				text-align: center;
				height: 40px;
				padding: 25px 15px;			
				background-color: #FFFFFF;
				view:nth-of-type(1){
					font-weight: 600;
					font-size: 18px
				}
				view:last-of-type{
					color: #A3A3A3;
					font-size: 13px;
					font-weight: 400;
				}
	
			}
			.order_status{
				width: 100%;
				height: 70px;
				line-height: 70px;
				background-color: #FDAB61;
				color: #fff;
				font-weight: bold;
				font-size: 20px;
				text-align: center;
			}
			.info_ingre{
				margin-top: 15px;
				background-color: #fff;
				padding: 15px 15px;
				.info_title{
					font-weight: 700;
					font-size: 15px;
				}
				.info_item{
					padding: 15px 0px;
					font-size: 15px;
					border-bottom: 1px solid #F7F7F7;
					display: flex;
					align-items: center;
					justify-content: space-between;
				}
			}
			.order_ingre{
				margin-top:15px;
				background-color: #fff;	
				padding: 15px 15px;
				.ingre_items{
					border-bottom: 1px solid #F7F7F7;	
					.ingre_title{
						font-weight: 700;
						font-size: 15px;
					}
					.ingre_item{
						padding: 25px 15px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.item_left{
							width: 20%;
							image{
								width: 40px;
								height: 40px;
							}
						}
						.item_center{
							flex: 1;
						}
						.item_right{
							width: 20%;
							display: flex;
							align-items:flex-end;
							flex-direction: column;
							text:nth-of-type(1){
								font-size: 14px;
							}
							text:nth-of-type(2){
								font-size: 12px;
								color: #A3A3A3;
							}
						}
					}
				}
				.ingre_price{
					border-bottom: 1px solid #F7F7F7;	
					font-size: 15px;
					padding: 25px 0;
					display: flex;
					align-items: center;
					justify-content: space-between;
				}
				.ingre_footer{
					padding: 25px 0;	
					font-size: 16px;
					text-align: right;
					text{
						font-weight: 700;
					}
				}
			}
		}
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
