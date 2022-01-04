const apiCloud = (cloudName, mydata) => {
	return new Promise((reslove, reject) => {
		uniCloud.callFunction({
			name: cloudName,
			data: mydata,
      success:(res)=>{
        uni.showLoading({
             title: "加载中...?"
        })
        reslove(res.result)
        uni.hideLoading()
      },
      fail:(res)=>{
        reject(err)
        
      }
		})
		.then(
      (res)=>{
      uni.showLoading({
           title: "加载中..."
      })
			reslove(res.result)
      uni.hideLoading()
			},(err)=>{
			reject(err)
			})
		.catch(err => {
			console.log(err);
		})
	});
};
export default {
	apiCloud
}
