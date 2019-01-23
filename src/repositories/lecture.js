'use strict'

const Lecture = require('../database/models/lecture')

const paginate = (page, perPage) => Lecture
  .query()
  .pick(['id', 'name', 'description', 'previewPicture'])
  .page(page - 1, perPage)

const getById = id => Lecture
  .query()
  .where('id', id)
  .first()

module.exports = {
  paginate,
  getById,
}
