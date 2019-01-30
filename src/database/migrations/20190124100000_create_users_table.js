'use strict'

module.exports = {
  up: knex => knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.text('email').notNullable().unique()
    table.text('password').notNullable()
    table.string('picture')
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now())
  }),
  down: knex => knex.schema.dropTableIfExists('users'),
}
