import Http from '@contexts/http'
import { throws } from 'assert'
import { deepEqual } from '@zoroaster/assert'
import Koa from '../../../src'

/** @type {Object<string, (a: App, h:Http)>} */
const TS = {
  context: Http,
  async 'composes middleware'({ start }) {
    const app = new Koa()
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

    await start(app.callback())
      .get('/')
      .assert(404)

    deepEqual(calls, [1, 2, 3, 4, 5, 6])
  },

  // https://github.com/koajs/koa/pull/530#issuecomment-148138051
  async 'catches thrown errors in non-async functions'({ start }) {
    const app = new Koa()

    app.use(ctx => ctx.throw(404, 'Not Found'))

    await start(app.callback())
      .get('/')
      .assert(404)
  },

  'should throw error for non function'() {
    const app = new Koa();

    [null, undefined, 0, false, 'not a function'].forEach(v => {
      throws(() => app.use(v), /middleware must be a function!/)
    })
  },
}

export default TS