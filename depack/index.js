const _Koa = require('./depack')

class Koa extends _Koa {
  /**
   * Initialize a new `Application`.
   */
  constructor() {
    super()
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
 * @typedef {import('../types').Middleware} Middleware
 */