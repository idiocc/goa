import { deepEqual, assert, equal } from '@zoroaster/assert'
import Accept from '@goa/accepts'
import Context from '../../context'
import { Duplex, Readable } from 'stream'
import { inspect } from 'util'
import { get } from 'http'
import parseurl from '../../../modules/parseurl'

export { Context as context }

/** @type {TestSuite} */
export const accept = {
  'return an Accept instance'({ ctx }) {
    ctx.req.headers.accept = 'application/*;q=0.2, image/jpeg;q=0.8, text/html, text/plain'
    assert(ctx.accept instanceof Accept)
  },
  'replaces the accept object'({ ctx, req }) {
    ctx.req.headers.accept = 'text/plain'
    deepEqual(ctx.accepts(), ['text/plain'])

    req.req.headers.accept = 'application/*;q=0.2, image/jpeg;q=0.8, text/html, text/plain'
    ctx.accept = new Accept(req.req)
    deepEqual(ctx.accepts(), ['text/html', 'text/plain', 'image/jpeg', 'application/*'])
  },
}

/** @type {TestSuite} */
export const accepts = {
  'with no arguments': {
    'when Accept is populated': {
      'returns all accepted types'({ ctx }) {
        ctx.req.headers.accept = 'application/*;q=0.2, image/jpeg;q=0.8, text/html, text/plain'
        deepEqual(ctx.accepts(), ['text/html', 'text/plain', 'image/jpeg', 'application/*'])
      },
    },
  },
  'with no valid types': {
    'when Accept is populated': {
      'returns false'({ ctx }) {
        ctx.req.headers.accept = 'application/*;q=0.2, image/jpeg;q=0.8, text/html, text/plain'
        equal(ctx.accepts('image/png', 'image/tiff'), false)
      },
    },
    'when Accept is not populated': {
      'returns the first type'({ ctx }) {
        equal(ctx.accepts('text/html', 'text/plain', 'image/jpeg', 'application/*'), 'text/html')
      },
    },
  },
  'when extensions are given': {
    'should convert to mime types'({ ctx }) {
      ctx.req.headers.accept = 'text/plain, text/html'
      equal(ctx.accepts('html'), 'html')
      equal(ctx.accepts('.html'), '.html')
      equal(ctx.accepts('txt'), 'txt')
      equal(ctx.accepts('.txt'), '.txt')
      equal(ctx.accepts('png'), false)
    },
  },
  'when an array is given': {
    'returns the first match'({ ctx }) {
      ctx.req.headers.accept = 'text/plain, text/html'
      equal(ctx.accepts(['png', 'text', 'html']), 'text')
      equal(ctx.accepts(['png', 'html']), 'html')
    },
  },
  'when multiple arguments are given': {
    'returns the first match'({ ctx }) {
      ctx.req.headers.accept = 'text/plain, text/html'
      equal(ctx.accepts('png', 'text', 'html'), 'text')
      equal(ctx.accepts('png', 'html'), 'html')
    },
  },
  'when present in Accept as an exact match': {
    'returns the type'({ ctx }) {
      ctx.req.headers.accept = 'text/plain, text/html'
      equal(ctx.accepts('text/html'), 'text/html')
      equal(ctx.accepts('text/plain'), 'text/plain')
    },
  },
  'when present in Accept as a type match': {
    'returns the type'({ ctx }) {
      ctx.req.headers.accept = 'application/json, */*'
      equal(ctx.accepts('text/html'), 'text/html')
      equal(ctx.accepts('text/plain'), 'text/plain')
      equal(ctx.accepts('image/png'), 'image/png')
    },
  },
  'when present in Accept as a subtype match': {
    'returns the type'({ ctx }) {
      ctx.req.headers.accept = 'application/json, text/' + '*'
      equal(ctx.accepts('text/html'), 'text/html')
      equal(ctx.accepts('text/plain'), 'text/plain')
      equal(ctx.accepts('image/png'), false)
      equal(ctx.accepts('png'), false)
    },
  },
}

