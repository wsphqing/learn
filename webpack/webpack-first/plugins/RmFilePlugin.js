const path = require('path');
const fs = require('fs');

class RmFilePlugin {
  constructor(options = {}) {
    // 插件的options
    this.options = options;
  }
  // webpack会自动调用插件的apply方法
  apply(compiler) {

  }
}