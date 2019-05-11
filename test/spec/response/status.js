import assert from 'assert'
import Context from '../../context'

/**
 * @returns {TestSuite}
 */
const makeTs = (status) => {
  return {
    async 'strips content related header fields'({ app, startApp }) {
      app.use(ctx => {
        ctx.body = { foo: 'bar' }
        ctx.set('Content-Type', 'application/json; charset=utf-8')
        ctx.set('Content-Length', '15')
        ctx.set('Transfer-Encoding', 'chunked')
        ctx.status = status
        assert(null == ctx.response.header['content-type'])
        assert(null == ctx.response.header['content-length'])
        assert(null == ctx.response.header['transfer-encoding'])
      })
      await startApp()
        .get('/')
        .assert(status)
        .assert('content-type', null)
        .assert('content-length', null)
        .assert('content-encoding', null)
    },
    async 'strips content related header fields after status set'({ app, startApp }) {
      app.use(ctx => {
        ctx.status = status
        ctx.body = { foo: 'bar' }
        ctx.set('Content-Type', 'application/json; charset=utf-8')
        ctx.set('Content-Length', '15')
        ctx.set('Transfer-Encoding', 'chunked')
      })
      await startApp()
        .get('/', '')
        .assert(status)
        .assert('content-type', null)
        .assert('content-length', null)
        .assert('content-encoding', null)
    },
  }
}

export default {
  context: Context,
  'when 204': makeTs(204),
  'when 205': makeTs(204),
  'when 304': makeTs(204),
}

/**
 * @typedef {import('../../context').TestSuite} TestSuite
 */