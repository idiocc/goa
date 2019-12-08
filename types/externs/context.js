/**
 * @fileoverview
 * @externs
 */
/* typal types/Context.xml externs skipNsDecl */
/**
 * The context object for each request.
 * @extends {_goa.ContextDelegatedResponse}
 * @extends {_goa.ContextDelegatedRequest}
 * @interface
 */
_goa.Context
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
 * util.inspect() implementation, which just returns the JSON output.
 * @return {?}
 */
_goa.Context.prototype.inspect = function() {}
/**
 * Return JSON representation.
 * @return {?}
 */
_goa.Context.prototype.toJSON = function() {}
/**
 * Similar to .throw(), adds assertion.
 */
_goa.Context.prototype.assert = function() {}
/**
 * Throw an error with `msg` and optional `status` defaulting to 500. Note that these are user-level errors, and the message may be exposed to the client.
 */
_goa.Context.prototype.throw = function() {}
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
 * Default error handling.
 * @param {!Error} error The error.
 */
_goa.Context.prototype.onerror = function(error) {}
