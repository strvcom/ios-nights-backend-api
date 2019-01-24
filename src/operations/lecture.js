'use strict'

const R = require('ramda')
const lectureRepository = require('../repositories/lecture')
const errors = require('../utils/errors')

/**
 *  Map user's attendance to individual lectures
 * @param user
 * @param lectures
 * @returns {Promise<*>}
 */
const addUserToLectures = async (user, lectures) => {
  const lecturesIds = lectures.map(lecture => lecture.id)
  const userLectures = await lectureRepository.getUserLectures(user, lecturesIds)
  return lectures.map(lecture => ({
    ...lecture,
    attended: R.hasIn(lecture.id, userLectures),
    assignmentDone: R.hasIn(lecture.id, userLectures) ? userLectures[lecture.id].done : false,
  }))
}

const getList = async (user, page = 1, perPage = 20) => {
  const { results, total } = await lectureRepository.paginate(page, perPage)
  const lectures = await addUserToLectures(user, results)
  return {
    results: lectures,
    total,
    page,
    perPage,
  }
}

const getDetail = async (user, id) => {
  const lecture = await lectureRepository.getById(id)
  if (!lecture) {
    throw new errors.NotFoundError({ id }, 'Lecture not found')
  }
  return (await addUserToLectures(user, [lecture]))[0]
}

module.exports = {
  getList,
  getDetail,
}
