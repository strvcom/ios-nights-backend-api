'use strict'

const pino = require('pino')
const config = require('../config')

const logger = pino({
  name: config.app.name,
  level: config.logger.minLevel,
  enabled: config.logger.enabled,
})

module.exports = {
  // common well-known methods for logging
  // enables possibility to change logger package in future
  info: logger.info.bind(logger),
  warn: logger.warn.bind(logger),
  error: logger.error.bind(logger),
  debug: logger.debug.bind(logger),
  // raw logger instance
  raw: logger,
}
