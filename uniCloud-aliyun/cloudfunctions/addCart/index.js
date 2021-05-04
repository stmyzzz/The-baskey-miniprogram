'use strict';
const db = uniCloud.database(); 
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('cart')
	let res = await collection.add({
		user_id:event.user_id,
		cart_infor:event.cart_infor
	})
	console.log('event : ', event)
	return res
};