/** @type {TestSuite} */
export const acceptsCharsets = {
  'with no arguments': {
    'when Accept-Charset is populated': {
      'returns accepted types'({ ctx }) {
        ctx.req.headers['accept-charset'] = 'utf-8, iso-8859-1;q=0.2, utf-7;q=0.5'
        deepEqual(ctx.acceptsCharsets(), ['utf-8', 'utf-7', 'iso-8859-1'])
      },
    },
  },
  'with multiple arguments': {
    'when Accept-Charset is populated': {
      'if any types match': {
        'returns the best fit'({ ctx }) {
          ctx.req.headers['accept-charset'] = 'utf-8, iso-8859-1;q=0.2, utf-7;q=0.5'
          equal(ctx.acceptsCharsets('utf-7', 'utf-8'), 'utf-8')
        },
      },
      'if no types match': {
        'returns false'({ ctx }) {
          ctx.req.headers['accept-charset'] = 'utf-8, iso-8859-1;q=0.2, utf-7;q=0.5'
          equal(ctx.acceptsCharsets('utf-16'), false)
        },
      },
    },
    'when Accept-Charset is not populated': {
      'returns the first type'({ ctx }) {
        equal(ctx.acceptsCharsets('utf-7', 'utf-8'), 'utf-7')
      },
    },
  },
  'with an array': {
    'returns the best fit'({ ctx }) {
      ctx.req.headers['accept-charset'] = 'utf-8, iso-8859-1;q=0.2, utf-7;q=0.5'
      equal(ctx.acceptsCharsets(['utf-7', 'utf-8']), 'utf-8')
    },
  },
}

/** @type {TestSuite} */
export const acceptsEncodings = {
  'with no arguments': {
    'when Accept-Encoding is populated': {
      'returns accepted types'({ ctx }) {
        ctx.req.headers['accept-encoding'] = 'gzip, compress;q=0.2'
        deepEqual(ctx.acceptsEncodings(), ['gzip', 'compress', 'identity'])
        equal(ctx.acceptsEncodings('gzip', 'compress'), 'gzip')
      },
    },
    'when Accept-Encoding is not populated': {
      'returns identity'({ ctx }) {
        deepEqual(ctx.acceptsEncodings(), ['identity'])
        equal(ctx.acceptsEncodings('gzip', 'deflate', 'identity'), 'identity')
      },
    },
  },
  'with multiple arguments': {
    'returns the best fit'({ ctx }) {
      ctx.req.headers['accept-encoding'] = 'gzip, compress;q=0.2'
      equal(ctx.acceptsEncodings('compress', 'gzip'), 'gzip')
      equal(ctx.acceptsEncodings('gzip', 'compress'), 'gzip')
    },
  },
  'with an array': {
    'returns the best fit'({ ctx }) {
      ctx.req.headers['accept-encoding'] = 'gzip, compress;q=0.2'
      equal(ctx.acceptsEncodings(['compress', 'gzip']), 'gzip')
    },
  },
}

/** @type {TestSuite} */
export const acceptsLanguages = {
  'with no arguments': {
    'when Accept-Language is populated': {
      'returns accepted types'({ ctx }) {
        ctx.req.headers['accept-language'] = 'en;q=0.8, es, pt'
        deepEqual(ctx.acceptsLanguages(), ['es', 'pt', 'en'])
      },
    },
  },
  'with multiple arguments': {
    'when Accept-Language is populated': {
      'if any types types match': {
        'returns the best fit'({ ctx }) {
          ctx.req.headers['accept-language'] = 'en;q=0.8, es, pt'
          equal(ctx.acceptsLanguages('es', 'en'), 'es')
        },
      },
      'if no types match': {
        'returns false'({ ctx }) {
          ctx.req.headers['accept-language'] = 'en;q=0.8, es, pt'
          equal(ctx.acceptsLanguages('fr', 'au'), false)
        },
      },
    },
    'when Accept-Language is not populated': {
      'returns the first type'({ ctx }) {
        equal(ctx.acceptsLanguages('es', 'en'), 'es')
      },
    },
  },
  'with an array': {
    'returns the best fit'({ ctx }) {
      ctx.req.headers['accept-language'] = 'en;q=0.8, es, pt'
      equal(ctx.acceptsLanguages(['es', 'en']), 'es')
    },
  },
}

