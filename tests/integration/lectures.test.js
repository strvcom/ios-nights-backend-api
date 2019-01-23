'use strict'

const request = require('supertest-koa-agent')
const app = require('../../src/app')
const Lecture = require('../../src/database/models/lecture')
const data = require('../data')
const helpers = require('../helpers')

beforeAll(async () => {
  await helpers.resetDb()
  await Lecture.query().insert(data.lecturesDB)
})

describe('GET /lectures', () => {
  test('It should return list of lectures', async () => {
    const { body } = await request(app).get('/lectures').expect(200)
    expect(body.results).toEqual(data.lecturesList)
    expect(body.total).toEqual(2)
    expect(body.page).toEqual(1)
  })

  test('It should return detail of section', async () => {
    const { body } = await request(app)
      .get('/lectures/1')
      .expect(200)
    expect(body).toMatchObject(data.lectureDetail)
  })

  test('It should return 404 when lecture doesn\'t exist', async () => {
    await request(app)
      .get('/lectures/123')
      .expect(404)
  })
})
