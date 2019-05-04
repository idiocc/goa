export {}

/* typal types/Application.xml closure noSuppress */
/**
 * @typedef {_goa.Application} Application `@interface` The application interface.
 */
/**
 * @typedef {Object} _goa.Application `@interface` The application interface.
 * @prop {boolean} [proxy] Whether the server is running behind a proxy.
 * @prop {number} [subdomainOffset] For example, if the domain is "tobi.ferrets.example.com": If `app.subdomainOffset` is not set, request.subdomains is `["ferrets", "tobi"]`. If `app.subdomainOffset` is 3, request.subdomains is `["tobi"]`.
 */

/* typal types/Response.xml closure noSuppress */
/**
 * @typedef {_goa.Response} Response `@interface` The response API.
 */
/**
 * @typedef {Object} _goa.Response `@interface` The response API.
 * @prop {_goa.Application} app The reference to the application.     1
 * @prop {_goa.Context} ctx The reference to the context instance.     1
 * @prop {_goa.Request} request The reference to the request instance.     1
 * @prop {http.IncomingMessage} req The message from the client.     1
 * @prop {http.ServerResponse} res The response from the server.     1
 * @prop {function} attachment 1     1
 * @prop {function} redirect 1
 * @prop {function} remove 1
 * @prop {function} vary 1
 * @prop {function} set 1
 * @prop {function} append 1
 * @prop {function} flushHeaders 1
 * @prop {*} status 1
 * @prop {*} message 1
 * @prop {*} body 1
 * @prop {number} length Return parsed response Content-Length when present.
      Set Content-Length field to `n`.
 * @prop {*} type 1
 * @prop {*} lastModified 1
 * @prop {*} etag 1
 * @prop {boolean} headerSent 1
 * @prop {boolean} writable 1
 */
/**
 * @typedef {import('http').IncomingMessage} http.IncomingMessage
 */
/**
 * @typedef {import('http').ServerResponse} http.ServerResponse
 */
