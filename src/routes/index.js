'use strict'

const Router = require('koa-router')
const config = require('../config')
const lectureController = require('../controllers/lecture')

const router = new Router()

router.get('/', ctx => {
  ctx.body = {
    app: config.app.name,
    version: config.app.version,
  }
})

router.get('/lectures', lectureController.list)

module.exports = router.routes()
