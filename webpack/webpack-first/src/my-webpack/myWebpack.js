// myWebpack.js

const fs = require('fs');
const path = require('path');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { transformFromAstSync } = require('@babel/core');

// Compiler构造函数
class Comiler {
  constructor(options = {}) {
    // 获得webpack配置
    this.options = options;
    // 获取入口文件，不存在则使用默认值
    this.entry = this.options.entry || './src/index.js';
    this.entryDir = path.dirname(this.entry);
    // 依赖关系表，第一步的产出
    this.depsGraph = {};
  }
  // 启动webpack打包
  async run() {
    const { entry, entryDir } = this;
    // 从入口文件开始获取模块信息
    this.getModuleInfo(entry, entryDir);
    console.log(this.depsGraph);
    // 获取到模块信息后生成构建内容
    this.outputBuild();
  }
  getModuleInfo(modulePath, dirname) {
    const { depsGraph } = this;
    /*
    利用fs模块和文件路径可以读取到文件内容，然后根据文件内容（import和export）又可以分析出模块之间的依赖关系。
    自己去做这步是没有任何问题的。只是这里为了方便，就利用babelParser库生成一个抽象的模型ast(抽象语法树)。
    ast将我们的代码抽象出来，方便我们操作
    */

    const ast = getAst(modulePath);
    // console.log('ast',     ast);
    // 利用ast和traverse库获得该模块的依赖。原理就是分析了代码中的import语句
    const deps = getDeps(ast, dirname);
    // 利用ast和babel/core将源代码通过babel编码输出。如果不用ast也可以直接使用babel/core的transform方法将源代码转换
    const code = getParseCode(ast);
    // depsGraph保存的模块信息就是code源代码和它的依赖关系
    depsGraph[modulePath] = {
      deps,
      code
    }
    // 如果该模块存在以来deps，就通过递归继续找出下面的依赖，这样循环就找出入口文件开始的所有依赖
    if (Object.keys(deps).length) {
      for (const key in deps) {
        if (Object.hasOwnProperty.call(deps, key)) {
          // 递归获取模块信息
          this.getModuleInfo(deps[key], dirname);
        }
      }
    }
  }
  // 利用fs输出js文件
  outputBuild() {
    const build = `
      (function(depsGraph) {
        // 为了加载入口文件
        function require(module) {
          // 定义模块内部的require函数
          function localRequire(relativePath) {
            // 为了找到要引入模块的绝对路径 通过require加载
            return require(depsGraph[module].deps[relativePath]);
          }

          // 定义暴露对象
          var exports = {};
          /*
          模块内部要自定义localRequire，而不是直接用require函数，原因是使用babell转化后的code，require传参时使用的是
          相对路径，而我们内部依赖表中，是根据绝对路径找到code，所以要实现一层转化
          */
          (function(require, exports, code) {
            // code 为字符串 用eval执行
            eval(code);
          })(localRequire, exports, depsGraph[module].code)


          // 作为require函数的返回值返回出去
          // 后面的require函数能得到暴露的内容
          return exports;
        }

        // 加载入口文件
        require('${this.entry}')
      })(${JSON.stringify(this.depsGraph)})
    `;

    let outputPath = path.resolve(this.options.output.path, this.options.output.filename);
    fs.writeFileSync(outputPath, build, 'utf-8');
  }
}

// 根据文件路径获取抽象语法树
const getAst = (modulePath) => {
  const file = fs.readFileSync(modulePath, 'utf-8');
  // 将其解析成ast抽象语法树
  const ast = babelParser.parse(file, { sourceType: 'module' });
  return ast;
}

// 根据抽象语法树ast获取依赖关系
const getDeps = (ast, dirname) => {
  // 该模块依赖合集
  const dependSet = {}
  // 利用traverse这个库收集依赖，自己收集也可以，不管是抽象语法树还是源代码都是可以拿到依赖关系的
  traverse(ast, {
    // 内部遍历ast中的program.body，判断里面语句类型
    // 如果type为ImportDeclaration 就会触发当前函数
    ImportDeclaration({ node }) {
      console.log('node', node)
      // import 文件的相对路径
      const relativePath = node.source.value;
      const absolutePath = path.resolve(dirname, relativePath);
      // 依赖中记录文件的绝对路径
      dependSet[relativePath] = absolutePath
    }
  })
  return dependSet;
}

// 根据抽象语法树 获取最终输出代码
const getParseCode = (ast) => {
  // 编译代码 将现代浏览器不能识别的语法进行编译处理
  // @babel/core可以直接将ast抽象语法树编译成兼容代码
  // 编译完成 可输出
  const { code } = transformFromAstSync(ast, null, {
    presets: ['@babel/preset-env']
  })
  return code;
}

// 该模块要输出的myWebpack函数
const myWebpack = (config) => {
  return new Comiler(config);
}

module.exports = myWebpack;