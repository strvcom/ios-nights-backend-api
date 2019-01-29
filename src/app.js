'use strict'

const Koa = require('koa')
const koaCors = require('kcors')
const koaBody = require('koa-body')
const koaHelmet = require('koa-helmet')
const koaCompress = require('koa-compress')
const aws = require('aws-sdk')
const config = require('./config')
const logger = require('./utils/logger')
const routes = require('./routes')
const koaErrors = require('./middlewares/errors')
const { notFoundHandler } = require('./utils/errors')

const services = {
  server: null,
}

const app = new Koa()

app
  .use(koaCompress())
  .use(koaErrors())
  .use(koaCors())
  .use(koaHelmet())
  .use(koaBody())
  .use(routes)
  .use(notFoundHandler())

app.start = async () => {
  logger.info('Starting server')

  // start HTTP server
  services.server = await new Promise(resolve => {
    const server = app.listen(config.server.port, () => resolve(server))
  })
  logger.info(`Server listening on port ${config.server.port}`)

  // configure AWS
  aws.config.update({
    secretAccessKey: config.aws.secretAccessKey,
    accessKeyId: config.aws.accessKeyId,
    region: config.aws.region,
  })
}

app.stop = async () => {
  logger.warn('Shutting down server')
  if (services.server !== null) {
    await services.server.close()
  }
}

module.exports = app
