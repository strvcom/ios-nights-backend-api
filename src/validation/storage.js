'use strict'

const Joi = require('joi')

const awsSignS3 = Joi.object().keys({
  name: Joi.string().min(3).max(300)
    .required(),
  type: Joi.string().min(3).max(50)
    .required(),
})

module.exports = {
  awsSignS3,
}
