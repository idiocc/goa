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
   *
   * @return {http.Server}
   */
  listen(...args) {
    return super.listen(...args)
  }
}

console.log('testing depack')

module.exports = Koa

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('http').Server} http.Server
 */