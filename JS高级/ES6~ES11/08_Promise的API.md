# 1. Promise.prototype.then 方法
1. then方法接收两个参数，都是函数类型的值(回调)；
   1. 每个函数都有一个形参，成功形参为value/失败为reason；
2. 异步代码调用resolve表示成功时(传入成功的值value)，then方法会执行第一个回调函数代码；
3. 异步代码调用reject表示失败时(传入失败的值reason)，then方法会执行第二个回调函数代码;
4. then方法会返回一个新的Promise实例对象，对象状态由回调函数的执行结果决定：
   1. 如果回调函数中返回的结果是 非promise类型的属性，则新实例状态为成功，返回值为成功的值；
   2. 如果返回结果是 promise对象，则这个对象 决定then方法返回的新promise状态，成功的值就是then方法返回成功的值，失败则返回失败的值；
   3. 不return ，状态为成功，返回值为undefined；
5. 成功可以没有成功得回调（不输出），但是失败必须有失败的回调（没有则会抛异常）；
6. 抛出错误：则状态为失败的Promise状态，值为抛出的值； 
   ```
    // 实例化对象
    const p = new Promise(function (resolve, reject) {
        setTimeout(function () {
            // let data = '数据库中的用户数据';
            // 调用resolve
            // resolve(data);
            let err = '数据读取失败';
            reject(err);
        }, 1000)
    });
    // 调用Promise 对象的 then 方法
    // then方法接收两个参数，都是函数类型的值(回调)，每个函数都有一个形参，成功形参为value失败为reason
    // 异步代码调用resolve表示成功时，then方法会执行第一个回调函数代码
    // 异步代码调用reject表示失败时，then方法会执行第二个回调函数代码
    p.then(function (value) {
        console.log(value);
    }, function (reason) {
        console.log(reason);
    })
   ```
# 2. then 方法的链式调用
1. then方法会返回一个新的Promise实例对象，对象的状态和值由回调函数的执行结果决定：
   1. 如果then指定回调函数返回的是 [非promise类型的值]：
      1. 则[新Promise实例]状态为成功，返回值为成功的值；
   2. 如果then指定回调函数返回的是 [promise对象]：
      1. 则[新Promise实例]的状态、值，都与此返回promise对象一致；
   3. 如果then指定回调抛出异常：
      1. 则[新Promise实例]状态为rejected，值为抛出的异常值； 
   ```
    const p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('成功');
        }, 2000)
    });
    p.then(
        value => { console.log(value); return Promise.reject('失败'); },
        (reason) => { console.log(reason); }
    ).then(
        (value) => { console.log(value); return true; },
        (reason) => { console.log(reason); return 100; }
    ).then(
        (value) => { console.log(value); throw 900; },
        (reason) => { console.log(reason); return false; }
    ).then(
        (value) => { console.log(value); return false; },
        (reason) => { console.log(reason); return false; }
    )
   ```
2. 中断promise链：
   1. 当使用promise得then链式调用时，在中间中断，不再调用后面得回调函数；
   2. 方法：在失败的回调函数中返回一个pending状态得Promise实例；（每个失败回调都要返回）
   ```
   p.then(
        value => { console.log(value); return new Promise(()=>{}) },// 状态为pending则不往下调用
        (reason) => { console.log(reason); }
   ```
# 3. Promise.prototype.catch 方法
1. 语法：Promise实例.catch(onRejected):
   1. onRejected:失败的回调函数 (reason)=> {}；
   2. catch方法是then方法的语法糖，相当于then(undefined,onRejected)；
   ```
   const p = new Promise((resolve,reject)=>{
      setTimeout(()=>{
         reject('出错了');
      },1000)
   });
   p.catch((reason)=>{
      console.log(reason);
   })
   ```
# 4. Promise.resolve方法
1. 语法：Promise.resolve(value)；
2. 用于快速返回一个状态为fulfilled或rejected的Promise实例对象；
   1. value值为非Promise值，p对象状态为成功；
   2. value值为失败状态的Promise值，则p状态失败；
   ```
    const p = Promise.resolve('用户数据');
    p.then(
        (value)=>{
            console.log(value);
    },
        (reason)=>{
        console.log(reason);
    })
   ```
# 5. Promise.reject方法
1. 语法：Promise.reject(reason)；
2. 用于快速返回一个状态必为rejected的Promise实例对象；
   ```
    const p = Promise.reject('失败了');
    p.then(
        (value)=>{
            console.log(value);
    },
        (reason)=>{
        console.log(reason);
    })
   ```
# 6. Promise.all方法
1. 语法：Promise.all(promiseArr)；
2. promiseArr：包含n个Promise实例的数组，类似：[p1,p2,p3...]；
3. 返回一个新的Promise实例：
   1. 当Promise数组中所有Promise都成功，返回新的实例状态才成功，value值为数组（每个对象单独值组成的数组）；
   2. 只要一个失败，状态则失败，reason的值为失败对象的值（只要有一个失败，则不往下运行了）；
   ```
    const p1 = Promise.resolve('用户数据');
    const p2 = new Promise((resolve,reject)=>{
      setTimeout(()=>{
         reject('出错了');
      },1000)
    });
    const p3 = new Promise((resolve,reject)=>{
      setTimeout(()=>{
         reject('出错了');
      },2000)
    });
    const x = Promise.all[p1,p2,p3];
    x.then(
        (value)=>{
            console.log(value);
    },
        (reason)=>{
        console.log(reason);
    })
   ```
# 7. Promise.race方法
1. 语法：Promise.race(promiseArr)；
2. promiseArr：包含n个Promise实例的数组，类似：[p1,p2,p3...]；
3. 返回一个新的Promise实例：以最先出结果的promise为准；
   1. 最快出结果的状态为准，不看顺序;
   ```
    const p1 = Promise.resolve('用户数据');
    const p2 = new Promise((resolve,reject)=>{
      setTimeout(()=>{
         reject('出错了');
      },1000)
    });
    const p3 = new Promise((resolve,reject)=>{
      setTimeout(()=>{
         reject('出错了');
      },2000)
    });
    const x = Promise.race[p1,p2,p3];
    x.then(
        (value)=>{
            console.log(value);
    },
        (reason)=>{
        console.log(reason);
    })
   ```