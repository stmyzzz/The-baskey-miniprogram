<template>
	<!-- 瀑布流布局列表 -->
	<view class="waterfall">
		<view class="waterfall-list">
			<view class="waterfall-item" @click="goNoteDetail(item._id)" v-for="(item, index) in list" :key="index">
			 <image :src="item.note_imgUrl[0]" mode="widthFix" />
				 	<view class="waterfall-content">
				   	<span class="item_content">
				      {{item.note_name}}{{index}}
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
</template>

<script>
	export default {
		props:{
			// 数据流
			list: {
				type: Array,
				default:[]
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			goNoteDetail(itemId){
			  uni.navigateTo({
			    url:`/pages/nodeDetail/nodeDetail?id=${itemId}`
			  })
			}
		}
	}
</script>

<style lang="less">
.waterfall {
		padding: 15rpx;
	}
	.waterfall-list {
		column-count: 2;
		column-gap: 20rpx;
	}
	.waterfall-item {
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		background-color: #fff;
		break-inside: avoid;
		/*避免在元素内部插入分页符*/
		box-sizing: border-box;
		margin-bottom: 20rpx;
		border-radius: 10rpx;
		image {
			width: 100%;
		}
		.item_profile{
			.note_user_img{
				border-radius: 50%;
				width:30px;
				height: 30px;
			}
			.note_user_name{
				margin-left: 5rpx;
				font-size: 12px;
				font-weight: bold;
			}
		} 
	}
	
	
</style>
