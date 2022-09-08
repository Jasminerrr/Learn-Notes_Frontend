# 1. 含义和基本用法
1. ES6 提供了Map数据结构:
   1. 它类似于对象，也是键值对的集合；
   2. 但是'键'的范围不限于字符串，各种类型的值(包括对象)都可以当作键;
2. Map也实现了iterator接口，所以可以使用[扩展运算符]和[for...of...]进行遍历；
3. Map本身是一个构造函数，用来生成 Map 数据结构。
# 2. Map的属性和方法
1. size：返回Map的元素个数；
2. set('键名','键值')：增加一个新元素，返回当前Map；
3. get：返回键名对象的键值；
4. has：检测Map中是否包含某个元素，返回Boolean值；
5. clear：清空集合，返回undefined；
   ```
    let m = new Map();
    // 1. 添加元素
    m.set('name', '张三');
    m.set('change', function () {
        console.log('aaaaaaaa');
    });
    let key = {
        age: 18
    };
    m.set(key, ['a', 'b', 'c']);
    // 2. 返回Map的元素个数
    console.log(m.size);//  3
    // 3. 删除元素
    m.delete('name');
    // 4. 获取元素
    console.log(m.get('change'));
    console.log(m.get(key));
    // 5. 清空元素
    m.clear();
    // 6. 遍历元素：每个元素都是一个数组[key,value]
    for (let k of m) {
        console.log(k);
    }
   ```