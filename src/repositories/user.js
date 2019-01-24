'use strict'

const User = require('../database/models/user')

const getByEmail = email => User
  .query()
  .where('email', email)
  .first()

const createUser = userData => User.query().insert(userData)

module.exports = {
  getByEmail,
  createUser,
}
