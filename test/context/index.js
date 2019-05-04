import { Duplex, Readable, Writable } from 'stream'
import Koa from '../../src'

export const Context = (req, res, app) => {
  const socket = new Duplex()
  req = Object.assign({ headers: {}, socket }, Readable.prototype, req)
  res = Object.assign({ _headers: {}, socket }, Writable.prototype, res)
  req.socket.remoteAddress = req.socket.remoteAddress || '127.0.0.1'
  app = app || new Koa()
  res.getHeader = k => res._headers[k.toLowerCase()]
  res.setHeader = (k, v) => res._headers[k.toLowerCase()] = v
  res.removeHeader = (k) => delete res._headers[k.toLowerCase()]
  return app.createContext(req, res)
}

export const request = (req, res, app) => {
  const c = Context(req, res, app)
  return c.request
}

export const response = (req, res, app) => {
  const c = Context(req, res, app)
  return c.response
}