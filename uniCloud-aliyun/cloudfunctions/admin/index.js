'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('admin')
  const countResult = await db.collection('admin').count() 
      let data = event.queryStringParameters
      console.log(data)
      let pageSize = parseInt(data.pageSize)
      let pageIndex = parseInt(data.pageIndex)
  return collection.skip((pageIndex - 1)*pageSize).limit(pageSize).get('admin').then(res=>{
   res.countResult = countResult
	return res   
  })

};
