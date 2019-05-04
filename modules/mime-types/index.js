import db from './mime-db'
import { extname } from 'path'

const EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/
const TEXT_TYPE_REGEXP = /^text\//i

export const charsets = { 'lookup': charset }

export const extensions = Object.create(null)
export const types = Object.create(null)

// Populate the extensions/types maps
populateMaps(extensions, types)

/**
 * Get the default charset for a MIME type.
 * @param {string} type
 * @return {boolean|string}
 */
export function charset(type) {
  if (!type || typeof type != 'string') return false

  // TODO: use media-typer
  const match = EXTRACT_TYPE_REGEXP.exec(type)
  const mime = match && db[match[1].toLowerCase()]

  if (mime && mime['charset']) return mime['charset']

  // default text/* to utf-8
  if (match && TEXT_TYPE_REGEXP.test(match[1])) return 'UTF-8'

  return false
}

/**
 * Create a full Content-Type header given a MIME type or extension.
 * @param {string} str
 * @return {boolean|string}
 */
export function contentType(str) {
  // TODO: should this even be in this module?
  if (!str || typeof str != 'string') return false

  let mime = str.indexOf('/') == -1
    ? lookup(str)
    : str

  if (!mime) return false

  // TODO: use content-type or other module
  if (!mime.includes('charset')) {
    const c = charset(mime)
    if (c) mime += '; charset=' + c.toLowerCase()
  }

  return mime
}

/**
 * Get the default extension for a MIME type.
 * @param {string} type
 * @return {boolean|string}
 */
export function extension(type) {
  if (!type || typeof type != 'string') return false

  // TODO: use media-typer
  const match = EXTRACT_TYPE_REGEXP.exec(type)

  // get extensions
  const exts = match && extensions[match[1].toLowerCase()]

  if (!exts || !exts.length) return false

  return exts[0]
}

/**
 * Lookup the MIME type for a file path/extension.
 * @param {string} path
 * @return {boolean|string}
 */
export function lookup(path) {
  if (!path || typeof path != 'string') return false

  // get the extension ("ext" or ".ext" or full path)
  let e = extname('x.' + path)
    .toLowerCase()
    .substr(1)

  if (!e) return false

  return types[e] || false
}

/**
 * Populate the extensions and types maps.
 * @private
 */
function populateMaps(es, ts) {
  // source preference (least -> most)
  const preference = ['nginx', 'apache', undefined, 'iana']

  Object.keys(db).forEach((type) => {
    const mime = db[type]
    const exts = mime['extensions']

    if (!exts || !exts.length) return

    // mime -> extensions
    es[type] = exts

    // extension -> mime
    for (let i = 0; i < exts.length; i++) {
      const e = exts[i]

      if (ts[e]) {
        const from = preference.indexOf(db[ts[e]]['source'])
        const to = preference.indexOf(mime['source'])

        if (ts[e] != 'application/octet-stream' &&
          (from > to || (from == to && ts[e].substr(0, 12) == 'application/'))) {
          // skip the remapping
          continue
        }
      }

      // set the extension -> mime
      ts[e] = type
    }
  })
}

/**
 * @license MIT
 * Copyright (c) 2014 Jonathan Ong <me@jongleberry.com>
 * Copyright (c) 2015 Douglas Christopher Wilson <doug@somethingdoug.com>
 * https://npmjs.com/package/mime-types
 */