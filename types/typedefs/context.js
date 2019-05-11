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
 * @prop {function(): ?} inspect util.inspect() implementation, which just returns the JSON output.
 * @prop {function(): ?} toJSON Return JSON representation.
 * @prop {function()} assert Similar to .throw(), adds assertion.
 * @prop {function()} throw Throw an error with `msg` and optional `status` defaulting to 500. Note that these are user-level errors, and the message may be exposed to the client.
 * @prop {function(!Error): void} onerror Default error handling.
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
 * @typedef {import('../vendor/cookies').Cookies} _goa.Cookies
 * @typedef {import('../../depack').Application} _goa.Application
 * @typedef {import('../../depack').Request} _goa.Request
 * @typedef {import('../../depack').ContextDelegatedRequest} ContextDelegatedRequest
 * @typedef {import('../../depack').ContextDelegatedResponse} ContextDelegatedResponse
 * @typedef {import('../../depack').Response} _goa.Response
 */

/**
 * @typedef {_goa.KoaContext} KoaContext
 * @typedef {Context & ContextDelegatedResponse & ContextDelegatedRequest} _goa.KoaContext
 */

// <import from="@goa/cookies/types" ns="_goa" name="Cookies" desc="The interface for Cookies: signed and unsigned cookies based on Keygrip." link="https://github.com/idiocc/cookies#type-_goacookies" />
