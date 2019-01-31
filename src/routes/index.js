'use strict'

const Router = require('koa-router')
const config = require('../config')
const lectureController = require('../controllers/lecture')
const authController = require('../controllers/authentication')
const userController = require('../controllers/user')
const { authenticated } = require('../middlewares/security')

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
router.get('/lectures', authenticated, lectureController.list)
router.get('/lectures/:id', authenticated, lectureController.detail)
router.patch('/lectures/:id/attended', authenticated, lectureController.updateAttendance)
router.patch('/lectures/:id/assignment', authenticated, lectureController.updateAssignment)

// Users
router.post('/register', userController.register)
router.get('/users/me', authenticated, userController.user)
router.patch('/users/me/picture', authenticated, userController.updatePicture)
router.post('/users/me/picture/signed-url', userController.getPictureUploadUrl)

module.exports = router.routes()
