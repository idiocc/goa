import { throws } from 'assert'
import { deepEqual, assert, equal } from '@zoroaster/assert'
import Context from '../../context'
import Stream, { PassThrough } from 'stream'
import { inspect } from 'util'
import { createReadStream } from 'fs'
import { request } from 'http'

export { Context as context }

/** @type {TestSuite} */
export const append = {
  'appends multiple headers'({ ctx }) {
    ctx.append('x-foo', 'bar1')
    ctx.append('x-foo', 'bar2')
    deepEqual(ctx.response.header['x-foo'], ['bar1', 'bar2'])
  },
  'accepts array of values'({ ctx }) {
    ctx.append('Set-Cookie', ['foo=bar', 'fizz=buzz'])
    ctx.append('Set-Cookie', 'hi=again')
    deepEqual(ctx.response.header['set-cookie'], ['foo=bar', 'fizz=buzz', 'hi=again'])
  },
  'gets reset by res.set(field, val)'({ ctx }) {
    ctx.append('Link', '<http://localhost/>')
    ctx.append('Link', '<http://localhost:80/>')

    ctx.set('Link', '<http://127.0.0.1/>')

    equal(ctx.response.header.link, '<http://127.0.0.1/>')
  },
  'works with res.set(field, val) first'({ ctx }) {
    ctx.set('Link', '<http://localhost/>')
    ctx.append('Link', '<http://localhost:80/>')

    deepEqual(ctx.response.header.link, ['<http://localhost/>', '<http://localhost:80/>'])
  },
}

/** @type {TestSuite} */
export const attachment = {
  'when given a filename': {
    'sets the filename param'({ ctx }) {
      ctx.attachment('path/to/tobi.png')
      const str = 'attachment; filename="tobi.png"'
      equal(ctx.response.header['content-disposition'], str)
    },
  },
  'when omitting filename': {
    'does not set filename param'({ ctx }) {
      ctx.attachment()
      equal(ctx.response.header['content-disposition'], 'attachment')
    },
  },
  'when given a no-ascii filename': {
    'sets the encodeURI filename param'({ ctx }) {
      ctx.attachment('path/to/include-no-ascii-char-中文名-ok.png')
      const str = 'attachment; filename="include-no-ascii-char-???-ok.png"; filename*=UTF-8\'\'include-no-ascii-char-%E4%B8%AD%E6%96%87%E5%90%8D-ok.png'
      equal(ctx.response.header['content-disposition'], str)
    },
    async 'works with http client'({ app, startApp }) {
      app.use((ctx) => {
        ctx.attachment('path/to/include-no-ascii-char-中文名-ok.json')
        ctx.body = { foo: 'bar' }
      })

      await startApp()
        .get('/')
        .assert('content-disposition', 'attachment; filename="include-no-ascii-char-???-ok.json"; filename*=UTF-8\'\'include-no-ascii-char-%E4%B8%AD%E6%96%87%E5%90%8D-ok.json')
        .assert(200, { foo: 'bar' })
    },
  },
}

