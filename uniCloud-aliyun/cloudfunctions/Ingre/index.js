'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('food')
  const countResult = await db.collection('food').count() 
      let data = event.queryStringParameters
      console.log(data)
      let pageSize = parseInt(data.pageSize)
      let pageIndex = parseInt(data.pageIndex)
  return collection.skip((pageIndex - 1)*pageSize).limit(pageSize).get('food').then(res=>{
   res.countResult = countResult
	return res   
  })

};
