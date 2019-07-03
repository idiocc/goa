import Context from '../../context'

/** @type {TestSuite} */
const TS = {
  context: Context,
  'ctx.cookies.set()': {
    async 'sets an unsigned cookie'({ app, startApp }) {
      app.use((ctx) => {
        ctx.cookies.set('name', 'jon')
        ctx.status = 204
      })

      await startApp()
        .get('/')
        .assert(204)
        .value('name', 'jon')
    },
    'with .signed': {
      'when no .keys are set': {
        async 'should error'({ app, startApp }) {
          app.use((ctx) => {
            try {
              ctx.cookies.set('foo', 'bar', { signed: true })
            } catch (err) {
              ctx.body = err.message
            }
          })

          await startApp()
            .get('/')
            .assert(200, '.keys required for signed cookies')
        },
      },
      async 'sends a signed cookie'({ app, startApp }) {
        app.keys = ['a', 'b']

        app.use((ctx) => {
          ctx.cookies.set('name', 'jon', { signed: true })
          ctx.status = 204
        })

        await startApp()
          .get('/')
          .assert(204)
          .value('name', 'jon')
          .value('name.sig', 'FbCmGlw6Fv7VhZ3y8DO7x-Zdjgo')
      },
    },
    'with secure': {
      async 'gets secure from the request'({ app, startApp }) {
        app.proxy = true
        app.keys = ['a', 'b']

        app.use(ctx => {
          ctx.cookies.set('name', 'jon', { signed: true })
          ctx.status = 204
        })

        await startApp()
          .set('x-forwarded-proto', 'https') // mock secure
          .get('/')
          .assert(204)
          .value('name', 'jon')
          .value('name.sig', 'FbCmGlw6Fv7VhZ3y8DO7x-Zdjgo')
          .attributeAndValue('name', 'secure', true)
          .attributeAndValue('name.sig', 'secure', true)
      },
    },
  },
  'ctx.cookies=': {
    async 'overrides cookie work'({ app, startApp }) {
      app.use((ctx) => {
        ctx.cookies = {
          set(key, value){
            ctx.set(key, value)
          },
        }
        ctx.cookies.set('name', 'jon')
        ctx.status = 204
      })

      await startApp()
        .get('/')
        .assert('name', 'jon')
        .assert(204)
    },
  },
}

export default TS

/**
 * @typedef {import('../../context').TestSuite} TestSuite
 */