/** @type {TestSuite} */
export const contentDisposition = {
  'with "fallback" option': {
    'requires a string or Boolean'({ ctx }) {
      throws(() => { ctx.attachment('plans.pdf', { fallback: 42 }) },
        /fallback.*string/)
    },
    'defaults to true'({ ctx }) {
      ctx.attachment('€ rates.pdf')
      equal(ctx.response.header['content-disposition'],
        'attachment; filename="? rates.pdf"; filename*=UTF-8\'\'%E2%82%AC%20rates.pdf')
    },
    'when "false"': {
      'does not generate ISO-8859-1 fallback'({ ctx }) {
        ctx.attachment('£ and € rates.pdf', { fallback: false })
        equal(ctx.response.header['content-disposition'],
          'attachment; filename*=UTF-8\'\'%C2%A3%20and%20%E2%82%AC%20rates.pdf')
      },
      'keeps ISO-8859-1 filename'({ ctx }) {
        ctx.attachment('£ rates.pdf', { fallback: false })
        equal(ctx.response.header['content-disposition'],
          'attachment; filename="£ rates.pdf"')
      },
    },
    'when "true"': {
      'generates ISO-8859-1 fallback'({ ctx }) {
        ctx.attachment('£ and € rates.pdf', { fallback: true })
        equal(ctx.response.header['content-disposition'],
          'attachment; filename="£ and ? rates.pdf"; filename*=UTF-8\'\'%C2%A3%20and%20%E2%82%AC%20rates.pdf')
      },
      'passes through ISO-8859-1 filename'({ ctx }) {
        ctx.attachment('£ rates.pdf', { fallback: true })
        equal(ctx.response.header['content-disposition'],
          'attachment; filename="£ rates.pdf"')
      },
    },
    'when a string': {
      'requires an ISO-8859-1 string'({ ctx }) {
        throws(() => { ctx.attachment('€ rates.pdf', { fallback: '€ rates.pdf' }) },
          /fallback.*iso-8859-1/i)
      },
      'uses as ISO-8859-1 fallback'({ ctx }) {
        ctx.attachment('£ and € rates.pdf', { fallback: '£ and EURO rates.pdf' })
        equal(ctx.response.header['content-disposition'],
          'attachment; filename="£ and EURO rates.pdf"; filename*=UTF-8\'\'%C2%A3%20and%20%E2%82%AC%20rates.pdf')
      },
      'uses as fallback even when filename is ISO-8859-1'({ ctx }) {
        ctx.attachment('"£ rates".pdf', { fallback: '£ rates.pdf' })
        equal(ctx.response.header['content-disposition'],
          'attachment; filename="£ rates.pdf"; filename*=UTF-8\'\'%22%C2%A3%20rates%22.pdf')
      },
      'does nothing if equal to filename'({ ctx }) {
        ctx.attachment('plans.pdf', { fallback: 'plans.pdf' })
        equal(ctx.response.header['content-disposition'],
          'attachment; filename="plans.pdf"')
      },
      'uses the basename of the string'({ ctx }) {
        ctx.attachment('€ rates.pdf', { fallback: '/path/to/EURO rates.pdf' })
        equal(ctx.response.header['content-disposition'],
          'attachment; filename="EURO rates.pdf"; filename*=UTF-8\'\'%E2%82%AC%20rates.pdf')
      },
      'does nothing without filename option'({ ctx }) {
        ctx.attachment(undefined, { fallback: 'plans.pdf' })
        equal(ctx.response.header['content-disposition'],
          'attachment')
      },
    },
  },
  'with "type" option': {
    'defaults to attachment'({ ctx }) {
      ctx.attachment()
      equal(ctx.response.header['content-disposition'],
        'attachment')
    },
    'requires a string'({ ctx }) {
      throws(() => { ctx.attachment(undefined, { type: 42 }) },
        /invalid type/)
    },
    'requires a valid type'({ ctx }) {
      throws(() => { ctx.attachment(undefined, { type: 'invlaid;type' }) },
        /invalid type/)
    },
    'creates a header with inline type'({ ctx }) {
      ctx.attachment(undefined, { type: 'inline' })
      equal(ctx.response.header['content-disposition'],
        'inline')
    },
    'creates a header with inline type & filename'({ ctx }) {
      ctx.attachment('plans.pdf', { type: 'inline' })
      equal(ctx.response.header['content-disposition'],
        'inline; filename="plans.pdf"')
    },
    'normalizes type'({ ctx }) {
      ctx.attachment(undefined, { type: 'INLINE' })
      equal(ctx.response.header['content-disposition'],
        'inline')
    },
  },
}

