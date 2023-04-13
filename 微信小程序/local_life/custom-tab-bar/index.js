// custom-tab-bar/index.js
// 将store 中的成员绑定到组件中
// 第一步： 按需导入方法，专门用来映射store里面的数据方法，再导入实例
import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { store } from "../store/store";
Component({
  options:{
    // 在自定义组件中需要覆盖vant组件样式时，需修改隔离样式选项
    styleIsolation:'shared'
  },

  // 第二步：声明behaviors节点，指向一个数组，通过storeBindingsBehavior 来实现自动绑定
  behaviors:[storeBindingsBehavior], 
  // 第三步：提供storeBindings配置对象：进行绑定和映射计算属性（左边是组件中映射的名【自定义的】，后面是store里面的属性名）
  storeBindings:{
    store, // 数据源
    fields:{  // 指定绑定的数据字段/
      sum:'sum',  // 绑定的第3种方式（推荐简单）
      active:'activeTabBarIndex'
    },
    actions:{    // 指定要绑定的方法
      updateActive:'updateActiveTabBarIndex'
    }
  },
  // 设置数据监听
  observers:{
    // 通过监听sum来实时修改data中info的值
    'sum':function(val){
      this.setData({
        'list[1].info':val
      })
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
    "list": [
      {
        "pagePath": "/pages/home/home",
        "text": "首页",
        "iconPath": "/images/tabs/home.png",
        "selectedIconPath": "/images/tabs/home-active.png"
      },
      {
        "pagePath": "/pages/message/message",
        "text": "消息",
        "iconPath": "/images/tabs/message.png",
        "selectedIconPath": "/images/tabs/message-active.png",
        info:0
      },
      {
        "pagePath": "/pages/contact/contact",
        "text": "联系我们",
        "iconPath": "/images/tabs/contact.png",
        "selectedIconPath": "/images/tabs/contact-active.png"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // tabbar的change事件，可以拿到当前的索引
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      this.updateActive(event.detail)
      // 切换tabbar：根据索引找到对应页面的路径
      wx.switchTab({
        url: this.data.list[event.detail].pagePath,
      })
    },
  }
})
