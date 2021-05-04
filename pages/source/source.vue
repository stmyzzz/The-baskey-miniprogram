<template>
	<div class="source_container">
    
    <view class="input_container">
		<input type="text" @focus="this.hasHistory = true" @blur="this.hasHistory = false" @confirm="onSearch" value="searchValue" confirm-type="search" v-model="searchValue" placeholder="想烘培点什么呢？"/>
    <text v-if="hasHistory" @click="getAll">x</text>
		<view class="submit" type="default" @click="onSearch">搜索</view>    
    <view v-if="hasHistory" class="cancel">取消</view>
    </view>
    <view  class="content_container">
      <view v-if="hasHistory" class="search_history">
        <view class="history_title">
          搜索历史  <text class="remove_history" @click="removeHistory">清空</text>
        </view>
        <view class="history_content">
        <text @click="onhistorySearch(item)" v-for="(item,index) in historyList" :key="index" class="history_item">
          {{item}}
        </text>          
        </view>

      </view>
      <view v-else class="source_item" @click="navToDetailSource(item._id,item.source_name)" v-for="(item,index) in sourceList" :key="index">
        <view style="width: 95px;" class="scoure_img">
          <image style="width: 100%;" :src="item.imgUrl" mode="scaleToFill"></image>  
        </view>
        <view class="source_infor">
          <view class="source_name">{{item.source_name}}</view>
          <view class="source_description">{{item.descrptions}}</view>
          <view class="source_ingre">
            <text v-for="(ingreitem,ingreindex) in item.ingredients" :key="ingreindex">{{ingreitem.name}}</text>
          </view>
        </view>
      </view>      
    </view>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				searchValue:'',
				sourceList:{},
        hasHistory:false,
        hasContent:false,
        historyList:[]
			}
		},
		onShow(){
			this.initData();
		},
		methods:{
      initData(){
        uni.showLoading({
          title: "加载中..."
        })
        this.getSource()
        let history = uni.getStorageSync('historyList')
        if(history){
          console.log("history exsit")
          this.historyList = history
        }
        uni.hideLoading()
      },
			getSource(){
				console.log('123')
				uniCloud.callFunction({
					name: 'getSource',
				}).then(res => {
					console.log(res.result.data)
					this.sourceList = res.result.data
				})
			},
      onhistorySearch(value){
        let searchValue = value
        this.searchValue = value
        this.$api.commonCloud('searchSource',{
          name:searchValue
        }).then(res=>{
          this.sourceList = res.data
        }) 
      },
      removeHistory(){
        uni.removeStorageSync('historyList')
        this.historyList = uni.getStorageSync('historyList')
        this.getAll()
      },
			onSearch(){
				let searchValue = this.searchValue
        searchValue.replace(/\s*/g,'')
        let historyList = this.historyList
        console.log('historyList',historyList)
            if(historyList.length){
              console.log("his1")
              let checkrepeat = false
              historyList.forEach(item=>{
                console.log(item)
                if(item == searchValue){
                  checkrepeat = true
                }
                console.log(checkrepeat)
              })
              if(!checkrepeat){
                console.log('push1')
                historyList.push(searchValue)
                uni.setStorage({
                  key:'historyList',
                  data:historyList
                })    
              }
            }else{
               historyList.push(searchValue)
            }
             uni.setStorage({
               key:'historyList',
               data:historyList
             })            
             
             this.historyList = uni.getStorageSync('historyList')
        
        if(searchValue == ""){
          this.getSource()
        }else{
          uni.showLoading({
              title: "加载中..."
            })
          this.$api.commonCloud('searchSource',{
            name:searchValue
          }).then(res=>{
            
            this.sourceList = res.data
            uni.hideLoading()
            
          }) 
        }
			},
      getAll(){
        this.searchValue = ""
        this.getSource()
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
    display: flex;
    height: 80px;
    margin-bottom: 15px;
  } 
  .source_item image{
    flex: 1;
    height: 100%;
    border-radius: 5px;
  }
  .source_item .source_infor{
    margin-left: 10px;
    flex: 2;
    display: flex;
    flex-direction: column;
  }
  .source_item .source_infor .source_name{
    font-weight: bold;
    font-size: 20px;
  }
  .source_item .source_infor .source_description{
    font-size: 15px;
    color: #555;
    max-width: 215px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .source_item .source_infor .source_ingre{
    max-width: 215px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .source_item .source_infor .source_ingre text{
    background-color: #FDAB61;
    color: #fff;
    border-radius: 5px;
    padding: 0px 5px;
    box-sizing: border-box;
    margin-right: 5px;
    font-size: 10px;
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
