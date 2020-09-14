const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  const _id = event._id;
  const type = event.type;
  const icon = event.icon;
  const name = event.name;
  // 传入的date是String类型，需转为Date类型
  let count = Number(event.count);
  // 传入的date是String类型，需转为Date类型
  const date = new Date(event.date);
  if ((type == 'expenditure' && count > 0) || (type == 'income' && count < 0)) {
    count = -count;
  }
  
  const result = await db.collection('bill').doc(_id).get();
  const oldIcon = result.data.icon;
  if (oldIcon != icon) {
    // 删除旧的icon
    const fileList = [];
    fileList.push(oldIcon);
    cloud.deleteFile({
      fileList
    });
  }
  // 更新bill
  return await db.collection('bill').doc(_id).update({
    data: {
      type,
      icon,
      name,
      count,
      date
    }
  });
}