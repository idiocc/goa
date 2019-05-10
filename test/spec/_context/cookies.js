import Cookies from '@contexts/http/cookies'
import Koa from '../../../src'

/** @type {TestSuite} */
const TS = {
  context: Cookies,
  'ctx.cookies.set()': {
    async 'sets an unsigned cookie'({ startPlain }) {
      const app = new Koa()

      app.use((ctx) => {
        ctx.cookies.set('name', 'jon')
        ctx.status = 204
      })

      await startPlain(app.callback())
        .get('/')
        .assert(204)
        .value('name', 'jon')
    },

    'with .signed': {
      'when no .keys are set': {
        async 'should error'({ startPlain }) {
          const app = new Koa()

          app.use((ctx) => {
            try {
              ctx.cookies.set('foo', 'bar', { signed: true })
            } catch (err) {
              ctx.body = err.message
            }
          })

          await startPlain(app.callback())
            .get('/')
            .assert(200, '.keys required for signed cookies')
        },
      },

      async 'sends a signed cookie'({ startPlain }) {
        const app = new Koa()

        app.keys = ['a', 'b']

        app.use((ctx) => {
          ctx.cookies.set('name', 'jon', { signed: true })
          ctx.status = 204
        })

        await startPlain(app.callback())
          .get('/')
          .assert(204)
          .value('name', 'jon')
          .value('name.sig', 'FbCmGlw6Fv7VhZ3y8DO7x-Zdjgo')
      },
    },

    'with secure': {
      async 'gets secure from the request'({ startPlain }) {
        const app = new Koa()

        app.proxy = true
        app.keys = ['a', 'b']

        app.use(ctx => {
          ctx.cookies.set('name', 'jon', { signed: true })
          ctx.status = 204
        })

        await startPlain(app.callback())
          .get('/')
          .set('x-forwarded-proto', 'https') // mock secure
          .assert(204)
          .value('name', 'jon')
          .value('name.sig', 'FbCmGlw6Fv7VhZ3y8DO7x-Zdjgo')
          .attributeAndValue('name', 'secure', true)
          .attributeAndValue('name.sig', 'secure', true)
      },
    },
  },

  'ctx.cookies=': {
    async 'overrides cookie work'({ startPlain }) {
      const app = new Koa()

      app.use((ctx) => {
        ctx.cookies = {
          set(key, value){
            ctx.set(key, value)
          },
        }
        ctx.cookies.set('name', 'jon')
        ctx.status = 204
      })

      await startPlain(app.callback())
        .get('/')
        .assert('name', 'jon')
        .assert(204)
    },
  },
}

export default TS

/**
 * @typedef {Object<string, Test&TestSuite2>} TestSuite
 * @typedef {Object<string, Test&TestSuite1>} TestSuite2
 * @typedef {Object<string, Test>} TestSuite1
 * @typedef {(h:Cookies)} Test
 */