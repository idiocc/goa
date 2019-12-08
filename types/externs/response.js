/**
 * @fileoverview
 * @externs
 */
/* typal types/Response.xml externs skipNsDecl */
/**
 * The response API available via Context.
 * @interface
 */
_goa.ContextDelegatedResponse
/**
 * Get/set response status code.
 * @type {number}
 */
_goa.ContextDelegatedResponse.prototype.status
/**
 * Get/set response status message.
 * @type {string}
 */
_goa.ContextDelegatedResponse.prototype.message
/**
 * Get/set response body.
 * @type {string|!Buffer|Object|!stream.Stream}
 */
_goa.ContextDelegatedResponse.prototype.body
/**
 * Return parsed response `Content-Length` when present. Set `Content-Length` field to `n`.
 * @type {?number}
 */
_goa.ContextDelegatedResponse.prototype.length
/**
 * Return the response mime type void of parameters such as "charset". Set Content-Type response header with `type` through `mime.lookup()` when it does not contain a charset.
 *
 * _Examples_:
 *
 * ```js
 * this.type = '.html'
 * this.type = 'html'
 * this.type = 'json'
 * this.type = 'application/json'
 * this.type = 'png'
 * ```
 * @type {string}
 */
_goa.ContextDelegatedResponse.prototype.type
/**
 * Checks if the request is writable. Tests for the existence of the socket as _Node.JS_ sometimes does not set it.
 * @type {boolean}
 */
_goa.ContextDelegatedResponse.prototype.writable
/**
 * Get the Last-Modified date in Date form, if it exists. Set the Last-Modified date using a string or a Date.
 *
 * _Examples_:
 *
 * ```js
 * this.response.lastModified = new Date()
 * this.response.lastModified = '2013-09-13'
 * ```
 * @type {string|Date}
 */
_goa.ContextDelegatedResponse.prototype.lastModified
/**
 * Check if a header has been written to the socket.
 * @type {boolean}
 */
_goa.ContextDelegatedResponse.prototype.headerSent
/**
 * Get/Set the ETag of a response. This will normalize the quotes if necessary.
 *
 * _Examples_:
 *
 * ```js
 * this.response.etag = 'md5hashsum'
 * this.response.etag = '"md5hashsum"'
 * this.response.etag = 'W/"123456789"'
 * ```
 * @type {string}
 */
_goa.ContextDelegatedResponse.prototype.etag
/**
 * Set Content-Disposition header to "attachment" with optional `filename`.
 * @param {string} filename The filename.
 * @param {!_goa.ContentDisposition} options Options.
 */
_goa.ContextDelegatedResponse.prototype.attachment = function(filename, options) {}
/**
 * Perform a 302 redirect to `url`. The string "back" is special-cased to provide Referrer support, when Referrer is not present `alt` or "/" is used.
 *
 * _Examples_:
 *
 * ```js
 * this.redirect('back')
 * this.redirect('back', '/index.html')
 * this.redirect('/login')
 * this.redirect('http://google.com')
 * ```
 * @param {string} url The URL to redirect to.
 * @param {string=} [referrer] The referrer to set when redirecting.
 */
_goa.ContextDelegatedResponse.prototype.redirect = function(url, referrer) {}
/**
 * Remove header `field`.
 * @param {string} field The name of the header to remove.
 */
_goa.ContextDelegatedResponse.prototype.remove = function(field) {}
/**
 * Set header `field` to `val`, or pass an object of header fields.
 *
 * _Examples_:
 *
 * ```js
 * this.set('Foo', ['bar', 'baz'])
 * this.set('Accept', 'application/json')
 * this.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' })
 * ```
 * @param {(string|!Object)} field The field to set, or an object of header fields.
 * @param {(string|!Array|number)=} [val] The value to set, when passing a single field.
 */
_goa.ContextDelegatedResponse.prototype.set = function(field, val) {}
/**
 * Vary on `field`.
 * @param {string} field The name of the header to vary on.
 */
_goa.ContextDelegatedResponse.prototype.vary = function(field) {}
/**
 * Append additional header `field` with value `val`.
 *
 * _Examples_:
 *
 * ```js
 * this.append('Link', ['<http://localhost>',
 *                      '<http://localhost:3000>'])
 * this.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly')
 * this.append('Warning', '199 Miscellaneous warning')
 * ```
 * @param {string} field The header name to append values to.
 * @param {(string|!Array)} val The value or values to append.
 */
_goa.ContextDelegatedResponse.prototype.append = function(field, val) {}
/**
 * Flush any set headers, and begin the body.
 */
_goa.ContextDelegatedResponse.prototype.flushHeaders = function() {}
/**
 * The additional API not available via Context.
 * @extends {_goa.ContextDelegatedResponse}
 * @interface
 */
_goa.BaseResponse
/**
 * Return the request socket.
 * @type {!net.Socket}
 */
_goa.BaseResponse.prototype.socket
/**
 * Return response header (_OutgoingHttpHeaders_).
 * @type {!Object<string, string>}
 */
_goa.BaseResponse.prototype.header
/**
 * Return response header, alias as `response.header` (_OutgoingHttpHeaders_).
 * @type {!Object<string, string>}
 */
_goa.BaseResponse.prototype.headers
/**
 * Return response header.
 *
 * _Examples_:
 *
 * ```js
 * this.get('Content-Type') // => "text/plain"
 * this.get('content-type') // => "text/plain"
 * ```
 * @param {string} arg0
 * @return {string}
 */
_goa.BaseResponse.prototype.get = function(arg0) {}
/**
 * Check whether the response is one of the listed types. Pretty much the same as `this.request.is()`.
 * @param {(string|!Array<string>)} arg0
 * @param {...string} args
 * @return {(string|boolean)}
 */
_goa.BaseResponse.prototype.is = function(arg0, ...args) {}
/**
 * The response object.
 * @extends {_goa.BaseResponse}
 * @interface
 */
_goa.Response
/**
 * The reference to the application.
 * @type {!_goa.Application}
 */
_goa.Response.prototype.app
/**
 * The reference to the context instance.
 * @type {!_goa.Context}
 */
_goa.Response.prototype.ctx
/**
 * The reference to the request instance.
 * @type {!_goa.Request}
 */
_goa.Response.prototype.request
/**
 * The message from the client.
 * @type {!http.IncomingMessage}
 */
_goa.Response.prototype.req
/**
 * The response from the server.
 * @type {!http.ServerResponse}
 */
_goa.Response.prototype.res
