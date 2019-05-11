import { inspect } from 'util'
import { deepEqual } from '@zoroaster/assert'
import TestingContext from '../../context'

/** @type {Object<string, (c: TestingContext)>} */
const TS = {
  context: TestingContext,
  'returns a json representation'({ ctx }) {
    const toJSON = ctx.toJSON(ctx)

    deepEqual(toJSON, ctx.inspect())
    deepEqual(inspect(toJSON), inspect(ctx))
  },

  // console.log(require.cache) will call prototype.inspect()
  // 'does not crash when called on the prototype'() {
  //   deepEqual(Context.prototype, Context.prototype.inspect())
  //   deepEqual(inspect(Context.prototype.inspect()), inspect(Context.prototype))
  // },
}

/** @type {Object<string, (c: TestingContext)>} */
export const toJson = {
  context: TestingContext,
  'returns JSON'({ ctx }) {
    ctx.req.method = 'POST'
    ctx.req.url = '/items'
    ctx.req.headers['content-type'] = 'text/plain'
    ctx.status = 200
    ctx.body = '<p>Hey</p>'

    const obj = JSON.parse(JSON.stringify(ctx))
    const req = obj.request
    const res = obj.response

    deepEqual({
      method: 'POST',
      url: '/items',
      header: {
        'content-type': 'text/plain',
      },
    }, req)

    deepEqual({
      status: 200,
      message: 'OK',
      header: {
        'content-type': 'text/html; charset=utf-8',
        'content-length': '10',
      },
    }, res)
  },
}

export default TS