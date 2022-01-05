<template>
	<view class="wxlogin_wrapper">
		<view class="login_main">
		  <image src="../../static/ingre_nav2.png" mode=""></image>
		  <view class="main_title">
		    烘培的麦香，人生的芬芳，登录查看收藏。
		  </view>
		  <view type="default" @click="getUserInfo" class="login_btn">
		    登录
		  </view>	  
		</view>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		name:"login-layout",
		data() {
			return {
				
			};
		},
		methods:{
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
			          that.getUserId(code)
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
			getUserId(code) {
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

<style lang="less">
  .wxlogin_wrapper{
    margin: 150px auto; 
		.login_main{
		  image {
		  	width: 100px;
		  	height: 100px;
			  display: block;
	  	  margin: 0 auto;
			}		
			.main_title{
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
		}
		
  }
</style>
