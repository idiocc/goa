import Goa from '../../../src'

const goa = new Goa()
goa.use((ctx) => {
  /* start example */
  ctx.assert(ctx.user, 401, 'Please login!')
  /* end example */
})