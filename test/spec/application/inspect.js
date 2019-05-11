import { deepEqual, equal } from '@zoroaster/assert'
import { inspect } from 'util'
import Context from '../../context'

/** @type {TestSuite} */
const TS = {
  context: Context,
  'works'({ app }) {
    const str = inspect(app)
    equal("{ subdomainOffset: 2, proxy: false, env: 'development' }", str)
  },

  'returns a json representation'({ app }) {
    deepEqual(
      { subdomainOffset: 2, proxy: false, env: 'development' },
      app.inspect()
    )
  },
  toJson({ app }) {
    const obj = app.toJSON()

    deepEqual({
      subdomainOffset: 2,
      proxy: false,
      env: 'development',
    }, obj)
  },
}

export default TS

/**
 * @typedef {import('../../context').TestSuite} TestSuite
 */