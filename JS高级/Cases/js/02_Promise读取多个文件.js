// 1. 引入fs 模块（fs是node.js的文件管理模块）
const fs = require('fs');

// 2 使用Promise封装
const p = new Promise(function (resolve, reject) {
    fs.readFile('../ES6~ES11/07_Promise对象.md', (err, data) => {
        resolve(data);
    });
});
p.then(value => {
    return new Promise((resolve, reject) => {
        fs.readFile('../ES6~ES11/08_Promise的API.md', (err, data) => {
            resolve([value,data]);// 将第一次数据返回值value和第二次数据data合并成数组返回给value
        });
    });
}).then(value=>{
    return new Promise((resolve,reject)=>{
        fs.readFile('../ES6~ES11/09_Promise的几个关键问题.md', (err, data) => {
            value.push(data);// 将第三次数据data添加在数组末尾
            resolve(value);// 最后返回value为数组
        });
    })
}).then(value=>{
    console.log(value.join('\r\n')); //join('分隔符')  数组转换为字符串
})