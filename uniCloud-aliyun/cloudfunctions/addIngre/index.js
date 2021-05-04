'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let data =JSON.parse(event.body) 
	const collection = db.collection('food')
	let res = await collection.add({
    food_name:data.food_name,
    imgUrl:data.imgUrl,
    food_sort:data.food_sort,
    food_price:data.food_price,
    food_description:data.food_description
    })
  
	return res
};
