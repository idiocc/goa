const _Koa = require('./depack')

class Koa extends _Koa {
  /**
   * Initialize a new `Application`.
   */
  constructor() {
    super()

    /** When true proxy header fields will be trusted. Default `false`. */
    this.proxy = false
    /** Don't print errors to stdout. Default `false`. */
    this.silent = false
    this.middleware = []
    this.subdomainOffset = 2
    this.env = process.env.NODE_ENV || 'development'

    /**
     * The array with keys for signing secure cookies, or the Keygrip instance.
     * @type {Array<string>|Keygrip}
     * @see https://github.com/idiocc/cookies#class-keygrip
     */
    this.keys = undefined
  }
  /**
   * Shorthand for:
   *
   *    http.createServer(app.callback()).listen(...)
   * @return {http.Server}
   */
  listen(...args) {
    return super.listen(...args)
  }
  /**
   * Return JSON representation.
   * @returns {{ subdomainOffset?: number, proxy?: boolean, env: string }}
   */
  toJSON() {
    return super.toJSON()
  }
  /**
   * Inspect implementation.
   */
  inspect() {
    return this.toJSON()
  }
  /**
   * Use the given middleware `fn`.
   *
   * Old-style middleware will be converted.
   *
   * @param {Middleware} fn
   */
  use(fn) {
    return super.use(fn)
  }
  /**
   * Return a request handler callback
   * for node's native http server.
   * @returns {function(!http.IncomingMessage, !http.ServerResponse): !Promise}
   */
  callback() {
    return super.callback()
  }
}

module.exports = Koa

/**
 * @typedef {import('http').Server} http.Server
 * @typedef {import('http').IncomingMessage} http.IncomingMessage
 * @typedef {import('http').ServerResponse} http.ServerResponse
 *
 * @typedef {import('../types/vendor/cookies').Keygrip} Keygrip
 * @typedef {import('../types/typedefs/application').Middleware} Middleware
 * @typedef {import('../types/typedefs/application').Application} Application
 * @typedef {import('../types/typedefs/context').KoaContext} Context
 * @typedef {import('../types/typedefs/request').Request} Request
 * @typedef {import('../types/typedefs/request').ContextDelegatedRequest} ContextDelegatedRequest
 * @typedef {import('../types/typedefs/response').Response} Response
 * @typedef {import('../types/typedefs/response').ContextDelegatedResponse} ContextDelegatedResponse
 */