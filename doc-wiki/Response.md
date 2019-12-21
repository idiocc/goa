Similarly to the request, the response API is accessed from `ctx.request`, but some methods are also available in the `ctx` itself.

<typedef narrow slimFunctions name="ContextDelegatedResponse">types/Response.xml</typedef>

The rest of the properties not delegated to the context, can only be referenced from the `ctx.request` object.

<typedef details="ContentDisposition" name="ContentDisposition">types/Response.xml</typedef>

<typedef narrow slimFunctions name="BaseResponse">types/Response.xml</typedef>

<typedef narrow name="Response">types/Response.xml</typedef>
<!-- <typedef flatten narrow name="BaseResponse">types/Response.xml</typedef> -->
