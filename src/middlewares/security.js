'use strict'

const { authenticateByToken } = require('../utils/security')
const userRepository = require('../repositories/user')

const authenticated = async (ctx, next) => {
  const { authorization } = ctx.headers
  // append user to context
  ctx.app.context.user = await userRepository.getById(await authenticateByToken(authorization))
  return next()
}

module.exports = {
  authenticated,
}
