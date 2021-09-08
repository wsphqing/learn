class MyPlugin {
  // 在构造函数中获取用户给该插件传入的配置
  constructor(params){}
  // webpack初始化参数后会调用MyPlugin实例的apply方法，给插件传入complier对象。
  apply(complier){
      // 绑定钩子事件
      // complier.hooks.emit.tapAsync()
      compiler.plugin('emit', compilation => {
      })
  }
}
module.export = MyPlugin