import { format } from 'util'
import createError from 'http-errors'
import httpAssert from 'http-assert'
import delegate from 'delegates'
import statuses from 'statuses'
import Cookies from 'cookies'

import Request from './Request' // eslint-disable-line
import Response from './Response' // eslint-disable-line

const COOKIES = Symbol('context#cookies')

/**
 * Context prototype.
 */
export default class Context {
  constructor() {
    /** @type {?_goa.Application} */
    this.app = null
    /** @type {?Context} */
    this.context = null
    /** @type {?Request} */
    this.request = null
    /** @type {?Response} */
    this.response = null
    /** @type {?http.IncomingMessage} */
    this.req = null
    /** @type {?http.ServerResponse} */
    this.res = null
    /** @type {?string} */
    this.originalUrl = null
    /** @type {Object} */
    this.state = null
  }
  /**
   * util.inspect() implementation, which
   * just returns the JSON output.
   *
   * @return {Object}
   */
  inspect() {
    // if (this == proto) return this
    return this.toJSON()
  }

  /**
   * Return JSON representation.
   *
   * Here we explicitly invoke .toJSON() on each
   * object, as iteration will otherwise fail due
   * to the getters and cause utilities such as
   * clone() to fail.
   *
   * @return {Object}
   */
  toJSON() {
    return {
      request: this.request.toJSON(),
      response: this.response.toJSON(),
      app: this.app.toJSON(),
      originalUrl: this.originalUrl,
      req: '<original node req>',
      res: '<original node res>',
      socket: '<original node socket>',
    }
  }

  /**
   * Similar to .throw(), adds assertion.
   *
   *    this.assert(this.user, 401, 'Please login!');
   *
   * See: https://github.com/jshttp/http-assert
   *
   * @param {Mixed} test
   * @param {number} status
   * @param {string} message
   */
  get assert() {
    return httpAssert
  }

  /**
   * Throw an error with `status` (default 500) and
   * `msg`. Note that these are user-level
   * errors, and the message may be exposed to the client.
   *
   *    this.throw(403)
   *    this.throw(400, 'name required')
   *    this.throw('something exploded')
   *    this.throw(new Error('invalid'))
   *    this.throw(400, new Error('invalid'))
   *
   * See: https://github.com/jshttp/http-errors
   *
   * Note: `status` should only be passed as the first parameter.
   *
   * @param {string|number|!Error} err, msg or status
   * @param {string|number|!Error} [err, msg or status]
   * @param {!Object} [props]
   */
  throw(...args) {
    throw createError(...args)
  }

  /**
   * Default error handling.
   *
   * @param {Error} err
   * @api private
   */
  onerror(err) {
    // don't do anything if there is no error.
    // this allows you to pass `this.onerror`
    // to node-style callbacks.
    if (null == err) return

    if (!(err instanceof Error)) err = new Error(format('non-error thrown: %j', err))

    let headerSent = false
    if (this.headerSent || !this.writable) {
      headerSent = err.headerSent = true
    }

    // delegate
    this.app.emit('error', err, this)

    // nothing we can do here other
    // than delegate to the app-level
    // handler and log.
    if (headerSent) {
      return
    }

    const { res } = this

    // first unset all headers
    /* istanbul ignore else */
    if (typeof res.getHeaderNames === 'function') {
      res.getHeaderNames().forEach(name => res.removeHeader(name))
    } else {
      res._headers = {} // Node < 7.7
    }

    // then set those specified
    this.set(err.headers)

    // force text/plain
    this.type = 'text'

    // ENOENT support
    if ('ENOENT' == err.code) err.status = 404

    // default to 500
    if ('number' != typeof err.status || !statuses[err.status]) err.status = 500

    // respond
    const code = statuses[err.status]
    const msg = err.expose ? err.message : code
    this.status = err.status
    this.length = Buffer.byteLength(msg)
    res.end(msg)
  }

  get cookies() {
    if (!this[COOKIES]) {
      this[COOKIES] = new Cookies(this.req, this.res, {
        keys: this.app.keys,
        secure: this.request.secure,
      })
    }
    return this[COOKIES]
  }

  set cookies(_cookies) {
    this[COOKIES] = _cookies
  }
}

/**
 * Custom inspection implementation for newer Node.js versions.
 *
 * @return {Object}
 */
// /* istanbul ignore else */
// if (util.inspect.custom) {
//   module.exports[util.inspect.custom] = module.exports.inspect
// }

/**
 * Response delegation.
 */
delegate(Context.prototype, 'response')
  .method('attachment')
  .method('redirect')
  .method('remove')
  .method('vary')
  .method('set')
  .method('append')
  .method('flushHeaders')
  .access('status')
  .access('message')
  .access('body')
  .access('length')
  .access('type')
  .access('lastModified')
  .access('etag')
  .getter('headerSent')
  .getter('writable')

/**
 * Request delegation.
 */
delegate(Context.prototype, 'request')
  .method('acceptsLanguages')
  .method('acceptsEncodings')
  .method('acceptsCharsets')
  .method('accepts')
  .method('get')
  .method('is')
  .access('querystring')
  .access('idempotent')
  .access('socket')
  .access('search')
  .access('method')
  .access('query')
  .access('path')
  .access('url')
  .access('accept')
  .getter('origin')
  .getter('href')
  .getter('subdomains')
  .getter('protocol')
  .getter('host')
  .getter('hostname')
  .getter('URL')
  .getter('header')
  .getter('headers')
  .getter('secure')
  .getter('stale')
  .getter('fresh')
  .getter('ips')
  .getter('ip')

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