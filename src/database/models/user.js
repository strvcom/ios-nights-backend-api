'use strict'

const R = require('ramda')
const { Model } = require('../index')

class User extends Model {
  static get tableName() {
    return 'users'
  }

  toJSON() {
    return R.omit([
      'password',
    ], super.toJSON())
  }
}

module.exports = User
