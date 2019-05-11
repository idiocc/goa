export {}

/* typal types/Context.xml closure noSuppress */
/**
 * @typedef {_goa.Context} Context `@interface` The context object for each request.
 */
/**
 * @typedef {Object} _goa.Context `@interface` The context object for each request.
 * @prop {!_goa.Cookies} cookies The cookies instance.
 * @prop {boolean} respond To bypass Koa's built-in response handling, you may explicitly set `ctx.respond = false;`
 * @prop {string} originalUrl Get request original URL.
 * @prop {Object} state The recommended namespace for passing information through middleware and to your frontend views.
 * @prop {!_goa.Application} app The reference to the application.
 * @prop {!_goa.Request} request The reference to the request instance.
 * @prop {!_goa.Response} response The reference to the response instance.
 * @prop {!http.IncomingMessage} req The message from the client.
 * @prop {!http.ServerResponse} res The response from the server.
 */
/**
 * @typedef {import('http').IncomingMessage} http.IncomingMessage
 */
/**
 * @typedef {import('http').ServerResponse} http.ServerResponse
 */
/**
 * @typedef {import('@goa/cookies/types').Cookies} _goa.Cookies
 */

/**
 * @typedef {import('./application').Application} _goa.Application
 * @typedef {import('./request').Request} _goa.Request
 * @typedef {import('./request').ContextDelegatedRequest} ContextDelegatedRequest
 * @typedef {import('./response').ContextDelegatedResponse} ContextDelegatedResponse
 * @typedef {import('./response').Response} _goa.Response
 */

/**
 * @typedef {_goa.KoaContext} KoaContext
 * @typedef {Context & ContextDelegatedResponse & ContextDelegatedRequest} _goa.KoaContext
 */