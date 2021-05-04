<template>
	<view class="sourceDetail_container">
		<view class="sourceDetail_content" v-for="(item,index) in source" :key="index">
			<video class="source_video" :src="item.videoUrl[0]" controls>
      </video>
			<view class="source_name">
				{{item.source_name}}
			</view>
			<view class="source_descrption">
				{{item.descrptions}}
			</view>
			<!-- <view type="default" :class="isStar ? 'Star' : 'noStar'" @click="onStar(item._id,item.source_name,item.imgUrl)">收藏</view> -->
      <view class="ingre_container">
        <view class="ingre_header">
          <view class="header_left">
            用料
          </view>
          <view :class="onBasket ? 'onBasket1' : 'offBasket1'" class="basket" @click="addBasket(source[0]._id,source[0].source_name,source[0].ingredients)">菜篮子</view>
        </view>
        <view class="ingre_content" v-for="(ingreitem,ingreindex) in item.ingredients" :key="ingreindex" >
          <view class="ingre_item">
            <text class="item_name">{{ingreitem.name}}</text>
            <text class="item_foodNum">{{ingreitem.food_num}}</text>
          </view>	
        </view>        
      </view>

				<view class="cook_container">
					<view class="cook-skep" v-for="(stepitem,stepindex) in item.cook_step" :key="stepindex" >
							<text class="cook_header">步骤{{stepindex+1}}</text>
							<image class="cook_img" :src="stepitem.cook_imgUrl" mode=""></image>
							<text class="cook_content">{{stepitem.cook_content}}</text>
					</view>
			</view>
      
      <view class="tabbar_container">
      	<view @click="onStar(item._id,item.source_name,item.imgUrl)" :class="isStar ? 'Star' : 'noStar'"  class="tab">
          <view>收藏</view>
      	</view>
        <view class="tab">
          <button type="default" hover-class="none" open-type="share" >分享</button>
        </view>
      </view>
      
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				source:{},
				user_id:null,
				isStar:false,
        isBasket:"放进菜篮子",
        onBasket:false  
			}				
		},
    computed:{
      ...mapState(['haslogin'])
    },
		methods: {
			onLoad(options){
        wx.setNavigationBarTitle({ title:options.name})
        uni.showLoading({
            title: "加载中..."
          })
				let sourceId = options.id
				console.log(sourceId)
				var that = this
				this.user_id = uni.getStorageSync('user_id')
				console.log(this.user_id)
				let user_id = this.user_id
				uniCloud.callFunction({
					name: 'getSourceDetail',
					data:{
						id:sourceId
					}
				}).then(res => {
					console.log(res.result.data)
					this.source = res.result.data
				})
				uniCloud.callFunction({
					name: 'getStar',
					data:{
						user_id:user_id,
						source_id:sourceId
					}
				}).then(res => {
					console.log(res.result.data)
					if(res.result.data.length){
						that.isStar = true
					}else{
						that.isStar =false
					}
				})
        uniCloud.callFunction({
        	name: 'searchBasket',
        	data:{
        		user_id:user_id,
        		source_id:sourceId,
            }
        	}).then(res =>{
            console.log('resbasket',res)
            if(res.result.data.length){
            	this.isBasket = "移出菜篮子"
              this.onBasket = true
            }else{
              this.isBasket = "移入菜篮子"
              this.onBasket = false
          }
          uni.hideLoading()
          })
			},
			addBasket(_id,source_name,cook_step){
        let haslogin = this.haslogin
        if(!haslogin){
          console.log('nologin')
          uni.navigateTo({
            url:`/pages/wxlogin/wxlogin`
          })
          return
        }
        var that = this
				let user_id = this.user_id
        let sourceId = _id
        cook_step.forEach(item=>{
          item['isChecked'] = false
        })
        if(this.onBasket){
          uni.showLoading({
              title: "加载中..."
            })
          this.$api.commonCloud('addBasket',
          	{
          		user_id:user_id,
          		source_id:sourceId
          	}).then(res=>{  
          	console.log(res)
          	that.onBasket = false
            uni.showToast({
              title:'操作成功'
            })
          })
        }else{
          uni.showLoading({
              title: "加载中..."
            })
          this.$api.commonCloud('addBasket',
          	{
          		user_id:user_id,
          		source_id:sourceId,
          		source_name:source_name,
          		ingredients:cook_step
          	}).then(res=>{
          	console.log(res)
          	that.onBasket = true
            uni.showToast({
              title:'操作成功'
            })
          })
        }
			},
			onStar(itemId,itemName,imgUrl){
        let haslogin = this.haslogin
        if(!haslogin){
          console.log('nologin')
          uni.navigateTo({
            url:`/pages/wxlogin/wxlogin`
          })
          return
        }
			  let user_id = this.user_id
				let source_id = itemId
				let source_name = itemName
				let source_imgUrl = imgUrl
				var that = this
          if(this.isStar){
            uni.showLoading({
                title: "加载中..."
              })
						uniCloud.callFunction({
							name:'removeStar',
							data:{
								user_id:user_id,
								source_id:source_id
							}
						}).then(res=>{
							console.log(res)
							that.isStar = false
              uni.showToast({
                title:'操作成功'
              })
						})
					}else{
            uni.showLoading({
                title: "加载中..."
              })
						uniCloud.callFunction({
							name:'addStar',
							data:{
								user_id:user_id,
								source_id:source_id,
								source_name:source_name,
								source_imgUrl:source_imgUrl
							}
						}).then(res=>{
							console.log(res)
							that.isStar = true
              uni.showToast({
                title:'操作成功'
              })
						})
					}
				
			}
			
		}
	}
