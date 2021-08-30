const Compiler = require('./compiler')

class MyPlugin {
  apply(compiler) {
    // 接受compiler参数
    compiler.hooks.run.tapAsync('MyPlugin', () => console.log('开始编译...'))
    compiler.hooks.compiler.tap('MyPlugin', (name, age) => {
      setTimeout(() => {
        console.log('编译中...')
      }, 1000)
    })
  }
}

// 类似于 webpack.config.js 的plugins 配置
// 向plugins 属性传入new 实例

const myPlugin = new MyPlugin()

const options = {
  plugins: [myPlugin]
}

const compiler = new Compiler(options)
compiler.run()