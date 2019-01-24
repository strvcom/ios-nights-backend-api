'use strict'

const request = require('supertest-koa-agent')
const app = require('../../src/app')
const User = require('../../src/database/models/user')
const security = require('../../src/utils/security')
const helpers = require('../helpers')

const userData = {
  id: 1,
  name: 'John Doe',
  password: '$2b$10$LTLMdAPm2HHpm0ctBJu48OmVhWrjpB1Srn.sehbhAQoey7bUQZBtG',
  email: 'john.doe@example.org',
}

const loginData = {
  email: 'john.doe@example.org',
  password: 'passw0rd',
}

beforeAll(async () => {
  await helpers.resetDb()
  await User.query().insert(userData)
})

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
        email: userData.email,
        password: 'wrong password',
      })
      .expect(401)
  })
})
