'use strict'

const lectureOperations = require('../operations/lecture')

const list = async ctx => {
  const page = parseInt(ctx.request.query.page || 1)
  ctx.body = await lectureOperations.getList(ctx.user, page)
}

const detail = async ctx => {
  const lectureId = parseInt(ctx.params.id)
  ctx.body = await lectureOperations.getDetail(ctx.user, lectureId)
}

module.exports = {
  list,
  detail,
}
