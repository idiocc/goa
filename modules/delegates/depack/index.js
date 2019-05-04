import Delegates from '../index'

/**
 * @implements {_ABC}
 */
class ABC {
  constructor() {
    this.response = null
  }
}

new Delegates(ABC.prototype, 'response')
  .getter('hello')
const abc = new ABC()
abc.response = { 'hello': 'world' }
console.log(abc['hello'])