'use strict'

const request = require('supertest-koa-agent')
const app = require('../../src/app')
const security = require('../../src/utils/security')
const { loginData, userData } = require('../data')

// test authentication - login, access token
describe('POST /login', () => {
  test('It should return verified user with access token', async () => {
    const res = await request(app)
      .post('/login')
      .send(loginData)
      .expect(200)

    expect(Object.keys(res.body)).toEqual(expect.arrayContaining([
      'user',
      'tokenInfo',
    ]))

    // validate accessToken
    const { accessToken } = res.body.tokenInfo
    const userId = await security.verifyAccessToken(accessToken)
    expect(userId).toEqual(userData.id)
  })

  test('It should return Unauthorized 401 error on invalid credentials', async () => {
    await request(app)
      .post('/login')
      .send({
        email: loginData.email,
        password: 'wrong password',
      })
      .expect(401)
  })
})
