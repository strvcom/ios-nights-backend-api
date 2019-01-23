'use strict'

const Koa = require('koa')
const koaCors = require('kcors')
const koaBody = require('koa-body')
const koaHelmet = require('koa-helmet')
const db = require('./database')
const config = require('./config')
const logger = require('./utils/logger')
const routes = require('./routes')
const koaErrors = require('./middlewares/errors')
const { notFoundHandler } = require('./utils/errors')

const services = {
  httpServer: null,
  db: null,
}

const app = new Koa()

app
  .use(koaErrors())
  .use(koaCors())
  .use(koaHelmet())
  .use(koaBody())
  .use(routes)
  .use(notFoundHandler())

app.start = async () => {
  logger.info('Starting server')

  // start HTTP server
  if (require.main === module) {
    services.httpServer = await new Promise(resolve => {
      const server = app.listen(config.server.port, () => resolve(server))
    })
    logger.info(`Server listening on port ${config.server.port}`)
  }
  // TODO: connect do DB
}

app.stop = async () => {
  logger.warn('Shutting down server')
  if (services.httpServer !== null) {
    await services.httpServer.close()
  }
  if (services.db !== null) {
    await services.db.disconnect()
  }
  logger.warn('Server is down')
}

// Launch app
app.start()
  .then(() => logger.info('App is running 🎉'))
  .catch(err => logger.error(`Error occurred: ${err.stack}`))

process.once('SIGINT', () => app.stop())
process.once('SIGTERM', () => app.stop())

module.exports = app
