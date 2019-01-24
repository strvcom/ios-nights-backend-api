'use strict'

const Router = require('koa-router')
const config = require('../config')
const lectureController = require('../controllers/lecture')
const authController = require('../controllers/authentication')

const router = new Router()

router.get('/', ctx => {
  ctx.body = {
    app: config.app.name,
    version: config.app.version,
  }
})

// Authentication
router.post('/login', authController.login)

// Lectures
router.get('/lectures', lectureController.list)
router.get('/lectures/:id', lectureController.detail)

module.exports = router.routes()
