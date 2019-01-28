'use strict'

const request = require('supertest-koa-agent')
const app = require('../../src/app')
const data = require('../data')

require('../stubs/storage')

let userToken = null

beforeAll(async () => {
  // login user
  const { body } = await request(app)
    .post('/login')
    .send(data.loginData)
  userToken = `jwt ${body.tokenInfo.accessToken}`
})

// describe('POST /register', () => {
//   test('It should return DuplicateError 409', async () => {
//     await request(app)
//       .post('/register')
//       .set('Content-Type', 'application/x-www-form-urlencoded')
//       .attach('picture', 'tests/data/test.jpg')
//       .send(data.duplicateUserData)
//       .expect(409)
//   })
// })

describe('PATCH /user/picture', () => {
  test('It should update user\'s picture', async () => {
    const { body } = await request(app)
      .patch('/user/picture')
      .set('Authorization', userToken)
      .attach('picture', 'tests/data/test.jpg')
      .send()
      .expect(200)

    expect(body.picture).toEqual(data.uploadedPicture.url)
  })
})
