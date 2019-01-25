'use strict'

const request = require('supertest-koa-agent')
const app = require('../../src/app')
const Lecture = require('../../src/database/models/lecture')
const User = require('../../src/database/models/user')
const data = require('../data')
const helpers = require('../helpers')

let userToken = null

const userData = {
  id: 2,
  name: 'James Doe',
  password: '$2b$10$LTLMdAPm2HHpm0ctBJu48OmVhWrjpB1Srn.sehbhAQoey7bUQZBtG',
  email: 'james@example.org',
}

const loginData = {
  email: 'james@example.org',
  password: 'passw0rd',
}

beforeAll(async () => {
  await helpers.resetDb()
  await Lecture.query().insert(data.lecturesDB)
  await User.query().insert(userData)
  // login user
  const { body } = await request(app)
    .post('/login')
    .send(loginData)
  userToken = `jwt ${body.tokenInfo.accessToken}`
})

describe('GET /lectures', () => {
  test('It should return list of lectures', async () => {
    const { body } = await request(app)
      .get('/lectures')
      .set('Authorization', userToken)
      .expect(200)
    expect(body.results).toEqual(data.lecturesList)
    expect(body.total).toEqual(2)
    expect(body.page).toEqual(1)
  })
})

describe('GET /lectures/:id', () => {
  test('It should return detail of section', async () => {
    const { body } = await request(app)
      .get('/lectures/1')
      .set('Authorization', userToken)
      .expect(200)
    expect(body).toMatchObject(data.lectureDetail)
  })

  test('It should return 404 when lecture doesn\'t exist', async () => {
    await request(app)
      .get('/lectures/123')
      .set('Authorization', userToken)
      .expect(404)
  })
})

describe('PATCH /lectures/:id/attendance', () => {
  test('It should update user\'s lecture attendance', async () => {
    const { body } = await request(app)
      .patch('/lectures/1/attendance')
      .set('Authorization', userToken)
      .send({
        attends: true,
      })
      .expect(200)
    expect(body).toMatchObject({
      attends: true,
    })
  })
})

describe('PATCH /lectures/:id/assignment', () => {
  test('It should update user\'s lecture assignment status', async () => {
    await request(app)
      .patch('/lectures/2/attendance')
      .set('Authorization', userToken)
      .send({
        attends: true,
      })
      .expect(200)
    const { body } = await request(app)
      .patch('/lectures/2/assignment')
      .set('Authorization', userToken)
      .send({
        done: true,
      })
      .expect(200)
    expect(body).toMatchObject({
      done: true,
    })
  })
})
