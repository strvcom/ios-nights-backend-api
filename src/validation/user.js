'use strict'

const Joi = require('joi')

const attendanceValidationRules = Joi.object().keys({
  attends: Joi.boolean().required(),
})

const assignmentValidationRules = Joi.object().keys({
  done: Joi.boolean().required(),
})

const validationRules = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(20)
    .required(),
  picture: Joi.string().max(300),
})

const updateValidationRules = Joi.object().keys({
  picture: Joi.string().max(300).required(),
})

module.exports = {
  attendanceValidationRules,
  assignmentValidationRules,
  validationRules,
  updateValidationRules,
}
