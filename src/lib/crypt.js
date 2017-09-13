import {randomBytes, createCipheriv, createDecipheriv} from 'crypto'

import asPromise from './as-promise'

/**
 * aes-256-cbc encrypt/decrypt
 * @module lib/crypt
 */


// must be 256 Bit (32 characters)
const ENC_ALG = 'aes-256-cbc'
const IV_LENGTH = 16;


/**
 * aes-256-cbc encrypt a buffer
 * @param {Buffer} buffer - the buffer to encode
 * @param {String} encKey - the encription key, must be 32 characters (256 Bit) long
 * @returns {Buffer} Buffer containting the iv and the encrypted string
 */
export const encrypt = (buffer, encKey) => {
  const iv = randomBytes(IV_LENGTH)
  const cipher = createCipheriv(ENC_ALG, encKey, iv)
  const encrypted = Buffer.concat([
    cipher.update(buffer),
    cipher.final()
  ])
  return Buffer.from(
    `${iv.toString('hex')}:${encrypted.toString('hex')}`
  )
}

/**
 * aes-256-cbc encrypt a buffer - Promise
 * @param {Buffer} buffer - the buffer to encode
 * @param {String} encKey - the encription key, must be 32 characters (256 Bit) long
 * @returns {Promise} Promise resolving with the encrypted data as Buffer
 */
export const encryptP = (buffer, encKey) => asPromise(() => encrypt(buffer, encKey))


/**
 * decrypt a aes-256-cbc encrypted buffer
 * @param {Buffer} buffer - the buffer to encode
 * @param {String} encKey - the encription key, must be 32 characters (256 Bit) long
 * @returns {Promise} Promise resolving with the decrypted data as Buffer
 */
export const decrypt = (buffer, encKey) => {
  const [iv, encrypted] = buffer.toString()
    .split(':')
    .map(d => new Buffer(d, 'hex'))
  const deciper = createDecipheriv(ENC_ALG, encKey, iv)
  return Buffer.concat([
    deciper.update(encrypted),
    deciper.final()
  ])
}

/**
 * decrypt a aes-256-cbc encrypted buffer - Promise
 * @param {Buffer} buffer - the buffer to encode
 * @param {String} encKey - the encription key, must be 32 characters (256 Bit) long
 * @returns {Promise} Promise resolving with the decrypted data as Buffer
 */
export const decryptP = (buffer, encKey) => asPromise(() => decrypt(buffer, encKey))

/**
 * @typedef {Object} crypt
 * @property {Function} decrypt
 * @property {Function} decryptP
 * @property {Function} encrypt
 * @property {Function} encryptP
 */

/**
 * exports a init function which returns the shorthands for the specific methods
 * without the need of the config object (means the only argument is a buffer)
 * @param  {String} encKey - encryption key
 * @return {crypt} crypt functions
 */
export default encKey => {
  if (!encKey) {
    throw new Error('encryption key is missing')
  }
  if (typeof encKey === 'string') {
    encKey = Buffer.from(encKey)
  }
  if (!Buffer.isBuffer(encKey)) {
    throw new Error('a Buffer or String is required')
  }
  if (encKey.length !== 32) {
    throw new Error(`invalid encryption key length (is: ${encKey.length} bytes, should be: 32 bytes)`)
  }
  return {
    decrypt: buffer => decrypt(buffer, encKey),
    decryptP: buffer => decryptP(buffer, encKey),
    encrypt: buffer => encrypt(buffer, encKey),
    encryptP: buffer => encryptP(buffer, encKey)
  }
}
