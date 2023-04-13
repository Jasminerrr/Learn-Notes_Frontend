// 此js文件中，专门用来创建 store 实例对象：通过按需引入observable方法
import {action, observable} from 'mobx-miniprogram'
// 调用此方法的返回值就是一个store实例：里面传入配置对象
// 将实例按需导出
export const store =  observable({
  // 数据字段
  numA:1,
  numB:3,
  activeTabBarIndex:0,// 定义选中项索引
  // 计算属性
  get sum(){
    return this.numA + this.numB
  },

  // 引入action方法，专门用来修改 store 里面数据的值
  // 定义一个方法，需要外面调用action函数，里面step是外界传过来的参数
  updateNum1:action(function(step){
    this.numA += step
  }),
  updateNum2:action(function(step){
    this.numB += step
  }),
  // 用于更新选中项的索引的方法
  updateActiveTabBarIndex:action(function(index){
    this.activeTabBarIndex = index
  })
})