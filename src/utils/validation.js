'use strict'

const Joi = require('joi')
const { BadRequestError } = require('../utils/errors')

/**
 * Validates given input according to provided schema
 * @param {*} input Input data object
 * @param {*} schema Schema for input
 * @param {boolean} throwOnFail Specifies if HTTP 400 error should be thrown on validation error
 * @returns {*}
 */
const validate = (input, schema, throwOnFail = true) => {
  const { error } = Joi.validate(input, schema, { abortEarly: false })

  if (error === null) {
    return {
      valid: true,
    }
  }

  const validationResult = {
    valid: false,
    errors: error.details.map(validationError => ({
      message: validationError.message,
      type: validationError.type,
      oldValue: validationError.context.value,
    })),
  }

  if (throwOnFail) {
    throw new BadRequestError(validationResult)
  }
  return validationResult
}

module.exports = {
  validate,
}
