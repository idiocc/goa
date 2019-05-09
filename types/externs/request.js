/* typal types/Request.xml externs skipNsDecl */
/**
 * The request API available via Context.
 * @interface
 */
_goa.ContextDelegatedRequest
/**
 * Return accepted languages or best fit based on `langs`. Given `Accept-Language: en;q=0.8, es, pt` an array sorted by quality is returned: `['es', 'pt', 'en']`.
 * @type {function((!Array<string>|string)=, ...string): string|!Array<string>|boolean}
 */
_goa.ContextDelegatedRequest.prototype.acceptsLanguages
/**
 * Return accepted encodings or best fit based on `encodings`. Given `Accept-Encoding: gzip, deflate` an array sorted by quality is returned: `['gzip', 'deflate']`.
 * @type {function((!Array<string>|string)=, ...string): string|!Array<string>|boolean}
 */
_goa.ContextDelegatedRequest.prototype.acceptsEncodings
/**
 * Return accepted charsets or best fit based on `charsets`. Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5` an array sorted by quality is returned: `['utf-8', 'utf-7', 'iso-8859-1']`.
 * @type {function((!Array<string>|string)=, ...string): string|!Array<string>|boolean}
 */
_goa.ContextDelegatedRequest.prototype.acceptsCharsets
/**
 * Check if the given `type(s)` is acceptable, returning the best match when true, otherwise `undefined`, in which case you should respond with 406 "Not Acceptable".
      The `type` value may be a single mime type string such as "application/json", the extension name such as "json" or an array `["json", "html", "text/plain"]`. When a list or array is given the _best_ match, if any is returned.
      _Examples_:
      - [Accept: text/html] `this.accepts('html') => "html"`
      - [Accept: text/*, application/json]
        `this.accepts('html') => "html"`
        `this.accepts('text/html') => "text/html"`
        `this.accepts('json', 'text') => "json"`
        `this.accepts('application/json') => "application/json"`
      - [Accept: text/*, application/json]
        `this.accepts('image/png') => undefined`
        `this.accepts('png') => undefined`
      - [Accept: text/*;q=.5, application/json]
        `this.accepts(['html', 'json']) => "json"`
        `this.accepts('html', 'json') => "json"`
 * @type {function((!Array<string>|string)=, ...string): string|!Array<string>|boolean}
 */
_goa.ContextDelegatedRequest.prototype.accepts
/**
 * Return request header. The `Referrer` header field is special-cased, both `Referrer` and `Referer` are interchangeable. _Examples_:
      - `this.get('Content-Type') => "text/plain"`
      - `this.get('content-type') => "text/plain"`
      - `this.get('Something') => undefined`
 * @type {function(string): string}
 */
_goa.ContextDelegatedRequest.prototype.get
/**
 * Check if the incoming request contains the "Content-Type" header field, and it contains any of the give mime `type`s. If there is no request body, `null` is returned. If there is no content type, `false` is returned. Otherwise, it returns the first `type` that matches.
      _Examples_:
      - With Content-Type: text/html; charset=utf-8
        `this.is('html'); // => 'html'`
        `this.is('text/html'); // => 'text/html'`
        `this.is('text/*', 'application/json'); // => 'text/html'`
      - When Content-Type is application/json
        `this.is('json', 'urlencoded'); // => 'json'`
        `this.is('application/json'); // => 'application/json'`
        `this.is('html', 'application/*'); // => 'application/json'`
        `this.is('html'); // => false`
 * @type {function(((!Array<string>|string)), ...string)}
 */
_goa.ContextDelegatedRequest.prototype.is
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
 * @type {accepts.Accepts}
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
      Subdomains are the dot-separated parts of the host before the main domain of the app. By default, the domain of the app is assumed to be the last two parts of the host. This can be changed by setting `app.subdomainOffset`. For example, if the domain is "tobi.ferrets.example.com":
      - If `app.subdomainOffset` is not set, this.subdomains is `["ferrets", "tobi"]`.
      - If `app.subdomainOffset` is 3, this.subdomains is `["tobi"]`.
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
 * @type {url.URL}
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
