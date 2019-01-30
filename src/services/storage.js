'use strict'

const aws = require('aws-sdk')
const config = require('../config')

const s3 = new aws.S3({
  apiVersion: config.aws.apiVersion,
})

const getS3SignUrl = ({ name, type, directory = '' }) => new Promise((resolve, reject) => {
  const filename = `${directory}/${name}`.replace(/^\/+/ug, '')
  const s3Params = {
    Bucket: config.aws.bucket,
    Key: filename,
    Expires: config.aws.signUrlExpiration,
    ContentType: type,
    ACL: 'public-read',
  }

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      reject(err)
    }
    resolve({
      signedRequest: data,
      url: `${config.aws.s3Url}/${filename}`,
    })
  })
})

module.exports = {
  getS3SignUrl,
}
