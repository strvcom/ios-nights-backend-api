'use strict'

const R = require('ramda')
const Joi = require('joi')
const { Model } = require('../index')

class User extends Model {
  static get tableName() {
    return 'users'
  }

  static get validationRules() {
    return Joi.object().keys({
      name: Joi.string()
        .min(3)
        .max(30)
        .required(),
      email: Joi.string().email(),
      password: Joi.string().min(8).max(20)
        .required(),
    })
  }

  toJSON() {
    return R.omit([
      'password',
    ], super.toJSON())
  }
}

module.exports = User
