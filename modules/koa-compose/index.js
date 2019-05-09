/**
 * @license MIT
 * (c) dead-horse
 * https://npmjs.org/koa-compose
 */

/**
 * Compose `middleware` returning a fully valid middleware comprised of all those which are passed.
 * @param {!Array<!Function>} middleware
 */
export default function compose(middleware) {
  if (!Array.isArray(middleware))
    throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn != 'function')
      throw new TypeError('Middleware must be composed of functions!')
  }

  return async function(context, next) {
    // last called middleware #
    let index = -1
    return await dispatch(0)

    async function dispatch(i) {
      if (i <= index) throw new Error('next() called multiple times')
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return
      await fn(context, dispatch.bind(null, i + 1))
    }
  }
}