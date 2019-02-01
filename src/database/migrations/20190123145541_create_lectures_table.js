'use strict'

module.exports = {
  up: knex => knex.schema.createTable('lectures', table => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.text('description').notNullable()
    table.text('assignment').notNullable()
    table.string('preview_picture_url')
    table.string('detail_picture_url')
    table.timestamps(true, true)
  }),
  down: knex => knex.schema.dropTableIfExists('lectures'),
}
