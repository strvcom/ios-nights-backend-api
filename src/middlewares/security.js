/* eslint-disable dot-notation,no-undefined */
'use strict'

const { authenticateByToken } = require('../utils/security')
const userRepository = require('../repositories/user')

const authenticated = async (ctx, next) => {
  const authHeader = ctx.headers['authorization']

  // append user to context
  ctx.app.context.user = await userRepository.getById(await authenticateByToken(authHeader))
  return next()
}

module.exports = {
  authenticated,
}
