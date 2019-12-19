/**
 * @fileoverview
 * @externs
 */
/* typal types/Context.xml externs skipNsDecl */
/**
 * The context object for each request.
 * The application will construct instances of _Context_ for each request manually.
 * @extends {_goa.ContextDelegatedResponse}
 * @extends {_goa.ContextDelegatedRequest}
 * @interface
 */
_goa.Context = function() {}
/**
 * The cookies instance.
 * @type {!_goa.Cookies}
 */
_goa.Context.prototype.cookies
/**
 * To bypass Koa's built-in response handling, you may explicitly set `ctx.respond = false;`
 * @type {boolean}
 */
_goa.Context.prototype.respond
/**
 * Get request original URL.
 * @type {string}
 */
_goa.Context.prototype.originalUrl
/**
 * The recommended namespace for passing information through middleware and to your frontend views.
 * @type {Object}
 */
_goa.Context.prototype.state
/**
 * The reference to the application.
 * @type {!_goa.Application}
 */
_goa.Context.prototype.app
/**
 * The reference to the request instance.
 * @type {!_goa.Request}
 */
_goa.Context.prototype.request
/**
 * The reference to the response instance.
 * @type {!_goa.Response}
 */
_goa.Context.prototype.response
/**
 * The message from the client.
 * @type {!http.IncomingMessage}
 */
_goa.Context.prototype.req
/**
 * The response from the server.
 * @type {!http.ServerResponse}
 */
_goa.Context.prototype.res
/**
 * `util.inspect()` implementation, which just returns the JSON output.
 * @return {!Object}
 */
_goa.Context.prototype.inspect = function() {}
/**
 * Return JSON representation.
 * @return {!Object}
 */
_goa.Context.prototype.toJSON = function() {}
/**
 * Similar to .throw(), adds assertion.
 * @param {*} value The value the presence of which to assert on.
 * @param {number=} [status] The error status code.
 * @param {string=} [message] The error message.
 * @param {!Object=} [opts] The error properties.
 */
_goa.Context.prototype.assert = function(value, status, message, opts) {}
/**
 * Throw an error with `msg` and optional `status` defaulting to 500. Note that these are user-level errors, and the message may be exposed to the client.
 * @param {number=} [status] The status code as number.
 * @param {string=} [message] The message. By default, will look up in the status code table.
 * @param {string=} [props] Additional custom properties to attach to object.
 */
_goa.Context.prototype.throw = function(status, message, props) {}
/**
 * Default error handling.
 * @param {!Error} error The error.
 */
_goa.Context.prototype.onerror = function(error) {}
