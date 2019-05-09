export {}

/* typal types/Application.xml closure noSuppress */
/**
 * @typedef {_goa.Application} Application `@interface` The application interface.
 */
/**
 * @typedef {events.EventEmitter & _goa.$Application} _goa.Application `@interface` The application interface.
 */
/**
 * @typedef {Object} _goa.$Application `@interface` The application interface.
 * @prop {boolean} [proxy] Whether the server is running behind a proxy.
 * @prop {!Array<!_goa.Middleware>} middleware The array with middleware used on the server.
 * @prop {!_goa.Context} context The context object for each request.
 * @prop {!_goa.Request} request The request object for each request.
 * @prop {!_goa.Response} response The response object for each request.
 * @prop {string} [env="development"] The value from the `NODE_ENV` environment variable. Default `development`.
 * @prop {!(_goa.Keygrip|Array<string>)} [keys] The keys for signing of the cookies.
 * @prop {boolean} [silent=false] Whether to not log an error when it happens. Default `false`.
 * @prop {function(!_goa.Middleware): !_goa.Application} use Use the given middleware `fn`. Old-style middleware will be converted.
 * @prop {function(): !Function} callback Returns the request handler callback for node's native http/http2 server composed of the installed middleware.
 * @prop {number} [subdomainOffset] For example, if the domain is "tobi.ferrets.example.com": If `app.subdomainOffset` is not set, request.subdomains is `["ferrets", "tobi"]`. If `app.subdomainOffset` is 3, request.subdomains is `["tobi"]`.
 */
/**
 * @typedef {import('http').IncomingMessage} http.IncomingMessage
 */
/**
 * @typedef {import('http').ServerResponse} http.ServerResponse
 */
/**
 * @typedef {import('net').Socket} net.Socket
 */
/**
 * @typedef {import('url').URL} url.URL
 */

/* typal types/Response.xml closure noSuppress */
/**
 * @typedef {_goa.ContextDelegatedResponse} ContextDelegatedResponse `@interface` The response API available via Context.
 */
/**
 * @typedef {Object} _goa.ContextDelegatedResponse `@interface` The response API available via Context.
 * @prop {function(string, ?): void} attachment Set Content-Disposition header to "attachment" with optional `filename`.
 * @prop {function(string, string=): void} redirect Perform a 302 redirect to `url`. The string "back" is special-cased to provide Referrer support, when Referrer is not present `alt` or "/" is used. _Examples_:
      - `this.redirect('back')`
      - `this.redirect('back', '/index.html')`
      - `this.redirect('/login')`
      - `this.redirect('http://google.com')`
 * @prop {function(string): void} remove Remove header `field`.
 * @prop {function(string): void} vary Vary on `field`.
 * @prop {function((string|!Object), (string|!Array|number)=): void} set Set header `field` to `val`, or pass an object of header fields. _Examples_:
      - `this.set('Foo', ['bar', 'baz'])`
      - `this.set('Accept', 'application/json')`
      - `this.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' })`.
 * @prop {function(string, (string|!Array)): void} append Append additional header `field` with value `val`. _Examples_:
      - `this.append('Link', ['<http://localhost>', '<http://localhost:3000>'])`
      - `this.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly')`
      - `this.append('Warning', '199 Miscellaneous warning')`
 * @prop {function(): void} flushHeaders Flush any set headers, and begin the body.
 * @prop {number} status Get/set response status code.
 * @prop {string} message Get/set response status message.
 * @prop {string|!Buffer|Object|!stream.Stream} body Get/set response body.
 * @prop {?number} length Return parsed response `Content-Length` when present. Set `Content-Length` field to `n`.
 * @prop {string} type Return the response mime type void of parameters such as "charset". Set Content-Type response header with `type` through `mime.lookup()` when it does not contain a charset. _Examples_:
      - `this.type = '.html'`
      - `this.type = 'html'`
      - `this.type = 'json'`
      - `this.type = 'application/json'`
      - `this.type = 'png'`
 * @prop {string|Date} lastModified Get the Last-Modified date in Date form, if it exists. Set the Last-Modified date using a string or a Date. _Examples_:
      - `this.response.lastModified = new Date()`
      - `this.response.lastModified = '2013-09-13'`
 * @prop {string} etag Get/Set the ETag of a response. This will normalize the quotes if necessary. _Examples_:
      - `this.response.etag = 'md5hashsum'`
      - `this.response.etag = '"md5hashsum"'`
      - `this.response.etag = 'W/"123456789"'`
 * @prop {boolean} headerSent Check if a header has been written to the socket.
 * @prop {boolean} writable Checks if the request is writable. Tests for the existence of the socket as _Node.JS_ sometimes does not set it.
 */
