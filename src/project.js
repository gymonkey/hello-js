const { Project } = require('./model/project')
const { Category } = require('./model/category')
const { pageQuery } = require('./utils')

exports.pageList = async function pageList(req, res, next) {
  
  try {
    const { name, category, page, pageSize } = req.query
    const queryParams = {}
    if (name) {
      queryParams.name = new RegExp(name, 'i')
    }
    if (category) {
      queryParams.category = category
    }

    const data = await pageQuery({
      Model: Project,
      queryParams,
      page,
      pageSize,
      populates: ['category'],
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

exports.delete = async function deleteProject(req, res, next) {
  
  try {
    const { id } = req.body
    await Project.findByIdAndRemove(id)
  
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

exports.save = async function saveProject (req, res, next) {
  try {
    const { name, category, link, cover, seq, id } = req.body
    
    if (id) {
      await Project.findByIdAndUpdate(id, {
        name,
        category,
        link,
        seq,
        cover
      })
    } else {
      await Project.create({
        name,
        category,
        link,
        cover,
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

exports.categoryAndList = async function categoryAndList (req, res, next) {
  try {
    const [category, project] = await Promise.all([Category.find().sort({ seq: 1 }), Project.find().sort({ seq: 1 })])
    
    res.json({
      rCode: 0,
      data: {
        category,
        project
      }
    })
  } catch (e) {
    res.json({
      rCode: 1,
      msg: e.message
    })
  }
}
