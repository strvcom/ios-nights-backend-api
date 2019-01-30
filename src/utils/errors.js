/* eslint-disable max-classes-per-file */
'use strict'

const http = require('http')
const { isEmpty } = require('ramda')

/**
 * ApiError base class
 */
class ApiError extends Error {
  constructor(message, payload, httpCode) {
    super()
    this.message = message
    this.payload = payload
    this.httpCode = httpCode
    this.apiError = true
  }
}

/**
 * HTTP 404 NotFound Error class
 */
class NotFoundError extends ApiError {
  constructor(message = http.STATUS_CODES[404], payload = {}) {
    super(message, payload, 404)
  }
}

/**
 * HTTP 400 BadRequest Error class
 */
class BadRequestError extends ApiError {
  constructor(message = http.STATUS_CODES[400], payload = {}) {
    super(message, payload, 400)
  }
}

/**
 * HTTP 401 UnauthorizedError Error class
 */
class UnauthorizedError extends ApiError {
  constructor(message = http.STATUS_CODES[401]) {
    super(message, null, 401)
  }
}

/**
 * HTTP 403 Forbidden Error class
 */
class ForbiddenError extends ApiError {
  constructor(message = http.STATUS_CODES[403]) {
    super(message, null, 403)
  }
}

/**
 * HTTP 409 InternalError Error class
 */
class ConflictError extends ApiError {
  constructor(message = http.STATUS_CODES[409], payload = {}) {
    super(message, payload, 409)
  }
}

/**
 * HTTP 500 InternalError Error class
 */
class InternalError extends ApiError {
  constructor(message = http.STATUS_CODES[500], payload = {}) {
    super(message, payload, 500)
  }
}

/**
 * Returns function which throws HTTP 404 Error
 * @returns {Function}
 */
const notFoundHandler = () => () => {
  throw new NotFoundError()
}

/**
 * Formats Error to response JSON format
 * @param {Error|ApiError} err Error object
 * @param {string} env Environment
 * @returns {{}} Response error object
 */
const formatResponseError = (err, env) => {
  let errorObject
  if (err instanceof ApiError || err.apiError) {
    errorObject = err
  } else {
    // otherwise we return HTTP 500 error
    errorObject = new InternalError()
  }
  // prepare response error
  const responseError = {
    error: errorObject.message,
    code: errorObject.httpCode,
  }
  if (!isEmpty(errorObject.payload)) {
    responseError.payload = errorObject.payload
  }
  // check if error stack should be exposed
  if (env !== 'production') {
    responseError.stacktrace = err.stacktrace || err.stack
  }
  return responseError
}

module.exports = {
  ApiError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  InternalError,
  ConflictError,
  notFoundHandler,
  formatResponseError,
}
