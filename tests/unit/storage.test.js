'use strict'

const { generateFilenameForMimeType } = require('../../src/utils/storage')

describe('Generating filename', () => {
  test('It should generate filename based on provided MIME', () => {
    expect(generateFilenameForMimeType('application/json')).toEqual(expect.stringContaining('.json'))
    expect(generateFilenameForMimeType('image/jpeg')).toEqual(expect.stringContaining('.jpeg'))
    expect(generateFilenameForMimeType('image/png')).toEqual(expect.stringContaining('.png'))
  })
})
