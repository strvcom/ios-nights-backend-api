'use strict'

const lectureRepository = require('../repositories/lecture')

const getList = async (page = 1) => ({
  ...await lectureRepository.paginate(page, 1),
  page,
})

module.exports = {
  getList,
}
