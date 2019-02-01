'use strict'

const userRepository = require('../repositories/user')
const lectureRepository = require('../repositories/lecture')
const errors = require('../utils/errors')
const security = require('../utils/security')
const storage = require('../services/storage')
const { generatePictureNameFromMime } = require('../utils/storage')

const loadUserLecturesStatistics = async userId => {
  const [
    total,
    attended,
    assignmentsDone,
  ] = await Promise.all([
    lectureRepository.getTotalLectures(),
    lectureRepository.getAttendedLecturesCount(userId),
    lectureRepository.getAssignmentsCount(userId),
  ])
  return {
    total,
    attended,
    assignmentsDone,
  }
}

const getUserWithStatistics = async userId => ({
  user: await userRepository.getById(userId),
  lecturesStatistics: await loadUserLecturesStatistics(userId),
})

const register = async input => {
  const userData = {
    name: input.name,
    email: input.email.toLowerCase(),
    password: await security.hash(input.password),
    pictureUrl: input.updatePictureUrl || null,
  }
  // check if users exists
  const exists = await userRepository.getByEmail(userData.email)
  if (exists) {
    throw new errors.ConflictError('User with given email address already exists')
  }
  // create user
  const user = await userRepository.createUser(userData)
  return {
    ...await getUserWithStatistics(user.id),
    tokenInfo: security.generateAccessToken(user.id),
  }
}

const updateUserPicture = async ({ pictureUrl }, userId) => {
  await userRepository.updatePictureUrl(userId, pictureUrl)
  return getUserWithStatistics(userId)
}

const generatePictureUploadUrl = ({ type }) => storage.getS3SignUrl({
  name: generatePictureNameFromMime(type),
  type,
  directory: 'users',
})

module.exports = {
  register,
  updateUserPicture,
  generatePictureUploadUrl,
  getUserWithStatistics,
}
