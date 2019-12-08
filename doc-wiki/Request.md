The Koa's request API is accessed via the `ctx.request` method and is called _ContextDelegatedRequest_. It is context delegated because this API is available directly from the context object `ctx`, e.g.,

```js
ctx.request.acceptsCharsets ===
ctx.acceptsCharsets
```

<typedef flatten narrow name="ContextDelegatedRequest">../goa/types/Request.xml</typedef>

The raw request is referenced in the `ctx.req` property.

In addition, there are some properties which are not delegated to the context, and can only be retrieved via the `ctx.request` object.

<typedef flatten narrow name="BaseRequest">../goa/types/Request.xml</typedef>

<typedef flatten narrow name="Request">../goa/types/Request.xml</typedef>

<!-- <typedef flatten narrow name="BaseRequest">../goa/types/Request.xml</typedef> -->
