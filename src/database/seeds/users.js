/* eslint-disable */
'use strict'

const data = [
  {
    id: 1,
    name: 'Jozef Cipa',
    email: 'jozef.cipa@strv.com',
    password: '$2b$10$aUbeehZCP/plyBP5fpZaXuCSlgj6DqZ8oOwJZvM6.Gb6my//uv/bG',
    picture: 'https://s3.us-east-2.amazonaws.com/strv-ios-nights2019/users/4bacff84-3448-4112-87ac-23b49787b2a9.png',
    picture_key: 'users/4bacff84-3448-4112-87ac-23b49787b2a9.png',
  },
]

const seed = async knex => {
  await knex('users').del()
  await Promise.all(data.map(lecture => knex('users').insert(lecture)))
}

module.exports = {
  seed,
}
