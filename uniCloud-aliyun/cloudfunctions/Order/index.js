'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('order')
  const countResult = await db.collection('order').count() 
      let data = event.queryStringParameters
      console.log(data)
      let pageSize = parseInt(data.pageSize)
      let pageIndex = parseInt(data.pageIndex)
  return collection.skip((pageIndex - 1)*pageSize).limit(pageSize).get('order').then(res=>{
   res.countResult = countResult
	return res   
  })

};
