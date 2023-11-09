const express = require('express')
const { connect } = require('./db')
const app = express()
const bodyParser = require('body-parser')
const project = require('./project')
const category = require('./category')

connect()

app.use(bodyParser.json({limit: '50mb'}))

app.get('/api/project/page', project.pageList)
app.post('/api/project/delete', project.delete)
app.post('/api/project/save', project.save)

app.get('/api/category/list', category.list)
app.get('/api/category/page', category.pageList)
app.post('/api/category/delete', category.delete)
app.post('/api/category/save', category.save)

app.get('/api/categoryAndList', project.categoryAndList)

app.listen(7669)
