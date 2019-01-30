/* eslint-disable no-useless-escape */
'use strict'

const { promisify } = require('util')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { isEmpty } = require('ramda')
const config = require('../config')
const { UnauthorizedError } = require('./errors')

/**
 * Hashes password
 * @param {string} password Password string
 * @returns {string} Hashed password
 */
const hash = password => bcrypt.hash(password, config.security.saltRounds)

/**
 * Verifies password against hash
 * @param {string} password Password to compare
 * @param {string} hashedPassword Hash of password
 * @returns {boolean} True if password match
 */
const verifyPassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword)

/**
 * Generates JWT token
 * @param {number} userId
 * @returns {{accessToken: string}}
 */
const generateAccessToken = userId => {
  const accessToken = jwt.sign({
    userId,
  }, config.security.secret, config.security.createOptions)
  return {
    accessToken,
  }
}

/**
 * Verifies JWT token
 * @param {string} accessToken Access token provided by user
 * @returns {Promise} userId
 * @throws {UnauthorizedError}
 */
const verifyAccessToken = async accessToken => {
  try {
    const verifyToken = promisify(jwt.verify)
    const result = await verifyToken(
      accessToken,
      config.security.secret,
      config.security.verifyOptions,
    )
    return result.userId
  } catch (err) {
    throw new UnauthorizedError(err.message)
  }
}

/**
 * Parses jwt access token from Authorization header
 * @param {string} header Authorization header string
 * @returns {string|null}
 */
const parseJwtTokenFromHeader = header => {
  if (!header || isEmpty(header)) {
    return null
  }
  const mask = /Bearer (.+)/u
  const result = header.match(mask)
  if (!result) {
    return null
  }
  return result[1]
}

/**
 * Verifies JWT token from header and returns User object or error
 * @param {string} authHeader Authorization header string
 * @returns {Promise}
 * @throw {UnauthorizedError}
 */
const authenticateByToken = authHeader => {
  const token = parseJwtTokenFromHeader(authHeader)

  // check if token is provided
  if (!token) {
    throw new UnauthorizedError('Missing authorization header')
  }

  // check token validity
  return verifyAccessToken(token)
}

module.exports = {
  hash,
  verifyPassword,
  generateAccessToken,
  verifyAccessToken,
  parseJwtTokenFromHeader,
  authenticateByToken,
}
