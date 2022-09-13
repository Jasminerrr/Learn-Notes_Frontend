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
### 2.4.1 关于不同版本的Vue
   1. vue.js与vue.runtime.xxx.js的区别；
      1. vue.js时完整版的Vue，包含：核心功能+模板解析器；
      2. vue.runtime.xxx.js是运行版的Vue，只包含：核心功能，没有模板解析器；
   2. 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用render函数接收到的createElement函数去指定具体内容；
### 2.4.2 vue.config.js配置文件
   1. 使用vue inspect > output.js可以查看到Vue脚手架的默认配置；
   2. 使用vue.config.js可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh；
## 2.5 ref属性
   1. 被用来给元素或子组件注册引用信息(打标识)（id的替代者）；
   2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）；
   3. 使用方式：
      1. 打标识：```<h1 ref="xxx">.....</h1>``` 或 ```<School ref="xxx"></School>```
      2. 获取：```this.$refs.xxx```
## 2.6 props配置项
   1. 功能：让组件接收外部传过来的数据；
   2. 传递数据：```<Demo name="xxx"/>```
   3. 接收数据：
      1. 第一种方式（只接收）：```props:['name'] ```
      2. 第二种方式（限制类型）：```props:{name:String}```
      3. 第三种方式（限制类型、限制必要性、指定默认值）：
      ```
      props:{
         name:{
        	   type:String, //类型
        	   required:true, //必要性
        	   default:'老王' //默认值
        	}
      }
      ```
   4. 注意：
      1. props优先级高于data；
      2. props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告；
      3. 若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据；
## 2.7 mixin(混入/混合)
   1. 功能：可以把多个组件共用的配置提取成一个混入对象；
   2. 使用方式：
   第一步定义混合：创建混合的js文件，里面写配置对象，再main.js引入混入
   ```
   {
       data(){....},
       methods:{....}
       ....
   }
   ```
   第二步使用混入：
   ​	全局混入(main.js)：```Vue.mixin(xxx)```
   ​	局部混入：```mixins:['xxx']	```
## 2.8 插件
   1. 功能：用于增强Vue；
   2. 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是传递的数据；
   3. 定义插件：先创建插件js文件，再暴露文件，在main.js引入插件，最后使用Vue.use()调用
       ```
       对象.install = function (Vue, options) {
           // 1. 添加全局过滤器
           Vue.filter(....)

           // 2. 添加全局指令
           Vue.directive(....)

           // 3. 配置全局混入(合)
           Vue.mixin(....)

           // 4. 添加实例方法
           Vue.prototype.$myMethod = function () {...}
           Vue.prototype.$myProperty = xxxx
       }
       ```
   4. 使用插件：```Vue.use()```
## 2.9 scoped样式
   1. 作用：让样式在局部生效，防止命名冲突。
   2. 写法：```<style scoped>```
