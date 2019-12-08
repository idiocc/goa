export {}

/* typal types/Application.xml namespace */
/**
 * @typedef {import('http').IncomingMessage} http.IncomingMessage
 * @typedef {import('http').ServerResponse} http.ServerResponse
 * @typedef {import('events').EventEmitter} events.EventEmitter
 * @typedef {import('..').Keygrip} _goa.Keygrip
 * @typedef {import('..').Context} _goa.Context
 * @typedef {import('..').Request} _goa.Request
 * @typedef {import('..').Response} _goa.Response
 * @typedef {_goa.Application} Application `＠interface` The application interface.
 * @typedef {events.EventEmitter & _goa.$Application} _goa.Application `＠interface` The application interface.
 * @typedef {Object} _goa.$Application `＠interface` The application interface.
 * @prop {boolean} [proxy] Whether the server is running behind a proxy.
 * @prop {!Array<!_goa.Middleware>} middleware The array with middleware used on the server.
 * @prop {!_goa.Context} context The context object for each request.
 * @prop {!_goa.Request} request The request object for each request.
 * @prop {!_goa.Response} response The response object for each request.
 * @prop {string} [env="development"] The value from the `NODE_ENV` environment variable. Default `development`.
 * @prop {!(_goa.Keygrip|Array<string>)} [keys] The keys for signing of the cookies.
 * @prop {boolean} [silent=false] Whether to not log an error when it happens. Default `false`.
 * @prop {() => ?} listen Shorthand for: `http.createServer(app.callback()).listen(...)`
 * @prop {() => function(!http.IncomingMessage, !http.ServerResponse)} callback Returns the request handler callback for node's native http/http2 server composed of the installed middleware.
 * @prop {(arg0: !http.IncomingMessage, arg1: !http.ServerResponse) => ?} createContext `＠private` Initialize a new context.
 * @prop {(arg0: !Error) => ?} onerror `＠private` Default error handler.
 * @prop {number} [subdomainOffset] For example, if the domain is "tobi.ferrets.example.com": If `app.subdomainOffset` is not set, request.subdomains is `["ferrets", "tobi"]`. If `app.subdomainOffset` is 3, request.subdomains is `["tobi"]`.
 * @prop {(middleware: !_goa.Middleware) => !_goa.Application} use Use the given middleware `fn`. Old-style middleware will be converted.
 * @typedef {_goa.Middleware} Middleware The function to handle requests which can be installed with the `.use` method.
 * @typedef {(ctx: !_goa.Context, next: !Function) => !Promise|void} _goa.Middleware The function to handle requests which can be installed with the `.use` method.
 */
