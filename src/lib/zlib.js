import zlib from 'zlib'
import {promisify} from 'util'

/**
 * inflate/deflate wrapper for zlib
 * @module lib/zlib
 */


/* promisify some functions */
export const deflate = promisify(zlib.deflate)
export const inflate = promisify(zlib.inflate)

export const {deflateSync, inflateSync} = zlib

export default {
  deflate,
  deflateSync,
  inflate,
  inflateSync
}
