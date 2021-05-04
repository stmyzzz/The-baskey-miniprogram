<template>
	<view>    

		<form class="form" @submit="onSubmit" >
		    <input name="title" type="text" value="" require placeholder="请输入标题"/>
        <textarea name="content" maxlength="140" value="" placeholder="请输入内容" />    
        <view class="images">
      <view class="img_item" v-for="(item,index) in imgfile" :key="index">
        <image :src="item.url" mode=""></image>
      </view>
      <view @click="uploadImg()" class="upload_img">
        <image src="../../static/upload.png" mode=""></image>
      </view>      
    </view>
      <button type="primary" form-type="submit" >发布</button>
		</form>


	</view>
</template>

<script>
	export default {
		data() {
			return {
			  user_id:null,
        imgfile:[]
			}
		},
    onLoad(){
      this.user_id = uni.getStorageSync('user_id')
      this.userInfo = uni.getStorageSync('userInfo')
    },
		methods: {
      onSubmit(e){
        let content = e.target.value.content
        content.replace(/\s*/g, "")
        let title = e.target.value.content
        title.replace(/\s*/g, "")
        let filePath = this.imgfile
        if(title ==""){
          uni.showToast({
            title:'标题不能为空',
            icon:'none'
          })
          return
        }else if(content == ""){
          uni.showToast({
            title:'内容不能为空',
            icon:'none'
          })
          return
        }else if(filePath.length<=0){
          uni.showToast({
            title:'至少上传一张图片',
            icon:'none'
          })
          return
        }
        uni.showLoading({
          title:'发布中',
          mask:true
        })
        
        let imgUrlArr = []
        let user_id  = this.user_id
        let userInfo = this.userInfo
        console.log('user_id',user_id)
        var that = this
        filePath.forEach(item=>{
          let filePathitem = item.url
          console.log('user_id',user_id)
          uniCloud.uploadFile({
            filePath: filePathitem,
            cloudPath: 'a.jpg',
              success:res=>{
                console.log(res)
                console.log('fileID',res.fileID)
                console.log('imgUrlArr',imgUrlArr)
                console.log(res.fileID)
                console.log(JSON.stringify(res.fileID))
                imgUrlArr.push(res.fileID)
                console.log('user_id',user_id)
                let user_idd = that.user_id 
                console.log('user_id',user_idd)
                console.log('imgUrlArr push',imgUrlArr)
                if(imgUrlArr.length == filePath.length){
                        this.$api.commonCloud('getNote',{
                        user_id:user_id,
                        note_name: userInfo.nickName,
                        note_title:title,
                        note_content: content,
                        user_imgUrl:userInfo.avatarUrl, 
                        note_imgUrl:imgUrlArr
                      }).then(res=>{
                        console.log('note res',res)
                        console.log('quick imgUrlArr',imgUrlArr)
                        uni.hideLoading()
                        uni.navigateBack({
                            delta: 1
                        });
                      })
                }else{
                  console.log('不能执行')
                  console.log(imgUrlArr.length)
                  console.log(filePath.length)
                }
              },
              fail() {},
              complete(){}
          });
        })
       

      },
     uploadImg(){
        var that = this
        uni.chooseImage({
          count:1,
          success(res) {
            console.log(res)
            console.log(that.imgfile)
            let filePath = res.tempFilePaths[0]
            that.imgfile.push({url:filePath})
          }
        })
      }
/*             onRead(file){ 
        console.log('imginfo',this.imgfile)
        console.log(file)
        let filePath = file.url
        上传到云端
        uniCloud.uploadFile({
        filePath: filePath,
        cloudPath: 'a.jpg',
       onUploadProgress: function(progressEvent) {
          console.log(progressEvent);
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          },
          success:res=>{
          console.log(res.filePath)
           console.log(this.imgfile)
          },
          fail() {},
          complete() {}
            });
      } */
		}
	}
</script>

<style>
  .images{
    display: flex;
    align-items: center;
  }
  .images .img_item{
    width: 70px;
    height: 70px;
  }
  .images .img_item image{
    width: 100%;
    height: 100%;
  }
  .upload_img{
    width: 70px;
    height: 70px;
  }
  .upload_img image{
    width: 100%;
    height: 100%;
  }
  .form{
    display: flex;
    flex-direction: column;
    padding: 10px 15px;
  }
 .form input{
    border-bottom: 1px solid #f5f5f5;
    padding: 5px 0px;
  }
  .form textarea{
    padding: 5px 0px;
  }
  .form button{
    margin-top: 20px;
  }

</style>
