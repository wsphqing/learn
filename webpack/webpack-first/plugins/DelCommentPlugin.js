const { sources } = require('webpack');

class DelCommentPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    // compilation 创建之后执行注册事件
    compiler.hooks.compilation.tap('DelCommentPlugin', (compilation) => {
      // console.log('compilation', compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_PRE_PROCESS)
      // 处理asset
      compilation.hooks.processAssets.tap({
        // 插件名称
        name: 'DelCommentPlugin',
        // 要对asset做哪种类型处理，这里的填值代表是对asset进行基础预处理
        stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_PRE_PROCESS
      }, (assets) => {
        console.log('assets', assets)
        for (const name in assets) {
          console.log('name', name);
          // 只对js资产作处理
          if (name.endsWith('.js')) {
            // 判断是否存在属性
            if ( Object.hasOwnProperty.call(assets, name)) {
              // 通过asset名称获取到asset
              const asset = compilation.getAsset(name);
              console.log('asset', asset);
              // 获取到asset的内容
              const contents = asset.source.source();
              console.log('contents', contents);
              // 删除注释
              const result = contents.replace(/\/\/.*/g, "").replace(/\/\*.*?\*\//g, "");
              // 更新asset的内容
              compilation.updateAsset(
                name,
                new sources.RawSource(result)
              )
            }
          }
        }
      })
    })
  }
}

module.exports = DelCommentPlugin;