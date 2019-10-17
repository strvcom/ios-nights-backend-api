'use strict'

const Joi = require('joi')

const updateRandomIntValidationRules = Joi.object().keys({
  number: Joi.number().required(),
})

module.exports = {
  updateRandomIntValidationRules,
}
