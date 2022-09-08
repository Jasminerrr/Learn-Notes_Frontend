/* 功能需求：抽取对象：tab对象
1. 点击tab栏，可以切换效果；
2. 点击 + 号, 可以添加 tab 项和内容项；
3. 点击 x 号, 可以删除当前的tab项和内容项；
4. 双击tab项文字或者内容项文字,可以修改里面的文字内容；
 */
let that;
class Tab {
    constructor(id) {
        // 获取元素
        that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        // li的父元素
        this.ul = this.main.querySelector('.firstnav ul:first-child');
        // section的父元素
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }
    init() {
        this.updataNode();
        this.add.onclick = this.addTab;
        // init初始化操作让相关的元素绑定事件
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;// ondblclick 双击点击事件
            this.sections[i].ondblclick = this.editTab;
        }
    }
    // 因为要动态获取元素 需要重新获取所有对应的元素(小li/section/remove/span)
    updataNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.firstnav li span:first-child');
    }
    // 1. 切换功能(当前这个去掉下边框，其余的移除这个类)
    toggleTab() {
        // 先清除，再添加 清除写在前面
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }
    // 清除所有类样式
    clearClass() {
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    // 2. 添加功能
    addTab() {
        that.clearClass();
        // (1) 创建li元素和section元素
        let li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        let section = '<section class="conactive">测试1</section>';
        // (2) 把这两个元素追加到对应的父元素里面
        that.ul.insertAdjacentHTML('beforeend', li);// 可以把字符串li追加到父元素内容的最后面
        that.fsection.insertAdjacentHTML('beforeend', section);
        that.init();// 创建完元素再去格式化
    }
    // 3. 删除功能
    removeTab(e) {
        e.stopPropagation();// 阻止冒泡，防止触发li的切换点击事件
        let index = this.parentNode.index;
        console.log(index);
        // 根据索引号删除这个索引号对应的li和section，remove()方法可以直接删除指定元素
        that.lis[index].remove();
        that.sections[index].remove();
        that.init(); // 删除完元素再去格式化，获取最新元素
        // 当删除选定的li时，让原来选中状态的li保持不变
        if (document.querySelector('.liactive')) return; // 当有选中状态的li时，直接返回 不再执行下面的代码
        // 当删除选中状态的li时，让前面一个li 处于选定状态
        index--;
        // && 与运算 第一个值为false，则不会看第二个值
        that.lis[index] && that.lis[index].click();// click() 手动调用点击事件，不需要鼠标触发
    }
    // 4. 修改功能
    editTab() {
        let str = this.innerHTML;
        // 双击时禁止选中文字的代码  
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type = "text"/>';
        let input = this.children[0];
        input.value = str;
        input.select(); // 让文本框处于选定状态；
        // 当离开文本框，把里面的值给span
        input.onblur = function () {
            this.parentNode.innerHTML = this.value;
        };
        // 按下回车键，也可以把文本框的值给span
        input.onkeyup = function (e) {// 按键弹起
            if (e.keyCode === 13) {// 回车键ASCII码为13
                // 手动调用表单失去焦点事件 不需要鼠标离开操作
                this.blur();
            }
        }
    }
}
new Tab('#tab');