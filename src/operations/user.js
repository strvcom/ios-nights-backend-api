'use strict'

const userRepository = require('../repositories/user')
const lectureRepository = require('../repositories/lecture')
const errors = require('../utils/errors')
const security = require('../utils/security')
const { dbErrors } = require('../utils/errors')

const register = async input => {
  const userData = {
    name: input.name,
    email: input.email,
    password: security.hash(input.password),
    picture: '', // TODO: implement picture upload
  }

  try {
    const user = await userRepository.createUser(userData)
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
      tokenInfo: security.generateAccessToken(user),
    }
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

module.exports = {
  register,
  loadUserLecturesStatistics,
}
