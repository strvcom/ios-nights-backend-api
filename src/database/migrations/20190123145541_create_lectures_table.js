'use strict'

module.exports = {
  up: knex => knex.schema.createTable('lectures', table => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.text('description').notNullable()
    table.text('assignment').notNullable()
    table.string('preview_picture')
    table.string('detail_picture')
  }),
  down: knex => knex.schema.dropTableIfExists('lectures'),
}
