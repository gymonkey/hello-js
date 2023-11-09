const mongoose = require('mongoose')
const config = require('./config')

const db = mongoose.connection

exports.connect = function () {
  mongoose.connect(config.db.uri, {
    useNewUrlParser: true, // False by default. Set to true to make all connections set the useNewUrlParser option by default.
    useCreateIndex: true,
    useFindAndModify: false // True by default. Set to false to make findOneAndUpdate() and findOneAndRemove() use native findOneAndUpdate() rather than findAndModify().
  })
  db.on('error', console.error.bind(console, 'mongodb connecton error'))
  db.once('open', console.log.bind(console, 'mongodb connect success'))
}
