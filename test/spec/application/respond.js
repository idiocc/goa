import { equal, deepEqual } from '@zoroaster/assert'
import { createReadStream, readFileSync } from 'fs'
import Context, { ConsoleMock } from '../../context'
import statuses from '../../../modules/statuses'
import pkg from '../../../package'

/** @type {TestSuite} */
const TS = {
  context: Context,
  persistentContext: ConsoleMock,
  'when ctx.respond === false': {
    async 'should function (ctx)'({ app, startPlain }) {
      app.use(ctx => {
        ctx.body = 'Hello'
        ctx.respond = false

        const { res } = ctx
        res.statusCode = 200
        setImmediate(() => {
          res.setHeader('Content-Type', 'text/plain')
          res.end('lol')
        })
      })

      await startPlain(app.callback())
        .get('/')
        .assert(200, 'lol')
    },

    async 'ignores set header after header sent'({ app, startPlain }) {
      app.use(ctx => {
        ctx.body = 'Hello'
        ctx.respond = false

        const { res } = ctx
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.end('lol')
        ctx.set('foo', 'bar')
      })

      await startPlain(app.callback())
        .get('/')
        .assert(200, 'lol')
        .assert('foo', null)
    },
    async 'ignores set status after header sent'({ app, startPlain }) {
      app.use(ctx => {
        ctx.body = 'Hello'
        ctx.respond = false

        const { res } = ctx
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.end('lol')
        ctx.status = 201
      })

      await startPlain(app.callback())
        .get('/')
        .assert(200, 'lol')
    },
  },

  'when this.type === null': {
    async 'does not send Content-Type header'({ app, startPlain }) {
      app.use(ctx => {
        ctx.body = ''
        ctx.type = null
      })

      await startPlain(app.callback())
        .get('/')
        .assert(200)
        .assert('content-type', null)
    },
  },

  'when HEAD is used': {
    async 'does not respond with the body'({ app, startPlain }) {
      app.use(ctx => {
        ctx.body = 'Hello'
      })

      await startPlain(app.callback())
        .head('/')
        .assert(200, '')
        .assert('content-type', 'text/plain; charset=utf-8')
        .assert('content-length', 5)
    },
    async 'keeps json headers'({ app, startPlain }) {
      app.use(ctx => {
        ctx.body = { hello: 'world' }
      })

      await startPlain(app.callback())
        .head('/')
        .assert(200, '')
        .assert('content-type', 'application/json; charset=utf-8')
        .assert('content-length', 17)
    },

    async 'keeps string headers'({ app, startPlain }) {
      app.use(ctx => {
        ctx.body = 'hello world'
      })

      await startPlain(app.callback())
        .head('/')
        .assert(200, '')
        .assert('content-type', 'text/plain; charset=utf-8')
        .assert('content-length', 11)
    },

    async 'keeps buffer headers'({ app, startPlain }) {
      app.use(ctx => {
        ctx.body = Buffer.from('hello world')
      })

      await startPlain(app.callback())
        .head('/')
        .assert(200, '')
        .assert('content-type', 'application/octet-stream')
        .assert('content-length', 11)
    },

    async 'responds with a 404 if no body was set'({ app, startPlain }) {
      app.use(() => {

      })

      await startPlain(app.callback())
        .head('/')
        .assert(404)
    },

    async 'responds with a 200 if body = ""'({ app, startPlain }) {
      app.use(ctx => {
        ctx.body = ''
      })

      await startPlain(app.callback())
        .head('/')
        .assert(200)
    },

    async 'does not overwrite the content-type'({ app, startPlain }) {
      app.use(ctx => {
        ctx.status = 200
        ctx.type = 'application/javascript'
      })

      await startPlain(app.callback())
        .head('/')
        .assert('content-type', /application\/javascript/)
        .assert(200)
    },
  },

  'when no middleware are present': {
    async 'should 404'({ app, startPlain }) {
      await startPlain(app.callback())
        .get('/')
        .assert(404)
    },
  },

  'when res has already been written to': {
    async 'should not cause an app error'({ app, startPlain }) {
      app.use((ctx) => {
        const { res } = ctx
        ctx.status = 200
        res.setHeader('Content-Type', 'text/html')
        res.write('Hello')
        setTimeout(() => res.end('Goodbye'), 0)
      })

      app.on('error', err => { throw err })

      await startPlain(app.callback())
        .get('/')
        .assert(200)
    },

    async 'sends the right body'({ app, startPlain }) {
      app.use(async (ctx) => {
        const { res } = ctx
        ctx.status = 200
        res.setHeader('Content-Type', 'text/html')
        res.write('Hello')
        await new Promise(resolve => {
          setTimeout(() => {
            res.end('Goodbye')
            resolve()
          }, 0)
        })
      })

      await startPlain(app.callback())
        .get('/')
        .assert(200, 'HelloGoodbye')
    },
  },

  'when .body is missing': {
    'with status=400': {
      async 'responds with the associated status message'({ app, startPlain }) {
        app.use(ctx => {
          ctx.status = 400
        })

        await startPlain(app.callback())
          .get('/')
          .assert(400, 'Bad Request')
          .assert('Content-Length', 11)
      },
    },

    'with status=204': {
      async 'responds without a body'({ app, startPlain }) {
        app.use(ctx => {
          ctx.status = 204
        })

        await startPlain(app.callback())
          .get('/')
          .assert(204, '')
          .assert('content-type', null)
      },
    },

    'with status=205': {
      async 'responds without a body'({ app, startPlain }) {
        app.use(ctx => {
          ctx.status = 205
        })

        await startPlain(app.callback())
          .get('/')
          .assert(205, '')
          .assert('content-type', null)
      },
    },

    'with status=304': {
      async 'responds without a body'({ app, startPlain }) {
        app.use(ctx => {
          ctx.status = 304
        })

        await startPlain(app.callback())
          .get('/')
          .assert(304, '')
          .assert('content-type', null)
      },
    },

    'with custom status=700': {
      async 'responds with the associated status message'({ app, startPlain }) {
        statuses['700'] = 'custom status'

        app.use(ctx => {
          ctx.status = 700
        })

        await startPlain(app.callback())
          .get('/')
          .assert(700, 'custom status')
          .assert(({ statusMessage }) => {
            equal(statusMessage, 'custom status')
          })
      },
    },

    'with custom statusMessage=ok': {
      async 'responds with the custom status message'({ app, startPlain }) {
        app.use(ctx => {
          ctx.status = 200
          ctx.message = 'ok'
        })

        await startPlain(app.callback())
          .get('/')
          .assert(200, 'ok')
          .assert(({ statusMessage }) => {
            equal(statusMessage, 'ok')
          })
      },
    },

    'with custom status without message': {
      async 'responds with the status code number'({ app, startPlain }) {
        app.use(ctx => {
          ctx.res.statusCode = 701
        })

        await startPlain(app.callback())
          .get('/')
          .assert(701, '701')
      },
    },
  },

  'when .body is a null': {
    async 'responds 204 by default'({ app, startPlain }) {
      app.use(ctx => {
        ctx.body = null
      })

      await startPlain(app.callback())
        .get('/')
        .assert(204, '')
        .assert('content-type', null)
    },

    async 'responds 204 with status=200'({ app, startPlain }) {
      app.use(ctx => {
        ctx.status = 200
        ctx.body = null
      })

      await startPlain(app.callback())
        .get('/')
        .assert(204, '')
        .assert('content-type', null)
    },

    async 'responds 205 with status=205'({ app, startPlain }) {
      app.use(ctx => {
        ctx.status = 205
        ctx.body = null
      })

      await startPlain(app.callback())
        .get('/')
        .assert(205, '')
        .assert('content-type', null)
    },

    async 'responds 304 with status=304'({ app, startPlain }) {
      app.use(ctx => {
        ctx.status = 304
        ctx.body = null
      })

      await startPlain(app.callback())
        .get('/')
        .assert(304, '')
        .assert('content-type', null)
    },
  },

  'when .body is a string': {
    async 'responds'({ app, startPlain }) {
      app.use(ctx => {
        ctx.body = 'Hello'
      })

      await startPlain(app.callback())
        .get('/')
        .assert(200, 'Hello')
    },
  },

  'when .body is a Buffer': {
    async 'responds'({ app, startPlain }) {
      app.use(ctx => {
        ctx.body = Buffer.from('Hello')
      })

      await startPlain(app.callback())
        .get('/')
        .assert(200, `${Buffer.from('Hello')}`)
    },
  },

  'when .body is a Stream': {
    async 'responds'({ app, startPlain }) {
      app.use(ctx => {
        ctx.body = createReadStream('package.json')
        ctx.set('Content-Type', 'application/json; charset=utf-8')
      })

      await startPlain(app.callback())
        .get('/')
        .assert('Content-Type', 'application/json; charset=utf-8')
        .assert('content-length', null)
        .assert(({ body }) => {
          deepEqual(body, pkg)
        })
    },

    async 'strips content-length when overwriting'({ app, startPlain }) {
      app.use(ctx => {
        ctx.body = 'hello'
        ctx.body = createReadStream('package.json')
        ctx.set('Content-Type', 'application/json; charset=utf-8')
      })

      await startPlain(app.callback())
        .get('/')
        .assert('Content-Type', 'application/json; charset=utf-8')
        .assert('content-length', null)
        .assert(({ body }) => {
          deepEqual(body, pkg)
        })
    },

    async 'keeps content-length if not overwritten'({ app, startPlain }) {
      const { length } = readFileSync('package.json')
      app.use(ctx => {
        ctx.length = length
        ctx.body = createReadStream('package.json')
        ctx.set('Content-Type', 'application/json; charset=utf-8')
      })

      await startPlain(app.callback())
        .get('/')
        .assert('Content-Type', 'application/json; charset=utf-8')
        .assert('content-length', length)
        .assert(({ body }) => {
          deepEqual(body, pkg)
        })
    },

    async 'keeps content-length if overwritten with the same stream'({ app, startPlain }) {
      const { length } = readFileSync('package.json')

      app.use(ctx => {
        ctx.length = length
        const stream = createReadStream('package.json')
        ctx.body = stream
        ctx.body = stream
        ctx.set('Content-Type', 'application/json; charset=utf-8')
      })

      await startPlain(app.callback())
        .get('/')
        .assert('Content-Type', 'application/json; charset=utf-8')
        .assert('content-length', length)
        .assert(({ body }) => {
          deepEqual(body, pkg)
        })
    },
    async 'handles errors'({ app, startPlain }) {
      app.use(ctx => {
        ctx.set('Content-Type', 'application/json; charset=utf-8')
        ctx.body = createReadStream('does not exist')
      })

      await startPlain(app.callback())
        .get('/')
        .assert('Content-Type', 'text/plain; charset=utf-8')
        .assert(404)
    },

    async 'handles errors when no content status'({ app, startPlain }) {
      app.use(ctx => {
        ctx.status = 204
        ctx.body = createReadStream('does not exist')
      })

      await startPlain(app.callback())
        .get('/')
        .assert(204)
    },
    async 'handles all intermediate stream body errors'({ app, startPlain }) {
      app.use(ctx => {
        ctx.body = createReadStream('does not exist')
        ctx.body = createReadStream('does not exist')
        ctx.body = createReadStream('does not exist')
      })

      await startPlain(app.callback())
        .get('/')
        .assert(404)
    },
  },

  'when .body is an Object': {
    async 'responds with json'({ app, startPlain }) {
      const body = { hello: 'world' }

      app.use(ctx => {
        ctx.body = body
      })

      await startPlain(app.callback())
        .get('/')
        .assert('Content-Type', 'application/json; charset=utf-8', body)
    },
  },

  'when an error occurs': {
    async 'emits "error" on the app'({ app, startPlain, expectError }) {
      app.use(() => {
        throw new Error('boom')
      })

      const p = expectError({ message: 'boom' })

      await startPlain(app.callback())
        .get('/')
      await p
    },

    'with an .expose property': {
      async ' expose the message'({ app, startPlain }) {
        app.use(() => {
          const err = new Error('sorry!')
          err.status = 403
          err.expose = true
          throw err
        })

        await startPlain(app.callback())
          .get('/')
          .assert(403, 'sorry!')
      },
    },

    'with a .status property': {
      async 'responds with .status'({ app, startPlain }) {
        app.use(() => {
          const err = new Error('s3 explodes')
          err.status = 403
          throw err
        })

        await startPlain (app.callback())
          .get('/')
          .assert(403, 'Forbidden')
      },
    },

    async 'responds with 500'({ app, startPlain }) {
      app.use(() => {
        throw new Error('boom!')
      })

      await startPlain(app.callback())
        .get('/')
        .assert(500, 'Internal Server Error')
    },

    async 'is catchable'({ app, startPlain }) {
      app.use((ctx, next) => {
        return next().then(() => {
          ctx.body = 'Hello'
        }).catch(() => {
          ctx.body = 'Got error'
        })
      })

      app.use(() => {
        throw new Error('boom!')
      })

      await startPlain(app.callback())
        .get('/')
        .assert(200, 'Got error')
    },
  },

  'when status and body property': {
    async 'should 200'({ app, startPlain }) {
      app.use(ctx => {
        ctx.status = 304
        ctx.body = 'hello'
        ctx.status = 200
      })

      await startPlain(app.callback())
        .get('/')
        .assert(200, 'hello')
    },

    async 'should 204'({ app, startPlain }) {
      app.use(ctx => {
        ctx.status = 200
        ctx.body = 'hello'
        ctx.set('content-type', 'text/plain; charset=utf8')
        ctx.status = 204
      })

      await startPlain(app.callback())
        .get('/')
        .assert(204)
        .assert('content-type', null)
    },
  },
}

export default TS

/**
 * @typedef {import('../../context').TestSuite} TestSuite
 */