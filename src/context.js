import { format } from 'util'
import Cookies from '@goa/cookies'
import Accepts from '@goa/accepts' // eslint-disable-line

import createError from '../modules/http-errors'
import Delegate from '../modules/delegates'
import httpAssert from '../modules/http-assert'
import statuses from '../modules/statuses'
import { inspect } from 'util'

import Request from './request' // eslint-disable-line
import Response from './response' // eslint-disable-line

const COOKIES = Symbol('context#cookies')

/**
 * Context prototype.
 * @implements {_goa.Context}
 */
export default class Context {
  constructor() {
    // suppress types here so that can access
    // the properties without casting later
    /**
     * @suppress {checkTypes}
     * @type {?_goa.Application}
     */
    this.app = null
    /**
     * @suppress {checkTypes}
     * @type {Request}
     */
    this.request = null
    /**
     * @suppress {checkTypes}
     * @type {Response}
     */
    this.response = null
    /**
     * @suppress {checkTypes}
     * @type {?http.IncomingMessage}
     */
    this.req = null
    /**
     * @suppress {checkTypes}
     * @type {?http.ServerResponse}
     */
    this.res = null

    /**
     * @suppress {checkTypes}
     * @type {?string}
     */
    this.originalUrl = null
    /** @type {Object} */ this.state = null
    /** @type {_goa.Cookies} */ this[COOKIES] = null

    /**
     * Set to false to bypass Koa's response.
     * @type {boolean}
     */
    this.respond = true

    // REQUEST delegates
    // method
    /** @type {?} **/
    this.acceptsLanguages = undefined
    /** @type {?} **/
    this.acceptsEncodings = undefined
    /** @type {?} **/
    this.acceptsCharsets = undefined
    /** @type {?} **/
    this.accepts = undefined
    /** @type {?} **/
    this.get = undefined
    /** @type {?} **/
    this.is = undefined

    // access
    /** @type {?} **/
    this.querystring = undefined
    /** @type {?} **/
    this.idempotent = undefined
    /** @type {?} **/
    this.socket = undefined
    /** @type {?} **/
    this.search = undefined
    /** @type {?} **/
    this.method = undefined
    /** @type {?} **/
    this.query = undefined
    /** @type {?} **/
    this.path = undefined
    /** @type {?} **/
    this.url = undefined
    /** @type {_goa.Accepts} **/
    this.accept = null

    // getters
    /** @type {?} **/
    this.origin = undefined
    /** @type {?} **/
    this.href = undefined
    /** @type {?} **/
    this.subdomains = undefined
    /** @type {?} **/
    this.protocol = undefined
    /** @type {?} **/
    this.host = undefined
    /** @type {?} **/
    this.hostname = undefined
    /** @type {?} **/
    this.URL = undefined
    /** @type {?} **/
    this.header = undefined
    /** @type {?} **/
    this.headers = undefined
    /** @type {?} **/
    this.secure = undefined
    /** @type {?} **/
    this.stale = undefined
    /** @type {?} **/
    this.fresh = undefined
    /** @type {?} **/
    this.ips = undefined
    /** @type {?} **/
    this.ip = undefined

    // RESPONSE delegates
    // method
    /** @type {?} **/ this.attachment = undefined
    /** @type {?} **/ this.redirect = undefined
    /** @type {?} **/ this.remove = undefined
    /** @type {?} **/ this.vary = undefined
    /** @type {?} **/ this.set = undefined
    /** @type {?} **/ this.append = undefined
    /** @type {?} **/ this.flushHeaders = undefined
    // access
    /** @type {?} **/ this.status = undefined
    /** @type {?} **/ this.message = undefined
    /** @type {?} **/ this.body = undefined
    /** @type {?} **/ this.length = undefined
    /** @type {?} **/ this.type = undefined
    /** @type {?} **/ this.lastModified = undefined
    /** @type {?} **/ this.etag = undefined
    // getter
    /** @type {boolean} **/ this.headerSent = false
    /** @type {boolean} **/ this.writable = false
  }
  /**
   * util.inspect() implementation, which
   * just returns the JSON output.
   */
  inspect() {
    return this.toJSON()
  }

  /**
   * Return JSON representation.
   *
   * Here we explicitly invoke .toJSON() on each
   * object, as iteration will otherwise fail due
   * to the getters and cause utilities such as
   * clone() to fail.
   */
  toJSON() {
    return {
      'request': this.request.toJSON(),
      'response': this.response.toJSON(),
      'app': this.app.toJSON(),
      'originalUrl': this.originalUrl,
      'req': '<original node req>',
      'res': '<original node res>',
      'socket': '<original node socket>',
    }
  }

  /**
   * Similar to .throw(), adds assertion.
   *
   *    this.assert(this.user, 401, 'Please login!');
   *
   * See: https://github.com/jshttp/http-assert
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
   * @param {...(string|number|!Error)} args
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
      headerSent = err['headerSent'] = true
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
    if (typeof res.getHeaderNames == 'function') {
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
      this[COOKIES] = new Cookies(
        /** @type {!http.IncomingMessage} */ (this.req),
        /** @type {!http.ServerResponse} */ (this.res), {
          keys: this.app.keys, // change @goaCookies
          secure: this.request.secure,
        })
    }
    return this[COOKIES]
  }

  set cookies(_cookies) {
    this[COOKIES] = _cookies
  }
  /**
   * @suppress {checkTypes}
   */
  [inspect.custom]() {
    return this.inspect()
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
new Delegate(Context.prototype, 'response')
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
new Delegate(Context.prototype, 'request')
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
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@goa/accepts/types').Accepts} _goa.Accepts
 */