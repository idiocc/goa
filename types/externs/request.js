/* typal types/Request.xml externs skipNsDecl */
/**
 * The request API available via Context.
 * @interface
 */
_goa.ContextDelegatedRequest
/**
 * Return accepted languages or best fit based on `langs`. Given `Accept-Language: en;q=0.8, es, pt` an array sorted by quality is returned: `['es', 'pt', 'en']`.
 * @param {(!Array<string>|string)=} [arg0]
 * @param {...string} args
 * @return {(string|!Array<string>|boolean)}
 */
_goa.ContextDelegatedRequest.prototype.acceptsLanguages = function(arg0, ...args) {}
/**
 * Return accepted encodings or best fit based on `encodings`. Given `Accept-Encoding: gzip, deflate` an array sorted by quality is returned: `['gzip', 'deflate']`.
 * @param {(!Array<string>|string)=} [arg0]
 * @param {...string} args
 * @return {(string|!Array<string>|boolean)}
 */
_goa.ContextDelegatedRequest.prototype.acceptsEncodings = function(arg0, ...args) {}
/**
 * Return accepted charsets or best fit based on `charsets`. Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5` an array sorted by quality is returned: `['utf-8', 'utf-7', 'iso-8859-1']`.
 * @param {(!Array<string>|string)=} [arg0]
 * @param {...string} args
 * @return {(string|!Array<string>|boolean)}
 */
_goa.ContextDelegatedRequest.prototype.acceptsCharsets = function(arg0, ...args) {}
/**
 * Check if the given `type(s)` is acceptable, returning the best match when true, otherwise `false`, in which case you should respond with 406 "Not Acceptable".
 *
 * The `type` value may be a single mime type string such as "application/json", the extension name such as "json" or an array `["json", "html", "text/plain"]`. When a list or array is given the _best_ match, if any is returned. When no types are given as arguments, returns all types accepted by the client in the preference order.
 *
 * _Examples_:
 *
 * - Accept: text/html
 *
 *     ```js
 *     this.types('html') => "html"
 *     ```
 * - Accept: text/＊, application/json
 *
 *     ```js
 *     this.types('html') => "html"
 *     this.types('text/html') => "text/html"
 *     this.types('json', 'text') => "json"
 *     this.types('application/json') => "application/json"
 *     ```
 * - Accept: text/＊, application/json
 *
 *     ```js
 *     this.types('image/png') => false
 *     this.types('png') => false
 *     ```
 * - Accept: text/＊;q=.5, application/json
 *
 *     ```js
 *     this.types(['html', 'json']) => "json"
 *     this.types('html', 'json') => "json"
 *     ```
 * - Accept: application/＊;q=0.2, image/jpeg;q=0.8, text/html, text/plain
 *
 *     ```js
 *     this.types() => ["text/html", "text/plain",
 *       "image/jpeg", "application/＊"]
 *     ```
 * @param {(!Array<string>|string)=} [arg0]
 * @param {...string} args
 * @return {(string|!Array<string>|boolean)}
 */
_goa.ContextDelegatedRequest.prototype.accepts = function(arg0, ...args) {}
/**
 * Return request header. The `Referrer` header field is special-cased, both `Referrer` and `Referer` are interchangeable.
 *
 * _Examples_:
 *
 * ```js
 * this.get('Content-Type') => "text/plain"
 * this.get('content-type') => "text/plain"
 * this.get('Something') => undefined
 * ```
 * @param {string} arg0
 * @return {string}
 */
_goa.ContextDelegatedRequest.prototype.get = function(arg0) {}
/**
 * Check if the incoming request contains the "Content-Type" header field, and it contains any of the give mime `type`s. If there is no request body, `null` is returned. If there is no content type, `false` is returned. Otherwise, it returns the first `type` that matches.
 *
 * _Examples_:
 *
 * - With Content-Type: text/html; charset=utf-8
 *
 *     ```js
 *     this.is('html'); // => 'html'
 *     this.is('text/html'); // => 'text/html'
 *     this.is('text/*', 'application/json');
 *       // => 'text/html'
 *     ```
 * - When Content-Type is application/json
 *
 *     ```js
 *     this.is('json', 'urlencoded'); // => 'json'
 *     this.is('application/json'); // => 'application/json'
 *     this.is('html', 'application/*');
 *               // => 'application/json'
 *     this.is('html'); // => false
 *     ```
 * @param {(!Array<string>|string)} arg0
 * @param {...string} args
 * @return {?}
 */
_goa.ContextDelegatedRequest.prototype.is = function(arg0, ...args) {}
/**
 * Get/Set query string.
 * @type {string}
 */
_goa.ContextDelegatedRequest.prototype.querystring
/**
 * Check if the request is idempotent.
 * @type {boolean}
 */
_goa.ContextDelegatedRequest.prototype.idempotent
/**
 * Return the request socket.
 * @type {net.Socket}
 */
_goa.ContextDelegatedRequest.prototype.socket
/**
 * Get the search string. Same as the querystring except it includes the leading ?. Set the search string. Same as `response.querystring=` but included for ubiquity.
 * @type {string}
 */
