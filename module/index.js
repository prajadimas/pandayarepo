const { Router } = require('express')
const getModule = require('./getModule')
const postModule = require('./postModule')

const routes = Router()

routes.get('/', getModule)
routes.post('/', postModule)

module.exports = routes
