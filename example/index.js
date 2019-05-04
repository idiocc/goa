/* alanode example/ */
import goa from '../src'

(async () => {
  const res = await goa({
    text: 'example',
  })
  console.log(res)
})()