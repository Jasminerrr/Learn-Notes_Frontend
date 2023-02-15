# 1. Vue简介
## 1.1 Vue是什么：
   1. 一套用于构建用户界面的渐进式JavaScript框架；
   2. 渐进式：Vue可以自底向上逐层的应用；
## 1.2 Vue特点：
   1. 采用[组件化]模式，提高代码复用率、且让代码更好维护；
   2. [声明式]编码，让编码人员无需直接操作DOM，提高开发效率；
   3. 使用[虚拟DOM]+优秀的[Diff算法]，尽量复用DOM节点；
## 1.3 语法：
   1. Vue是一个构造函数；必须用new创建一个Vue实例，并且要传入一个配置对象(options)；
   2. root容器:
      1. 里面的代码依然符合html规范，只不过混入了一些特殊的Vue语法；
      2. root容器里面的代码被称为[Vue模板]，给Vue实例解析；
      3. Vue实例和容器是一一对应的；
   3. 真实开发中只有一个Vue实例，而且会配合着组件一起使用；
   4. 插值语法：{{xxx}}中的xxx要写js表达式，且xxx可以自动读取到data中的所有属性；
   5. 一旦data中的数据发生改变，那么页面中用到该数据的地方也会自动更新；（数据发生改变，Vue会重新解析模板）
   6. 在 Vue中如果值为undefined，页面不会展现；
1. js表达式和js代码(语句)区分：
   1. js表达式：一个表达式会产生一个值，可以放在任何一个需要值得地方；
      1. a;
      2. a+b;
      3. demo(1);
      4. x === y ? 'a': 'b';
   2. js代码：
      1. if(){};
      2. for(){};
# 2. Vue模板 
## 2.1 插值语法
   1. 用于解析标签体内容；
   2. 写法：{{表达式}}；
      1. 表达式可直接读取到data中的所有属性；
      2. 模板里面可以看得到vc身上所有东西，不需要this。
## 2.2 指令语法
   1. 用于解析标签：标签属性、标签体内容、绑定事件...
   2. 举例：[v-bind:href = "表达式"] 或 简写为 [:href = "表达式"]，表达式可直接读取到data中的所有属性；
   3. Vue中有很多指令，形式都是：v-????；
## 2.3 el与data两种写法
   1. el：用于指定当前Vue实例为哪个容器服务，值通常为css选择器字符串；
      1. 第1种写法：el:'#root'，new Vue时候配置el属性；
      2. 第2种写法：先创建Vue实例，再通过vm.$mount('#root')指定el的值；
   2. data：data中用于存储数据，数据提供el所指定的容器去使用;(里面放的是属性名：属性值)
      1. 第1种写法：对象式[data:{}]；
      2. 第2种写法：组件里面的data必须用函数式，否则会报错；
         1. 函数式[data:function(){}]——简写[data(){}]；
         2. 必须要返回一个对象，对象里面的数据就是所需要的；
         3. 必须写成普通函数(里面指向Vue实例对象)，不能使用箭头函数；
   3. 由Vue管理的函数，不能写箭头函数，不再是Vue实例；

# 3. 数据绑定
## 3.1 单向绑定(v-bind)：
   1. 数据只能从data流向页面；
   2. [v-bind] 简写 [:]；
   
## 3.2 双向绑定(v-model)：组件通信方式的一种
   1. 数据不仅能从data流向页面，还可以从页面流向data(即可显示也可收集数据)；
   2. 双向绑定一般都应用在表单类元素上：input、select等；
   3. [v-model:value]可以简写为[v-model]，因为v-model默认收集的就是value值；
   4. 原生DOM当中有oninput事件，经常结合表单元素一起使用，当表单元素文本内容发生变化时，就会触发一次回调；
      ```vue
      <input type="text" :value="msg" @input="msg = $event.target.value">
      <Demo v-model="msg"/>
      ``` 
   5. value与input事件实现：可以通过v-model实现父子组件数据同步（vue2）；
   6. [v-model]的三个修饰符:
      1. lazy：失去焦点再收集数据； 
      2. number：输入字符串转为有效的数字；
      3. trim：输入首尾空格过滤；

# 4. MVVM模型
1. M 模型(Model)：data中的数据；
2. V 视图(View)：模板代码；
3. VM 视图模型(ViewModel)：Vue实例；
4. 注意：
   1. data中的属性，vm身上都有；
   2. vm身上所有的属性 以及 Vue原型上的所有属性，在Vue模板中都可以直接使用；
   
# 5. 数据代理
## 5.1 Object.defineProperty()方法(案例02)
1. 用来给对象添加(定义)新属性 或 修改原有的属性； 
2. 语法：Object.defineProperty(obj,prop,descriptor)必须加参数；
   1. obj：目标对象；
   2. prop：需定义或修改属性的名字；
   3. descriptor：目标属性所拥有的特性，以对象{}形式书写；
      1. value：属性的值，默认undefined；
      2. writable：控制属性值是否可以修改 ，true/false，默认false；
      3. enumerable：控制目标属性是否可以被枚举(遍历)，true/false，默认false；
      4. configurable：控制目标属性是否可以被删除 或 是否可以再次修改descriptor参数里面的[特性]，true/false，默认false；
3. get()：当有人读取obj的prop属性时，get()函数(getter)就会被调用，且返回值就是prop的值；
4. set(value)：当有人修改obj的prop属性时，set()函数(setter)就会被调用，且会收到修改的具体值(value)；
## 5.2 Object.keys()
   1. 用于获取对象自身所有的属性；
   2. 语法：Object.keys(obj)；
   3. 效果类似for...in；
   4. 返回一个由属性名组成的数组；
   ```
    let obj = {
        id:1,
        pname:'小米',
        price:3000
    }
    // 遍历对象 返回一个由属性名组成的数组
    let arr = Object.keys(obj);
    // 使用数组用forEach遍历
    arr.forEach(function(value){
        console.log(value);
    })
   ```
## 5.3 什么是数据代理
   1. 通过一个对象代理对另一个对象中属性的操作（读/写）；
   ```
   let obj = {x:100};
   let obj2 = {y:200};
   Object.defineProperty(obj2,'x',{
       get(){
           return obj.x;
       },
       set(value){
           obj.x = value;
       }
   });
   obj2.x = 300;
   console.log(obj.x);// 300
    </script>
   ```
## 5.4 Vue中的数据代理（案例02）
   1. 通过vm对象来代理data对象中属性的操作（读/写）；
   2. 好处：更加方便的操作data中的数据；
   3. 基本原理：
      1. 通过Object.defineProperty()把data对象中所有属性都添加到vm对象上；
      2. 为每一个添加到vm上的属性，都指定一个getter和setter；
      3. 在getter和setter内部去操作data中对应的属性；
## 5.5 数据劫持
   1. 每个数据经过数据代理的过程就叫数据劫持；



   