import asPromise from './as-promise'

/**
 * stringify/parse wrapper for JSON
 * @module lib/json
 */


/**
 * simple wrapper for JSON.stringify
 * @param {*} data - data to stringify
 * @return {String} stringified data
 */
export const stringify = data => JSON.stringify(data)

/**
 * stringify - Promise version
 * @param {*} data - data to stringify
 * @return {Promise} Promise which resolves the stringified data
 */
export const stringifyP = data => asPromise(() => stringify(data))

/**
 * simple wrapper for JSON.parse
 * @param {String} data - the data to parse
 * @return {Object} the parsed object
 */
export const parse = data => JSON.parse(data)

/**
 * parse - Promise version
 * @param {String} data - the data to parse
 * @return {Object} the parsed object
 */
export const parseP = data => asPromise(() => parse(data))


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
export default {
  parse,
  parseP,
  stringify,
  stringifyP
}
