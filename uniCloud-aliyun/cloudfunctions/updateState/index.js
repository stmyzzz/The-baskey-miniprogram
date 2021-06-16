'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('order')
	let res = await collection.where({_id:event.id}).update({
  order_status:event.state
	})
	console.log('event : ', event)
	return res
};
