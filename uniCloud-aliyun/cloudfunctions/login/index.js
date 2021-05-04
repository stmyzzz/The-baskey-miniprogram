'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
  let data =JSON.parse(event.body) 
  const collection = db.collection('admin')
	let res = await collection.where({admin_name:data.admin_name,admin_password:data.admin_password}).get('admin')
	return res
};
