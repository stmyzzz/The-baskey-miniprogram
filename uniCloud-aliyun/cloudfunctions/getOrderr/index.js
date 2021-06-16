'use strict';
const db = uniCloud.database(); 
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('order')
  if(event.order_phone){
  let date = new Date()
	let res = await collection.add({
		user_id:event.user_id
    order_phone:event.order_phone,
    order_username:event.order_username,
    order_address:event.order_address,
		order_infor:event.order_infor,
    order_num:event.order_num,
    order_total:event.order_total,
    order_date:date,
    order_status:"待发货"
	})
	console.log('event : ', event)
	return res    
  }else if(event.id){
    let res = await collection.where({_id:event.id}).get('order')
    return res
  }else if(event.user_id){
    let res = await collection.where({user_id:event.user_id}).get('order')
    return res
  }

};
