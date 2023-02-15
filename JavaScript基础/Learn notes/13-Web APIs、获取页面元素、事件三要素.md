## 1. API 和 Web APIs 
### 1.1 API（应用程序编程接口）
   1. 是一些预先定义的函数，目的是提供应用程序与开发人员基于某软件或硬件得以访问一组例程的能力，而又无需访问源码，或理解内部工作机制的细节。
   2. 简单理解：API是给程序员提供的一种工具，以便能更轻松的实现想要完成的功能；
### 1.2 Web API
   1. 是浏览器提供的一套操作浏览器功能（BOM）和页面元素（DOM）的API；
   2. 现阶段主要针对浏览器讲解常用的API，主要针对浏览器做交互效果；
   3. 一般都有输入（函数的传参）和输出（函数的返回值），很多都是方法（函数）；
   4. MDN详细API：https://developer.mozilla.org/zh-CN/docs/Web/API；
## 2. DOM
   1. 文档对象模型（Document Object Model简称DOM），是W3C组织推荐的处理可扩展标记语言（HTML或XML）的标准编程接口，W3C定义了一系列的DOM接口，通过这些接口可以改变网页的内容、结构和样式；
   2. 通过DOM获取过来的元素，返回的都是一个对象，里面包含了很多属性和方法；
   3. 关于DOM操作，主要针对于元素的操作，主要有创建、增、删、改、查、属性操作、事件操作；
### 2.1 DOM树
   1. 文档：一个页面就是一个文档，DOM中用document表示；
   2. 元素：页面中的所有标签都是元素，DOM中使用element表示；
   3. 节点：网页中的所有内容都是节点（标签、属性、文本、注释等），DOM中使用node表示；
   4. DOM把以上内容都看作是对象；
## 3. 获取页面元素
### 3.1 根据ID获取（不推荐）
   1. 使用getElementById()方法可以获取带有ID的元素对象；
   2. 因为文档页面从上往下加载，所以先有标签，script写在标签的下面；
   3. 驼峰命名法;
   4. 参数 id是大小写敏感的字符串（''）;
   5. 返回的是一个元素对象;
   6. console.dir 打印返回的元素对象，更好的查看里面的属性和方法;
   ```
   <div id="time">2022-6-7</div>
   <script>
      // 1. 因为文档页面从上往下加载，所以先有标签，script写在标签的下面
      // 2.  驼峰命名法
      // 3. 参数 id是大小写敏感的字符串（''）
      // 4. 返回的是一个元素对象
      var timer = document.getElementById('time');
      console.log(timer);// <div id="time">2022-6-7</div>
      console.log(typeof timer);// object
      // 5. console.dir 打印返回的元素对象，更好的查看里面的属性和方法
      console.dir(timer);// div#time
   </script>
   ```
### 3.2 根据标签名获取（不推荐）
   1. 使用getElementsByTagName('标签名');
      1. 返回的是 获取过来元素对象的集合 以伪数组的形式储存的;
      2. 依次打印里面的元素对象，需要采取遍历的方式;
      3. 页面只有一个li ,返回的还是伪数组的形式;
      4. 页面没有这个元素，返回的是空的伪数组的形式;
      5. 得到元素对象是动态的，内容变了，js不需要改动；
   2. element.getElementsByTagName('标签名')；
      1. 获取某个元素（父元素）内部所有指定标签名的子元素；
      2. 元素必须是单个对象（必须指明是哪一个元素对象），获取的时候不包括父元素自己；
   ```
   <ul>
        <li>斤斤计较斤斤计较1</li>
        <li>斤斤计较斤斤计较2</li>
        <li>斤斤计较斤斤计较3</li>
   </ul> 
   <ol id="ol">
        <li>酷酷酷</li>
        <li>酷酷酷</li>
        <li>酷酷酷</li>
   </ol>
   // 返回的是 获取过来元素对象的集合 以伪数组的形式储存的
   <script>
   var lis = document.getElementsByTagName('li');
   console.log(lis);
   console.log(lis[0]);
   // 2. 想要依次打印里面的元素对象，可以采取遍历的方式
   for (var i = 0; i < lis.length; i++) {
       console.log(lis[i]);
   }
   // 3. 页面只有一个li ,返回的还是伪数组的形式
   // 4. 页面没有这个元素，返回的是空的伪数组的形式
   // 5. element.getElementByTagName('标签名')
   //var ol = document.getElementsByName('ol');// [ol] 是数组 不能当父元素
   //console.log(ol[0].getElementsByTagName('li'));// 父元素必须是指定单个对象
   var ol = document.getElementById('ol');
   console.log(ol.getElementsByTagName('li'));
   <script>
   ```
### 3.3 通过HTML5新增的方法获取（i9以上浏览器才支持）
   1. ducomen.getElementsByClassName('类名');// 根据类名返回元素对象集合
   ```
   <div class="box">盒子1</div>
   <div class="box">盒子2</div>
   <div id="nav">
      <ul>
         <li>类名</li>
         <li>类名</li>
      </ul>
   </div>
   <script>
      var boxs = document.getElementsByClassName('box');
      console.log(boxs);
   </script>
   ```
   2. querySelecter()（推荐）返回指定选择器的第一个元素，里面选择器需要加符号（类.box，id #nav）
   ```
      var firstBox = document.querySelector('.box');
      console.log(firstBox);
      var nav = document.querySelector('#nav');
      console.log(nav);
      var li = document.querySelector('li')//标签选择器不需要加符号
      console.log(li);
   ```
   3. querySelecterAll() 返回指定选择器所有元素对象集合（推荐）
   ```
   var allBox = document.querySelectorAll('.box');
   console.log(allBox);
   ```
### 3.4 获取特殊元素（body，html）
   1. 获取body元素：document.body();返回body元素对象；
   2. 获取html元素：document.documentElement();返回html元素对象；
## 4. 事件基础
   1. 事件概述：JS使我们有能力创建动态页面，而时间是可以被JS侦测到的行为；
   2. 简单理解：触发--响应机制；
   3. 网页中每个元素都可以产生某些可以触发JS的事件，例如用户在点击某按钮时产生一个事件，然后去执行某些操作；
### 4.1 事件三要素
   1. 事件源：事件被触发的对象 谁；
   2. 事件类型：如何触发 什么事件（鼠标点击，鼠标经过，键盘按下等）；
   3. 事件处理程序：通过一个函数赋值（匿名函数）的方式完成;
   ```
   <button id="btn">酷酷酷</button>
   <script>
      // 1. 事件源 获取对象
      var btn = document.getElementById('btn');
      // 2. 事件类型 3. 事件处理程序
      btn.onclick = function () {
         alert('点击');
      }
   </script>
   ```
### 4.2 执行事件的步骤
   1. 获取事件源；
   2. 注册事件（绑定事件）；
   3. 添加事件处理程序（采取函数赋值形式）；
   ```
   <div>123</div>
   var div = document.querySelector('div');
   div.onclick = function () {
       console.log('我被选中了');
   }
   ```
   4. 常见鼠标事件：
      1. onclick：鼠标点击左键；
      2. onmouseover：鼠标经过；
      3. onmouseout:鼠标离开；
      4. onfocus:获得鼠标焦点；（案例在练习15）
      5. onblur:失去鼠标焦点
      6. onmousemove:鼠标移动；
      7. onmouseup:鼠标弹起；
      8. onmousedown:鼠标按下；
