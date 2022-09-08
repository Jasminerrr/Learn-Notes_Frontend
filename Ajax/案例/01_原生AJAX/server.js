// 1. 引入express
const express = require('express');

// 2. 创建应用对象
const app = express();

// 3. 创建路由规则
// request 对请求报文的得封装
// response 对响应报文的得封装
// 如果URL路径（请求行第二段内容）是/server，则会执行回调函数里面的代码，并且由response来做出响应
app.get('/server', (request, response) => {
    // 设置响应头（头名字：Access-Control-Allow-Origin，值：*） 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 设置响应体
    response.send('HELLO AJAX GET');
});

// all是可以接收任意类型的请求
app.all('/server', (request, response) => {
    // 设置响应头 头名字：Access-Control-Allow-Origin，值：*(表示所有类型头信息都可以接受) 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 特殊响应头（后端设置）
    response.setHeader('Access-Control-Allow-Headers', '*')
    // 设置响应体
    response.send('HELLO AJAX POST');
});

// JSON响应
app.all('/json-server', (request, response) => {
    // 设置响应头 头名字：Access-Control-Allow-Origin，值：*(表示所有类型头信息都可以接受) 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 特殊响应头（后端设置）
    response.setHeader('Access-Control-Allow-Headers', '*');
    // 响应一个数据
    const data = {
        name: 'Jack'
    };
    // 对对象进行字符串转换
    let str = JSON.stringify(data);
    // 设置响应体
    response.send(str);// send只能接收字符串和buffer
});

// 专门针对IE缓存
app.get('/ie', (request, response) => {
    // 设置响应头（头名字：Access-Control-Allow-Origin，值：*） 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 设置响应体
    response.send('HELLO IE');
});

//延迟响应
app.all('/delay', (request, response) => {
    // 设置响应头（头名字：Access-Control-Allow-Origin，值：*） 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    setTimeout(() => {
        // 设置响应体
        response.send('延迟响应');
    }, 3000)
});

// axios 服务
app.all('/axios-server', (request, response) => {
    // 设置响应头 头名字：Access-Control-Allow-Origin，值：*(表示所有类型头信息都可以接受) 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 特殊响应头（后端设置）
    response.setHeader('Access-Control-Allow-Headers', '*');
    // 响应一个数据
    const data = {
        name: 'Jack'
    };
    // 设置响应体
    response.send(JSON.stringify(data));// send只能接收字符串和buffer(对对象进行字符串转换)
});

// fetch 服务
app.all('/fetch-server', (request, response) => {
    // 设置响应 头 头名字：Access-Control-Allow-Origin，值：*(表示所有类型头信息都可以接受) 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 特殊响应头（后端设置）
    response.setHeader('Access-Control-Allow-Headers', '*');
    // 响应一个数据
    const data = {
        name: 'Jack'
    };
    // 设置响应体
    response.send(JSON.stringify(data));// send只能接收字符串和buffer(对对象进行字符串转换)
});

// jsonp服务
app.all('/jsonp-server',(request,response)=>{
    // response.send('console.log("hello jsonp")'); 返回标准js代码 否则不能解析
    const data = {
        name:'Jack'
    };
    // 将数据转换为字符串
    let str = JSON.stringify(data);
    // 返回结果：函数的调用(js代码)，函数中的实参就是服务端想要给客户端返回的结果数据，该函数需要提前声明
    response.end(`handle(${str})`);
});

// jsonp检测用户名是否存在
app.all('/check-username',(request,response)=>{
    // response.send('console.log("hello jsonp")'); 返回标准js代码 否则不能解析
    const data = {
        exist:1,
        msg:'用户名已经存在'
    };
    // 将数据转换为字符串
    let str = JSON.stringify(data);
    // 返回结果：函数的调用(js代码)，函数中的实参就是服务端想要给客户端返回的结果数据，该函数需要提前声明
    response.end(`handle(${str})`);
});

// 4. 监听端口启动服务
app.listen(8000, () => {
    console.log("服务已启动，8000 端口监听中...");
})
