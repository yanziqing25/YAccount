const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  if(event.iconType == 'customized') {
    const fileList = [];
    fileList.push(event.icon);
    cloud.deleteFile({
      fileList
    });
  }
  
  return await db.collection('bill').doc(event._id).remove();
}