import asPromise from './as-promise'

/**
 * url safe base64 encode/decode <a href="https://tools.ietf.org/html/rfc7515#appendix-C">RFC7515 Appendic-C</a>
 * @module lib/base64-urlsafe
 */


/**
 * url-safe base 64 encodes a buffer
 * @param {Buffer} buffer - the buffer to encode
 * @returns {String} the encoded string
 */
export const encode = buffer => buffer
  .toString('base64')
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=/g, '') // eslint-disable-line no-div-regex


/**
 * url-safe base64 encode a buffer - Promise
 * @param {Buffer} buffer - the buffer to encode
 * @returns {Promise} Promise object with resolves the encoded string
 */
export const encodeP = buffer => asPromise(() => encode(buffer))


/**
 * url-safe base64 decode a buffer
 * @param {String} string - the string to decode
 * @returns {Buffer} the decoded buffer
 */
export const decode = string => Buffer.from(
  (string + '==='.slice((string.length + 3) % 4))
    .replace(/\-/g, '+') // eslint-disable-line no-useless-escape
    .replace(/_/g, '/')
  , 'base64'
)


/**
 * url-safe base64 decode a buffer - Promise
 * @param {String} string - the string to decode
 * @returns {Promise} Promise object with resolves the decoded buffer
 */
export const decodeP = string => asPromise(() => decode(string))


/**
 * @typedef {Object} base64-urlsafe
 * @property {Function} encode
 * @property {Function} encodeP
 * @property {Function} decode
 * @property {Function} decodeP
 */

/**
 * exports all functions as default
 * @return {base64-urlsafe} base64-urlsafe functions
 */
export default {
  decode,
  decodeP,
  encode,
  encodeP
}
