'use strict'

const app = require('./app')
const logger = require('./utils/logger')

// Launch app
app.start()
  .then(() => logger.info('App is running 🎉'))
  .catch(err => logger.error(`Error occurred: ${err.stack}`))

process.once('SIGINT', app.stop)
process.once('SIGTERM', app.stop)
