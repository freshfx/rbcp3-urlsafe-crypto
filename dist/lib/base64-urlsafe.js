'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeP = exports.decode = exports.encodeP = exports.encode = undefined;

var _asPromise = require('./as-promise');

var _asPromise2 = _interopRequireDefault(_asPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * url safe base64 encode/decode <a href="https://tools.ietf.org/html/rfc7515#appendix-C">RFC7515 Appendic-C</a>
 * @module lib/base64-urlsafe
 */

/**
 * url-safe base 64 encodes a buffer
 * @param {Buffer} buffer - the buffer to encode
 * @returns {String} the encoded string
 */
const encode = exports.encode = buffer => buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, ''); // eslint-disable-line no-div-regex


/**
 * url-safe base64 encode a buffer - Promise
 * @param {Buffer} buffer - the buffer to encode
 * @returns {Promise} Promise object with resolves the encoded string
 */
const encodeP = exports.encodeP = buffer => (0, _asPromise2.default)(() => encode(buffer));

/**
 * url-safe base64 decode a buffer
 * @param {String} string - the string to decode
 * @returns {Buffer} the decoded buffer
 */
const decode = exports.decode = string => Buffer.from((string + '==='.slice((string.length + 3) % 4)).replace(/\-/g, '+') // eslint-disable-line no-useless-escape
.replace(/_/g, '/'), 'base64');

/**
 * url-safe base64 decode a buffer - Promise
 * @param {String} string - the string to decode
 * @returns {Promise} Promise object with resolves the decoded buffer
 */
const decodeP = exports.decodeP = string => (0, _asPromise2.default)(() => decode(string));

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
exports.default = {
  decode,
  decodeP,
  encode,
  encodeP
};
//# sourceMappingURL=base64-urlsafe.js.map