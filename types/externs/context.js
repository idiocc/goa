/* typal types/Context.xml externs skipNsDecl */
/**
 * The context object for each request.
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