/** @type {TestSuite} */
export const body = {
  'when Content-Type is set': {
    'does not override'({ res }) {
      res.type = 'png'
      res.body = Buffer.from('something')
      equal('image/png', res.header['content-type'])
    },
    'when body is an object': {
      'overrides as json'({ res }) {
        res.body = '<em>hey</em>'
        equal('text/html; charset=utf-8', res.header['content-type'])

        res.body = { foo: 'bar' }
        equal('application/json; charset=utf-8', res.header['content-type'])
      },
    },
    'overrides length'({ res }) {
      res.type = 'html'
      res.body = 'something'
      equal(res.length, 9)
    },
  },
  'when a string is given': {
    'defaults to text'({ res }) {
      res.body = 'Tobi'
      equal('text/plain; charset=utf-8', res.header['content-type'])
    },
    'sets length'({ res }) {
      res.body = 'Tobi'
      equal('4', res.header['content-length'])
    },
    'and contains a non-leading <': {
      'defaults to text'({ res }) {
        res.body = 'aklsdjf < klajsdlfjasd'
        equal('text/plain; charset=utf-8', res.header['content-type'])
      },
    },
  },
  'when an html string is given': {
    'defaults to html'({ res }) {
      res.body = '<h1>Tobi</h1>'
      equal('text/html; charset=utf-8', res.header['content-type'])
    },
    'sets length'({ res }) {
      const string = '<h1>Tobi</h1>'
      res.body = string
      equal(res.length, Buffer.byteLength(string))
    },
    'sets length when body is overridden'({ res }) {
      const string = '<h1>Tobi</h1>'
      res.body = string
      res.body = string + string
      equal(res.length, 2 * Buffer.byteLength(string))
    },
    'when it contains leading whitespace': {
      'defaults to html'({ res }) {
        res.body = '    <h1>Tobi</h1>'
        equal('text/html; charset=utf-8', res.header['content-type'])
      },
    },
  },
  'when an xml string is given': {
    'defaults to html'({ res }) {
      /**
       * ctx test is to show that we're not going
       * to be stricter with the html sniff
       * or that we will sniff other string types.
       * You should `.type=` if ctx simple test fails.
       */

      res.body = '<?xml version="1.0" encoding="UTF-8"?>\n<俄语>данные</俄语>'
      equal('text/html; charset=utf-8', res.header['content-type'])
    },
  },
  'when a stream is given': {
    'defaults to an octet stream'({ res }) {
      res.body = createReadStream('LICENSE')
      equal('application/octet-stream', res.header['content-type'])
    },
  },
  'when a buffer is given': {
    'defaults to an octet stream'({ res }) {
      res.body = Buffer.from('hey')
      equal('application/octet-stream', res.header['content-type'])
    },
    'sets length'({ res }) {
      res.body = Buffer.from('Tobi')
      equal('4', res.header['content-length'])
    },
  },
  'when an object is given': {
    'defaults to json'({ res }) {
      res.body = { foo: 'bar' }
      equal('application/json; charset=utf-8', res.header['content-type'])
    },
  },
}
/** @type {TestSuite} */
export const etag = {
  'should not modify an etag with quotes'({ res }) {
    res.etag = '"asdf"'
    equal(res.header.etag, '"asdf"')
  },
  'should not modify a weak etag'({ res }) {
    res.etag = 'W/"asdf"'
    equal(res.header.etag, 'W/"asdf"')
  },
  'should add quotes around an etag if necessary'({ res }) {
    res.etag = 'asdf'
    equal(res.header.etag, '"asdf"')
  },
  'returns etag'({ res }) {
    res.etag = '"asdf"'
    equal(res.etag, '"asdf"')
  },
}