/** @type {TestSuite} */
export const charset = {
  'with no content-type present': {
    'returns ""'({ req }) {
      assert('' === req.charset)
    },
  },
  'with charset present': {
    'returns ""'({ req }) {
      req.header['content-type'] = 'text/plain'
      assert('' === req.charset)
    },
  },
  'with a charset': {
    'returns the charset'({ req }) {
      req.header['content-type'] = 'text/plain; charset=utf-8'
      equal(req.charset, 'utf-8')
    },
    'returns "" if content-type is invalid'({ req }) {
      req.header['content-type'] = 'application/json; application/text; charset=utf-8'
      equal(req.charset, '')
    },
  },
}

/** @type {TestSuite} */
export const fresh = {
  'the request method is not GET and HEAD': {
    'returns false'({ ctx }) {
      ctx.req.method = 'POST'
      equal(ctx.fresh, false)
    },
  },
  'the response is non-2xx': {
    'returns false'({ ctx }) {
      ctx.status = 404
      ctx.req.method = 'GET'
      ctx.req.headers['if-none-match'] = '123'
      ctx.set('ETag', '123')
      equal(ctx.fresh, false)
    },
  },
  'the response is 2xx': {
    'and etag matches': {
      'returns true'({ ctx }) {
        ctx.status = 200
        ctx.req.method = 'GET'
        ctx.req.headers['if-none-match'] = '123'
        ctx.set('ETag', '123')
        equal(ctx.fresh, true)
      },
    },
    'and etag do not match': {
      'returns false'({ ctx }) {
        ctx.status = 200
        ctx.req.method = 'GET'
        ctx.req.headers['if-none-match'] = '123'
        ctx.set('ETag', 'hey')
        equal(ctx.fresh, false)
      },
    },
  },
}

/** @type {TestSuite} */
export const Get = {
  'returns the field value'({ ctx }) {
    ctx.req.headers.host = 'http://google.com'
    ctx.req.headers.referer = 'http://google.com'
    equal(ctx.get('HOST'), 'http://google.com')
    equal(ctx.get('Host'), 'http://google.com')
    equal(ctx.get('host'), 'http://google.com')
    equal(ctx.get('referer'), 'http://google.com')
    equal(ctx.get('referrer'), 'http://google.com')
  },
}

/** @type {TestSuite} */
export const header = {
  'returns the request header object'({ req }) {
    deepEqual(req.header, req.req.headers)
  },
  'should set the request header object'({ req }) {
    req.header = { 'X-Custom-Headerfield': 'Its one header, with headerfields' }
    deepEqual(req.header, req.req.headers)
  },
}

/** @type {TestSuite} */
export const headers = {
  'returns the request header object'({ req }) {
    deepEqual(req.headers, req.req.headers)
  },
  'should set the request header object'({ req }) {
    req.headers = { 'X-Custom-Headerfield': 'Its one header, with headerfields' }
    deepEqual(req.headers, req.req.headers)
  },
}

