// 配置文件一定要在项目的根目录下，并且名字是webpack.config.js（固定不变的）
// 所有的配置文件都是在NodeJS中运行的，所采用的模块化都是CommonJS模块化
// 写了配置文件直接使用：npx webpack在终端运行，没有写则是npx webpack ./src/main.js --mode=development

// 引入外部path模块---nodejs里面的核心模块，专门来处理路径问题
const path = require('path')
// 引入eslint插件
const ESLintPlugin = require('eslint-webpack-plugin');
// 引入html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口：指定webpack从哪个文件作为打包入口
  entry:'./src/main.js', // 需要用相对路径
  // 输出
  output:{
    // 所有文件的输出目录
    // 开发模式下没有输出
    path:undefined,
    // 入口文件打包输出文件名
    filename:'static/js/main.js',
  },
  // 加载器：帮助识别webpack不能识别的模块
  module:{
    rules:[   // loader的配置
      {
        test: /\.css$/, // 正则表达式，加上检测的文件后缀名，只检测.css文件（$指以什么结尾：.css结尾，）
        use: [  // 只有.css文件才会使用此规则处理(用了什么包就要下载什么包)
        // 执行顺序：从右到左（从下到上）
          "style-loader", // 将js中css通过创建style标签添加到html文件中生效
          "css-loader" // 将css资源编译成commomjs的模块到js中
        ],
      },
      {
        test: /\.less$/,
        // loader:'xxx',  // 只能使用一个loader
        use: [  
          // use可以使用多个loader
          'style-loader',
          'css-loader',
          'less-loader', // 将less编译成css文件
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },
      {
        test: /\.styl$/,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 stylus 编译成 CSS
          'stylus-loader',
        ],
      },
      {
        // 处理图片资源用的是webpack内置功能，配置type: 'asset'就可了
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: 'asset', // 这样形式会转换为base64
        parser: {  
         dataUrlCondition: {  // 小于多少kb的图片需要处理
          // 优点：减少请求数量，缺点：体积会变大
           maxSize: 10 * 1024 // 小于10kb的图片转base64
         }
        },
        generator: {
          // 生成输出文件的名称
          // [hash:10]：hash值取前10位
          filename: 'static/images/[hash:10][ext][query]'
        }
      },
      {
        test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
        type: 'asset/resource',  // 其他资源统一用asset/resource处理，这种形式文件会原封不动的输出
        parser: {  
         dataUrlCondition: {  // 小于多少kb的图片需要处理
          // 优点：减少请求数量，缺点：体积会变大
           maxSize: 10 * 1024 // 小于10kb的图片转base64
         }
        },
        generator: {
          // 生成输出文件的名称
          // [hash:10]：hash值取前10位
          filename: 'static/media/[hash:10][ext][query]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules中的js文件（不处理）
        loader: 'babel-loader',
        // 智能预设，可以写在这里，也可以单独在外面写一个文件，方便修改
       /*  options: { 
          presets: ['@babel/preset-env']
        } */
      },
    ]
  },
  // 插件：扩展webpack功能
  plugins:[
    // plugins的配置
    new ESLintPlugin({
      // 指定文件根目录，类型为字符串
      context:path.resolve(__dirname,'../src') // 检测src文件下的代码
    }),
    new HtmlWebpackPlugin({
      // 模板：以public/index,html创建新的html文件
      // 新html文件特点：1.结构与原来一致，2.自动引入打包输出的资源
      template:path.resolve(__dirname,'../public/index.html')
    }),
  ],
  // 开发服务器：不会输出资源（dist），在内存中编译打包的
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },
  // 模式：开发模式
  mode:'development',
}