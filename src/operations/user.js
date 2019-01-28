'use strict'

const path = require('path')
const uuid = require('uuid/v4')
const userRepository = require('../repositories/user')
const lectureRepository = require('../repositories/lecture')
const errors = require('../utils/errors')
const security = require('../utils/security')
const { dbErrors } = require('../utils/errors')
const storage = require('../services/storage')

const getPictureKey = picture => `users/${uuid()}${path.extname(picture.name)}`

const register = async input => {
  const userData = {
    name: input.name,
    email: input.email.toLowerCase(),
    password: await security.hash(input.password),
  }
  try {
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
  } catch (err) {
    // check if duplicate
    if (err.code && err.code === dbErrors.DUPLICATE_ERROR) {
      throw new errors.ConflictError(
        { email: input.email },
        'User with given email address already exists',
      )
    }
    throw err
  }
}

const loadUserLecturesStatistics = async user => {
  const data = await Promise.all([
    lectureRepository.getTotalLectures(),
    lectureRepository.getAttendedLecturesCount(user),
    lectureRepository.getAssignmentsCount(user),
  ])
  return {
    total: data[0],
    attended: data[1],
    assignmentsDone: data[2],
  }
}

const updateUserPicture = async (picture, user) => {
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
