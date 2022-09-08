# 1. 如何改变一个Promise实例状态
1. 执行resolve(value)：如果当前状态为pending就会变为fulfilled；
2. 执行reject(reason)：如果当前状态为pending就会变为rejected；
3. 执行器函数(executor)抛出异常：如果当前是pending就会变成rejected；(一旦抛出错误，后面代码则不会运行了)
4. 对象的状态不受外界影响；
5. 一旦状态改变，就不会再变，任何时候都可以得到这个结果
   ```
   const p = new Promise((resolve,reject)=>{
   console.log(a); // 引擎抛异常
    //   throw new Error('出错啦'); 编码抛异常
   });
   p.then(
        (value)=>{
            console.log(value);
    },
        (reason)=>{
        console.log(reason);
    })
   ```
# 2. 改变Promise实例的状态和指定回调函数谁先谁后
1. 都有可能，正常情况下是先指定回调再改变状态，但也可以先改状态再指定回调；
2. 如何先改变状态再指定回调？
   1. 延迟一会再调then()；
3. Promise实例什么时候才能得到数据（value/reason）？
   1. 先指定回调，那状态发生改变时，回调函数就会调用，得到数据；
   2. 先改变状态，那当指定回调时，回调函数就会调用，得到数据；
4. 先改状态，就会把状态存在对象里面；
5. 先指定回调，就把回调存在对象里面；