_goa.ContextDelegatedRequest.prototype.search
/**
 * Get/Set request method.
 * @type {string}
 */
_goa.ContextDelegatedRequest.prototype.method
/**
 * Get parsed query-string. Set query-string as an object.
 * @type {!Object|string}
 */
_goa.ContextDelegatedRequest.prototype.query
/**
 * Get request pathname. Set pathname, retaining the query-string when present.
 * @type {string}
 */
_goa.ContextDelegatedRequest.prototype.path
/**
 * Get/Set request URL.
 * @type {string}
 */
_goa.ContextDelegatedRequest.prototype.url
/**
 * Get accept object. Lazily memoized.
 * @type {_goa.Accepts}
 */
_goa.ContextDelegatedRequest.prototype.accept
/**
 * Get origin of URL.
 * @type {string}
 */
_goa.ContextDelegatedRequest.prototype.origin
/**
 * Get full request URL.
 * @type {string}
 */
_goa.ContextDelegatedRequest.prototype.href
/**
 * Return subdomains as an array.
 * Subdomains are the dot-separated parts of the host before the main domain of the app. By default, the domain of the app is assumed to be the last two parts of the host. This can be changed by setting `app.subdomainOffset`. For example, if the domain is "tobi.ferrets.example.com":
 * - If `app.subdomainOffset` is not set, this.subdomains is `["ferrets", "tobi"]`.
 * - If `app.subdomainOffset` is 3, this.subdomains is `["tobi"]`.
 * @type {!Array<string>}
 */
_goa.ContextDelegatedRequest.prototype.subdomains
/**
 * Return the protocol string "http" or "https" when requested with TLS. When the proxy setting is enabled the "X-Forwarded-Proto" header is enabled the "X-Forwarded-Proto" header a reverse proxy that supplies https for you this may be enabled.
 * @type {string}
 */
_goa.ContextDelegatedRequest.prototype.protocol
/**
 * Parse the "Host" header field host and support X-Forwarded-Host when a proxy is enabled.
 * @type {string}
 */
_goa.ContextDelegatedRequest.prototype.host
/**
 * Parse the "Host" header field hostname and support X-Forwarded-Host when a proxy is enabled.
 * @type {string}
 */
_goa.ContextDelegatedRequest.prototype.hostname
/**
 * Get WHATWG parsed URL object.
 * @type {url.URL|Object}
 */
_goa.ContextDelegatedRequest.prototype.URL
/**
 * Return request header.
 * @type {!Object<string, string>}
 */
_goa.ContextDelegatedRequest.prototype.header
/**
 * Return request header, alias as `request.header`.
 * @type {!Object<string, string>}
 */
_goa.ContextDelegatedRequest.prototype.headers
/**
 * Short-hand for: `this.protocol == 'https'`.
 * @type {boolean}
 */
_goa.ContextDelegatedRequest.prototype.secure
/**
 * Check if the request is stale, aka "Last-Modified" and / or the "ETag" for the resource has changed.
 * @type {boolean}
 */
_goa.ContextDelegatedRequest.prototype.stale
/**
 * Check if the request is fresh, aka Last-Modified and/or the ETag still match.
 * @type {boolean}
 */
_goa.ContextDelegatedRequest.prototype.fresh
/**
 * When `app.proxy` is `true`, parse the "X-Forwarded-For" ip address list. For example if the value were "client, proxy1, proxy2" you would receive the array `["client", "proxy1", "proxy2"]` where "proxy2" is the furthest down-stream.
 * @type {!Array<string>}
 */
_goa.ContextDelegatedRequest.prototype.ips
/**
 * Request remote address. Supports X-Forwarded-For when app.proxy is true.
 * @type {string}
 */
_goa.ContextDelegatedRequest.prototype.ip
/**
 * The additional API not available via Context.
 * @extends {_goa.ContextDelegatedRequest}
 * @interface
 */
_goa.BaseRequest
/**
 * Get the charset when present or undefined.
 * @type {string|undefined}
 */
_goa.BaseRequest.prototype.charset
/**
 * Return parsed Content-Length when present.
 * @type {?number}
 */
_goa.BaseRequest.prototype.length
/**
 * Return the request mime type void of parameters such as "charset".
 * @type {string|undefined}
 */
_goa.BaseRequest.prototype.type
/**
 * The request object.
 * @extends {_goa.BaseRequest}
 * @interface
 */
_goa.Request
/**
 * The reference to the application.
 * @type {!_goa.Application}
 */
_goa.Request.prototype.app
/**
 * The reference to the context instance.
 * @type {!_goa.Context}
 */
_goa.Request.prototype.ctx
/**
 * The reference to the request instance.
 * @type {!_goa.Response}
 */
_goa.Request.prototype.response
/**
 * The message from the client.
 * @type {!http.IncomingMessage}
 */
_goa.Request.prototype.req
/**
 * The response from the server.
 * @type {!http.ServerResponse}
 */
_goa.Request.prototype.res
/**
 * The original url set by the `parseurl` package.
 * @type {string|undefined}
 */
_goa.Request.prototype.originalUrl
