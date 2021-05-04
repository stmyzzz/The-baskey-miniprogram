'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('basket')
	let res = await collection.where({_id:event._id}).remove({
		_id:event._id
	})
	console.log('event : ', event)
	return res
};