/**
 * @typedef {_goa.BaseResponse} BaseResponse `@interface` The additional API not available via Context.
 */
/**
 * @typedef {_goa.ContextDelegatedResponse & _goa.$BaseResponse} _goa.BaseResponse `@interface` The additional API not available via Context.
 */
/**
 * @typedef {Object} _goa.$BaseResponse `@interface` The additional API not available via Context.
 * @prop {!net.Socket} socket Return the request socket.
 * @prop {!Object<string, string>} header Return response header (_OutgoingHttpHeaders_).
 * @prop {!Object<string, string>} headers Return response header, alias as `response.header` (_OutgoingHttpHeaders_).
 * @prop {function((string|!Array<string>), ...string): (string|boolean)} is Check whether the response is one of the listed types. Pretty much the same as `this.request.is()`.
 * @prop {function(string): string} get Return response header. _Examples_:
      - `this.get('Content-Type')` => `"text/plain"`
      - `this.get('content-type')` => `"text/plain"`
 */
/**
 * @typedef {_goa.Response} Response `@interface` The response object.
 */
/**
 * @typedef {_goa.BaseResponse & _goa.$Response} _goa.Response `@interface` The response object.
 */
/**
 * @typedef {Object} _goa.$Response `@interface` The response object.
 * @prop {!_goa.Application} app The reference to the application.
 * @prop {!_goa.Context} ctx The reference to the context instance.
 * @prop {!_goa.Request} request The reference to the request instance.
 * @prop {!http.IncomingMessage} req The message from the client.
 * @prop {!http.ServerResponse} res The response from the server.
 */


/* typal types/Request.xml closure noSuppress */
/**
 * @typedef {_goa.ContextDelegatedRequest} ContextDelegatedRequest `@interface` The request API available via Context.
 */
