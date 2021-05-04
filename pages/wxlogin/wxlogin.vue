<template>
	<view class="wxlogin">
		
		  <view class="login_content">
		    <image style="width: 100px;height: 100px;" src="../../static/ingre_nav2.png" mode=""></image>
		    <view class="content1">
		      烘培的麦香，人生的芬芳，登录查看收藏。
		    </view>
		  </view>
		  <view type="default" @click="getUserInfo" class="login_btn">
		    登录
		  </view>
	</view>
</template>

<script>
  import {
    mapMutations
  } from 'vuex'
	export default {
		data() {
			return {
        code:null
				
			}
		},
		methods: {
      ...mapMutations(['login', 'get_userId']),
      getUserInfo() {
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
          uni.hideLoading()
          uni.navigateBack()
        })
      },
		}
	}
</script>

<style>
  .wxlogin{
    margin: 150px auto; 
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
