import Goa from '../../../src'

const goa = new Goa()
goa.use((ctx) => {
  /* start example */
  ctx.response.type = '.html'
  ctx.response.type = 'html'
  ctx.response.type = 'json'
  ctx.response.type = 'application/json'
  ctx.response.type = 'png'
  /* end example */
})
