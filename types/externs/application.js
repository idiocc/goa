/**
 * @fileoverview
 * @externs
 */
/* typal types/Application.xml externs */
/** @const */
var _goa = {}
/**
 * The application interface.
 * @extends {events.EventEmitter}
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
 * The keys for signing of the cookies.
 * @type {(!(_goa.Keygrip|Array<string>))|undefined}
 */
_goa.Application.prototype.keys
/**
 * Whether to not log an error when it happens. Default `false`.
 * @type {boolean|undefined}
 */
_goa.Application.prototype.silent
/**
 * Shorthand for: `http.createServer(app.callback()).listen(...)`
 */
_goa.Application.prototype.listen = function() {}
/**
 * Returns the request handler callback for node's native http/http2 server composed of the installed middleware.
 * @return {function(!http.IncomingMessage, !http.ServerResponse)}
 */
_goa.Application.prototype.callback = function() {}
/**
 * `＠private` Initialize a new context.
 * @param {!http.IncomingMessage} arg0
 * @param {!http.ServerResponse} arg1
 */
_goa.Application.prototype.createContext = function(arg0, arg1) {}
/**
 * `＠private` Default error handler.
 * @param {!Error} arg0
 */
_goa.Application.prototype.onerror = function(arg0) {}
/**
 * For example, if the domain is "tobi.ferrets.example.com": If `app.subdomainOffset` is not set, request.subdomains is `["ferrets", "tobi"]`. If `app.subdomainOffset` is 3, request.subdomains is `["tobi"]`.
 * @type {number|undefined}
 */
_goa.Application.prototype.subdomainOffset
/**
 * Use the given middleware `fn`. Old-style middleware will be converted.
 * @param {!_goa.Middleware} middleware The middleware to install.
 * @return {!_goa.Application}
 */
_goa.Application.prototype.use = function(middleware) {}
/**
 * The function to handle requests which can be installed with the `.use` method.
 * @typedef {function(!_goa.Context,!Function): !Promise|void}
 */
_goa.Middleware

