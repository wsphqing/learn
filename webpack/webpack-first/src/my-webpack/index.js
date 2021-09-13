/**
 * webpack是一个node应用，本质上就是在node环境上跑一段代码
 * 
 */
const myWebpack = require('./myWebpack');
const config = require('./webpack.config');

const compiler = myWebpack(config);
compiler.run();