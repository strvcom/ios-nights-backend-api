'use strict'

const userRepository = require('../repositories/user')
const lectureRepository = require('../repositories/lecture')
const errors = require('../utils/errors')
const security = require('../utils/security')
const storage = require('../services/storage')

const register = async input => {
  const userData = {
    name: input.name,
    email: input.email.toLowerCase(),
    password: await security.hash(input.password),
    picture: input.picture || '',
  }
  // check if users exists
  const exists = await userRepository.getByEmail(userData.email)
  if (exists) {
    throw new errors.ConflictError('User with given email address already exists')
  }
  // create user
  const user = await userRepository.createUser(userData)
  return {
    ...user.toJSON(),
    tokenInfo: security.generateAccessToken(user.id),
  }
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

const updateUserPicture = async ({ picture }, userId) => {
  await userRepository.updatePicture(userId, picture)
  return userRepository.getById(userId)
}

const generatePictureUploadUrl = ({ name, type }) => storage.getS3SignUrl({
  name,
  type,
  directory: 'users',
})

module.exports = {
  register,
  loadUserLecturesStatistics,
  updateUserPicture,
  generatePictureUploadUrl,
}
