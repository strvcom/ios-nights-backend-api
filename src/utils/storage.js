'use strict'

const mime = require('mime-types')
const uuid = require('uuid/v4')

const generateFilenameForMimeType = mimeType => `${uuid()}.${mime.extension(mimeType)}`

module.exports = {
  generateFilenameForMimeType,
}
