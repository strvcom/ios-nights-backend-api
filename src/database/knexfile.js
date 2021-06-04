'use strict'

const config = require('../config')

module.exports = {
  [config.env]: {
    ...config.database,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
}

