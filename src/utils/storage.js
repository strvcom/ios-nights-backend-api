'use strict'

const mime = require('mime-types')
const uuid = require('uuid/v4')
const imageExtensions = require('image-extensions')
const errors = require('../utils/errors')

const generatePictureNameFromMime = mimeType => {
  const fileName = uuid()
  const fileExtension = mime.extension(mimeType)
  if (!fileExtension) {
    throw new errors.BadRequestError('Invalid file type')
  }
  if (!imageExtensions.includes(fileExtension)) {
    throw new errors.BadRequestError('File must be an image')
  }
  return `${fileName}.${fileExtension}`
}

module.exports = {
  generatePictureNameFromMime,
}
