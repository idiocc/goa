import Debug from '@idio/debug'
import isGeneratorFunction from '@goa/is-generator-function'
import { createServer } from 'http'
import Stream from 'stream'
import EventEmitter from 'events'
import { format } from 'util'
import Response from './response'
import Request from './request'
import Context from './context'
import only from '../modules/only'
import { empty } from '../modules/statuses'
import isJSON from '../modules/koa-is-json'
import onFinished from '../modules/on-finished'
import compose from '../modules/koa-compose'

const debug = Debug('@goa/koa:application')

/**
 * @implements {_goa.Application}
 */
export default class Application extends EventEmitter {
  /**
   * Initialize a new `Application`.
   */
  constructor() {
    super()

    this.proxy = false
    this.silent = false
    this.middleware = []
    this.subdomainOffset = 2
    this.env = process.env.NODE_ENV || 'development'
    this.context = Context.prototype
    this.request = Request.prototype
    this.response = Response.prototype

    this.keys = undefined
    // if (util.inspect.custom) {
    //   this[util.inspect.custom] = this.inspect
    // }
  }

  /**
   * Shorthand for:
   *
   *    http.createServer(app.callback()).listen(...)
   *
   */
  listen(...args) {
    debug('listen')
    const server = createServer(this.callback())
    return server.listen(...args)
  }

  /**
   * Return JSON representation.
   * We only bother showing settings.
   *
   * @return {Object}
   */
  toJSON() {
    return only(this, [
      'subdomainOffset',
      'proxy',
      'env',
    ])
  }

  /**
   * Inspect implementation.
   *
   * @return {Object}
   */
  inspect() {
    return this.toJSON()
  }

  /**
   * Use the given middleware `fn`.
   *
   * Old-style middleware will be converted.
   *
   * @param {!Function} fn
   */
  use(fn) {
    if (typeof fn != 'function')
      throw new TypeError('middleware must be a function!')
    if (isGeneratorFunction(fn)) {
      throw new Error(
        'Generator functions are not supported by @goa/koa. Use koa-convert on them first.')
    }
    debug('use %s', fn._name || fn.name || '-')
    this.middleware.push(fn)
    return this
  }

  /**
   * Return a request handler callback
   * for node's native http server.
   */
  callback() {
    const fn = compose(this.middleware)

    if (!this.listenerCount('error')) this.on('error', this.onerror)

    /** @type {function(!http.IncomingMessage, !http.ServerResponse): !Promise} */
    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res)
      return this.handleRequest(ctx, fn)
    }

    return handleRequest
  }

  /**
   * Handle request in callback.
   * @param {!Context} ctx
   * @private
   */
  async handleRequest(ctx, fnMiddleware) {
    const res = ctx.res
    res.statusCode = 404
    const onerror = err => ctx.onerror(err)
    onFinished(res, onerror)
    try {
      await fnMiddleware(ctx)
      return await respond(ctx)
    } catch (err) {
      onerror(err)
    }
  }

  /**
   * Initialize a new context.
   * @param {!http.IncomingMessage} req
   * @param {!http.ServerResponse} res
   * @private
   */
  createContext(req, res) {
    const context = /** @type {!Context} */
      (Object.create(this.context))
    const request = context.request = /** @type {!Request} */
      (Object.create(this.request))
    const response = context.response = /** @type {!Response} */
      (Object.create(this.response))
    context.app = request.app = response.app = this
    context.req = request.req = response.req = req
    context.res = request.res = response.res = res
    request.ctx = response.ctx = context
    request.response = response
    response.request = request
    context.originalUrl = request.originalUrl = req.url
    context.state = {}
    return context
  }

  /**
   * Default error handler.
   * @param {!Error} err
   * @private
   */
  onerror(err) {
    if (!(err instanceof Error))
      throw new TypeError(format('non-error thrown: %j', err))

    if (404 == err.status || err.expose) return
    if (this.silent) return

    const msg = err.stack || err.toString()
    console.error()
    console.error(msg.replace(/^/gm, '  '))
    console.error()
  }
}

/**
 * Response helper.
 * @param {Context} ctx
 */
function respond(ctx) {
  // allow bypassing koa
  if (false == ctx.respond) return

  if (!ctx.writable) return

  const res = ctx.res
  let body = ctx.body
  const code = ctx.status

  // ignore body
  if (empty[code]) {
    // strip headers
    ctx.body = null
    return res.end()
  }

  if ('HEAD' == ctx.method) {
    if (!res.headersSent && isJSON(body)) {
      ctx.length = Buffer.byteLength(JSON.stringify(body))
    }
    return res.end()
  }

  // status body
  if (null == body) {
    if (ctx.req.httpVersionMajor >= 2) {
      body = String(code)
    } else {
      body = ctx.message || String(code)
    }
    if (!res.headersSent) {
      ctx.type = 'text'
      ctx.length = Buffer.byteLength(body)
    }
    return res.end(body)
  }

  // responses
  if (Buffer.isBuffer(body)) return res.end(body)
  if ('string' == typeof body) return res.end(body)
  if (body instanceof Stream) return body.pipe(res)

  // body: json
  body = JSON.stringify(body)
  if (!res.headersSent) {
    ctx.length = Buffer.byteLength(body)
  }
  res.end(body)
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('http').Server} http.Server
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('http').IncomingMessage} http.IncomingMessage
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('http').ServerResponse} http.ServerResponse
 */