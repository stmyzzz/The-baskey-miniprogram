'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('collection')
	let res = await collection.add({
		user_id:event.user_id,
		source_id:event.source_id,
		source_name:event.source_name,
		source_imgUrl:event.source_imgUrl
		
	})
	console.log('event : ', event)
	return res
};
