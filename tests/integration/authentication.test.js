'use strict'

const request = require('supertest-koa-agent')
const app = require('../../src/app')
const security = require('../../src/utils/security')
const data = require('../data')

// test authentication - login, access token
describe('POST /login', () => {
  test('It should return verified user with access token', async () => {
    const { body } = await request(app)
      .post('/login')
      .send(data.loginData)
      .expect(200)
    expect(Object.keys(body)).toEqual(expect.arrayContaining([
      'user',
      'lecturesStatistics',
      'tokenInfo',
    ]))
    // validate accessToken
    const { accessToken } = body.tokenInfo
    const userId = await security.verifyAccessToken(accessToken)
    expect(userId).toEqual(data.user.id)
  })

  test('It should return Unauthorized 401 error on invalid credentials', async () => {
    await request(app)
      .post('/login')
      .send({
        email: data.loginData.email,
        password: 'wrong password',
      })
      .expect(401)
  })
})