/** @type {TestSuite} */
export const host = {
  'returns host with port'({ req }) {
    req.header.host = 'foo.com:3000'
    equal(req.host, 'foo.com:3000')
  },
  'with no host present': {
    'returns ""'({ req }) {
      equal(req.host, '')
    },
  },
  'when less then HTTP/2': {
    'should not use :authority header'({ request }) {
      const req = request({
        'httpVersionMajor': 1,
        'httpVersion': '1.1',
      })
      req.header[':authority'] = 'foo.com:3000'
      req.header.host = 'bar.com:8000'
      equal(req.host, 'bar.com:8000')
    },
  },
  'when HTTP/2': {
    'should use :authority header'({ request }) {
      const req = request({
        'httpVersionMajor': 2,
        'httpVersion': '2.0',
      })
      req.header[':authority'] = 'foo.com:3000'
      req.header.host = 'bar.com:8000'
      equal(req.host, 'foo.com:3000')
    },
    'should use host header as fallback'({ request }) {
      const req = request({
        'httpVersionMajor': 2,
        'httpVersion': '2.0',
      })
      req.header.host = 'bar.com:8000'
      equal(req.host, 'bar.com:8000')
    },
  },
  'when X-Forwarded-Host is present': {
    'and proxy is not trusted': {
      'is ignored on HTTP/1'({ req }) {
        req.header['x-forwarded-host'] = 'bar.com'
        req.header.host = 'foo.com'
        equal(req.host, 'foo.com')
      },
      'is ignored on HTTP/2'({ request }) {
        const req = request({
          'httpVersionMajor': 2,
          'httpVersion': '2.0',
        })
        req.header['x-forwarded-host'] = 'proxy.com:8080'
        req.header[':authority'] = 'foo.com:3000'
        req.header.host = 'bar.com:8000'
        equal(req.host, 'foo.com:3000')
      },
    },
    'and proxy is trusted': {
      'is used on HTTP/1'({ req }) {
        req.app.proxy = true
        req.header['x-forwarded-host'] = 'bar.com, baz.com'
        req.header.host = 'foo.com'
        equal(req.host, 'bar.com')
      },
      'is used on HTTP/2'({ request }) {
        const req = request({
          'httpVersionMajor': 2,
          'httpVersion': '2.0',
        })
        req.app.proxy = true
        req.header['x-forwarded-host'] = 'proxy.com:8080'
        req.header[':authority'] = 'foo.com:3000'
        req.header.host = 'bar.com:8000'
        equal(req.host, 'proxy.com:8080')
      },
    },
  },
}

/** @type {TestSuite} */
export const hostname = {
  'returns hostname void of port'({ req }) {
    req.header.host = 'foo.com:3000'
    equal(req.hostname, 'foo.com')
  },
  'with no host present': {
    'returns ""'({ req }) {
      equal(req.hostname, '')
    },
  },
  'with IPv6 in host': {
    'should parse localhost void of port'({ req }) {
      req.header.host = '[::1]'
      equal(req.hostname, '[::1]')
    },
    'should parse localhost with port 80'({ req }) {
      req.header.host = '[::1]:80'
      equal(req.hostname, '[::1]')
    },
    'should parse localhost with non special schema port'({ req }) {
      req.header.host = '[::1]:1337'
      equal(req.hostname, '[::1]')
    },
    'should reduce IPv6 with non special schema port, as hostname'({ req }) {
      req.header.host = '[2001:cdba:0000:0000:0000:0000:3257:9652]:1337'
      equal(req.hostname, '[2001:cdba::3257:9652]')
    },
    'returns empty string when invalid'({ req }) {
      req.header.host = '[invalidIPv6]'
      equal(req.hostname, '')
    },
  },
  'when X-Forwarded-Host is present': {
    'and proxy is not trusted': {
      'is ignored'({ req }) {
        req.header['x-forwarded-host'] = 'bar.com'
        req.header.host = 'foo.com'
        equal(req.hostname, 'foo.com')
      },
    },
    'and proxy is trusted': {
      'is used'({ req }) {
        req.app.proxy = true
        req.header['x-forwarded-host'] = 'bar.com, baz.com'
        req.header.host = 'foo.com'
        equal(req.hostname, 'bar.com')
      },
    },
  },
}

