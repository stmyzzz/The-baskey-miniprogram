<template>
	<list @loadmore='loading(e)' show-scrollbar='false' class="index_container">
    <show-loading v-if="isShow" ></show-loading>
		<!-- 轮播 -->
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" indicator-active-color="#FDAB61" :circular="true" :interval="5000" :easing-function="linear" :duration="1000">
			<swiper-item class="swiper_item" v-for="(item,index) in banners" :key="index">
        <image :src="item.imgUrl" mode=""></image>
			</swiper-item>
		</swiper>
		<!-- 食谱信息 -->
    <view class="index_main_wrapper">
      <view class="cookbook_wrapper">
				<view class="cookbook_title">食谱</view>
        <view class="cook_items">
				  <view class="cook_item" v-for="(item,index) in Sources" :key="index" @click="navToDetailSource(item._id,item.source_name)">
			  		<image :src="item.imgUrl" mode="scaleToFill" />
			  	</view>          
	   	  </view>
      </view>
		<!-- 食材信息 -->
		<view class="ingre_wrapper">
      <view class="ingre_title">精选食材</view>
      <view class="ingre_items">
        <view class="ingre_item" v-for="(item,index) in foods" @click="navToDetailIngre(item._id,item.food_name)" :key="index">
        	<image :src="item.imgUrl" mode="scaleToFill"></image>
          <view class="ingre_item_name">{{item.food_name}}</view>
        </view>          
      </view>
		</view>	
		<!-- 笔记信息 --> 
		
		<view class="note_wrapper">
      <view class="note_header">
        <view class="note_title">笔记</view>
        <view class="title_detail" @click="goNote">更多</view>
			</view>
      <view class="note_items">
       <view class="note_item" v-for="(item,index) in notes" :key="index" @click="goNoteDetail(item._id)">
          <view class="item_img">
            <image :src="item.note_imgUrl[0]" mode="scaleToFill" />
					  <span class="item_content">
              {{item.note_name}}
            </span>
          </view>
        <view class="item_profile">
            <image class="note_user_img" :src="item.user_imgUrl" mode=""></image>              
            <text class="note_user_name" >{{item.user_name}}</text>
          </view>  
        </view> 
      </view>
	  </view>
  </view>
</list>
</template>

<script>
	export default {
		data() {
			return {
				title: '烘培首页',
				Sources:{},
				banners:{},
				foods:{},
				notes:[],
        isShow:true,
			}
		},
		components:{
		},
		onLoad() {
			this.initData();
		},
		methods: {
			initData() {
        this.$api.commonCloud('getSource',{
          limit:2
        }).then(res=>{
          this.Sources = res.data
        })
				this.$api.commonCloud('getBanners').then(res=>{
          this.banners = res.data
        })
				this.$api.commonCloud('getAllFoods',{
          limit:4
        }).then(res=>{
          this.foods = res.data
        })
				this.$api.commonCloud('getNote',{
          limit:4
        }).then(res => {
					console.log(res)
					this.notes = res.data
          this.isShow = false
				})
			},
			navToDetailSource(sourceId,name){
      	uni.navigateTo({
      		url: `/pages/sourceDetail/sourceDetail?id=${sourceId}&name=${name}`
      	})
			},
			navToDetailIngre(ingreId,name){
				uni.navigateTo({
					url: `/pages/ingreDetail/ingreDetail?id=${ingreId}&name=${name}`
				})
			},
      goNote(){
        uni.navigateTo({
          url:'/pages/note/note'
        })
      },
      goNoteDetail(itemId){
        uni.navigateTo({
          url:`/pages/nodeDetail/nodeDetail?id=${itemId}`
        })
      }
		}
	}
</script>

<style lang='less' scoped>
  .wx-swiper-dots.wx-swiper-dots-horizontal{
  margin-bottom: 20px;
  }
	.swiper{
	  width: 100%;
	  height: 260px;
		.swiper_item image{
	  width: 100%;
	  height: 100%;
	  }
	}
  .index_main_wrapper{
    position: absolute;
    top: 240px;
    width: 100%;  
		.cookbook_wrapper{
      padding:0 10px 5px 10px;
      border-top-right-radius: 12px;
      border-top-left-radius: 12px;
      background-color: #fff;
			.cookbook_title{
			  font-size: 16px;
			  font-weight: bold;
			  padding: 12px 0;
			}
			.cook_items{
			  display: flex;
			  align-item: center;
			}
			.cook_item{
			  flex: 1;
			  padding: 0 5px;
				image {
			    width: 100%;
		  	  height: 114px;
			    border-radius: 4px;
		  	}
			}
    }
  }
  .ingre_wrapper{
    padding:0 10px 5px 10px;
		.ingre_title{
      font-size: 16px;
      font-weight: bold;
      padding: 14px 0;
    } 
		.ingre_items{
      display: flex;
      align-items: center;
			.ingre_item{
        flex: 1;
        text-align: center;
				image{
					width:50px;
					height:50px;
				}
				.ingre_item_name{
          font-size: 12px;
        }
      }
    }
  }
  .note_wrapper{
    padding:0 10px 5px 10px; 
		.note_header{
      display: flex;
      align-items: center; 
      padding: 10px 0; 
			.note_title{
        font-size: 16px;
        font-weight: bold;
      }
			.title_detail{
        font-size: 12px; 
        position: absolute;
        right: 20px;
        font-weight: 600;
        color: #666;
      }
    }
		.note_items{
			column-count: 2;
			column-gap: 20px;
			.note_item{
        width: 100%;
        margin-bottom: 15px;
				.item_img{
					image{
						width: 100%;
						border-radius:5px;
					} 
				} 
				.item_content{
					padding: 0 10px;
					font-size: 13px;
					color: #555;
					overflow: hidden; /* 多余内容隐藏显示*/
					white-space: nowrap; /* 不换行*/
					text-overflow: ellipsis; /* 多行文本溢出*/
				}
				.item_profile{
					padding: 0 10px;
					display: flex;
					align-items: center;
				}
      }
		}
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
  }
  
</style>
