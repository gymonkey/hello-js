const db = require('mongoose')
const { transform } = require('../utils')

const CategorySchema = new db.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    text: true,
    unique:true
  },
  seq: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
  toObject: {
    versionKey: false,
    transform
  },
  toJSON: {
    versionKey: false,
    transform
  }
})

exports.Category = db.model('PortalCategory', CategorySchema)
