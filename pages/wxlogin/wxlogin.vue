<template>
	<view class="wxlogin_wrapper">
		<image style="width: 100px;height: 100px;" src="../../static/ingre_nav2.png" mode=""></image>
		<view class="login_title">
			烘培的麦香，人生的芬芳，登录查看收藏。
		</view>
		<view type="default" @click="getUserInfo" class="login_btn">
			登录
		</view>
	</view>
</template>

<script>
  import {
    mapMutations,
		mapState
  } from 'vuex'
	export default {
		data() {
			return {
			}
		},
		computed:{
			...mapState({
				userInfo:state=> state.user.userInfo,
				userId:state => state.user.userId
			}),
		},
		methods: {
      ...mapMutations(['setUserInfo', 'setUserId']),
      getUserInfo() {
        uni.getUserProfile({
          lang: "zh_CN",
          desc: 'weixin',
          success: res => {
            uni.showLoading({
              title: "加载中..."
            })
            this.setUserInfo(res.userInfo)
            uni.login({
              provider: 'weixin',
              success: (e)=>{
								const code = e.code
								this.getUserId(code)
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
        this.$api.commonCloud('wxlogin',{
          code:code
        }).then(res=>{
          let user_id = res.data.openid
          this.setUserId(user_id)
          uni.hideLoading()
          uni.navigateBack()
        })
      },
		}
	}
</script>

<style lang='less' scoped>
  .wxlogin_wrapper{
    margin: 150px auto; 
		image{
		  display: block;
		  margin: 0 auto;
		}
		.login_title{
			padding: 10px 0px;
			color: #666;
			font-size: 14px;
			text-align: center;
		}
		.login_btn{
			background-color: #FDAB61;
			color: #fff;
			padding: 8px 40px;
			margin: 10px 70px;
			text-align: center;
		}
	}
  

</style>
