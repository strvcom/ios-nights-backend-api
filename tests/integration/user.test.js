'use strict'

const request = require('supertest-koa-agent')
const app = require('../../src/app')
const data = require('../data')

describe('POST /register', () => {
  test('It should return DuplicateError 409', async () => {
    await request(app)
      .post('/register')
      .send(data.duplicateUserData)
      .expect(409)
  })
})
