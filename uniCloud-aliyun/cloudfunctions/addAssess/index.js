'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let data =event.body
	const collection = db.collection('assess')
	let res = await collection.add({
    order_id:event.order_id,
    assess_rate:event.rate,
    assess_content:event.content,
    userInfo:event.userInfo
    })
  
	return res
};
