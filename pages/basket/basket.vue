
<template>
	<view class="basket_container">
		<view class="basket_item" v-for="(item,index) in basketList" :key="index">
      <view @click="navToDetailSource(item.source_id,item.source_name)" class="item_header">
        <text>{{item.source_name}}</text>
        <text>></text>
      </view>
		  <view @click="removeBasket(item._id)" class="item_del">
		    <text>删除这个清单</text>
		  </view>
         <checkbox-group class="item_main">
          <view class="main_content" v-for="(ingreItem,ingreIndex) in item.ingredients" v-if="ingreItem.isChecked == false" :key="ingreIndex">
           <view class="item_checkbox">
             <checkbox color="#fff" class="item_checkbox" @click.stop="checkboxChange(item._id,ingreIndex,ingreItem.isChecked)" :checked="ingreItem.isChecked" />
           </view>  
          
           <view class="item_name">{{ingreItem.name}}</view>
           <view class="item_foodnum">{{ingreItem.food_num}}</view>
           <view class="item_buy" @click.stop="navToDetailIngre(ingreItem.food_id,ingreItem.name)">
             <image style="width: 20px;height: 20px;" src="../../static/ingre_bar_active.png" mode=""></image>
           </view>
        </view>
        </checkbox-group>
       
          <view @click="isShowFin = !isShowFin" class="item_checkfin">
            <text></text>
            <text>已完成</text>
          </view> 
          <checkbox-group v-if="isShowFin">
          <view class="main_content item_fin" v-for="(ingreItem,ingreIndex) in item.ingredients" v-if="ingreItem.isChecked == true" :key="ingreIndex">
           <view class="item_checkbox">
             <checkbox color="#fff" class="item_checkbox" @click.stop="checkboxChange(item._id,ingreIndex,ingreItem.isChecked)" :checked="ingreItem.isChecked" /></view>
           <view class="item_name">{{ingreItem.name}}</view>
           <view class="item_foodnum">{{ingreItem.food_num}}</view>
           <view class="item_buy"></view>
          </view>
         </checkbox-group>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
        user_id:null,
        basketList:{},
        hasfinished:false,
        isShowFin:false
			}
		},
    onLoad(){
      this.initData()
    },
    computed:{
      ...mapState({
				userId:state => state.user.userId
			})
    },
		methods: {
      initData(){
        let user_id = this.userId 
        this.$api.commonCloud('getBasket',{
          user_id
        }).then(res=>{
          console.log(res)
          this.basketList = res.data
        })
      },
			checkboxChange(basketId,itemindex,isChecked){
        console.log(isChecked)
        var that = this
        this.$api.commonCloud('getBasket',{
          _id:basketId,
          itemindex:itemindex,
          isChecked:!isChecked
        }).then(res=>{
          console.log(res) 
          that.initData()
        })
      },
      removeBasket(basketId){
        var that = this
        this.$api.commonCloud('removeBasket',{
          _id:basketId
        }).then(res=>{
          console.log(res)
          that.initData()
        })
      },
			navToDetailSource(sourceId,name){
				uni.navigateTo({
					url: `/pages/sourceDetail/sourceDetail?id=${sourceId}&name=${name}`
				})
			},
      navToDetailIngre(ingreId,name){
        console.log('name',name)
      	uni.navigateTo({
      		url: `/pages/ingreDetail/ingreDetail?id=${ingreId}&name=${name}`
      	})
      }
		}
	}
</script>

<style>
  page{
    background-color: #f5f5f5;
    width: 100%;
    height: 100vh;
  }
  .basket_item{
    background-color: #fff;
    margin-bottom: 15px;
    color: black;
    padding: 10px 20px;
  }
  .item_fin{
    text-decoration:line-through;
    color: #666;
  }
  .item_main{
    margin-top: 10px;
  }
  .item_header{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .main_content{
    display: flex;
    align-items: center;
    font-size: 15px;
    color: black;
    font-weight: 300;
/*    margin: 5px 10px; */
    background-color: #f5f5f5;
    padding: 12px 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  .item_checkbox{
    flex: 1;
    text-align: center;
  }
  .item_name{
    flex: 2;
  }
  .item_foodnum{
    flex: 2;
  }
  .item_del{
    margin-top: 10px;
    display: inline-block;
    border: 1px solid #FDAB61;
    color: #FDAB61;
    font-size: 13px;
    border-radius: 5px;
    padding: 5px 5px;
    
  }
  checkbox .wx-checkbox-input{
    border-radius: 50%;
    width: 20px;
    height: 20px;
    border: 1px solid #666;
  }
  checkbox .wx-checkbox-input.wx-checkbox-input-checked{
    background-color: #FDAB61;
    border-radius: 50%;
    border: 1px solid #FDAB61;
  }
  .item_checkfin{
    margin-bottom: 10px;
  }
  .item_buy{
    display: flex;
    align-items: center;
  }
  

</style>
