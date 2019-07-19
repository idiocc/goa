# @goa/koa

[![npm version](https://badge.fury.io/js/%40goa%2Fgoa.svg)](https://npmjs.org/package/@goa/goa)

This is the source code for the `@goa/koa` repository that actually compiles this source code. Please navigate there for the documentation.

<img src="doc/ic.png" alt="Compiled Source Code In 2400 lines." align="right">

`@goa/koa` is the [Koa web-sever](https://koajs.com) compiled and optimised with _Google Closure Compiler_ so that it has only 1 dependency (`mime-db`, for easy access to upgrades). The types are written as JSDoc and don't require installing typings. The aim of this project is to demonstrate how to modernise the old-school NPM package making, including starting to use import/export statements without _Babel_, restoring to pure _JSDoc_ without TypeScript, and compiling the code into the single executable using the compiler, and testing the code with [_Zoroaster_](https://contexttesting.com) testing framework which is twice as fast and weighs 500KB against 50MB compared with _Jest_ (as used in the original repository).


```sh
yarn add @goa/koa
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [Goa](#goa)
- [Types](#types)
- [Packages](#packages)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/0.svg?sanitize=true"></a></p>

## Goa

Goa is the same application, as Koa. It has the same interface for the app object, as well as context, request and response API.

<table>
<tr><th><a href="example/index.js">Source</th><th>Output</th></tr>
<tr><td>

```js
import Goa from '@goa/goa'

const app = new Goa()
app.use((ctx) => {
  ctx.body = 'hello world'
})
```
</td>
<td>

```
hello world
```
</td></tr>
</table>

## Types

The types detailed information can be found [here](doc/TYPES.md). This is a detailed breakdown of type annotations that was used for compilation, therefore it's rather raw because it's meant for generates externs and typedefs for JSDoc. The Koa documentation can be found on its page.

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/1.svg?sanitize=true"></a></p>

## Packages

The Koa dependencies as packages had to be rewritten in ES6. Some of them were created as separate packages, and some were included in the source code (repository) in the `modules` directory.

|      Dependency       |  Type  |
| --------------------- | ------ |
| `cache-content-type` | module |
| `content-disposition` | module |
| `delegates` | module |
| `ee-first` | module |
| `error-inject` | module |
| `escape-html` | module |
| `fresh` | module |
| `http-assert` | module |
| `http-errors` | module |
| `koa-compose` | module |
| `koa-is-json` | module |
| `on-finished` | module |
| `only` | module |
| `parseurl` | module |
| `statuses` | module |

The external modules were created with tests also written to ensure their source and compiled versions work as expected.

|          Dependency          | Type (dev) |                           Description                            |
| ---------------------------- | ---------- | ---------------------------------------------------------------- |
| `@goa/accepts` | npm        | Higher-Level Content Negotiation.                                |
| `@goa/content-type` | npm        | Create and parse HTTP Content-Type header according to RFC 7231. |
| `@goa/cookies` | npm        | Signed And Unsigned Cookies Based On Keygrip.                    |
| `@goa/is-generator-function` | npm        | Checks If The Function Is An ES6 Generator.                      |
| `@goa/mime-types` | npm        | The Ultimate Javascript Content-Type Utility.                    |
| `@goa/negotiator` | npm        | HTTP Content Negotiation.                                        |
| `@goa/type-is` | npm        | Infer The Content-Type Of A Request.                             |
| `@goa/vary` | npm        | Manipulate The HTTP Vary header.                                 |
| `@idio/debug` | npm        | Log Debugging Information.                                       |
| `mime-db` | npm-prod   | Installed Aia @goa/mime-types.                                   |

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/2.svg?sanitize=true"></a></p>

## Copyright

The Koa web server by its [authors](https://github.com/koajs/koa).

---

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco">
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a> for <a href="https://idio.cc">Idio</a> 2019</th>
    <th>
      <a href="https://idio.cc">
        <img src="https://avatars3.githubusercontent.com/u/40834161?s=100" width="100" alt="Idio">
      </a>
    </th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif"
          alt="Tech Nation Visa">
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/-1.svg?sanitize=true"></a></p>