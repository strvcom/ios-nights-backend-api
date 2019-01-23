'use strict'

const objection = require('objection')
// -- Knex/PG issue: https://github.com/tgriesser/knex/issues/927
const pg = require('pg')

pg.types.setTypeParser(20, 'text', parseInt)
pg.types.setTypeParser(1700, 'text', parseFloat)
// -- end --
const knexLib = require('knex')
const R = require('ramda')
const config = require('../config')
const knexEnvConfig = require('./knexfile')[config.env]

const knexConfig = R.mergeDeepWith({}, knexEnvConfig, objection.knexSnakeCaseMappers())
const knex = knexLib(knexConfig)

const Model = objection.Model
Model.knex(knex)

module.exports = {
  Model,
  knex,
}
