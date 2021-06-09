'use strict'

const { parse } = require('pg-connection-string')
const config = require('../config')

const defaultOptions = {
  client: 'postgresql',
  connection: {
    ...parse(config.database.url),
    ssl: config.database.ssl,
  },
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
}

module.exports = {
  local: {
    ...defaultOptions,
  },

  development: {
    ...defaultOptions,
  },

  test: {
    ...defaultOptions,
  },

  production: {
    ...defaultOptions,
    pool: {
      min: config.database.pool.min,
      max: config.database.pool.max,
    },
  },
}

