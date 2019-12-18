import Goa from '../../../src'

const goa = new Goa()
goa.use((ctx) => {
  /* start example */
  ctx.response.lastModified = new Date()
  ctx.response.lastModified = '2013-09-13'
  /* end example */
})
