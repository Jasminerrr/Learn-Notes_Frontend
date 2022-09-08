// 简单动画函数封装： obj 目标对象，target 目标距离
// 给不同得元素指定不同的定时器
function animate(obj, target, callback) {//callback = function(){}，调用callback();
    // 当不断点击按钮，会重复调用函数，定时器开启太多 速度会越来越快
    // 解决方法：每次执行前先清除以前的定时器，只保留当前的定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        //把步长值改为整数，不要有小数的问题 往大了取：Math.ceil()
        // var step = Math.ceil((target - obj.offsetLeft) / 10); //步长值写在定时器里面，每次定时器执行，重新计算步长
        // 往回走是负值，要往小了取
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {// 让当前盒子等于目标值，计时器停止
            clearInterval(obj.timer);// 停止动画本质就是停止计时器
            //回调函数写在定时器结束里面，结束之后才执行
            if (callback) {//如果有这个函数
                callback();//调用函数
            }
        }
        //每次匀速加 1 改成 慢慢变小得值
        //让盒子每次移动距离变小 ：步长公式 = （目标值 - 现在的位置）/ 10 
        obj.style.left = obj.offsetLeft + step + 'px'
    }, 15);
}