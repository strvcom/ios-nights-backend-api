'use strict'

const sinon = require('sinon')
const storage = require('../../src/services/storage')

const sandbox = sinon.createSandbox({})

sandbox.replace(storage, 'uploadFile', () => ({
  url: 'www.amazonaws.com/users/test-file.jpg',
  key: 'users/test-file.jpg',
}))
sandbox.replace(storage, 'deleteFile', () => true)

module.exports = {
  sandbox,
}
