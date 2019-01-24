'use strict'

const userRepository = require('../repositories/user')
const errors = require('../utils/errors')
const security = require('../utils/security')

const login = async (email, password) => {
  // find user
  const user = await userRepository.getByEmail(email)
  if (!user) {
    throw new errors.UnauthorizedError(null, 'Incorrect credentials')
  }
  // validate password
  const passwordValid = await security.verifyPassword(password, user.password)
  if (!passwordValid) {
    throw new errors.UnauthorizedError(null, 'Incorrect credentials')
  }
  return {
    user,
    tokenInfo: await security.generateAccessToken(user),
  }
}

module.exports = {
  login,
}
