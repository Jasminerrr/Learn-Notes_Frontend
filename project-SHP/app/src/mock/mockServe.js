// 引入mockjs模块
import Mock from 'mockjs'
// 把JSON数据格式引入进来【JSON数据格式没有对外暴露，但是可以引入】
// webpack默认对外暴露的有：图片、JSON数据格式
import banner from './banner'
import floor from './floor'

// Mock是一个对象，mock(请求地址，请求数据)是里面的方法
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})

// 此处不用暴露，因为在其他文件用不到，只要在入口文件引入执行就可以了