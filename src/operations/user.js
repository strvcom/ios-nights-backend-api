'use strict'

const path = require('path')
const uuid = require('uuid/v4')
const userRepository = require('../repositories/user')
const lectureRepository = require('../repositories/lecture')
const errors = require('../utils/errors')
const security = require('../utils/security')
const storage = require('../services/storage')

const getPictureKey = picture => `users/${uuid()}${path.extname(picture.name)}`

const register = async input => {
  const userData = {
    name: input.name,
    email: input.email.toLowerCase(),
    password: await security.hash(input.password),
  }
  // check if users exists
  const exists = await userRepository.getByEmail(userData.email)
  if (exists) {
    throw new errors.ConflictError('User with given email address already exists')
  }
  const user = await userRepository.createUser(userData)
  const uploadedPicture = await storage.uploadFile(input.picture, getPictureKey(input.picture))
  const newUserData = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      picture: uploadedPicture.url,
      pictureKey: uploadedPicture.key,
    },
    tokenInfo: security.generateAccessToken(user),
  }
  await userRepository.updatePicture(user, uploadedPicture)
  return newUserData
}

const loadUserLecturesStatistics = async userId => {
  const data = await Promise.all([
    lectureRepository.getTotalLectures(),
    lectureRepository.getAttendedLecturesCount(userId),
    lectureRepository.getAssignmentsCount(userId),
  ])
  return {
    total: data[0],
    attended: data[1],
    assignmentsDone: data[2],
  }
}

const updateUserPicture = async ({ picture }, user) => {
  // upload new picture
  const uploadedPicture = await storage.uploadFile(picture, getPictureKey(picture))
  await userRepository.updatePicture(user, uploadedPicture)

  // delete old picture
  if (user.pictureKey) {
    await storage.deleteFile(user.pictureKey)
  }

  return {
    picture: uploadedPicture.url,
  }
}

module.exports = {
  register,
  loadUserLecturesStatistics,
  updateUserPicture,
}
