'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let data =JSON.parse(event.body) 
	const collection = db.collection('source')
	let res = await collection.add({
    source_name:data.source_name,
    imgUrl:data.imgUrl,
    descrptions:data.descrptions,
    ingredients:data.ingredients,
    cook_step:data.cook_step
    })
  
	return res
};
