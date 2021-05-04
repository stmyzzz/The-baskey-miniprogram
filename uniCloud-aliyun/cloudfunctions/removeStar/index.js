'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('collection')
	let res = await collection.where({user_id:event.user_id,source_id:event.source_id}).remove({
		user_id:event.user_id,
		source_id:event.source_id
	})
	console.log('event : ', event)
	return res
};
