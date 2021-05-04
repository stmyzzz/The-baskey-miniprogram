'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('basket')
  if(event.source_name){
    let res = await collection.add({
		source_id:event.source_id,
		source_name:event.source_name,
		user_id:event.user_id,
		ingredients:event.ingredients,
	  }) 
    return res 
  }else{
    let res = await collection.where({source_id:event.source_id,user_id:event.user_id}).remove({
       
    })
    return res 
  }

};
