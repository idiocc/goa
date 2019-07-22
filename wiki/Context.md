The context is created from the base prototype for each request. It can be used to quickly access the request and response APIs, like negotiating content-encoding, or writing an object to `body` to get it serialised as JSON.

<table>
<tr><th>Table Of Contents</th></tr>
<!-- block-start -->
<tr><td>

%TOC%
<img src="https://github.com/idiocc/goa/blob/master/wiki/context.gif" alt="Context API">

</td></tr>
<!-- /block-end -->
</table>



The total context consists of
- the _BaseContext_ class,
- the Request API from the _ContextDelegatedRequest_
- and the Response API from the _ContextDelegatedResponse_.

This allows to write the delegator classes, which are then extended both by the context, and the request/response objects themselves. This is consistent with how Koa typings were written.

<typedef flatten narrow>../goa/types/Context.xml</typedef>

The base _Context_ contains the cookies, error throwing, state and other APIs, and also allows to access the request and response instances.

<typedef flatten narrow name="ContextDelegatedResponse">../goa/types/Response.xml</typedef>

The methods from the [_Response_](Response.md) API are proxied in the context.

<typedef flatten narrow name="ContextDelegatedRequest">../goa/types/Request.xml</typedef>

The methods from the [_Request_](Request.md) API are also available in the context for easier access.