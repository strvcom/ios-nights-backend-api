'use strict'

const Lecture = require('../src/database/models/lecture')
const User = require('../src/database/models/user')
const helpers = require('./helpers')
const data = require('./data')

helpers.resetDb()
  .then(async () => {
    console.log('Database prepared!')
    await Lecture.query().insert(data.lecturesDB)
    await User.query().insert(data.userData)
  })
  .then(process.exit)
