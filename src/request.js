import { URL, format as stringify } from 'url'
import { isIP } from 'net'
import Accepts from '@goa/accepts'
import { parse as qsParse, stringify as qsStringify } from 'querystring'
import typeis from '../modules/type-is'
import { parse as parseContentType } from '../modules/content-type'
import parse from '../modules/parseurl'
import fresh from '../modules/fresh'

import { inspect } from 'util'

import Context from './context' // eslint-disable-line
import Response from './response' // eslint-disable-line

const IP = Symbol('context#ip')

/**
 * @implements {_goa.Request}
 */
export default class Request {
  constructor() {
    /** @type {?_goa.Application} */
    this.app = null
    /** @type {?Context} */
    this.ctx = null
    /** @type {?Response} */
    this.response = null
    /** @type {http.IncomingMessage} */
    this.req = null
    /** @type {http.ServerResponse} */
    this.res = null
    /** @type {string} */
    this.originalUrl = ''
    /** @type {Object} */
    this._querycache = {}
    /** @type {URL|Object} */
    this.memoizedURL = null
    /** @type {?string} */
    this.IP = null
    /** @type {_goa.Accepts} */
    this._accept = null
  }
  /**
   * Return request header.
   */
  get header() {
    return this.req.headers
  }

  /**
   * Set request header.
   */
  set header(val) {
    this.req.headers = val
  }

  /**
   * Return request header, alias as request.header
   */
  get headers() {
    return this.req.headers
  }

  /**
   * Set request header, alias as request.header
   */
  set headers(val) {
    this.req.headers = val
  }

  /**
   * Get request URL.
   */
  get url() {
    return this.req.url
  }

  /**
   * Set request URL.
   */
  set url(val) {
    this.req.url = val
  }

  /**
   * Get origin of URL.
   * @return {string}
   */
  get origin() {
    return `${this.protocol}://${this.host}`
  }

