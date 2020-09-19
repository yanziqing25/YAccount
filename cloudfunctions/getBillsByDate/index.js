const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const $ = _.aggregate

function getDays(year, month) {
  let days = [0, 31, 28, 31, 30, 31, 30, 31, 30, 30, 31, 30, 31];
  if ((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)) {
    days[2] = 29;
  }
  return days[month];
}

exports.main = async (event, context) => {
  const start = event.start;
  const date = new Date(event.date);
  const year = date.getFullYear();
  const month = date.getMonth();
  const date1 = new Date(year, month, 1);
  const date2 = new Date(year, month, getDays(year, month + 1), 23, 59, 59, 999);

  const result = await db.collection('bill').aggregate().match({
    userOpenid: _.eq(event.userInfo.openId),
    date: _.and(_.gte(date1), _.lte(date2))
  }).group({
    _id: {
      date: '$date',
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