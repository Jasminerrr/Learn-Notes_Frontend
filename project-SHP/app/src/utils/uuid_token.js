// 引入
import { v4 as uuidv4 } from 'uuid';
// 生成随机字符串，且每次执行不能发生变化，游客身份永久
export const getUUID = () =>{
  // 1. 先获取本地存储得uuid
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  // 2. 如果没有，会返回null，则!uuid_token为真，走判断
  if(!uuid_token){
    // 生成临时身份
    uuid_token = uuidv4()
    // 生成uuid后 本地存储一次
    localStorage.setItem('UUIDTOKEN',uuid_token)
  }
  // 注意：封装函数需要返回uuid_token
  return uuid_token
}