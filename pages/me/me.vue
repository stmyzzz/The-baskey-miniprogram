<template>
  <div class="me_container">
    <show-loading v-if="isShow"></show-loading>
    <view v-if="user_id" class="login_true">
    <view class="me_infor">
      <view  class="user">
        <image style="width:80px;height:80px;border-radius: 50%;border: 2px solid #FDAB61;" :src="userInfo.avatarUrl"
          mode=""></image>
        <view class="user_infor">
          <view class="user_nickname">
            {{userInfo.nickName}}
          </view>
          <view class="user_geren">
            <text v-if="userInfo.gender == 1" class="user_sex">
              男
            </text>
            <text class="user_sex" v-else>
              女
            </text>
            <text class="user_address">{{userInfo.country}} {{userInfo.province}} {{userInfo.city}}</text>
          </view>
        </view>

      </view> 
      <view class="user_need">
        <view class="need_left">
          <view @click="goOrder()" class="user_order">
            <text>{{orderTotal}}</text>
            <text>我的订单</text>
          </view>
          <view @click="goBasket()" class="user_basket">
            <text>{{basketTotal}}</text>
            <text>菜篮子</text>
          </view>
      </view>
      <view class="need_right">
      <view @click="gowritenote()" class="writeNote">
         <image style="width: 30px;height: 30px;display: block;" src="../../static/writenote.png" mode=""></image>
      </view>
      <view @click="goSetting()" class="setting">
         <image style="width: 30px;height: 30px;display: block;" src="../../static/setting.png" mode=""></image>
      </view>        
      </view>

     </view>
    </view>
    <view class="me_content">
      <van-tabs animated="true"  color="#FDAB61" swipeable>
        <van-tab  title="笔记">
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
        </view>
    
 <view class="wxlogin" v-else>
   <view class="login_content">
     <image style="width: 100px;height: 100px;" src="../../static/ingre_nav2.png" mode=""></image>
     <view class="content1">
       烘培的麦香，人生的芬芳，登录查看收藏。
     </view>
   </view>
   <button open-type="getUserProfile" @click="getUserProfile" type="default" class="login_btn">
     登录
   </button>
   
 </view>
  </div>
</template>

<script>
  import showLoading from '../../components/showLoading'
  import {
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        code: null,
        userInfo: {},
        user_id: null,
        starList: null,
        basketList: null,
        noteList: null,
        orderTotal:null,
        basketTotal:null,
        isShow:false
      }
    },
    computed: {
      ...mapState([
        'haslogin'
      ])
    },
    components:{
      showLoading
    },
    onShow() {
      this.userInfo = uni.getStorageSync('userInfo');
      this.user_id = uni.getStorageSync('user_id');
      if(this.user_id){
        this.isShow = true
      this.initData()
      }
    },
    methods: {
      ...mapMutations(['login', 'get_userId']),
      initData() {
        let user_id = this.user_id
        var that = this
        console.log('use11r_id',user_id)
        this.$api.commonCloud('getStar', {
          user_id: user_id
        }).then(res => {
          that.starList = res.data
        })
        console.log('user_id',user_id)
        this.$api.commonCloud('getownNote', {
          user_id: user_id
        }).then(res => {
          console.log('notes', res.data)
          that.noteList = res.data
        })
        this.$api.commonCloud('getOrder',{
          user_id:user_id
        }).then(res=>{
          this.orderTotal = res.data.length
        })
        this.$api.commonCloud('getBasket',{
          user_id:user_id
        }).then(res=>{
          this.basketTotal = res.data.length
          this.isShow = false
        })
        
      },
      getUserProfile() {
        var that = this;
        uni.getUserProfile({
          lang: "zh_CN",
          desc: 'weixin',
          success: res => {
            uni.showLoading({
              title: "加载中..."
            })
            console.log(res.userInfo)
            that.userInfo = res.userInfo
            that.login(res.userInfo)
            uni.login({
              provider: 'weixin',
              success: function(e) {
                const code = e.code
                that.getuserid(code)
              }
            })
          },
          fail: err => {
            uni.showToast({
              title:'需要登录才能查看哟',
              mask:true,
              icon:"none"
            })
          }
        })
      },
      getuserid(code) {
        var that = this;
        this.$api.commonCloud('wxlogin',{
          code:code
        }).then(res=>{
            let user_id = res.data.openid
            that.get_userId(user_id)
            that.userInfo = uni.getStorageSync('userInfo');
            that.user_id = uni.getStorageSync('user_id');
            console.log('getuser_id',user_id)
            that.initData()
            uni.hideLoading()
        })
      },
      navToDetailSource(sourceId) {
        uni.navigateTo({
          url: `/pages/sourceDetail/sourceDetail?id=${sourceId}`
        })
      },
      goBasket() {
        uni.navigateTo({
          url: `/pages/basket/basket`
        })
      },
      goNoteDetail(noteId) {
        uni.navigateTo({
          url: `/pages/nodeDetail/nodeDetail?id=${noteId}`
        })
      },
      goOrder(){
        let userId = this.user_id
        uni.navigateTo({
          url: `/pages/order/order?id=${userId}`
        })
      },
      goSetting(){
        uni.navigateTo({
          url: `/pages/setting/setting`
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

<style>
  .me_infor {
    width: 100%;
    overflow-x: hidden;
    background-color: #FDAB61;
  }
  .me_content{
    background-color: #FFF;
    position: absolute;
    top: 250px;
    width: 100%;
    margin-top: 20px;
    border-radius: 10px;
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
  
  
</style>
