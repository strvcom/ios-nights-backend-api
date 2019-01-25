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

const updatePicture = (user, picture) => User.query().patch({ picture }).where('id', user.id)

module.exports = {
  getById,
  getByEmail,
  createUser,
  updatePicture,
}
