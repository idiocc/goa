import { equal } from 'assert'
import Context from '../../context'

/** @type {Object<string, (a: Context)>} */
const TS = {
  context: Context,
  async 'merges properties'({ app1, startPlain }) {
    app1.use((ctx) => {
      equal(ctx.msg, 'hello')
      ctx.status = 204
    })
    await startPlain(app1.callback())
      .get('/')
      .assert(204)
  },
  async 'does not affect the original prototype'({ app, startPlain }) {
    app.use((ctx) => {
      equal(ctx.msg, undefined)
      ctx.status = 204
    })
    await startPlain(app.callback())
      .get('/')
      .assert(204)
  },
}

export default TS