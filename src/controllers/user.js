'use strict'

const operations = require('../operations/user')
const { validate } = require('../utils/validation')
const User = require('../database/models/user')

const register = async ctx => {
  validate(ctx.request.body, User.validationRules)
  // TODO: validate and handle image upload
  ctx.body = await operations.register(ctx.request.body)
  ctx.status = 201
}

const user = async ctx => {
  ctx.body = {
    ...ctx.user,
    lecturesStatistics: await operations.loadUserLecturesStatistics(ctx.user),
  }
}

module.exports = {
  register,
  user,
}