/** @type {TestSuite} */
export const flushHeaders = {
  async 'sets headersSent'({ app, startApp }) {
    app.use((ctx) => {
      ctx.body = 'Body'
      ctx.status = 200
      ctx.flushHeaders()
      equal(ctx.res.headersSent, true)
    })
    await startApp()
      .get('/')
      .assert(200, 'Body')
  },
  async 'allows a response afterwards'({ app, startApp }) {
    app.use((ctx) => {
      ctx.status = 200
      ctx.res.setHeader('Content-Type', 'text/plain')
      ctx.flushHeaders()
      ctx.body = 'Body'
    })

    await startApp()
      .get('/')
      .assert(200, 'Body')
      .assert('Content-Type', 'text/plain')
  },
  async 'should send the correct status code'({ app, startApp }) {
    app.use((ctx) => {
      ctx.status = 401
      ctx.res.setHeader('Content-Type', 'text/plain')
      ctx.flushHeaders()
      ctx.body = 'Body'
    })

    await startApp()
      .get('/')
      .assert(401, 'Body')
      .assert('Content-Type', 'text/plain')
  },

  async 'should ignore set header after flushHeaders'({ app, startApp }) {
    app.use((ctx) => {
      ctx.status = 401
      ctx.res.setHeader('Content-Type', 'text/plain')
      ctx.flushHeaders()
      ctx.body = 'foo'
      ctx.set('X-Shouldnt-Work', 'Value')
      ctx.remove('Content-Type')
      ctx.vary('Content-Type')
    })

    await startApp()
      .get('/')
      .assert(401)
      .assert('Content-Type', 'text/plain')
      .assert('x-shouldnt-work', null)
      .assert('vary', null)
  },

  async 'flushes headers first and delay to send data'({ app }) {
    let t, s
    app.use(ctx => {
      ctx.type = 'json'
      ctx.status = 200
      ctx.headers['Link'] = '</css/mycss.css>; as=style; rel=preload, <https://img.craftflair.com>; rel=preconnect; crossorigin'
      s = ctx.body = new PassThrough()
      ctx.flushHeaders()

      t = setTimeout(() => {
        s.end(JSON.stringify({ message: 'hello!' }))
      }, 100)
    })

    await new Promise((r, j) => {
      app.listen(function () {
        const port = this.address().port
        request({
          port,
        })
          .on('response', res => {
            const onData = () => j(new Error('boom'))
            res.on('data', onData)

            // shouldn't receive any data for a while
            setTimeout(() => {
              res.removeListener('data', onData)
              this.close()
              clearTimeout(t)
              s.end()
              r()
            }, 50)
          })
          .on('error', j)
          .end()
      })
    })
  },

  async 'catches stream error'({ app, expectError, startApp }) {
    const p = expectError({ message: 'mock error' })

    app.use(ctx => {
      ctx.type = 'json'
      ctx.status = 200
      ctx.headers['Link'] = '</css/mycss.css>; as=style; rel=preload, <https://img.craftflair.com>; rel=preconnect; crossorigin'
      ctx.length = 20
      ctx.flushHeaders()
      const stream = ctx.body = new PassThrough()

      setTimeout(() => {
        stream.emit('error', new Error('mock error'))
        stream.end()
      }, 10)
    })
    await startApp()
      .get('/')
    await p
  },
}
/** @type {TestSuite} */
export const header = {
  'returns the response header object'({ res }) {
    res.set('X-Foo', 'bar')
    res.set('X-Number', 200)
    deepEqual(res.header, { 'x-foo': 'bar', 'x-number': '200' })
  },
  'uses res.getHeaders() accessor when available'({ res }) {
    res.res._headers = null
    res.res.getHeaders = () => ({ 'x-foo': 'baz' })
    deepEqual(res.header, { 'x-foo': 'baz' })
  },

  async 'returns the response header object when no mocks are in use'({ app, startApp }) {
    let h

    app.use(ctx => {
      ctx.set('x-foo', '42')
      h = Object.assign({}, ctx.response.header)
    })

    await startApp()
      .get('/')

    deepEqual(h, { 'x-foo': '42' })
  },
  // 'when res._headers not present': {
  //   '!returns empty object'({ res }) {
  //     res.res._headers = null
  //     deepEqual(res.header, {})
  //   },
  // },
}
/** @type {TestSuite} */
export const headers = {
  'returns the response header object'({ res }) {
    res.set('X-Foo', 'bar')
    deepEqual(res.headers, { 'x-foo': 'bar' })
  },
  // 'when res._headers not present': {
  //   'returns empty object'({ res }) {
  //     res.res._headers = null
  //     deepEqual(res.headers, {})
  //   },
  // },
}

/** @type {TestSuite} */
export const Inspect = {
  'with no response.res present': {
    'returns null'({ res }) {
      res.body = 'hello'
      delete res.res
      equal(res.inspect(), null)
      equal(inspect(res), 'undefined')
    },
  },
  'returns a json representation'({ res }) {
    res.body = 'hello'

    const expected = {
      status: 200,
      message: 'OK',
      header: {
        'content-type': 'text/plain; charset=utf-8',
        'content-length': '5',
      },
      body: 'hello',
    }

    deepEqual(res.inspect(), expected)
    deepEqual(inspect(res), inspect(expected))
  },
}

