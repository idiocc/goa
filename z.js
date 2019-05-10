import { readFileSync, writeFileSync } from 'fs'
import { relative } from 'path'

let [,,file] = process.argv
file = relative('', file)

let content = `${readFileSync(file)}`
content = content
  .replace(`
'use strict';

`, '')
  .replace(`'../..'`, `'../../src'`)
  .replace('const request = require(\'supertest\');\n', '')
  .replace(
    /const (.+?) = require\('(.+?)'\)/g, (m, what, where) => {
      return `import ${what} from '${where}'`
    })
  .replace(/it\('(.+?)', function \((.*?)\) {/g, (m, n) => {
    return `'${n}'() {`
  })
  .replace(/it\('(.+?)', \((.*?)\) => {/g, (m, n) => {
    return `'${n}'() {`
  })
  .replace(/describe\('(.+?)', \(\) => {/g, (m, n) => {
    return `'${n}': {`
  })
  .replace(/should return/g, 'returns')

// console.log(content)
const out = file.replace(/^test/, 'test/spec')
console.log(out)
writeFileSync(out, content)
return

const lex = content.split(/(it\(|describe\(|.)/)

const isQuote = (s) => {
  return (s == '"' || s == '\'')
}

const parser = (tokens) => {
  let c = 0
  let o = ''

  const peek = () => tokens[c]
  const peekNext = (n = 1) => tokens[c + n]
  const consume = () => tokens[c++]
  const consumeWhitespace = () => {
    while (/\s/.test(peek())) {
      o += peek()
      consume()
    }
  }
  const write = () => {
    const t = peek()
    o += t
    consume()
  }

  let level = 0
  const parseDescribe = () => {
    level++
    consume() // consumes describe(
    if (level == 1) o += 'export const'
    // o += 'const '
    consumeWhitespace()
    if (isQuote(peek())) throw new Error('\' or " expected')
    write()
    while(!isQuote(peek())) {
      write()
    }
    write()

    o += ': {'
  }
  const parseIt = () => {

  }
  const parseTestSuite = () => {
    let t
    while ((t = peek()) !== undefined) {
      if (t == 'describe(') {
        parseDescribe()
      } else {
        write()
      }
    }
  }

  parseTestSuite()
  return o
}

// console.log(parser(lex))