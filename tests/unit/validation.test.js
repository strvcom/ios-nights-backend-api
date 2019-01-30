'use strict'

const Joi = require('joi')
const { validate } = require('../../src/utils/validation')
const errors = require('../../src/utils/errors')

describe('Input validation', () => {
  test('It should throw BadRequest error on invalid data', () => {
    expect(() => validate({
      name: 'john',
    }, Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    }))).toThrow(errors.BadRequestError)
  })
})
