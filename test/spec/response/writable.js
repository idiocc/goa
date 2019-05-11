import { equal } from 'assert'
import Context from '../../context'
import { connect } from 'net'

/** @type {TestSuite} */
const TS = {
  context: Context,
  'when continuous requests in one persistent connection': {
    async 'should always writable and response all requests'({ app }) {
      let count = 0
      app.use(ctx => {
        count++
        ctx.body = 'request ' + count + ', writable: ' + ctx.writable
      })

      const server = app.listen()
      await new Promise((r, j) => {
        requestTwice(server, (_, datas) => {
          try {
            const responses = Buffer.concat(datas).toString()
            equal(/request 1, writable: true/.test(responses), true)
            equal(/request 2, writable: true/.test(responses), true)
            r()
          } catch (er) {
            j(er)
          }
        })
      })
      server.close()
    },
  },
  'when socket closed before response sent': {
    async 'should not writable'({ app, sleep }) {
      const p = new Promise((r, j) => {
        app.use(async ctx => {
          await sleep(100)
          if (ctx.writable)
            return j(new Error('ctx.writable should not be true'))
          r()
        })
      })
      const server = app.listen()
      requestClosed(server)
      await p
      server.close()
    },
  },
  'when response finished': {
    async 'should not writable'({ app }) {
      const p = new Promise((r, j) => {
        app.use(ctx => {
          ctx.res.end()
          if (ctx.writable)
            return j(new Error('ctx.writable should not be true'))
          r()
        })
      })
      const server = app.listen()
      request(server)
      await p
      server.close()
    },
  },
}

function requestTwice(server, done){
  const port = server.address().port
  const buf = Buffer.from('GET / HTTP/1.1\r\nHost: localhost:' + port + '\r\nConnection: keep-alive\r\n\r\n')
  const client = connect(port)
  const datas = []
  client
    .on('error', done)
    .on('data', data => datas.push(data))
    .on('end', () => done(null, datas))
  setImmediate(() => client.write(buf))
  setImmediate(() => client.write(buf))
  setTimeout(() => client.end(), 100)
}

function requestClosed(server){
  const port = server.address().port
  const buf = Buffer.from('GET / HTTP/1.1\r\nHost: localhost:' + port + '\r\nConnection: keep-alive\r\n\r\n')
  const client = connect(port)
  setImmediate(() => {
    client.write(buf)
    client.end()
  })
}

function request(server){
  const port = server.address().port
  const buf = Buffer.from('GET / HTTP/1.1\r\nHost: localhost:' + port + '\r\nConnection: keep-alive\r\n\r\n')
  const client = connect(port)
  setImmediate(() => {
    client.write(buf)
  })
  setTimeout(() => {
    client.end()
  }, 100)
}

export default TS

/**
 * @typedef {import('../../context').TestSuite} TestSuite
 */