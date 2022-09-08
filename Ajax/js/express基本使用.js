// 1. 引入express
const express = require('express');

// 2. 创建应用对象
const app = express();

// 3. 创建路由规则
// request 对请求报文的得封装
// response 对响应报文的得封装
app.get('/', (request, response) => {
    // 设置响应体
    response.send('hello');
});

// 4. 监听端口启动服务
app.listen(8000, () => {
    console.log("服务已启动，8000 端口监听中...");
})
