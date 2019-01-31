'use strict'

const operations = require('../operations/authentication')
const userValidation = require('../validation/user')
const { validate } = require('../utils/validation')

const login = async ctx => {
  validate(ctx.request.body, userValidation.loginRules)
  const { email, password } = ctx.request.body
  ctx.body = await operations.login({ email, password })
}

module.exports = {
  login,
}
