const { SyncHook } = require('tapable')

// 1、创建钩子实例
const sleep = new SyncHook(['data', 'name'])

// 2、调用订阅接口注册回调
sleep.tap('test', (data, name) => {
  console.log('callback A', data, name)
})

// 3、调用发布接口触发回调
sleep.call('hell world', 'ddddd')