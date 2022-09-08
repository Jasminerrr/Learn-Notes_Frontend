## 1. 使用箭头函数(=>)定义函数
1. 语法：
   ```
   let fn =() => {
       return a+b;
   }
   fn(1,2);
   ```
2. 箭头函数不绑定this 没有自己的this关键字：
   1. 始终指向函数声明时所在作用域下的 this 的值；（箭头函数定义位置的上下文this）
   2. 对象不能产生作用域，对象中的this永远和最外层的对象所处环境保持一致；
   ```
    function getName() {
        console.log(this.name);
    }
    let getName2 = () => {
        console.log(this.name);
    }
    window.name = 'andy';
    const school = {
        name: 'bob'
    }
    // 直接调用
    // getName();// andy  直接调用所有普通函数的this都指向window
    // getName2();// andy 箭头函数在全局作用域下声明的 也指向window

    // call(obj)方法调用：可以改变函数内部this指向
    getName.call(school);// bob 此时this指向school对象
    getName2.call(school);// andy 箭头函数依然指向window
   ```
3. 不能作为构造函数实例化对象；
4. 不能使用arguments变量；
5. 适用场景：
   1. 适合与this无关的回调，定时器、数组方法的回调；
   2. 不适合与this有关的回调，事件回调，对象的方法；
6. 箭头函数的简写：
   1. 省略小括号：当形参只有一个的时候
   ```
   let add = n =>{
       return n +1;
   }
   console.log(add(3));
   ```
   1. 省略花括号：当代码体只有一条语句的时候，此时return必须省略，而且语句的执行结果就是函数的返回值；
   ```
   let add = n => n * n;
   console.log(add(3));
   ```
## 2. 箭头函数面试题
```
    var age = 100;
    var obj = {
        age: 20,
        say: () => {
            alert(this.age);// 100 此时this指向window，因为对象不能产生作用域
        }
    }
    obj.say();
```
## 3. 剩余参数（rest参数）
1. 可以将一个不定数量的参数表示为一个数组：
   1. 变量名前面加...，参数必须放在最后；
   2. 此时变量就变成数组，用来接收剩余数组的值；
   3. arguments返回是对象，伪数组，rest返回是数组
   ```
   function sum (first, ...args) {
     console.log(first); // 10
     console.log(args); // [20, 30] 
    }
    sum(10, 20, 30)

    // 箭头函数
    const sum = (...args) => {
        let total = 0;
        args.forEach(item => total += item){
            return total;
        }
    }
    console.log(sum(10, 20));
    console.log(sum(10, 20, 30));
   ```
### 3.1 剩余参数与结构赋值结合
   ```
   let arr = ['张三','李四','王五'];
   let [s1,...s2] = arr;
   console.log(s1);// 张三
   console.log(s2);// ['李四','王五']
   ```
## 4. 函数参数的默认值设置
### 4. 1 允许给函数参数（形参）赋初始值；
   1. 具有默认值的参数，一般位置要靠后；
   2. 有实参就用实参的值，没传就用默认形参的值；
   ```
    function add(a, b, c = 10) {
        return a + b + c;
    }
    let result = add(1, 2);
    console.log(result);// 13
   ```
### 4.2 形参初始值与结构赋值结合
   ```
    function fn({ a = '张三', b, c }) {
        console.log(a);// 张三
        console.log(b);// 李四
        console.log(c);// 王五
    }
    // 传一个对象进去
    fn({
        // a: '张三',
        b: '李四',
        c: '王五'
    });
   ```
