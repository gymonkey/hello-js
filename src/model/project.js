const db = require('mongoose')
const { transform } = require('../utils')

const ProjectSchema = new db.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    text: true,
    unique:true
  },
  category: {
    type: db.Schema.Types.ObjectId,
    ref: 'PortalCategory',
  },
  link: {
    type: String,
    required: true,
  },
  cover: {
    type: String
  },
  seq: {
    type: Number
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

exports.Project = db.model('PortalProject', ProjectSchema)
