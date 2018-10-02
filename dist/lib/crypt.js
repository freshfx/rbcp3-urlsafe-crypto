'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decryptP = exports.decrypt = exports.encryptP = exports.encrypt = undefined;

var _crypto = require('crypto');

var _asPromise = require('./as-promise');

var _asPromise2 = _interopRequireDefault(_asPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * aes-256-cbc encrypt/decrypt
 * @module lib/crypt
 */

// must be 256 Bit (32 characters)
const ENC_ALG = 'aes-256-cbc';
const IV_LENGTH = 16;

/**
 * aes-256-cbc encrypt a buffer
 * @param {Buffer} buffer - the buffer to encode
 * @param {String} encKey - the encription key, must be 32 characters (256 Bit) long
 * @returns {Buffer} Buffer containting the iv and the encrypted string
 */
const encrypt = exports.encrypt = (buffer, encKey) => {
  const iv = (0, _crypto.randomBytes)(IV_LENGTH);
  const cipher = (0, _crypto.createCipheriv)(ENC_ALG, encKey, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return Buffer.from(`${iv.toString('hex')}:${encrypted.toString('hex')}`);
};

/**
 * aes-256-cbc encrypt a buffer - Promise
 * @param {Buffer} buffer - the buffer to encode
 * @param {String} encKey - the encription key, must be 32 characters (256 Bit) long
 * @returns {Promise} Promise resolving with the encrypted data as Buffer
 */
const encryptP = exports.encryptP = (buffer, encKey) => (0, _asPromise2.default)(() => encrypt(buffer, encKey));

/**
 * decrypt a aes-256-cbc encrypted buffer
 * @param {Buffer} buffer - the buffer to encode
 * @param {String} encKey - the encription key, must be 32 characters (256 Bit) long
 * @returns {Promise} Promise resolving with the decrypted data as Buffer
 */
const decrypt = exports.decrypt = (buffer, encKey) => {
  const [iv, encrypted] = buffer.toString().split(':').map(d => Buffer.from(d, 'hex'));
  const deciper = (0, _crypto.createDecipheriv)(ENC_ALG, encKey, iv);
  return Buffer.concat([deciper.update(encrypted), deciper.final()]);
};

/**
 * decrypt a aes-256-cbc encrypted buffer - Promise
 * @param {Buffer} buffer - the buffer to encode
 * @param {String} encKey - the encription key, must be 32 characters (256 Bit) long
 * @returns {Promise} Promise resolving with the decrypted data as Buffer
 */
const decryptP = exports.decryptP = (buffer, encKey) => (0, _asPromise2.default)(() => decrypt(buffer, encKey));

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

exports.default = encKey => {
  if (!encKey) {
    throw new Error('encryption key is missing');
  }
  if (typeof encKey === 'string') {
    encKey = Buffer.from(encKey);
  }
  if (!Buffer.isBuffer(encKey)) {
    throw new Error('a Buffer or String is required');
  }
  if (encKey.length !== 32) {
    throw new Error(`invalid encryption key length (is: ${encKey.length} bytes, should be: 32 bytes)`);
  }
  return {
    decrypt: buffer => decrypt(buffer, encKey),
    decryptP: buffer => decryptP(buffer, encKey),
    encrypt: buffer => encrypt(buffer, encKey),
    encryptP: buffer => encryptP(buffer, encKey)
  };
};
//# sourceMappingURL=crypt.js.map