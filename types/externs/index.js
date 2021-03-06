/**
 * @fileoverview
 * @externs
 */

/** @type {string|undefined} */
http.IncomingHttpHeaders.prototype.referrer
/** @type {string|undefined} */
http.IncomingHttpHeaders.prototype.referer

/** @type {string} */
process.env.NODE_ENV

/** @type {!net.Socket} */
http.ServerResponse.prototype.socket

/* onfinish updates stuff */
/** @type {Function} */
http.ServerResponse.prototype.__onFinished
/** @type {Function} */
http.IncomingMessage.prototype.__onFinished

/* parseurl package updates the incoming message */
/** @type {string} */
http.IncomingMessage.prototype._raw
/** @type {!Object} */
http.IncomingMessage.prototype._parsedUrl
/** @type {string} */
http.IncomingMessage.prototype.originalUrl
/** @type {!Object} */
http.IncomingMessage.prototype._parsedOriginalUrl