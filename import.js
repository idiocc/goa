import { readFileSync, writeFileSync } from 'fs'

const [,,file] = process.argv

const f = `${readFileSync(file)}`
const r = f.replace(
  /const (.+?) = require\('(.+?)'\)/g, (m, what, where) => {
    return `import ${what} from '${where}'`
  })
writeFileSync(file, r)