<template>
  <div class="me_wrapper">
    <!-- <loading-layout v-if="isShow"></loading-layout> -->
    <view class="me_header">
      <view class="user_info">
					<template v-if='userId'>
						<view class="user_infor">
							<image :src="userInfo.avatarUrl || '../../static/cart.png'"
             mode="" />	
						 <view class="user_base">
						 		<view class="user_nickname">
									{{userInfo.nickName || 'stmy'}}
								</view>
								<view class="user_geren user_card">
									<text class="mr-5">{{userInfo.province || '中国'}}  </text>
									<text>{{userInfo.city || '深圳'}}</text>
								</view>
						 </view>
						</view>
				</template>
				<template v-else>
					<view @click="goLogin" class="login_title">
						登录查看更多
					</view>
				</template>
      </view> 
      <view class="user_need">
        <view class="need_left">
          <view @click="goOrder()" class="user_order textCenter">
            <view class="textCenter">{{orderTotal || 0}}</view>
            <view>我的订单</view>
          </view>
          <view @click="goBasket()" class="user_basket textCenter">
            <view>{{basketTotal || 0}}</view>
            <view>菜篮子</view>
          </view>
        </view>
        <view class="need_right">
					<view @click="goSetting()" class="setting">
						 <image style="width: 20px;height: 20px;display: block;" src="../../static/setting.png" mode=""></image>
					</view>        
				</view>
     </view>
    </view>
    <view class="me_content">
      <van-tabs animated="true"  color="#FDAB61" swipeable>
        <van-tab title="笔记">
          <scroll-view  class="scroll_tab" scroll-y="true" >
          <view v-for="(item,index) in noteList" @click="goNoteDetail(item._id)" :key="index" class="note_item">
          <view class="item_img">
            <image :src="item.note_imgUrl[0]" mode="aspectFill"></image>            
          </view>
          <view class="item_content">
            {{item.note_content}}
          </view>
          <view class="item_profile">
          <image class="note_user_img" :src="item.user_imgUrl" mode=""></image>              
          <text class="note_user_name" >{{item.note_name}}</text>
          </view>  
          </view>           
          </scroll-view>
        </van-tab>
        <van-tab title="收藏"> 
        <scroll-view  class="scroll_tab" scroll-y="true" >
            <view v-for="(item,index) in starList" @click="navToDetailSource(item.source_id)" :key="index" class="note_item">
            <view class="item_img">
            <image style="height: 150px;" :src="item.soure_imgUrl" mode="scaleToFill"></image>            
            </view>
            <view class="item_sourcename">
              {{item.source_name}}
            </view>  
            </view>    
        </scroll-view>
      </van-tab>

      </van-tabs>   
      </view>
  </div>
</template>

<script>
  import loadingLayout from '../../components/loading-layout/loading-layout.vue'
  import {
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        code: null,
        starList: null,
        basketList: null,
        noteList: [],
        orderTotal:null,
        basketTotal:null,
        isShow:false
      }
    },
    computed: {
      ...mapState({
				userId:state=> state.user.userId,
				userInfo:state=> state.user.userInfo
			})
    },
    components:{
      loadingLayout,
    },
    onShow() {
      if(this.userId){
        this.isShow = true
        this.initData()
      }
    },
    methods: {
      ...mapMutations(['login']),
      initData() {
        this.$api.commonCloud('getStar', {
          user_id: this.userId
        }).then(res => {
					console.log('res',res)
          this.starList = res.data
        })
        this.$api.commonCloud('getownNote', {
          user_id: this.userId
        }).then(res => {
					console.log('getownNote',this.userId)
          this.noteList = res.data
        })
        this.$api.commonCloud('getOrder',{
          user_id: this.userId
        }).then(res=>{
          this.orderTotal = res.data.length
        })
        this.$api.commonCloud('getBasket',{
          user_id: this.userId
        }).then(res=>{
          this.basketTotal = res.data.length
          this.isShow = false
        })
        
      },
      navToDetailSource(sourceId) {
        uni.navigateTo({
          url: `/pages/sourceDetail/sourceDetail?id=${sourceId}`
        })
      },
      goBasket() {
				if(this.userId){
					 uni.navigateTo({
						url: `/pages/basket/basket`
					})
				}else{
					this.goLogin()
				}
      },
      goNoteDetail(noteId) {
        uni.navigateTo({
          url: `/pages/nodeDetail/nodeDetail?id=${noteId}`
        })
      },
      goOrder(){
				if(this.userId){
					 uni.navigateTo({
						url: `/pages/order/order?id=${this.userId}`
					})
				}else{
					this.goLogin()
				}
       
      },
      goSetting(){
        uni.navigateTo({
          url: `/pages/setting/setting`
        })
      },
			goLogin(){
				uni.navigateTo({
				  url: `/pages/wxlogin/wxlogin`
				})
			},
      gowritenote(){
        uni.navigateTo({
          url:`/pages/writeNote/writeNote`
        })
      }
    }
  }
