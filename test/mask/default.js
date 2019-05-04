import makeTestSuite from '@zoroaster/mask'
import Context from '../context'
import goa from '../../src'

// export default
makeTestSuite('test/result', {
  async getResults() {
    const res = await goa({
      text: this.input,
    })
    return res
  },
  context: Context,
})