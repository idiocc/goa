import Goa from '../../../src'

const goa = new Goa()
goa.use((ctx) => {
  /* start example */
  ctx.response.append('Link', [
    '<http://localhost>',
    '<http://localhost:3000>',
  ])
  ctx.response.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly')
  ctx.response.append('Warning', '199 Miscellaneous warning')
  /* end example */
})
