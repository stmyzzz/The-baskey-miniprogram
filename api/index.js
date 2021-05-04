const commonCloud = (cloudName, mydata) => {
	return new Promise((reslove, reject) => {
		uniCloud.callFunction({
			name: cloudName,
			data: mydata
		})
		.then((res)=>{
			reslove(res.result)
			},(err)=>{
			reject(err)
			})
		.catch(err => {
			console.log(err);
		})
	});
};
export default {
	commonCloud
}
