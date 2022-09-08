# 1. Promise含义
1. 抽象表达：Promise 是异步编程的一种解决方案；
2. 具体表达：
   1. 语法上：Promise不是回调，是一个内置的构造函数，是自己new调用的；
   2. 功能上：Promise的实例对象可以用来封装异步操作， 并可以获取其成功或失败的结果；
# 2. Promise对象的两个特点：
1. 对象的状态不受外界影响：
   1. Promise对象代表一个异步操作，
   2. 每一个Promise实例都有三种状态：
      1. pending：进行中，未确定的--初始状态；
      2. fulfilled/resolved：已成功--调用resolve()后的状态；
      3. rejected：已失败--调用reject()后的状态；
   3. 只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态；
   4. 只有两种状态的切换：
      1. pending--fulfilled；
      2. pending--rejected；
   5. 状态只能改变一次；
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果；
# 3. Promise要点
1. new Promise的时候，要传入一个回调函数，是同步的回调，会立即在主线程上执行，被称为executor(执行器)函数；
2. 每一个Promise实例在刚被new出来那一刻，状态都是初始化(pending)；
3. executor函数接收两个参数，都是函数，形参分别为resolve、reject；
4. resolve和reject：
   1. 这两个参数是函数，由js引擎提供不用自己部署；
   2. 通过resolve和reject可以改变Promise的状态；
# 4. Promise的使用
1. 重要语法：
   1. new Promise(executor)构造函数；
   2. Promise.prototype.then方法；（Promise构造函数原型对象上的方法）
2. 基本编码流程：
   1. 创建Promise的实例对象（pending状态），传入executor函数；
   2. 在executor中启动异步任务（定时器、ajax请求）；
   3. 根据异步任务的结果，做不同处理：
      1. 如果异步任务成功：调用resolve(传入成功的值value)，让Promise实例状态变为：fulfilled，同时可以指定成功的value；
      2. 如果异步任务失败：调用reject(传入失败的值reason)，让Promise实例状态变为：rejected，同时可以指定失败的reason；
   4. 通过then方法：（都是异步回调）
      1. 为Promise实例指定成功的回调函数，来获取成功的value；
      2. 为Promise实例指定失败的回调函数，来获取失败的reason；

   