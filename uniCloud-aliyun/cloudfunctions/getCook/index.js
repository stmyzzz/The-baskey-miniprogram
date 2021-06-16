'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection('source')
	const {data} = await collection.get('source')
  let arr = []
  data.forEach(item=>{
     item.ingredients.forEach(re=>{
      if(re.name == event.ingre){
		 let obj = {}
		 obj.name = item.source_name
		 obj.img = item.imgUrl
		 obj.id = item._id
        arr.push(obj)
      }
    }) 
  })
	return arr
  
};
