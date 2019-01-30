'use strict'

const operations = require('../operations/user')
const { validate } = require('../utils/validation')
const userValidation = require('../validations/user')

const register = async ctx => {
  validate(ctx.request.body, userValidation.validationRules)
  ctx.body = await operations.register(ctx.request.body)
  ctx.status = 201
}

const user = async ctx => {
  ctx.body = {
    ...ctx.user.toJSON(),
    lecturesStatistics: await operations.loadUserLecturesStatistics(ctx.user.id),
  }
}

const updatePicture = async ctx => {
  validate(ctx.request.body, userValidation.updateValidationRules)
  ctx.body = await operations.updateUserPicture(ctx.request.body, ctx.user.id)
}

module.exports = {
  register,
  user,
  updatePicture,
}
