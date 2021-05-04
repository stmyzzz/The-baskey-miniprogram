'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('basket')
	let res = await collection.where({user_id:event.user_id,source_id:event.source_id}).get('basket')
	console.log('event : ', event)

	
	//返回数据给客户端
	return res
};
