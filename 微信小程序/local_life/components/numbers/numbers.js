// components/numbers/numbers.js
// 将store 中的成员绑定到组件中
// 第一步： 按需导入方法，专门用来映射store里面的数据方法，再导入实例
import { storeBindingsBehavior} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'
Component({
  // 第二步：声明behaviors节点，指向一个数组，通过storeBindingsBehavior 来实现自动绑定
  behaviors:[storeBindingsBehavior], 
  // 第三步：提供storeBindings配置对象：进行绑定和映射计算属性（左边是组件中映射的名字【自定义的】，后面是store里面的属性名）
  storeBindings:{
    store, // 数据源
    fields:{  // 指定绑定的数据字段/
      numA:() => store.numA, // 绑定的第一种方式（适合做逻辑）
      numB:(store) => store.numB, // 绑定的第2种方式
      sum:'sum'  // 绑定的第3种方式（推荐简单）
    },
    actions:{    // 指定要绑定的方法
      updateNum2:'updateNum2'
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {

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
    // 按钮事件处理函数，接收一个事件对象e，可以拿到点击时穿的参数step值
    btnHandler2(e){
      // 直接调用在store写好的方法
      this.updateNum2(e.target.dataset.step)
    },
  }
})
