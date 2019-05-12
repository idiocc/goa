import { deepEqual, throws } from '@zoroaster/assert'
import Context from '../../context'

/** @type {TestSuite} */
export const state = {
  context: Context,
  async 'provides a ctx.state namespace'({ app, startApp }) {
    app.use(ctx => {
      deepEqual(ctx.state, {})
    })

    await startApp()
      .get('/')
      .assert(404)
  },
}

/** @type {TestSuite} */
export const assert = {
  context: Context,
  async 'throws an error'({ makeContext }) {
    const ctx = makeContext()
    await throws({
      fn() {
        ctx.assert(false, 404)
      },
      status: 404,
      expose: true,
    })
  },
}

/**
 * @typedef {import('../../context').TestSuite} TestSuite
 */