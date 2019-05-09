import Koa from '../src/application'

const app = new Koa()

app.use(ctx => {
  // ctx
  ctx.body = 'hello world'
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})