/** @type {TestSuite} */
export const is = {
  'ignores params'({ res }) {
    res.type = 'text/html; charset=utf-8'
    equal(res.is('text/*'), 'text/html')
  },
  'when no type is set': {
    'returns false'({ res }) {
      equal(res.is(), false)
      equal(res.is('html'), false)
    },
  },
  'when given no types': {
    'returns the type'({ res }) {
      res.type = 'text/html; charset=utf-8'

      equal(res.is(), 'text/html')
    },
  },
  'given one type': {
    'returns the type or false'({ res }) {
      res.type = 'image/png'

      equal(res.is('png'), 'png')
      equal(res.is('.png'), '.png')
      equal(res.is('image/png'), 'image/png')
      equal(res.is('image/*'), 'image/png')
      equal(res.is('*/png'), 'image/png')

      equal(res.is('jpeg'), false)
      equal(res.is('.jpeg'), false)
      equal(res.is('image/jpeg'), false)
      equal(res.is('text/*'), false)
      equal(res.is('*/jpeg'), false)
    },
  },
  'given multiple types': {
    'returns the first match or false'({ res }) {
      res.type = 'image/png'

      equal(res.is('png'), 'png')
      equal(res.is('.png'), '.png')
      equal(res.is('text/*', 'image/*'), 'image/png')
      equal(res.is('image/*', 'text/*'), 'image/png')
      equal(res.is('image/*', 'image/png'), 'image/png')
      equal(res.is('image/png', 'image/*'), 'image/png')

      equal(res.is(['text/*', 'image/*']), 'image/png')
      equal(res.is(['image/*', 'text/*']), 'image/png')
      equal(res.is(['image/*', 'image/png']), 'image/png')
      equal(res.is(['image/png', 'image/*']), 'image/png')

      equal(res.is('jpeg'), false)
      equal(res.is('.jpeg'), false)
      equal(res.is('text/*', 'application/*'), false)
      equal(res.is('text/html', 'text/plain', 'application/json; charset=utf-8'), false)
    },
  },
  'when Content-Type: application/x-www-form-urlencoded': {
    'should match "urlencoded"'({ res }) {
      res.type = 'application/x-www-form-urlencoded'

      equal(res.is('urlencoded'), 'urlencoded')
      equal(res.is('json', 'urlencoded'), 'urlencoded')
      equal(res.is('urlencoded', 'json'), 'urlencoded')
    },
  },
}

/** @type {TestSuite} */
export const lastModified = {
  'sets the header as a UTCString'({ res }) {
    const date = new Date()
    res.lastModified = date
    equal(res.header['last-modified'], date.toUTCString())
  },
  'works with date strings'({ res }) {
    const date = new Date()
    res.lastModified = date.toString()
    equal(res.header['last-modified'], date.toUTCString())
  },
  'gets the header as a Date'({ res }) {
    // Note: Date() removes milliseconds, but it's practically important.
    const date = new Date()
    res.lastModified = date
    equal((res.lastModified.getTime() / 1000), Math.floor(date.getTime() / 1000))
  },
  'when lastModified not set': {
    'gets undefined'({ res }) {
      equal(res.lastModified, undefined)
    },
  },
}

/** @type {TestSuite} */
export const length = {
  'when Content-Length is defined': {
    'returns a number'({ res }) {
      res.header['content-length'] = '120'
      equal(res.length, 120)
    },
  },
  'when content-length is defined': {
    'returns a number'({ res }) {
      res.set('Content-Length', '1024')
      equal(res.length, 1024)
    },
  },
  'when Content-Length is not defined': {
    'and a .body is set': {
      'returns a number'({ res }) {
        res.body = 'foo'
        res.remove('Content-Length')
        equal(res.length, 3)

        res.body = 'foo'
        equal(res.length, 3)

        res.body = Buffer.from('foo bar')
        res.remove('Content-Length')
        equal(res.length, 7)

        res.body = Buffer.from('foo bar')
        equal(res.length, 7)

        res.body = { hello: 'world' }
        res.remove('Content-Length')
        equal(res.length, 17)

        res.body = { hello: 'world' }
        equal(res.length, 17)

        res.body = createReadStream('package.json')
        equal(res.length, undefined)

        res.body = null
        equal(res.length, undefined)
      },
    },
    'and .body is not': {
      'returns undefined'({ res }) {
        equal(res.length, undefined)
      },
    },
  },
}

