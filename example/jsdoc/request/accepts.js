import Goa from '../../../src'

const goa = new Goa()
goa.use((ctx) => {
  /* start example */
  /// _Examples:_
  /// - Accept: text/html
  ctx.request.accepts('html')
  // => "html"
  /// - Accept: text/*, application/json
  ctx.request.accepts('html')
  // => "html"
  ctx.request.accepts('text/html')
  // => "text/html"
  ctx.request.accepts('json', 'text')
  // => "json"
  ctx.request.accepts('application/json')
  // => "application/json"
  /// - Accept: text/*, application/json
  ctx.request.accepts('image/png')
  // => false
  ctx.request.accepts('png')
  // => false
  /// - Accept: text/*;q=.5, application/json
  ctx.request.accepts(['html', 'json'])
  // => "json"
  ctx.request.accepts('html', 'json')
  // => "json"
  /// - Accept: application/*;q=0.2, image/jpeg;q=0.8, text/html, text/plain
  ctx.request.accepts([
    "text/html", "text/plain",
    "image/jpeg", "application/*",
  ])
  /* end example */
})
