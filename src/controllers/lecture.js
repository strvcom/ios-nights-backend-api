'use strict'

const lectureOperations = require('../operations/lecture')
const { validate } = require('../utils/validation')
const User = require('../database/models/user')
const config = require('../config')

const list = async ctx => {
  const page = parseInt(ctx.request.query.page || 1)
  const perPage = parseInt(ctx.request.query.per_page || config.pagination.perPage)
  ctx.body = await lectureOperations.getList(ctx.user.id, { page, perPage })
}

const detail = async ctx => {
  const lectureId = parseInt(ctx.params.id)
  ctx.body = await lectureOperations.getDetail(ctx.user.id, lectureId)
}

const updateAttendance = async ctx => {
  validate(ctx.request.body, User.attendanceValidationRules)
  const attends = Boolean(ctx.request.body.attends)
  const lectureId = parseInt(ctx.params.id)
  ctx.body = await lectureOperations.updateAttendance({ lectureId, attends }, ctx.user.id)
}

const updateAssignment = async ctx => {
  validate(ctx.request.body, User.assignmentValidationRules)
  const done = Boolean(ctx.request.body.done)
  const lectureId = parseInt(ctx.params.id)
  ctx.body = await lectureOperations.updateAssignmentStatus({ lectureId, done }, ctx.user.id)
}

module.exports = {
  list,
  detail,
  updateAttendance,
  updateAssignment,
}
