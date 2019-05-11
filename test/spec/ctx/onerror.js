import { equal } from '@zoroaster/assert'
import Context, { ConsoleMock } from '../../context'

/** @type {TestSuite} */
const TS = {
  context: [Context, ConsoleMock],
  async 'responds'({ app, startPlain }, _) {
    app.use((ctx) => {
      ctx.body = 'something else'

      ctx.throw(418, 'boom')
    })

    await startPlain(app.callback())
      .get('/')
      .assert(418)
      .assert('Content-Type', 'text/plain; charset=utf-8')
      .assert('Content-Length', 4)
  },
  async 'unsets all headers'({ app, startPlain }, _) {
    app.use((ctx) => {
      ctx.set('Vary', 'Accept-Encoding')
      ctx.set('X-CSRF-Token', 'asdf')
      ctx.body = 'response'

      ctx.throw(418, 'boom')
    })

    await startPlain(app.callback())
      .get('/')
      .assert(418)
      .assert('Content-Type', 'text/plain; charset=utf-8')
      .assert('Content-Length', 4)
      .assert('vary', null)
      .assert('x-csrf-token', null)
  },

  async 'sets headers specified in the error'({ app, startPlain }, _) {
    app.use((ctx) => {
      ctx.set('Vary', 'Accept-Encoding')
      ctx.set('X-CSRF-Token', 'asdf')
      ctx.body = 'response'

      throw Object.assign(new Error('boom'), {
        status: 418,
        expose: true,
        headers: {
          'X-New-Header': 'Value',
        },
      })
    })

    await startPlain(app.callback())
      .get('/')
      .assert(418)
      .assert('Content-Type', 'text/plain; charset=utf-8')
      .assert('X-New-Header', 'Value')
      .assert('vary', null)
      .assert('x-csrf-token', null)
  },
  async 'ignores error after headerSent'({ app, start, expectError }, _) {
    const p = expectError({ message: 'mock error', headerSent: true })

    app.use(async ctx => {
      ctx.status = 200
      ctx.set('X-Foo', 'Bar')
      ctx.flushHeaders()
      throw new Error('mock error')
      ctx.body = 'response'
    })

    await start(app.callback())
      .get('/')
      .assert('X-Foo', 'Bar')
      .assert(200)
    await p
  },

  'when invalid err.status': {
    'not number': {
      async 'responds 500'({ app, startPlain }, _) {
        app.use((ctx) => {
          ctx.body = 'something else'
          const err = new Error('some error')
          err.status = 'notnumber'
          throw err
        })

        await startPlain(app.callback())
          .get('/')
          .assert(500, 'Internal Server Error')
          .assert('Content-Type', 'text/plain; charset=utf-8')
      },
    },
    'when ENOENT error': {
      async 'responds 404'({ app, startPlain }, _) {
        app.use((ctx) => {
          ctx.body = 'something else'
          const err = new Error('test for ENOENT')
          err.code = 'ENOENT'
          throw err
        })

        await startPlain(app.callback())
          .get('/')
          .assert(404, 'Not Found')
          .assert('Content-Type', 'text/plain; charset=utf-8')
      },
    },
    'not http status code': {
      async 'responds 500'({ app, startPlain }, _) {
        app.use((ctx) => {
          ctx.body = 'something else'
          const err = new Error('some error')
          err.status = 9999
          throw err
        })

        await startPlain(app.callback())
          .get('/')
          .assert(500, 'Internal Server Error')
          .assert('Content-Type', 'text/plain; charset=utf-8')
      },
    },
  },
  'when non-error thrown': {
    async 'responds with non-error thrown message'({ app, startPlain }, _) {
      app.use(() => {
        throw 'string error'
      })

      await startPlain(app.callback())
        .get('/')
        .assert(500, 'Internal Server Error')
        .assert('Content-Type', 'text/plain; charset=utf-8')
    },

    'uses res.getHeaderNames() accessor when available'({ makeContext }, _) {
      let removed = 0
      const ctx = makeContext()

      ctx.app.emit = () => {}
      ctx.res = {
        getHeaderNames: () => ['content-type', 'content-length'],
        removeHeader: () => removed++,
        end: () => {},
        emit: () => {},
      }

      ctx.onerror(new Error('error'))

      equal(removed, 2)
    },
    async 'stringifies error if it is an object'({ app, startPlain, expectError }, _) {
      const p = expectError('Error: non-error thrown: {"key":"value"}')

      app.use(async () => {
        throw { key: 'value' } // eslint-disable-line no-throw-literal
      })

      await startPlain(app.callback())
        .get('/')
        .assert(500, 'Internal Server Error')
      await p
    },
  },
}

export default TS

/**
 * @typedef {import('../../context').TestSuite} TestSuite
 */