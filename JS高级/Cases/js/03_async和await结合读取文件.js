// 1. 引入 fs模块
const fs = require("fs");

// 封装函数，每个函数返回都是Promise对象
// 读取01
function readone(){
    return new Promise((resovle,reject)=>{
        fs.readFile("../../ES6~ES11/01_声明变量及特性.md",(err,data)=>{
            // 如果失败
            if(err) reject(err);
            // 如果成功
            resovle(data);
        })
    })
}
// 读取02
function readtwo(){
    return new Promise((resovle,reject)=>{
        fs.readFile("../../ES6~ES11/02_箭头函数、函数参数默认值、rest参数.md",(err,data)=>{
            // 如果失败
            if(err) reject(err);
            // 如果成功
            resovle(data);
        })
    })
}
// 读取01
function readthree(){
    return new Promise((resovle,reject)=>{
        fs.readFile("../../ES6~ES11/03_扩展运算符(数组).md",(err,data)=>{
            // 如果失败
            if(err) reject(err);
            // 如果成功
            resovle(data);
        })
    })
}
// 声明async函数
async function main(){
    //获取内容
    let one = await readone();
    let two = await readtwo();
    let three = await readthree();
    console.log(one.toString());
    console.log(two.toString());
    console.log(three.toString());
}
main();