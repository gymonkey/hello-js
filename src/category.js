const { Category } = require('./model/category')
const { pageQuery } = require('./utils')

exports.list = async function list(req, res, next) {
  try {
    const data = await Category.find().sort({ seq: 1 })
    
    res.json({
      rCode: 0,
      data
    })
    next()
  } catch(e) {
    res.json({
      rCode: 1,
      msg: e.message
    })
  }
}

exports.pageList = async function pageList(req, res, next) {
  
  try {
    const { page, pageSize } = req.body
    const data = await pageQuery({
      Model: Category,
      page,
      pageSize,
      queryParams,
      sortParams: 'seq'
    })
  
    res.json({
      rCode: 0,
      data
    })
  } catch (e) {
    res.json({
      rCode: 1,
      msg: e.message
    })
  }
}

exports.delete = async function deleteCategory(req, res, next) {
  
  try {
    const { id } = req.body
    await Category.findByIdAndRemove(id)
  
    res.json({
      rCode: 0
    })
  } catch (e) {
    res.json({
      rCode: 1,
      msg: e.message
    })
  }
}

exports.save = async function saveCategory (req, res, next) {
  try {
    const { name, seq, id } = req.body
    
    if (id) {
      await Category.findByIdAndUpdate(id, {
        name,
        seq
      })
    } else {
      await Category.create({
        name,
        seq
      })
    }
  
    res.json({
      rCode: 0
    })
  } catch (e) {
    res.json({
      rCode: 1,
      msg: e.message
    })
  }
}

