'use strict'

const fs = require('fs')
const aws = require('aws-sdk')
const config = require('../config')

const s3 = new aws.S3({
  apiVersion: config.aws.apiVersion,
})

const uploadFile = ({ path, type }, fileName) => new Promise((resolve, reject) => {
  const fileStream = fs.createReadStream(path)
  fileStream.on('error', reject)
  s3.upload({
    ACL: 'public-read',
    Bucket: config.aws.bucket,
    Body: fileStream,
    Key: fileName,
    ContentType: type,
  }, (err, data) => {
    if (err) {
      reject(err)
    } else if (data) {
      resolve(data.Location)
    }
  })
})

// const deleteFile = async path => {
//
// }

module.exports = {
  uploadFile,
  // deleteFile,
}
