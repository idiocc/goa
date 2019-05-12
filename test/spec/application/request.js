import { equal } from 'assert'
import Context from '../../context'

/** @type {TestSuite} */
const TS = {
  context: Context,
  async 'merges properties'({ app1, startPlain }) {
    app1.use((ctx) => {
      equal(ctx.request.message, 'hello')
      ctx.status = 204
    })

    await startPlain(app1.callback())
      .get('/')
      .assert(204)
  },
  async 'does not affect the original prototype'({ app, startApp }) {
    app.use((ctx) => {
      equal(ctx.request.message, undefined)
      ctx.status = 204
    })

    await startApp()
      .get('/')
      .assert(204)
  },
}

export default TS

/**
 * @typedef {import('../../context').TestSuite} TestSuite
 */