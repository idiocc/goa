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
 * For example, if the domain is "tobi.ferrets.example.com": If `app.subdomainOffset` is not set, request.subdomains is `["ferrets", "tobi"]`. If `app.subdomainOffset` is 3, request.subdomains is `["tobi"]`.
 * @type {number|undefined}
 */
_goa.Application.prototype.subdomainOffset
