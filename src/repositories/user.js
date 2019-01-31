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

const updatePictureUrl = (userId, pictureUrl) => User
  .query()
  .patch({ pictureUrl })
  .where('id', userId)

module.exports = {
  getById,
  getByEmail,
  createUser,
  updatePictureUrl,
}
