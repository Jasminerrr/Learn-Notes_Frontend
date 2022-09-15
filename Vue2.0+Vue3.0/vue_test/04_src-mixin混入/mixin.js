// 分别暴露
export const mixin = {
    methods: {
        showName() {
            alert(this.name)
        }
    },
    // mounted钩子发生冲突时，会先调用这个，组件后调用
    mounted() {
        console.log('aaaaaa');
    },
}
export const mixin2 = {
    // 数据发生冲突，以组件为主，不干扰
    data(){
        return {
            x:100,
            y:200
        }
    }
}