/** @type {TestSuite} */
export const message = {
  'returns the response status message'({ res }) {
    res.status = 200
    equal(res.message, 'OK')
  },
  'when res.message not present': {
    'should look up in statuses'({ res }) {
      res.res.statusCode = 200
      equal(res.message, 'OK')
    },
  },
  '=': {
    'sets response status message'({ res }) {
      res.status = 200
      res.message = 'ok'
      equal(res.res.statusMessage, 'ok')
      equal(res.inspect().message, 'ok')
    },
  },
}

/** @type {TestSuite} */
export const redirect = {
  'should redirect to the given url'({ ctx }) {
    ctx.redirect('http://google.com')
    equal(ctx.response.header.location, 'http://google.com')
    equal(ctx.status, 302)
  },
  'with "back"': {
    'should redirect to Referrer'({ ctx }) {
      ctx.req.headers.referrer = '/login'
      ctx.redirect('back')
      equal(ctx.response.header.location, '/login')
    },
    'should redirect to Referer'({ ctx }) {
      ctx.req.headers.referer = '/login'
      ctx.redirect('back')
      equal(ctx.response.header.location, '/login')
    },
    'defaults to alt'({ ctx }) {
      ctx.redirect('back', '/index.html')
      equal(ctx.response.header.location, '/index.html')
    },
    'defaults redirect to /'({ ctx }) {
      ctx.redirect('back')
      equal(ctx.response.header.location, '/')
    },
  },
  'when html is accepted': {
    'responds with html'({ ctx }) {
      const url = 'http://google.com'
      ctx.header.accept = 'text/html'
      ctx.redirect(url)
      equal(ctx.response.header['content-type'], 'text/html; charset=utf-8')
      equal(ctx.body, `Redirecting to <a href="${url}">${url}</a>.`)
    },
    'escapes the url'({ ctx, escape }) {
      let url = '<script>'
      ctx.header.accept = 'text/html'
      ctx.redirect(url)
      url = escape(url)
      equal(ctx.response.header['content-type'], 'text/html; charset=utf-8')
      equal(ctx.body, `Redirecting to <a href="${url}">${url}</a>.`)
    },
  },
  'when text is accepted': {
    'responds with text'({ ctx }) {
      const url = 'http://google.com'
      ctx.header.accept = 'text/plain'
      ctx.redirect(url)
      equal(ctx.body, `Redirecting to ${url}.`)
    },
  },
  'when status is 301': {
    'does not change the status code'({ ctx }) {
      const url = 'http://google.com'
      ctx.status = 301
      ctx.header.accept = 'text/plain'
      ctx.redirect('http://google.com')
      equal(ctx.status, 301)
      equal(ctx.body, `Redirecting to ${url}.`)
    },
  },
  'when status is 304': {
    'changes the status code'({ ctx }) {
      const url = 'http://google.com'
      ctx.status = 304
      ctx.header.accept = 'text/plain'
      ctx.redirect('http://google.com')
      equal(ctx.status, 302)
      equal(ctx.body, `Redirecting to ${url}.`)
    },
  },
  'when content-type was present': {
    'overwrites content-type'({ ctx }) {
      ctx.body = {}
      const url = 'http://google.com'
      ctx.header.accept = 'text/plain'
      ctx.redirect('http://google.com')
      equal(ctx.status, 302)
      equal(ctx.body, `Redirecting to ${url}.`)
      equal(ctx.type, 'text/plain')
    },
  },
}

/** @type {TestSuite} */
export const remove = {
  'removes a field'({ ctx }) {
    ctx.set('x-foo', 'bar')
    ctx.remove('x-foo')
    deepEqual(ctx.response.header, {})
  },
}

