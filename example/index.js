import aqt from '@rqt/aqt'
/* start example */
import Goa from '../src'

const app = new Goa()
app.use((ctx) => {
  ctx.body = 'hello world'
  ctx.
})



















/* end example */
app.listen(async function() {
  const { body } = await aqt('http://localhost:'+this.address().port)
  console.log(body)
  this.close()
})