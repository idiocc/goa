// import Koa from '../depack/depack'
import '../types/externs/module'
import Goa, { Context } from '../src'

class MyContext extends Context {
  get hello() {
    return 'world'
  }
}

const app = new Goa({
  Context: MyContext,
})

/**
 * @type {!_goa.Middleware}
 */
async function middleware(ctx) {
  ctx.body = 'hello ' + ctx.hello
  ctx.set('agc', 'def')
}

module.exports = middleware

app.use(middleware)

app.listen(3001, () => {
  console.log('http://localhost:3001')
})

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types').Middleware} _goa.Middleware
 */