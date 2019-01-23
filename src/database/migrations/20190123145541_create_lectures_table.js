'use strict'

module.exports = {
  up: knex => knex.schema.createTable('lectures', table => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.text('description').notNullable()
    table.text('assignment').notNullable()
  }),
  down: knex => knex.schema.dropTableIfExists('lectures'),
}
