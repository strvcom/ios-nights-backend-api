'use strict'

module.exports = {
  up: knex => knex.schema.createTable('user_lectures', table => {
    table.integer('user_id').notNullable().unsigned()
      .index()
      .references('id')
      .inTable('users')
    table.integer('lecture_id').notNullable().unsigned()
      .index()
      .references('id')
      .inTable('lectures')
    table.boolean('assignment_done').notNullable().defaultTo(false)
    table.primary(['user_id', 'lecture_id'])
  }),
  down: knex => knex.schema.dropTableIfExists('user_lectures'),
}
