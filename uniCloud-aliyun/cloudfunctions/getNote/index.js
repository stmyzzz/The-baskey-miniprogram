'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection('note')
  if(event.note_name){
    let time = new Date()
    let res = await collection.add({
          user_id: event.user_id,
          note_name: event.note_name,
          note_content: event.note_content,
          note_title:event.note_title,
          user_imgUrl: event.user_imgUrl,
          note_imgUrl:event.note_imgUrl,
          note_time:time
    })
    return res
  }else if(event._id){
    let res = await collection.where({_id:event._id}).get('note')
    return res  
  }else if(event.limit){
    let res = await collection.limit(event.limit).get('note')
    return res  
  }else{
    let res = await collection.get('note')
    return res  
  }
};
