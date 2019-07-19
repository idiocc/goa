## Tests

The tests were updated for [context testing](https://contexttesting.com) and include all original Koa tests.

```
test/spec
   application
    ✓  handles socket errors
    ✓  does not .writeHead when !socket.writable
    ✓  sets development env when NODE_ENV missing
     app-context
      ✓  merges properties
      ✓  does not affect the original prototype
     inspect
      ✓  works
      ✓  returns a json representation
      ✓  toJson
     onerror
      ✓  throws an error if a non-error is given
      ✓  does nothing if status is 404
      ✓  does nothing if .silent
      ✓  logs the error to stderr
      ✓  uses err.toString() instead of err.stack
     request
      ✓  merges properties
      ✓  does not affect the original prototype
     respond
       when .body is a null
        ✓  responds 204 by default
        ✓  responds 204 with status=200
        ✓  responds 205 with status=205
        ✓  responds 304 with status=304
       when ctx.respond === false
        ✓  should function (ctx)
        ✓  ignores set header after header sent
        ✓  ignores set status after header sent
       when HEAD is used
        ✓  does not respond with the body
        ✓  keeps json headers
        ✓  keeps string headers
        ✓  keeps buffer headers
        ✓  responds with a 404 if no body was set
        ✓  responds with a 200 if body = ""
        ✓  does not overwrite the content-type
       when no middleware are present
        ✓  should 404
       when res has already been written to
        ✓  should not cause an app error
        ✓  sends the right body
       when .body is missing
         with status=400
          ✓  responds with the associated status message
         with status=204
          ✓  responds without a body
         with status=205
          ✓  responds without a body
         with status=304
          ✓  responds without a body
         with custom status=700
          ✓  responds with the associated status message
         with custom statusMessage=ok
          ✓  responds with the custom status message
         with custom status without message
          ✓  responds with the status code number
       when this.type === null
        ✓  does not send Content-Type header
       when .body is a string
        ✓  responds
       when .body is a Buffer
        ✓  responds
       when .body is a Stream
        ✓  responds
        ✓  strips content-length when overwriting
        ✓  keeps content-length if not overwritten
        ✓  keeps content-length if overwritten with the same stream
        ✓  handles errors
        ✓  handles errors when no content status
        ✓  handles all intermediate stream body errors
       when .body is an Object
        ✓  responds with json
       when an error occurs
        ✓  emits "error" on the app
        ✓  responds with 500
        ✓  is catchable
         with an .expose property
          ✓   expose the message
         with a .status property
          ✓  responds with .status
       when status and body property
        ✓  should 200
        ✓  should 204
     response
      ✓  merges properties
      ✓  does not affect the original prototype
      ✓  does not include status message in body for http2
     use
      ✓  composes middleware
      ✓  catches thrown errors in non-async functions
      ✓  throws error for non function
   ctx
     state
      ✓  provides a ctx.state namespace
     assert
      ✓  throws an error
     cookies
       ctx.cookies.set()
        ✓  sets an unsigned cookie
         with .signed
          ✓  sends a signed cookie
           when no .keys are set
            ✓  should error
         with secure
          ✓  gets secure from the request
       ctx.cookies=
        ✓  overrides cookie work
     inspect
      ✓  returns a json representation
       toJson
        ✓  returns JSON
     onerror
      ✓  responds
      ✓  unsets all headers
      ✓  sets headers specified in the error
      ✓  ignores error after headerSent
       when invalid err.status
         not number
          ✓  responds 500
         when ENOENT error
          ✓  responds 404
         not http status code
          ✓  responds 500
       when non-error thrown
        ✓  responds with non-error thrown message
        ✓  uses res.getHeaderNames() accessor when available
        ✓  stringifies error if it is an object
     throw
       statusMsg
        ✓  should throw an error
       message
        ✓  sets .status to 500
       errStatus
        ✓  should throw the error and set .status
       statusErr
        ✓  should throw the error and set .status
       msgStatus
        ✓  should throw an error
       error
        ✓  should set .status to 500
       status
        ✓  should throw an error
         when not valid status
          ✓  should not expose
       statusMsgProps
        ✓  should mixin props
         when props include status
          ✓  should be ignored
       msgProps
        ✓  should mixin props
       statusProps
        ✓  should mixin props
       errProps
        ✓  should mixin props
   request
     ip
      ✓  is lazy inited and cached
      ✓  should reset ip work
       with req.ips present
        ✓  returns req.ips[0]
       with no req.ips present
        ✓  returns req.socket.remoteAddress
         with req.socket.remoteAddress not present
          ✓  returns an empty string
     accept
      ✓  return an Accept instance
      ✓  replaces the accept object
     acceptsCharsets
       with no arguments
         when Accept-Charset is populated
          ✓  returns accepted types
       with multiple arguments
         when Accept-Charset is populated
           if any types match
            ✓  returns the best fit
           if no types match
            ✓  returns false
         when Accept-Charset is not populated
          ✓  returns the first type
       with an array
        ✓  returns the best fit
     acceptsEncodings
       with no arguments
         when Accept-Encoding is populated
          ✓  returns accepted types
         when Accept-Encoding is not populated
          ✓  returns identity
       with multiple arguments
        ✓  returns the best fit
       with an array
        ✓  returns the best fit
     acceptsLanguages
       with no arguments
         when Accept-Language is populated
          ✓  returns accepted types
       with multiple arguments
         when Accept-Language is populated
           if any types types match
            ✓  returns the best fit
           if no types match
            ✓  returns false
         when Accept-Language is not populated
          ✓  returns the first type
       with an array
        ✓  returns the best fit
     charset
       with no content-type present
        ✓  returns ""
       with charset present
        ✓  returns ""
       with a charset
        ✓  returns the charset
        ✓  returns "" if content-type is invalid
     fresh
       the request method is not GET and HEAD
        ✓  returns false
       the response is non-2xx
        ✓  returns false
       the response is 2xx
         and etag matches
          ✓  returns true
         and etag do not match
          ✓  returns false
     Get
      ✓  returns the field value
     header
      ✓  returns the request header object
      ✓  should set the request header object
     headers
      ✓  returns the request header object
      ✓  should set the request header object
     host
      ✓  returns host with port
       with no host present
        ✓  returns ""
       when less then HTTP/2
        ✓  should not use :authority header
       when HTTP/2
        ✓  should use :authority header
        ✓  should use host header as fallback
       when X-Forwarded-Host is present
         and proxy is not trusted
          ✓  is ignored on HTTP/1
          ✓  is ignored on HTTP/2
         and proxy is trusted
          ✓  is used on HTTP/1
          ✓  is used on HTTP/2
     hostname
      ✓  returns hostname void of port
       with no host present
        ✓  returns ""
       with IPv6 in host
        ✓  should parse localhost void of port
        ✓  should parse localhost with port 80
        ✓  should parse localhost with non special schema port
        ✓  should reduce IPv6 with non special schema port, as hostname
        ✓  returns empty string when invalid
       when X-Forwarded-Host is present
         and proxy is not trusted
          ✓  is ignored
         and proxy is trusted
          ✓  is used
     href
      ✓  returns the full request url
      ✓  works with `GET http://example.com/foo`
     idempotent
       when the request method is idempotent
        ✓  returns true
       when the request method is not idempotent
        ✓  returns false
     Inspect
      ✓  returns a json representation
       with no request.req present
        ✓  returns null
     accepts
       with no arguments
         when Accept is populated
          ✓  returns all accepted types
       with no valid types
         when Accept is populated
          ✓  returns false
         when Accept is not populated
          ✓  returns the first type
       when extensions are given
        ✓  should convert to mime types
       when an array is given
        ✓  returns the first match
       when multiple arguments are given
        ✓  returns the first match
       when present in Accept as an exact match
        ✓  returns the type
       when present in Accept as a type match
        ✓  returns the type
       when present in Accept as a subtype match
        ✓  returns the type
     ips
       when X-Forwarded-For is present
         and proxy is not trusted
          ✓  is ignored
         and proxy is trusted
          ✓  is used
     is
      ✓  should ignore params
       when no body is given
        ✓  returns null
       when no content type is given
        ✓  returns false
       give no types
        ✓  returns the mime type
       given one type
        ✓  returns the type or false
       given multiple types
        ✓  returns the first match or false
       when Content-Type: application/x-www-form-urlencoded
        ✓  matches "urlencoded"
     length
      ✓  returns length in content-length
      ✓  with no content-length present
     origin
      ✓  returns the origin of url
     path
      ✓  returns the pathname
      ✓  should set the pathname
      ✓  changes .url but not .originalUrl
      ✓  does not affect parseurl
     protocol
       when encrypted
        ✓  returns "https"
       when unencrypted
        ✓  returns "http"
       when X-Forwarded-Proto is set
         and proxy is trusted
          ✓  is used
           and X-Forwarded-Proto is empty
            ✓  returns "http"
         and proxy is not trusted
          ✓  should not be used
     query
      ✓  returns a parsed query-string
       when missing
        ✓  returns an empty object
        ✓  returns the same object each time it's accessed
       =
        ✓  should stringify and replace the querystring and search
        ✓  changes .url but not .originalUrl
     querystring
      ✓  returns the querystring
       when ctx.req not present
        ✓  returns an empty string
       =
        ✓  replaces the querystring
        ✓  updates ctx.search and ctx.query
        ✓  changes .url but not .originalUrl
        ✓  does not affect parseurl
     search
      ✓  replaces the search
      ✓  updates ctx.querystring and ctx.query
      ✓  changes .url but not .originalUrl
       when missing
        ✓  returns ""
     secure
      ✓  returns true when encrypted
     stale
      ✓  is the inverse of req.fresh
     subdomains
      ✓  returns subdomain array
      ✓  works with no host present
      ✓  checks if the host is an ip address, even with a port
     type
      ✓  returns type void of parameters
      ✓  with no host present
     URL
      ✓  returns empty object when invalid
       does not throw when
        ✓  host is void
        ✓  header.host is invalid
   response
     lastModified
      ✓  sets the header as a UTCString
      ✓  works with date strings
      ✓  gets the header as a Date
       when lastModified not set
        ✓  gets undefined
     append
      ✓  appends multiple headers
      ✓  accepts array of values
      ✓  gets reset by res.set(field, val)
      ✓  works with res.set(field, val) first
     contentDisposition
       with "fallback" option
        ✓  requires a string or Boolean
        ✓  defaults to true
         when "false"
          ✓  does not generate ISO-8859-1 fallback
          ✓  keeps ISO-8859-1 filename
         when "true"
          ✓  generates ISO-8859-1 fallback
          ✓  passes through ISO-8859-1 filename
         when a string
          ✓  requires an ISO-8859-1 string
          ✓  uses as ISO-8859-1 fallback
          ✓  uses as fallback even when filename is ISO-8859-1
          ✓  does nothing if equal to filename
          ✓  uses the basename of the string
          ✓  does nothing without filename option
       with "type" option
        ✓  defaults to attachment
        ✓  requires a string
        ✓  requires a valid type
        ✓  creates a header with inline type
        ✓  creates a header with inline type & filename
        ✓  normalizes type
     body
       when Content-Type is set
        ✓  does not override
        ✓  overrides length
         when body is an object
          ✓  overrides as json
       when a string is given
        ✓  defaults to text
        ✓  sets length
         and contains a non-leading <
          ✓  defaults to text
       when an html string is given
        ✓  defaults to html
        ✓  sets length
        ✓  sets length when body is overridden
         when it contains leading whitespace
          ✓  defaults to html
       when an xml string is given
        ✓  defaults to html
       when a stream is given
        ✓  defaults to an octet stream
       when a buffer is given
        ✓  defaults to an octet stream
        ✓  sets length
       when an object is given
        ✓  defaults to json
     etag
      ✓  should not modify an etag with quotes
      ✓  should not modify a weak etag
      ✓  should add quotes around an etag if necessary
      ✓  returns etag
     flushHeaders
      ✓  sets headersSent
      ✓  allows a response afterwards
      ✓  should send the correct status code
      ✓  should ignore set header after flushHeaders
      ✓  flushes headers first and delay to send data
      ✓  catches stream error
     header
      ✓  returns the response header object
      ✓  uses res.getHeaders() accessor when available
      ✓  returns the response header object when no mocks are in use
     headers
      ✓  returns the response header object
     Inspect
      ✓  returns a json representation
       with no response.res present
        ✓  returns null
     is
      ✓  ignores params
       when no type is set
        ✓  returns false
       when given no types
        ✓  returns the type
       given one type
        ✓  returns the type or false
       given multiple types
        ✓  returns the first match or false
       when Content-Type: application/x-www-form-urlencoded
        ✓  should match "urlencoded"
     attachment
       when given a filename
        ✓  sets the filename param
       when omitting filename
        ✓  does not set filename param
       when given a no-ascii filename
        ✓  sets the encodeURI filename param
        ✓  works with http client
     length
       when Content-Length is defined
        ✓  returns a number
       when content-length is defined
        ✓  returns a number
       when Content-Length is not defined
         and a .body is set
          ✓  returns a number
         and .body is not
          ✓  returns undefined
     message
      ✓  returns the response status message
       when res.message not present
        ✓  should look up in statuses
       =
        ✓  sets response status message
     redirect
      ✓  should redirect to the given url
       with "back"
        ✓  should redirect to Referrer
        ✓  should redirect to Referer
        ✓  defaults to alt
        ✓  defaults redirect to /
       when html is accepted
        ✓  responds with html
        ✓  escapes the url
       when text is accepted
        ✓  responds with text
       when status is 301
        ✓  does not change the status code
       when status is 304
        ✓  changes the status code
       when content-type was present
        ✓  overwrites content-type
     remove
      ✓  removes a field
     set
      ✓  sets a field value
      ✓  coerces number to string
      ✓  coerces undefined to string
      ✓  sets a field value of array
      ✓  sets multiple fields
     socket
      ✓  returns the request socket object
     status
       when a status code
         and valid
          ✓  sets the status
          ✓  should not throw
         and invalid
          ✓  should throw
         and custom status
          ✓  sets the status
          ✓  should not throw
         and HTTP/2
          ✓  does not set the status message
       when a status string
        ✓  should throw
     type
       =
         with a mime
          ✓  sets the Content-Type
         with an extension
          ✓  should lookup the mime
         without a charset
          ✓  defaults the charset
         with a charset
          ✓  should not default the charset
         with an unknown extension
          ✓  does not set a content-type
       with no Content-Type
        ✓  returns ""
       with a Content-Type
        ✓  returns the mime
     vary
       when Vary is not set
        ✓  sets it
       when Vary is set
        ✓  appends
       when Vary already contains the value
        ✓  should not append
     status
       when 204
        ✓  strips content related header fields
        ✓  strips content related header fields after status set
       when 205
        ✓  strips content related header fields
        ✓  strips content related header fields after status set
       when 304
        ✓  strips content related header fields
        ✓  strips content related header fields after status set
     writable
       when continuous requests in one persistent connection
        ✓  should always writable and response all requests
       when socket closed before response sent
        ✓  should not writable
       when response finished
        ✓  should not writable

🦅  Executed 326 tests.
```

