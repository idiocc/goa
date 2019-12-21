// import Koa from '../depack/depack'
import '../types/externs/module'
import Koa from '../src/application'

const app = new Koa()

/**
 * @type {!_goa.Middleware}
 */
async function middleware(ctx) {
  ctx.body = 'hello world'
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