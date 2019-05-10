import Http from '@contexts/http'
import { equal } from 'assert'
import Koa from '../../../src'

class App {
  _init() {
    this.app1 = new Koa()
    this.app1.response.msg = 'hello'
    this.app2 = new Koa()
    this.app3 = new Koa()
  }
}

/** @type {Object<string, (a: App, h:Http)>} */
const TS = {
  context: [App, Http],
  async 'merges properties'({ app1 }, { start }) {
    app1.use((ctx) => {
      equal(ctx.response.msg, 'hello')
      ctx.status = 204
    })

    await start(app1.callback())
      .get('/')
      .assert(204)
  },

  async 'does not affect the original prototype'({ app2 }, { start }) {
    app2.use((ctx) => {
      equal(ctx.response.msg, undefined)
      ctx.status = 204
    })

    await start(app2.callback())
      .get('/')
      .assert(204)
  },

  async 'does not include status message in body for http2'({ app3 }, { start }) {
    app3.use((ctx) => {
      ctx.req.httpVersionMajor = 2
      ctx.status = 404
    })
    await start(app3.callback())
      .get('/')
      .assert(404, '404')
  },
}

export default TS