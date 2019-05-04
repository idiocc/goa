import Koa from './lib/application'

const app = new Koa()

app.use(ctx => {
  ctx.body = 'hello world'
})

app.listen(3000)
