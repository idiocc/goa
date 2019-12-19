/**
 * @fileoverview
 * @externs
 */
/* typal types/Application.xml externs */
/** @const */
var _goa = {}
/**
 * The application interface.
 * Constructor method.
 * @extends {events.EventEmitter}
 * @interface
 */
_goa.Application = function() {}
/**
 * Whether the server is running behind a proxy. Default `false`.
 * @type {boolean|undefined}
 */
_goa.Application.prototype.proxy
/**
 * The array with middleware used on the server. Default `[]`.
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
 * For example, if the domain is "tobi.ferrets.example.com": If `app.subdomainOffset` is not set, request.subdomains is `["ferrets", "tobi"]`. If `app.subdomainOffset` is 3, request.subdomains is `["tobi"]`.
 * @type {number|undefined}
 */
_goa.Application.prototype.subdomainOffset
/**
 * Shorthand for: `http.createServer(app.callback()).listen(...)`.
 * @param {...*} args The arguments as [described](https://nodejs.org/api/net.html#net_server_listen).
 * @return {!http.Server}
 */
_goa.Application.prototype.listen = function(...args) {}
/**
 * Use the given middleware `fn`. Old-style middleware will be converted.
 * @param {!_goa.Middleware} middleware The middleware to install.
 * @return {!_goa.Application}
 */
_goa.Application.prototype.use = function(middleware) {}
/**
 * Returns the request handler callback for node's native http/http2 server composed of the installed middleware.
 * @return {function(!http.IncomingMessage, !http.ServerResponse)}
 */
_goa.Application.prototype.callback = function() {}
/**
 * `＠private` Initialize a new context.
 * @param {!http.IncomingMessage} req The request object.
 * @param {!http.ServerResponse} res The response object.
 * @return {!_goa.Context}
 */
_goa.Application.prototype.createContext = function(req, res) {}
/**
 * `＠private` Default error handler.
 * @param {!Error} error The error.
 */
_goa.Application.prototype.onerror = function(error) {}
/**
 * Return JSON representation.
 * @return {!Object}
 */
_goa.Application.prototype.toJSON = function() {}
/**
 * `util.inspect()` implementation, which just returns the JSON output.
 * @return {!Object}
 */
_goa.Application.prototype.inspect = function() {}
/**
 * The function to handle requests which can be installed with the `.use` method.
 * @typedef {function(!_goa.Context,!Function=): (!Promise|void)}
 */
_goa.Middleware

