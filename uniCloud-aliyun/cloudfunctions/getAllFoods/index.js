
'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('food')
  if(event.limit){
  let res = await collection.limit(event.limit).get('food')
    //返回数据给客户端
   return res  
  }else{
		let res = await collection.get('food')
	//返回数据给客户端
	  return res   
  }

};
