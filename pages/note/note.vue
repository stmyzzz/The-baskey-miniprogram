<template>
	<view class="note_container">
    <view class="note_ul">
    <view class="note_item" v-for="(item,index) in noteList" :key="index" v-show="index%2 == 1" @click="goNoteDetail(item._id)">
      <view class="item_img">
      <image :src="item.note_imgUrl[0]" mode="widthFix"></image>            
      </view>
      <view class="item_content"> 
        {{item.note_title}}
      </view>
      <view class="item_profile">
      <image class="note_user_img" :src="item.user_imgUrl" mode=""></image>              
      <text class="note_user_name" >{{item.note_name}}</text>
      </view>   
    </view>       
    </view>
    <view class="note_ul">
    <view class="note_item" v-show="index%2 == 0" v-for="(item,index) in noteList" :key="index" @click="goNoteDetail(item._id)">
      <view class="item_img">
      <image :src="item.note_imgUrl[0]" mode="widthFix"></image>            
      </view>
      <view class="item_content"> 
        {{item.note_title}}
      </view>
      <view class="item_profile">
      <image class="note_user_img" :src="item.user_imgUrl" mode=""></image>              
      <text class="note_user_name" >{{item.note_name}}</text>
      </view>   
    </view>       
    </view>
    <!-- <view @click="addNote" class="add">发布心得</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
        noteList:{}
				
			}
		},
    onShow(){
      this.initData() 
    },
		methods: {
			initData(){
        this.$api.commonCloud('getNote').then(res=>{
          this.noteList = res.data
        })
      },
      goNoteDetail(itemId){
        uni.navigateTo({
          url:`/pages/nodeDetail/nodeDetail?id=${itemId}`
        })
      },
      addNote(){
        uni.navigateTo({
          url:`/pages/writeNote/writeNote`
        })
      }
		}
	}
</script>

<style>
  .note_container{
    display: flex;
    margin-top: 10px;
  }
  .note_ul{
    width: 50%;
  }
  .note_item{
    width: 100%;
    float: left;
    margin-bottom: 10px;
  }
  .note_item .item_content{
    padding: 0 10px;
    font-size: 13px;
    color: #555;
    overflow: hidden; /* 多余内容隐藏显示*/
    white-space: nowrap; /* 不换行*/
    text-overflow: ellipsis; /* 多行文本溢出*/
  }
  .note_item .item_img{
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .note_item .item_img image{
    width: 100%;
    border-radius:5px;
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
  }
  

</style>
