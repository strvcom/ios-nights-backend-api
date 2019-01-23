'use strict'

const lectureRepository = require('../repositories/lecture')

const getList = async (page = 1) => ({
  ...await lectureRepository.paginate(page, 20),
  page,
})

module.exports = {
  getList,
}
