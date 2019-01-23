'use strict'

const logger = require('../utils/logger')
const errors = require('../utils/errors')
const config = require('../config')

const handleErrorsMiddleware = async (ctx, next) => {
  try {
    return await next()
  } catch (err) {
    const responseError = errors.formatResponseError(err, config.env)
    // set error status
    ctx.status = responseError.code
    // log error
    logger.error(JSON.stringify({
      ...responseError,
      stack: err.stack,
    }))
    // set body
    ctx.body = responseError
    return true
  }
}

module.exports = () => handleErrorsMiddleware
