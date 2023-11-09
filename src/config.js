module.exports = {
  db: {
    // NOTE 和xbird共用同一个数据库，要注意防止表名冲突
    uri: process.env.NODE_ENV === 'development' ? 'mongodb://localhost:27017/xbird' : 'mongodb://common_xbird_21006_mongo.lzdb.com:21006/xBird'
  }
}
