'use strict'

const userRepository = require('../repositories/user')
const errors = require('../utils/errors')
const security = require('../utils/security')
const { dbErrors } = require('../utils/errors')

const register = async input => {
  const userData = {
    name: input.name,
    email: input.email,
    password: security.hash(input.password),
    picture: '', // TODO: implement picture upload
  }

  try {
    const user = await userRepository.createUser(userData)
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
      tokenInfo: security.generateAccessToken(user),
    }
  } catch (err) {
    // check if duplicate
    if (err.code && err.code === dbErrors.DUPLICATE_ERROR) {
      throw new errors.ConflictError(
        { email: input.email },
        'User with given email address already exists',
      )
    }
    throw err
  }
}

module.exports = {
  register,
}
