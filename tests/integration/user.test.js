'use strict'

const request = require('supertest-koa-agent')
const app = require('../../src/app')
const data = require('../data')

let userToken = null

beforeAll(async () => {
  // login user
  const { body } = await request(app)
    .post('/login')
    .send(data.loginData)
  userToken = `Bearer ${body.tokenInfo.accessToken}`
})

describe('POST /register', () => {
  test('It should return 409 Conflict', async () => {
    await request(app)
      .post('/register')
      .send(data.registerDuplicateUser)
      .expect(409)
  })

  test('It should create new user', async () => {
    const { body } = await request(app)
      .post('/register')
      .send(data.registerUser)
      .expect(201)
    expect(body.user.id).toBeDefined()
  })
})

describe('PATCH /users/me', () => {
  test('It should return user object', async () => {
    const { body } = await request(app)
      .get('/users/me')
      .set('Authorization', userToken)
      .send()
      .expect(200)
    expect(body.id).toEqual(data.user.id)
    expect(body.email).toEqual(data.user.email)
    expect(body.name).toEqual(data.user.name)
    expect(body.password).not.toBeDefined()
    expect(Object.keys(body.lecturesStatistics)).toEqual(expect.arrayContaining([
      'total',
      'attended',
      'assignmentsDone',
    ]))
  })
})

describe('PATCH /users/me/picture', () => {
  test('It should update user\'s picture', async () => {
    const { body } = await request(app)
      .patch('/users/me/picture')
      .set('Authorization', userToken)
      .send(data.uploadedPicture)
      .expect(200)
    expect(body.picture).toEqual(data.uploadedPicture.picture)
  })
})
