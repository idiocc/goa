__<a name="type-_goaapplication">`_goa.Application`</a>__: The application interface.

|      Name       |       Type       |                                                                                                 Description                                                                                                  |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| proxy           | <em>boolean</em> | Whether the server is running behind a proxy.                                                                                                                                                                |
| subdomainOffset | <em>number</em>  | For example, if the domain is "tobi.ferrets.example.com": If `app.subdomainOffset` is not set, request.subdomains is `["ferrets", "tobi"]`. If `app.subdomainOffset` is 3, request.subdomains is `["tobi"]`. |

[`import('http').IncomingMessage`](https://nodejs.org/api/http.html#http_class_http_incomingmessage) __<a name="type-httpincomingmessage">`http.IncomingMessage`</a>__: The first argument to the 'request' event.

[`import('http').ServerResponse`](https://nodejs.org/api/http.html#http_response_socket) __<a name="type-httpserverresponse">`http.ServerResponse`</a>__: The second parameter to the 'request' event.

__<a name="type-_goaresponse">`_goa.Response`</a>__: The response API.

|       Name        |                                                           Type                                                           |                                     Description                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| __app*__          | <em><a href="#type-_goaapplication" title="The application interface.">_goa.Application</a></em>                         | The reference to the application.                                                    |
| __ctx*__          | <em>_goa.Context</em>                                                                                                    | The reference to the context instance.                                               |
| __request*__      | <em>_goa.Request</em>                                                                                                    | The reference to the request instance.                                               |
| __req*__          | <em><a href="#type-httpincomingmessage" title="The first argument to the 'request' event.">http.IncomingMessage</a></em> | The message from the client.                                                         |
| __res*__          | <em><a href="#type-httpserverresponse" title="The second parameter to the 'request' event.">http.ServerResponse</a></em> | The response from the server.                                                        |
| __attachment*__   | <em>function</em>                                                                                                        | 1     1                                                                              |
| __redirect*__     | <em>function</em>                                                                                                        | 1                                                                                    |
| __remove*__       | <em>function</em>                                                                                                        | 1                                                                                    |
| __vary*__         | <em>function</em>                                                                                                        | 1                                                                                    |
| __set*__          | <em>function</em>                                                                                                        | 1                                                                                    |
| __append*__       | <em>function</em>                                                                                                        | 1                                                                                    |
| __flushHeaders*__ | <em>function</em>                                                                                                        | 1                                                                                    |
| __status*__       | <em>*</em>                                                                                                               | 1                                                                                    |
| __message*__      | <em>*</em>                                                                                                               | 1                                                                                    |
| __body*__         | <em>*</em>                                                                                                               | 1                                                                                    |
| __length*__       | <em>number</em>                                                                                                          | Return parsed response Content-Length when present. Set Content-Length field to `n`. |
| __type*__         | <em>*</em>                                                                                                               | 1                                                                                    |
| __lastModified*__ | <em>*</em>                                                                                                               | 1                                                                                    |
| __etag*__         | <em>*</em>                                                                                                               | 1                                                                                    |
| __headerSent*__   | <em>boolean</em>                                                                                                         | 1                                                                                    |
| __writable*__     | <em>boolean</em>                                                                                                         | 1                                                                                    |