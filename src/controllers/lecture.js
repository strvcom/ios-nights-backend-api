'use strict'

const lectureOperations = require('../operations/lecture')

const list = async ctx => {
  const page = parseInt(ctx.request.query.page || 1)
  ctx.body = await lectureOperations.getList(page)
}

module.exports = {
  list,
}
