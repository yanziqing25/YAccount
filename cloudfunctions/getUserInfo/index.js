const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const openid = event.userInfo.openId
  const billCount = await db.collection('bill').where({
    userOpenid: _.eq(openid)
  }).count();
  return {
    openid,
    billCount
  }
}