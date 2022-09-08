window.addEventListener('load', function () {// 需要等文档内容加载完成，再触发事件
    var box_img = document.querySelector('.box_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    // 1. 当鼠标经过box_img，就显示和隐藏 mask 跟 big
    box_img.addEventListener('mouseover', function () {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    box_img.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    //2. 鼠标移动的时候，让mask跟着鼠标走
    box_img.addEventListener('mousemove', function (e) {
        // (1). 计算鼠标在盒子内的坐标（盒子在页面的坐标要看父级没有定位,因为mask坐标以父盒子为准，所以不是直接把鼠标坐标给mask）
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        // (2). 把这个坐标给mask(遮罩层) 
        // 鼠标在盒子的中间需要 盒子往上往左走自身高度的一半 -150px
        // (3)mask移动的距离 不能超过图片盒子
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        //(4) 如果x、 y的坐标小于等于0，就让他停在0的位置
        // 如果坐标大于等于 mask最大移动的距离 = 图片盒子宽度- 遮罩层盒子宽度，就等于这个距离
        var maskMax = box_img.offsetWidth - mask.offsetWidth;//maskMax 是遮罩层最大移动距离 正方形的x、y宽高一样
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        //3. 大图片的移动距离 = 遮罩层移动距离 * 大图片的最大移动距离 / 遮罩层的最大移动距离（比例关系）
        var bigImg = document.querySelector('.bigImg');// 获取大图片
        // 大图片的最大移动距离
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        //大图片的移动距离
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        //把申明的变量给大图片 移动于遮罩层相反的方向
        bigImg.style.left = - bigX + 'px';// 大图片要给了定位才能赋值
        bigImg.style.top = - bigY + 'px';
    })
})