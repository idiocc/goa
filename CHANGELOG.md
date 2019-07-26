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