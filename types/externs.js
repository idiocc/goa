/* typal types/Application.xml externs */
/** @const */
var _goa = {}
/**
 * The application interface.
 * @interface
 */
_goa.Application
/**
 * Whether the server is running behind a proxy.
 * @type {boolean|undefined}
 */
_goa.Application.prototype.proxy
/**
 * The array with middleware used on the server.
 * @type {!Array<!_goa.Middleware>}
 */
_goa.Application.prototype.middleware
/**
 * The context object for each request.
 * @type {!_goa.Context}
 */
_goa.Application.prototype.context
/**
 * The request object for each request.
 * @type {!_goa.Request}
 */
_goa.Application.prototype.request
/**
 * The response object for each request.
 * @type {!_goa.Response}
 */
_goa.Application.prototype.response
/**
 * The value from the `NODE_ENV` environment variable. Default `development`.
 * @type {string|undefined}
 */
_goa.Application.prototype.env
/**
 * The URL set by the `parseurl` package.
 * @type {string}
 */
_goa.Application.prototype.originalUrl
/**
 * The keys for signing of the cookies.
 * @type {(!(_goa.Keygrip|Array<string>))|undefined}
 */
_goa.Application.prototype.keys
/**
 * Whether to not log an error when it happens.
 * @type {boolean|undefined}
 */
_goa.Application.prototype.silent
/**
 * Use the given middleware `fn`. Old-style middleware will be converted.
 * @type {function(!_goa.Middleware): !_goa.Application}
 */
_goa.Application.prototype.use
/**
 * Returns the request handler callback for node's native http/http2 server composed of the installed middleware.
 * @type {function(): !Function}
 */
_goa.Application.prototype.callback
/**
 * For example, if the domain is "tobi.ferrets.example.com": If `app.subdomainOffset` is not set, request.subdomains is `["ferrets", "tobi"]`. If `app.subdomainOffset` is 3, request.subdomains is `["tobi"]`.
 * @type {number|undefined}
 */
_goa.Application.prototype.subdomainOffset
