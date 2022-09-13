export default {
    install(Vue,x,y) {
        console.log(x,y);
        // 全局过滤器
        Vue.filter('mySlice', function (value) {
            // 语法：slice(开始位置,结束位置)
            return value.slice(0, 2)
        })

        // 定义全局指令：Vue.directive('指令名',对象或函数)
        Vue.directive('fbind', {
            // 指令与元素成功绑定时(一上来)调用
            bind(element, binding) {
                element.value = binding.value
            },
            // 指令所在元素被插入页面时调用
            inserted(element, binding) {
                element.focus()
            },
            // 指令所在的模板被重新解析时调用
            update(element, binding) {
                element.value = binding.value
            }
        })

        // 定义混入
        Vue.mixin({
            data() {
                return {
                    x: 100,
                    y: 200
                }
            }
        })

        // 给Vue原型上添加一个方法（vm和vc就都能用了）
        Vue.prototype.hello = () => { alert('啊啊啊') }
    }
}