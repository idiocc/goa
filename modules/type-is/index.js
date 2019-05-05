import { parse, format } from './media-typer'
import { lookup } from '@goa/accepts/src/mime-types'
import http from 'http' // eslint-disable-line

export { typeis as is }
export { hasbody as hasBody }
export { mimeMatch as match }

/**
 * Compare a `value` content-type with `types`.
 * Each `type` can be an extension like `html`,
 * a special shortcut like `multipart` or `urlencoded`,
 * or a mime type.
 *
 * If no types match, `false` is returned.
 * Otherwise, the first `type` that matches is returned.
 *
 * @param {string} value
 * @param {!Array<string>|string} types
 * @param {...string} args
 */
function typeis(value, types, ...args) {
  let i
  // remove parameters and normalize
  const val = tryNormalizeType(value)

  // no type or invalid
  if (!val) {
    return false
  }

  // support flattened arguments
  if (types && !Array.isArray(types)) {
    types = [types, ...args]
  }

  // no types, return the content type
  if (!types || !types.length) {
    return val
  }

  let type
  for (i = 0; i < types.length; i++) {
    if (mimeMatch(normalize(type = types[i]), val)) {
      return type[0] == '+' || type.indexOf('*') !== -1
        ? val
        : type
    }
  }

  // no matches
  return false
}

/**
 * Check if a request has a request body.
 * A request with a body __must__ either have `transfer-encoding`
 * or `content-length` headers set.
 * http://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.3
 *
 * @param {http.IncomingMessage} req
 */
function hasbody(req) {
  const headers = /** @type {Object} */ (req.headers)
  return headers['transfer-encoding'] !== undefined ||
    !isNaN(headers['content-length'])
}

/**
 * Check if the incoming request contains the "Content-Type"
 * header field, and it contains any of the give mime `type`s.
 * If there is no request body, `null` is returned.
 * If there is no content type, `false` is returned.
 * Otherwise, it returns the first `type` that matches.
 *
 * Examples:
 *
 *     // With Content-Type: text/html; charset=utf-8
 *     this.is('html'); // => 'html'
 *     this.is('text/html'); // => 'text/html'
 *     this.is('text/*', 'application/json'); // => 'text/html'
 *
 *     // When Content-Type is application/json
 *     this.is('json', 'urlencoded'); // => 'json'
 *     this.is('application/json'); // => 'application/json'
 *     this.is('html', 'application/*'); // => 'application/json'
 *
 *     this.is('html'); // => false
 *
 * @param {http.IncomingMessage} req
 * @param {string|!Array<string>} types
 * @param {...string} args
 */
export default function typeofrequest(req, types, ...args) {
  // no body
  if (!hasbody(req)) {
    return null
  }

  // support flattened arguments
  if (arguments.length > 2) {
    types = [types, ...args]
  }

  // request content type
  const headers = /** @type {Object} */ (req.headers)
  const value = headers['content-type']

  return typeis(value, types)
}

/**
 * Normalize a mime type.
 * If it's a shorthand, expand it to a valid mime type.
 *
 * In general, you probably want:
 *
 *   var type = is(req, ['urlencoded', 'json', 'multipart']);
 *
 * Then use the appropriate body parsers.
 * These three are the most common request body types
 * and are thus ensured to work.
 *
 * @param {string} type
 * @private
 */
function normalize(type) {
  if (typeof type != 'string') {
    // invalid type
    return false
  }

  switch (type) {
  case 'urlencoded':
    return 'application/x-www-form-urlencoded'
  case 'multipart':
    return 'multipart/*'
  }

  if (type[0] == '+') {
    // "+json" -> "*/*+json" expando
    return '*/*' + type
  }

  return type.indexOf('/') == -1
    ? lookup(type)
    : type
}

/**
 * Check if `expected` mime type
 * matches `actual` mime type with
 * wildcard and +suffix support.
 *
 * @param {string|boolean} expected
 * @param {string} actual
 * @private
 */
function mimeMatch(expected, actual) {
  // invalid type
  if (expected === false) {
    return false
  }

  // split types
  var actualParts = actual.split('/')
  var expectedParts = expected.split('/')

  // invalid format
  if (actualParts.length != 2 || expectedParts.length != 2) {
    return false
  }

  // validate type
  if (expectedParts[0] != '*' && expectedParts[0] != actualParts[0]) {
    return false
  }

  // validate suffix wildcard
  if (expectedParts[1].substr(0, 2) == '*+') {
    return expectedParts[1].length <= actualParts[1].length + 1 &&
      expectedParts[1].substr(1) == actualParts[1].substr(1 - expectedParts[1].length)
  }

  // validate subtype
  if (expectedParts[1] != '*' && expectedParts[1] != actualParts[1]) {
    return false
  }

  return true
}

/**
 * Normalize a type and remove parameters.
 * @param {string} value
 * @private
 */
function normalizeType(value) {
  // parse the type
  const type = parse(value)

  // reformat it
  return format(type)
}

/**
 * Try to normalize a type and remove parameters.
 * @param {string} value
 * @private
 */
function tryNormalizeType(value) {
  if (!value) {
    return null
  }

  try {
    return normalizeType(value)
  } catch (err) {
    return null
  }
}

/**
 * @license MIT
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * https://npmjs.org/type-is
 */

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('http').IncomingMessage} http.IncomingMessage
 */