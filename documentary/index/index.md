# @goa/koa

%NPM: @goa/goa%

This is the source code for the `@goa/koa` repository that actually compiles this source code. Please navigate there for the documentation.

`@goa/koa` is the [Koa web-sever](https://koajs.com) compiled and optimised with _Google Closure Compiler_ so that it has only 1 dependency (`mime-db`, for easy access to upgrades). The types are written as JSDoc and don't require installing typings. The aim of this project is to demonstrate how to modernise the old-school NPM package making, including starting to use import/export statements without _Babel_, restoring to pure _JSDoc_ without TypeScript, and compiling the code into the single executable using the compiler, and testing the code with [_Zoroaster_](https://contexttesting.com) testing framework which is twice as fast and weighs 500KB against 50MB compared with _Jest_ (as used in the original repository).

<img src="doc/ic.png" alt="Compiled Source Code In 2400 lines." align="right">

<!-- therefore they work not just with TypeScript-based editors and don't require downloading additional data. -->

```sh
yarn add @goa/koa
```

## Table Of Contents

%TOC%

%~%

## Goa

Goa is the same application, as Koa. It has the same interface for the app object, as well as context, request and response API.

<table>
<!-- block-start -->
<tr/>
<tr><td>

%EXAMPLE: example, ../src => @goa/goa%
</td>
<td>

%FORK example%
</td></tr>
</table>

## Types

The types detailed information can be found [here](doc/TYPES.md). This is a detailed breakdown of type annotations that was used for compilation, therefore it's rather raw because it's meant for generates externs and typedefs for JSDoc. The Koa documentation can be found on its page.

%~%

## Packages

The Koa dependencies as packages had to be rewritten in ES6. Some of them were created as separate packages, and some were included in the source code (repository) in the `modules` directory.

```table
[
  ["Dependency", "Type"],
  ["`cache-content-type`", "module"],
  ["`content-disposition`", "module"],
  ["`delegates`", "module"],
  ["`ee-first`", "module"],
  ["`error-inject`", "module"],
  ["`escape-html`", "module"],
  ["`fresh`", "module"],
  ["`http-assert`", "module"],
  ["`http-errors`", "module"],
  ["`koa-compose`", "module"],
  ["`koa-is-json`", "module"],
  ["`on-finished`", "module"],
  ["`only`", "module"],
  ["`parseurl`", "module"],
  ["`statuses`", "module"]
]
```

The external modules were created with tests also written to ensure their source and compiled versions work as expected.

```table
[
  ["Dependency", "Type (dev)", "Description"],
  ["`@goa/accepts`", "npm", "Higher-Level Content Negotiation."],
  ["`@goa/content-type`", "npm", "Create and parse HTTP Content-Type header according to RFC 7231."],
  ["`@goa/cookies`", "npm", "Signed And Unsigned Cookies Based On Keygrip."],
  ["`@goa/is-generator-function`", "npm", "Checks If The Function Is An ES6 Generator."],
  ["`@goa/mime-types`", "npm", "The Ultimate Javascript Content-Type Utility."],
  ["`@goa/negotiator`", "npm", "HTTP Content Negotiation."],
  ["`@goa/type-is`", "npm", "Infer The Content-Type Of A Request."],
  ["`@goa/vary`", "npm", "Manipulate The HTTP Vary header."],
  ["`@idio/debug`", "npm", "Log Debugging Information."],
  ["`mime-db`", "npm-prod", "Installed Aia @goa/mime-types."]
]
```

%~%