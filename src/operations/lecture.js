'use strict'

const R = require('ramda')
const lectureRepository = require('../repositories/lecture')
const errors = require('../utils/errors')

const getLecture = async id => {
  const lecture = await lectureRepository.getById(id)
  if (!lecture) {
    throw new errors.NotFoundError('Lecture not found', { id })
  }
  return lecture
}

/**
 *  Map user's attendance to lectures
 * @param {Lecture[]} lectures Array of lectures
 * @param {Number} userId User's ID
 * @returns {Promise<*>}
 */
const getLecturesWithUserStats = async (lectures, userId) => {
  const lecturesIds = lectures.map(lecture => lecture.id)
  const userLectures = await lectureRepository.getUserLectures(userId, lecturesIds)
  return lectures.map(lecture => ({
    ...lecture,
    attended: R.hasIn(lecture.id, userLectures),
    assignmentDone: R.hasIn(lecture.id, userLectures) && userLectures[lecture.id].assignmentDone,
  }))
}

const getList = async (userId, { page = 1, perPage = 20 }) => {
  const { results, total } = await lectureRepository.paginate(page, perPage)
  const lectures = await getLecturesWithUserStats(results, userId)
  return {
    lectures,
    total,
    page,
    perPage,
  }
}

const getDetail = async (userId, id) => {
  const lecture = await getLecture(id)
  return (await getLecturesWithUserStats([lecture], userId))[0]
}

const updateAttendance = async ({ lectureId, attends }, userId) => {
  await getLecture(lectureId)
  await lectureRepository.updateAttendance(lectureId, attends, userId)
  return getDetail(userId, lectureId)
}

const updateAssignmentStatus = async ({ lectureId, done }, userId) => {
  await getLecture(lectureId)
  const status = await lectureRepository.updateAssignmentStatus(lectureId, done, userId)
  if (status === null) {
    throw new errors.BadRequestError('User doesn\'t attend this lecture')
  }
  return getDetail(userId, lectureId)
}

module.exports = {
  getList,
  getDetail,
  updateAttendance,
  updateAssignmentStatus,
}
