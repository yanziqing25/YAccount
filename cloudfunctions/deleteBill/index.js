const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  const fileList = [];
  fileList.push(event.icon);
  return {
    file: await cloud.deleteFile({
      fileList
    }),
    db: await db.collection('bill').doc(event._id).remove()
  }
}