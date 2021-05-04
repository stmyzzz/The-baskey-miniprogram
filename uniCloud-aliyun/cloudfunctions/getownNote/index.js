'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
  
	const collection = db.collection('note')
	let res = await collection.where({user_id:event.user_id}).get('note')
	return res 
};
