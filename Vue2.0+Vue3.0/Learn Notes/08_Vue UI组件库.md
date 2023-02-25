# 1. 移动端常用 UI 组件库

1.   Vant https://youzan.github.io/vant

2.   Cube UI https://didi.github.io/cube-ui

3.   Mint UI http://mint-ui.github.io

# 2. PC 端常用 UI 组件库
1.   Element UI https://element.eleme.cn

2.   IView UI  https://www.iviewui.com

# 3. 深度选择器
1. scoped属性：
  1. 作用：让样式只对于当前组件起作用；
  2. 对于某一组件，style添加了scoped属性，相当于给当前组件的结构中都添加上了一个data-v-xxx的自定义属性；
  3. vue是通过属性选择器，给需要添加的元素添加上样式h3[data-v-7ba5bd90]；
2. 子组件的跟标签：拥有父组件中自定义属性（一样），如果子组件的根节点和父组件书写的样式相同，也会添加上相应的样式；
3. 父组件样式添加了scoped属性，还想影响到子组件的样式-----使用深度选择器解决（可以实现样式穿透）
   1. 原生CSS：[>>>]；
   2. less：[/deep/]；
   3. scss：[::-deep]