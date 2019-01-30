'use strict'

const userRepository = require('../repositories/user')
const errors = require('../utils/errors')
const security = require('../utils/security')

const login = async input => {
  // find user
  const user = await userRepository.getByEmail(input.email)
  if (!user) {
    throw new errors.UnauthorizedError('Incorrect credentials')
  }
  // validate password
  const passwordValid = await security.verifyPassword(input.password, user.password)
  if (!passwordValid) {
    throw new errors.UnauthorizedError('Incorrect credentials')
  }
  return {
    user,
    tokenInfo: await security.generateAccessToken(user.id),
  }
}

module.exports = {
  login,
}
