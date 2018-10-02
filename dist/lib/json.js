'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseP = exports.parse = exports.stringifyP = exports.stringify = undefined;

var _asPromise = require('./as-promise');

var _asPromise2 = _interopRequireDefault(_asPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * stringify/parse wrapper for JSON
 * @module lib/json
 */

/**
 * simple wrapper for JSON.stringify
 * @param {*} data - data to stringify
 * @return {String} stringified data
 */
const stringify = exports.stringify = data => JSON.stringify(data);

/**
 * stringify - Promise version
 * @param {*} data - data to stringify
 * @return {Promise} Promise which resolves the stringified data
 */
const stringifyP = exports.stringifyP = data => (0, _asPromise2.default)(() => stringify(data));

/**
 * simple wrapper for JSON.parse
 * @param {String} data - the data to parse
 * @return {Object} the parsed object
 */
const parse = exports.parse = data => JSON.parse(data);

/**
 * parse - Promise version
 * @param {String} data - the data to parse
 * @return {Object} the parsed object
 */
const parseP = exports.parseP = data => (0, _asPromise2.default)(() => parse(data));

/**
 * @typedef {Object} json
 * @property {Function} stringify
 * @property {Function} stringifyP
 * @property {Function} parse
 * @property {Function} parseP
 */

/**
 * exports all functions as default
 * @return {json} json
 */
exports.default = {
  parse,
  parseP,
  stringify,
  stringifyP
};
//# sourceMappingURL=json.js.map