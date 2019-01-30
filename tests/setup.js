'use strict'

const Lecture = require('../src/database/models/lecture')
const { knex } = require('../src/database')
const helpers = require('./helpers')
const data = require('./data')

helpers.resetDb()
  .then(async () => {
    console.log('Test database cleared!')
    await Promise.all([
      Lecture.query().insert(data.lecturesDB),
      knex.raw('INSERT INTO users (name, email, password) VALUES (?,?,?)', data.dbRowUser),
    ])
  })
  .then(process.exit)
