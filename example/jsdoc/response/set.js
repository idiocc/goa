import Goa from '../../../src'

const goa = new Goa()
goa.use((ctx) => {
  /* start example */
  ctx.response.set('Foo', ['bar', 'baz'])
  ctx.response.set('Accept', 'application/json')
  ctx.response.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' })
  /* end example */
})
