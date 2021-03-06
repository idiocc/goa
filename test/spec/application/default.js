import Goa from '../../../src'
import { equal, throws, deepEqual } from '@zoroaster/assert'
import Context from '../../context'

/** @type {TestSuite} */
const TS = {
  context: Context,
  async 'handles socket errors'({ app, startApp, expectError }) {
    app.use((ctx) => {
      // triggers ctx.socket.writable == false
      ctx.socket.emit('error', new Error('boom'))
    })

    const p = expectError({ message: 'boom' })

    await throws({
      async fn() {
        await startApp()
          .get('/')
      },
      message: /socket hang up/,
    })
    await p
  },

  async 'does not .writeHead when !socket.writable'({ app, startPlain }) {
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
    const app = new Goa()
    if (NODE_ENV) process.env.NODE_ENV = NODE_ENV
    else delete process.env.NODE_ENV
    equal(app.env, 'development')
  },
  options: {
    'sets env'() {
      const env = 'custom'
      const app = new Goa({ env })
      equal(app.env, env)
    },
    'sets proxy flag'() {
      const proxy = true
      const app = new Goa({ proxy })
      equal(app.proxy, proxy)
    },
    'sets signed cookie keys'() {
      const keys = ['customkey']
      const app = new Goa({ keys })
      deepEqual(app.keys, keys)
    },
    'sets subdomainOffset'() {
      const subdomainOffset = 3
      const app = new Goa({ subdomainOffset })
      deepEqual(app.subdomainOffset, subdomainOffset)
    },
  },
}

export default TS

/**
 * @typedef {import('../../context').TestSuite} TestSuite
 */