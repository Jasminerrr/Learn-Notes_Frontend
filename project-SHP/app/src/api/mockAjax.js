// 对axios进行二次封装：为了在发请求前或数据回来以后处理一些业务
import axios from 'axios';

// 引入进度条nprogress start开始 done结束
import nprogress from 'nprogress'
// 引入进度条样式(样式可在css文件下修改)
import 'nprogress/nprogress.css'

// 1. 利用axios对象的方法create，创建一个axios实例
// 2. requests就是配置了的axios
const requests = axios.create({
  // 配置对象
  // 基础路径：发请求的时候，路径中会出现mock
  // 此处是用mock模拟数据，路径要改成mock
  baseURL:'/mock',
  // 请求时间超过5s
  timeout:5000,
});

// 请求拦截器：在发请求之前，请求拦截器可以检测到，并在发出之前做一些事情
requests.interceptors.request.use((config)=>{
  // config:配置对象，里面有个属性很重要：headers请求头
  // 进度条开始动
  nprogress.start();
  return config;
});

// 响应拦截器
requests.interceptors.response.use(
  (res)=>{
  // 成功的回调：服务器相应数据回来以后，响应拦截器可以监测到，做一些事情
  // 收到数据进度条结束
  nprogress.done()
  return res.data;
},(error)=>{
  // 响应失败回调
  return Promise.reject(new Error('failed'));
});

// 对外暴露
export default requests;


