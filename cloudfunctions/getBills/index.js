const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const $ = _.aggregate

exports.main = async (event, context) => {
  const start = event.start;
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
      iconType: '$iconType',
      name: '$name',
      count: '$count',
      create_time: '$create_time'
    })
  }).sort({
    _id: -1
  }).skip(start).limit(5).end();

  return result.list;
}