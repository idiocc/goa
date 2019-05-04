import { equal, ok } from '@zoroaster/assert'
import Context from '../context'
import goa from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof goa, 'function')
  },
  async 'calls package without error'() {
    await goa()
  },
  async 'gets a link to the fixture'({ fixture }) {
    const text = fixture`text.txt`
    const res = await goa({
      text,
    })
    ok(res, text)
  },
}

export default T