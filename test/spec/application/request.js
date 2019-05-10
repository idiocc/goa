import Http from '@contexts/http'
import { equal } from 'assert'
import Koa from '../../../src'

class App {
  _init() {
    this.app1 = new Koa()
    this.app1.request.message = 'hello'
    this.app2 = new Koa()
  }
}

/** @type {Object<string, (a: App, h:Http)>} */
const TS = {
  context: [App, Http],
  async 'merges properties'({ app1 }, { start }) {
    app1.use((ctx) => {
      equal(ctx.request.message, 'hello')
      ctx.status = 204
    })

    await start(app1.callback())
      .get('/')
      .assert(204)
  },
  async 'does not affect the original prototype'({ app2 }, { start }) {
    app2.use((ctx) => {
      equal(ctx.request.message, undefined)
      ctx.status = 204
    })

    await start(app2.callback())
      .get('/')
      .assert(204)
  },
}

export default TS