window.onload = function () {
    var regtel = /^1[3|4|5|7|8]\d{9}$/;   // 手机号码正则表达式 
    var regqq = /^[1-9]\d{4,}$/; // QQ正则表达式 从10000开始
    var regnc = /^[\u4e00-\u9fa5]{2,8}$/;  // 昵称 第一个汉字到最后一个汉字，2-8位
    var regmsg = /^\d{6}$/; // 短信验证码
    var regpwd = /^[a-zA-Z0-9_-]{6,16}$/;   // 登录密码
    var tel = document.querySelector('#tel');
    var qq = document.querySelector('#qq');
    var nc = document.querySelector('#nc');
    var msg = document.querySelector('#msg');
    var pwd = document.querySelector('#pwd');
    var surepwd = document.querySelector('#surepwd');
    var inputs = document.querySelectorAll('input');// 获取表单
    regexp(tel, regtel);// 验证手机号码
    regexp(qq, regqq);// 验证QQ
    regexp(nc, regnc);// 验证昵称
    regexp(msg, regmsg);// 验证短信码
    regexp(pwd, regpwd);// 验证密码
    // 封装表单验证的函数：需要传两个参数 哪个元素，哪个正则表达式
    function regexp(ele, reg) {
        ele.onblur = function () {
            if (reg.test(this.value)) {
                this.nextElementSibling.className = 'success';// 当前表单下一个元素是span
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 恭喜您输入正确';
            } else {
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 格式不正确，请重新输入';
            }
        }
    };
    surepwd.onblur = function () {
        if (this.value === pwd.value) {
            this.nextElementSibling.className = 'success';// 当前表单下一个元素是span
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 恭喜您输入正确';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 两次密码不一致，请重新输入';
        }
    };
    // 表单获得焦点，修改边框颜色
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].onfocus = function () {
            this.style.borderColor = '#1baae6';
        }
        // 表单失去焦点，修改边框为原来的颜色
        inputs[i].onblur = function () {
            this.style.borderColor = '#ccc';
        }
    }

}