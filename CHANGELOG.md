## 21 December 2019

### [1.6.1](https://github.com/idiocc/goa/compare/v1.6.0...v1.6.1)

- [feature] Export context, request and response.

### [1.6.0](https://github.com/idiocc/goa/compare/v1.5.2...v1.6.0)

- [feature] Pass options to the application constructor.

## 20 December 2019

### [1.5.2](https://github.com/idiocc/goa/compare/v1.5.1...v1.5.2)

- [package] Add `externs` field to _package.json_.

### [1.5.1](https://github.com/idiocc/goa/compare/v1.5.0...v1.5.1)

- [doc] Fix linking of _Middleware_ in wiki and export the correct link in `typedefs.json`.
- [types] Add _Content-Disposition_ type for attachment options correctly.

## 19 December 2019

### [1.5.0](https://github.com/idiocc/goa/compare/v1.4.3...v1.5.0)

- [deps] Update cookies and accepts.
- [doc] Document using `include-typedefs` and publish `typedefs.json`.

## 18 December 2019

### [1.4.3](https://github.com/idiocc/goa/compare/v1.4.2...v1.4.3)

- [api] Add JSON methods to application.

### [1.4.2](https://github.com/idiocc/goa/compare/v1.4.1...v1.4.2)

- [fix] Application to interface.

### [1.4.1](https://github.com/idiocc/goa/compare/v1.4.0...v1.4.1)

- [package] Publish examples.
- [types] Fix some type errors.

### [1.4.0](https://github.com/idiocc/goa/compare/v1.3.7...v1.4.0)

- [feature] Rewrite all types to use functions and JSDoc examples.
- [license] Update license to _Affero_.

## 13 December 2019

### [1.3.7](https://github.com/idiocc/goa/compare/v1.3.6...v1.3.7)

- [deps] Install `@goa/compose` separately.

## 9 December 2019

### [1.3.6](https://github.com/idiocc/goa/compare/v1.3.5...v1.3.6)

- [fix] Remove some warnings.
- [fix] Types are easier to understand.

## 26 July 2019

### [1.3.5](https://github.com/idiocc/goa/compare/v1.3.4...v1.3.5)

- [deps] Non-functional update of _accepts_, _cookies_.
- [doc] Create wiki with all types.

## 21 July 2019

### [1.3.4](https://github.com/idiocc/goa/compare/v1.3.3...v1.3.4)

- [deps] Update `cookies` to fix warnings and make keys optional property of the _Cookies_ class.
- [deps] Update [`is-generator-fn`](https://github.com/idiocc/is-generator-function) for correctly annotated _!Function_ type.
- [annotations] Cast stream.
    ```
    onFinish(/** @type {!http.ServerResponse} */ (this.res), destroy.bind(null, /** @type {stream.Stream} */ (val)))
    ```

## 19 July 2019

### [1.3.3](https://github.com/idiocc/goa/compare/v1.3.2...v1.3.3)

- [doc] Add some documentation, remove unused files.

## 3 July 2019

### [1.3.2](https://github.com/idiocc/goa/compare/v1.3.1...v1.3.2)

- [deps] Fix `@license` in `@goa/type-is/media-typer` package.

### [1.3.1](https://github.com/idiocc/goa/compare/v1.3.0...v1.3.1)

- [deps] Move code to `@goa/content-type` and `@goa/type-is` packages.

## 21 June 2019

### [1.3.0](https://github.com/idiocc/goa/compare/v1.2.0...v1.3.0)

- [package] Publish types as an independent package.

## 20 June 2019

### [1.2.1](https://github.com/idiocc/goa/compare/v1.2.0...v1.2.1)

- [package] Export the app via main.

### [1.2.0](https://github.com/idiocc/goa/compare/v1.1.1...v1.2.0)

- [types] Fix types with `@` for TypeScript 3.5.
- [package] Export main field with the types.

## 12 May 2019

### [1.1.1](https://github.com/idiocc/goa/compare/v1.1.0...v1.1.1)

- [tests] Don't depend on the _package.json_ for testing, add the _stream_ fixture.

### [1.1.0](https://github.com/idiocc/goa/compare/v1.0.0...v1.1.0)

- [package] Publish tests to be able to test the compiled version.

### [1.0.0](https://github.com/idiocc/goa/compare/v0.0.0-re...v1.0.0)

- [package] Leave only the source code with dependencies.

### 0.0.0-pre

- Create `@goa/koa` with _[`My New Package`](https://mnpjs.org)_.
- [repository]: `src`, [`test`](https://contexttesting.com), [`documentary`](https://readme.page) & [`types`](https://typedef.page).