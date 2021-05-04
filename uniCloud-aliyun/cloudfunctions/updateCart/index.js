'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('cart')
	let res = await collection.where({user_id:event.user_id}).update({
		cart_infor:event.cart_infor
	})
	console.log('event : ', event)
	return res
};
