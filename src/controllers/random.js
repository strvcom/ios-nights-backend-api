'use strict'

const { validate } = require('../utils/validation')
const randomValidation = require('../validation/random')
const { ConflictError } = require('../utils/errors')

const randomInt = async ctx => {
  ctx.body = { randomNumber: 42 }
}

const updateRandomInt = async ctx => {
  validate(ctx.request.body, randomValidation.updateRandomIntValidationRules)
  const number = parseInt(ctx.request.body.number)
  if (number !== 42) {
    ctx.body = {}
  } else {
    throw new ConflictError('42 is not a random number')
  }
  ctx.body = {}
}

module.exports = {
  randomInt,
  updateRandomInt,
}
