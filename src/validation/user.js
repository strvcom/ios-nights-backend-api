'use strict'

const Joi = require('joi')

const attendanceValidationRules = Joi.object().keys({
  attended: Joi.boolean().required(),
})

const assignmentValidationRules = Joi.object().keys({
  done: Joi.boolean().required(),
})

const validationRules = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20)
    .required(),
  pictureUrl: Joi.string().max(300),
})

const updateValidationRules = Joi.object().keys({
  pictureUrl: Joi.string().max(300).required(),
})

const loginRules = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20)
    .required(),
})

module.exports = {
  attendanceValidationRules,
  assignmentValidationRules,
  validationRules,
  updateValidationRules,
  loginRules,
}
