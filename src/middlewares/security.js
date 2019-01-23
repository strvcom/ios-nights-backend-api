/* eslint-disable dot-notation,no-undefined */
'use strict'

const { authenticateByToken } = require('../utils/security')

const authenticated = async (ctx, next) => {
  const authHeader = ctx.headers['authorization']

  // append user to context
  ctx.app.context.user = await authenticateByToken(authHeader)
  return next()
}

module.exports = {
  authenticated,
}
