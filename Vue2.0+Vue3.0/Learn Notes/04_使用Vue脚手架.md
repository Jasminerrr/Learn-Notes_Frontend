# 1. 关于不同版本的Vue
1. vue.js与vue.runtime.xxx.js的区别；
   1. vue.js时完整版的Vue，包含：核心功能+模板解析器；
   2. vue.runtime.xxx.js是运行版的Vue，只包含：核心功能，没有模板解析器；
2. 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用render函数接收到的createElement函数去指定具体内容；
## 1.1 vue.config.js配置文件
   1. 使用vue inspect > output.js可以查看到Vue脚手架的默认配置；
   2. 使用vue.config.js可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh；
# 2. ref属性
   1. 被用来给元素或子组件注册引用信息(打标识)（id的替代者）；
   2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）；
   3. 使用方式：
      1. 打标识：```<h1 ref="xxx">.....</h1>``` 或 ```<School ref="xxx"></School>```
      2. 获取：```this.$refs.xxx```
# 3. props配置项
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
# 4. mixin(混入/混合)
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
# 5. 插件
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
# 6. scoped样式
1. 作用：让样式在局部生效，防止命名冲突。
2. 写法：```<style scoped>```
3. App里面一般不写scoped；
# 7. 总结TodoList案例
1. 组件化编码流程：
   1. 拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突；
   2. 实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：
      1. 一个组件在用：放在组件自身即可；
      2. 一些组件在用：放在他们共同的父组件上（<span style="color:red">状态提升</span>）；
      3. 实现交互：从绑定事件开始。
2. props适用于：
   1. 父组件 ==> 子组件 通信：
      1. 通过父组件里面的子组件标签属性传给子组件，然后用props声明接收；
   2. 子组件 ==> 父组件 通信：
      1. 要求父先给子一个函数，然后子组件里面调用父组件的函数通过传参，把数据给父组件；
3. 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！
4. props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。
# 8. 组件的自定义事件
1. 一种组件间通信的方式，适用于：<strong style="color:red">子组件 ===> 父组件</strong>；
2. 使用场景：
   1. 父组件 给 子组件传数据：父中给子绑定自定义事件（<span style="color:red">事件的回调在父中</span>）；
3. 绑定自定义事件：
    1. 第一种方式，在父组件中：
       1. ```<Demo @atguigu="test"/>``` 
       2.  ```<Demo v-on:atguigu="test"/>```
    2. 第二种方式，在父组件中：
        ```js
        <Demo ref="demo"/>
        ......
        mounted(){
           this.$refs.xxx.$on('atguigu',this.test)
        }
        ```
    3. 若想让自定义事件只能触发一次，可以使用```once```修饰符，或```$once```方法。
4. 触发自定义事件：```this.$emit('atguigu',数据)```		
5. 解绑自定义事件```this.$off('atguigu')```
6. 组件上也可以绑定原生DOM事件，需要使用```native```修饰符。
7. 注意：
   1. 通过```this.$refs.xxx.$on('atguigu',回调)```绑定自定义事件时，回调<span style="color:red">要么配置在methods中</span>，<span style="color:red">要么用箭头函数</span>，否则this指向会出问题！
# 9. 全局事件总线（GlobalEventBus）
1. 一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。
2. 安装全局事件总线：
   ```js
   new Vue({
   	......
   	beforeCreate() {
   		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
   	},
       ......
   }) 
   ```
3. 使用事件总线：本质就是自定义事件，不过是给$bus（当前vm）绑定的，触发人是<Root>:vm
   1. 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，[事件的回调]留在A组件自身;

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.$bus.$on('xxxx',this.demo) // 此处可以直接写回调，但必须是箭头函数
      }
      ```
   2. 提供数据：谁要传数据，就在哪个组件里面触发事件（调用）
      1. ```this.$bus.$emit('xxxx',数据)```
4. 注意：
   1. 最好在beforeDestroy钩子中，用$off去解绑[当前组件所用到的]事件。
# 10. 消息订阅与发布（pubsub）
1. 一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。
2. 使用步骤：
   1. 安装pubsub：```npm i pubsub-js```
   2. 引入: ```import pubsub from 'pubsub-js'```
   3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的<span style="color:red">回调留在A组件自身。</span>
      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
      }
      ```
   4. 提供数据：```pubsub.publish('xxx',数据)```
   5. 最好在beforeDestroy钩子中，用```PubSub.unsubscribe(pid)```去<span style="color:red">取消订阅。</span>
# 11. nextTick(test 15)
1. 语法：```this.$nextTick(回调函数)```
2. 作用：在下一次 DOM 更新结束后执行其指定的回调。
3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。
# 12. Vue封装的过度与动画
1. 作用：在插入、更新或移除 DOM元素时，在合适的时候给元素添加样式类名。
2. 图示：<img src="https://img04.sogoucdn.com/app/a/100520146/5990c1dff7dc7a8fb3b34b4462bd0105" style="width:60%" />
3. 写法：
   1. 准备好样式：
      - 元素进入的样式：
        1. v-enter：进入的起点 =  v-leave-to：离开的终点
        2. v-enter-active：进入过程中
        3. v-enter-to：进入的终点 = v-leave：离开的起点
      - 元素离开的样式：
        1. v-leave：离开的起点
        2. v-leave-active：离开过程中
        3. v-leave-to：离开的终点

   2. 使用```<transition>```包裹要过度的元素，并配置name属性：
      ```vue
      <transition name="hello">
      	<h1 v-show="isShow">你好啊！</h1>
      </transition>
      ```
   3. 备注：若有多个元素需要过度，则需要使用：```<transition-group>```，且每个元素都要指定```key```值。
