'use strict'

const operations = require('../operations/user')
const { validate } = require('../utils/validation')
const userValidation = require('../validation/user')
const storageValidation = require('../validation/storage')

const register = async ctx => {
  validate(ctx.request.body, userValidation.registerValidationRules)
  ctx.body = await operations.register(ctx.request.body)
  ctx.status = 201
}

const user = async ctx => {
  ctx.body = await operations.getUserWithStatistics(ctx.user.id)
}

const updatePicture = async ctx => {
  validate(ctx.request.body, userValidation.updateValidationRules)
  ctx.body = await operations.updateUserPicture(ctx.request.body, ctx.user.id)
}

const getPictureUploadUrl = async ctx => {
  validate(ctx.request.body, storageValidation.awsSignS3)
  const { type } = ctx.request.body
  ctx.body = await operations.generatePictureUploadUrl({ type })
}

module.exports = {
  register,
  user,
  updatePicture,
  getPictureUploadUrl,
}
