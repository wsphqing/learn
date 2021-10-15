const ejs = require('ejs')
const { runTransformation } = require('vue-codemod')

const ConfigTransform = require('./ConfigTransform')
const sortObject = require('./utils/sortObject')
const normalizeFilePaths = require('./utils/normalizeFilePaths')


const isObject = (val) => val && typeof val === 'object'

/**
 * 结尾补充\n
 * @param {string} str
 * @returns 
 */
const ensureEOL = str => {
  if (str.charAt(str.length - 1) !== '\n') {
    return str + '\n'
  }
  return str
}

const defaultConfigTransforms = {
  babel: new ConfigTransform({
    file: {
      js: ['babel.config.js'],
    },
  }),
  postcss: new ConfigTransform({
    file: {
      js: ['postcss.config.js'],
      json: ['.postcssrc.json', '.postcssrc'],
      yaml: ['.postcssrc.yaml', '.postcssrc.yml'],
    },
  }),
  eslintConfig: new ConfigTransform({
    file: {
      js: ['.eslintrc.js'],
      json: ['.eslintrc', '.eslintrc.json'],
      yaml: ['.eslintrc.yaml', '.eslintrc.yml'],
    },
  }),
  jest: new ConfigTransform({
    file: {
      js: ['jest.config.js'],
    },
  }),
  browserslist: new ConfigTransform({
    file: {
      lines: ['.browserslistrc'],
    },
  })
}

const reservedConfigTransforms = {
  vue: new ConfigTransform({
    file: {
        js: ['vue.config.js'],
    },
  }),
}

class Generator {
  constructor(pkg, context) {
    this.pkg = pkg
    this.context = context

    this.rootOptions = {}
    this.imports = {}
    this.files = {}
    this.entryFile = `src/main.js`
    this.fileMiddlewares = []
    this.configTransforms = {}
  }

  extendPackage(fields) {
    const pkg = this.pkg
    for (const key in fields) {
      const value = fields[key]
      const existing = this.pkg[key]
      if (isObject(value) && (key === 'dependencies' || key === 'devDependencies' || key === 'scripts')) {
        pkg[key] = Object.assign(existing || {}, value)
      } else {
        pkg[key] = value
      }
    }
  }

  async generate() {
    // 从package.json中提取文件
    this.extractConfigFiles()
    // 解析文件内容
    await this.resolveFiles()
    // 将 package.json 中的字段排序
    this.sortPkg()
  }

  // 将 package.json 中的配置提取出来 生成单独文件
  // 例如将 package.json 中的
  // babel: {
  //     presets: ['@babel/preset-env']
  // },
  // 提取出来变成 babel.config.js 文件
  extractConfigFiles() {
    const configTransforms = {
      ...defaultConfigTransforms,
      ...this.configTransforms,
      ...reservedConfigTransforms
    }

    const extract = key => {
      if (configTransforms[key] && this.pkg[key]) {
        const value = this.pkg[key]
        const configTransform = configTransforms[key]

        const res = configTransform.transform(
          value,
          this.files,
          this.context
        )

        const { content, filename } = res
        // 如果文件不是以 \n 结尾，则补上 \n
        this.files[filename] = ensureEOL(content)
        delete this.pkg[key]
      }
    }

    extract('vue')
    extract('babel')
  }

  // 使用 ejs 解析 lib\generator\xx\template 中的文件
  async resolveFiles() {
    const files = this.files
    for (const middleware of this.fileMiddlewares) {
      await middleware(files, ejs.render)
    }

    // normalize file paths on windows
    // all paths are converted to use / instead of \
    // 将反斜杠 \ 转换为正斜杠 /
    normalizeFilePaths(files)

    // 处理 import 语句的导入和 new Vue() 选项的注入
    // vue-codemod 库，对代码进行解析得到 AST，再将 import 语句和根选项注入
    Object.keys(files).forEach(file => {
      let imports = this.imports[file]
      imports = imports instanceof Set ? Array.from(imports) : imports
      if (imports && imports.length > 0) {
        files[file] = runTransformation(
          { path: file, source: files[file] },
          require('./utils/codemods/injectImports'),
          { imports }
        )
      }

      let injections = this.rootOptions[file]
      injections = injections instanceof Set ? Array.from(injections) : injections
      if (injections && injections.length > 0) {
        files[file] = runTransformation(
          { path: file, source: files[file] },
          require('./utils/codemods/injectOptions'),
          { injections },
        )
      }
    })
  }

  // 按照下面的顺序对 package.json 中的 key 进行排序
  sortPkg() {
    // 自然排序
    this.pkg.dependencies = sortObject(this.pkg.dependencies)
    this.pkg.devDependencies = sortObject(this.pkg.devDependencies)

    // 参照排序
    this.pkg.scripts = sortObject(this.pkg.scripts, [
      'dev',
      'build',
      'test:unit',
      'test:e2e',
      'lint',
      'deploy',
    ])
    this.pkg = sortObject(this.pkg, [
      'name',
      'version',
      'private',
      'description',
      'author',
      'scripts',
      'husky',
      'lint-staged',
      'main',
      'module',
      'browser',
      'jsDelivr',
      'unpkg',
      'files',
      'dependencies',
      'devDependencies',
      'peerDependencies',
      'vue',
      'babel',
      'eslintConfig',
      'prettier',
      'postcss',
      'browserslist',
      'jest',
    ])
  }
}

module.exports = Generator