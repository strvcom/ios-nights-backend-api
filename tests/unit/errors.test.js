'use strict'

const errors = require('../../src/utils/errors')

test('Not found handler should return 404 error', () => {
  expect(errors.notFoundHandler()).toThrow(errors.NotFoundError)
})

describe('Formatting response error format', () => {
  test('Unexpected error should return HTTP 500 response', () => {
    const responseError = errors.formatResponseError(new Error('generic error'), 'local')
    expect(responseError).toMatchObject({
      error: 'Internal Server Error',
      code: 500,
    })
  })

  test('API error should return appropriate HTTP response', () => {
    let responseError = errors.formatResponseError(new errors.NotFoundError(), 'local')
    expect(responseError).toMatchObject({
      error: 'Not Found',
      code: 404,
    })
    responseError = errors.formatResponseError(new errors.BadRequestError(), 'local')
    expect(responseError).toMatchObject({
      error: 'Bad Request',
      code: 400,
    })
    responseError = errors.formatResponseError(new errors.UnauthorizedError(), 'local')
    expect(responseError).toMatchObject({
      error: 'Unauthorized',
      code: 401,
    })
    responseError = errors.formatResponseError(new errors.ForbiddenError(), 'local')
    expect(responseError).toMatchObject({
      error: 'Forbidden',
      code: 403,
    })
    responseError = errors.formatResponseError(new errors.ConflictError(), 'local')
    expect(responseError).toMatchObject({
      error: 'Conflict',
      code: 409,
    })
  })

  test('Stacktrace should be omitted in production response', () => {
    const responseError = errors.formatResponseError(new Error('generic error'), 'production')
    expect(responseError).toMatchObject({
      error: 'Internal Server Error',
      code: 500,
    })
    expect(responseError).not.toHaveProperty('stacktrace')
  })
})
