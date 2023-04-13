// 1. 调用Behavior()方法，创建共享的实例对象，并共享出去(组件间通信)
// 2. 外界组件只要导入了Behavior，就可以拿到共享的代码
module.exports = Behavior({
  // 属性节点
  properties:{},
  // 私有数据节点
  data:{
    username:'sss'
  },
  // 事件处理函数和自定义方法节点
  methods:{},
  // 。。。其他节点
})