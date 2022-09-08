# 1. 错误的类型
1. error：所有错误的父类型；
2. ReferenceError：引用变量不存在；
3. TypeError：数据类型不正确；
4. RangeError：数据值不在其所允许的范围内（死循环）；
5. SyntaxError：语法错误；
6. 进一步理解JS中的错误和错误处理：mdn文档：
# 2. 错误处理
1. 捕获错误：try{}catch(){}；
   ```
   // 如何捕获一个错误
   // try中放可能会出现错误的代码，一旦出现错误立即停止try中代码的执行，调用catch，并携带错误信息
    try {
        console.log(1);
        console.log(a);
        console.log(3);
    } catch (error) {
        console.log('代码执行出错了，原因是：',error);
    }
   ```
2. 抛出错误：throw error ；（一旦抛出错误，后面代码则不会运行了）
   ```
    function demo(){
        const data = Data.now();
        if(data % 2 === 0){
            console.log('偶数，可以正常工作');
        }else{
            throw new Error('奇数，不可以工作');// 错误对象
        }
    }
   ```
#  3. 错误对象
1. message属性：错误相关信息；
2. stack属性：记录信息；