/** @type {TestSuite} */
export const set = {
  'sets a field value'({ ctx }) {
    ctx.set('x-foo', 'bar')
    equal(ctx.response.header['x-foo'], 'bar')
  },
  'coerces number to string'({ ctx }) {
    ctx.set('x-foo', 5)
    equal(ctx.response.header['x-foo'], '5')
  },
  'coerces undefined to string'({ ctx }) {
    ctx.set('x-foo', undefined)
    equal(ctx.response.header['x-foo'], 'undefined')
  },
  'sets a field value of array'({ ctx }) {
    ctx.set('x-foo', ['foo', 'bar'])
    deepEqual(ctx.response.header['x-foo'], [ 'foo', 'bar' ])
  },
  'sets multiple fields'({ ctx }) {
    ctx.set({
      foo: '1',
      bar: '2',
    })

    equal(ctx.response.header.foo, '1')
    equal(ctx.response.header.bar, '2')
  },
}

/** @type {TestSuite} */
export const socket = {
  'returns the request socket object'({ res }) {
    equal(res.socket instanceof Stream, true)
  },
}

/** @type {TestSuite} */
export const status = {
  'when a status code': {
    'and valid': {
      'sets the status'({ res }) {
        res.status = 403
        equal(res.status, 403)
      },
      'should not throw'({ Response }) {
        Response().status = 403
      },
    },
    'and invalid': {
      'should throw'({ Response }) {
        throws(() => {
          Response().status = 99
        }, /invalid status code: 99/)
      },
    },
    'and custom status': {
      'sets the status'({ res }) {
        res.status = 700
        equal(res.status, 700)
      },
      'should not throw'({ Response }) {
        Response().status = 700
      },
    },
    'and HTTP/2': {
      'does not set the status message'({ Response }) {
        const res = Response({
          'httpVersionMajor': 2,
          'httpVersion': '2.0',
        })
        res.status = 200
        assert(!res.res.statusMessage)
      },
    },
  },
  'when a status string': {
    'should throw'({ Response }) {
      throws(() => Response().status = 'forbidden', /status code must be a number/)
    },
  },
}

/** @type {TestSuite} */
export const type = {
  '=': {
    'with a mime': {
      'sets the Content-Type'({ ctx }) {
        ctx.type = 'text/plain'
        equal(ctx.type, 'text/plain')
        equal(ctx.response.header['content-type'], 'text/plain; charset=utf-8')
      },
    },
    'with an extension': {
      'should lookup the mime'({ ctx }) {
        ctx.type = 'json'
        equal(ctx.type, 'application/json')
        equal(ctx.response.header['content-type'], 'application/json; charset=utf-8')
      },
    },
    'without a charset': {
      'defaults the charset'({ ctx }) {
        ctx.type = 'text/html'
        equal(ctx.type, 'text/html')
        equal(ctx.response.header['content-type'], 'text/html; charset=utf-8')
      },
    },
    'with a charset': {
      'should not default the charset'({ ctx }) {
        ctx.type = 'text/html; charset=foo'
        equal(ctx.type, 'text/html')
        equal(ctx.response.header['content-type'], 'text/html; charset=foo')
      },
    },
    'with an unknown extension': {
      'does not set a content-type'({ ctx }) {
        ctx.type = 'asdf'
        assert(!ctx.type)
        assert(!ctx.response.header['content-type'])
      },
    },
  },
  'with no Content-Type': {
    'returns ""'({ ctx }) {
      assert(!ctx.type)
    },
  },
  'with a Content-Type': {
    'returns the mime'({ ctx }) {
      ctx.type = 'json'
      equal(ctx.type, 'application/json')
    },
  },
}

/** @type {TestSuite} */
export const vary = {
  'when Vary is not set': {
    'sets it'({ ctx }) {
      ctx.vary('Accept')
      equal(ctx.response.header.vary, 'Accept')
    },
  },
  'when Vary is set': {
    'appends'({ ctx }) {
      ctx.vary('Accept')
      ctx.vary('Accept-Encoding')
      equal(ctx.response.header.vary, 'Accept, Accept-Encoding')
    },
  },
  'when Vary already contains the value': {
    'should not append'({ ctx }) {
      ctx.vary('Accept')
      ctx.vary('Accept-Encoding')
      ctx.vary('Accept')
      ctx.vary('Accept-Encoding')
      equal(ctx.response.header.vary, 'Accept, Accept-Encoding')
    },
  },
}

/**
 * @typedef {import('../../context').TestSuite} TestSuite
 */