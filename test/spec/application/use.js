import { throws } from 'assert'
import { deepEqual } from '@zoroaster/assert'
import Context from '../../context'

/** @type {Object<string, (c: Context)>} */
const TS = {
  context: Context,
  async 'composes middleware'({ app, startApp }) {
    const calls = []

    app.use((ctx, next) => {
      calls.push(1)
      return next().then(() => {
        calls.push(6)
      })
    })

    app.use((ctx, next) => {
      calls.push(2)
      return next().then(() => {
        calls.push(5)
      })
    })

    app.use((ctx, next) => {
      calls.push(3)
      return next().then(() => {
        calls.push(4)
      })
    })

    await startApp()
      .get('/')
      .assert(404)

    deepEqual(calls, [1, 2, 3, 4, 5, 6])
  },

  // https://github.com/koajs/koa/pull/530#issuecomment-148138051
  async 'catches thrown errors in non-async functions'({ app, startApp }) {
    app.use(ctx => ctx.throw(404, 'Not Found'))

    await startApp()
      .get('/')
      .assert(404)
  },

  'throws error for non function'({ app }) {
    [null, undefined, 0, false, 'not a function'].forEach(v => {
      throws(() => app.use(v), /middleware must be a function!/)
    })
  },
}

export default TS