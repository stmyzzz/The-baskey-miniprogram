<template>
	<view class="nodeDetail_container">
		<view class="nodeDetailItem" v-for="(item,index) in note" :key="index">
      <swiper ref="swiper" indicator-dots="true"  class="node_img">
        <swiper-item v-for="(imgitem,imgindex) in item.note_imgUrl" :key="imgindex" >
          <image ref="img" :src="imgitem" mode="widthFix"></image>
        </swiper-item>
      </swiper>
      <view class="note_user">
        <view class="user_img">
          <image :src="item.user_imgUrl" mode=""></image>
        </view>
        <view class="user_name">
          {{item.user_name}}
        </view>
      </view>
		 <!-- {{item.note_name}}
      {{item.note_content}}
      {{noteDate}}
      <view @click="removeNote(item._id)" class="">
        删除这条笔记
      </view> -->
      <view class="note_content">
        <view class="note_title">
          {{item.note_name}}
        </view>     
        <view class="note_main">
          {{item.note_content}}
        </view>	 
      </view>
    <view class="note_date">
      {{noteDate}}
    </view>
    </view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				note:null,
        noteDate:null
			}
		},
    onLoad(options){
      uni.showLoading({
        title: "加载中..."
      })
      let noteId = options.id
      this.$api.commonCloud('getNote',{
        _id:noteId
      }).then(res=>{  
        this.note = res.data
        this.noteDate = res.data[0].note_time.substring(0,10)
        uni.hideLoading()
      })
    },
		methods: {
      removeNote(itemId){
        this.$api.commonCloud('removeNote',{
          _id:itemId
        }).then(res=>{
          console.log(res)
          uni.navigateBack({
            delta:1
          })
        })
      },
		}
	}
</script>

<style>
  .nodeDetail_container .nodeDetailItem .node_img{
    width: 100%;
    height: 270px;
  }
  .nodeDetail_container .nodeDetailItem .node_img image{
    width: 100%;
    /* 
    img 360 240
    swiper width / swiper height = img width / img height
    swiper height = swiper width * img height /img width
    height:100vw*240 /360
      */
  }
  .note_user{
    display: flex;
    align-items: center;
    padding: 15px 20px 10px 20px;
  }
  .note_user .user_img{
    width: 50px;
    height: 50px;
  }
  .user_img image{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .user_name{
    margin-left: 10px;
    font-weight: 17px;
    font-weight: bold;
    
  }
  .note_content{
    padding:10px 20px 0px 20px;
  }
  .note_content .note_title{
    font-size: 15px;
    font-weight: 600;
  }
  .note_content .note_main{
    padding-top: 15px;
  }
  .note_date{
    padding:5px 20px;
    color: #666666;
    font-size: 12px;
  }
  
  

</style>
