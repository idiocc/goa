import Goa from '../../../src'

const goa = new Goa()
goa.use((ctx) => {
  /* start example */
  ctx.response.redirect('back')
  ctx.response.redirect('back', '/index.html')
  ctx.response.redirect('/login')
  ctx.response.redirect('http://google.com')
  /* end example */
})
