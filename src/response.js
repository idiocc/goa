import assert from 'assert'
import { extname } from 'path'
import statuses, { empty, redirect } from '../modules/statuses'
import only from '../modules/only'
import onFinish from '../modules/on-finished'
import destroy from '../modules/destroy'
import vary from '@goa/vary'
import { is } from '../modules/type-is'
import contentDisposition from '../modules/content-disposition'
import ensureErrorHandler from '../modules/error-inject'
import getType from '../modules/cache-content-type'
import isJSON from '../modules/koa-is-json'
import escape from '../modules/escape-html'

import Context from './Context' // eslint-disable-line
import Request from './Request' // eslint-disable-line

/**
 * The response object.
 * @implements {_goa.Response}
 */
export default class Response {
  constructor() {
    /** @type {?_goa.Application} */
    this.app = null
    /** @type {?Context} */
    this.ctx = null
    /** @type {?Request} */
    this.request = null
    /** @type {?http.IncomingMessage} */
    this.req = null
    /** @type {?http.ServerResponse} */
    this.res = null
    /** @type {?boolean} */
    this._explicitStatus = null
    /** @type {?} */
    this._body = undefined
  }
  /**
   * Return the request socket.
   */
  get socket() {
    return /** @type {net.Socket} */ (this.res.socket)
  }

  /**
   * Return response header.
   * @return {!Object<string, string>}
   */
  get header() {
    const { res } = this
    return typeof res.getHeaders === 'function'
      ? res.getHeaders()
      : res['_headers'] || {}  // Node < 7.7
  }

  /**
   * Return response header, alias as response.header
   * @return {Object}
   */
  get headers() {
    return this.header
  }

  /**
   * Get response status code.
   */
  get status() {
    return this.res.statusCode
  }

  /**
   * Set response status code.
   */
  set status(code) {
    if (this.headerSent) return

    assert(Number.isInteger(code), 'status code must be a number')
    assert(code >= 100 && code <= 999, `invalid status code: ${code}`)
    this._explicitStatus = true
    this.res.statusCode = code
    if (this.req.httpVersionMajor < 2) this.res.statusMessage = statuses[code]
    if (this.body && empty[code]) this.body = null
  }

  /**
   * Get response status message.
   */
  get message() {
    return this.res.statusMessage || statuses[this.status]
  }

  /**
   * Set response status message.
   * @param {String} msg
   */
  set message(msg) {
    this.res.statusMessage = msg
  }

  /**
   * Get response body.
   */
  get body() {
    return this._body
  }

  /**
   * Set response body.
   * @param {string|!Buffer|!Object|!stream.Stream} val
   */
  set body(val) {
    const original = this._body
    this._body = val

    // no content
    if (null == val) {
      if (!empty[this.status]) this.status = 204
      this.remove('Content-Type')
      this.remove('Content-Length')
      this.remove('Transfer-Encoding')
      return
    }

    // set the status
    if (!this._explicitStatus) this.status = 200

    // set the content-type only if not yet set
    const setType = !this.header['content-type']

    // string
    if ('string' == typeof val) {
      if (setType) this.type = /^\s*</.test(val) ? 'html' : 'text'
      this.length = Buffer.byteLength(val)
      return
    }

    // buffer
    if (Buffer.isBuffer(val)) {
      if (setType) this.type = 'bin'
      this.length = val.length
      return
    }

    // stream
    if ('function' == typeof val.pipe) {
      onFinish(this.res, destroy.bind(null, val))
      ensureErrorHandler(val, err => this.ctx.onerror(err))

      // overwriting
      if (null != original && original != val) this.remove('Content-Length')

      if (setType) this.type = 'bin'
      return
    }

    // json
    this.remove('Content-Length')
    this.type = 'json'
  }

  /**
   * Set Content-Length field to `n`.
   */
  set length(n) {
    this.set('Content-Length', n)
  }

  /**
   * Return parsed response Content-Length when present.
   */
  get length() {
    const len = this.header['content-length']
    const body = this.body

    if (null == len) {
      if (!body) return null
      if ('string' == typeof body) return Buffer.byteLength(body)
      if (Buffer.isBuffer(body)) return body.length
      if (isJSON(body)) return Buffer.byteLength(JSON.stringify(body))
      return null
    }

    return Math.trunc(len) || 0
  }

  /**
   * Check if a header has been written to the socket.
   */
  get headerSent() {
    return this.res.headersSent
  }

  /**
   * Vary on `field`.
   */
  vary(field) {
    if (this.headerSent) return

    vary(this.res, field)
  }

  /**
   * Perform a 302 redirect to `url`.
   * The string "back" is special-cased
   * to provide Referrer support, when Referrer
   * is not present `alt` or "/" is used.
   * Examples:
   *    this.redirect('back');
   *    this.redirect('back', '/index.html');
   *    this.redirect('/login');
   *    this.redirect('http://google.com');
   * @param {string} url
   * @param {string} [alt]
   */
  redirect(url, alt) {
    // location
    if ('back' == url) url = this.ctx.get('Referrer') || alt || '/' // todo
    this.set('Location', url)

    // status
    if (!redirect[this.status]) this.status = 302

    // html
    if (this.ctx.accepts('html')) { // todo
      url = escape(url)
      this.type = 'text/html; charset=utf-8'
      this.body = `Redirecting to <a href="${url}">${url}</a>.`
      return
    }

    // text
    this.type = 'text/plain; charset=utf-8'
    this.body = `Redirecting to ${url}.`
  }