</script>

<style lang="less" scoped>
	.me_wrapper{
		.me_header{
			width: 100%;
			height: 36vh;
			background-color: #FDAB61;
			box-sizing: border-box;
			padding: 0px 20px;
			.user_info{
				height: 26vh;
				display: flex;
				align-items: center;
				.user_infor{
					margin-top: 10vh;
					display: flex;
					align-items: center;
					.user_base{
						.user_nickname{
							font-size: 25px;
							color: #FFFFFF;
							font-weight: bold;
							margin-bottom: 5px;
						}
						.user_card{
							border: 1px solid #fff;
							color: #fff;
							border-radius: 6px;
							padding: 1px 5px;
							margin-right: 8px;
							font-size: 10px;
							font-weight: bold;
						}
					}
					image{
						width: 70px;
						height: 70px;
						border-radius: 50%;
						border: 2px solid #fff;
						margin-right: 20px;
					}	
				}
				.login_title{
					margin-top: 10vh;
					font-weight: 700;
					font-size: 24px;
					color: #FDAB61;
					background-color: #fff;
					border-radius: 12px;
					padding: 5px 10px;
					}
				}
			.user_need{
				height: 10vh;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.need_left{
					display: flex;
					align-items: center;
					.user_order,.user_basket{
						font-weight: 700;
						font-size: 14px;
						color: #fff;
					}
					.user_order{
						margin-right: 20px;
					}
				}
				.need_right{
					.setting{
					}
				}
			}
		}
		.me_content{
			background-color: #FFF;
			position: absolute;
			top: 36vh;
			width: 100%;
			border-radius: 10px;
		}
	}
  .me_infor {
    
  }
  .me_content{
 
  }
  .scroll_tab{
    overflow: hidden;
    height: calc(100vh - 333px);
    margin-top: 10px;
  }
  .van-tabs__nav{
     background-color:#fff    
  }
  .van-tabs__wrap{
    border-radius: 10px;

  }
  .note_item{
    width: 50%;
    float: left;
    margin-bottom: 15px;
  }
  .note_item .item_content{
    padding: 0 10px;
    font-size: 13px;
    color: #555;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .note_item .item_img{
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
  }
 .note_item .item_img_star{
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    height: 150px;
  }
  .note_item .item_img image{
    width: 100%;
  /*  border-radius:5px; */
  } 
  .note_item .item_img_star image{
    width: 100%;
  /*  border-radius:5px; */
  } 
  .item_sourcename{
    text-align: center;
  }
  .note_item .item_profile{
    padding: 0 10px;
    display: flex;
    align-items: center;
  }
  .note_item .item_profile .note_user_img{
    border-radius: 50%;
    width:40rpx;
    height: 20px;
  }
  .note_item .item_profile .note_user_name{
    margin-left: 5rpx;
    font-size: 12px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .me_infor .user {
    padding-top: 100px;
    padding-left: 15px;
    width: 100%;
    display: flex;
  }

  .me_infor .user .user_infor {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 17px;
  }

  .me_infor .user .user_infor .user_nickname {
    font-size: 20px;
    color: #3C3C3C;
    font-weight: bold;
  }

  .me_infor .user .user_infor .user_geren .user_sex {
    border: 1px solid #3C3C3C;
    color: #3C3C3C;
    padding: 1px 3px;
    border-radius: 5px;
    font-size: 12px;
  }

  .me_infor .user .user_infor .user_geren .user_address {
    border: 1px solid #3C3C3C;
    color: #3C3C3C;
    padding: 1px 3px;
    border-radius: 5px;
    font-size: 12px;
    margin-left: 10px;
  }
  .me_infor .user_need{
    display: flex;
    align-items: center;
    justify-content: space-between;
     padding: 25px 15px 80px 15px;
  }
  .me_infor .user_need .need_left {
    display: flex;
    align-items: center;
   
  }
  .me_infor .user_order,
  .me_infor .user_basket {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 15px;
    color: #3C3C3C;
  }
  .me_infor .user_basket {
    margin-left: 10px;
  }
  .need_right{
    display: flex;
    align-items: center;
  }
  .need_right .writeNote{
    padding: 0px 10px;
  }
  .need_right .setting{
    padding: 0px 10px;
  }
  .wxlogin{
    margin: 200px auto; 
  }
  .login_content image{
    display: block;
    margin: 0 auto;
  }
  .login_content .content1{
    padding: 10px 0px;
    color: #666;
    font-size: 14px;
    text-align: center;
  }
  .login_btn{
    background-color: #FDAB61;
    color: #fff;
    padding: 8px 40px;
    margin: 20px 70px;
    text-align: center;
  }
	.textCenter{
		text-align: center;
	}
	.mr-5{
		margin-right: 5px;
	}
</style>
