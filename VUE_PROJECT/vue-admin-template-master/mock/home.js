// 引入data.json并赋值给data
const data = require('./data.json')

// 导出mock接口
module.exports = [
  {
    url: '/home/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: data
      }
    }
  }
]
