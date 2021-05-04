<template>
	<view class="setting_container">
    <view class="setting_top">
		<button open-type="feedback"feedback class="setting_item">
		  <text>意见反馈</text>
      <text>></text>
		</button>
    <button @click="goAbout()" class="setting_item">
      <text>关于我们</text>
      <text>></text>
    </button>      
    </view>

    <button @click="logout2()" class="logout">
      <text>退出登录</text>
      <text>></text>
    </button>
	</view>
</template>

<script>
  import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
      ...mapMutations(['logout']),
      goAbout(){
        uni.navigateTo({
          url:`/pages/about/about`
        })
      },
      logout2(){
        this.logout()
        uni.switchTab({
          url:`/pages/me/me`
        })
      }
			
		}
	}
</script>

<style>
  page{
    background-color: #F5F7F9;
    width: 100%;
    height: 100vh;
  }
  .setting_item{
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content:space-between;
    padding: 10px;
    font-size: 15px;
    font-weight: 300;
    color: black;
  }
  .setting_top{
    margin-top: 15px;
  }
  .logout{
    margin-top: 15px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content:space-between;
    padding: 10px;
    font-size: 15px;
    font-weight: 300;
    color: black;
  }
   button::after{
    border: none;
  }

</style>
