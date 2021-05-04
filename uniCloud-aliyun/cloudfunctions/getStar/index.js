'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('collection')
	if(event.source_id){
		let res = await collection.where({user_id:event.user_id,source_id:event.source_id}).get('collection')
		return res
		
	}else{
		let res = await collection.where({user_id:event.user_id}).get('collection')
		return res
	}
	//返回数据给客户端
	
};
