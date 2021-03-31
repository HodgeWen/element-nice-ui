const components = require('../../components.json')
const fs = require('fs')
const { cwd } = require('process')
const { resolve } = require('path')

let moduleContent = ''

Object.keys(components).forEach(componentName => {
  if (!fs.existsSync(resolve(cwd(), `types/${componentName}.d.ts`))) return
  const camelName = componentName
    .split('-')
    .map(string => string.replace(/^[A-z]{1}/, string[0].toUpperCase())).join('')
  moduleContent += `
declare module 'element-nice-ui/lib/${componentName}' {
  import { El${camelName} } from 'element-nice-ui/types/${componentName}'
  const ${camelName}: El${camelName}
  export default ${camelName}
}
`
})

fs.writeFileSync(resolve(cwd(), 'types/module.d.ts'), moduleContent)
