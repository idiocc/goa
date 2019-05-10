import { throws } from 'assert'
import { equal, deepEqual } from '@zoroaster/assert'
import Koa from '../../../src'
import { ConsoleMock } from '../../context'

/** @type {Object<string, (c:ConsoleMock)>} */
const TS = {
  context: [ConsoleMock],

  'throws an error if a non-error is given'() {
    const app = new Koa()

    throws(() => {
      app.onerror('foo')
    }, TypeError, 'non-error thrown: foo')
  },

  'does nothing if status is 404'({ calls }) {
    const app = new Koa()
    const err = new Error()

    err.status = 404

    app.onerror(err)

    deepEqual(calls, [])
  },

  'does nothing if .silent'({ calls }) {
    const app = new Koa()
    app.silent = true
    const err = new Error()

    app.onerror(err)

    deepEqual(calls, [])
  },

  'logs the error to stderr'({ calls }) {
    const app = new Koa()
    app.env = 'dev'

    const err = new Error()
    err.stack = 'Foo'

    app.onerror(err)

    const stderr = calls.join('\n')
    deepEqual(stderr, '\n  Foo\n')
  },

  'uses err.toString() instead of err.stack'({ calls }) {
    const app = new Koa()
    app.env = 'dev'

    const err = new Error('mock stack null')
    err.stack = null

    app.onerror(err)

    const stderr = calls.join('\n')
    equal(stderr, '\n  Error: mock stack null\n')
  },
}

export default TS