// 想要webpack打包资源，必须引入该资源
// 不管在模式中创建了那些文件js也好，css也罢，都要导入到入口文件（main.js）中，才能够被webpack打包到一个指定区域的文件中（dist），然后打包好了，再到public 的html 中去引入，才能被浏览器解析
import count from "./js/count.js"
import sum from "./js/sum.js"
// 样式直接引入就可，目的是打包资源，不需要定义变量接收,
import './css/iconfont.css'
import './css/test1.css'
import './less/test2.less'
import './sass/test3.sass'
import './sass/test4.scss'
import './stylus/test5.styl'

console.log(count(13,2))
console.log(sum(1,4,5,22))