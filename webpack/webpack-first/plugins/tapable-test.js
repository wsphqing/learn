const { SyncHook, AsyncSeriesHook } = require('tapable');
const fs = require('fs');

// 钩子存放器
const hooks = {
  // 同步钩子，数组代表注册时，回调函数的参数
  beforeRead: new SyncHook(['param']),
  // 异步顺序执行钩子
  afterRead: new AsyncSeriesHook(['param'])
}

// 订阅beforeRead

hooks.beforeRead.tap('name', (param) => {
  console.log(param, 'beforeRead name 执行触发回调')
})

hooks.beforeRead.tap('age', (param) => {
  console.log(param, 'beforeRead age 执行触发回调')
})
// 订阅afterRead
hooks.afterRead.tapAsync('name', (param, callback) => {
  console.log(param, 'afterRead 执行触发回调')
  setTimeout(() => {
    // 回调执行完毕
    callback()
  }, 3000)
})

hooks.afterRead.tapAsync('age', (param, callback) => {
  console.log(param, 'afterRead age 执行触发回调')
  setTimeout(() => {
    // 回调执行完毕
    callback()
  }, 10000)
})

// 读取文件前调用beforeRead，注册事件按照注册顺序同步执行
hooks.beforeRead.call("开始读取")
fs.readFile("package.json", ((err, data) => {
  if (err) {
    throw new Error(err)
  }
  // 读取文件后执行afterRead钩子
  hooks.afterRead.callAsync(data, () => {
    // 所有注册事件执行完后调用，类似Promise.all
    console.log("afterRead end~");
  })
}))