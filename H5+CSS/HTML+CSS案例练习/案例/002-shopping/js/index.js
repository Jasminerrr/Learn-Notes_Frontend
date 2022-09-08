//需要添加load事件，等页面加载完毕再执行
window.addEventListener('load', function () {
    // 1. 先获取左右两个按钮和focus焦点图元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 2. 鼠标经过轮播图 ，显示左右箭头
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        // 清除定时器变量
        timer = null;
    })
    // 鼠标离开轮播图 ，显示左右箭头
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            // 手动调用点击事件
            arrow_r.click();
        }, 2000);
    })
    //3. 动态生成小圆圈：圆圈的个数要与轮播图的图片数量相同
    // (1)先得到ul里面图片的数量（图片放在li里面，就是得到li的个数）；
    // (2)利用循环动态生成小圆圈（要放在ol里面）；
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        // (3)创建节点createElement('li')；
        var li = document.createElement('li');
        // 在生成小圆圈同时，设置自定义属性 记录当前索引号
        li.setAttribute('index', i);
        // (4)插入节点ol.appendChild('li');
        ol.appendChild(li);
        // 4. 小圆圈排他思想，再生成小圆圈的同时，直接绑定点击事件
        li.addEventListener('click', function () {
            // 把所有li清除类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 让当前点击的li设置current类名
            this.className = 'current';
            // 5. 点击小圆圈，移动图片（ul移动）:animate(obj, target, callback);
            // ul移动距离（负值） = 小圆圈索引号 * 图片的宽度
            // 当点击了某个li，就拿到当前li的索引号
            var index = this.getAttribute('index');
            // 当点击某个li(圆圈)，索引号给num(控制箭头)
            num = index;
            // 当点击某个li(圆圈)，索引号给circle(控制圆圈)
            circle = index;
            console.log(index);
            console.log(focusWidth);
            animate(ul, -index * focusWidth);
        })
    }
    // 第一个圆圈添加current类，默认底色为白色
    ol.children[0].className = 'current';
    // 6. 克隆第一张图片(li)，放在ul最后一个 cloneNode(true)是深拷贝 复制标签及内容
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 7. 点击右侧箭头按钮，图片就滚动一张
    // (1)声明一个变量num点击一次，自增一次，让这个变量 * 图片的宽度，就等于ul的滚动距离
    // 图片无缝滚动原理：(1)把ul的第一个li复制一份，放在ul的最后面
    // (2)当图片滚动到克隆的最后一张图片时，让ul快速的、不做动画的跳到最左侧：left为0
    // (3)同时num要赋值为0，可以重新开始滚动图片了
    var num = 0;
    // 声明变量circle 专门控制小圆圈的播放
    var circle = 0;
    // 设置flag 节流阀
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;// 关闭节流阀
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;// 打开节流阀，利用回调函数，把动画执行完，再把节流阀打开
            });
            // 8. 点击右侧按钮，圆圈一起变化，可以再声明一个变量
            circle++;
            // 如果circle等于4，走到最后克隆的图片,circle复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 调用函数
            circleChange();
        }
    })
    // 9. 左侧按钮做法
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;// 关闭节流阀
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;// 打开节流阀
            });
            //  点击左侧按钮，圆圈一起变化，可以再声明一个变量
            circle--;
            // 如果circle < 0 说明第一张图片，则当前圆圈要改为第四个圆圈
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            // 调用函数
            circleChange();
        }
    });
    function circleChange() {
        // 排他思想，先清除其余圆圈的类名，只给当前圆圈添加current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    // 10. 自动播放图片
    // (1)添加定时器
    // (2)类似右侧按钮播放，使用手动调用右侧按钮点击事件 arrow_r.click()
    var timer = setInterval(function () {
        // 手动调用点击事件
        arrow_r.click();
    }, 2000);
})