import { strictEqual } from 'assert'
import { charset, contentType, extension, lookup } from './'

export default {
  '.charset(type)': {
    'returns "UTF-8" for "application/json"'() {
      strictEqual(charset('application/json'), 'UTF-8')
    },
    'returns "UTF-8" for "application/json; foo=bar"'() {
      strictEqual(charset('application/json; foo=bar'), 'UTF-8')
    },
    'returns "UTF-8" for "application/javascript"'() {
      strictEqual(charset('application/javascript'), 'UTF-8')
    },
    'returns "UTF-8" for "application/JavaScript"'() {
      strictEqual(charset('application/JavaScript'), 'UTF-8')
    },
    'returns "UTF-8" for "text/html"'() {
      strictEqual(charset('text/html'), 'UTF-8')
    },
    'returns "UTF-8" for "TEXT/HTML"'() {
      strictEqual(charset('TEXT/HTML'), 'UTF-8')
    },
    'returns "UTF-8" for any text/*'() {
      strictEqual(charset('text/x-bogus'), 'UTF-8')
    },
    'returns false for unknown types'() {
      strictEqual(charset('application/x-bogus'), false)
    },
    'returns false for any application/octet-stream'() {
      strictEqual(charset('application/octet-stream'), false)
    },
    'returns false for invalid arguments'() {
      strictEqual(charset({}), false)
      strictEqual(charset(null), false)
      strictEqual(charset(true), false)
      strictEqual(charset(42), false)
    },
  },
  '.contentType(extension)': {
    'returns content-type for "html"'() {
      strictEqual(contentType('html'), 'text/html; charset=utf-8')
    },
    'returns content-type for ".html"'() {
      strictEqual(contentType('.html'), 'text/html; charset=utf-8')
    },
    'returns content-type for "jade"'() {
      strictEqual(contentType('jade'), 'text/jade; charset=utf-8')
    },
    'returns content-type for "json"'() {
      strictEqual(contentType('json'), 'application/json; charset=utf-8')
    },
    'returns false for unknown extensions'() {
      strictEqual(contentType('bogus'), false)
    },
    'returns false for invalid arguments'() {
      strictEqual(contentType({}), false)
      strictEqual(contentType(null), false)
      strictEqual(contentType(true), false)
      strictEqual(contentType(42), false)
    },
  },
  '.contentType(type)': {
    'should attach charset to "application/json"'() {
      strictEqual(contentType('application/json'), 'application/json; charset=utf-8')
    },
    'should attach charset to "application/json; foo=bar"'() {
      strictEqual(contentType('application/json; foo=bar'), 'application/json; foo=bar; charset=utf-8')
    },
    'should attach charset to "TEXT/HTML"'() {
      strictEqual(contentType('TEXT/HTML'), 'TEXT/HTML; charset=utf-8')
    },
    'should attach charset to "text/html"'() {
      strictEqual(contentType('text/html'), 'text/html; charset=utf-8')
    },
    'should not alter "text/html; charset=iso-8859-1"'() {
      strictEqual(contentType('text/html; charset=iso-8859-1'), 'text/html; charset=iso-8859-1')
    },
    'returns type for unknown types'() {
      strictEqual(contentType('application/x-bogus'), 'application/x-bogus')
    },
  },
  '.extension(type)': {
    'returns extension for mime type'() {
      strictEqual(extension('text/html'), 'html')
      strictEqual(extension(' text/html'), 'html')
      strictEqual(extension('text/html '), 'html')
    },
    'returns false for unknown type'() {
      strictEqual(extension('application/x-bogus'), false)
    },
    'returns false for non-type string'() {
      strictEqual(extension('bogus'), false)
    },
    'returns false for non-strings'() {
      strictEqual(extension(null), false)
      strictEqual(extension(undefined), false)
      strictEqual(extension(42), false)
      strictEqual(extension({}), false)
    },
    'returns extension for mime type with parameters'() {
      strictEqual(extension('text/html;charset=UTF-8'), 'html')
      strictEqual(extension('text/HTML; charset=UTF-8'), 'html')
      strictEqual(extension('text/html; charset=UTF-8'), 'html')
      strictEqual(extension('text/html; charset=UTF-8 '), 'html')
      strictEqual(extension('text/html ; charset=UTF-8'), 'html')
    },
  },
  '.lookup(extension)': {
    'returns mime type for ".html"'() {
      strictEqual(lookup('.html'), 'text/html')
    },
    'returns mime type for ".js"'() {
      strictEqual(lookup('.js'), 'application/javascript')
    },
    'returns mime type for ".json"'() {
      strictEqual(lookup('.json'), 'application/json')
    },
    'returns mime type for ".rtf"'() {
      strictEqual(lookup('.rtf'), 'application/rtf')
    },
    'returns mime type for ".txt"'() {
      strictEqual(lookup('.txt'), 'text/plain')
    },
    'returns mime type for ".xml"'() {
      strictEqual(lookup('.xml'), 'application/xml')
    },
    'should work without the leading dot'() {
      strictEqual(lookup('html'), 'text/html')
      strictEqual(lookup('xml'), 'application/xml')
    },
    'should be case insensitive'() {
      strictEqual(lookup('HTML'), 'text/html')
      strictEqual(lookup('.Xml'), 'application/xml')
    },
    'returns false for unknown extension'() {
      strictEqual(lookup('.bogus'), false)
      strictEqual(lookup('bogus'), false)
    },
    'returns false for non-strings'() {
      strictEqual(lookup(null), false)
      strictEqual(lookup(undefined), false)
      strictEqual(lookup(42), false)
      strictEqual(lookup({}), false)
    },
  },
  '.lookup(path)': {
    'returns mime type for file name'() {
      strictEqual(lookup('page.html'), 'text/html')
    },
    'returns mime type for relative path'() {
      strictEqual(lookup('path/to/page.html'), 'text/html')
      strictEqual(lookup('path\\to\\page.html'), 'text/html')
    },
    'returns mime type for absolute path'() {
      strictEqual(lookup('/path/to/page.html'), 'text/html')
      strictEqual(lookup('C:\\path\\to\\page.html'), 'text/html')
    },
    'should be case insensitive'() {
      strictEqual(lookup('/path/to/PAGE.HTML'), 'text/html')
      strictEqual(lookup('C:\\path\\to\\PAGE.HTML'), 'text/html')
    },
    'returns false for unknown extension'() {
      strictEqual(lookup('/path/to/file.bogus'), false)
    },
    'returns false for path without extension'() {
      strictEqual(lookup('/path/to/json'), false)
    },
    'path with dotfile': {
      'returns false when extension-less'() {
        strictEqual(lookup('/path/to/.json'), false)
      },
      'returns mime type when there is extension'() {
        strictEqual(lookup('/path/to/.config.json'), 'application/json')
      },
      'returns mime type when there is extension, but no path'() {
        strictEqual(lookup('.config.json'), 'application/json')
      },
    },
  },
}