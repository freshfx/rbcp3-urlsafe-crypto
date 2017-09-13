"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * wraps a given function in a Promise
 * @module lib/as-promise
 */

/**
 * returns a Promise which executes the given function
 * @param {Function} func - the function to execude
 * @returns {Promise} Promise object executes the given function and resolves the result
 */
exports.default = func => new Promise((resolve, reject) => {
  try {
    return resolve(func());
  } catch (e) {
    return reject(e);
  }
});
//# sourceMappingURL=as-promise.js.map