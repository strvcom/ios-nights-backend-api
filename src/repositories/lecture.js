'use strict'

const R = require('ramda')
const Lecture = require('../database/models/lecture')
const { knex } = require('../database')

const paginate = (page, perPage) => Lecture
  .query()
  .pick(['id', 'name', 'description', 'previewPicture'])
  .page(page - 1, perPage)

const getById = id => Lecture
  .query()
  .where('id', id)
  .first()

const getUserLectures = async (userId, lecturesIds) => {
  if (lecturesIds.length === 0) {
    return []
  }
  const { rows } = await knex.raw(`
  SELECT lecture_id, assignment_done AS done
  FROM user_lectures
  WHERE user_id = ? AND lecture_id IN (??)`, [userId, lecturesIds])
  return R.indexBy(R.prop('lecture_id'), rows)
}

const updateAttendance = async (lectureId, attends, userId) => {
  if (attends) {
    await knex.raw(`
    INSERT INTO user_lectures VALUES (?,?) ON CONFLICT DO NOTHING
  `, [userId, lectureId])
  } else {
    await knex.raw(`
    DELETE FROM user_lectures WHERE user_id = ? AND lecture_id = ?
  `, [userId, lectureId])
  }
  return attends
}

const updateAssignmentStatus = async (lectureId, done, userId) => {
  const { rowCount } = await knex.raw(`
    SELECT 1 FROM user_lectures WHERE lecture_id = ? AND user_id = ?
    `, [lectureId, userId])
  if (!rowCount) {
    return null
  }
  await knex.raw(`
    UPDATE user_lectures SET assignment_done = ? WHERE lecture_id = ? AND user_id = ?
  `, [done, lectureId, userId])
  return done
}

const getTotalLectures = async () => {
  const { rows } = await knex.raw(`
    SELECT COUNT(*) count FROM lectures
   `)
  return rows[0].count
}

const getAttendedLecturesCount = async userId => {
  const { rowCount } = await knex.raw(`
    SELECT 1 FROM user_lectures WHERE user_id = ?
   `, [userId])
  return rowCount
}

const getAssignmentsCount = async userId => {
  const { rowCount } = await knex.raw(`
    SELECT 1 FROM user_lectures WHERE user_id = ? AND assignment_done = true
   `, [userId])
  return rowCount
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
