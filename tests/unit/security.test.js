'use strict'

const security = require('../../src/utils/security')
const errors = require('../../src/utils/errors')

test('Hash and compare password', async () => {
  const password = 'veryStr0ngPa$$w0rd.'
  const hashed = await security.hash(password)
  expect(security.verifyPassword(password, hashed)).toBeTruthy()
})

test('Generate and verify access token', async () => {
  const user = {
    id: 3,
    name: 'John',
    surname: 'Doe',
    age: 39,
  }
  const { accessToken } = await security.generateAccessToken(user)
  expect(await security.verifyAccessToken(accessToken)).toEqual(user.id)
})

test('Parse access token from HTTP header', () => {
  const httpHeader1 = 'jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.hqWGSaFpvbrXkOWc6lrnffhNWR19W_S1YKFBx2arWBk'
  const accessToken1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.hqWGSaFpvbrXkOWc6lrnffhNWR19W_S1YKFBx2arWBk'
  const token1 = security.parseJwtTokenFromHeader(httpHeader1)
  expect(token1).toBe(accessToken1)

  const httpHeader2 = ''
  const token2 = security.parseJwtTokenFromHeader(httpHeader2)
  expect(token2).toBeNull()
})

test('Throw UnauthorizedError when access token is invalid', async () => {
  const httpHeader = 'jwt wrong'
  const token = security.parseJwtTokenFromHeader(httpHeader)
  let threw = false
  try {
    await security.verifyAccessToken(token)
  } catch (err) {
    if (err instanceof errors.UnauthorizedError) {
      threw = true
    }
  }
  expect(threw).toBe(true)
})
