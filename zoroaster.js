import { readFileSync, writeFileSync } from 'fs'

const [,,file] = process.argv

let content = `${readFileSync(file)}`
content = content
  .replace(/it\('(.+?)', function \(\) {/g, (m, n) => {
    return `'${n}'() {`
  })
  .replace(/describe\('(.+?)', function \(\) {/g, (m, n) => {
    return `'${n}': {`
  })
  .replace(/should return/g, 'returns')

console.log(content)
writeFileSync(file, content)

// const parser = (tokens) => {
//   let c = 0

//   const peek = () => tokens[c]
//   const peekNext = (n = 1) => tokens[c + n]
//   const consume = () => tokens[c++]

//   return parseTestSuite()
// }