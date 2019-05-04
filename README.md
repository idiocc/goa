# @goa/koa

[![npm version](https://badge.fury.io/js/%40goa%2Fkoa.svg)](https://npmjs.org/package/@goa/koa)

`@goa/koa` is the Koa web-sever compiled and optimised with _Google Closure Compiler_ so that it has 0 dependencies. The types are written as JSDoc and don't require installing typings, therefore they work not just with TypeScript-based editors and don't require downloading additional data.

```sh
yarn add @goa/koa
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [Types](#types)
  * [`_goa.Application`](#type-_goaapplication)
  * [`_goa.Response`](#type-_goaresponse)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## Types

__<a name="type-_goaapplication">`_goa.Application`</a>__: The application interface.

|      Name       |       Type       |                                                                                                 Description                                                                                                  |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| proxy           | <em>boolean</em> | Whether the server is running behind a proxy.                                                                                                                                                                |
| subdomainOffset | <em>number</em>  | For example, if the domain is "tobi.ferrets.example.com": If `app.subdomainOffset` is not set, request.subdomains is `["ferrets", "tobi"]`. If `app.subdomainOffset` is 3, request.subdomains is `["tobi"]`. |

[`import('http').IncomingMessage`](https://nodejs.org/api/http.html#http_class_http_incomingmessage) __<a name="type-httpincomingmessage">`http.IncomingMessage`</a>__: The first argument to the 'request' event.

[`import('http').ServerResponse`](https://nodejs.org/api/http.html#http_response_socket) __<a name="type-httpserverresponse">`http.ServerResponse`</a>__: The second parameter to the 'request' event.

__<a name="type-_goaresponse">`_goa.Response`</a>__: The response API.

|       Name        |                                                           Type                                                           |                                                                                                                                                                                     Description                                                                                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| __app*__          | <em><a href="#type-_goaapplication" title="The application interface.">_goa.Application</a></em>                         | The reference to the application.                                                                                                                                                                                                                                                                                                                                                   |
| __ctx*__          | <em>_goa.Context</em>                                                                                                    | The reference to the context instance.                                                                                                                                                                                                                                                                                                                                              |
| __request*__      | <em>_goa.Request</em>                                                                                                    | The reference to the request instance.                                                                                                                                                                                                                                                                                                                                              |
| __req*__          | <em><a href="#type-httpincomingmessage" title="The first argument to the 'request' event.">http.IncomingMessage</a></em> | The message from the client.                                                                                                                                                                                                                                                                                                                                                        |
| __res*__          | <em><a href="#type-httpserverresponse" title="The second parameter to the 'request' event.">http.ServerResponse</a></em> | The response from the server.                                                                                                                                                                                                                                                                                                                                                       |
| __attachment*__   | <em>function(string): void</em>                                                                                          | Set Content-Disposition header to "attachment" with optional `filename`.                                                                                                                                                                                                                                                                                                            |
| __redirect*__     | <em>function(string, string=): void</em>                                                                                 | Perform a 302 redirect to `url`. The string "back" is special-cased to provide Referrer support, when Referrer is not present `alt` or "/" is used. _Examples_:<li>      `this.redirect('back')`</li><li>      `this.redirect('back', '/index.html')`</li><li>      `this.redirect('/login')`</li><li>      `this.redirect('http://google.com')`</li>                               |
| __remove*__       | <em>function(string): void</em>                                                                                          | Remove header `field`.                                                                                                                                                                                                                                                                                                                                                              |
| __vary*__         | <em>function(string): void</em>                                                                                          | Vary on `field`.                                                                                                                                                                                                                                                                                                                                                                    |
| __set*__          | <em>function((string \| Object), (string \| Array&lt;string&gt;)=): void</em>                                            | Set header `field` to `val`, or pass an object of header fields. _Examples_:<li>      `this.set('Foo', ['bar', 'baz'])`</li><li>      `this.set('Accept', 'application/json')`</li><li>      `this.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' })`.</li>                                                                                                                        |
| __append*__       | <em>function(string, (string \| Array&lt;string&gt;)): void</em>                                                         | Append additional header `field` with value `val`. _Examples_:<li>      `this.append('Link', ['<http://localhost>', '<http://localhost:3000>'])`</li><li>      `this.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly')`</li><li>      `this.append('Warning', '199 Miscellaneous warning')`</li>                                                                                    |
| __flushHeaders*__ | <em>function(): void</em>                                                                                                | Flush any set headers, and begin the body.                                                                                                                                                                                                                                                                                                                                          |
| __status*__       | <em>number</em>                                                                                                          | Get/set response status code.                                                                                                                                                                                                                                                                                                                                                       |
| __message*__      | <em>string</em>                                                                                                          | Get/set response status message.                                                                                                                                                                                                                                                                                                                                                    |
| __body*__         | <em>(string \| !Buffer \| !Object \| !stream.Stream)</em>                                                                | Get/set response body.                                                                                                                                                                                                                                                                                                                                                              |
| __length*__       | <em>number</em>                                                                                                          | Return parsed response `Content-Length` when present. Set `Content-Length` field to `n`.                                                                                                                                                                                                                                                                                            |
| __type*__         | <em>string</em>                                                                                                          | Return the response mime type void of parameters such as "charset". Set Content-Type response header with `type` through `mime.lookup()` when it does not contain a charset. _Examples_:<li>      `this.type = '.html'`</li><li>      `this.type = 'html'`</li><li>      `this.type = 'json'`</li><li>      `this.type = 'application/json'`</li><li>      `this.type = 'png'`</li> |
| __lastModified*__ | <em>Date</em>                                                                                                            | Get the Last-Modified date in Date form, if it exists. Set the Last-Modified date using a string or a Date. _Examples_:<li>      `this.response.lastModified = new Date()`</li><li>      `this.response.lastModified = '2013-09-13'`</li>                                                                                                                                           |
| __etag*__         | <em>string</em>                                                                                                          | Get/Set the ETag of a response. This will normalize the quotes if necessary. _Examples_:<li>      `this.response.etag = 'md5hashsum'`</li><li>      `this.response.etag = '"md5hashsum"'`</li><li>      `this.response.etag = 'W/"123456789"'`</li>                                                                                                                                 |
| __headerSent*__   | <em>boolean</em>                                                                                                         | Check if a header has been written to the socket.                                                                                                                                                                                                                                                                                                                                   |
| __writable*__     | <em>boolean</em>                                                                                                         | Checks if the request is writable. Tests for the existence of the socket as _Node.JS_ sometimes does not set it.                                                                                                                                                                                                                                                                    |

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## Copyright

The Koa web server by its [authors](https://github.com/koajs/koa).

---

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco" />
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a> for <a href="https://idio.cc">Idio</a> 2019</th>
    <th>
      <a href="https://idio.cc">
        <img src="https://avatars3.githubusercontent.com/u/40834161?s=100" width="100" alt="Idio" />
      </a>
    </th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif"
          alt="Tech Nation Visa" />
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>