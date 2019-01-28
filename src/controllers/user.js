'use strict'

const operations = require('../operations/user')
const { validate } = require('../utils/validation')
const User = require('../database/models/user')

const register = async ctx => {
  const input = {
    ...ctx.request.body,
    picture: ctx.request.files.picture,
  }
  validate(input, User.validationRules)
  ctx.body = await operations.register(input)
  ctx.status = 201
}

const user = async ctx => {
  ctx.body = {
    ...ctx.user.toJSON(),
    lecturesStatistics: await operations.loadUserLecturesStatistics(ctx.user),
  }
}

const updatePicture = async ctx => {
  validate({ picture: ctx.request.files.picture }, User.updateValidationRules)
  ctx.body = await operations.updateUserPicture(ctx.request.files.picture, ctx.user)
}

module.exports = {
  register,
  user,
  updatePicture,
}
