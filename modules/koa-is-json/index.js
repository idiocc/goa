/**
 * Check if `body` should be interpreted as json.
 */
export default function isJSON(body) {
  if (!body) return false
  if ('string' == typeof body) return false
  if ('function' == typeof body['pipe']) return false
  if (Buffer.isBuffer(body)) return false
  return true
}

/**
 * @license MIT
 * Jonathan Ong
 * https://npmjs.org/koa-is-json
 */