/**
 * @typedef {Object} _goa.ContextDelegatedRequest `@interface` The request API available via Context.
 * @prop {function((!Array<string>|string)=, ...string): (string|!Array<string>|boolean)} acceptsLanguages Return accepted languages or best fit based on `langs`. Given `Accept-Language: en;q=0.8, es, pt` an array sorted by quality is returned: `['es', 'pt', 'en']`.
 * @prop {function((!Array<string>|string)=, ...string): (string|!Array<string>|boolean)} acceptsEncodings Return accepted encodings or best fit based on `encodings`. Given `Accept-Encoding: gzip, deflate` an array sorted by quality is returned: `['gzip', 'deflate']`.
 * @prop {function((!Array<string>|string)=, ...string): (string|!Array<string>|boolean)} acceptsCharsets Return accepted charsets or best fit based on `charsets`. Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5` an array sorted by quality is returned: `['utf-8', 'utf-7', 'iso-8859-1']`.
 * @prop {function((!Array<string>|string)=, ...string): (string|!Array<string>|boolean)} accepts Check if the given `type(s)` is acceptable, returning the best match when true, otherwise `undefined`, in which case you should respond with 406 "Not Acceptable".
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
 * @prop {function(string): string} get Return request header. The `Referrer` header field is special-cased, both `Referrer` and `Referer` are interchangeable. _Examples_:
      - `this.get('Content-Type') => "text/plain"`
      - `this.get('content-type') => "text/plain"`
      - `this.get('Something') => undefined`
 * @prop {function(((!Array<string>|string)), ...string)} is Check if the incoming request contains the "Content-Type" header field, and it contains any of the give mime `type`s. If there is no request body, `null` is returned. If there is no content type, `false` is returned. Otherwise, it returns the first `type` that matches.
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
 * @prop {string} querystring Get/Set query string.
 * @prop {boolean} idempotent Check if the request is idempotent.
 * @prop {net.Socket} socket Return the request socket.
 * @prop {string} search Get the search string. Same as the querystring except it includes the leading ?. Set the search string. Same as `response.querystring=` but included for ubiquity.
 * @prop {string} method Get/Set request method.
 * @prop {!Object|string} query Get parsed query-string. Set query-string as an object.
 * @prop {string} path Get request pathname. Set pathname, retaining the query-string when present.
 * @prop {string} url Get/Set request URL.
 * @prop {_goa.Accepts} accept Get accept object. Lazily memoized.
 * @prop {string} origin Get origin of URL.
 * @prop {string} href Get full request URL.
 * @prop {!Array<string>} subdomains Return subdomains as an array.
      Subdomains are the dot-separated parts of the host before the main domain of the app. By default, the domain of the app is assumed to be the last two parts of the host. This can be changed by setting `app.subdomainOffset`. For example, if the domain is "tobi.ferrets.example.com":
      - If `app.subdomainOffset` is not set, this.subdomains is `["ferrets", "tobi"]`.
      - If `app.subdomainOffset` is 3, this.subdomains is `["tobi"]`.
 * @prop {string} protocol Return the protocol string "http" or "https" when requested with TLS. When the proxy setting is enabled the "X-Forwarded-Proto" header is enabled the "X-Forwarded-Proto" header a reverse proxy that supplies https for you this may be enabled.
 * @prop {string} host Parse the "Host" header field host and support X-Forwarded-Host when a proxy is enabled.
 * @prop {string} hostname Parse the "Host" header field hostname and support X-Forwarded-Host when a proxy is enabled.
 * @prop {url.URL|Object} URL Get WHATWG parsed URL object.
 * @prop {!Object<string, string>} header Return request header.
 * @prop {!Object<string, string>} headers Return request header, alias as `request.header`.
 * @prop {boolean} secure Short-hand for: `this.protocol == 'https'`.
 * @prop {boolean} stale Check if the request is stale, aka "Last-Modified" and / or the "ETag" for the resource has changed.
 * @prop {boolean} fresh Check if the request is fresh, aka Last-Modified and/or the ETag still match.
 * @prop {!Array<string>} ips When `app.proxy` is `true`, parse the "X-Forwarded-For" ip address list. For example if the value were "client, proxy1, proxy2" you would receive the array `["client", "proxy1", "proxy2"]` where "proxy2" is the furthest down-stream.
 * @prop {string} ip Request remote address. Supports X-Forwarded-For when app.proxy is true.
 */
/**
 * @typedef {_goa.BaseRequest} BaseRequest `@interface` The additional API not available via Context.
 */
/**
 * @typedef {_goa.ContextDelegatedRequest & _goa.$BaseRequest} _goa.BaseRequest `@interface` The additional API not available via Context.
 */
/**
 * @typedef {Object} _goa.$BaseRequest `@interface` The additional API not available via Context.
 * @prop {string} [charset] Get the charset when present or undefined.
 * @prop {?number} length Return parsed Content-Length when present.
 * @prop {string} [type] Return the request mime type void of parameters such as "charset".
 */
/**
 * @typedef {_goa.Request} Request `@interface` The request object.
 */
/**
 * @typedef {_goa.BaseRequest & _goa.$Request} _goa.Request `@interface` The request object.
 */
/**
 * @typedef {Object} _goa.$Request `@interface` The request object.
 * @prop {!_goa.Application} app The reference to the application.
 * @prop {!_goa.Context} ctx The reference to the context instance.
 * @prop {!_goa.Response} response The reference to the request instance.
 * @prop {!http.IncomingMessage} req The message from the client.
 * @prop {!http.ServerResponse} res The response from the server.
 * @prop {string} [originalUrl] The original url set by the `parseurl` package.
 */
