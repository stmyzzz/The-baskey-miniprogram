'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection('cart')
  if(event.user_id){
	let res = await collection.where({user_id:event.user_id}).get('cart')
	return res 
  }else{
    let res = await collection.where({_id:event._id}).remove('cart')
    return res
  }
};
