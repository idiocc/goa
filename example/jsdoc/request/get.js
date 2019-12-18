import Goa from '../../../src'

const goa = new Goa()
goa.use((ctx) => {
  /* start example */
  ctx.request.get('Content-Type') // => "text/plain"
  ctx.request.get('content-type') //  => "text/plain"
  ctx.request.get('Something') // => undefined
  /* end example */
})