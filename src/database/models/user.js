'use strict'

const R = require('ramda')
const Joi = require('joi')
const { Model } = require('../index')

class User extends Model {
  static get tableName() {
    return 'users'
  }

  static get attendanceValidationRules() {
    return Joi.object().keys({
      attends: Joi.boolean().required(),
    })
  }

  static get assignmentValidationRules() {
    return Joi.object().keys({
      done: Joi.boolean().required(),
    })
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
      picture: Joi.any().required(),
    })
  }

  static get updateValidationRules() {
    return Joi.object().keys({
      picture: Joi.any().required(),
    })
  }

  toJSON() {
    return R.omit([
      'password',
    ], super.toJSON())
  }

  static get relationMappings() {
    // relationMappings getter is accessed lazily when you execute your first query
    // that needs it. Therefore if you `require` your models inside the getter, you
    // don't end up with a require loop. Note that only one end of the relation needs
    // to be required like this, not both. `relationMappings` can also be a method or
    // a thunk if you prefer those instead of getters.
    const Lecture = require('./lecture') // eslint-disable-line

    return {
      lectures: {
        relation: Model.ManyToManyRelation,
        modelClass: Lecture,
        join: {
          from: 'users.id',
          through: {
            from: 'user_lectures.user_id',
            to: 'user_lectures.lecture_id',
          },
          to: 'lectures.id',
        },
      },
    }
  }
}

module.exports = User
