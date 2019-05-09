import createError from '../http-errors'

export default function assert(value, status, msg, opts) {
  if (value) return
  throw createError(status, msg, opts)
}

/**
 * @license MIT jshttp/http-assert
 */