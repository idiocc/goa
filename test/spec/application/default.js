import Http from '@contexts/http'
import { equal, throws } from '@zoroaster/assert'
import Koa from '../../../src'

/** @type {Object<string, (h:Http)>} */
const TS = {
  context: Http,
  async 'handles socket errors'({ start }) {
    const app = new Koa()

    app.use((ctx) => {
      // triggers ctx.socket.writable == false
      ctx.socket.emit('error', new Error('boom'))
    })

    const p = new Promise((r, j) => {
      app.on('error', err => {
        try {
          equal(err.message, 'boom')
          r()
        } catch (e) {
          j(e)
        }
      })
    })

    await throws({
      async fn() {
        await start(app.callback())
          .get('/')
      },
      message: /socket hang up/,
    })
    await p
  },

  async 'does not .writeHead when !socket.writable'({ startPlain }) {
    const app = new Koa()

    app.use((ctx) => {
      // set .writable to false
      ctx.socket.writable = false
      ctx.status = 201
    })

    await startPlain((req, res) => {
      const writeHead = res.writeHead.bind(res)
      const end = res.end.bind(res)

      let sent = false
      res.writeHead = res.end = () => {
        sent = true
      }
      app.callback()(req, res)
      setTimeout(() => {
        res.writeHead = writeHead
        res.end = end
        req.socket.writable = true
        if (sent) end('Response sent')
        else end('ok')
      }, 5)
    })
      .get('/')
      .assert(201, 'ok')
  },
  'sets development env when NODE_ENV missing'() {
    const NODE_ENV = process.env.NODE_ENV
    process.env.NODE_ENV = ''
    const app = new Koa()
    process.env.NODE_ENV = NODE_ENV
    equal(app.env, 'development')
  },
}

export default TS