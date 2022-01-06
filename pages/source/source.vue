<template>
	<div class="source_container">
    <view class="input_container">
		<input type="text" @focus="this.hasHistory = 
		true" focus @blur="this.hasHistory = false,getCookBook()"
		 @confirm="handleSearch" 
		 confirm-type="search" v-model="searchFilter" 
		 placeholder="想烘培点什么呢？"/>
    <text v-if="hasHistory" @click="getAll">x</text>
    <view v-if="hasHistory" @click="getAll" class="cancel">取消</view>
    </view>
			<view class="content_container">
				<view v-if="hasHistory" class="search_history">
					<view class="history_title">
						搜索历史  
						<text class="remove_history" @click="removeHistory">清空</text>
					</view>
					<view class="history_content">
					<text @click="onhistorySearch(item)" v-for="(item,index) in historyList" :key="index" class="history_item">
						{{item}}
					</text>          
					</view>
				</view>	
				<u-loading-page :loading='isListLoading'></u-loading-page>
					<template v-if="!hasHistory" >
							<u-list
							    height='calc(100vh - 50px)'
									@scrolltolower="scrolltolower"
									v-if='sourceList.length !==0' 
								>	
								<view class="source_item" @click="navToDetailSource(item._id,item.source_name)" v-for="(item,index) in sourceList" :key="index">
							<view style="width: 95px;" class="source-img">
								<image style="width: 100%;" :src="item.imgUrl" mode="scaleToFill"></image>  
							</view>
							<view class="source_infor">
								<view class="source_name">{{item.source_name}}</view>
								<view class="source_description">{{item.descrptions}}</view>
								<view class="source_ingre">
									<text v-for="(ingreitem,ingreindex) in item.ingredients.slice(0, 4) " :key="ingreindex">
										{{ingreitem.name}}</text>
								</view>
							</view>
						</view>   
						<u-loading-icon class="mt-10" :show='isMoveLoading' mode="circle"></u-loading-icon>
						<view class="isShowAll mt-10" v-if="isShowAll">
							没有更多啦
						</view>
								</u-list>
						<view v-if='sourceList.length ===0'>
							<u-empty
								mode="search"						
								icon="http://cdn.uviewui.com/uview/empty/car.png"
							>
							</u-empty>
						</view>
					</template>   	
			</view>
    <basket-icon :isBasket="isBasket">
    </basket-icon>
	</div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  import BasketIcon from '../../components/basket-icon.vue' 
	export default{
		data(){
			return {
				searchValue:'',
				sourceList:[],
        hasHistory:false,
        hasContent:false,
        historyList:[],
				searchFilter:'',
				isListLoading:false,
				total:10,
				limit:7,
				isShowAll:false,
				isMoveLoading:false,
			}
		},
		onShow(){
			this.initData();
			this.$api.commonCloud('getSource').then(res => {
				this.total = res.data.length
			})
		},
    components:{
      BasketIcon
    },
    computed:{
      ...mapState(['isBasket','user_id'])
    },
		methods:{
			scrolltolower(){
				if(this.sourceList.length!==0 &&this.sourceList.length === this.total && this.sourceList.length>=this.limit){
					this.limit = 7
					this.isShowAll = true
				}else{
				this.isMoveLoading = true
				console.log(this.isShowAll)
				this.$api.commonCloud('getSource',{
			  limit:this.limit+=2
					}).then(res=>{	
					this.isMoveLoading = false
					this.sourceList = res.data
				})
			}
			},
      ...mapMutations(['setBasket']),
      initData(){
				this.historyList= uni.getStorageSync('historyList') || []
      },
			getCookBook(){
				if(this.searchFilter){
					this.searchWhere()
				}else{
					this.searchAll()
				}
			},
			searchAll(){
				this.isListLoading = true
				this.$api.commonCloud('getSource',{
					limit:this.limit
				}).then(res => {
					console.log('getSource',res)
					const {data} = res
					this.sourceList = data
					this.isListLoading = false
				})
			},
			searchWhere(){
				this.isListLoading = true
					this.$api.commonCloud('searchSource',{
					  name:this.searchFilter
					}).then(res=>{
						const {data} = res
						console.log('resss',res)
					  this.sourceList = data
						this.isListLoading = false
					}) 
			},
      onhistorySearch(value){
        this.searchFilter = value
				this.searchWhere()
      },
      removeHistory(){
        uni.removeStorageSync('historyList')
        this.historyList = uni.getStorageSync('historyList') || []
        this.getAll()
      },
			handleSearch(){
				const hasHistory = this.historyList.some(item => item === this.searchFilter)
				console.log('hasHistory',hasHistory)
          if(!hasHistory && this.searchFilter){
						this.historyList.push(this.searchFilter)
						uni.setStorage({
							key:'historyList',
							data:this.historyList
						})  
						this.historyList = uni.getStorageSync('historyList')		
					}
          this.getCookBook()
			},
      getAll(){
        this.searchFilter = ''
        this.getCookBook()
      },
      navToDetailSource(sourceId,name){
        uni.navigateTo({
          url: `/pages/sourceDetail/sourceDetail?id=${sourceId}&name=${name}`
        })
      }
		}
	}
</script>

<style>
	.mt-10{
		padding: 10px;
	}
	.isShowAll{
		text-align: center;
	}
  .input_container{
    display: flex;
    align-items: center;
    padding: 5px 20px;
    height: 35px;
    border-bottom: 1px solid #f5f5f5;
  }
  .input_container input{
    flex: 5;
  }
  .input_container .submit{
    flex: 1;
    color: red;
    text-align: right;
  }
  .input_container .cancel{
    flex: 1;
    text-align: right;
  }
  .content_container{
    margin: 10px 20px;
  }
  .source_item{
    height: 80px;
    margin-bottom: 15px;
    display: flex;
  } 
  .source-img{
    width: 30%;
    height: 100%;
  }
  .source-img image{
    height: 100%;
    width: 100%;
    border-radius: 5px;
  }
  .source_item .source_infor{
    width: 70%;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
  }
  .source_item .source_infor .source_name{
    font-weight: bold;
    font-size: 16px;
  }
  .source_item .source_infor .source_description{
    font-size: 13px;
    color: #555;
    max-width: 215px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 10px 0;
  }
  .source_item .source_infor .source_ingre{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
  }
  .source_item .source_infor .source_ingre text{
    background-color: #FDAB61;
    color: #fff;
    border-radius: 5px;
    padding: 0px 5px;
    box-sizing: border-box;
    margin-right: 5px;
    font-size: 10px;
    margin-top: 3px;
  }
  .content_container .search_history .history_title{
    font-size: 20px;
    font-weight: bold;
    padding: 5px;
    border-bottom: 1px solid #f5f5f5;
  }
  .content_container .search_history .history_title .remove_history{
    float: right;
    font-size: 15px;
    font-weight: 200;
    color: #666;
    line-height: 35px;
  }
  .content_container .search_history .history_content{
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
  }
  .content_container .search_history .history_item{
    background-color: #FDAB61;
    color: #fff;
    border-radius: 5px;
    padding: 5px 8px;
    font-size: 15px;
    margin-right: 5px;
    margin-top: 5px;
  }
</style>
