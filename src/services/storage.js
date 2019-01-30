'use strict'

const fs = require('fs')
const aws = require('aws-sdk')
const config = require('../config')

const s3 = new aws.S3({
  apiVersion: config.aws.apiVersion,
})

const uploadFile = ({ path, type }, fileName) => new Promise((resolve, reject) => {
  // read file
  const fileStream = fs.createReadStream(path)
  fileStream.on('error', reject)

  // upload file
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
      resolve({
        url: data.Location,
        key: data.Key,
      })
    }
  })
})

const deleteFile = key => new Promise((resolve, reject) => {
  s3.deleteObject({
    Bucket: config.aws.bucket,
    Key: key,
  }, (err, data) => {
    if (err) {
      reject(err)
    } else if (data) {
      resolve(true)
    }
  })
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
      url: `https://${config.aws.bucket}.s3.amazonaws.com/${filename}`,
    })
  })
})


module.exports = {
  uploadFile,
  deleteFile,
  getS3SignUrl,
}
