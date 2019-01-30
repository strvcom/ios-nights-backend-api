'use strict'

const User = require('../database/models/user')

const getById = id => User
  .query()
  .findById(id)

const getByEmail = email => User
  .query()
  .where('email', email)
  .first()

const createUser = userData => User.query().insert(userData)

const updatePicture = (userId, picture) => User
  .query()
  .patch({ picture })
  .where('id', userId)

module.exports = {
  getById,
  getByEmail,
  createUser,
  updatePicture,
}