/** @type {TestSuite} */
export const href = {
  'returns the full request url'({ context }) {
    const socket = new Duplex()
    const req = {
      url: '/users/1?next=/dashboard',
      headers: {
        host: 'localhost',
      },
      socket: socket,
      __proto__: Readable.prototype,
    }
    const ctx = context(req)
    equal(ctx.href, 'http://localhost/users/1?next=/dashboard')
    // change it also work
    ctx.url = '/foo/users/1?next=/dashboard'
    equal(ctx.href, 'http://localhost/users/1?next=/dashboard')
  },
  async 'works with `GET http://example.com/foo`'({ app }) {
    app.use(ctx => {
      ctx.body = ctx.href
    })
    await new Promise((r, j) => {
      app.listen(function () {
        const address = this.address()
        get({
          host: 'localhost',
          path: 'http://example.com/foo',
          port: address.port,
        }, res => {
          equal(res.statusCode, 200)
          let buf = ''
          res.setEncoding('utf8')
          res.on('data', s => buf += s)
          res.on('end', () => {
            try {
              equal(buf, 'http://example.com/foo')
              this.close()
              r()
            } catch(e) {
              j(e)
            }
          })
        })
      })
    })
  },
}
/** @type {TestSuite} */
export const idempotent = {
  'when the request method is idempotent': {
    'returns true'({ request }) {
      ['GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS', 'TRACE'].forEach(check)
      function check(method){
        const req = request()
        req.method = method
        equal(req.idempotent, true)
      }
    },
  },
  'when the request method is not idempotent': {
    'returns false'({ req }) {
      req.method = 'POST'
      equal(req.idempotent, false)
    },
  },
}
/** @type {TestSuite} */
export const Inspect = {
  'with no request.req present': {
    'returns null'({ req }) {
      req.method = 'GET'
      delete req.req
      assert(undefined === req.inspect())
      assert('undefined' === inspect(req))
    },
  },
  'returns a json representation'({ req }) {
    req.method = 'GET'
    req.url = 'example.com'
    req.header.host = 'example.com'

    const expected = {
      method: 'GET',
      url: 'example.com',
      header: {
        host: 'example.com',
      },
    }

    deepEqual(req.inspect(), expected)
    deepEqual(inspect(req), inspect(expected))
  },
}
/** @type {TestSuite} */
export const ip = {
  'with req.ips present': {
    'returns req.ips[0]'({ app, request: Request }) {
      const req = { headers: {}, socket: new Duplex() }
      app.proxy = true
      req.headers['x-forwarded-for'] = '127.0.0.1'
      req.socket.remoteAddress = '127.0.0.2'
      const request = Request(req, undefined, app)
      equal(request.ip, '127.0.0.1')
    },
  },
  'with no req.ips present': {
    'returns req.socket.remoteAddress'({ request: Request }) {
      const req = { socket: new Duplex() }
      req.socket.remoteAddress = '127.0.0.2'
      const request = Request(req)
      equal(request.ip, '127.0.0.2')
    },
    'with req.socket.remoteAddress not present': {
      'returns an empty string'({ request: Request }) {
        const socket = new Duplex()
        Object.defineProperty(socket, 'remoteAddress', {
          get: () => undefined, // So that the helper doesn't override it with a reasonable value
          set: () => {},
        })
        equal(Request({ socket }).ip, '')
      },
    },
  },
  'is lazy inited and cached'({ request: Request }) {
    const req = { socket: new Duplex() }
    req.socket.remoteAddress = '127.0.0.2'
    const request = Request(req)
    equal(request.ip, '127.0.0.2')
    req.socket.remoteAddress = '127.0.0.1'
    equal(request.ip, '127.0.0.2')
  },
  'should reset ip work'({ request: Request }) {
    const req = { socket: new Duplex() }
    req.socket.remoteAddress = '127.0.0.2'
    const request = Request(req)
    equal(request.ip, '127.0.0.2')
    request.ip = '127.0.0.1'
    equal(request.ip, '127.0.0.1')
  },
}
/** @type {TestSuite} */
export const ips = {
  'when X-Forwarded-For is present': {
    'and proxy is not trusted': {
      'is ignored'({ req }) {
        req.app.proxy = false
        req.header['x-forwarded-for'] = '127.0.0.1,127.0.0.2'
        deepEqual(req.ips, [])
      },
    },
    'and proxy is trusted': {
      'is used'({ req }) {
        req.app.proxy = true
        req.header['x-forwarded-for'] = '127.0.0.1,127.0.0.2'
        deepEqual(req.ips, ['127.0.0.1', '127.0.0.2'])
      },
    },
  },
}
/** @type {TestSuite} */
export const is = {
  'should ignore params'({ ctx }) {
    ctx.header['content-type'] = 'text/html; charset=utf-8'
    ctx.header['transfer-encoding'] = 'chunked'

    equal(ctx.is('text/*'), 'text/html')
  },
  'when no body is given': {
    'returns null'({ ctx }) {
      equal(ctx.is(), null)
      equal(ctx.is('image/*'), null)
      equal(ctx.is('image/*', 'text/*'), null)
    },
  },
  'when no content type is given': {
    'returns false'({ ctx }) {
      ctx.header['transfer-encoding'] = 'chunked'

      equal(ctx.is(), false)
      equal(ctx.is('image/*'), false)
      equal(ctx.is('text/*', 'image/*'), false)
    },
  },
  'give no types': {
    'returns the mime type'({ ctx }) {
      ctx.header['content-type'] = 'image/png'
      ctx.header['transfer-encoding'] = 'chunked'

      equal(ctx.is(), 'image/png')
    },
  },
  'given one type': {
    'returns the type or false'({ ctx }) {
      ctx.header['content-type'] = 'image/png'
      ctx.header['transfer-encoding'] = 'chunked'

      equal(ctx.is('png'), 'png')
      equal(ctx.is('.png'), '.png')
      equal(ctx.is('image/png'), 'image/png')
      equal(ctx.is('image/*'), 'image/png')
      equal(ctx.is('*/png'), 'image/png')

      equal(ctx.is('jpeg'), false)
      equal(ctx.is('.jpeg'), false)
      equal(ctx.is('image/jpeg'), false)
      equal(ctx.is('text/*'), false)
      equal(ctx.is('*/jpeg'), false)
    },
  },
  'given multiple types': {
    'returns the first match or false'({ ctx }) {
      ctx.header['content-type'] = 'image/png'
      ctx.header['transfer-encoding'] = 'chunked'

      equal(ctx.is('png'), 'png')
      equal(ctx.is('.png'), '.png')
      equal(ctx.is('text/*', 'image/*'), 'image/png')
      equal(ctx.is('image/*', 'text/*'), 'image/png')
      equal(ctx.is('image/*', 'image/png'), 'image/png')
      equal(ctx.is('image/png', 'image/*'), 'image/png')

      equal(ctx.is(['text/*', 'image/*']), 'image/png')
      equal(ctx.is(['image/*', 'text/*']), 'image/png')
      equal(ctx.is(['image/*', 'image/png']), 'image/png')
      equal(ctx.is(['image/png', 'image/*']), 'image/png')

      equal(ctx.is('jpeg'), false)
      equal(ctx.is('.jpeg'), false)
      equal(ctx.is('text/*', 'application/*'), false)
      equal(ctx.is('text/html', 'text/plain', 'application/json; charset=utf-8'), false)
    },
  },
  'when Content-Type: application/x-www-form-urlencoded': {
    'matches "urlencoded"'({ ctx }) {
      ctx.header['content-type'] = 'application/x-www-form-urlencoded'
      ctx.header['transfer-encoding'] = 'chunked'

      equal(ctx.is('urlencoded'), 'urlencoded')
      equal(ctx.is('json', 'urlencoded'), 'urlencoded')
      equal(ctx.is('urlencoded', 'json'), 'urlencoded')
    },
  },
}
/** @type {TestSuite} */
export const length = {
  'returns length in content-length'({ req }) {
    req.header['content-length'] = '10'
    equal(req.length, 10)
  },
  'with no content-length present'({ req }) {
    equal(req.length, undefined)
  },
}
/** @type {TestSuite} */
export const origin = {
  'returns the origin of url'({ context }) {
    const socket = new Duplex()
    const req = {
      url: '/users/1?next=/dashboard',
      headers: {
        host: 'localhost',
      },
      socket: socket,
      __proto__: Readable.prototype,
    }
    const ctx = context(req)
    equal(ctx.origin, 'http://localhost')
    // change it also work
    ctx.url = '/foo/users/1?next=/dashboard'
    equal(ctx.origin, 'http://localhost')
  },
}
/** @type {TestSuite} */
export const path = {
  'returns the pathname'({ ctx }) {
    ctx.url = '/login?next=/dashboard'
    equal(ctx.path, '/login')
  },
  'should set the pathname'({ ctx }) {
    ctx.url = '/login?next=/dashboard'

    ctx.path = '/logout'
    equal(ctx.path, '/logout')
    equal(ctx.url, '/logout?next=/dashboard')
  },
  'changes .url but not .originalUrl'({ context }) {
    const ctx = context({ url: '/login' })
    ctx.path = '/logout'
    equal(ctx.url, '/logout')
    equal(ctx.originalUrl, '/login')
    equal(ctx.request.originalUrl, '/login')
  },
  'does not affect parseurl'({ context }) {
    const ctx = context({ url: '/login?foo=bar' })
    ctx.path = '/login'
    const url = parseurl(ctx.req)
    equal(url.path, '/login?foo=bar')
  },
}
/** @type {TestSuite} */
export const protocol = {
  'when encrypted': {
    'returns "https"'({ req }) {
      req.req.socket = { encrypted: true }
      equal(req.protocol, 'https')
    },
  },
  'when unencrypted': {
    'returns "http"'({ req }) {
      req.req.socket = {}
      equal(req.protocol, 'http')
    },
  },
  'when X-Forwarded-Proto is set': {
    'and proxy is trusted': {
      'is used'({ req }) {
        req.app.proxy = true
        req.req.socket = {}
        req.header['x-forwarded-proto'] = 'https, http'
        equal(req.protocol, 'https')
      },
      'and X-Forwarded-Proto is empty': {
        'returns "http"'({ req }) {
          req.app.proxy = true
          req.req.socket = {}
          req.header['x-forwarded-proto'] = ''
          equal(req.protocol, 'http')
        },
      },
    },
    'and proxy is not trusted': {
      'should not be used'({ req }) {
        req.req.socket = {}
        req.header['x-forwarded-proto'] = 'https, http'
        equal(req.protocol, 'http')
      },
    },
  },
}
/** @type {TestSuite} */
export const query = {
  'when missing': {
    'returns an empty object'({ context }) {
      const ctx = context({ url: '/' })
      const res = ctx.query
      deepEqual({ ...res }, {})
    },
    'returns the same object each time it\'s accessed'({ context }) {
      const ctx = context({ url: '/' })
      ctx.query.a = '2'
      equal(ctx.query.a, '2')
    },
  },
  'returns a parsed query-string'({ context }) {
    const ctx = context({ url: '/?page=2' })
    equal(ctx.query.page, '2')
  },
  '=': {
    'should stringify and replace the querystring and search'({ context }) {
      const ctx = context({ url: '/store/shoes' })
      ctx.query = { page: 2, color: 'blue' }
      equal(ctx.url, '/store/shoes?page=2&color=blue')
      equal(ctx.querystring, 'page=2&color=blue')
      equal(ctx.search, '?page=2&color=blue')
    },

    'changes .url but not .originalUrl'({ context }) {
      const ctx = context({ url: '/store/shoes' })
      ctx.query = { page: 2 }
      equal(ctx.url, '/store/shoes?page=2')
      equal(ctx.originalUrl, '/store/shoes')
      equal(ctx.request.originalUrl, '/store/shoes')
    },
  },
}
/** @type {TestSuite} */
export const querystring = {
  'returns the querystring'({ context }) {
    const ctx = context({ url: '/store/shoes?page=2&color=blue' })
    equal(ctx.querystring, 'page=2&color=blue')
  },
  'when ctx.req not present': {
    'returns an empty string'({ ctx }) {
      ctx.request.req = null
      equal(ctx.querystring, '')
    },
  },
  '=': {
    'replaces the querystring'({ context }) {
      const ctx = context({ url: '/store/shoes' })
      ctx.querystring = 'page=2&color=blue'
      equal(ctx.url, '/store/shoes?page=2&color=blue')
      equal(ctx.querystring, 'page=2&color=blue')
    },

    'updates ctx.search and ctx.query'({ context }) {
      const ctx = context({ url: '/store/shoes' })
      ctx.querystring = 'page=2&color=blue'
      equal(ctx.url, '/store/shoes?page=2&color=blue')
      equal(ctx.search, '?page=2&color=blue')
      equal(ctx.query.page, '2')
      equal(ctx.query.color, 'blue')
    },

    'changes .url but not .originalUrl'({ context }) {
      const ctx = context({ url: '/store/shoes' })
      ctx.querystring = 'page=2&color=blue'
      equal(ctx.url, '/store/shoes?page=2&color=blue')
      equal(ctx.originalUrl, '/store/shoes')
      equal(ctx.request.originalUrl, '/store/shoes')
    },

    'does not affect parseurl'({ context }) {
      const ctx = context({ url: '/login?foo=bar' })
      ctx.querystring = 'foo=bar'
      const url = parseurl(ctx.req)
      equal(url.path, '/login?foo=bar')
    },
  },
}
/** @type {TestSuite} */
export const search = {
  'replaces the search'({ context }) {
    const ctx = context({ url: '/store/shoes' })
    ctx.search = '?page=2&color=blue'
    equal(ctx.url, '/store/shoes?page=2&color=blue')
    equal(ctx.search, '?page=2&color=blue')
  },
  'updates ctx.querystring and ctx.query'({ context }) {
    const ctx = context({ url: '/store/shoes' })
    ctx.search = '?page=2&color=blue'
    equal(ctx.url, '/store/shoes?page=2&color=blue')
    equal(ctx.querystring, 'page=2&color=blue')
    equal(ctx.query.page, '2')
    equal(ctx.query.color, 'blue')
  },
  'changes .url but not .originalUrl'({ context }) {
    const ctx = context({ url: '/store/shoes' })
    ctx.search = '?page=2&color=blue'
    equal(ctx.url, '/store/shoes?page=2&color=blue')
    equal(ctx.originalUrl, '/store/shoes')
    equal(ctx.request.originalUrl, '/store/shoes')
  },
  'when missing': {
    'returns ""'({ context }) {
      const ctx = context({ url: '/store/shoes' })
      equal(ctx.search, '')
    },
  },
}
/** @type {TestSuite} */
export const secure = {
  'returns true when encrypted'({ req }) {
    req.req.socket = { encrypted: true }
    equal(req.secure, true)
  },
}
/** @type {TestSuite} */
export const stale = {
  'is the inverse of req.fresh'({ ctx }) {
    ctx.status = 200
    ctx.method = 'GET'
    ctx.req.headers['if-none-match'] = '"123"'
    ctx.set('ETag', '"123"')
    equal(ctx.fresh, true)
    equal(ctx.stale, false)
  },
}
/** @type {TestSuite} */
export const subdomains = {
  'returns subdomain array'({ req }) {
    req.header.host = 'tobi.ferrets.example.com'
    req.app.subdomainOffset = 2
    deepEqual(req.subdomains, ['ferrets', 'tobi'])

    req.app.subdomainOffset = 3
    deepEqual(req.subdomains, ['tobi'])
  },
  'works with no host present'({ req }) {
    deepEqual(req.subdomains, [])
  },
  'checks if the host is an ip address, even with a port'({ req }) {
    req.header.host = '127.0.0.1:3000'
    deepEqual(req.subdomains, [])
  },
}
/** @type {TestSuite} */
export const type = {
  'returns type void of parameters'({ req }) {
    req.header['content-type'] = 'text/html; charset=utf-8'
    equal(req.type, 'text/html')
  },
  'with no host present'({ req }) {
    equal(req.type, '')
  },
}

/** @type {TestSuite} */
export const URL = {
  'does not throw when': {
    'host is void'({ request }) {
      // Accessing the URL does not throw.
      request().URL
    },

    'header.host is invalid'({ request }) {
      const req = request()
      req.header.host = 'invalid host'
      // Accessing the URL does not throw.
      req.URL
    },
  },

  'returns empty object when invalid'({ request }) {
    const req = request()
    req.header.host = 'invalid host'
    deepEqual(req.URL, Object.create(null))
  },
}

/**
 * @typedef {import('../../context').TestSuite} TestSuite
 */