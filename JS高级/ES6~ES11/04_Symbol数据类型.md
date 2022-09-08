## 1. 原始数据类型Symbol
1. 表示独一无二的值，是 JavaScript 语言的第七种数据类型；
2. Symbol 值通过Symbol()函数生成；
3. 属性名属于 Symbol 类型，不会与其他属性名产生冲突；
4. Symbol 值不是对象，所以不能添加属性；基本上，它是一种类似于字符串的数据类型。
5. 不能与其他数据类型进行运算；
6. 适用场景：给对象添加属性和方法；
### 1.1 创建Symbol方式一：
   ```
    let s1 = Symbol();
    let s2 = Symbol('abc');
    let s3 = Symbol('abc');
    console.log(s2 === s3);// false 内存地址不同
   ```
### 1.2 方式二：Symbol.for()创建
   1. 接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值；如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。
   ```
    // 此时Symbol成为一个对象
    let s1 = Symbol.for('foo');// 两个的引用地址相同
    let s2 = Symbol.for('foo');
    console.log(s1 === s2); // true
   ```
### 1.3 Symbol() 与Symbol.for()区别
   1. Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值；
   2. Symbol()写法没有登记机制，所以每次调用都会返回一个不同的值；
## 2. 给对象添加Symbol类型的属性
1. Symbol返回的值是唯一的，所以obj.Symbol，这个Symbol的属性不会与任何属性冲突；
2. Symbol 值作为对象属性名时，不能用点运算符；
3. 在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中；
   ```
   // 向对象添加方法 up down
   let game = {
       name: '俄罗斯方块',
       up: function () {
           console.log('up');
       },
       down: function () {
           console.log('down');
       }
   }

   // (1) 方法一：
   // 声明一个对象 
   let methods = {
       up: Symbol(),
       down: Symbol()
   };
   // Symbol 值必须放在方括号之中
   game[methods.up] = function () {
       console.log('aaaaaa');
   };
   game[methods.down] = function () {
       console.log('bbbbbbbb');
   };
   console.log(game);

       // (2) 方法二：
        let youxi = {
            name: 'jas',
            // Symbol 值作为对象属性名时，不能用点运算符
            [Symbol('say')]: function () {
                console.log('aaaaaa');
            },
            [Symbol('set')]: function () {
                console.log('bbbbbbb');
            }
        }
        console.log(youxi);
   ```
## 3. Symbol的内置属性
1. Symbol主要可以让对象有一个隐藏属性  这个属性无法遍历  且唯一；
2. 就是对象的属性，当你调用对象的某个特定方法的时候会自己调用这些函数；
3. 内置的Symbol值有：
   1. Symbol.hasInstance；
   2. Symbol.isConcatSpreadable；
   3. Symbol.species；
   4. Symbol.match；
   5. Symbol.replace；
   6. Symbol.search；
   7. Symbol.split；
   8. Symbol.iterator；
   9. Symbol.toPrimitive；
   10. Symbol.toStringTag；
   11. Symbol.unscopables；
4. Symbol.hasInstance：当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法；
   ```
    class Person {
        static [Symbol.hasInstance](param) {
            console.log(param);
            console.log('我被用来检测类型');
            return false;
        }
    }
    let o = {};
    console.log(o instanceof Person);
   ```
5. Symbol.isConcatSpreadable：属性等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开。
   ```
    const arr = [1, 2, 3];
    const arr2 = [4, 5, 6];
    arr2[Symbol.isConcatSpreadable] = false;
    console.log(arr.concat(arr2));
   ```
