# 1. 含义和基本用法
1. ES6 提供了新的数据结构 Set（集合）:
   1. 它类似于数组，但是成员的值都是唯一的，没有重复的值;;
   2. set集合具有唯一性，会自动去除数组的重复成员；
2. 集合实现了iterator接口，所以可以使用[扩展运算符]和[for...of...]进行遍历；
3. Set本身是一个构造函数，用来生成 Set 数据结构。
# 2. 集合的属性和方法
1. size：返回集合的元素个数；
2. add：增加一个新元素，返回当前集合；
3. delete：删除元素，返回Boolean值，表示是否成功；
4. has：检测集合中是否包含某个元素，返回Boolean值；
5. clear：清空集合；
   ```
    // 声明一个set
    let s = new Set();
    // console.log(s,typeof s);
    let s2 = new Set([1,2,2,3,4]);

    // 1. 元素个数
    console.log(s2.size);// 4

    // 2. 添加新元素
    console.log(s2.add(8));// [1,2,3,4,8]
    // console.log(s2.delete(1));// 返回为true

    // 3. 删除元素
    s2.delete(1);
    console.log(s2);// [2,3,4,8]

    // 4. 检测元素
    console.log(s2.has(3));// true

    // 5. 清空元素 
    // s2.clear();
    console.log(s2);
    
    // 6. 遍历数组
    for(let v of s2){
        console.log(v);
    }
   ```
   