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

const getUserLectures = async (user, lecturesIds) => {
  const { rows } = await knex.raw(`
  SELECT lecture_id, assignment_done AS done
  FROM user_lectures
  WHERE user_id = ? AND lecture_id IN (??)`, [user.id, lecturesIds])
  return R.indexBy(R.prop('lecture_id'), rows)
}

module.exports = {
  paginate,
  getById,
  getUserLectures,
}
