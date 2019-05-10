import { deepEqual, equal } from '@zoroaster/assert'
import Koa from '../../../src'
import { inspect } from 'util'

/** @type {Object<string, (a: App, h:Http)>} */
const TS = {
  context: class {
    _init() {
      this.app = new Koa()
    }
  },
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