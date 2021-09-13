
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
        require('./src/index.js')
      })({"./src/index.js":{"deps":{"./test.js":"/Users/huaqing/Documents/learn/webpack/webpack-first/src/test.js"},"code":"\"use strict\";\n\nvar _test = _interopRequireDefault(require(\"./test.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n// const add = require('./test')\n\n/* 增加多行注释，用于测试 */\nvar x = (0, _test[\"default\"])(60, 100);\nvar y = x; // 行内单行测试\n// 单行注释测试\n\nconsole.log(y);"},"/Users/huaqing/Documents/learn/webpack/webpack-first/src/test.js":{"deps":{},"code":"\"use strict\";\n\n/** 加法运算 */\nfunction add(a, b) {\n  return a + b;\n}\n\nmodule[\"export\"] = add;"}})
    