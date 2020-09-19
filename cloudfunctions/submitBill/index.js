const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  const type = event.type;
  const icon = event.icon;
  const iconType = event.iconType;
  const name = event.name;
  // 传入的date是String类型，需转为Date类型
  let count = Number(event.count);
  // 传入的date是String类型，需转为Date类型
  const date = new Date(event.date);
  const userOpenid = event.userInfo.openId;
  if (type == 'expenditure' && count > 0 || type == 'income' && count < 0) {
    count = -count;
  }
  return await db.collection('bill').add({
    data: {
      type,
      icon,
      iconType,
      name,
      count,
      date,
      userOpenid,
      create_time: db.serverDate()
    }
  });
}