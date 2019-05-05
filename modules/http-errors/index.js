/*!
 * http-errors
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */

import statuses, { codes } from '../statuses'

const deprecate = (msg) => {
  process.emitWarning(msg, 'DeprecationWarning')
}

/**
 * Get the code class of a status code.
 * @private
 */
function codeClass (status) {
  return Number(String(status).charAt(0) + '00')
}

/**
 * Create a new HTTP Error.
 * @param {...Error|string|number} args
 */
export default function createError(...args) {
  // so much arity going on ~_~
  var err
  var msg
  let status = 500
  let props = {}
  for (var i = 0; i < args.length; i++) {
    var arg = args[i]
    if (arg instanceof Error) {
      err = arg
      status = err['status'] || err['statusCode'] || status
      continue
    }
    switch (typeof arg) {
    case 'string':
      msg = arg
      break
    case 'number':
      status = arg
      if (i !== 0) {
        deprecate('non-first-argument status code; replace with createError(' + arg + ', ...)')
      }
      break
    case 'object':
      props = arg
      break
    }
  }

  if (typeof status == 'number' && (status < 400 || status >= 600)) {
    deprecate('non-error status code; use only 4xx or 5xx status codes')
  }

  if (typeof status != 'number' ||
    (!statuses[status] && (status < 400 || status >= 600))) {
    status = 500
  }

  // constructor
  const HttpError = createError[status] || createError[codeClass(status)]

  if (!err) {
    // create error
    err = HttpError
      ? new HttpError(msg)
      : new Error(msg || statuses[status])
    Error.captureStackTrace(err, createError)
  }

  if (!HttpError || !(err instanceof HttpError) || err['status'] !== status) {
    // add properties to generic error
    err['expose'] = status < 500
    err['status'] = err['statusCode'] = status
  }

  for (let key in props) {
    if (key != 'status' && key != 'statusCode') {
      err[key] = props[key]
    }
  }

  return err
}

export class HttpError extends Error {
  constructor(message) {
    super()
    this.message = message
    this.status = null
    this.statusCode = null
  }
  set code(code) {
    this.status = code
    this.statusCode = code
    if (!this.message) this.message = statuses[code]
  }
}

codes.forEach((code) => {
  let CodeError
  const name = toIdentifier(statuses[code])
  const className = name.match(/Error$/) ? name : name + 'Error'

  switch (codeClass(code)) {
  case 400:
    CodeError = class ClientError extends HttpError {
      constructor(message) {
        super(message)
        this.code = code
        this.name = className
        this.expose = true
      }
    }
    break
  case 500:
    CodeError = class ServerError extends HttpError {
      constructor(message) {
        super(message)
        this.code = code
        this.name = className
        this.expose = false
      }
    }
    break
  }

  if (CodeError) {
    // export the constructor
    createError[code] = CodeError
    createError[name] = CodeError
  }
}, {})



/**
 * Transform the given string into a JavaScript identifier
 * @param {string} str
 */
function toIdentifier(str) {
  return str
    .split(' ')
    .map(function (token) {
      return token.slice(0, 1).toUpperCase() + token.slice(1)
    })
    .join('')
    .replace(/[^ _0-9a-z]/gi, '')
}

/*!
 * toidentifier
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */