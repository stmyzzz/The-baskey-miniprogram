<template>
	<view class="cookbook_wrapper">
		<view class="cookbook_content">
			<img class="source-img" :src="cook.imgUrl" alt="">
			<view class="source_name">
				{{cook.source_name}}
			</view>
			<view class="source_descrption">
				{{cook.descrptions}}
			</view>
      <view class="ingre_container">
        <view class="ingre_header">
          <view class="header_left">
            用料
          </view>
					<view @click="addBasket(cook._id,cook.source_name,cook.ingredients)" class="basket">
						{{onBasket ? '移出菜篮子':'加入菜篮子'}}
					</view>
        </view>
        <view class="ingre_content" v-for="(ingreItem,ingreIndex) in cook.ingredients" :key="ingreindex" >
          <view class="ingre_item">
            <text class="item_name">{{ingreItem.name}}</text>
            <text class="item_foodNum">{{ingreItem.num}}</text>
          </view>	
        </view>        
      </view>
				<view class="cook_container">
					<view class="cook-skep" v-for="(stepItem,stepIndex) in cook.cook_step" :key="stepindex" >
							<view class="cook_header">步骤{{stepIndex+1}}</view>
							<image v-if='stepItem.cook_imgUrl' class="cook_img" :src="stepItem.cook_imgUrl" mode=""></image>
							<text class="cook_content">{{stepItem.cook_content}}</text>
					</view>
		  	</view>
      
      <view class="tabbar_container">
      	<view @click="handleStar(cook._id,cook.source_name,cook.imgUrl)"  class="tab">
          <view class="star_wrapper">
						<image :src="isStar ? activeStarImg : starImg " mode="" />
						<text>收藏</text>
					</view>
      	</view>
        <view class="tab">
          <button type="default" hover-class="none" open-type="share" >分享</button>
        </view>
      </view>
		</view>
    <basket-icon :isBasket="isBasket">
    </basket-icon>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
  import BasketIcon from '../../components/basket-icon.vue'
	export default {
		data() {
			return {
				activeStarImg:'../../static/active_star.png',
				starImg:'../../static/star.png',
				cook:{},
				isStar:false,
        onBasket:false,
        isBasket:uni.getStorageSync('isBasket') || false
			}				
		},
    computed:{
      ...mapState({
				userId: state => state.user.userId
			})
    },
    components:{
      BasketIcon
    },
    onLoad(options){
        wx.setNavigationBarTitle({ title:options.name})
        uni.showLoading({
            title: "加载中..."
          })
				const sourceId = options.id
				console.log(this.userId)
				const userId = this.userId
        this.$api.commonCloud('getSourceDetail',{
          id:sourceId
        }).then(res => {
					const {data} = res
					console.log('data',data)
					this.cook = data[0]
				})
				this.$api.commonCloud('getStar',{
						userId,
						source_id:sourceId
					}).then(res => {
					if(res.data.length){
						this.isStar = true
					}else{
						this.isStar =false
					}
				})
        this.$api.commonCloud('searchBasket',{
          userId,
          source_id:sourceId,
        }).then(res =>{
            if(res.data.length){
              this.onBasket = true
            }else{
              this.onBasket = false
          }
          uni.hideLoading()
          })
			},
		methods: {
			addBasket(_id,source_name,cook_step){
        if(!this.userId){
          uni.navigateTo({
            url:`/pages/wxlogin/wxlogin`
          })
        }else{
        let sourceId = _id
        cook_step.forEach(item=>{
          item['isChecked'] = false
        })
        if(this.onBasket){
          /* 删除菜篮子 */
          uni.showLoading({
              title: "加载中..."
            })
          this.$api.commonCloud('addBasket',
            {
              user_id:this.userId,
              source_id:sourceId
            }).then(res=>{  
            console.log(res)
            this.onBasket = false
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
              user_id:this.userId,
              source_id:sourceId,
              source_name:source_name,
              ingredients:cook_step
            }).then(res=>{
            console.log('res',res)
            this.onBasket = true
            uni.showToast({
              title:'操作成功'
            })
          })
        }
		}
		},
		handleStar(itemId,itemName,imgUrl){
        if(!this.userId){
          uni.navigateTo({
            url:`/pages/wxlogin/wxlogin`
          })
          return
        }
			  let userId = this.userId
				let source_id = itemId
				let source_name = itemName
				let source_imgUrl = imgUrl
          if(this.isStar){
            uni.showLoading({
                title: "加载中..."
              })
						this.$api.commonCloud('removeStar',{
              user_id:userId,
              source_id:source_id
            }).then(res=>{
							console.log(res)
							this.isStar = false
              uni.showToast({
                title:'操作成功'
              })
						})
					}else{
            uni.showLoading({
                title: "加载中..."
              })
						this.$api.commonCloud('addStar',{
              user_id:userId,
              source_id:source_id,
              source_name:source_name,
              source_imgUrl:source_imgUrl
            }).then(res=>{
							console.log(res)
							this.isStar = true
              uni.showToast({
                title:'操作成功'
              })
						})
					}
				
			}
			
		}
	}
</script>

<style lang="less" scoped>
  .onBasket::before{
    content:'从菜篮子中移除'
  }
  .offBasket::before{
    content:'丢进菜篮子'
  }
  .cookbook_content{
		.source-img{
			width: 100%;
		}
		.source_name{
			margin: 20px 0;
			text-align: center;
			font-weight: 400;
			font-size: 23px;
		} 
		.source_descrption{
			padding: 0 20px;
			margin: 10px 0;
			font-weight: 200;
		}
		.ingre_container{
			width: 100%;
			border-bottom: 1px solid #F5F5F5;
			.ingre_header{
				display: flex;
				padding: 10px 20px;
				justify-content:space-between;
				align-items: center;
				margin-bottom: 10px;
				.header_left{
					font-weight: bold;
					font-size: 16px;
				}			
				.basket{
					background-color: #f0ad4e;
					padding: 5px;
					border: 1px solid #fff;
					color: #fff;
					font-size: 13px;
					font-weight: bold;
					border-radius: 4px;
				}
			}		
			.ingre_content{
				margin: 0px 20px;
				border-top: 1px solid #dbdbdb;
				padding: 12px 0px;
				.ingre_item{
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-weight: 300;
					font-size: 15px;width: 60%;
				}
			}
		}
		.cook_container{
			padding-bottom: 100px;
			.cook-skep{
				padding: 10px 20px;
				display: flex;
				flex-direction: column;
				border-bottom: 1px solid #F5F5F5;
				.cook_header{
					font-size: 17px;
					font-weight: bold;
				}
				.cook_img{
					border-radius: 5px;
				}
				.cook_content{
					margin-top: 10px;
					font-size: 14px;
				} 
			}
		} 
		.tabbar_container{
			display: flex;
			align-items: center;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			right: 0;
			height: 13vh;
			background-color: #fff;
			border-top: 1px solid #F5F5F5;
			.tab{
				flex: 1;
				text-align: center;
				font-size: 15px;
				.star_wrapper{
					display: flex;
					align-items: center;
					justify-content: center;
					text{
						color: #f0ad4e;
						margin-left: 6px;
					}
				}
				image{
					width: 20px;
					height: 20px;
				}
				button{
					border: none;
					outline: none;
					background-color: #fff;
					display: flex;
					font-size: 15px;
					align-items: center;
					justify-content: center;
				}
				button::after{
					border: none;
				}
			}
		}
	}
</style>
