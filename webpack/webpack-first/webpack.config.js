// webpack.config.js
const RmFilePlugin = require('./plugins/RmFilePlugin');

module.exports = {
  mode: 'none',
  resolveLoader: {
    // loader查找路径，默认是node_modules,所以我们平常写loader（如babel-loader）时实际都会去node_modules里找
    modules: ["node_modules", "loaders"], // 增加查找路径。顺序是从前往后
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [
          'babel-loader',
          {
            loader: "MyLoader",
            options: {
              oneLine: true, // 是否删除单行注释
              multiline: false, // 是否删除多行注释
            }
          },
        ],
      }
    ]
  },
  plugins: [
    new RmFilePlugin()
  ]
}