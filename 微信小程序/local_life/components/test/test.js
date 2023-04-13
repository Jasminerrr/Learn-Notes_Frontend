// components/test/test.js
Component({
  options:{
    // 定义纯数据字段：只在组件内部使用，可以增加性能，使用正则表达式：指定所有_开头的数据字段为纯数据字段
    pureDataPattern:/^_/,
    // 修改组件的样式隔离选项,默认isolated，apply-shared(页面影响组件),shared（互相影响和影响设置了不隔离的组件）
    styleIsolation:'isolated'
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
    // __rgb为纯数据字段
    _rgb:{
      r:0,
      g:0,
      b:0
    },
    fullColor:'0,0,0', //根据_rgb对象的三个属性，动态计算fullColor的值
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 直接修改对象的属性值 因为rgb的最大值都是255
    changeR(){
      this.setData({
        '_rgb.r':this.data._rgb.r + 5 >255 ? 255 : this.data._rgb.r + 5
      })
    },
    changeG(){
      this.setData({
        '_rgb.g':this.data._rgb.g + 5 >255 ? 255 : this.data._rgb.g + 5
      })
    },
    changeB(){
      this.setData({
        '_rgb.b':this.data._rgb.b + 5 >255 ? 255 : this.data._rgb.b + 5
      })
    },
    // 随机生成颜色的方法 非事件处理函数命名（自定义事件）建议_开头
    _randomColor(){
      this.setData({
        _rgb:{
          // 生成0-1 *256的随机小数，再向下取整
          r:Math.floor(Math.random() * 256),
          g:Math.floor(Math.random() * 256),
          b:Math.floor(Math.random() * 256),
        }
      })
    },
  },
  // 数据监听器：监听对象中指定属性的变化
  observers:{
    // 只要其中一个数据或者对象发生变化，则会调用后面的函数，函数中拿到新值，重新赋值给fullColor
    // '_rgb.r,_rgb.g,_rgb.b':function(r,g,b){
    //   this.setData({
    //     fullColor:`${r},${g},${b}`
    //   })
    // }

    // 使用通配符**可以监听对象身上所有属性
    '_rgb.**':function(obj){
      this.setData({
        fullColor:`${obj.r},${obj.g},${obj.b}`
      })
    }
  },
  // 组件生命周期写在lifetimes节点里面
  lifetimes:{
    created(){
      console.log('created');
    },
    attached(){
      console.log('attached');
    },
  },
  // pageLifetimes节点：监听组件所在页面的生命周期函数
  pageLifetimes:{
    // 页面被展示时触发
    show(){
      // 页面展示时立即调用随机颜色方法
      this._randomColor()
    },
    // 页面被隐藏时触发
    hide(){
      console.log('hide');
    },
    // 页面尺寸变化时触发
    resize(){
      console.log('resize');
    },
  },
})