</script>

<style>
	.Star{
		background-color: #007AFF;
	}
	.noStar{
		background-color: #FF0000;
	}
  .onBasket1{
    background-color: #007AFF;
  }
  .offBasket1{
    background-color: #FF0000;
  }
  .sourceDetail_content .source_video{
    width: 100%;
  }
  .sourceDetail_content .source_name{
    margin: 20px 0;
    text-align: center;
    font-weight: 400;
    font-size: 23px;
  } 
  .sourceDetail_content .source_descrption{
    padding: 0 20px;
    margin: 10px 0;
    font-weight: 200;
  }
  .sourceDetail_container .ingre_container{
    width: 100%;
    border-bottom: 1px solid #F5F5F5;
  }
  .sourceDetail_container .ingre_container .ingre_header{
    display: flex;
    padding: 10px 20px;
    justify-content:space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .sourceDetail_container .ingre_container .ingre_header  .header_left{
    font-weight: bold;
    font-size: 17px;
  }
  .sourceDetail_container .ingre_container .basket{
   border: 2px solid black;
   border-radius: 21px;
   padding: 5px 15px;
  }
  .ingre_content{
    margin: 0px 20px;
    border-top: 1px solid #F5F5F5;
    padding: 12px 0px;
  }
  .sourceDetail_container .ingre_container .ingre_content .ingre_item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 300;
    font-size: 15px;width: 60%;
  }
  .cook_container .cook-skep{
    padding: 0px 20px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #F5F5F5;
  }
  .cook_container .cook-skep .cook_header{
    height: 45px;
    line-height: 45px;
    font-size: 17px;
    font-weight: bold;
  }
  .cook_container .cook-skep .cook_img{
    border-radius: 5px;
  }
  .cook_container .cook-skep .cook_content{
    height: 45px;
    line-height: 45px;
    font-size: 14px;
  } 
  .tabbar_container{
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    right: 0;
    background-color: #fff;
    border-top: 1px solid #F5F5F5;
    padding-bottom: 40px;
    
  }
  .tabbar_container .tab{
    flex: 1;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
  .tabbar_container .tab button{
    border: none;
    outline: none;
    background-color: #fff;
     font-size: 14px;
     height: 100%;
     display: flex;
     align-items: center;
     justify-content: center;
  }
  .tabbar_container .tab button::after{
    border: none;
  }
  
</style>
