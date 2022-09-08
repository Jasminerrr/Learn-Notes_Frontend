## 1. Iterator 遍历器(案例11)
1. 它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）；
2. 原生具备iterator接口的数据（可用for...of遍历）：Array/Arguments/Set/Map/String/TypedArray/NodeList；
3. 作用：
   1. 一是为各种数据结构，提供一个统一的、简便的访问接口；
   2. 使得数据结构的成员能够按某种次序排列；
   3. ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费；
4. 遍历过程：
   1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象；
   2. 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员；
   3. 第二次调用指针对象的next方法，指针就指向数据结构的第二个成员；
   4. 不断调用指针对象的next方法，直到它指向数据结构的结束位置；
   5. 每一次调用next方法，都会返回数据结构的当前成员的信息，包含value和done两个属性的对象。value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束；
5. 适用场景：自定义遍历数据；
## 2. 生成器函数的声明和调用
1. 生成器是一种特殊的函数，要写 * ；
2. 是ES6提供的一种异步编程解决方案，语法行为与传统函数不同；
3. yield：
   1. 函数代码的分隔符，将代码分成几块（遇到yield就暂停，调用next继续）
   2. 遇到yield语句，就暂停执行后面的操作，并返回语句后面的表达式，作为返回的对象的value属性的值；再次调用next方法时，再继续往下执行，直到遇到下一个yield语句。
   ```
   function * gen() {
       yield 'a';
       yield 'b';
       yield 'c';
   }
   let iterator = gen();
   // console.log(iterator.next());// value:"a",done:false
   // console.log(iterator.next());// value:"b",done:false
   // console.log(iterator.next());// value:"c",done:false
   // console.log(iterator.next());// value:undefined,done:tru
   // 遍历
   for (let k of gen()) {
       console.log(k);// a b c
   }
   ```
### 2.1 生成器函数的参数传递
   1. next传入的参数将作为上一个yeild语句的返回结果；
   ```
   function* gen(arg) {
       console.log(arg);// A
       let one = yield 'a';
       console.log(one);// B
       let two = yield 'b';
       console.log(two);// C
       let three = yield 'c';
       console.log(three);// D
   }
   // 执行获取遍历器对象
   let iterator = gen('A');
   // 第一个next方法用来启动遍历器对象
   console.log(iterator.next());// value:"a",done:false
   // next方法可以传入实参
   console.log(iterator.next('B'));// value:"b",done:false
   console.log(iterator.next('C'));// value:"c",done:false
   console.log(iterator.next('D'));// value:undefined,done:true
   ```