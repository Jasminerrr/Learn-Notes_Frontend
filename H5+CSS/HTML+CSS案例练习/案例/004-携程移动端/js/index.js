window.addEventListener('load', function () {
    // 1. 获取元素
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    //  获得focus的宽度
    var w = focus.offsetWidth;
    var ol = focus.children[1];
    // 2. 利用定时器自动轮播图片
    var index = 0;
    var timer = setInterval(function () {
        index++;
        // 图片移动距离 = 图片索引号 * 图片宽度
        var translatex = -index * w;
        ul.style.transition = 'all .5s';
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000);
    // 等过渡完成之后，再去判断，监听过渡完成的事件：transitionend
    ul.addEventListener('transitionend', function () {
        // 无缝滚动
        if (index >= 3) {
            index = 0;
            // 图片要去掉过渡效果，然后快速移动到目标位置（第一张）
            ul.style.transition = 'none';
            // 用最新的索引号去滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) { // 倒着走
            index = 2;
            ul.style.transition = 'none';
            // 用最新的索引号去滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        // 3. 小圆点跟随变化效果
        // (1) 把ol里面的li带有current类名得选出来去掉类名 remove
        ol.querySelector('.current').classList.remove('current');
        // (2) 让当前索引号的li加上current类 add
        ol.children[index].classList.add('current');
    });
    // 4. 手指滑动轮播图
    // 触摸元素touchstart：获取手指初始坐标
    var startX = 0;
    var moveX = 0;// 后面会使用这个移动距离,定义全局变量
    var flag = false;
    ul.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        // 手指触摸时，就停止计时器
        clearInterval(timer);
    });
    // 移动手指touchmove：计算手指的滑动距离 =（移动后的距离-初始触摸距离）
    ul.addEventListener('touchmove', function (e) {
        moveX = e.targetTouches[0].pageX - startX;
        // 盒子移动的距离 = 盒子原始位置 + 手指移动距离
        var translatex = -index * w + moveX;
        // 手指拖动不需要动画效果
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true;// 如果用户手指移动再去判断,否则不做判断效果
        e.preventDefault();// 取消手指滚动屏幕的行为
    });
    // 手指离开 touchend：根据移动距离去判断是回弹还是播放上一张或下一张
    ul.addEventListener('touchend', function (e) {
        if (flag) {
            // (1) 如果移动距离距离大于50像素就播放上一张或下一张
            if (Math.abs(moveX) > 50) {
                if (moveX > 0) { // 大于0 moveX是正值,左滑播放上一张
                    index--;
                } else {// 小于0 moveX是负值,右滑播放下一张
                    index++;
                }
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else {
                // (2) 如果移动距离距离小于50像素就回弹
                var translatex = -index * w;
                ul.style.transition = 'all .1s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
        }
        // 开启定时器之前先清除定时器
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            // 图片移动距离 = 图片索引号 * 图片宽度
            var translatex = -index * w;
            ul.style.transition = 'all .5s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }, 2000);
    });
    // 返回顶部模块
    var goBack = document.querySelector('.goBack');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function () {
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block';
            console.log(1);
        } else {
            goBack.style.display = 'none';
        }
    });
    goBack.addEventListener('click', function () {
        window.scroll(0, 0);
    });
})