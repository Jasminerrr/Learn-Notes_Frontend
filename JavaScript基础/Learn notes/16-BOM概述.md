## 1. BOM
### 1.1 BOM概述
   1. BOM（Browser Object Model）浏览器对象模型，提供了独立于内容而与浏览器窗口进行交互的对象，其核心对象是window；
   2. BOM由一系列相关的对象构成，并且每个对象都提供了很多方法与属性；
   3. BOM缺乏标准，js语法的标准化组织是ECMA，DOM的标准化组织是W3C，BOM是浏览器厂商在各自浏览器上定义的，兼容性较差。
### 1.2 BOM的构成
   1. BOM比DOM更大，包含DOM；
   2. window对象是浏览器的顶级对象，具有双重角色：
      1. 是js访问浏览器窗口的一个接口；
      2. 是一个全局对象。定义在全局作用域中的变量、函数都会变成window对象的属性和方法；
      3. 在调用的时候可以省略window；
      4. window下的一个特殊属性window.name； 
## 2. window对象的常见事件
### 2.1 窗口加载事件
   1. 语法规范：window.onload = function() {} 或者 window.addEventListener('load', function() {})：
      1. window.onload是窗口（页面）加载事件，当文档内容完全加载完成，才会触发该事件（包括图像、、脚本文件、css文件等），就调用的处理函数；
      2. 有了window.onload就可以把js代码写在页面元素上方，因为onload是等页面内容全部加载完毕，再去执行处理函数；
      3. window.onload传统注册事件方式只能写一次，如果有多个，会以最后一个window.onload为准；
   2. 语法规范：document.addEventListener('DOMContentLoaded', function(){}):ie9以上支持
      1. DOMContentLoaded事件触发时，仅当DOM加载完成，不包括样式表、图片、falsh等；
      2. 如果页面的图片很多的话，从用户访问到onload触发可能需要较长时间，交互效果就不能实现，会影响用户体验，此时用DOMContentLoaded事件比较合适； 
### 2.2 调整窗口大小事件
   1. window.onresize = function(){} 或者 window.addEVentListener('resize', function(){})：
      1. window.onresize是调整窗口大小加载事件，只要窗口大小发生变化，就会触发这个事件；
      2. 经常利用这个事件完成响应式布局，window.innerWidth当前屏幕的宽度 ；
## 3. 定时器
1.  window对象提供了两种定时器:setTimeout() 和 setInterval()；
### 3.1 setTimeout()定时器
   1. 语法规范：window.setTimeout(调用函数， [延迟的毫秒数]);
   2. 用于设置一个定时器，当延迟时间到期后执行调用函数，只调用一次就结束定时器；
   3. window在调用的时候可以省略;
   4. 延迟时间单位是毫秒，可以省略（默认0）；
   5. 调用函数可以直接写函数，也可以写函数名；或采取字符串 '函数名()'，这种不推荐
   6. 页面中可能有很多定时器，经常给定时器赋值标识符（起名字）；
   7. setTimeout()也称为回调函数callback：
      1. 普通函数是按照代码顺序直接调用，回调函数需要等待时间到了，上一件事干完，才去调用这个函数；
      2. element.addEventListener('click', fn);里面函数也是回调函数；
   ```
   setTinmeout(function(){
    console.log('爆炸了')；
   }, 2000);
   //调用函数可以直接写函数，也可以写函数名
   function callback(){
    console.log('爆炸了')；
   }
   //给定时器加标识符（起名字）
   var time1 = setTimeout(callback, 2000);
   ``` 
### 3.2 停止setTimeout() 定时器
   1. 语法规范：window.clearTimeout(timeoutID)；
   2. window可以省略；
   3. 里面的参数就是定时器的标识符；
### 3.3 setInterval()定时器
   1. 语法规范:window.setInterval(调用函数， [延迟的毫秒数]);
   2. 重复调用一个函数，每隔这个时间，就去调用一次回调函数，会调用很多次；
   3. window在调用的时候可以省略;
   4. 调用函数可以直接写函数，也可以写函数名；或采取字符串 '函数名()'，这种不推荐;
   5. 延迟时间单位是毫秒，可以省略（默认0）；
   6. 页面中可能有很多定时器，经常给定时器赋值标识符（起名字）；
### 3.4 停止setInterval()定时器
   1. 语法规范：window.clearInterval(intervalID);
   2. window可以省略；
   3. 里面的参数就是定时器的标识符；
   ```
   <button class="begin">开启定时器</button>
   <button class="stop">停止定时器</button>
   <script>
       var begin = document.querySelector('.begin');
       var stop = document.querySelector('.stop');
       var timer = null;// 全局变量，null是一个空对象
       begin.addEventListener('click', function () {
           timer = setInterval(function () {
               console.log('开启');
           }, 1000);
       })
       stop.addEventListener('click', function () {
           clearInterval(timer);
       })
   </script>
   ```
