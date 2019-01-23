'use strict'

const pkg = require('../../package')

module.exports = env => ({
  env,
  // application meta data
  app: {
    name: pkg.name,
    version: pkg.version,
  },
  server: {
    port: process.env.PORT || 3000,
  },
  database: {
    url: process.env.DB_URL,
    options: {
      autoIndex: false,
      useNewUrlParser: true,
    },
  },
  logger: {
    enabled: true,
    stdout: true,
    minLevel: 'debug',
  },
  security: {
    secret: process.env.AUTH_SECRET,
    saltRounds: 10,
    createOptions: {
      expiresIn: 60 * 60,
      algorithm: 'HS256',
      issuer: `com.strv.ios-nights-api.${env}`,
    },
    verifyOptions: {
      algorithm: 'HS256',
      issuer: `com.strv.ios-nights-api.${env}`,
    },
  },
})
