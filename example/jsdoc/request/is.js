import Goa from '../../../src'

const goa = new Goa()
goa.use((ctx) => {
  /* start example */
  /// _Examples_:
  /// - With Content-Type: text/html; charset=utf-8
  ctx.request.is('html')
  // => 'html'
  ctx.request.is('text/html')
  // => 'text/html'
  ctx.request.is('text/*', 'application/json')
  // => 'text/html'
  /// - When Content-Type is application/json
  ctx.request.is('json', 'urlencoded')
  // => 'json'
  ctx.request.is('application/json')
  // => 'application/json'
  ctx.request.is('html', 'application/*')
  // => 'application/json'
  ctx.request.is('html')
  // => false
  /* end example */
})
