'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('food')
	if(event.food_id){
		let res = await collection.where({_id:event.food_id}).get('food')
		//返回数据给客户端
		return res
	}else{
				let res = await collection.where({food_sort:event.food_sort}).get('food')
	//返回数据给客户端
	return res
	}

};
