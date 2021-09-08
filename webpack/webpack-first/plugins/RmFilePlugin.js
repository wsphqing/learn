const path = require('path');
const fs = require('fs');

class RmFilePlugin {
  constructor(options = {}) {
    // 插件的options
    this.options = options;
  }
  // webpack会自动调用插件的apply方法
  apply(compiler) {
    // 拿到webpack 的所有配置
    const webpackOptions = compiler.options;
    // context为webpack的执行环境（执行文件路径）
    const { context } = webpackOptions;
    compiler.hooks.beforeRun.tap('ReFilePlugin', (compiler) => {
      // 获取打包输出路径
      const outputPath = webpackOptions.output.path || path.resolve(context, 'dist');
      // 获取文件列表
      const fileList = fs.readdirSync(outputPath, { withFileTypes: true });
      fileList.forEach(item => {
        // 只删除文件，不对文件夹做递归删除，简化逻辑
        if (item.isFile) {
          const delPath = path.resolve(outputPath, item.name);
          fs.unlinkSync(delPath);
        }
      })
    })
  }
}

// 导出 Plugin
module.exports = RmFilePlugin;