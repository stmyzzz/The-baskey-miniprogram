'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection('cart')
	let res = await collection.where({user_id:event.user_id}).remove('cart')
	return res 
  
};
