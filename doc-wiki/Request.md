The Koa's request API is accessed via the `ctx.request` method and is called _ContextDelegatedRequest_. It is context delegated because this API is available directly from the context object `ctx`, e.g.,

```js
ctx.request.acceptsCharsets ===
ctx.acceptsCharsets
```

<typedef narrow slimFunctions name="ContextDelegatedRequest">types/Request.xml</typedef>

The raw request is referenced in the `ctx.req` property.

In addition, there are some properties which are not delegated to the context, and can only be retrieved via the `ctx.request` object.

<typedef narrow name="BaseRequest">types/Request.xml</typedef>

<typedef narrow name="Request">types/Request.xml</typedef>

<!-- <typedef flatten narrow name="BaseRequest">types/Request.xml</typedef> -->
