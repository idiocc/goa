import { equal } from 'assert'
import Cookies from '@contexts/http/cookies'
import { Duplex, Readable, Writable } from 'stream'
import { join } from 'path'
import Koa from '../../src'
import { createReadStream, readFileSync } from 'fs'

export class ConsoleMock {
  _init() {
    this.calls = []
    this.original = console.error
    console.error = (...args) => {
      this.calls.push(args)
    }
  }
  _destroy() {
    console.error = this.original
  }
}

export default class Context extends Cookies {
  /**
   * @param {http.IncomingMessage} [req]
   * @param {http.ServerResponse} [res]
   * @param {Koa} [app]
   */
  makeContext(req, res, app) {
    const socket = new Duplex()
    req = Object.assign({ headers: {}, socket }, Readable.prototype, req)
    res = Object.assign({ _headers: {}, socket }, Writable.prototype, res)
    req.socket.remoteAddress = req.socket.remoteAddress || '127.0.0.1'
    app = app || new Koa()
    res.getHeader = k => res._headers[k.toLowerCase()]
    res.getHeaders = () => res._headers
    res.setHeader = (k, v) => res._headers[k.toLowerCase()] = v
    res.removeHeader = (k) => delete res._headers[k.toLowerCase()]
    return app.createContext(req, res)
  }
  get context() {
    return this.makeContext
  }
  get ctx() {
    return this.makeContext()
  }
  /**
   * @param {http.IncomingMessage} req
   * @param {http.ServerResponse} res
   * @param {Koa} [app]
   */
  makeRequest(req, res, app) {
    const c = this.makeContext(req, res, app)
    return c.request
  }
  get request() {
    return this.makeRequest
  }
  get Response() {
    return this.makeResponse
  }
  get req() {
    return this.makeRequest()
  }
  get res() {
    return this.makeResponse()
  }
  /**
   * @param {http.IncomingMessage} req
   * @param {http.ServerResponse} res
   * @param {Koa} [app]
   */
  makeResponse(req, res, app) {
    const c = this.makeContext(req, res, app)
    return c.response
  }
  get app() {
    const app = new Koa()
    this._app = app
    return app
  }
  get app1() {
    const app1 = new Koa()
    app1.context.msg = 'hello'
    app1.request.message = 'hello'
    app1.response.msg = 'hello'
    return app1
  }
  async expectError(obj) {
    await new Promise((r, j) => {
      this._app.on('error', err => {
        try {
          if (typeof obj == 'object') {
            Object.keys(obj).forEach((k) => {
              const expected = obj[k]
              const actual = err[k]
              equal(actual, expected, `Error key ${k} with value (${actual}) did not match ${expected}`)
            })
          } else equal(err, obj)
          r()
        } catch (e) {
          j(e)
        }
      })
    })
  }
  get stream() {
    return createReadStream(join(__dirname, '../fixture/package.json'))
  }
  get pkg() {
    return require('../fixture/package')
  }
  readFileSync() {
    return readFileSync(join(__dirname, '../fixture/package.json'))
  }
  /**
   * Starts the app for testing.
   */
  startApp() {
    return this.startPlain(this._app.callback())
  }
  escape(html){
    return `${html}`
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  }
  sleep(time){
    return new Promise(resolve => setTimeout(resolve, time))
  }
}

/**
 * @typedef {import('http').IncomingMessage} http.IncomingMessage
 * @typedef {import('http').ServerResponse} http.ServerResponse
 */


/**
 * @typedef {Object<string, Test&TestSuite4>} TestSuite
 * @typedef {Object<string, Test&TestSuite3>} TestSuite4
 * @typedef {Object<string, Test&TestSuite2>} TestSuite3
 * @typedef {Object<string, Test&TestSuite1>} TestSuite2
 * @typedef {Object<string, Test>} TestSuite1
 * @typedef {(c:Context, m: ConsoleMock)} Test
 */