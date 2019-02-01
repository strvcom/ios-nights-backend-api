'use strict'

const { generatePictureNameFromMime } = require('../../src/utils/storage')
const errors = require('../../src/utils/errors')

describe('Generating filename', () => {
  test('It should generate picture name based on provided MIME', () => {
    expect(generatePictureNameFromMime('image/jpeg')).toEqual(expect.stringContaining('.jpeg'))
    expect(generatePictureNameFromMime('image/png')).toEqual(expect.stringContaining('.png'))
  })

  test('It should throw error on wrong MIME', () => {
    expect(() => generatePictureNameFromMime('image/*')).toThrow(errors.BadRequestError)
    expect(() => generatePictureNameFromMime('image/pngg')).toThrow(errors.BadRequestError)
  })

  test('It should throw error when MIME is not image', () => {
    expect(() => generatePictureNameFromMime('audio/mp3')).toThrow(errors.BadRequestError)
    expect(() => generatePictureNameFromMime('application/octet-stream')).toThrow(errors.BadRequestError)
  })
})
