'use strict'

const request = require('supertest-koa-agent')
const app = require('../../src/app')
const data = require('../data')
const { knex } = require('../../src/database')

let userToken = null

beforeAll(async () => {
  // login user
  const { body } = await request(app)
    .post('/login')
    .send(data.loginData)
  userToken = `Bearer ${body.tokenInfo.accessToken}`
})

describe('Lectures', () => {
  beforeAll(async () => {
    await knex.raw('DELETE FROM user_lectures')
  })

  describe('GET /lectures', () => {
    test('It should return list of lectures', async () => {
      const { body } = await request(app)
        .get('/lectures')
        .set('Authorization', userToken)
        .expect(200)
      expect(body.lectures).toEqual(data.lecturesList)
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
    expect(body.attended).toEqual(true)
  })
})

describe('PATCH /lectures/:id/assignment', () => {
  test('It should update user\'s lecture assignment status', async () => {
    await request(app)
      .patch('/lectures/1/attendance')
      .set('Authorization', userToken)
      .send({
        attends: true,
      })
      .expect(200)
    const { body } = await request(app)
      .patch('/lectures/1/assignment')
      .set('Authorization', userToken)
      .send({
        done: true,
      })
      .expect(200)
    expect(body.assignmentDone).toEqual(true)
  })
})
