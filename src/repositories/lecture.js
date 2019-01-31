'use strict'

const R = require('ramda')
const Lecture = require('../database/models/lecture')
const User = require('../database/models/user')
const { knex } = require('../database')
const userRepository = require('./user')

const paginate = (page, perPage) => Lecture
  .query()
  .pick(['id', 'name', 'previewPicture'])
  .page(page - 1, perPage)

const getById = id => Lecture
  .query()
  .findById(id)

const getUserLectures = async (userId, lecturesIds) => {
  const [user] = await User
    .query()
    .where('id', userId)
    .eager('lectures')
    .modifyEager('lectures', builder => {
      builder.whereIn('lecture_id', lecturesIds)
    })
  return R.indexBy(R.prop('id'), user.lectures)
}

const updateAttendance = async (lectureId, attends, userId) => {
  const user = await userRepository.getById(userId)
  if (attends) {
    const relationExists = (await user
      .$relatedQuery('lectures')
      .where('lecture_id', lectureId)).length > 0
    if (!relationExists) {
      await user.$relatedQuery('lectures').relate(lectureId)
    }
  } else {
    await user.$relatedQuery('lectures').unrelate().where('lecture_id', lectureId)
  }
  return attends
}

const updateAssignmentStatus = async (lectureId, done, userId) => {
  const [user] = await User
    .query()
    .where('id', userId)
    .eager('lectures')
    .modifyEager('lectures', builder => {
      builder.where('lecture_id', lectureId)
    })
  if (!user.lectures.length) {
    return null
  }
  await knex.raw(`
    UPDATE user_lectures SET assignment_done = ? WHERE lecture_id = ? AND user_id = ?
  `, [done, lectureId, userId])
  return done
}

const getTotalLectures = async () => (await Lecture.query().count().first()).count

const getAttendedLecturesCount = async userId => {
  const [user] = await User
    .query()
    .where('id', userId)
    .eager('lectures')
  return user.lectures.length
}

const getAssignmentsCount = async userId => {
  const [user] = await User
    .query()
    .where('id', userId)
    .eager('lectures')
    .modifyEager('lectures', builder => {
      builder.where('assignment_done', true)
    })
  return user.lectures.length
}

module.exports = {
  paginate,
  getById,
  getUserLectures,
  updateAttendance,
  updateAssignmentStatus,
  getTotalLectures,
  getAttendedLecturesCount,
  getAssignmentsCount,
}
