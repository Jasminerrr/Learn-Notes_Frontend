// 引入express
const express = require('express')
// 引入history
const history = require('connect-history-api-fallback');

// 创建一个app实例服务对象
const app = express()

// 必须要在静态资源之前使用，history是一个函数，要调用
app.use(history())

// 指定静态资源，需要传入路径(node.js代码)
app.use(express.static(__dirname+'/static'))

// 配置后端路由
app.get('/person',(request,response)=>{
  // 给客户端返回东西（设置响应体）
  response.send({
    name:'Tom',
    age:18,

  })
})

// 启动端口监听
app.listen(5005,(err)=>{
  if(!err) console.log('服务器启动成功了');
})

