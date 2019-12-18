import Goa from '../../../src'

const goa = new Goa()
goa.use((ctx) => {
  /* start example */
  ctx.response.get('Content-Type') // => "text/plain"
  ctx.response.get('content-type') // => "text/plain"
  /* end example */
})
