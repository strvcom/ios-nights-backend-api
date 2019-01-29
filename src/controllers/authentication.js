'use strict'

const operations = require('../operations/authentication')

const login = async ctx => {
  const { email, password } = ctx.request.body
  ctx.body = await operations.login({ email, password })
}

module.exports = {
  login,
}
