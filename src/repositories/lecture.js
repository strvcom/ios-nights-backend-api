'use strict'

const Lecture = require('../database/models/lecture')

const paginate = (page, perPage) => Lecture
  .query()
  .pick(['id', 'name', 'description', 'preview_picture'])
  .page(page - 1, perPage)

module.exports = {
  paginate,
}
