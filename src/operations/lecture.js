'use strict'

const lectureRepository = require('../repositories/lecture')
const errors = require('../utils/errors')

const getList = async (page = 1) => ({
  ...await lectureRepository.paginate(page, 20),
  page,
})

const getDetail = async id => {
  const lecture = await lectureRepository.getById(id)
  if (!lecture) {
    throw new errors.NotFoundError({ id }, 'Lecture not found')
  }
  return lecture
}

module.exports = {
  getList,
  getDetail,
}
