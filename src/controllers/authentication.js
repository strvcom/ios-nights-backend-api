'use strict'

const operations = require('../operations/authentication')

const login = async ctx => {
  const email = ctx.request.body.email
  const password = ctx.request.body.password
  ctx.body = await operations.login(email, password)
}

module.exports = {
  login,
}