  /**
   * Set Content-Disposition header to "attachment" with optional `filename`.
   * @param {string} filename
   */
  attachment(filename, options) {
    if (filename) this.type = extname(filename)
    this.set('Content-Disposition', contentDisposition(filename, options))
  }

  /**
   * Set Content-Type response header with `type` through `mime.lookup()`
   * when it does not contain a charset.
   * Examples:
   *     this.type = '.html';
   *     this.type = 'html';
   *     this.type = 'json';
   *     this.type = 'application/json';
   *     this.type = 'png';
   * @param {String} type
   */
  set type(type) {
    type = getType(type)
    if (type) {
      this.set('Content-Type', type)
    } else {
      this.remove('Content-Type')
    }
  }

  /**
   * Set the Last-Modified date using a string or a Date.
   *     this.response.lastModified = new Date();
   *     this.response.lastModified = '2013-09-13';
   * @param {String|Date} type
   */
  set lastModified(val) {
    if ('string' == typeof val) val = new Date(val)
    this.set('Last-Modified', val.toUTCString())
  }

  /**
   * Get the Last-Modified date in Date form, if it exists.
   */
  get lastModified() {
    const date = this.get('last-modified')
    if (date) return new Date(date)
    return null
  }

  /**
   * Set the ETag of a response.
   * This will normalize the quotes if necessary.
   *     this.response.etag = 'md5hashsum';
   *     this.response.etag = '"md5hashsum"';
   *     this.response.etag = 'W/"123456789"';
   * @param {String} etag
   */
  set etag(val) {
    if (!/^(W\/)?"/.test(val)) val = `"${val}"`
    this.set('ETag', val)
  }

  /**
   * Get the ETag of a response.
   */
  get etag() {
    return this.get('ETag')
  }

  /**
   * Return the response mime type void of
   * parameters such as "charset".
   */
  get type() {
    const type = this.get('Content-Type')
    if (!type) return ''
    return type.split(';', 1)[0]
  }

  /**
   * Check whether the response is one of the listed types.
   * Pretty much the same as `this.request.is()`.
   * @param {string|Array<string>} types
   * @param {...string} args
   * @return {string|false}
   */
  is(types, ...args) {
    const type = this.type
    if (!types) return type || false
    if (!Array.isArray(types)) types = [types, ...args]
    return is(type, types)
  }

  /**
   * Return response header.
   * Examples:
   *     this.get('Content-Type');
   *     // => "text/plain"
   *     this.get('content-type');
   *     // => "text/plain"
   * @param {string} field
   */
  get(field) {
    return this.header[field.toLowerCase()] || ''
  }

  /**
   * Set header `field` to `val`, or pass
   * an object of header fields.
   * Examples:
   *    this.set('Foo', ['bar', 'baz']);
   *    this.set('Accept', 'application/json');
   *    this.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' });
   * @param {String|Object|Array} field
   * @param {String} val
   */
  set(field, val) {
    if (this.headerSent) return

    if (2 == arguments.length) {
      if (Array.isArray(val)) val = val.map(v => typeof v === 'string' ? v : String(v))
      else if (typeof val !== 'string') val = String(val)
      this.res.setHeader(field, val)
    } else {
      for (const key in field) {
        this.set(key, field[key])
      }
    }
  }

  /**
   * Append additional header `field` with value `val`.
   * Examples:
```
this.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
this.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
this.append('Warning', '199 Miscellaneous warning');
```
   * @param {string} field
   * @param {!string|Array<string>} val
   */
  append(field, val) {
    const prev = this.get(field)

    if (prev) {
      val = Array.isArray(prev)
        ? prev.concat(val)
        : [prev].concat(val)
    }

    return this.set(field, val)
  }

  /**
   * Remove header `field`.
   * @param {string} field
   */
  remove(field) {
    if (this.headerSent) return

    this.res.removeHeader(field)
  }

  /**
   * Checks if the request is writable.
   * Tests for the existence of the socket
   * as node sometimes does not set it.
   * @private
   */
  get writable() {
    // can't write any more after response finished
    if (this.res.finished) return false

    const socket = /** @type {!net.Socket} */ (this.res.socket)
    // There are already pending outgoing res, but still writable
    // https://github.com/nodejs/node/blob/v4.4.7/lib/_http_server.js#L486
    if (!socket) return true
    return socket.writable
  }

  /**
   * Inspect implementation.
   * @return {Object}
   */
  inspect() {
    if (!this.res) return
    const o = this.toJSON()
    o.body = this.body
    return o
  }

  /**
   * Return JSON representation.
   * @return {!Object}
   */
  toJSON() {
    return only(this, [
      'status',
      'message',
      'header',
    ])
  }

  /**
   * Flush any set headers, and begin the body
   */
  flushHeaders() {
    this.res.flushHeaders()
  }
}

// /**
//  * Custom inspection implementation for newer Node.js versions.
////  * @return {Object}
//  */
// if (util.inspect.custom) {
//   module.exports[util.inspect.custom] = module.exports.inspect
// }

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types').Application} _goa.Application
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('http').IncomingMessage} http.IncomingMessage
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('http').ServerResponse} http.ServerResponse
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('net').Socket} net.Socket
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('stream').Stream} stream.Stream
 */