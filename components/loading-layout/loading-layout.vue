<template>
	<view class="loading">
    <view class="loading_img">
		  <image style="width: 60px;height: 60px;" src="../../static/logo.png" mode=""></image>
        <view style="text-align: center;" class="">
        加载中...
        </view>
    </view>
	</view>
</template>

<script>
	export default {
		name:'showLoading',
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less" scoped>
  .loading{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: #fff;
		.loading_img{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    }
  }
</style>
