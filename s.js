import { createServer, request } from 'http'
import { createReadStream } from 'fs'

const server = createServer((req, res) => {
  console.log('request!')
  createReadStream('package.json').pipe(res)
})
server.listen(() => {
  const url = `http://localhost:${server.address().port}`
  console.log(url)
  const req = request(url, (res) => {
    console.log(res.headers)
    res.destroy()
    server.close()
  })
  req.end()
})