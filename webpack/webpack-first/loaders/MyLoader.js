module.exports = function(source) {
  console.log(source)
  // 获取webpack.config.js中配置的options
  let options = this.getOptions();
  let result = source;

  // 默认单行和多行注释都删掉
  const defaultOption = {
    oneLine: true,
    multiline: true,
  }
  
  options = Object.assign({}, defaultOption, options)
  if (options.oneLine) {
    result = result.replace(/\/\/.*/g, "")
  }
  if (options.multiline) {
    result = result.replace(/\/\*.*?\*\//g, "")
  }

  // loader  必须有输出，否则webpack构建报错
  return result
}