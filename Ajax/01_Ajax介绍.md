# 1. 原生AJAX简介
1. AJAX全称为Asynchronous JavaScript And XML，就是异步得JS和XML；
2. 通过AJAX可以在浏览器中向服务器发送异步请求；
3. 最大优势：无刷新获取数据；
4. AJAX不是新的编程语言，而是一种将现有的标准组合在一起使用的新方式；
# 2. XML简介
1. XML可扩展标记语言；
2. XML被设计用来传输和存储数据；
3. XML和HTML类似：
   1. 区别：HTML中都是预定义标签，而XML中没有预定义标签，全是自定义标签，用来表示一些数据；
   2. HTML用来呈现页面，XML用来存储和传输数据；
4. 现在已经被JSON取代了；
# 3. AJAX的特点
1. 优点：
   1. 可以无需刷新页面而与服务器端进行通信；
   2. 允许你根据用户事件来更新部分页面内容；
2. 缺点：
   1. 没有浏览历史，不能回退； 
   2. 存在跨域问题（同源）；
   3. SEO（Search Engine Optimization，搜索引擎优化）不友好，爬虫无法爬取；
# 4. HTTP
1. HTTP（hypertext transport protocol）协议「超文本传输议」，协议详细规定了浏览器和万维网服务器之间互相通信的规则；
## 4.1 请求报文：重点是格式和参数
   1. 请求行:
      1. 请求类型：GET/POST/PUT/DELETE；
      2. URL 路径：s?ie=utf-8；
      3. HTTP 协议版本：HTTP/1.1；
   2. 请求头：掌握格式：名字: 值
      1. Host: atguigu.com；
      2. Cookie: name=guigu；
      3. Content-type: application/x-www-form-urlencoded；
      4. User-Agent: chrome 83；
   3. 空行：固定格式，必须有；
   4. 请求体：
      1. GET请求，请求体为空；(GET请求不能传数据，单纯的读取一个接口提供的资源，例如：浏览器输入地址，回车是get请求)
      2. POST请求，请求体可以不为空；格式灵活，例：username=admin&password=admin（POST会传入一定的数据提供后台进行一定的操作）；
## 4.2 响应报文
   1. 响应行：
      1. HTTP 协议版本：HTTP/1.1；
      2. 响应状态码：200/404/500；
      3. 响应状态字符串：OK/Not Found/Internal Server Error，与响应状态码对应
   2. 响应头：
      1. Content-Type: text/html;charset=utf-8；
      2. Content-length: 2048；
      3. Content-encoding: gzip；
      4. ...
   3. 空行：固定格式，必须有 ；
   4. 响应体；
# 5. Chrome网络控制台查看通信报文(Network-点击第一行)
## 5.1 GET请求
   1. Headers-Response Headers：响应行和响应头的内容；
      1. HTTP/1.1 200 OK：响应行；
      2. 剩下都是响应头；
   2. Response:响应体；
   3. Headers-Request Headers：请求头内容；
      1. 点开view sourse：请求行：GET URL路径 HTTP/1.1；
      2. 下面就是请求头内容；
   4. Headers-Quest String Parameters：对请求的URL参数解析后的结果；(有参数解析，没有则不显示)
   5. Preview：预览，对响应体解析之后的查看界面；
   6. GET请求没有请求体；
## 5.2 POST请求（点击login）
   1. Headers-Request Headers：请求行和请求头的内容；
      1. POST /login HTTP/1.1：请求行；
      2. 剩下都是请求头；
   2. Form Data：请求体；
   3. Headers-Response Headers：响应行和响应头的内容；
      1. HTTP/1.1 303 See Other：响应行；
      2. 剩下都是响应头；
   4. Response：响应体；
## 5.3 如何查看
   1. 请求报文：Request Headers、Form Data；
   2. 响应报文：Response Headers、Response；
