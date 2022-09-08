# 1.核心对象
1. XMLHttpRequest：是window的内置方法，AJAX的所有操作都是通过该对象进行的；
# 2. 使用步骤
1. 创建XMLHttpRequest实例对象：const xhr = new XMLHttpRequest()；
2. 设置请求信息：
   1. xhr.open(method,url);// 配置请求
   2. 可选：xhr.setRequestHeader(key,value);//设置请求头 （头的名字(设置请求体内容类型),头的值(固定写法)）；
3. 发送请求数据：xhr.send(body) get请求不传body参数，只有post请求使用
4. 接收响应：
   ```
   xhr.onreadystatechange = function () {
        // 判断
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                result.innerHTML = xhr.response;
            }
        }
    }
   ```
# 3. 解决IE缓存问题
1. 问题：在一些浏览器中（IE），由于缓存机制的存在，Ajax只会发送第一次请求，剩余多次请求不会再发送给浏览器而是直接加载缓存中的数据；
2. 解决方式：浏览器的Ajax缓存是根据url地址来记录的，只需要修改url地址即可避免缓存问题；(加上时间戳 相当于不同的请求(工作中工具自己加))
3. 语法：xhr.open('GET','url/t=' + Date.now());
# 4. AJAX请求状态
1. xhr.readyState：可以用来查看请求当前的状态；readyState 是 xhr 对象中的一个属性，表示状态 有5个值：触发4次（change改一次触发一次）
   1. 0：未初始化，对象创建完成，还没有调用open()方法；
   2. 1：对象初始化完成，open 方法调用完毕，正在发送请求；
   3. 2：请求已发送，send 方法调用完毕，已经收到全部响应内容（头信息和状态码）；
   4. 3：服务端返回了部分结果；
   5. 4：标识数据已经接收完毕，服务端返回所有结果；
# 5. 重点掌握代码（面试）
1. GET请求原生代码；(笔试)
2. POST请求原生代码；(笔试)
3. 取消请求用abort()；
4. 非同源受到哪些限制；
5. JSONP解决跨域原生代码；(笔试)
6. 