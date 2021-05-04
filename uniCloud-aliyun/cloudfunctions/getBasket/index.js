'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('basket')
  if(event.source_id){
   let res = await collection.where({user_id:event.user_id,source_id:event.source_id}).get('basket')
	 return res
  }else if(event._id){
    let res = await collection.where({_id:event._id}).update({
      ['ingredients.'+event.itemindex]:{
         isChecked : event.isChecked
      }
    })
    return res
  }else{
    let res = await collection.where({user_id:event.user_id}).get('basket')
    return res
  }
};
