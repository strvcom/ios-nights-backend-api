'use strict'

const User = require('../database/models/user')

const getById = id => User
  .query()
  .where('id', id)
  .first()

const getByEmail = email => User
  .query()
  .where('email', email)
  .first()

const createUser = userData => User.query().insert(userData)

module.exports = {
  getById,
  getByEmail,
  createUser,
}
