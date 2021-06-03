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
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: parseInt(process.env.DATABASE_POOL_MIN) || 0,
      max: parseInt(process.env.DATABASE_POOL_MAX) || 5,
    },
    ssl: true,
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
      // expiresIn: 3 * 60 * 60, -> NEVER EXPIRING TOKEN
      algorithm: 'HS256',
      issuer: `com.strv.ios-nights-api.${env}`,
    },
    verifyOptions: {
      algorithm: 'HS256',
      issuer: `com.strv.ios-nights-api.${env}`,
    },
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_BUCKET,
    apiVersion: '2012-10-17',
    signUrlExpiration: 60,
    s3Url: `https://${process.env.AWS_BUCKET}.s3.amazonaws.com`,
  },
  pagination: {
    perPage: 20,
  },
})
