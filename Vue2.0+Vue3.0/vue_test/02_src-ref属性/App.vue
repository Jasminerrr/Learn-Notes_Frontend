<template>
  <div>
    <h1 v-text="msg" ref="title"></h1>
    <button  ref="btn" @click="showDOM">点我输出上方DOM元素</button>
    <!-- 写组件标签 -->
    <!-- 脚手架内可以用自闭合方式, 不会导致后续组件不能渲染-->
    <SchoolName ref="sch"/>
    <SchoolName/>   
  </div>
</template>

<script>
    // 引入SchoolName组件
    import SchoolName from './components/SchoolName'
    // 默认暴露-直接暴露组件配置对象
    export default {
        name:'App',
        // 注册组件
        components:{SchoolName},
        data(){
            return {
                msg:'你好',
            }
        },
        methods: {
            showDOM(){
                // 总结：如果ref用在dom节点上，相当于id，如果用在组件上，则可以拿到VC
                console.log(this);// App组件实例对象(vc)
                console.log(this.$refs.title);// 真实DOM元素
                console.log(this.$refs.btn);// 真实DOM元素
                console.log(this.$refs.sch);// School组件实例对象(vc)
            }
        },
    }
</script>
