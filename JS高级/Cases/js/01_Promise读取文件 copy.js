// 1. 引入fs 模块（fs是node.js的文件管理模块）
const fs = require('fs');

// 2. 调用方法读取文件，参数（文件路径,回调函数）；err是错误对象，如果失败为null,data是读取的结果
/* fs.readFile('../ES6~ES11/07_Promise对象.md', (err, data) => {
    // 如果失败，抛出错误
    if (err) throw err;
    //如果没有出错，则输出内容
    // console.log(data);// 输出为 Buffer是字符流
    console.log(data.toString());
}); */

// 3. 使用Promise封装
const p = new Promise(function(resolve,reject){
    fs.readFile('../ES6~ES11/07_Promise对象.mda',(err,data)=>{
        if(err){
            reject(err);
        }else{
            resolve(data);
        }
    });
});
p.then(function(value){
    console.log(value.toString());
},function(reason){
    console.log('读取失败!!');
});