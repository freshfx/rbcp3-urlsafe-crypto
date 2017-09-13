'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inflateSync = exports.deflateSync = exports.inflate = exports.deflate = undefined;

var _zlib = require('zlib');

var _zlib2 = _interopRequireDefault(_zlib);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * inflate/deflate wrapper for zlib
 * @module lib/zlib
 */

/* promisify some functions */
const deflate = exports.deflate = (0, _util.promisify)(_zlib2.default.deflate);
const inflate = exports.inflate = (0, _util.promisify)(_zlib2.default.inflate);

const { deflateSync, inflateSync } = _zlib2.default;

exports.deflateSync = deflateSync;
exports.inflateSync = inflateSync;
exports.default = {
  deflate,
  deflateSync,
  inflate,
  inflateSync
};
//# sourceMappingURL=zlib.js.map