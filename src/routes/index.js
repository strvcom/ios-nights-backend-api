'use strict'

const Router = require('koa-router')
const config = require('../config')

const router = new Router()

router.get('/', ctx => {
  ctx.body = {
    app: config.app.name,
    version: config.app.version,
  }
})

module.exports = router.routes()
