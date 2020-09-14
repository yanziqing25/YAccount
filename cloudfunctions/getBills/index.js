const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const $ = _.aggregate

exports.main = async (event, context) => {
  const result = await db.collection('bill').aggregate().match({
    userOpenid: _.eq(event.userInfo.openId)
  }).group({
    _id: {
      date: '$date'
    },
    count: $.sum('$count'),
    bills: $.push({
      _id: '$_id',
      type: '$type',
      icon: '$icon',
      name: '$name',
      count: '$count',
      create_time: '$create_time'
    })
  }).end();
  // 手动排序
  const list = result.list;
  list.sort((a, b) => {
    return b._id.date - a._id.date;
  });
  return list;
}