'use strict'

module.exports = {
  logger: {
    stdout: false,
    minLevel: 'info',
  },
  database: {
    url: process.env.DATABASE_URL,
    pool: {
      min: parseInt(process.env.DATABASE_POOL_MIN) || 0,
      max: parseInt(process.env.DATABASE_POOL_MAX) || 5,
    },
    ssl: true,
  },
}
