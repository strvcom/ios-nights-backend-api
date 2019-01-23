'use strict'

const { Model } = require('../index')

class Lecture extends Model {
  static get tableName() {
    return 'lectures'
  }
}

module.exports = Lecture
