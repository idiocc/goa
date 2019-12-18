import Goa from '../../../src'

const goa = new Goa()
goa.use((ctx) => {
  /* start example */
  ctx.throw(403)
  ctx.throw(400, 'name required')
  ctx.throw('something exploded')
  ctx.throw(new Error('invalid'))
  ctx.throw(400, new Error('invalid'))
  /* end example */
})