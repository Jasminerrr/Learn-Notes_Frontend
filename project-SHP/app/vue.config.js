const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 项目打包时，去掉map文件 
  productionSourceMap:false,
  transpileDependencies: true,
  lintOnSave: false, // 关闭ealint校验功能
  // 前端通过代理解决跨域问题
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // 已经所以接口都带/api，不需要路径重写了
        pathRewrite:{'^/api ':''},
        // ws: true, // 用于支持websocket
        // changeOrigin: true // 用于控制请求头中的host值
      }
    }
  }
})
