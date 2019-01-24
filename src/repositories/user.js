'use strict'

const User = require('../database/models/user')

const getByEmail = email => User
  .query()
  .where('email', email)
  .first()

module.exports = {
  getByEmail,
}
