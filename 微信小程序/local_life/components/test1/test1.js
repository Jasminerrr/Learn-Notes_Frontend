// components/test1/test1.js

// 导入Behavior共享脚本
const myBehavior = require('../../behaviors/my-behavior')
Component({
  // 声明一个behavior节点，是一个数组，将导入的对象挂载到behavior数组节点中，即可生效
  behaviors:[myBehavior],

  options:{
    // 可以使用多个插槽
    multipleSlots:true
  },

  /**
   * 组件的属性列表：声明和接受外界传过来的数据（跟data一样可读可写）
   */
  properties: {
    // 简写：只声明类型，不声明默认值
    count:Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    addCount(){
      this.setData({
        count:this.properties.count + 1
      })
      // 点击按钮触发方法后，将数值同步给父组件
      // 3. 触发自定义事件：指定事件名和传参数，然后父组件去接收
      this.triggerEvent('sync',{value:this.properties.count})
    },
    
    
  }
})