  /**
   * Get full request URL.
   */
  get href() {
    // support: `GET http://example.com/foo`
    if (/^https?:\/\//i.test(this.originalUrl)) return this.originalUrl
    return this.origin + this.originalUrl
  }

  /**
   * Get request method.
   */
  get method() {
    return this.req.method
  }

  /**
   * Set request method.
   */
  set method(val) {
    this.req.method = val
  }

  /**
   * Get request pathname.
   */
  get path() {
    return parse(/** @type {!http.IncomingMessage} */ (this.req)).pathname
  }

  /**
   * Set pathname, retaining the query-string when present.
   */
  set path(path) {
    const url = parse(/** @type {!http.IncomingMessage} */ (this.req))
    if (url.pathname === path) return

    url.pathname = path
    url.path = null

    this.url = stringify(url)
  }

  /**
   * Get parsed query-string.
   * @return {Object}
   */
  get query() {
    const str = this.querystring
    const c = this._querycache = this._querycache || {}
    return c[str] || (c[str] = qsParse(str))
  }

  /**
   * Set query-string as an object.
   */
  set query(obj) {
    this.querystring = qsStringify(obj)
  }

  /**
   * Get query string.
   */
  get querystring() {
    if (!this.req) return ''
    return parse(/** @type {!http.IncomingMessage} */ (this.req)).query || ''
  }

  /**
   * Set querystring.
   */
  set querystring(str) {
    const url = parse(/** @type {!http.IncomingMessage} */ (this.req))
    if (url.search === `?${str}`) return

    url.search = str
    url.path = null

    this.url = stringify(url)
  }

  /**
   * Get the search string. Same as the querystring
   * except it includes the leading ?.
   */
  get search() {
    if (!this.querystring) return ''
    return `?${this.querystring}`
  }

  /**
   * Set the search string. Same as
   * request.querystring= but included for ubiquity.
   */
  set search(str) {
    this.querystring = str
  }

  /**
   * Parse the "Host" header field host
   * and support X-Forwarded-Host when a
   * proxy is enabled. Returns hostname:port
   */
  get host() {
    const { proxy } = this.app
    let host = proxy && this.get('X-Forwarded-Host')
    if (!host) {
      if (this.req.httpVersionMajor >= 2) host = this.get(':authority')
      if (!host) host = this.get('Host')
    }
    if (!host) return ''
    return host.split(/\s*,\s*/, 1)[0]
  }

  /**
   * Parse the "Host" header field hostname
   * and support X-Forwarded-Host when a
   * proxy is enabled.
   */
  get hostname() {
    const host = this.host
    if (!host) return ''
    if ('[' == host[0]) return this.URL.hostname || '' // IPv6
    return host.split(':', 1)[0]
  }

  /**
   * Get WHATWG parsed URL.
   * Lazily memoized.
   */
  get URL() {
    if (!this.memoizedURL) {
      const protocol = this.protocol
      const host = this.host
      const originalUrl = this.originalUrl || '' // avoid undefined in template string
      try {
        this.memoizedURL = new URL(`${protocol}://${host}${originalUrl}`)
      } catch (err) {
        this.memoizedURL = Object.create(null)
      }
    }
    return this.memoizedURL
  }

  /**
   * Check if the request is fresh, aka
   * Last-Modified and/or the ETag
   * still match.
   */
  get fresh() {
    const method = this.method
    const s = this.ctx.status // todo

    // GET or HEAD for weak freshness validation only
    if ('GET' != method && 'HEAD' != method) return false

    // 2xx or 304 as per rfc2616 14.26
    if ((s >= 200 && s < 300) || 304 == s) {
      return fresh(this.header, this.response.header)
    }

    return false
  }

  /**
   * Check if the request is stale, aka
   * "Last-Modified" and / or the "ETag" for the
   * resource has changed.
   */
  get stale() {
    return !this.fresh
  }

  /**
   * Check if the request is idempotent.
   */
  get idempotent() {
    const methods = ['GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS', 'TRACE']
    return methods.includes(this.method)
  }

  /**
   * Return the request socket.
   */
  get socket() {
    return this.req.socket
  }

  /**
   * Get the charset when present or undefined.
   */
  get charset() {
    try {
      const { parameters } = parseContentType(/** @type {!http.IncomingMessage} */ (this.req))
      return parameters.charset || ''
    } catch (e) {
      return ''
    }
  }

  /**
   * Return parsed Content-Length when present.
   */
  get length() {
    const len = this.get('Content-Length')
    if (len == '') return null
    return ~~len
  }

  /**
   * Return the protocol string "http" or "https"
   * when requested with TLS. When the proxy setting
   * is enabled the "X-Forwarded-Proto" header
   * field will be trusted. If you're running behind
   * a reverse proxy that supplies https for you this
   * may be enabled.
   */
  get protocol() {
    /** missing encrypted in externs
     * @suppress {checkTypes} */
    const encrypted = this.socket['encrypted']
    if (encrypted) return 'https'
    if (!this.app.proxy) return 'http'
    const proto = this.get('X-Forwarded-Proto')
    return proto ? proto.split(/\s*,\s*/, 1)[0] : 'http'
  }

  /**
   * Short-hand for:
   *    this.protocol == 'https'
   */
  get secure() {
    return 'https' == this.protocol
  }

  /**
   * When `app.proxy` is `true`, parse
   * the "X-Forwarded-For" ip address list.
   * For example if the value were "client, proxy1, proxy2"
   * you would receive the array `["client", "proxy1", "proxy2"]`
   * where "proxy2" is the furthest down-stream.
   */
  get ips() {
    const { proxy } = this.app
    const val = this.get('X-Forwarded-For')
    return proxy && val
      ? val.split(/\s*,\s*/)
      : []
  }

  /**
   * Return request's remote address
   * When `app.proxy` is `true`, parse
   * the "X-Forwarded-For" ip address list and return the first one
   */
  get ip() {
    if (!this[IP]) {
      this[IP] = this.ips[0] || this.socket.remoteAddress || ''
    }
    return this[IP]
  }

  set ip(_ip) {
    this[IP] = _ip
  }

  /**
   * Return subdomains as an array.
   * Subdomains are the dot-separated parts of the host before the main domain
   * of the app. By default, the domain of the app is assumed to be the last two
   * parts of the host. This can be changed by setting `app.subdomainOffset`.
   * For example, if the domain is "tobi.ferrets.example.com":
   * If `app.subdomainOffset` is not set, this.subdomains is
   * `["ferrets", "tobi"]`.
   * If `app.subdomainOffset` is 3, this.subdomains is `["tobi"]`.
   */
  get subdomains() {
    const offset = this.app.subdomainOffset
    const hostname = this.hostname
    if (isIP(hostname)) return []
    return hostname
      .split('.')
      .reverse()
      .slice(offset)
  }

  /**
   * Get accept object. Lazily memoized.
   * @private
   */
  get accept() {
    return this._accept || (this._accept = new Accepts(/** @type {!http.IncomingMessage} */ (this.req)))
  }

  /**
   * Set accept object.
   * @private
   */
  set accept(obj) {
    this._accept = obj
  }

  /**
   * Check if the given `type(s)` is acceptable, returning
   * the best match when true, otherwise `false`, in which
   * case you should respond with 406 "Not Acceptable".
   * The `type` value may be a single mime type string
   * such as "application/json", the extension name
   * such as "json" or an array `["json", "html", "text/plain"]`. When a list
   * or array is given the _best_ match, if any is returned.
   * Examples:
   *
   *     // Accept: text/html
   *     this.accepts('html');
   *     // => "html"
   *     // Accept: text/*, application/json
   *     this.accepts('html');
   *     // => "html"
   *     this.accepts('text/html');
   *     // => "text/html"
   *     this.accepts('json', 'text');
   *     // => "json"
   *     this.accepts('application/json');
   *     // => "application/json"
   *     // Accept: text/*, application/json
   *     this.accepts('image/png');
   *     this.accepts('png');
   *     // => false
   *     // Accept: text/*;q=.5, application/json
   *     this.accepts(['html', 'json']);
   *     this.accepts('html', 'json');
   *     // => "json"
   * @param {!Array<string>|string} type
   * @param {...string} args
   */
  accepts(type, ...args) {
    return this.accept.types(type, ...args)
  }

  /**
   * Return accepted encodings or best fit based on `encodings`.
   * Given `Accept-Encoding: gzip, deflate`
   * an array sorted by quality is returned:
   *
   *     ['gzip', 'deflate']
   * @param {!Array<string>|string} [encoding]
   * @param {...string} args
   */
  acceptsEncodings(encoding, ...args) {
    return this.accept.encodings(encoding, ...args)
  }

  /**
   * Return accepted charsets or best fit based on `charsets`.
   * Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5`
   * an array sorted by quality is returned:
   *
   *     ['utf-8', 'utf-7', 'iso-8859-1']
   * @param {!Array<string>|string} [charset]
   * @param {...string} args
   */
  acceptsCharsets(charset, ...args) {
    return this.accept.charsets(charset, ...args)
  }

  /**
   * Return accepted languages or best fit based on `langs`.
   * Given `Accept-Language: en;q=0.8, es, pt`
   * an array sorted by quality is returned:
   *
   *     ['es', 'pt', 'en']
   * @param {!Array<string>|string} [lang]
   * @param {...string} args
   */
  acceptsLanguages(lang, ...args) {
    return this.accept.languages(lang, ...args)
  }

  /**
   * Check if the incoming request contains the "Content-Type"
   * header field, and it contains any of the give mime `type`s.
   * If there is no request body, `null` is returned.
   * If there is no content type, `false` is returned.
   * Otherwise, it returns the first `type` that matches.
   * Examples:
   *
   *     // With Content-Type: text/html; charset=utf-8
   *     this.is('html'); // => 'html'
   *     this.is('text/html'); // => 'text/html'
   *     this.is('text/*', 'application/json'); // => 'text/html'
   *     // When Content-Type is application/json
   *     this.is('json', 'urlencoded'); // => 'json'
   *     this.is('application/json'); // => 'application/json'
   *     this.is('html', 'application/*'); // => 'application/json'
   *     this.is('html'); // => false
   * @param {string|!Array<string>} types
   * @param {...string} args
   */
  is(types, ...args) {
    if (!types) return typeis(/** @type {!http.IncomingMessage} */ (this.req))
    if (!Array.isArray(types)) types = [types, ...args]
    return typeis(/** @type {!http.IncomingMessage} */ (this.req), types)
  }

  /**
   * Return the request mime type void of
   * parameters such as "charset".
   */
  get type() {
    const type = this.get('Content-Type')
    if (!type) return ''
    return type.split(';')[0]
  }

  /**
   * Return request header.
   * The `Referrer` header field is special-cased,
   * both `Referrer` and `Referer` are interchangeable.
   * Examples:
   *     this.get('Content-Type');
   *     // => "text/plain"
   *     this.get('content-type');
   *     // => "text/plain"
   *     this.get('Something');
   *     // => ''
   * @param {string} field
   * @returns {string}
   */
  get(field) {
    const req = this.req
    switch (field = field.toLowerCase()) {
    case 'referer':
    case 'referrer':
      return req.headers.referrer || req.headers.referer || ''
    default: {
      /** @suppress {checkTypes} */
      const h = req.headers[field]
      return h || ''
    }
    }
  }

  /**
   * Inspect implementation.
   */
  inspect() {
    if (!this.req) return
    return this.toJSON()
  }

  /**
   * Return JSON representation.
   */
  toJSON() {
    return {
      'method': this.method,
      'url': this.url,
      'header': this.header,
    }
  }

  get [inspect.custom]() {
    return this.inspect
  }
}

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
