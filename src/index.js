import {Z_BEST_COMPRESSION} from 'zlib'

import * as crypt from './lib/crypt'
import {parse, parseP, stringify, stringifyP} from './lib/json'
import {deflate, deflateSync, inflate, inflateSync} from './lib/zlib'
import {encode, encodeP, decode, decodeP} from './lib/base64-urlsafe'

/**
 * encrypts, encodes and deflates a given object/string
 *
 * Encryption Process:
 *  1. stringify data (optional)
 *  2. deflate
 *  3. encrypt
 *  4. deflate
 *  5. urlsafe base64 encode
 *
 * Decryption Process:
 *  1. urlsafe base64 decode
 *  2. inflate
 *  3. decrypt
 *  4. inflate
 *  5. parse data (optional)
 *
 * @module urlsafe-crypto
 */

/**
 * encrypts and encodes a given object or string
 * @example
 * const ENC_KEY = '6b7beea8ef24f7ee89e153387db8f04f'
 * // should print something like 'eJwNzAcBA0EIADBLbI66YfqX8I2ACCUcg2dSRseFKzIYpAtXM_yWN9_sDVwk9lxORTkS6op3FHdJdOmqnTI1rbrJP-FnD-wDMqcaoQ'
 * encrypt({key: 'value'}, ENC_KEY).then(result => console.log(result))
 * @param  {Object|String} data the data to encrypt
 * @param  {String} encKey Encryption Key, length must be 32 (256 Bit)
 * @return {Promise} Promise which resolves with the resulting String
 */
export const encrypt = (data, encKey) => {
  let p = Promise.resolve(data)
  if (typeof data === 'object') {
    p = p.then(data => stringifyP(data))
  }

  return p
    .then(data => deflate(data, {level: Z_BEST_COMPRESSION}))
    .then(data => crypt.encryptP(data, encKey))
    .then(data => deflate(data, {level: Z_BEST_COMPRESSION}))
    .then(encodeP)
}

/**
 * encrypts and encodes a given object or string - synchronously
 * @example
 * const ENC_KEY = '6b7beea8ef24f7ee89e153387db8f04f'
 * // should print something like 'eJwNzAcBA0EIADBLbI66YfqX8I2ACCUcg2dSRseFKzIYpAtXM_yWN9_sDVwk9lxORTkS6op3FHdJdOmqnTI1rbrJP-FnD-wDMqcaoQ'
 * console.log(encrypt({key: 'value'}, ENC_KEY))
 * @param  {Object|String} data the data to encrypt
 * @param  {String} encKey Encryption Key, length must be 32 (256 Bit)
 * @return {String} the resulting string
 */
export const encryptSync = (data, encKey) => {
  if (typeof data === 'object') {
    data = stringify(data)
  }

  return encode(
    deflateSync(
      crypt.encrypt(deflateSync(data), encKey),
      {level: Z_BEST_COMPRESSION}
    )
  )
}

/**
 * decodes and decrypts a given string
 * @example
 * const ENC_KEY = '6b7beea8ef24f7ee89e153387db8f04f'
 * // prints the object'{"key": "value"}'
 * decrypt('eJwNzAcBA0EIADBLbI66YfqX8I2ACCUcg2dSRseFKzIYpAtXM_yWN9_sDVwk9lxORTkS6op3FHdJdOmqnTI1rbrJP-FnD-wDMqcaoQ', ENC_KEY)
 *   .then(console.log)
 *
 * // prints 'tests'
 * encrypt('test', ENC_KEY).then(result => decrypt(result, ENC_KEY, true)).then(console.log)
 * @param {String} string the data to decode/decrypt
 * @param {String} encKey Encryption Key, length must be 32 (256 Bit)
 * @param {Boolean} toString=false indicates if the result should be converted into a string or object
 * @return {String|Object} the resulting string/object
 */
export const decrypt = (string, encKey, toString = false) => {
  const p = decodeP(string)
    .then(inflate)
    .then(data => crypt.decryptP(data, encKey))
    .then(inflate)
    .then(data => Promise.resolve(data.toString()))
  if (toString === true) {
    return p
  }
  return p.then(parseP)
}

/**
 * decodes and decrypts a given string - synchronously
 * @example
 * const ENC_KEY = '6b7beea8ef24f7ee89e153387db8f04f'
 * // prints the object'{"key": "value"}'
 * console.log(decrypt('eJwNzAcBA0EIADBLbI66YfqX8I2ACCUcg2dSRseFKzIYpAtXM_yWN9_sDVwk9lxORTkS6op3FHdJdOmqnTI1rbrJP-FnD-wDMqcaoQ', ENC_KEY))
 *
 * // prints 'tests'
 * console.log(decrypt(encrypt('test', ENC_KEY), ENC_KEY, true))
 * @param {String} string the data to decode/decrypt
 * @param {String} encKey Encryption Key, length must be 32 (256 Bit)
 * @param {Boolean} toString=false indicates if the result should be converted into a string or object
 * @return {String|Object} the resulting string/object
 */
export const decryptSync = (string, encKey, toString = false) => {
  const decrypted = inflateSync(
    crypt.decrypt(
      inflateSync(decode(string)),
      encKey
    )
  ).toString()
  if (toString === true) {
    return decrypted
  }
  return parse(decrypted)
}


/**
 * @typedef {Object} urlsafe-crypto
 * @property {Function} encrypt
 * @property {Function} encryptSync
 * @property {Function} decrypt
 * @property {Function} decryptSync
 */


/**
 * exports a init function which returns the specific methods
 * without the need of the encryption key
 * @example
 * import urlsafeCrypto from 'urlsafe-crypto'
 * const ENC_KEY = 'b6bad4846614652e7ead69df7337a7f4'
 * const crypto = urlsafeCrypto(ENC_KEY)
 *
 * // prints the object
 * crypto.encrypt({an: 'object'}).then(crypto.decrypt).then(console.log)
 * // prints 'test', important: add the isString option to the decrypt function
 * crypto.encrypt('test').then(encryptedString => crypto.decrypt(encryptedString, true)).then(console.log)
 *
 * const cryptoString = urlsafeCrypto(ENC_KEY, true)
 * // prints 'test'
 * cryptoString.encrypt('test').then(crypto.decrypt).then(console.log)
 * // prints the object, important: add the isString option to decrypt function
 * cryptoString.encrypt({an: 'object'}).then(encryptedObject => cryptoString.decrypt(encryptedObject, false)).then(console.log)
 * @param {String} encKey - encryption key
 * @param {Boolean} isString - set the default value for isString (f.e. if you only encrypt/decrypt strings)
 * @return {urlsafe-crypto} urlsafe-crypto functions
 */
export default (encKey, isString = false) => {
  const defaultIsString = isString
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
    encrypt: data => encrypt(data, encKey),
    encryptSync: data => encryptSync(data, encKey),
    decrypt: (data, isString = defaultIsString) => decrypt(data, encKey, isString),
    decryptSync: (data, isString = defaultIsString) => decryptSync(data, encKey, isString)
  }
}
