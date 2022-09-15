# 1. 模块
1. 向外提供特定功能的js程序，一般就是一个js文件；
2. 为什么：js文件很多很复杂；
3. 作用：
   1. 复用js；
   2. 简化js的编写；
   3. 提高js运行效率；
## 1.1 模块化
   1. 当应用中的js都以模块来编写，那这个应用就是一个模块化的应用；
# 2. 组件
1. 定义：用来实现界面局部(特定)功能效果代码和资源的集合（html/css/js/image...）；
2. 为什么用组件：一个界面的功能很复杂；
3. 作用：
   1. 复用代码；
   2. 简化项目编码；
   3. 提高运行效率；
4. 组件化：当应用中的功能都是多组件的方式来编写的，那这个应用就是一个组件化应用；
## 2.1 Vue中使用组件的三大步骤
   1. 定义组件（创建组件）：
      1. 使用Vue.extend(options)创建，可简写成：const school = options；
      2. 其中options和new Vue(options)几乎一样，但有区别：
         1.  el不要写：最终所有组件都经过一个vm管理，由vm中的el决定服务哪个容器；
         2.  data必须写成函数：避免组件被复用时，数据存在引用关系(如果是对象则修改数据原数据会变，而函数是返回一个全新创建的对象)
   ```
    // 第1步：创建school组件
    const school = Vue.extend({
        // 使用模板字符串
        template: `
            <div>
                <h1>学校名称：{{schoolName}}</h1>
                <h1>学校地址：{{address}}</h1>
            </div>
        `,
        data() {
            return {
                schoolName: '尚硅谷',
                address: '北京'
            }
        }
    })
   ```
   2. 注册组件：
      1. 局部注册：靠new Vue的时候传入components选项；
      2. 全局注册：靠 Vue.component('组件名',组件)；
   ```
    const vm = new Vue({
        el: '#root',
        // 第2步：注册局部组件
        components: {
            // 对象简写：school:school
            school,
            student
        }
    })
   ```
   3. 使用组件(写组件标签)：
      1. 双标签形式：<school></school>；
      2. 闭合标签形式：<school/>；
   ```
   <!-- 第3步：编写组件标签 -->
    <school></school>
   ```
### 2.1.1 关于组件名
   1. 一个单词组成：
      1. 首字母小写：school；
      2. 首字母大写：School；(推荐)
   2. 多个单词：
      1. kebab-case命名：my-school,要加引号；
      2. CamelCase命名：MySchool（需要Vue脚手架支持）；(推荐)
   3. 注意：
      1. 组件名尽可能回避HTML中已有的元素名称，例如h2/H2都不行；
      2. 可以使用name配置项指定组件在开发者工具中呈现的名字；
## 2.2 VueComponent构造函数
   1. school组件本质是一个名为VueComponent的构造函数，不是程序员定义的，是调用Vue.extend()生成的；
   2. 我们只需要写<school/>或<school></school>，Vue解析时会帮我们创建school组件的实例对象，即执行new VueComponent(options)；
   3. this指向：
      1. 组件配置中：data/methods/watch/computed中的函数，this都是 [VueComponent实例对象]；
      2. new Vue(options)配置中：data/methods/watch/computed中的函数，this都是 [Vue实例对象]；
   4. VueComponent的实例对象 也称为 组件实例对象；
   5. 重点：每次调用Vue.extend，返回的都是一个全新的VueComponent；
   6. 理解组件实例对象：
      1. 相当于一个小型的vm；
      2. 与vm相比有小区别：data要写成函数，不能写el配置项；
### 2.2.1 一个重要的内置关系
   1. VueComponent.prototype.__proto__ === Vue.prototype；(VueComponent构造函数的显示原型（原型对象）的隐式原型 等于 Vue构造函数的显示原型)
   2. 可以让组件实例对象 访问到 Vue原型上的属性和方法；
## 2.3 非单文件组件
   1. 模板编写没有提示；
   2. 没有构建过程, 无法将 ES6 转换成 ES5；
   3. 不支持组件的 CSS；
   4. 真正开发中几乎不用；
## 2.4 单文件组件
   1. 一个 .vue 文件的组成(3 个部分)：
      1. 模板页面<template></template>；
      2. JS 模块对象：
      ```
      <script>

      export default {
         data() {
            return {}
         }, methods: {}, computed: {}, components: {}
         }
      </script>
      ```
      3. 样式:<style></style>；
