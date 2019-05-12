import Context from '../../context'
import { equal } from 'assert'

/** @type {TestSuite} */
const TS = {
  context: Context,
  async 'merges properties'({ app1, startPlain }) {
    app1.use((ctx) => {
      equal(ctx.response.msg, 'hello')
      ctx.status = 204
    })

    await startPlain(app1.callback())
      .get('/')
      .assert(204)
  },

  async 'does not affect the original prototype'({ app, startApp }) {
    app.use((ctx) => {
      equal(ctx.response.msg, undefined)
      ctx.status = 204
    })

    await startApp()
      .get('/')
      .assert(204)
  },

  async 'does not include status message in body for http2'({ app, startApp }) {
    app.use((ctx) => {
      ctx.req.httpVersionMajor = 2
      ctx.status = 404
    })
    await startApp()
      .get('/')
      .assert(404, '404')
  },
}

export default TS

/**
 * @typedef {import('../../context').TestSuite} TestSuite
 */