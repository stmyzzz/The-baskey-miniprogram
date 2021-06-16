<template>
	<view class="assess">
    <view class="rate">
      <view class="header">
        为本次服务打分！
      </view>
      <view class="main">
        <van-rate
      :value="value"
      size="25"
      color="#FDAB61"
      void-color="#eee"
      allow-half
      void-icon="star"
      @change="onChange"
    />
        <text class="rate-count" >{{value}}</text>
      </view>
    </view>
    <view class="content">
      <label>评价内容：</label>
      <textarea maxlength="100" value="" v-model="content" placeholder="输入评价内容(不多于100字)" /> 
    </view>
    <view class="footer">
      <text @click="submit"  class="btn">
        提交评价
      </text>
    </view>
    
	</view>
</template>

<script>
  import { mapState } from 'vuex' 
	export default {
		data() {
			return {
        value:5,
        content:''
			}
		},
    onLoad(options){
      this.id = options.id
    },
		methods: {
			onChange(e){
        this.value = e.detail
        console.log(e.detail)
        console.log(typeof this.userInfo )
      },
      submit(){
        var that = this
        
        if(this.content == ''){
          uni.showToast({
            title:'内容不能为空',
            icon:'none'
          })
          return
        }
        uni.showModal({
            title: '提示',
            content: '提交评价？',
            success: function (res) {
                if (res.confirm) {
                    that.$api.commonCloud('addAssess',{
                      order_id:that.id,
                      rate:that.value,
                      content:that.content,
                      userInfo: that.userInfo
                    }).then(res=>{
                     console.log(res)
                  that.$api.commonCloud('updateState',{
                      id:that.id,
                      state:3
                    }).then(res=>{
                      console.log(res)
                    })
                    }) 
                    
                } else if (res.cancel) {
                    console.log('用户点击取消');
                }
            }
        });
      }
		},
    computed:{
        ...mapState([
          'userInfo'
        ])
    }
	}
</script>

<style>
  .assess{
    padding: 0 15px;
  }
  .rate{
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .rate-count{
    margin-left: 10px;
  }
  .main{
    display: flex;
    align-items: center;
  }
  .content{
    margin-top: 10px;
  }
  .footer{
    text-align: center;
  }
  .btn{
    border: 1px solid #FDAB61;
    color: #FDAB61;
    padding: 6px;
    
  }
</style>
