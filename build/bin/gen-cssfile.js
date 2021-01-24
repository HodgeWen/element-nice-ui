var fs = require('fs')
var path = require('path')
var Components = require('../../components.json')
var themes = ['theme-chalk']
Components = Object.keys(Components)
var basepath = path.resolve(__dirname, '../..')

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile()
  } catch (err) {
    return false
  }
}

themes.forEach((theme) => {
  var isSCSS = theme !== 'theme-default'
  var indexContent = isSCSS ? '@import "./base.scss";\n' : '@import "./base.css";\n'

  Components.forEach(function(key) {
    if (['icon', 'option', 'option-group'].indexOf(key) > -1) return
    var fileName = key + (isSCSS ? '.scss' : '.css')
    indexContent += '@import "./' + fileName + '";\n'
    var filePath = path.resolve(basepath, theme, 'src', fileName)
    var fileJsPath = path.resolve(basepath, theme, 'components', key + '.js')

    if (!fileExists(filePath)) {
      fs.writeFileSync(filePath, '', 'utf8')
      console.log(theme, ' 创建遗漏的 ', fileName, ' 文件')
    } else {
      fs.writeFileSync(
        filePath,
        fs
          .readFileSync(filePath)
          .toString()
          .replace(/(?<!\/\/\s)@import\s*(?!(.*common.*;|.*mixins.*;))/g, `// @import `),
        'utf-8'
      )
    }
    if (!fileExists(fileJsPath)) {
      let matched = fs
        .readFileSync(filePath)
        .toString()
        .match(/@import.*;/g)
      let content = ''
      if (matched) {
        matched.forEach((item) => {
          if (/(common|mixins)/.test(item)) return
          if (/date-picker/.test(item)) {
            content += `import '${path.join(
              '../src',
              item.replace(/(@import|'|"|;)/g, '').trim()
            )}.scss'\n`
            return
          }
          content += `import '${path.join(
            './',
            item.replace(/(@import|'|"|;|\.scss)/g, '').trim()
          )}.js'\n`
        })
      }
      content += `import '../src/${fileName}'`
      fs.writeFileSync(fileJsPath, content, 'utf8')
      console.log('创建 ', key + '.js 文件')
    }
  })
  fs.writeFileSync(
    path.resolve(basepath, theme, 'src', isSCSS ? 'index.scss' : 'index.css'),
    indexContent
  )
})