### 3.5 this
   1. 解析器在调用函数每次都会向函数内部传递一个隐含的参数 this；
   2. this 指向的是一个对象，这个对象称为函数执行的 上下文对象；
   3. 根据函数的调用方式不同，this会指向不同的对象：
   4. 以函数的形式调用（外面的是函数）：this指向永远是window；
   5. 以方法的形式调用（对象里面是方法）：this指向的是调用方法的这个对象；
   6. 以构造函数的形式调用时，this指向新创建的那个对象；
   7. 使用call()和apply()调用时，this指向那个对象；
   8. 一般情况下this的最终指向的是那个调用它的对象;
   9. 全局作用域或者普通函数中this指向全局对象window（注意定时器里面的this指向window）;
   ```
   console.log(this);

   function fn () {
    console.log(this);
   }
   window.fn();

   window.setTimeout(function () {
    console.log(this);
   }, 1000);
   ```

   1. 方法调用中，谁调用 this就指向谁：
   ```
   var o = {
    sayHi: function(){
        console.log(this);// 这个this指向的是o对象
    }
   }
   o.sayHi();
   ```
   2. 构造函数中this指向构造函数的实例：
   ```
   function Fun() {
    console.log(this);// 这个this指向的是fun实例对象
   }
   var fun = new Fun();
   ```
## 4. JS执行机制
### 4.1 JS是单线程
   1. JS语言的一大特点就是单线程，同一时间只能做一件事情。但会导致问题是：如果JS执行时间过长，就会造成页面的渲染不连贯，导致页面渲染加载阻塞的感觉；
   2. 为了解决这个问题，利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JS脚本创建多个线程，所以出现了同步和异步；
### 4.2 同步和异步
   1. 同步：前一个任务结束后再执行后一个任务，程序的执行顺序与任务的排列顺序是一致的、同步的；
   2. 异步：在做这件事情的同时，还可以去处理其他事情；
   3. 本质区别：这条流水线上各个流程的执行顺序不同；
   4. 同步任务：都在主线程上执行，形成一个执行栈；
   5. 同步的回调函数：立即在主线程执行，不会放入回调队列中；例：数组遍历相关的回调函数、Promise的excutor函数；
   6. 异步任务：通过回调函数实现的，异步任务相关回调函数添加到任务队列中（也称消息队列）：
   7. 异步任务由三种类型：
      1. 普通事件：click、resize等；
      2. 资源加载：load、error等；
      3. 定时器：setInterval、setTimeout等；
      4. ajax回调等；
### 4.3 JS执行机制
   1. 先执行执行栈中的同步任务；
   2. 异步任务（回调函数）放入任务队列中；
   3. 一旦执行栈的所有同步任务执行完毕，系统就会按次序读取任务队列中的异步任务，于是被读取的异步任务结束等待状态，进入执行栈，开始执行；
   4. event loop：由于主线程不断地重复获得任务、执行任务，再获得任务、再执行，这种机制被称为事件循环；
## 5. Location对象
### 5.1 什么是Location对象
   1. 是window对象下的一个location属性，用于获取或设置窗体的URL，并且可以用于解析URL；
   2. 因为这个属性返回的是一个对象，所以将这个属性也称为location对象；
### 5.2 URL
   1. URL（Uniform Resourse Locator）统一资源定位符：是互联网上标准资源的地址；互联网的每个文件都有一个唯一的URL，它包含的信息指出文件的位置以及浏览器应该怎么处理它；
   2. 一般语法格式为：
      1. protocol://host[:port]/path/[?query]#fragment
      2. http://www.itcast.cn/index.html?name=andy&age=18#link
   3. protocol:通信协议，常用的http,ftp,matio等；
   4. host:主机（域名）www.itcast.cn；
   5. port：端口号（可选），省略时使用方案的默认端口号，如http的默认端口号是80；
   6. path：路径，由 零 或多个'/'符号隔开的字符串，一般用来表示主机上的一个目录或文件地址；
   7. query：参数，以键值对的形式，? 分割；多个参数通过& 符号分隔开；
   8. fragment：片段，#后面内容常见于链接 锚点；
### 5.3 location对象的属性
   1. location.href：获取或设置整个URL地址；（重点）
   2. location.host：返回主机（域名）www.itcast.cn；
   3. location.port：返回端口号，如未写则返回 空字符串；
   4. location.pathname：返回路径；
   5. location.search：返回参数；（重点）
   6. location.hash：返回片段  #后面内容常见于链接 锚点；
### 5.4 location对象的方法
   1. location.assign()：跟href一样，可以跳转页面（也称为重定向页面），记录浏览历史，可以后退；
   2. location.replace()：替换当前页面，因为不记录历史，所以不能后退页面；
   3. location.reload()：重新加载页面，相当于刷新按钮或者f5，如果参数为true则强制刷新 ctrl+f5；
## 6. navigator对象
1. navigator对象包含有关浏览器的信息，有很多属性，常用的是userAgent，该属性可以返回由客户机发送服务器的user-agent头部的值；
2. 下面前端代码可以判断用户哪个终端打开页面实现跳转（代码了解）；
## 7. history对象
1. window对象下的一个history属性，与浏览器历史记录进行交互，该对象包含用户（在浏览器窗口中）访问过的URL；
2. history对象的方法：
   1. back()：可以后退功能；
   2. forward()：前进功能；
   3. go(参数)：前进后退功能，参数如果是1，则前进一个页面；如果是-1.则后退一个页面；